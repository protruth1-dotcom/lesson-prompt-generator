# Quiz Configuration Specification

## Overview

The quiz is the final assessment component of every generated lesson. The user configures the quiz in the app, and those settings are translated into specific instructions within the generated prompt.

---

## Two Modes

### Auto Mode

The user sets:
1. **Total number of questions** (numeric input, minimum 5, maximum 30)
2. **Difficulty preset** (select one):
   - **Mostly Recall** — 70% recall / 30% critical thinking
   - **Balanced** — 50% recall / 50% critical thinking
   - **Mostly Critical Thinking** — 30% recall / 70% critical thinking

The app automatically distributes question types based on the subject and difficulty preset. The user does NOT choose individual question types.

**Auto Distribution Logic by Subject:**

**Math — Mostly Recall:**
| Type | % |
|------|---|
| Vocabulary (matching/context) | 10% |
| Multiple Choice | 25% |
| True/False with Explain | 10% |
| Fill in the Blank | 15% |
| Short Answer | 10% |
| Diagram/Visual-Based | 20% |
| Scenario-Based (Critical Thinking) | 10% |

**Math — Balanced:**
| Type | % |
|------|---|
| Vocabulary | 10% |
| Multiple Choice | 15% |
| True/False with Explain | 10% |
| Fill in the Blank | 10% |
| Short Answer | 15% |
| Diagram/Visual-Based | 20% |
| Scenario-Based | 20% |

**Math — Mostly Critical Thinking:**
| Type | % |
|------|---|
| Vocabulary | 5% |
| Multiple Choice | 10% |
| True/False with Explain | 10% |
| Fill in the Blank | 5% |
| Short Answer | 20% |
| Diagram/Visual-Based | 20% |
| Scenario-Based | 30% |

**ELA — Mostly Recall:**
| Type | % |
|------|---|
| Vocabulary | 20% |
| Multiple Choice | 20% |
| True/False with Explain | 10% |
| Fill in the Blank | 20% |
| Short Answer | 15% |
| Diagram/Visual-Based | 5% |
| Scenario-Based | 10% |

**ELA — Balanced:**
| Type | % |
|------|---|
| Vocabulary | 15% |
| Multiple Choice | 15% |
| True/False with Explain | 10% |
| Fill in the Blank | 10% |
| Short Answer | 20% |
| Diagram/Visual-Based | 10% |
| Scenario-Based | 20% |

**ELA — Mostly Critical Thinking:**
| Type | % |
|------|---|
| Vocabulary | 10% |
| Multiple Choice | 10% |
| True/False with Explain | 10% |
| Fill in the Blank | 5% |
| Short Answer | 25% |
| Diagram/Visual-Based | 10% |
| Scenario-Based | 30% |

**Science — Mostly Recall:**
| Type | % |
|------|---|
| Vocabulary | 15% |
| Multiple Choice | 20% |
| True/False with Explain | 10% |
| Fill in the Blank | 15% |
| Short Answer | 10% |
| Diagram/Visual-Based | 20% |
| Scenario-Based | 10% |

**Science — Balanced:**
| Type | % |
|------|---|
| Vocabulary | 10% |
| Multiple Choice | 15% |
| True/False with Explain | 10% |
| Fill in the Blank | 10% |
| Short Answer | 15% |
| Diagram/Visual-Based | 20% |
| Scenario-Based | 20% |

**Science — Mostly Critical Thinking:**
| Type | % |
|------|---|
| Vocabulary | 5% |
| Multiple Choice | 10% |
| True/False with Explain | 10% |
| Fill in the Blank | 5% |
| Short Answer | 15% |
| Diagram/Visual-Based | 20% |
| Scenario-Based | 35% |

**Social Studies — Mostly Recall:**
| Type | % |
|------|---|
| Vocabulary | 15% |
| Multiple Choice | 25% |
| True/False with Explain | 10% |
| Fill in the Blank | 15% |
| Short Answer | 15% |
| Diagram/Visual-Based | 10% |
| Scenario-Based | 10% |

