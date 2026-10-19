# Google Flow Music API (Lyria 3.5 and Lyria 3 Pro) examples by useapi.net

Runnable Node.js examples for the [Google Flow Music API](https://useapi.net/docs/api-flowmusic-v1?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) by [useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api), a Lyria API for full songs: generate with Google's **Lyria 3.5** or **Lyria 3 Pro** (vocals or instrumental, your own custom lyrics, plus cover / remix / extend / replace / stems editing), with a hosted MCP server of 18 tools. It all runs through a simple REST API that drives your own [Flow Music](https://www.flowmusic.app) account, at roughly 6–10× less per song than Google's official $0.08-a-song Lyria 3 Pro API.

Each example reads a list of prompts from `prompts.json`, submits them through the useapi.net Flow Music API, and downloads every finished track.

| Example | What it does | Tutorial |
|---|---|---|
| [`lyria-music/`](./lyria-music) | Batch-generate full songs with **Lyria 3.5** or **Lyria 3 Pro** (per-prompt `model`) — vocals or instrumental, custom lyrics, async polling | [How to Generate AI Music with Lyria 3 Pro via the Flow Music API](https://useapi.net/docs/articles/flowmusic-bash) |

## Quick start

You need [Node.js](https://nodejs.org) v21 or newer (no dependencies to install), a useapi.net [API token](https://useapi.net/docs/start-here/setup-useapi?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api), and a connected [Flow Music account](https://useapi.net/docs/start-here/setup-flowmusic) (one [$15/month subscription](https://useapi.net/docs/subscription?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) covers every useapi.net API):

```bash
git clone https://github.com/useapi/flowmusic-api.git
cd flowmusic-api/lyria-music
node ./flowmusic.mjs <API_TOKEN> <EMAIL>
```

Edit `prompts.json` in each folder to queue your own prompts. Every supported parameter is documented on the [POST /music](https://useapi.net/docs/api-flowmusic-v1/post-flowmusic-music) and [music/edit](https://useapi.net/docs/api-flowmusic-v1/post-flowmusic-music-edit) endpoint pages.

## MCP server

useapi.net also runs a hosted [Model Context Protocol](https://modelcontextprotocol.io) server for Flow Music, so an AI assistant such as Claude Code, Cursor or VS Code Copilot can use it on your own account. It has 18 tools: songs with Lyria from a description, your own lyrics or lyrics the model writes; extend, replace a section, cover, remix lyrics, audio effects and stems; reference uploads; credits and jobs. Nothing to install or run locally.

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

<!-- Official API figures in these answers, verified 2026-10-18: https://ai.google.dev/gemini-api/docs/pricing (Lyria 3.5 / 3 Pro $0.08 per song). Plan figures: useapi.net/docs/api-flowmusic-v1 calculator. -->

- **Is there a Google Flow Music API?** Yes, through useapi.net: a third-party REST API that drives your own [Flow Music](https://www.flowmusic.app) account (Google Labs' music app, formerly Producer AI and originally Riffusion) with a useapi.net token, so you generate at your Flow Music plan's prices: a full Lyria 3.5 song costs about $0.008 to $0.013 on a paid plan, against $0.08 per song on Google's [Gemini API](https://ai.google.dev/gemini-api/docs/pricing) (as of October 2026). Google has no public Flow Music API.
- **Is there a Lyria 3.5 API?** Yes. Pass `model: "lyria-3.5"` (Google's current flagship) or `lyria-3-pro` (the default) to [POST /music](https://useapi.net/docs/api-flowmusic-v1/post-flowmusic-music?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) and [POST /music/edit](https://useapi.net/docs/api-flowmusic-v1/post-flowmusic-music-edit?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api). The [`lyria-music/`](./lyria-music) example takes it per prompt.
- **How is this different from Google's official Lyria API?** This API needs only a useapi.net token and your Flow Music account, costs about $0.008–$0.013 per song on paid Flow Music plans against $0.08 on Google's official Lyria API (as of October 2026), and adds cover, remix, extend, replace, audio effects and stem splitting. Google's official Lyria 3 Pro API needs your own Google Cloud project and API key.
- **Where do I get an API key?** You call this API with a useapi.net [API token](https://useapi.net/docs/start-here/setup-useapi?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) and connect your Flow Music account once through the [Flow Music setup](https://useapi.net/docs/start-here/setup-flowmusic?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api): the automated setup signs you in with Google in a remote browser, with no DevTools or token copying. No Google Cloud project is needed.
- **How much does it cost?** A flat [$15/month](https://useapi.net/docs/subscription?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) to useapi.net, which covers every useapi.net API, plus your Flow Music plan: Starter $8/month (about 600 songs), Plus $24/month (about 2,000) or Member $64/month (about 6,000), about 25% less yearly. That is about $0.008–$0.013 a song, against $0.08 on Google's Gemini API (as of October 2026). The free plan gets daily top-up credits. Downloads (mp3, wav, m4a and stems) are free. See the [cost calculator](https://useapi.net/docs/api-flowmusic-v1?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api).
- **Is it a Suno / Udio alternative?** Yes. Like Suno and Udio, it writes and sings a full song with vocals from one text prompt, up to about 3 minutes (5+ with `extend`), and returns up to two clips per generation.
- More answers: [Flow Music API questions](https://useapi.net/docs/articles/flowmusic-bash?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api#frequently-asked-questions).

## About useapi.net

[useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) is an experimental REST API for AI services. The Flow Music API drives your own Flow Music account, so you generate at consumer-plan credit prices (about 6–10× cheaper per song than Google's official Lyria 3 Pro API) instead of metered developer pricing. See the [model matrix](https://useapi.net/model-matrix?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) and pricing on the [API overview](https://useapi.net/docs/api-flowmusic-v1).

Visit our [Discord Server](https://discord.gg/w28uK3cnmF) or [Telegram Channel](https://t.me/use_api) for any support questions and concerns.

We regularly post guides and tutorials on the [YouTube Channel](https://www.youtube.com/@useapi-net).

## License

The example code in this repository is released under the [MIT License](./LICENSE). It covers the example scripts only, not the useapi.net service or API.
