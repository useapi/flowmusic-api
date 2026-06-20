/*

Script version 1.0, July 19, 2026

Script to batch-generate music using prompts with the Flow Music API v1 by useapi.net 🚀
Generates complete songs with Google's Lyria 3 Pro via the music endpoint.
For more details visit https://useapi.net/docs/api-flowmusic-v1/post-flowmusic-music

Installation Instructions:
==========================

You need Node.js v21 or newer installed to run this script. Download and install Node.js from:

- Windows, macOS, Linux: https://nodejs.org/

After installation, verify by running the following command in a terminal:

   node -v

Running the Script:
===================

Usage: node flowmusic.mjs <API_TOKEN> <EMAIL> [PROMPTS_FILE]

Replace API_TOKEN with your actual useapi.net API token, see https://useapi.net/docs/start-here/setup-useapi
Replace EMAIL with configured Flow Music email account, see https://useapi.net/docs/start-here/setup-flowmusic
If optional PROMPTS_FILE not provided prompts.json will be used.

Example:
--------

node flowmusic.mjs user:1234-abcdefhijklmnopqrstuv my@email.com

This command executes the script using API token user:1234-abcdefhijklmnopqrstuv with my@email.com Flow Music account email.

Changelog:
==========

- July 19, 2026: Initial release. Submits prompts to the music endpoint in async mode and downloads the resulting m4a clips.

*/

import readline from 'node:readline';
import fs from 'fs/promises';
import { writeFile } from 'node:fs/promises';
import { Readable } from 'node:stream';


// Constants
const RESULTS_FILE = 'flowmusic_results.txt';
const ERRORS_FILE = 'flowmusic_errors.txt';
const DEFAULT_PROMPTS_FILE = 'prompts.json';
const SLEEP_429 = 10 * 1000; // in milliseconds
const MAX_429_RETRIES = 6;   // give up a prompt after this many consecutive 429s (all accounts busy)
const SLEEP_POLL = 15 * 1000; // in milliseconds

const urlAccounts = 'https://api.useapi.net/v1/flowmusic/accounts';
const urlMusic = 'https://api.useapi.net/v1/flowmusic/music';
const urlJobs = 'https://api.useapi.net/v1/flowmusic/jobs/';

// Utility to sleep for given milliseconds
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const elapsedTimeSec = (start) => (Date.now() - start) / 1000;

// Function to fetch configured Flow Music API accounts
async function fetchAccounts(apiToken) {
    const response = await fetch(urlAccounts, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${apiToken}`
        }
    });

    if (!response.ok) {
        console.error(`⛔ Error fetching accounts (HTTP ${response.status}): ${response.statusText}`);
        process.exit(1);
    }

    return response.json();
}

// Submit a single prompt to the music endpoint in async mode.
// Returns the HTTP status; on 201 the jobid is appended to RESULTS_FILE.
async function submitMusic(apiToken, email, prompt, index) {
    const { prompt: text, instrumental, lyrics, ghostwriter } = prompt;

    console.log(`🚀 Lyria 3 Pro » Prompt #${index} • account ${email} • ${instrumental ? 'instrumental' : 'auto vocals'} …`);

    const body = JSON.stringify({
        email,
        prompt: text,
        instrumental,
        lyrics,
        ghostwriter,
        mode: 'async'
    });

    const createResponse = await fetch(urlMusic, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiToken}`
        },
        body
    });

    const createBody = await createResponse.text();

    // 201 Created — async job queued; 200 OK — sync result (returned if mode is overridden).
    if (createResponse.status == 201 || createResponse.status == 200) {
        const json = JSON.parse(createBody);
        const { jobid } = json;
        if (jobid) {
            await fs.appendFile(RESULTS_FILE, `${jobid},#${index}:${text}\n`);
            console.log(`✅ jobid`, jobid);
            return 201;
        } else {
            const error = `No jobid found in HTTP ${createResponse.status} response`;
            console.log(`❓ ${error}`, createBody);
            await fs.appendFile(ERRORS_FILE, `${error},#${index}:${text}\n`);
            return 500;
        }
    } else {
        switch (createResponse.status) {
            case 429:
                console.log(`🔄️ Retry on HTTP ${createResponse.status}`);
                break;
            case 422:
                console.log(`🛑 MODERATED prompt — the model declined to generate audio`, createBody);
                await fs.appendFile(ERRORS_FILE, `${createResponse.status},#${index}:${text}\n`);
                break;
            case 402:
                console.log(`🛑 account has insufficient credits`, createBody);
                await fs.appendFile(ERRORS_FILE, `${createResponse.status},#${index}:${text}\n`);
                break;
            case 596:
                console.log(`🛑 account in error state — re-add it at https://useapi.net/docs/start-here/setup-flowmusic`, createBody);
                await fs.appendFile(ERRORS_FILE, `${createResponse.status},#${index}:${text}\n`);
                break;
            default:
                console.log(`❗ FAILED with HTTP ${createResponse.status}`, createBody);
                await fs.appendFile(ERRORS_FILE, `${createResponse.status},#${index}:${text}\n`);
        }
        return createResponse.status;
    }
}

