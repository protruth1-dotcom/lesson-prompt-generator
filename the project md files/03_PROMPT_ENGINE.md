# Prompt Engine — Template & Assembly Logic

## Overview

The prompt engine is the core of the app. It takes the user's selections and assembles a comprehensive prompt string that instructs an AI to generate a complete lesson and quiz. The prompt must be specific, pedagogically grounded, and tailored to the selected AI platform.

---

## Prompt Template Structure

The final generated prompt follows this exact structure. Variables in `{curly_braces}` are replaced by user selections. Sections in `[square_brackets]` are conditionally included.

```
You are an expert {grade_level} teacher creating a lesson for {student_level_description} students. The lesson is on the subject of {subject}: {topic_name}.

{islamic_studies_block — only if subject is Islamic Studies, see 04_ISLAMIC_STUDIES_SPEC.md}

---

## LESSON REQUIREMENTS

**Grade Level:** {grade} ({student_level}: {student_level_detail})
**Subject:** {subject}
**Topic:** {topic_name}
**Lesson Duration:** {lesson_length_description}
**Language Level:** Write all content at a {grade_level} reading level{student_level_adjustment}. Use short, clear sentences. Define every academic or domain-specific vocabulary word when first introduced.

---

## LESSON STRUCTURE

Follow the 5E Instructional Model exactly in this order:

### 1. PRIOR KNOWLEDGE CHECK — "What You Should Already Know"
List 2-3 prerequisite concepts the student should already understand before this lesson. Write them as brief, student-friendly statements. These should activate prior learning.

### 2. LEARNING OBJECTIVES
Write 2-3 measurable learning objectives starting with "By the end of this lesson, you will be able to..."
Use action verbs from Bloom's Taxonomy (identify, explain, compare, apply, analyze, create).

### 3. ENGAGE (Hook)
{engage_instruction}
This should be {lesson_length_engage_detail}. The goal is to spark curiosity BEFORE teaching content.

### 4. EXPLORE
Present a student-driven discovery activity: a thought experiment, observation task, or guided question that lets the student interact with the concept BEFORE being given the explanation. {lesson_length_explore_detail}

### 5. EXPLAIN (Core Content)
Deliver the core lesson content using scaffolded instruction — start with the simplest concept and build to more complex ideas step by step.

**Required elements within Explain:**

a) **Key Vocabulary Box** — At the start of this section, present a clearly formatted box listing every key term for this topic. Each term must include:
   - The term (bolded)
   - A student-friendly definition
   - A one-sentence example using the term
   {islamic_vocabulary_instruction}

b) **Scaffolded Content** — Teach the material in small, sequential chunks. After each chunk, include a brief check: "Think about it:" or "Can you think of an example?" Use analogies a {grade_level} student would understand.

c) **Visuals and Illustrations**
{visual_instructions_block}

d) **"Did You Know?" Callout Boxes** — Include {did_you_know_count} interesting fact boxes placed naturally within the lesson. These should be surprising, memorable facts related to the topic that aid retention.

e) **Real-World Application Box** — Include a clearly labeled section: "Why Does This Matter in Real Life?" Connect the lesson topic to something concrete in the student's daily life or the real world. This answers the question "Why do I need to learn this?"

{lesson_length_explain_detail}

### 6. ELABORATE
Extend the concept to a new situation the student hasn't seen. Ask the student to apply what they learned in a different context. {lesson_length_elaborate_detail}

[If cross-curricular is ON:]
**Cross-Curricular Connection:** Connect this topic to another subject area. For example, link a science concept to math, or a social studies topic to ELA. Explain the connection in 2-3 sentences.

[If Islamic Studies:]
**Character Building Takeaway:** End this section with: "Something I can practice this week:" — a specific, actionable behavior the student can apply from this lesson in their daily life.

### 7. SUMMARY / REVIEW
Before the quiz, provide a clear review section with {summary_point_count} key takeaways from the lesson. Write them as concise, student-friendly statements that capture the most important ideas.

### 8. QUIZ
{quiz_instructions_block — see QUIZ_CONFIG.md for full details}

### 9. ANSWER KEY
Place the answer key at the very end, clearly separated from the quiz with a page break or horizontal rule and labeled "ANSWER KEY — For Teacher Use."

For EVERY question, provide:
- The correct answer
- A brief explanation of WHY it is correct
- For critical thinking questions, include a sample acceptable response and what makes it strong

---

## FORMATTING REQUIREMENTS

- Use clear headings and subheadings for every section
- Use bold for key terms when first introduced
- Use numbered lists for sequential steps
- Use bullet points for non-sequential information
- Place visual elements inline where they are discussed, not at the end
- Separate the answer key clearly from the student-facing content
- The lesson should feel cohesive — each section should transition naturally to the next

---
```

