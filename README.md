# Google Flow Music API (Lyria 3.5 and Lyria 3 Pro) examples by useapi.net

Runnable Node.js examples for the [Google Flow Music API](https://useapi.net/docs/api-flowmusic-v1?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) by [useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api), a Lyria API for full songs: generate with Google's Lyria 3.5 or Lyria 3 Pro (vocals or instrumental, your own lyrics, plus cover, remix, extend, replace and stems editing), with a hosted MCP server of 18 tools. It all runs through a simple REST API on your [Flow Music subscription](https://www.flowmusic.app/pricing): Free, Starter $8, Plus $24 or Member $64 a month (as of October 2026). A Lyria 3.5 song costs $0.011 on Flow Music Member $64, against $0.08 on Google's Gemini API.

Each example reads a list of prompts from `prompts.json`, submits them through the useapi.net Flow Music API, and downloads every finished track.

| Example | What it does | Tutorial |
|---|---|---|
| [`lyria-music/`](./lyria-music) | Batch-generate full songs with Lyria 3.5 or Lyria 3 Pro (per-prompt `model`) — vocals or instrumental, custom lyrics, async polling | [How to Generate AI Music with Lyria 3 Pro via the Flow Music API](https://useapi.net/docs/articles/flowmusic-bash?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) |

Articles:

- [Suno API Alternative: Mureka, Lyria 3.5, TemPolor and MiniMax](https://useapi.net/docs/articles/suno-api-alternative?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api)
- [How to Generate AI Music with Lyria 3 Pro via the Flow Music API](https://useapi.net/docs/articles/flowmusic-bash?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api)
- [AI Music APIs Compared: Mureka vs MiniMax vs ElevenLabs vs Lyria 3 Pro](https://useapi.net/docs/articles/ai-music-api-comparison?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api)
- [Four AI Music APIs on the Same Six Briefs: TemPolor v4.8, MiniMax Music-3.0, Lyria 3.5 and Mureka V9.5](https://useapi.net/docs/articles/ai-music-flagships-compared?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api)

## Quick start

You need [Node.js](https://nodejs.org) v21 or newer (no dependencies to install), a useapi.net [API token](https://useapi.net/docs/start-here/setup-useapi?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api), and a connected [Flow Music account](https://useapi.net/docs/start-here/setup-flowmusic?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) (one [$15/month subscription](https://useapi.net/docs/subscription?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) covers every useapi.net API):

```bash
git clone https://github.com/useapi/flowmusic-api.git
cd flowmusic-api/lyria-music
node ./flowmusic.mjs <API_TOKEN> <EMAIL>
```

Edit `prompts.json` in each folder to queue your own prompts. Every supported parameter is documented on the [POST /music](https://useapi.net/docs/api-flowmusic-v1/post-flowmusic-music?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) and [music/edit](https://useapi.net/docs/api-flowmusic-v1/post-flowmusic-music-edit?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) endpoint pages.

## MCP server

useapi.net also runs a hosted [Model Context Protocol](https://modelcontextprotocol.io) server for Flow Music, so an AI assistant such as Claude Code, Cursor or VS Code Copilot can use it with your Flow Music subscription. It has 18 tools: songs with Lyria from a description, your own lyrics or lyrics the model writes; extend, replace a section, cover, remix lyrics, audio effects and stems; reference uploads; credits and jobs. Nothing to install or run locally.

- Endpoint: `https://api.useapi.net/v1/flowmusic/mcp`
- Transport: Streamable HTTP
- Authorization: your useapi.net API token in the `Authorization: Bearer …` header, and an account connected with the [Flow Music setup](https://useapi.net/docs/start-here/setup-flowmusic?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api)
- Listed in the official MCP Registry as `net.useapi/flowmusic`

Claude Code:

```bash
claude mcp add --transport http useapi-flowmusic https://api.useapi.net/v1/flowmusic/mcp --header "Authorization: Bearer YOUR_API_TOKEN"
```

Cursor, VS Code, Windsurf and the full tool list: [Flow Music MCP server docs](https://useapi.net/docs/api-flowmusic-v1/mcp?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api). useapi.net is a third-party API, not affiliated with Google.

## Use with Claude Code

This repo is also a Claude Code plugin marketplace. The plugin adds the hosted Flow Music MCP server, and reads your token from the `USEAPI_TOKEN` environment variable, so set it before you start Claude Code:

```bash
export USEAPI_TOKEN=user:12345-...      # your useapi.net API token
```

Then, inside Claude Code:

```
/plugin marketplace add useapi/flowmusic-api
/plugin install flowmusic@useapi-flowmusic
```

On Claude Code 2.1.275 or later, `/plugin install flowmusic --marketplace useapi/flowmusic-api` does both in one step. Run `/mcp` to check that `useapi-flowmusic` is connected.

## Use with Gemini CLI

This repo is also a Gemini CLI extension with the same MCP server:

```bash
gemini extensions install https://github.com/useapi/flowmusic-api
```

The install asks for your useapi.net API token and keeps it in the system keychain. Change it later with `gemini extensions config useapi-flowmusic`, and check the connection with `gemini mcp list`.

## Common questions

<!-- Official API figures, verified 2026-10-18: https://ai.google.dev/gemini-api/docs/pricing (Lyria 3.5 and Lyria 3 Pro Preview $0.08 per song). No public Flow Music developer API on flowmusic.app. Plan figures: useapi.net/docs/api-flowmusic-v1 price table, re-read 2026-10-22 (5 credits a song, Member $64 = 30,000 credits = ~6,000 songs = $0.011). -->

- **Is there a Google Flow Music API?** Yes, through useapi.net. Google has no public Flow Music API (as of October 2026), and the useapi.net Flow Music API makes full songs with vocals on Lyria 3.5 and Lyria 3 Pro with your [Flow Music](https://www.flowmusic.app) website subscription over REST, plus covers, lyric remixes, extends, section replacements, effects and stems from the same credits. Flow Music is Google Labs' music app, formerly Producer AI and originally Riffusion.
- **Is there a Lyria 3.5 API?** Yes, and through useapi.net Google's current flagship Lyria 3.5 runs on your Flow Music website subscription, with no Google Cloud project and no Gemini API billing. Pass `model: "lyria-3.5"` (or `lyria-3-pro`, the default) to [POST /music](https://useapi.net/docs/api-flowmusic-v1/post-flowmusic-music?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) and [POST /music/edit](https://useapi.net/docs/api-flowmusic-v1/post-flowmusic-music-edit?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api). The [`lyria-music/`](./lyria-music) example takes it per prompt.
- **Do I need a Flow Music API key?** No, through useapi.net you call Flow Music with a useapi.net [API token](https://useapi.net/docs/start-here/setup-useapi?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api), since Google issues no Flow Music API key, and connect the Google account you use at flowmusic.app once through the [Flow Music setup](https://useapi.net/docs/start-here/setup-flowmusic?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api): the automated setup signs you in with Google in a remote browser. You need no Google Cloud project and no Gemini API billing.
- **How much does the Flow Music API cost?** Through useapi.net, a Lyria 3.5 song costs $0.011 on Flow Music Member $64 a month, against $0.08 a song on Google's Gemini API (as of October 2026). Member makes about 6,000 songs a month, the Free plan's daily credits work too, and downloads in mp3, wav, m4a and stems cost nothing extra. See the [price table](https://useapi.net/docs/api-flowmusic-v1?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api#pricing).
- **Is it a Suno / Udio alternative?** Yes, and through useapi.net it runs on Google's Lyria 3.5: like Suno and Udio, it writes and sings a full song with vocals from one text prompt, up to about 3 minutes and longer with `extend`, returns up to two clips per generation, and covers, remixes and splits stems from the same Flow Music credits. See the [Suno API alternative](https://useapi.net/docs/articles/suno-api-alternative?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) comparison.
- More answers: [Flow Music API questions](https://useapi.net/docs/articles/flowmusic-bash?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api#frequently-asked-questions).

## About useapi.net

[useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) is a third-party REST API for AI websites. The Flow Music API runs on your [Flow Music subscription](https://www.flowmusic.app/pricing), so you generate at its plan credit prices instead of metered developer pricing. See the [model matrix](https://useapi.net/model-matrix?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) and pricing on the [API overview](https://useapi.net/docs/api-flowmusic-v1?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api).

Visit our [Discord Server](https://discord.gg/w28uK3cnmF) or [Telegram Channel](https://t.me/use_api) for any support questions and concerns.

We regularly post guides and tutorials on the [YouTube Channel](https://www.youtube.com/@useapi-net).

## License

The example code in this repository is released under the [MIT License](./LICENSE). It covers the example scripts only, not the useapi.net service or API.
