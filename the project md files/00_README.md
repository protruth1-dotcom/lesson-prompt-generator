# Lesson Prompt Generator — Build Specifications

## How to Use These Files

These 6 specification documents contain everything needed to build the Lesson Prompt Generator app. Copy and paste them into Claude (or another AI) as context when building.

### Recommended Build Approach

**Step 1 — Provide all specs as context:**
Paste all 6 files into a single conversation. Tell the AI: "These are the complete specifications for an app I want you to build. Read all of them before starting."

**Step 2 — Build in phases:**

**Phase 1: Core Structure**
- Build the React app shell with navigation (Generator, History)
- Implement the form UI (Cards 1-4) with all selectors and inputs
- Load the curriculum data (all subjects, topics per grade)
- Ensure Arabic text renders correctly for Islamic Studies topics

**Phase 2: Prompt Engine**
- Implement the prompt assembly logic from 03_PROMPT_ENGINE.md
- Wire up all variable replacements
- Include the Islamic Studies block from 04_ISLAMIC_STUDIES_SPEC.md
- Include the quiz block from 05_QUIZ_CONFIG.md
- Implement auto-mode distribution calculations

**Phase 3: Preview & Actions**
- Build the Preview view with editable text area
- Implement copy-to-clipboard
- Implement save to local storage
- Build the History view with view/copy/delete

**Phase 4: Polish**
- Responsive design
- Accessibility pass
- Edge case handling
- Visual polish and animation

---

## File Index

| File | Contents |
|------|----------|
| `01_PROJECT_OVERVIEW.md` | App purpose, user flow, AI target differences, 5E lesson structure, visual tiers, differentiation, all feature descriptions |
| `02_CURRICULUM_DATA.md` | Complete topic lists for all 5 subjects across both grades — Math, ELA, Science, Social Studies (Illinois standards), Islamic Studies (Safar Academy) |
| `03_PROMPT_ENGINE.md` | Full prompt template with all variables, conditional logic, visual instruction blocks, platform-specific commands, assembly order |
| `04_ISLAMIC_STUDIES_SPEC.md` | Arabic/Quran/Dua formatting rules, Safar Academy topic lists with Arabic script for both grades, visual strategy, quiz adjustments |
| `05_QUIZ_CONFIG.md` | Auto and manual mode logic, distribution percentages per subject per difficulty level, all 7 question type specifications, Bloom's taxonomy ordering |
| `06_UI_SPEC.md` | Three-view layout, component specs, Arabic text handling, local storage schema, accessibility requirements, states and edge cases |

---

## Key Decisions Summary

- **Grades:** 4th and 5th only
- **Subjects:** Math, ELA, Science, Social Studies (Illinois standards), Islamic Studies (Safar Academy)
- **AI Targets:** Claude, ChatGPT, Gemini, Other
- **Lesson Pedagogy:** 5E Instructional Model (Engage, Explore, Explain, Elaborate, Evaluate)
- **Quiz Pedagogy:** Bloom's Taxonomy progression (Remember → Understand → Apply → Analyze → Evaluate → Create)
- **Visuals:** Tier 1 (SVG-capable, generated directly) + Tier 2 (image-required: AI generation + search sources + description)
- **Islamic Studies:** Arabic script only (no transliteration), Mustafa Khattab Quran translation, authentic Sunni hadith sources for duas, Safar Academy curriculum
- **Quiz:** 7 question types, auto or manual distribution, ordered by Bloom's taxonomy
- **Features:** Lesson length control, student level differentiation, cross-curricular toggle, prompt preview with edit, saved history
