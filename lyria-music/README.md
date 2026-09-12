# Lyria 3 Pro music — Flow Music API batch generation (Node.js)

Batch-generate full songs with Google's [Lyria 3 Pro](https://deepmind.google/models/lyria/) through the [Flow Music API](https://useapi.net/docs/api-flowmusic-v1) by [useapi.net](https://useapi.net/?utm_source=github&utm_medium=readme&utm_campaign=flowmusic-api).

📖 Full walkthrough: **[How to Generate AI Music with Lyria 3 Pro via the Flow Music API](https://useapi.net/docs/articles/flowmusic-bash)**

`flowmusic.mjs` reads prompts from `prompts.json`, submits each song to [`POST /music`](https://useapi.net/docs/api-flowmusic-v1/post-flowmusic-music) in async mode, polls [`GET /jobs/{jobid}`](https://useapi.net/docs/api-flowmusic-v1/get-flowmusic-jobs-jobid), and downloads every finished track.

## Prerequisites

- [Node.js](https://nodejs.org) v21 or newer (no dependencies to install — uses built-in `fetch`)
- A useapi.net [API token](https://useapi.net/docs/start-here/setup-useapi?utm_source=github&utm_medium=readme&utm_campaign=flowmusic-api)
- A connected [Flow Music account](https://useapi.net/docs/start-here/setup-flowmusic) email

## Usage

```bash
node ./flowmusic.mjs <API_TOKEN> <EMAIL> [PROMPTS_FILE]
```

`PROMPTS_FILE` defaults to `prompts.json`. The script looks the account up by email before submitting.

## Prompts

`prompts.json` is an array of prompt objects — `prompt` is the only required field. Set `instrumental: true` for no vocals, supply your own `lyrics`, or pick a `ghostwriter` (`standard` / `pro`) for model-written lyrics. Once you have a clip, the [music/edit](https://useapi.net/docs/api-flowmusic-v1/post-flowmusic-music-edit) endpoint can cover, remix, extend, replace, apply effects, or split it into stems. Every parameter is documented on [POST /music](https://useapi.net/docs/api-flowmusic-v1/post-flowmusic-music).

---

Support: [Discord](https://discord.gg/w28uK3cnmF) · [Telegram](https://t.me/use_api) · [YouTube](https://www.youtube.com/@midjourneyapi)
