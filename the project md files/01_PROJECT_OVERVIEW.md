# Lesson Prompt Generator — Project Overview

## What This App Does

This is a **prompt generator web app** for teachers and parents of 4th and 5th grade students. The user selects a grade, subject, topic, and quiz configuration. The app assembles a detailed, pedagogically structured prompt. The user copies that prompt and pastes it into an AI (Claude, ChatGPT, Gemini, or others) which then generates the full lesson and quiz.

The app does NOT generate lessons itself. It generates the **prompt** that instructs an AI to produce a high-quality, standards-aligned lesson.

## Tech Stack

- **React** single-page application (single .jsx artifact file)
- All data (curriculum, prompt templates) embedded in the app
- Local storage for saved prompt history
- No backend required

## Core User Flow

1. Select **Grade** → 4th or 5th
2. Select **Subject** → Math, ELA, Science, Social Studies, Islamic Studies
3. Select **Topic** → Pre-loaded list filtered by grade and subject (aligned to Illinois standards / Safar Academy)
4. Select **Target AI** → Claude, ChatGPT, Gemini, Other
5. Select **Lesson Length** → Short (15 min), Medium (30 min), Long (45 min)
6. Select **Student Level** → Below Level, On Level, Above Level
7. Toggle **Cross-Curricular Connections** → Yes / No
8. Configure **Quiz** → Auto mode or Manual mode (see QUIZ_CONFIG.md)
9. Click **Generate Prompt**
10. **Preview** the generated prompt with ability to edit
11. **Copy** to clipboard
12. Prompt is saved to **history** (local storage)

## AI Target Differences

The generated prompt adjusts visual commands based on the selected AI:

| Target AI | Tier 1 Visuals (SVG-capable) | Tier 2 Visuals (Image-required) |
|-----------|------------------------------|----------------------------------|
| **Claude** | "Generate an SVG diagram / HTML widget showing..." | "Attempt an SVG illustration of..." + "Provide search queries for accurate images" + "Describe what the illustration should show" |
| **ChatGPT** | "Generate a diagram showing..." | "Generate an image showing..." + "Provide search queries for accurate images" + "Describe what the illustration should show" |
| **Gemini** | "Generate a diagram showing..." | "Generate an image showing..." + "Provide search queries for accurate images" + "Describe what the illustration should show" |
| **Other** | "Generate a visual diagram showing..." | "Generate an image or detailed description of..." + "Provide search queries for accurate images" + "Describe what the illustration should show" |

### Visual Tier Classification

**Tier 1 — SVG/Diagram capable (generate directly):**
Math shapes, number lines, bar graphs, pie charts, Venn diagrams, flowcharts, timelines, graphic organizers, food chain hierarchies, story maps, T-charts, comparison tables

**Tier 2 — Image required (generate + search sources + description):**
Water cycle, human body systems, rock layers, plant/animal cell diagrams, ecosystems, weather patterns, geological formations, historical scenes, maps, scientific processes, animal habitats

## Lesson Structure (5E Instructional Model)

Every generated prompt instructs the AI to follow this structure:

1. **Prior Knowledge Check** — "What You Should Already Know" (2-3 bullet points of prerequisite knowledge)
2. **Learning Objectives** — 2-3 measurable "By the end of this lesson, you will be able to..." statements
3. **Engage (Hook)** — Surprising fact, question, story, or real-world scenario to activate curiosity
4. **Explore** — Student-driven discovery activity, thought experiment, or observation task
5. **Explain** — Core content delivery with:
   - Key Vocabulary Box (terms with definitions and examples)
   - Scaffolded instruction (simple → complex)
   - Visuals (Tier 1 or Tier 2 based on subject/topic)
   - "Did You Know?" callout boxes
   - Real-World Application box ("Why does this matter in real life?")
6. **Elaborate** — Extend concept to new situations, deeper application
   - Cross-curricular connections (if toggled on)
7. **Summary/Review** — 3-5 key takeaways before the quiz
8. **Quiz** — Configured per user settings (see QUIZ_CONFIG.md)
9. **Answer Key** — Separated at the end, each answer includes explanation of WHY it's correct

## Student Level Differentiation

| Level | Language | Content | Examples |
|-------|----------|---------|----------|
| **Below Level** | Simpler sentences, shorter paragraphs, more definitions inline | Same core concepts, fewer sub-topics | More concrete, everyday examples |
| **On Level** | Grade-appropriate vocabulary and sentence complexity | Full topic coverage | Mix of concrete and abstract |
| **Above Level** | Richer vocabulary, longer passages, more nuance | Extended depth, bonus connections | More abstract, challenges assumptions |

## Lesson Length

| Length | Sections Affected | Detail Level |
|--------|-------------------|--------------|
| **Short (15 min)** | Engage is brief, Explore is a quick question, Explain covers core only, Elaborate is 1 sentence, Summary is 3 points | Minimal |
| **Medium (30 min)** | All sections present, moderate depth | Standard |
| **Long (45 min)** | All sections expanded, multiple visuals, extended Elaborate with discussion questions | Comprehensive |

## App Features

- **Prompt Preview & Edit**: Full text preview before copying. User can edit any part of the prompt before copying.
- **Copy to Clipboard**: One-click copy button
- **Saved History**: Prompts saved to local storage with date, grade, subject, topic label. User can view, re-copy, or delete past prompts.
- **Responsive Design**: Works on desktop and tablet

## File References

- `02_CURRICULUM_DATA.md` — All subjects, topics per grade, standards alignment
- `03_PROMPT_ENGINE.md` — Complete prompt template with all variables and logic
- `04_ISLAMIC_STUDIES_SPEC.md` — Islamic Studies specific requirements and Safar Academy alignment
- `05_QUIZ_CONFIG.md` — Quiz mode details, question types, Bloom's taxonomy mapping
- `06_UI_SPEC.md` — Interface layout, components, design direction
