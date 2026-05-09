# Additional Specification — Smart Visual Routing (3-Tier System)

## The Problem

Gemini has both SVG/code rendering AND real image generation capabilities. The issue is that Gemini defaults to SVG/HTML/CSS for everything — even when the topic requires a complex illustration that SVG cannot represent accurately (e.g., the water cycle, cell biology, ecosystems, geological formations).

The solution is NOT to force all visuals as images. Many visuals work perfectly as SVG. The solution is **smart routing** — the prompt tells Gemini to use the right method for the right visual based on complexity.

---

## Three Visual Tiers (Replaces the Original Two-Tier System)

### Tier 1 — SVG/HTML/CSS (Always code-based)
Simple, structured visuals where SVG is ideal and often better than a generated image.

**Examples:**
- Math shapes, number lines, fraction strips, area models, coordinate planes
- Bar graphs, pie charts, line graphs, data tables
- Flowcharts, timelines, classification trees, concept maps
- Venn diagrams, T-charts, cause/effect diagrams
- Story maps, plot diagrams, graphic organizers
- Steps of wudu/salah (Islamic Studies flowcharts)
- Government structure charts, hierarchy diagrams
- Simple food chain (text + arrows: sun → grass → rabbit → fox)

**Prompt instruction (all AI targets):**
```
Generate this visual directly as SVG or HTML/CSS. Use clean lines, clear labels, readable fonts, and a simple color palette appropriate for {grade_level} students. SVG or code-based rendering is the correct choice for this type of visual.
```

### Tier 2 — SVG acceptable, image preferred (Moderate complexity)
Visuals where SVG can work but a real image would be more engaging and accurate. The prompt requests an image first but accepts SVG as a reasonable fallback.

**Examples:**
- Simple maps (Illinois regions, U.S. regions — color-coded shapes)
- Basic weather patterns (sun, clouds, rain arrows)
- Simple rock layer cross-section (colored horizontal bands with labels)
- Basic food web (multiple organisms with arrows — more complex than a chain)
- Timeline with small illustrations alongside dates
- Simple ecosystem overview (pond, forest — labeled zones)
- Earth orbit and revolution diagram
- Shadow and seasonal patterns diagrams

**Prompt instruction for Gemini:**
```
For this visual, prefer generating an actual image using your image generation capability, as it will be more visually engaging and accurate for students. However, if SVG or HTML/CSS can represent it clearly, that is also acceptable. Use whichever method produces the clearest, most educational result for a {grade_level} student.
```

**Prompt instruction for ChatGPT:**
```
Generate an image or diagram showing: {visual_description}. Use whichever method produces the clearest result — a generated image or a clean diagram.
```

**Prompt instruction for Claude:**
```
Generate this as an SVG or HTML/CSS visual. Use shapes, labels, arrows, and color coding to represent the concept as clearly as possible.
```

**Prompt instruction for Other:**
```
Generate a visual diagram or image of this concept. If image generation is not available, create a clean text-based or structured diagram.
```

### Tier 3 — Image required (Complex illustrations)
Visuals where SVG fundamentally cannot represent the content accurately. These involve organic shapes, realistic textures, spatial depth, multiple interacting elements, or anatomical/biological accuracy that flat shapes and arrows cannot convey.

**Examples:**
- Water cycle (evaporation from ocean, cloud formation, precipitation, runoff — with landscape)
- Plant cell / animal cell (organelles with realistic shapes and internal structure)
- Human body systems (digestive, respiratory, skeletal, circulatory)
- Photosynthesis process (plant absorbing sunlight, CO2, water — with molecular representation)
- Ecosystem scene (forest floor with decomposers, animals, plants interacting)
- Geological formations (volcano cross-section, canyon layers, mountain formation)
- Erosion and weathering (before/after landscape showing water, wind, ice effects)
- Animal habitats (arctic tundra, rainforest, desert — with organisms in context)
- Historical scenes (colonial life, Native American settlements, pioneer life)
- Planet/solar system (realistic proportions, surface features)
- Fossil record in rock layers (showing actual fossil shapes embedded in strata)
- Animal/plant anatomy with internal structures
- Energy transfer through materials (showing particles, waves, heat moving through substances)