**Social Studies — Balanced:**
| Type | % |
|------|---|
| Vocabulary | 10% |
| Multiple Choice | 15% |
| True/False with Explain | 10% |
| Fill in the Blank | 10% |
| Short Answer | 20% |
| Diagram/Visual-Based | 10% |
| Scenario-Based | 25% |

**Social Studies — Mostly Critical Thinking:**
| Type | % |
|------|---|
| Vocabulary | 5% |
| Multiple Choice | 10% |
| True/False with Explain | 10% |
| Fill in the Blank | 5% |
| Short Answer | 20% |
| Diagram/Visual-Based | 10% |
| Scenario-Based | 40% |

**Islamic Studies — Mostly Recall:**
| Type | % |
|------|---|
| Vocabulary (Arabic term matching) | 20% |
| Multiple Choice | 20% |
| True/False with Explain | 15% |
| Fill in the Blank | 15% |
| Short Answer | 10% |
| Diagram/Visual-Based | 5% |
| Scenario-Based | 15% |

**Islamic Studies — Balanced:**
| Type | % |
|------|---|
| Vocabulary | 15% |
| Multiple Choice | 10% |
| True/False with Explain | 10% |
| Fill in the Blank | 10% |
| Short Answer | 15% |
| Diagram/Visual-Based | 5% |
| Scenario-Based | 35% |

**Islamic Studies — Mostly Critical Thinking:**
| Type | % |
|------|---|
| Vocabulary | 10% |
| Multiple Choice | 5% |
| True/False with Explain | 10% |
| Fill in the Blank | 5% |
| Short Answer | 15% |
| Diagram/Visual-Based | 5% |
| Scenario-Based | 50% |

**Rounding rule:** When the percentage doesn't produce a whole number, round to the nearest whole and adjust the largest category to match the total.

**Minimum rule:** Every question type gets at least 1 question if the total is 10 or more. If total is less than 10, Vocabulary, Multiple Choice, and Scenario-Based are always included; other types are filled as space allows.

---

### Manual Mode

The user sets:
1. **Total number of questions** (numeric input, minimum 5, maximum 30)
2. **Individual count for each question type:**

| Question Type | Count Input |
|---------------|-------------|
| Vocabulary (matching/context) | ___ |
| Multiple Choice | ___ |
| True/False with Explain | ___ |
| Fill in the Blank | ___ |
| Short Answer | ___ |
| Diagram/Visual-Based | ___ |
| Scenario-Based (Critical Thinking) | ___ |

**Validation:** The sum of individual counts must equal the total. If they don't match, the app shows a warning: "Your question counts add up to {sum}. Please adjust to match your total of {total}." The Generate button is disabled until valid.

---

## Question Type Specifications

Each question type has specific instructions embedded in the generated prompt:

### 1. Vocabulary (Matching or Context)

**Prompt instruction:**
```
VOCABULARY QUESTIONS ({count} questions):
Present a matching exercise or context-fill exercise for key terms from the lesson.
- Matching: Provide a list of {count} terms on the left and their definitions (shuffled) on the right. The student draws a line or writes the matching letter.
- Context: Provide a sentence with a blank and a word bank. The student selects the correct vocabulary term to complete the sentence.
{islamic_vocab_note}
```

`{islamic_vocab_note}` (only for Islamic Studies): "Use Arabic terms in Arabic script for the term column. Definitions are in English."

### 2. Multiple Choice

**Prompt instruction:**
```
MULTIPLE CHOICE QUESTIONS ({count} questions):
Each question has 4 answer choices labeled A, B, C, D. Only one is correct.
- Distribute across different parts of the lesson content (do not cluster questions on one sub-topic).
- Include plausible distractors — wrong answers should be reasonable, not obviously incorrect.
- At least one question should test understanding (not just recall) by rephrasing the concept.
```

### 3. True/False with Explain

**Prompt instruction:**
```
TRUE/FALSE WITH EXPLANATION ({count} questions):
Present a statement. The student marks True or False AND writes 1-2 sentences explaining why.
- Include a mix of true and false statements.
- Statements should test common misconceptions about the topic.
- The "explain why" component is required — this elevates the question above simple recall.
```

