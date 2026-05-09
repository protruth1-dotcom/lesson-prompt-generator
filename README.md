# Lesson Prompt Generator

Generate AI-ready lesson prompts for 4th and 5th grade. Select grade, subject, topic, and quiz configuration to build a structured prompt following the 5E instructional model that you paste into ChatGPT, Claude, or Gemini to produce complete interactive lessons.

## Features

- **5 subjects**: Math, ELA, Science, Social Studies, Islamic Studies (with Arabic support)
- **Two generation modes**: Template (instant, offline) and AI Generated (via OpenAI API)
- **Two output formats**: Interactive HTML (self-contained web app) and Print-ready HTML (PDF-friendly)
- **Auto or Manual quiz config**: 7 question types ordered by Bloom's taxonomy
- **Smart visual routing**: 3-tier system routes visuals to SVG, images, or AI generation based on topic complexity
- **History**: Saved prompts stored locally in your browser

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## Build

```bash
npm run build
npm run preview
```

## AI Mode

To use AI-generated prompts, add your OpenAI API key in the Settings panel (gear icon). Your key is stored only in your browser's localStorage and sent directly to OpenAI's API — never to any other server.

## Tech Stack

- React 19 + Vite 8
- Tailwind CSS 4
- No backend required