**Prompt instruction for Gemini:**
```
IMPORTANT — THIS VISUAL REQUIRES A REAL IMAGE:
This illustration involves complex, organic, or realistic elements that cannot be accurately represented with SVG, HTML shapes, or code-based diagrams. You MUST use your image generation capability to create an actual rendered image.

DO NOT attempt this with SVG, HTML/CSS shapes, or canvas drawings — the result will be inaccurate and unhelpful for students.

GENERATE AN IMAGE showing: {specific_visual_description}
The image must include: {label_list}
Style: colorful, scientifically accurate at an elementary level, clear labels with readable text, educational illustration style appropriate for {grade_level} students.

If you truly cannot generate an image for this visual, do NOT substitute an SVG. Instead:
1. State clearly: "I was unable to generate this image."
2. Provide search queries for the teacher:
   - "{search_query_1}"
   - "{search_query_2}"
3. Describe what the illustration should show: "{detailed_description}"
```

**Prompt instruction for ChatGPT:**
```
Generate an image showing: {specific_visual_description}
The image must include: {label_list}
Make it colorful, clearly labeled, and scientifically accurate at an elementary level. Do NOT use SVG or code-based diagrams for this — generate an actual image.

Also provide search queries in case the teacher wants an alternative illustration:
- "{search_query_1}"
- "{search_query_2}"
```

**Prompt instruction for Claude:**
```
This visual ideally requires a realistic illustration that SVG cannot fully capture. Do your best to represent it using SVG with shapes, labels, arrows, and color coding. Focus on accuracy of the process/structure rather than visual realism.

Additionally, provide:
- Search queries for the teacher to find an accurate illustration: "{search_query_1}", "{search_query_2}"
- A detailed description of what the illustration should show: "{detailed_description}"
```

**Prompt instruction for Other:**
```
Generate a realistic image or detailed illustration of: {specific_visual_description}
If image generation is not available, provide:
1. A text-based structured diagram
2. Search queries: "{search_query_1}", "{search_query_2}"
3. A description of what the image should contain: "{detailed_description}"
```

---

## Print Mode Adjustments

For **Print mode**, add to the Tier 3 Gemini and ChatGPT instructions:
```
The generated image must be high resolution enough for clear printing (at least 800x600 pixels). Ensure labels are large and readable when printed. Colors should maintain contrast when printed in grayscale.
```

For **Print mode**, add to the Tier 3 Claude/Other instructions:
```
Include a bordered placeholder box with the text: "Teacher: Insert illustration here — {visual_name}" along with the search queries and description.
```

---

## Complete Topic-to-Tier Mapping

### Math — All Grades
| All math topics | Tier 1 | Shapes, graphs, number lines, area models, coordinate planes |

### ELA — All Grades
| All ELA topics | Tier 1 | Story maps, graphic organizers, Venn diagrams, plot diagrams |

### Science — Grade 4
| Topic | Tier | Reason |
|-------|------|--------|
| Energy transfer (sound, light, heat, electric) | Tier 3 | Energy moving through different materials |
| Speed and energy relationship | Tier 1 | Simple comparison diagram |
| Energy changes in collisions | Tier 1 | Before/after arrow diagram |
| Wave patterns (amplitude, wavelength) | Tier 1 | Clean SVG wave diagram |
| Light reflecting into the eye | Tier 3 | Cross-section of eye with light path |
| Information transfer patterns | Tier 1 | Flowchart/diagram |
| Plant internal/external structures | Tier 3 | Labeled plant anatomy |
| Animal internal/external structures | Tier 3 | Labeled animal anatomy |
| Animal senses and information processing | Tier 3 | Sensory system illustration |
| Earth's physical features and maps | Tier 2 | Map with landforms |
| Weathering and erosion | Tier 3 | Before/after landscape |
| Rock layers and fossils | Tier 3 | Geological cross-section with embedded fossils |
| Natural hazards | Tier 3 | Earthquake/volcano/flood scene |
| Reducing impact of natural hazards | Tier 1 | Solution comparison chart |
| Engineering design | Tier 1 | Design process flowchart |