---

## Variable Definitions

### Grade & Level Variables

| Variable | Source | Values |
|----------|--------|--------|
| `{grade}` | Grade selector | "4th Grade" or "5th Grade" |
| `{grade_level}` | Derived | "fourth-grade" or "fifth-grade" |
| `{student_level}` | Level selector | "Below Level", "On Level", "Above Level" |
| `{student_level_description}` | Derived from level | "students performing below grade level", "students performing at grade level", "advanced students performing above grade level" |
| `{student_level_adjustment}` | Derived from level | Below: ". Simplify vocabulary further, use shorter sentences, and provide more concrete examples." / On Level: "." / Above: ". Use richer vocabulary, include more nuance, and challenge with abstract connections." |
| `{student_level_detail}` | Derived | Below: "Use 1-2 grade levels below reading complexity. More repetition and concrete examples." / On: "Standard grade-level complexity." / Above: "Use enriched vocabulary and extended depth. Include bonus challenge connections." |

### Lesson Length Variables

| Variable | Short (15 min) | Medium (30 min) | Long (45 min) |
|----------|----------------|------------------|----------------|
| `{lesson_length_description}` | "a focused 15-minute mini-lesson" | "a standard 30-minute lesson" | "a comprehensive 45-minute deep-dive lesson" |
| `{lesson_length_engage_detail}` | "1-2 sentences — a quick hook question or surprising fact" | "a short paragraph — a scenario, story opening, or thought-provoking question" | "a full engaging opening — a story, scenario, demonstration description, or multi-part question" |
| `{lesson_length_explore_detail}` | "One quick guided question for the student to consider." | "A brief activity or thought experiment (2-3 sentences of setup)." | "A more involved exploration: a guided observation, a mini-activity, or a series of discovery questions." |
| `{lesson_length_explain_detail}` | "Keep the Explain section to the essential core concept only. 2-3 short paragraphs maximum." | "Cover the full topic with moderate depth. Include all required elements." | "Expand the Explain section with additional examples, deeper explanations, multiple visuals, and extended vocabulary work." |
| `{lesson_length_elaborate_detail}` | "One sentence applying the concept to a new situation." | "A short paragraph with a new application scenario." | "A full elaboration with discussion questions, a new scenario, and student reflection prompts." |
| `{did_you_know_count}` | "1" | "2" | "2-3" |
| `{summary_point_count}` | "3" | "3-5" | "5" |

### Engage Hook by Subject

| Subject | `{engage_instruction}` |
|---------|----------------------|
| Math | "Start with a real-world math puzzle, a surprising number fact, or a 'Would you rather' math scenario that connects to the topic." |
| ELA | "Start with an intriguing quote, a short mystery, a compelling story opening, or a question about language the student encounters daily." |
| Science | "Start with a 'What would happen if...' question, a surprising science fact, or a real-world phenomenon the student can observe." |
| Social Studies | "Start with a 'What would you do if you lived in...' scenario, a surprising historical fact, or a connection between a past event and something the student sees today." |
| Islamic Studies | "Start with a relevant ayah or hadith that introduces the topic's core message, a real-life scenario a student might face, or a question about how this topic applies to their daily life." |

---

## Visual Instructions Block

This block is assembled based on the subject, topic, and target AI.

### Logic:

1. Determine visual tier for the topic (Tier 1 or Tier 2 — mapped per topic in curriculum data)
2. Select platform-specific commands based on target AI
3. Assemble the instruction block

### Tier 1 Visual Block (SVG-capable topics):

