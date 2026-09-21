# Flow Music API examples (useapi.net)

Runnable Node.js examples for the [Flow Music API](https://useapi.net/docs/api-flowmusic-v1) by [useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) — generate full songs with Google's **Lyria 3 Pro** (with vocals or instrumental, your own custom lyrics, plus cover / remix / extend / stems editing) through a simple REST API that drives your own [Flow Music](https://www.flowmusic.app) account — at roughly 6–10× less than Google's official $0.08-a-song API.

Each example reads a list of prompts from `prompts.json`, submits them through the useapi.net Flow Music API, and downloads every finished track.

| Example | What it does | Tutorial |
|---|---|---|
| [`lyria-music/`](./lyria-music) | Batch-generate full songs with **Lyria 3 Pro** — vocals or instrumental, custom lyrics, async polling | [How to Generate AI Music with Lyria 3 Pro via the Flow Music API](https://useapi.net/docs/articles/flowmusic-bash) |

## Quick start

You need [Node.js](https://nodejs.org) v21 or newer (no dependencies to install), a useapi.net [API token](https://useapi.net/docs/start-here/setup-useapi?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api), and a connected [Flow Music account](https://useapi.net/docs/start-here/setup-flowmusic) (one [$15/month subscription](https://useapi.net/docs/subscription?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) covers every useapi.net API):

```bash
git clone https://github.com/useapi/flowmusic-api.git
cd flowmusic-api/lyria-music
node ./flowmusic.mjs <API_TOKEN> <EMAIL>
```

Edit `prompts.json` in each folder to queue your own prompts. Every supported parameter is documented on the [POST /music](https://useapi.net/docs/api-flowmusic-v1/post-flowmusic-music) and [music/edit](https://useapi.net/docs/api-flowmusic-v1/post-flowmusic-music-edit) endpoint pages.

## About useapi.net

[useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) is an experimental REST API for AI services. The Flow Music API drives your own Flow Music account, so you generate at consumer-plan credit prices (about 6–10× cheaper per song than Google's official Lyria 3 Pro API) instead of metered developer pricing. See the [model matrix](https://useapi.net/model-matrix?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) and pricing on the [API overview](https://useapi.net/docs/api-flowmusic-v1).

Visit our [Discord Server](https://discord.gg/w28uK3cnmF) or [Telegram Channel](https://t.me/use_api) for any support questions and concerns.

We regularly post guides and tutorials on the [YouTube Channel](https://www.youtube.com/@useapi-net).