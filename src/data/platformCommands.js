// 3-tier visual commands per platform

// Tier 1 — SVG/HTML/CSS (all platforms same)
export const tier1Command = 'Generate this visual directly as SVG or HTML/CSS. Use clean lines, clear labels, readable fonts, and a simple color palette appropriate for {grade_level} students. SVG or code-based rendering is the correct choice for this type of visual.';

// Tier 2 — image preferred, SVG acceptable (per platform)
export const tier2Commands = {
  Gemini: 'For this visual, prefer generating an actual image using your image generation capability, as it will be more visually engaging and accurate for students. However, if SVG or HTML/CSS can represent it clearly, that is also acceptable. Use whichever method produces the clearest, most educational result for a {grade_level} student.',
  ChatGPT: 'Generate an image or diagram showing: {visual_description}. Use whichever method produces the clearest result — a generated image or a clean diagram.',
  Claude: 'Generate this as an SVG or HTML/CSS visual. Use shapes, labels, arrows, and color coding to represent the concept as clearly as possible.',
  Other: 'Generate a visual diagram or image of this concept. If image generation is not available, create a clean text-based or structured diagram.',
};

// Tier 3 — image required (per platform)
export const tier3Commands = {
  Gemini: `IMPORTANT — THIS VISUAL REQUIRES A REAL IMAGE:
This illustration involves complex, organic, or realistic elements that cannot be accurately represented with SVG, HTML shapes, or code-based diagrams. You MUST use your image generation capability to create an actual rendered image.

DO NOT attempt this with SVG, HTML/CSS shapes, or canvas drawings — the result will be inaccurate and unhelpful for students.

GENERATE AN IMAGE showing: {visual_description}
The image must include: {label_list}
Style: colorful, scientifically accurate at an elementary level, clear labels with readable text, educational illustration style appropriate for {grade_level} students.

If you truly cannot generate an image for this visual, do NOT substitute an SVG. Instead:
1. State clearly: "I was unable to generate this image."
2. Provide search queries for the teacher:
   - "{search_query_1}"
   - "{search_query_2}"
3. Describe what the illustration should show: "{detailed_description}"`,

  ChatGPT: `Generate an image showing: {visual_description}
The image must include: {label_list}
Make it colorful, clearly labeled, and scientifically accurate at an elementary level. Do NOT use SVG or code-based diagrams for this — generate an actual image.

Also provide search queries in case the teacher wants an alternative illustration:
- "{search_query_1}"
- "{search_query_2}"`,

  Claude: `This visual ideally requires a realistic illustration that SVG cannot fully capture. Do your best to represent it using SVG with shapes, labels, arrows, and color coding. Focus on accuracy of the process/structure rather than visual realism.

Additionally, provide:
- Search queries for the teacher to find an accurate illustration: "{search_query_1}", "{search_query_2}"
- A detailed description of what the illustration should show: "{detailed_description}"`,

  Other: `Generate a realistic image or detailed illustration of: {visual_description}
If image generation is not available, provide:
1. A text-based structured diagram
2. Search queries: "{search_query_1}", "{search_query_2}"
3. A description of what the image should contain: "{detailed_description}"`,
};

// Print mode additions for Tier 3
export const tier3PrintAdditions = {
  Gemini: 'The generated image must be high resolution enough for clear printing (at least 800x600 pixels). Ensure labels are large and readable when printed. Colors should maintain contrast when printed in grayscale.',
  ChatGPT: 'The generated image must be high resolution enough for clear printing (at least 800x600 pixels). Ensure labels are large and readable when printed. Colors should maintain contrast when printed in grayscale.',
  Claude: 'Include a bordered placeholder box with the text: "Teacher: Insert illustration here — {visual_name}" along with the search queries and description.',
  Other: 'Include a bordered placeholder box with the text: "Teacher: Insert illustration here — {visual_name}" along with the search queries and description.',
};

// AI target-specific delivery notes — Interactive mode
export const deliveryNotes = {
  Claude: 'DELIVERY: Generate this as a single HTML artifact. The student will interact with it directly in the artifact panel.',
  ChatGPT: 'DELIVERY: Generate this as a single, complete HTML file. Output the full code so it can be saved as a .html file and opened in a browser.',
  Gemini: 'DELIVERY: Generate this as a single, complete HTML file within the canvas. The student will interact with it directly.',
  Other: 'DELIVERY: Generate this as a single, complete HTML file. Output the full HTML/CSS/JavaScript code so it can be saved as a .html file and opened in any modern web browser.',
};

// AI target-specific delivery notes — Print mode
export const printDeliveryNotes = {
  Claude: 'DELIVERY: Generate this as a single HTML artifact optimized for printing. The teacher will use the download button to save it as PDF or print it directly.',
  ChatGPT: 'DELIVERY: Generate this as a single, complete HTML file optimized for printing. Output the full code so it can be saved as a .html file, opened in a browser, and printed or saved as PDF using the built-in buttons.',
  Gemini: 'DELIVERY: Generate this as a single, complete HTML file within the canvas, optimized for printing. The teacher will use the built-in download/print buttons to save as PDF or print directly.',
  Other: 'DELIVERY: Generate this as a single, complete HTML file optimized for printing. Output the full HTML/CSS code so it can be saved as a .html file, opened in any modern web browser, and printed or downloaded as PDF using the built-in buttons.',
};
