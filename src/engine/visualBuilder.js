import { getVisualTier } from '../data/visualMappings';
import { tier1Command, tier2Commands, tier3Commands, tier3PrintAdditions } from '../data/platformCommands';

function fillTemplate(template, vars) {
  return template
    .replace(/\{visual_description\}/g, vars.description || '')
    .replace(/\{label_list\}/g, vars.labels || '')
    .replace(/\{grade_level\}/g, vars.gradeLevel || '')
    .replace(/\{search_query_1\}/g, vars.searchQuery1 || '')
    .replace(/\{search_query_2\}/g, vars.searchQuery2 || '')
    .replace(/\{detailed_description\}/g, vars.fullDescription || '')
    .replace(/\{visual_name\}/g, vars.name || '');
}

export function buildVisualBlock(subject, topicName, targetAI, gradeLevel, outputFormat) {
  const visual = getVisualTier(subject, topicName);
  const isPrint = outputFormat === 'Print';

  if (visual.tier === 3) {
    const fullDescription = `${visual.description}. Clearly labeled: ${visual.labels}. Colorful, diagram-style appropriate for ${gradeLevel} students.`;
    const vars = {
      description: visual.description,
      labels: visual.labels,
      gradeLevel,
      searchQuery1: visual.searchQueries?.[0] || '',
      searchQuery2: visual.searchQueries?.[1] || '',
      fullDescription,
      name: visual.name,
    };

    const commandTemplate = tier3Commands[targetAI] || tier3Commands.Other;
    let command = fillTemplate(commandTemplate, vars);

    // Add print mode additions if applicable
    if (isPrint) {
      const printAdd = tier3PrintAdditions[targetAI] || tier3PrintAdditions.Other;
      command += '\n\n' + fillTemplate(printAdd, vars);
    }

    return `**Visuals:** This topic requires accurate visual illustration(s):

**Visual: ${visual.name}**

${command}

Place the visual inline where it is discussed in the Explain section.`;
  }

  if (visual.tier === 2) {
    const vars = {
      description: visual.description,
      labels: visual.labels || '',
      gradeLevel,
      searchQuery1: visual.searchQueries?.[0] || '',
      searchQuery2: visual.searchQueries?.[1] || '',
      fullDescription: visual.description,
      name: visual.name,
    };

    const commandTemplate = tier2Commands[targetAI] || tier2Commands.Other;
    const command = fillTemplate(commandTemplate, vars);

    let searchFallback = '';
    if (visual.searchQueries) {
      searchFallback = `\n\nIf the visual could be improved, the teacher can search for:
- ${visual.searchQueries[0]}
- ${visual.searchQueries[1]}`;
    }

    return `**Visuals:** This topic benefits from visual illustration:

**Visual: ${visual.name}**

${command}${searchFallback}

Place the visual inline where it is discussed in the Explain section.`;
  }

  // Tier 1
  const command = tier1Command.replace(/\{grade_level\}/g, gradeLevel);
  return `**Visuals:** Generate the following visual(s) directly as part of the lesson:
- ${visual.description}

${command}`;
}
