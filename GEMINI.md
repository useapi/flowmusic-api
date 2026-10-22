# Flow Music via useapi.net

This extension connects the hosted useapi.net Flow Music MCP server (`useapi-flowmusic`, 18 tools). The tools make Lyria 3.5 and Lyria 3 Pro songs, write lyrics, make covers and remixes, edit tracks and split stems, with your Flow Music subscription.

- Endpoint: https://api.useapi.net/v1/flowmusic/mcp (Streamable HTTP), authorized with the user's useapi.net API token in `USEAPI_TOKEN`.
- Before the tools work, the user needs a useapi.net API token (https://useapi.net/docs/start-here/setup-useapi) and an account connected at https://useapi.net/docs/start-here/setup-flowmusic.
- If a tool returns 401, ask the user to check `USEAPI_TOKEN` (`gemini extensions config useapi-flowmusic`). If it says no account is configured, point them to the setup page above.
- Generations spend the credits of the user's Flow Music subscription. Ask before starting paid or long jobs, and report job status and links when they finish.
- Full tool list and limits: https://useapi.net/docs/api-flowmusic-v1/mcp

useapi.net is a paid third-party API service ($15/month, covers every useapi.net API), not affiliated with Google.
