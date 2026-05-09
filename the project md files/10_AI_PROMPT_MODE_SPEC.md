# Additional Specification — AI-Generated Prompt Mode (ChatGPT API)

## Overview

The app now has **two methods** for generating the prompt text:

1. **Template Mode** (existing) — instant, pre-written template with variable substitution. Free, offline, no API needed.
2. **AI Mode** — the app sends the user's selections plus all the pedagogical rules, curriculum context, and formatting requirements to ChatGPT's API. ChatGPT crafts a custom, topic-specific prompt. The result is a richer, more tailored prompt because the AI can customize examples, analogies, hook ideas, and visual suggestions specifically for that topic rather than using generic template placeholders.

In both modes, the output is still a **text prompt** that the user copies and pastes into any AI (Claude, Gemini, ChatGPT, etc.) to generate the actual lesson and quiz.

---

## UI Changes

### Prompt Generation Mode Toggle

Add to **Card 3: Lesson Settings** in `06_UI_SPEC.md`, or as a new small card between the quiz config and the Generate button:

- **Prompt Mode** — Button group: `Template` | `AI Generated`
- Default: `Template`
- When `AI Generated` is selected, a small note appears below: "Uses your ChatGPT API key to craft a custom prompt tailored to your topic."
- If no API key is saved, show: "API key required. Go to Settings to add your OpenAI API key." with a link to the Settings panel.

### Settings Panel

Add a **Settings** icon/link in the top navigation bar (gear icon). The Settings panel includes:

- **OpenAI API Key** — Password-type input field with show/hide toggle
- **Save** button — saves the key to local storage (encrypted or obscured, not plain text)
- **Remove Key** button — clears the saved key from local storage
- **Test Connection** button — sends a minimal API call to verify the key works. Shows "Connected" (green) or "Invalid key" (red)
- A note: "Your API key is stored locally in your browser. It is never sent anywhere except directly to OpenAI's servers."

### Generate Button Behavior

| Prompt Mode | Button Label | Behavior |
|-------------|-------------|----------|
| Template | "Generate Prompt" | Instant. Assembles template, navigates to Preview. |
| AI Generated | "Generate with AI" | Shows loading spinner. Sends request to ChatGPT API. On response, navigates to Preview with the AI-generated prompt. |

### Loading State (AI Mode)

- The "Generate with AI" button shows a spinner and changes text to "Generating..." while waiting
- Estimated wait: 10-30 seconds depending on response length
- If the API call fails, show an error message: "Failed to generate prompt. Please check your API key and internet connection." with a "Try Again" button
- Timeout after 60 seconds with message: "Request timed out. Please try again."

---

## How AI Mode Works

### What Gets Sent to ChatGPT

The app sends a **meta-prompt** to ChatGPT. This meta-prompt says: "You are a prompt engineering expert. Based on the following parameters and rules, write a comprehensive, detailed prompt that another AI can use to generate a complete lesson and quiz."

The meta-prompt includes:

1. **All user selections** — grade, subject, topic, lesson length, student level, output format, target AI, cross-curricular toggle, quiz configuration
2. **All pedagogical rules** — 5E model structure, Bloom's taxonomy quiz ordering, scaffolded instruction, vocabulary box requirements, visual tier system, prior knowledge check, learning objectives, real-world application, "Did You Know?" boxes, summary section
3. **All formatting rules** — based on output format (Interactive or Print), including all the design, grading, AI checker, or print layout requirements from specs 07 and 09
4. **All Islamic Studies rules** (if applicable) — Arabic script, no transliteration, Mustafa Khattab translation, authentic Sunni hadith sources, character building takeaway, Safar Academy alignment
5. **Quiz specifications** — question types, counts, Bloom's ordering, auto/manual distribution, question type instructions
6. **Visual instructions** — Tier 1/Tier 2 classification for the selected topic, platform-specific commands based on target AI
7. **A clear instruction** — "Write the prompt as if you are instructing another AI to generate this lesson. The prompt should be comprehensive, specific to this exact topic, and ready to copy-paste."

### Meta-Prompt Template

```
You are an expert educational prompt engineer. Your job is to write a highly detailed, comprehensive prompt that will be pasted into another AI (such as Claude, Gemini, or ChatGPT) to generate a complete {grade_level} lesson and quiz.

PARAMETERS:
- Grade: {grade}
- Subject: {subject}
- Topic: {topic_name}
- Student Level: {student_level} — {student_level_detail}
- Lesson Length: {lesson_length_description}
- Output Format: {output_format} (Interactive HTML/CSS/JS OR Print-ready HTML)
- Target AI: {target_ai}
- Cross-Curricular Connections: {yes/no}
- Quiz Mode: {auto/manual}
- Total Quiz Questions: {total_questions}
{quiz_distribution_details}

PEDAGOGICAL FRAMEWORK:
The prompt you write must instruct the AI to follow the 5E Instructional Model in this exact order:
1. Prior Knowledge Check ("What You Should Already Know") — 2-3 prerequisite concepts
2. Learning Objectives — 2-3 measurable objectives using Bloom's Taxonomy action verbs
3. Engage — {engage_instruction_for_subject}
4. Explore — Student-driven discovery before explanation
5. Explain — Scaffolded core content with: Key Vocabulary Box (term + definition + example), "Did You Know?" callout boxes ({did_you_know_count}), Real-World Application box, visuals and illustrations
6. Elaborate — Apply concept to new situations {cross_curricular_note}
7. Summary — {summary_point_count} key takeaways before quiz

QUIZ FRAMEWORK:
The prompt must instruct the AI to create a quiz following Bloom's Taxonomy progression. Questions ordered from recall to critical thinking:
1. Vocabulary (matching/context)
2. Fill in the Blank
3. Multiple Choice
4. True/False with Explanation
5. Diagram/Visual-Based
6. Short Answer
7. Scenario-Based (Critical Thinking)

Question distribution:
{question_distribution_list_with_counts}

{quiz_type_instructions_for_each_type}

VISUAL REQUIREMENTS:
{visual_instructions_block_for_this_topic}

{islamic_studies_block_if_applicable}

OUTPUT FORMAT REQUIREMENTS:
{full_output_format_block_from_spec_07_or_09}

DELIVERY NOTE:
{platform_delivery_note}

---

NOW WRITE THE PROMPT:
Write a complete, ready-to-paste prompt that covers all of the above. The prompt should:
- Be specific to the topic "{topic_name}" — include topic-specific examples, analogies, vocabulary terms, visual descriptions, and hook ideas
- Be written as direct instructions to the AI that will receive it
- Include every section and requirement listed above
- Be detailed enough that the receiving AI produces a complete, high-quality lesson without needing any clarification
- Use clear, organized formatting with section headers

Do NOT generate the lesson itself. Generate only the PROMPT that will instruct another AI to generate the lesson.
```

