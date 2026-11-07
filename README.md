# Google Flow Music API (Lyria 3.5 and Lyria 3 Pro) examples by useapi.net

English · [中文](#中文说明) · [日本語](#日本語の説明) · [Português](#sobre-este-repositório) · [Tiếng Việt](#về-repo-này) · [Bahasa Indonesia](#tentang-repo-ini) · [ไทย](#เกี่ยวกับ-repo-นี้)

Runnable Node.js examples for the [Google Flow Music API](https://useapi.net/docs/api-flowmusic-v1?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) by [useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api), a Lyria API for full songs: generate with Google's Lyria 3.5 or Lyria 3 Pro (vocals or instrumental, your own lyrics, plus cover, remix, extend, replace and stems editing), with a hosted MCP server of 18 tools. It all runs through a simple REST API on your [Flow Music subscription](https://www.flowmusic.app/pricing): Free, Starter $8, Plus $24 or Member $64 a month (as of November 2026). [Google AI Plus](https://support.google.com/googleone/answer/16882689), [Pro](https://support.google.com/googleone/answer/14534406) and [Ultra](https://support.google.com/googleone/answer/16286513) include its Starter, Plus and Member plans. A Lyria 3.5 song costs $0.011 on Flow Music Member $64, against $0.08 on Google's Gemini API.

<!-- Flow Music plans included with Google AI, Google One help read 2026-11-07: https://support.google.com/googleone/answer/16882689 ("Google AI Plus members get the benefits of Google Flow Music's Starter plan:" "3,000 monthly credits (~600 songs)."), https://support.google.com/googleone/answer/14534406 ("Members of Google AI Pro get the benefits of Google Flow Music's Plus plan:" "10,000 monthly credits (~2,000 songs)."), https://support.google.com/googleone/answer/16286513 ("Members of Google AI Ultra get the benefits of Google Flow Music's Member plan:" "30,000 monthly credits (~6,000 songs)."), all three "Google Flow Music credits are separate from your Google AI credits." Verified on our Google AI Pro test account 2026-11-07: tier Plus, Subscription Top Up 10000, Manage → one.google.com/settings. Flow Music own plans: flowmusic.app/pricing read 2026-11-07, Free, Starter $8, Plus $24, Member $64 a month. -->

Each example reads a list of prompts from `prompts.json`, submits them through the useapi.net Flow Music API, and downloads every finished track.

| Example | What it does | Tutorial |
|---|---|---|
| [`lyria-music/`](./lyria-music) | Batch-generate full songs with Lyria 3.5 or Lyria 3 Pro (per-prompt `model`) — vocals or instrumental, custom lyrics, async polling | [How to Generate AI Music with Lyria 3 Pro via the Flow Music API](https://useapi.net/docs/articles/flowmusic-bash?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) |

Articles:

- [Can You Use Your Google AI Subscription Through an API? What Plus, Pro and Ultra Get You](https://useapi.net/docs/articles/google-ai-subscription-api?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) · Also in [中文](https://useapi.net/docs/articles/google-ai-subscription-api-zh?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) · [日本語](https://useapi.net/docs/articles/google-ai-subscription-api-ja?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) · [Português](https://useapi.net/docs/articles/google-ai-subscription-api-pt?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) · [Tiếng Việt](https://useapi.net/docs/articles/google-ai-subscription-api-vi?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) · [Bahasa Indonesia](https://useapi.net/docs/articles/google-ai-subscription-api-id?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) · [ไทย](https://useapi.net/docs/articles/google-ai-subscription-api-th?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api)
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

<!-- Official API figures, verified 2026-10-18: https://ai.google.dev/gemini-api/docs/pricing (Lyria 3.5 and Lyria 3 Pro Preview $0.08 per song). No public Flow Music developer API on flowmusic.app. Plan figures: useapi.net/docs/api-flowmusic-v1 price table, re-read 2026-10-22 (5 credits a song, Member $64 = 30,000 credits = ~6,000 songs = $0.011). Google AI included plans (Plus → Starter, Pro → Plus, Ultra → Member): Google One help 16882689 / 14534406 / 16286513 read 2026-11-07, quoted in the comment under the intro. -->

- **Is there a Google Flow Music API?** Yes, through useapi.net. Google has no public Flow Music API (as of October 2026), and the useapi.net Flow Music API makes full songs with vocals on Lyria 3.5 and Lyria 3 Pro with your [Flow Music](https://www.flowmusic.app) website subscription over REST, plus covers, lyric remixes, extends, section replacements, effects and stems from the same credits. Flow Music is Google Labs' music app, formerly Producer AI and originally Riffusion.
- **Is there a Lyria 3.5 API?** Yes, and through useapi.net Google's current flagship Lyria 3.5 runs on your Flow Music website subscription, with no Google Cloud project and no Gemini API billing. Pass `model: "lyria-3.5"` (or `lyria-3-pro`, the default) to [POST /music](https://useapi.net/docs/api-flowmusic-v1/post-flowmusic-music?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) and [POST /music/edit](https://useapi.net/docs/api-flowmusic-v1/post-flowmusic-music-edit?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api). The [`lyria-music/`](./lyria-music) example takes it per prompt.
- **Do I need a Flow Music API key?** No, through useapi.net you call Flow Music with a useapi.net [API token](https://useapi.net/docs/start-here/setup-useapi?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api), since Google issues no Flow Music API key, and connect the Google account you use at flowmusic.app once through the [Flow Music setup](https://useapi.net/docs/start-here/setup-flowmusic?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api): the automated setup signs you in with Google in a remote browser. You need no Google Cloud project and no Gemini API billing.
- **How much does the Flow Music API cost?** Through useapi.net, a Lyria 3.5 song costs $0.011 on Flow Music Member $64 a month, against $0.08 a song on Google's Gemini API (as of October 2026). Member makes about 6,000 songs a month. [Google AI Plus](https://support.google.com/googleone/answer/16882689), [Pro](https://support.google.com/googleone/answer/14534406) and [Ultra](https://support.google.com/googleone/answer/16286513) include the Starter, Plus and Member plans. The Free plan's daily credits work too, and downloads in mp3, wav, m4a and stems cost nothing extra. See the [price table](https://useapi.net/docs/api-flowmusic-v1?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api#pricing).
- **Is it a Suno / Udio alternative?** Yes, and through useapi.net it runs on Google's Lyria 3.5: like Suno and Udio, it writes and sings a full song with vocals from one text prompt, up to about 3 minutes and longer with `extend`, returns up to two clips per generation, and covers, remixes and splits stems from the same Flow Music credits. See the [Suno API alternative](https://useapi.net/docs/articles/suno-api-alternative?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) comparison.
- More answers: [Flow Music API questions](https://useapi.net/docs/articles/flowmusic-bash?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api#frequently-asked-questions).

## 中文说明

这是 [useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) 的 Google Flow Music API 示例代码（Node.js），通过第三方 REST API 用 Google 的 Lyria 3.5 或 Lyria 3 Pro 生成带人声或纯音乐的完整歌曲，支持自定义歌词、翻唱、混音、延长、替换段落和分轨。

- 使用你的 Flow Music 订阅（免费版、Starter $8、Plus $24 或 Member $64 每月），或 Google AI 套餐附带的 Flow Music 积分：Plus 每月 3,000、Pro 10,000、Ultra 30,000 积分，与 Flow 积分分开（2026 年 11 月）。
- 无需 Google Cloud 项目或 Gemini API 计费，Google 也没有公开的 Flow Music API。
- 账号只需绑定一次：自动化设置流程在远程浏览器中用 Google 登录，无需复制 Cookie。
- 成本：在 Flow Music Member $64 上，一首 Lyria 3.5 歌曲约 $0.011，Google 的 Gemini API 上为 $0.08（2026 年 11 月）。useapi.net 每月 15 美元，含所有 API。
- `lyria-music/` 从 `prompts.json` 读取提示词，按条指定 `model`，批量提交并下载每首完成的歌曲。另有托管 MCP 服务器（18 个工具）。

中文文章（Google AI Plus、Pro、Ultra 各含多少 Flow Music 积分和歌曲）：[Google AI 订阅能用 API 调用吗？Plus、Pro 和 Ultra 套餐各能得到什么](https://useapi.net/docs/articles/google-ai-subscription-api-zh?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api)。完整文档：[Flow Music API](https://useapi.net/docs/api-flowmusic-v1?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api)。

## 日本語の説明

[useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) の Google Flow Music API の、Node.js のサンプルです。Google の Lyria 3.5 と Lyria 3 Pro で、ボーカル入りまたはインストゥルメンタルのフル尺の曲を自作の歌詞でも生成するサードパーティの REST API で、カバー、リミックス、延長、ステムにも対応しています。

- Flow Music は Google AI のプランに含まれています。Plus は月3,000クレジット、Pro は10,000、Ultra は30,000で、Google Flow のクレジットとは別枠です。Flow Music 独自のプラン（Free、Starter $8、Plus $24、Member $64、月額、2026年11月時点）でも使えます。
- Google Cloud プロジェクトも、Gemini API の課金も、Flow Music の API キーも不要です。useapi.net のトークンで API を呼び出します。
- flowmusic.app で使っている Google アカウントを、自動化されたブラウザーの手順で一度接続します。
- コスト：Lyria 3.5 の曲は1曲5クレジットで、Google AI Pro $19.99（月2,000曲）では約 $0.010、Google の Gemini API では1曲 $0.08 です（2026年11月時点）。useapi.net は月 $15 で、すべての API が含まれます。
- サンプル `lyria-music/` は `prompts.json` からプロンプトのリストを読み込み、Lyria 3.5 または Lyria 3 Pro（プロンプトごとに `model` を指定）で曲を一括生成し、完成した曲をすべてダウンロードします。

日本語の記事：[Google AI のサブスクは API で使える？Plus・Pro・Ultra で毎月できること](https://useapi.net/docs/articles/google-ai-subscription-api-ja?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api)。ドキュメント全体：[Flow Music API](https://useapi.net/docs/api-flowmusic-v1?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api)。

## Sobre este repositório

Exemplos em Node.js da Google Flow Music API da [useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api), uma API REST de terceiros que gera músicas completas com o Lyria 3.5 e o Lyria 3 Pro do Google, com vocal ou instrumentais, com a sua própria letra, além de covers, remixes, extensões e stems.

- O Flow Music vem incluído no seu plano Google AI: o Plus recebe 3.000 créditos por mês, o Pro 10.000 e o Ultra 30.000, separados dos créditos do Google Flow. Os planos próprios do Flow Music também funcionam: Free, Starter $8, Plus $24 ou Member $64 por mês (novembro de 2026).
- Sem projeto no Google Cloud, sem faturamento da Gemini API e sem chave de API do Flow Music: você chama a API com o token da useapi.net.
- A conta Google que você usa em flowmusic.app é conectada uma vez por um fluxo automatizado no navegador.
- Custo: uma música Lyria 3.5 gasta 5 créditos, cerca de $0,010 no Google AI Pro $19,99 (2.000 músicas por mês), contra $0,08 por música na Gemini API do Google (novembro de 2026). A useapi.net custa $15 por mês, com todas as APIs.
- O exemplo `lyria-music/` lê uma lista de prompts de `prompts.json`, gera as músicas em lote no Lyria 3.5 ou no Lyria 3 Pro (`model` por prompt) e baixa cada faixa pronta.

Artigo em português: [Dá para usar a assinatura do Google AI por API? O que os planos Plus, Pro e Ultra oferecem](https://useapi.net/docs/articles/google-ai-subscription-api-pt?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api). Documentação completa: [Flow Music API](https://useapi.net/docs/api-flowmusic-v1?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api).

## Về repo này

Ví dụ Node.js cho Google Flow Music API của [useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api), một REST API của bên thứ ba tạo bài hát hoàn chỉnh bằng Lyria 3.5 và Lyria 3 Pro của Google, có lời hoặc không lời, với lời bài hát của riêng bạn, cùng cover, remix, kéo dài bài và tách stem.

- Flow Music đi kèm gói Google AI của bạn: Ultra được 30.000 credit mỗi tháng, Pro 10.000 và Plus 3.000, tách biệt với credit Google Flow. Các gói riêng của Flow Music cũng dùng được: Member $64, Plus $24, Starter $8 mỗi tháng hoặc gói miễn phí (tháng 11/2026).
- Không cần dự án Google Cloud, không cần thanh toán Gemini API và không cần Flow Music API key: bạn gọi API bằng token của useapi.net.
- Tài khoản Google bạn dùng tại flowmusic.app được kết nối một lần bằng quy trình trình duyệt tự động.
- Chi phí: một bài Lyria 3.5 tốn 5 credit, khoảng $0,010 trên Google AI Pro $19,99 (2.000 bài mỗi tháng), so với $0,08 một bài trên Gemini API của Google (tháng 11/2026). useapi.net giá $15 mỗi tháng, gồm mọi API.
- Ví dụ `lyria-music/` đọc danh sách prompt từ `prompts.json`, tạo hàng loạt bài hát bằng Lyria 3.5 hoặc Lyria 3 Pro (`model` theo từng prompt) và tải về mọi bài đã xong.

Bài viết tiếng Việt: [Dùng gói Google AI qua API được không? Plus, Pro và Ultra cho bạn những gì](https://useapi.net/docs/articles/google-ai-subscription-api-vi?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api). Tài liệu đầy đủ: [Flow Music API](https://useapi.net/docs/api-flowmusic-v1?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api).

## Tentang repo ini

Ini adalah contoh kode Node.js untuk Google Flow Music API dari [useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api), API pihak ketiga untuk membuat lagu utuh, dengan vokal atau instrumental, memakai Lyria 3.5 atau Lyria 3 Pro dari Google, dengan lirik Anda sendiri, serta cover, remix, extend, penggantian bagian lagu dan pemisahan stem.

- Berjalan di kredit Flow Music yang sudah termasuk di paket Google AI Anda: Plus mendapat 3.000, Pro 10.000 dan Ultra 30.000 kredit per bulan, terpisah dari kredit Flow. Bisa juga dengan paket Flow Music Anda sendiri (Free, Starter $8, Plus $24 atau Member $64 per bulan) (per November 2026).
- Tanpa project Google Cloud dan tanpa billing Gemini API. Google tidak punya API publik untuk Flow Music.
- Akun dihubungkan sekali lewat [setup Flow Music](https://useapi.net/docs/start-here/setup-flowmusic?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api): setup otomatis membuat Anda login ke Google di browser jarak jauh, tanpa menyalin cookie.
- Harga: satu lagu memakai 5 kredit, jadi Google AI Pro $19,99 membuat sekitar 2.000 lagu per bulan, sekitar $0,010 per lagu, dibanding $0,08 per lagu Lyria 3.5 di Gemini API Google (per November 2026). Langganan useapi.net $15 per bulan untuk semua API.
- Contoh di repo: `lyria-music/` membaca prompt dari `prompts.json`, memilih `model` per prompt, membuat lagu secara batch lalu mengunduh setiap lagu yang sudah jadi. Tersedia juga MCP server yang di-hosting dengan 18 tools.

Artikel bahasa Indonesia (kredit dan jumlah lagu Flow Music di setiap paket Google AI): [Bisakah Langganan Google AI Dipakai Lewat API? Isi Paket Plus, Pro dan Ultra](https://useapi.net/docs/articles/google-ai-subscription-api-id?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api). Dokumentasi lengkap: [Flow Music API](https://useapi.net/docs/api-flowmusic-v1?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api).

## เกี่ยวกับ repo นี้

นี่คือตัวอย่างโค้ด Node.js สำหรับ Google Flow Music API ของ [useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) ซึ่งเป็น API ของบุคคลที่สาม ใช้สร้างเพลงเต็มเพลงทั้งแบบมีเสียงร้องและดนตรีล้วนด้วย Lyria 3.5 หรือ Lyria 3 Pro ของ Google ใส่เนื้อเพลงเองได้ และทำคัฟเวอร์ รีมิกซ์ ต่อความยาวเพลง แทนที่ท่อนเพลง และแยกสเต็มได้

- ใช้เครดิต Flow Music ที่มากับแพ็กเกจ Google AI ของคุณ: Plus ได้ 3,000 Pro ได้ 10,000 และ Ultra ได้ 30,000 เครดิตต่อเดือน แยกจากเครดิต Flow หรือใช้แพ็กเกจ Flow Music ของคุณเอง (ฟรี, Starter $8, Plus $24 หรือ Member $64 ต่อเดือน) (ข้อมูล ณ พฤศจิกายน 2026)
- ไม่ต้องมีโปรเจกต์ Google Cloud หรือเปิดการเรียกเก็บเงิน Gemini API และ Google ก็ไม่มี Flow Music API แบบสาธารณะ
- เชื่อมบัญชีครั้งเดียวผ่าน[หน้าตั้งค่า](https://useapi.net/docs/start-here/setup-flowmusic?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) ระบบล็อกอิน Google ให้ในเบราว์เซอร์ระยะไกล ไม่ต้องคัดลอก cookie
- ราคา: เพลงหนึ่งเพลงใช้ 5 เครดิต บน Google AI Pro $19.99 ได้ราว 2,000 เพลงต่อเดือน หรือราว $0.010 ต่อเพลง เทียบกับ $0.08 ต่อเพลง Lyria 3.5 บน Gemini API ของ Google (ข้อมูล ณ พฤศจิกายน 2026) ค่าบริการ useapi.net คือ $15 ต่อเดือน รวมทุก API
- ตัวอย่างใน repo: `lyria-music/` อ่านพรอมต์จาก `prompts.json` กำหนด `model` ได้ทีละพรอมต์ ส่งงานทีละหลายเพลง แล้วดาวน์โหลดทุกเพลงที่เสร็จ และยังมี MCP server แบบโฮสต์ (18 เครื่องมือ)

บทความภาษาไทย (แต่ละแพ็กเกจ Google AI ได้เครดิตและเพลง Flow Music เท่าไร): [ใช้แพ็กเกจ Google AI ผ่าน API ได้ไหม? Plus, Pro และ Ultra ได้อะไรบ้าง](https://useapi.net/docs/articles/google-ai-subscription-api-th?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) เอกสารฉบับเต็ม: [Flow Music API](https://useapi.net/docs/api-flowmusic-v1?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api)

## About useapi.net

[useapi.net](https://useapi.net/?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) is a third-party REST API for AI websites. The Flow Music API runs on your [Flow Music subscription](https://www.flowmusic.app/pricing), or on the Flow Music plan included with [Google AI Plus](https://support.google.com/googleone/answer/16882689), [Google AI Pro](https://support.google.com/googleone/answer/14534406) or [Google AI Ultra](https://support.google.com/googleone/answer/16286513), so you generate at its plan credit prices instead of metered developer pricing. See the [model matrix](https://useapi.net/model-matrix?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api) and pricing on the [API overview](https://useapi.net/docs/api-flowmusic-v1?utm_source=github.com&utm_medium=referral&utm_campaign=flowmusic-api).

Visit our [Discord Server](https://discord.gg/w28uK3cnmF) or [Telegram Channel](https://t.me/use_api) for any support questions and concerns.

We regularly post guides and tutorials on the [YouTube Channel](https://www.youtube.com/@useapi-net).

## License

The example code in this repository is released under the [MIT License](./LICENSE). It covers the example scripts only, not the useapi.net service or API.
