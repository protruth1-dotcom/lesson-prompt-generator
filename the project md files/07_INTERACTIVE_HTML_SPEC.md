# Additional Specification — Interactive HTML Output & AI-Checked Quiz

## Overview

This document supplements the original 6 spec files. It changes the **output format** of the generated prompt. Instead of instructing the AI to produce a text-based lesson and quiz, the prompt now instructs the receiving AI to generate a **complete interactive HTML/CSS/JavaScript application** that the student opens and uses directly in a browser.

**This file does NOT replace the previous specs.** It modifies specific behaviors. When building, apply this on top of the original specifications.

---

## Key Changes from Original Specs

### 1. Answer Key — REMOVED

The prompt no longer includes Section 9 (Answer Key) from the 5E lesson structure. Remove the entire answer key section and all references to it. The interactive application handles grading, correct answers, and feedback automatically.

**Remove from 03_PROMPT_ENGINE.md template:**
```
### 9. ANSWER KEY
(entire section removed)
```

**Remove from prompt instructions any mention of:**
- "Place the answer key at the very end"
- "ANSWER KEY — For Teacher Use"
- "Separated at the end"
- Answer explanations in a separate section

The answer explanations now live inside the JavaScript grading logic — shown to the student per-question after submission.

---

### 2. Output Format — Interactive HTML/CSS/JavaScript

The generated prompt must include the following output format instruction block. This replaces the original "FORMATTING REQUIREMENTS" section:

```
## OUTPUT FORMAT

Generate the ENTIRE lesson and quiz as a single, self-contained HTML file with embedded CSS and JavaScript. This file should be a fully interactive web application that a student opens in a browser.

### Design Requirements:
- Student-friendly, colorful, and engaging design appropriate for {grade_level} students
- Large, readable fonts (minimum 16px body text)
- Bright, inviting color scheme with visual hierarchy
- Smooth transitions and subtle animations to keep students engaged
- Clear navigation between lesson sections (Next/Previous buttons or scrollable sections)
- Mobile-responsive so it works on tablets and computers
- Progress indicator showing how far through the lesson the student is
- All lesson sections (Prior Knowledge, Engage, Explore, Explain, Elaborate, Summary) are clearly separated with visual section headers
- Visuals, diagrams, and illustrations are rendered inline within the HTML (SVG, CSS graphics, or embedded images)
- "Did You Know?" boxes and "Real-World Application" boxes are visually distinct (colored cards, icons, or callout styling)
- Key Vocabulary Box is styled as an interactive or visually highlighted component

### Quiz Requirements (Interactive):
- The quiz section is clearly separated from the lesson with a visual break
- Each question is displayed one at a time OR as a scrollable form — choose whichever provides a better student experience
- All questions are interactive:

  **Auto-Graded Questions (JavaScript handles these):**
  - Vocabulary (matching): Drag-and-drop or select matching pairs
  - Multiple Choice: Clickable radio buttons or styled option cards
  - True/False: Clickable True/False buttons
  - Fill in the Blank: Text input field with exact-match checking (case-insensitive, trim whitespace)
  - Diagram/Visual-Based: Clickable labels, drag-and-drop onto diagram, or select from options overlaid on the visual

  **AI-Checked Questions (built-in AI evaluates these):**
  - True/False with Explain: The True/False part is auto-graded; the written explanation is evaluated by an AI checker
  - Short Answer: Student types 2-4 sentences; an AI checker evaluates the response
  - Scenario-Based (Critical Thinking): Student types their reasoning; an AI checker evaluates the response

### AI Checker Implementation:
For questions that require written input (short answer, scenario-based, and the explanation portion of True/False), build an AI checker directly into the application. The AI checker should:
- Accept the student's written response
- Evaluate whether the response demonstrates understanding of the concept
- Provide a score or rating (e.g., Excellent / Good / Needs Improvement)
- Give specific, encouraging, student-friendly feedback explaining what was strong and what could be improved
- If the response is incorrect or incomplete, guide the student toward the correct answer without simply giving it away
- Use language appropriate for {grade_level} students

### Grading & Scoring:
- After the student completes all questions and submits, display a results screen showing:
  - Total score (e.g., 8/10 correct — 80%)
  - Per-question breakdown: green checkmark for correct, red X for incorrect
  - For each incorrect auto-graded question: show the correct answer and a brief explanation of why it is correct
  - For each AI-checked question: show the AI feedback and rating
- Include a "Review Mistakes" option that lets the student revisit only the questions they got wrong
- Include an encouraging message based on score:
  - 90-100%: Celebration message (e.g., "Amazing work! You mastered this topic!")
  - 70-89%: Positive encouragement (e.g., "Great job! Review the ones you missed and you'll have it down!")
  - Below 70%: Supportive message (e.g., "Good effort! Let's review the lesson and try again. You're getting there!")
- Include a "Retake Quiz" button that resets all answers

### Single File Requirement:
The entire application — HTML structure, CSS styling, and JavaScript logic — must be in a SINGLE .html file. No external dependencies except:
- Google Fonts (for typography, loaded via CDN link)
- A font that supports Arabic script if the lesson is Islamic Studies

Do NOT use any frameworks (no React, no Vue, no Angular). Use vanilla HTML, CSS, and JavaScript only. The file must work by simply opening it in any modern web browser.
```