### API Call Implementation

```javascript
const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are an expert educational prompt engineer specializing in creating detailed, comprehensive prompts for AI-generated lessons and quizzes aligned with educational standards."
      },
      {
        role: "user",
        content: metaPrompt // The assembled meta-prompt above
      }
    ],
    max_tokens: 8000,
    temperature: 0.7
  })
});

const data = await response.json();
const generatedPrompt = data.choices[0].message.content;
```

### Model Selection

- Default model: `gpt-4o` (best quality for prompt writing)
- Optional: Add a model selector in Settings for users who want to use `gpt-4o-mini` (cheaper, faster) or other models
- The model selector would show: `GPT-4o (Recommended)` | `GPT-4o Mini (Faster/Cheaper)`

---

## API Key Security

- The API key is stored in **local storage** only
- The key is used **only** for direct browser-to-OpenAI API calls
- The key is **never** sent to any other server
- The app includes no backend — everything runs client-side
- The Settings panel shows a clear privacy note: "Your API key stays in your browser and is sent only to OpenAI's servers. We do not store, transmit, or have access to your key."
- For additional security, the key can be lightly obfuscated in local storage (base64 encode) — not true encryption, but prevents casual exposure in DevTools

---

## Error Handling

| Error | User Message |
|-------|-------------|
| No API key saved | "Please add your OpenAI API key in Settings to use AI-generated prompts." |
| Invalid API key (401) | "Invalid API key. Please check your key in Settings." |
| Rate limited (429) | "Too many requests. Please wait a moment and try again." |
| Network error | "Could not connect to OpenAI. Please check your internet connection." |
| Timeout (60s) | "Request timed out. The AI may be busy — please try again." |
| Unexpected error | "Something went wrong. Please try again or switch to Template mode." |
| Content filtered | "The AI could not generate this prompt. Please try again or use Template mode." |
| Insufficient quota | "Your OpenAI account has insufficient credits. Please check your billing at platform.openai.com." |

All errors show a "Switch to Template Mode" fallback button so the user is never stuck.

---

## Preview Screen — Differences by Mode

| Feature | Template Mode | AI Mode |
|---------|--------------|---------|
| Generation time | Instant | 10-30 seconds |
| Prompt content | Generic template with variables filled in | Custom, topic-specific language, examples, and suggestions crafted by ChatGPT |
| Editable | Yes | Yes — the user can still edit the AI-generated prompt before copying |
| Regenerate | "Regenerate" button re-assembles template | "Regenerate with AI" button sends a new API call (may produce different result) |
| Cost | Free | Uses OpenAI API credits (approximately $0.01-0.05 per generation with GPT-4o) |
| Offline | Works offline | Requires internet |
| Badge/label | Small label: "Template Generated" | Small label: "AI Generated" |

---

## Why Both Modes Matter

**Template Mode** is the reliable, free, instant default. It produces consistent, well-structured prompts every time. It works offline and costs nothing.

**AI Mode** adds value because ChatGPT can:
- Write topic-specific hook ideas (e.g., for the water cycle: "What if it stopped raining for a year?")
- Suggest topic-specific analogies a student would understand
- Recommend specific vocabulary terms relevant to that exact topic
- Describe topic-specific visuals in more detail
- Craft scenario-based quiz questions tailored to the specific content
- Adjust language and examples in ways a static template cannot

The AI-generated prompt is likely to produce a better final lesson because it gives the receiving AI more specific, customized instructions rather than generic placeholders.

---

## Local Storage Schema Update

Add to the schema in `06_UI_SPEC.md`:

```json
{
  "settings": {
    "openaiApiKey": "base64-encoded-key-string",
    "openaiModel": "gpt-4o",
    "preferredPromptMode": "template"
  },
  "lessonPrompts": [
    {
      "id": "uuid-string",
      "createdAt": "2026-03-15T10:30:00Z",
      "promptMode": "template | ai",
      "grade": "4th Grade",
      "subject": "Science",
      "topic": "Water cycle",
      "targetAI": "Claude",
      "outputFormat": "interactive | print",
      "lessonLength": "Medium",
      "studentLevel": "On Level",
      "crossCurricular": true,
      "quizMode": "Auto",
      "totalQuestions": 10,
      "difficulty": "Balanced",
      "promptText": "Full prompt string..."
    }
  ]
}
```