// Function to poll jobs and download generated audio clips
async function download(apiToken) {
    if (! await fileExists(RESULTS_FILE)) return;

    try {
        const resultsContent = await fs.readFile(RESULTS_FILE, 'utf8');
        const lines = resultsContent.trim().split('\n');

        for (const line of lines) {
            const [jobid, prompt] = line.split(',');

            console.log(`👉 ${jobid}`);

            while (true) {
                const response = await fetch(`${urlJobs}${encodeURIComponent(jobid)}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${apiToken}`
                    }
                });

                if (!response.ok) {
                    console.log(`🛑 Poll failed ${jobid} (HTTP ${response.status}):\n${prompt}\n`, await response.text());
                    break;
                }

                const jobResponseBody = await response.json();
                const { status, clips, error } = jobResponseBody;

                if (status == 'failed') {
                    console.error(`🛑 FAILED ${jobid} (${error?.code}: ${error?.message}):\n${prompt}\n`);
                    break;
                }

                if (status == 'completed') {
                    if (Array.isArray(clips) && clips.length > 0) {
                        // A single generation returns up to two clips (an A/B pair) — download all of them.
                        for (let c = 0; c < clips.length; c++) {
                            const { clip, audio_url } = clips[c];
                            const audioFilename = `${clip.replace(/[:/]/g, '_')}.m4a`;

                            if (await fileExists(audioFilename)) {
                                console.log(`⚠️ ${audioFilename} already exists. Skipping download.`);
                                continue;
                            }

                            if (audio_url) {
                                console.log(`✅ Downloading ${audio_url} to ${audioFilename}`);
                                try {
                                    const audioResponse = await fetch(audio_url);
                                    if (!audioResponse.ok) {
                                        console.error(`⛔ Unable to download ${jobid} (HTTP ${audioResponse.status}):\n${prompt}\n`, audio_url);
                                        continue;
                                    }
                                    const stream = Readable.fromWeb(audioResponse.body);
                                    await writeFile(audioFilename, stream);
                                } catch (err) {
                                    console.error(`⛔ Error during download: ${err}`);
                                }
                            } else {
                                console.error(`🛑 No audio_url for clip ${clip} (${jobid}):\n${prompt}\n`);
                            }
                        }
                    } else {
                        console.error(`🛑 ${jobid} completed but returned no clips:\n${prompt}\n`);
                    }

                    break;
                }

                console.log(`⌛ ${jobid} status (${status}) and is still in progress, waiting…`);
                await sleep(SLEEP_POLL);
            }
        }
    } catch (error) {
        console.log(`⛔ Error during download:`, error.stack || error);
    }
}

// Main function
async function main() {
    const apiToken = process.argv[2];
    const email = process.argv[3];
    const promptFile = process.argv[4] || DEFAULT_PROMPTS_FILE;

    if (!apiToken || !email) {
        console.error('Usage: node flowmusic.mjs <API_TOKEN> <EMAIL> [PROMPTS_FILE]');
        process.exit(1);
    }

    console.info('Script v1.0');

    console.info('Node version is: ' + process.version);

    try {
        if (await fileExists(RESULTS_FILE)) {
            let user_input;
            while (!['y', 'n'].includes(user_input)) {
                user_input = (await promptUser(`❔ ${RESULTS_FILE} file detected. Do you want to download the results now? (y/n): `))?.toLowerCase();
                if (user_input == 'y') {
                    await download(apiToken);
                    await fs.unlink(RESULTS_FILE);
                }
            }
        }

        const start = new Date();
        try {
            console.info('START EXECUTION', start);
            await execute(apiToken, email, promptFile); // Pass the promptFile to execute function
        }
        finally {
            console.info('COMPLETED', new Date());
            console.info('EXECUTION ELAPSED', diffInMinutesAndSeconds(start, new Date()));
        }

        try {
            console.info('START DOWNLOAD', start);
            await download(apiToken);
        }
        finally {
            console.info('TOTAL ELAPSED', diffInMinutesAndSeconds(start, new Date()));
        }
    } catch (error) {
        console.error('⛔ Error during execution:', error.stack || error);
    }
}