### 4. Fill in the Blank

**Prompt instruction:**
```
FILL IN THE BLANK ({count} questions):
Provide sentences from the lesson content with a key word or phrase removed. The student fills in the blank.
- Provide a word bank with {count + 2} options (includes 2 distractors) to support below-level students.
- Blanks should target key concepts, vocabulary, or important facts.
```

### 5. Short Answer

**Prompt instruction:**
```
SHORT ANSWER ({count} questions):
Ask open-ended questions requiring 2-4 sentence responses.
- Questions should require the student to explain a concept IN THEIR OWN WORDS.
- At least one question should ask "Why?" or "How?" (not just "What?").
- Write questions that cannot be answered with a single word or phrase.
```

### 6. Diagram/Visual-Based

**Prompt instruction:**
```
DIAGRAM/VISUAL-BASED QUESTIONS ({count} questions):
Present a visual (diagram, chart, graph, or illustration from the lesson) and ask the student to:
- Label parts of the diagram, OR
- Answer questions based on information shown in the visual, OR
- Complete a partially filled diagram, OR
- Read data from a chart/graph and draw a conclusion.
Include the visual directly in the quiz or reference the visual from the lesson by name.
```

### 7. Scenario-Based (Critical Thinking)

**Prompt instruction:**
```
SCENARIO-BASED / CRITICAL THINKING ({count} questions):
Present a real-world situation or hypothetical scenario. The student must apply what they learned to analyze, evaluate, or solve.
- Each scenario should be 2-4 sentences setting up the situation.
- The question should require reasoning, not recall.
- Use "What would you do if...", "Why do you think...", "What would happen if...", "How would you solve..." formats.
- {grade_level} students should be able to relate to the scenario (school, home, community contexts).
{islamic_scenario_note}
```

`{islamic_scenario_note}` (only for Islamic Studies): "Scenarios should involve real-life situations a student might face — at school, at home, with friends — where they must apply the Islamic value, ruling, or concept taught in the lesson."

---

## Bloom's Taxonomy Mapping

The quiz follows Bloom's Taxonomy progression — questions are ordered from lower to higher order thinking:

| Order | Bloom's Level | Question Types |
|-------|--------------|----------------|
| 1st | Remember | Vocabulary, Fill in the Blank |
| 2nd | Understand | Multiple Choice, True/False with Explain |
| 3rd | Apply | Diagram/Visual-Based |
| 4th | Analyze/Evaluate/Create | Short Answer, Scenario-Based |

**Prompt instruction for ordering:**
```
QUESTION ORDER:
Arrange the quiz questions in this exact order, progressing from recall to critical thinking:
1. Vocabulary questions first
2. Fill in the Blank
3. Multiple Choice
4. True/False with Explanation
5. Diagram/Visual-Based
6. Short Answer
7. Scenario-Based (Critical Thinking) last

This progression builds student confidence with easier questions first and challenges them with deeper thinking at the end.
```

---

## Quiz Prompt Block (Assembled)

The complete quiz block inserted into the generated prompt:

```
## QUIZ — {total_questions} Questions

{mode_description}

### Question Distribution:
{question_distribution_list}

### Question Specifications:
{all_question_type_instructions}

### Question Order:
Arrange the quiz questions in this exact order, progressing from recall to critical thinking:
1. Vocabulary questions first
2. Fill in the Blank
3. Multiple Choice
4. True/False with Explanation
5. Diagram/Visual-Based
6. Short Answer
7. Scenario-Based (Critical Thinking) last

This progression builds student confidence with easier questions first and challenges them with deeper thinking at the end.

### Quiz Formatting:
- Number all questions sequentially (1, 2, 3...)
- Clearly label each section by question type
- For multiple choice, use A, B, C, D labels
- For matching, use a two-column format
- For diagram questions, include the visual directly before the question
- Leave adequate space for written responses (short answer and scenario)
```
