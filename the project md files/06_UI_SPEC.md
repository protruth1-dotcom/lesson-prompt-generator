# UI Specification — Lesson Prompt Generator

## Overview

The app is a single-page React application. It has three main views: the **Generator** (main form), the **Preview** (prompt review and edit), and the **History** (saved prompts). Navigation between views is handled with internal state, not routing.

---

## Design Direction

- **Aesthetic:** Clean, modern, educational — warm and inviting, not sterile
- **Color palette:** A calming primary color (deep teal or indigo) with warm accent (amber/gold). Light background with clear contrast. Accessible color choices (WCAG AA compliant).
- **Typography:** Clear, readable font. Use a distinct heading font and a clean body font. Must support Arabic script rendering properly for Islamic Studies content.
- **Tone:** Professional but friendly — this is a tool for educators, not students
- **Layout:** Card-based sections. Each configuration group lives in its own card. Generous spacing. Nothing cramped.
- **Responsive:** Works on desktop (primary) and tablet. Mobile is secondary but should remain usable.

---

## View 1: Generator (Main Form)

### Layout Structure

The form is organized as a vertical flow of cards. Each card represents a configuration group.

### Card 1: Grade & Subject

**Row layout — two selectors side by side:**

- **Grade** — Button group: `4th Grade` | `5th Grade`
- **Subject** — Button group or dropdown: `Math` | `ELA` | `Science` | `Social Studies` | `Islamic Studies`

When both are selected, Card 2 populates.

### Card 2: Topic

- **Topic** — Searchable dropdown / select list
- Populated dynamically based on selected grade + subject
- Shows the topic name. For Islamic Studies, shows Arabic + English (e.g., "الصدق — Truthfulness")
- Only appears after grade and subject are both selected

### Card 3: Lesson Settings

**Three selectors in a row:**

- **Target AI** — Dropdown: `Claude` | `ChatGPT` | `Gemini` | `Other`
- **Lesson Length** — Button group: `Short (15 min)` | `Medium (30 min)` | `Long (45 min)`
- **Student Level** — Button group: `Below Level` | `On Level` | `Above Level`

**Toggle below:**

- **Cross-Curricular Connections** — Toggle switch with label: "Include cross-curricular connections"

### Card 4: Quiz Configuration

**Mode selector at top:**

- **Quiz Mode** — Tab toggle: `Auto` | `Manual`

**Auto Mode shows:**
- **Total Questions** — Number input (min 5, max 30, default 10)
- **Difficulty** — Button group: `Mostly Recall` | `Balanced` | `Mostly Critical Thinking`
- Below the difficulty selector, show a **live preview** of the distribution:
  - Small horizontal stacked bar showing the percentage split
  - Below it, a compact list: "Vocabulary: 2, Multiple Choice: 3, True/False: 1, ..." (calculated in real-time)

**Manual Mode shows:**
- **Total Questions** — Number input (min 5, max 30, default 10)
- **Individual Type Inputs** — Seven number inputs, one per question type:
  - Vocabulary (matching/context): ___
  - Multiple Choice: ___
  - True/False with Explain: ___
  - Fill in the Blank: ___
  - Short Answer: ___
  - Diagram/Visual-Based: ___
  - Scenario-Based (Critical Thinking): ___
- **Running total** displayed: "Total: {sum} / {target}" with color coding:
  - Green if sum equals target
  - Red if sum does not equal target
- **Validation message** if mismatch: "Your question counts add up to {sum}. Please adjust to match your total of {total}."

### Generate Button

- Large, prominent button at the bottom: **"Generate Prompt"**
- Disabled with tooltip if:
  - Any required field is empty (grade, subject, topic)
  - Manual mode and question counts don't add up
- On click: assembles the prompt and navigates to Preview view

---

## View 2: Preview

### Layout

- **Header bar** with: Back button (← Back to Generator) | Title: "Prompt Preview" | Copy button | Save button
- **Prompt metadata** — Small tag chips showing: Grade, Subject, Topic, AI Target, Length, Level
- **Prompt text area** — Large, scrollable, editable text area containing the full assembled prompt
  - Monospace or clear reading font
  - Line numbers optional but helpful
  - Full prompt is editable — user can modify any text before copying
  - Minimum height: 500px, expands with content