```
**Visuals:** Generate the following visual(s) directly as part of the lesson:
- {specific_visual_description_for_topic}

{platform_tier1_command}

Place each visual inline at the point in the lesson where it is most relevant. Label all parts clearly. Use simple, clean design appropriate for {grade_level} students.
```

### Tier 2 Visual Block (Image-required topics):

```
**Visuals:** This topic requires accurate visual illustration(s):

**Visual 1: {visual_name}**

a) GENERATE: {platform_tier2_generate_command}
Create a {specific_visual_description} with the following clearly labeled: {label_list}. Use bright, clear colors appropriate for {grade_level} students.

b) SEARCH SOURCES: If the generated image is not sufficiently accurate, the teacher can search for:
   - Search query: "{search_query_1}"
   - Search query: "{search_query_2}"
   - Recommended sources: educational sites such as National Geographic Kids, NASA Kids' Club, Smithsonian Learning Lab, CK-12, Khan Academy

c) VISUAL DESCRIPTION: The illustration should show: {detailed_description_of_what_image_must_contain}. Each of the following must be clearly labeled: {required_labels}. The style should be {style_description — e.g., "colorful, diagram-style with arrows showing process flow"}.

Place the visual inline where it is discussed in the Explain section.
```

### Platform-Specific Commands

**Tier 1:**

| Target AI | `{platform_tier1_command}` |
|-----------|--------------------------|
| Claude | "Generate this as an SVG diagram or HTML/CSS visual. Use clean lines, clear labels, and a simple color palette." |
| ChatGPT | "Generate this as a clearly labeled diagram. Use clean design and readable labels." |
| Gemini | "Generate this as a clearly labeled diagram or image. Use clean design appropriate for elementary students." |
| Other | "Generate a clear, labeled visual diagram of this concept. If you cannot generate images, provide a detailed text-based diagram using ASCII or structured formatting." |

**Tier 2:**

| Target AI | `{platform_tier2_generate_command}` |
|-----------|-------------------------------------|
| Claude | "Attempt to generate an SVG or HTML-based illustration of this concept. Use shapes, labels, and arrows to represent the process as accurately as possible." |
| ChatGPT | "Generate an image illustrating this concept. Make it colorful, clearly labeled, and scientifically accurate at an elementary level." |
| Gemini | "Generate an image illustrating this concept. Make it colorful, clearly labeled, and scientifically accurate at an elementary level." |
| Other | "Generate an image or detailed illustration of this concept. If image generation is not available, provide a detailed text-based description with a structured diagram using ASCII formatting, and include search queries for the teacher to find an accurate illustration." |

---

## Visual Mapping by Subject

Each subject has a default set of visual types. The prompt uses the most appropriate one based on the topic.

| Subject | Common Tier 1 Visuals | Common Tier 2 Visuals |
|---------|----------------------|----------------------|
| **Math** | Number lines, bar graphs, pie charts, geometric shapes, area models, coordinate planes, fraction strips, Venn diagrams | Rarely needed |
| **ELA** | Story maps, Venn diagrams (compare/contrast), T-charts, graphic organizers, plot diagrams, cause/effect flowcharts | Rarely needed |
| **Science** | Flowcharts, simple food chains, data tables, bar/line graphs, classification charts, Venn diagrams | Water cycle, cell diagrams, body systems, rock layers, ecosystems, planet diagrams, weather systems, habitats |
| **Social Studies** | Timelines, T-charts, Venn diagrams, cause/effect diagrams, government structure charts | Maps, historical scenes, geographical features, landforms |
| **Islamic Studies** | Flowcharts (steps of wudu/salah), timelines (seerah events), classification charts, concept maps | Rarely needed — most Islamic Studies content is text-based with Arabic script |

---

## Prompt Assembly Order

The app assembles the final prompt in this order:

1. Opening role instruction
2. Islamic Studies block (if applicable)
3. Lesson requirements section
4. Full 5E lesson structure with all variables filled
5. Quiz instructions (from QUIZ_CONFIG.md)
6. Answer key instructions
7. Formatting requirements

The assembled prompt is displayed in the preview panel for the user to review and edit before copying.
