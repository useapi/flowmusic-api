# Google Flow Music API (Lyria 3.5) examples by useapi.net

Runnable Node.js examples for the Google [Flow Music API](https://useapi.net/docs/api-flowmusic-v1) by [useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) — generate full songs with Google's **Lyria 3 Pro** (with vocals or instrumental, your own custom lyrics, plus cover / remix / extend / stems editing) through a simple REST API that drives your own [Flow Music](https://www.flowmusic.app) account — at roughly 6–10× less than Google's official $0.08-a-song API.

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

## About useapi.net

[useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) is an experimental REST API for AI services. The Flow Music API drives your own Flow Music account, so you generate at consumer-plan credit prices (about 6–10× cheaper per song than Google's official Lyria 3 Pro API) instead of metered developer pricing. See the [model matrix](https://useapi.net/model-matrix?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) and pricing on the [API overview](https://useapi.net/docs/api-flowmusic-v1).

Visit our [Discord Server](https://discord.gg/w28uK3cnmF) or [Telegram Channel](https://t.me/use_api) for any support questions and concerns.

We regularly post guides and tutorials on the [YouTube Channel](https://www.youtube.com/@useapi-net).
## License

The example code in this repository is released under the [MIT License](./LICENSE). It covers the example scripts only, not the useapi.net service or API.