---

### 3. Visual Instructions Update

The visual instructions in 03_PROMPT_ENGINE.md remain the same in terms of what visuals to include. However, the platform-specific commands are updated since the output is now HTML:

**Updated Tier 1 command (all AI targets):**
```
Generate this visual directly within the HTML page using SVG, CSS graphics, or HTML Canvas. Make it colorful, clearly labeled, and interactive where appropriate (e.g., hoverable labels, clickable elements that reveal more info). The visual must render inline within the lesson section where it is discussed.
```

**Updated Tier 2 command (all AI targets):**
```
a) GENERATE: Create this illustration directly within the HTML page using SVG, CSS graphics, or HTML Canvas. Make it as accurate and detailed as possible with clear labels, appropriate colors, and a style suitable for elementary students.

b) SEARCH SOURCES: Also include a small "Find a better image" link below the generated visual with these search queries the teacher can use:
   - Search query: "{search_query_1}"
   - Search query: "{search_query_2}"
   The links should open in a new tab pointing to Google Image Search with the query pre-filled.

c) VISUAL DESCRIPTION: Include an alt-text description on the visual: "{detailed_description_of_what_image_must_contain}"
```

**Note:** Since the output is now always HTML, the AI target toggle (Claude/ChatGPT/Gemini/Other) no longer changes the visual commands. However, keep the AI target toggle in the app because it still affects the overall prompt framing and any platform-specific instructions for how to deliver the HTML output.

---

### 4. AI Target — Updated Instructions

Since the output is always HTML now, add this platform-specific delivery note at the end of the prompt based on the selected AI:

**Claude:**
```
DELIVERY: Generate this as a single HTML artifact. The student will interact with it directly in the artifact panel.
```

**ChatGPT:**
```
DELIVERY: Generate this as a single, complete HTML file. Output the full code so it can be saved as a .html file and opened in a browser.
```

**Gemini:**
```
DELIVERY: Generate this as a single, complete HTML file within the canvas. The student will interact with it directly.
```

**Other:**
```
DELIVERY: Generate this as a single, complete HTML file. Output the full HTML/CSS/JavaScript code so it can be saved as a .html file and opened in any modern web browser.
```

---

### 5. Updated 5E Lesson Structure for HTML Context

The 5E structure remains identical in content. The only change is that the prompt now frames each section as a **visual section within the HTML application** rather than a text document. Add this instruction:

```
Each section of the 5E lesson (Prior Knowledge, Learning Objectives, Engage, Explore, Explain, Elaborate, Summary) should be a distinct, visually separated section in the HTML application. Use:
- Section headers with icons or decorative elements
- Smooth scroll or "Next Section" / "Previous Section" navigation
- A progress bar or step indicator at the top showing where the student is in the lesson
- Transition animations between sections to keep the student engaged
- A final "Start Quiz" button that transitions from the lesson to the quiz
```