### Science — Grade 5
| Topic | Tier | Reason |
|-------|------|--------|
| Matter as particles | Tier 3 | Particle model showing molecular arrangement |
| Properties of materials | Tier 1 | Comparison table/chart |
| Mixtures and solutions | Tier 3 | Dissolving at molecular level |
| Chemical reactions | Tier 3 | Before/after molecular illustration |
| Conservation of matter | Tier 1 | Balance scale diagram |
| Gravitational force | Tier 1 | Simple arrow diagram |
| Photosynthesis | Tier 3 | Plant process with sun, water, CO2, glucose |
| Food chains (simple) | Tier 1 | Linear chain with arrows |
| Food webs (complex) | Tier 3 | Multiple organisms interconnected |
| Decomposers in ecosystems | Tier 3 | Forest floor decomposition scene |
| Movement of matter in ecosystems | Tier 3 | Ecosystem cycle illustration |
| Shadow patterns | Tier 2 | Sun position and shadow angles |
| Seasonal sunrise/sunset patterns | Tier 2 | Earth tilt diagram |
| Stars and apparent brightness | Tier 3 | Night sky with distance comparison |
| Earth's orbit and revolution | Tier 2 | Orbital diagram |
| Freshwater and saltwater distribution | Tier 2 | World map with water bodies |
| Earth's major systems | Tier 3 | Layered atmosphere/geosphere illustration |
| Protecting Earth's resources | Tier 1 | Comparison or cause/effect chart |
| Engineering design | Tier 1 | Design process flowchart |

### Social Studies — Grade 4
| Topic | Tier | Reason |
|-------|------|--------|
| Maps of Illinois | Tier 2 | Color-coded map |
| Physical geography of Illinois | Tier 2 | Landform map |
| Illinois regions | Tier 2 | Labeled region map |
| Government structure | Tier 1 | Three-branch chart |
| Timeline topics | Tier 1 | Timeline |
| All other topics | Tier 1 | Charts, organizers |

### Social Studies — Grade 5
| Topic | Tier | Reason |
|-------|------|--------|
| Physical geography of U.S. | Tier 2 | Region/landform map |
| Colonial life | Tier 3 | Historical scene |
| Native American settlements | Tier 3 | Historical scene |
| American Revolution events | Tier 3 | Historical scene |
| Westward expansion routes | Tier 2 | Trail map |
| Government structure | Tier 1 | Three-branch chart |
| Constitution/Bill of Rights | Tier 1 | Concept map |
| Timeline topics | Tier 1 | Timeline |
| All other topics | Tier 1 | Charts, organizers |

### Islamic Studies — All Grades
| Topic | Tier | Reason |
|-------|------|--------|
| Wudu/Salah steps | Tier 1 | Flowchart |
| Seerah timeline events | Tier 1 | Timeline |
| Aqeedah categories | Tier 1 | Concept map |
| Hijrah route map | Tier 2 | Historical route map |
| Conquest of Makkah | Tier 2 | Route map |
| All other topics | Tier 1 | Text-based, Arabic script |

---

## Meta-Prompt Update for AI Mode

Replace the visual section in `10_AI_PROMPT_MODE_SPEC.md` with:

```
VISUAL REQUIREMENTS:
This topic's visuals are classified as follows:
{visual_tier_classification_for_this_topic}

When writing the prompt, use the appropriate visual instruction based on the tier:
- Tier 1 (SVG/code): Instruct the AI to generate clean SVG or HTML/CSS diagrams. This is the right tool for simple structured visuals.
- Tier 2 (image preferred, SVG acceptable): Instruct the AI to prefer real images for better engagement, but accept SVG if it represents the concept clearly and accurately.
- Tier 3 (image required — complex illustrations): For Gemini and ChatGPT, explicitly instruct the AI to generate a REAL IMAGE using its image generation model. Be very forceful with Gemini: say "DO NOT use SVG for this visual — generate an actual image." For Claude and Other, instruct SVG as best effort plus search queries and description as fallback.

IMPORTANT: Not every visual needs to be an image. Simple diagrams, charts, flowcharts, and graphs should remain as SVG — they look better and render more reliably as code. Only force image generation when the visual involves complex, organic, or realistic elements that SVG cannot accurately represent.
```

---

## Summary

| Tier | Complexity | SVG OK? | Image needed? | Gemini instruction tone |
|------|-----------|---------|---------------|------------------------|
| **Tier 1** | Simple structured | Yes — preferred | No | "Use SVG" |
| **Tier 2** | Moderate | Yes — acceptable | Preferred | "Prefer image, SVG is fine too" |
| **Tier 3** | Complex/realistic | No — insufficient | Yes — required | "DO NOT use SVG. Generate an actual image." |