- **Action bar at bottom:**
  - **Copy to Clipboard** — Primary button. On click, copies the full text and shows confirmation: "Copied!"
  - **Save to History** — Secondary button. Saves to local storage with metadata (date, grade, subject, topic, AI target)
  - **Back to Generator** — Text link or ghost button

---

## View 3: History

### Layout

- **Header:** "Saved Prompts"
- **List of saved prompts** — Each entry is a card showing:
  - Date saved
  - Grade + Subject + Topic
  - Target AI
  - Lesson Length + Student Level
  - **Actions:** `View` | `Copy` | `Delete`
- **View** opens the prompt in a read-only version of the Preview (or makes it editable, user's choice)
- **Copy** copies to clipboard directly
- **Delete** removes from local storage with confirmation: "Are you sure you want to delete this prompt?"
- **Empty state:** "No saved prompts yet. Generate your first prompt to get started."
- Prompts are sorted by date, newest first

---

## Navigation

- **Top navigation bar** with two tabs/links:
  - **Generator** (default active)
  - **History**
- The Preview is not a navigation tab — it's accessed via the Generate button and has a back button

---

## Component Specifications

### Button Group
- Horizontal row of buttons, one active at a time
- Active state: filled with primary color, white text
- Inactive state: outlined, primary color text
- Hover: light fill

### Toggle Switch
- Standard iOS/Android style toggle
- Label to the left
- Active color: primary color

### Number Input
- Spinner input with + / - buttons
- Min/max enforced
- Clear numeric display

### Dropdown / Select
- For Topic: searchable dropdown with filter-as-you-type
- For Target AI: simple dropdown
- Dropdown items for Islamic Studies topics show Arabic text properly (right-to-left for Arabic portion)

### Cards
- White background (or very light shade)
- Subtle shadow or border
- Rounded corners
- Clear section heading at top of each card
- Adequate padding (16-24px)

### Prompt Text Area
- Monospace or clear font for readability
- White background
- Border on focus
- Scrollable
- Editable

### Clipboard Feedback
- On successful copy: brief toast or inline message "Copied to clipboard!" that fades after 2 seconds

---

## Arabic Text Handling

- The app must render Arabic script correctly in:
  - Topic dropdown (Islamic Studies topics)
  - Generated prompt preview
- Arabic text should use `dir="rtl"` for the Arabic portion only, or use a CSS class that handles bidirectional text
- Font stack should include Arabic-supporting fonts: `"Noto Sans Arabic", "Amiri", "Traditional Arabic", sans-serif`
- Islamic Studies topic labels show: `{Arabic} — {English}` with proper directionality

---

## Local Storage Schema

```json
{
  "lessonPrompts": [
    {
      "id": "uuid-string",
      "createdAt": "2026-03-14T10:30:00Z",
      "grade": "4th Grade",
      "subject": "Science",
      "topic": "Water cycle",
      "targetAI": "Claude",
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

---

## Accessibility

- All form elements have visible labels
- Color is not the only indicator of state (icons or text accompany color changes)
- Keyboard navigable (tab order, enter to select)
- Focus indicators visible
- Sufficient color contrast (WCAG AA minimum, AAA preferred)
- Screen reader friendly labels and ARIA attributes
- Arabic text properly tagged with `lang="ar"` attribute

---

## States & Edge Cases

| State | Behavior |
|-------|----------|
| No grade selected | Subject selector disabled or grayed |
| No subject selected | Topic dropdown empty with placeholder: "Select a grade and subject first" |
| Grade or subject changed after topic selected | Topic resets to empty |
| Manual mode — counts don't match | Generate button disabled, warning shown |
| Prompt copied | Toast confirmation |
| History empty | Empty state message |
| Very long prompt in preview | Scrollable text area, no truncation |
| Local storage full | Graceful error: "Storage is full. Please delete some saved prompts." |