---

### 6. Islamic Studies — Arabic in HTML

Add to the Islamic Studies block:

```
For Arabic text rendering in the HTML application:
- Use a Google Font that supports Arabic script (e.g., "Noto Sans Arabic" or "Amiri")
- Apply dir="rtl" and lang="ar" attributes to all Arabic text elements
- Arabic text should be displayed larger than surrounding English text for readability (at least 20px)
- Quran ayat should be visually distinguished — centered, larger font, decorative border or background, with translation directly below
- Duas should be styled similarly to ayat — prominent Arabic text with English translation below and source citation in smaller text
```

---

### 7. Quiz Question Rendering in HTML

Updated rendering specs for each question type in the interactive format:

| Question Type | HTML Rendering | Grading Method |
|---------------|---------------|----------------|
| **Vocabulary (Matching)** | Two columns — drag terms to match definitions, or dropdown selectors next to each definition | Auto-graded (JavaScript) |
| **Multiple Choice** | Styled clickable cards or radio buttons with A/B/C/D labels | Auto-graded (JavaScript) |
| **True/False with Explain** | Two clickable buttons (True/False) + text area for explanation | True/False: auto-graded; Explanation: AI-checked |
| **Fill in the Blank** | Sentence with inline text input field + word bank displayed above | Auto-graded (JavaScript, case-insensitive match) |
| **Short Answer** | Text area (min 2 sentences prompt) with character/word count indicator | AI-checked |
| **Diagram/Visual-Based** | SVG/image with clickable hotspots, drag-and-drop labels, or overlay selections | Auto-graded (JavaScript) |
| **Scenario-Based** | Scenario text + text area for student response | AI-checked |

---

### 8. Scoring Display Specification

The results screen in the HTML application should include:

```
After submission, display a results screen with:

1. SCORE HEADER:
   - Large, centered score: "{correct}/{total} — {percentage}%"
   - Visual score indicator (progress ring, bar, or star rating)
   - Encouraging message based on score tier

2. QUESTION-BY-QUESTION BREAKDOWN:
   - Scrollable list of all questions
   - Each shows: question number, question text (abbreviated), student's answer, correct/incorrect icon
   - Incorrect auto-graded questions: show the correct answer + brief explanation
   - AI-checked questions: show the AI feedback and rating

3. ACTION BUTTONS:
   - "Review Mistakes" — scrolls to or filters only incorrect questions with explanations visible
   - "Retake Quiz" — resets all answers and returns to the first question
   - "Back to Lesson" — returns to the lesson content for review

4. SCORE TIER MESSAGES:
   - 90-100%: "Amazing work! You really mastered {topic_name}!" (with celebration animation — confetti, stars, etc.)
   - 70-89%: "Great job! You're almost there. Review the ones you missed and you'll nail it!"
   - 50-69%: "Good effort! Go back through the lesson and try again — you're learning!"
   - Below 50%: "No worries — every expert was once a beginner! Review the lesson and give it another try. You've got this!"
```

---

## Summary of What Changed

| Area | Before | After |
|------|--------|-------|
| Output format | Plain text/markdown lesson + quiz | Single HTML/CSS/JS interactive application |
| Answer key | Included as separate section | Removed — handled by auto-grading and AI feedback |
| Quiz interaction | Static (printed) | Interactive (clickable, draggable, typeable) |
| Grading | Teacher grades manually | Auto-graded + AI-checked, score displayed to student |
| Feedback | Teacher provides | App provides per-question feedback instantly |
| Written response checking | Not applicable | AI checker evaluates and scores written answers |
| Visual commands | Platform-specific (SVG vs image) | All HTML-based (SVG/CSS/Canvas) for all platforms |
| Delivery | Text block copied to document | HTML file rendered in browser or AI platform |