// Modify the execute function to accept promptFile as a parameter
async function execute(apiToken, email, promptFile) {
    const accounts = await fetchAccounts(apiToken);

    console.info(`Configured Flow Music API accounts (${Object.values(accounts).length}):`, Object.values(accounts).map(a => a.email).join(', '));

    if (Object.values(accounts).length <= 0) {
        console.error(`⛔ No configured Flow Music accounts found. Please refer to https://useapi.net/docs/start-here/setup-flowmusic`);
        process.exit(1);
    }

    if (!accounts[email]) {
        console.error(`⛔ Account ${email} not found. Please refer to https://useapi.net/docs/start-here/setup-flowmusic`);
        process.exit(1);
    }

    if (accounts[email].error) {
        console.error(`⛔ Account ${email} has pending error. Please re-add the account, see https://useapi.net/docs/start-here/setup-flowmusic`);
        process.exit(1);
    }

    const promptData = await fs.readFile(promptFile, 'utf8');
    const prompts = JSON.parse(promptData);
    console.log(`Total number of prompts to process`, prompts.length);

    let warnings = [];

    // Parameters accepted by this script for the music endpoint.
    // See https://useapi.net/docs/api-flowmusic-v1/post-flowmusic-music for the full parameter set.
    const supportedParams = ['prompt', 'instrumental', 'lyrics', 'ghostwriter'];

    const invalidKeys = (prompt) => Object.keys(prompt).filter(key => !key.startsWith('__') && !supportedParams.includes(key));

    for (let i = 1; i <= prompts.length; i++) {
        const prompt = prompts[i - 1];
        const { prompt: text, ghostwriter } = prompt;

        const notSupported = invalidKeys(prompt);
        if (notSupported.length)
            warnings.push(`⚠️  Following params not supported: ${notSupported.join(',')}. Prompt ${i}`);

        if (!text || typeof text !== 'string' || text.trim().length === 0)
            warnings.push(`⚠️  Please specify a non-empty prompt. Prompt ${i}`);

        if (typeof text === 'string' && text.length > 10000)
            warnings.push(`⚠️  prompt exceeds 10,000 characters. Prompt ${i}`);

        if (ghostwriter !== undefined && !['standard', 'pro'].includes(ghostwriter))
            warnings.push(`⚠️  ghostwriter must be 'standard' or 'pro'. Prompt ${i}`);
    }

    if (warnings.length > 0) {
        warnings.forEach(warning => console.warn(warning));
        console.error(`⛔ Execution stopped due to warnings.`);
        process.exit(1);
    }

    for (let i = 0; i < prompts.length; i++) {
        const prompt = prompts[i];
        let retries429 = 0;
        while (true) {
            const responseCode = await submitMusic(apiToken, email, prompt, i + 1);
            if (responseCode == 429) {
                if (++retries429 > MAX_429_RETRIES) {
                    console.error(`⛔ Gave up on prompt #${i + 1} after ${MAX_429_RETRIES} retries — all accounts still busy.`);
                    await fs.appendFile(ERRORS_FILE, `429 (gave up after ${MAX_429_RETRIES} retries),#${i + 1}\n`);
                    break;
                }
                await sleep(SLEEP_429);
            }
            else
                if (responseCode == 402 || responseCode == 596) {
                    process.exit(1);
                } else
                    break;
        }
    }
}

// Utility function to check if a file exists
async function fileExists(path) {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}

// Function to prompt user input
async function promptUser(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => rl.question(query, answer => {
        rl.close();
        resolve(answer);
    }));
}

function diffInMinutesAndSeconds(date1, date2) {
    const diffInSeconds = Math.floor((date2 - date1) / 1000);
    return `${Math.floor(diffInSeconds / 60)} minutes ${diffInSeconds % 60} seconds`;
};

main();
