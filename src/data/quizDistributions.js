// Question types ordered by Bloom's taxonomy (quiz ordering from spec)
export const QUESTION_TYPES = [
  { key: 'vocabulary', label: 'Vocabulary (matching/context)', bloomOrder: 1 },
  { key: 'fillBlank', label: 'Fill in the Blank', bloomOrder: 2 },
  { key: 'multipleChoice', label: 'Multiple Choice', bloomOrder: 3 },
  { key: 'trueFalse', label: 'True/False with Explain', bloomOrder: 4 },
  { key: 'diagramVisual', label: 'Diagram/Visual-Based', bloomOrder: 5 },
  { key: 'shortAnswer', label: 'Short Answer', bloomOrder: 6 },
  { key: 'scenarioBased', label: 'Scenario-Based (Critical Thinking)', bloomOrder: 7 },
];

// Distribution percentages: subject -> difficulty -> { type: percentage }
export const distributions = {
  Math: {
    mostlyRecall: { vocabulary: 10, multipleChoice: 25, trueFalse: 10, fillBlank: 15, shortAnswer: 10, diagramVisual: 20, scenarioBased: 10 },
    balanced: { vocabulary: 10, multipleChoice: 15, trueFalse: 10, fillBlank: 10, shortAnswer: 15, diagramVisual: 20, scenarioBased: 20 },
    mostlyCritical: { vocabulary: 5, multipleChoice: 10, trueFalse: 10, fillBlank: 5, shortAnswer: 20, diagramVisual: 20, scenarioBased: 30 },
  },
  ELA: {
    mostlyRecall: { vocabulary: 20, multipleChoice: 20, trueFalse: 10, fillBlank: 20, shortAnswer: 15, diagramVisual: 5, scenarioBased: 10 },
    balanced: { vocabulary: 15, multipleChoice: 15, trueFalse: 10, fillBlank: 10, shortAnswer: 20, diagramVisual: 10, scenarioBased: 20 },
    mostlyCritical: { vocabulary: 10, multipleChoice: 10, trueFalse: 10, fillBlank: 5, shortAnswer: 25, diagramVisual: 10, scenarioBased: 30 },
  },
  Science: {
    mostlyRecall: { vocabulary: 15, multipleChoice: 20, trueFalse: 10, fillBlank: 15, shortAnswer: 10, diagramVisual: 20, scenarioBased: 10 },
    balanced: { vocabulary: 10, multipleChoice: 15, trueFalse: 10, fillBlank: 10, shortAnswer: 15, diagramVisual: 20, scenarioBased: 20 },
    mostlyCritical: { vocabulary: 5, multipleChoice: 10, trueFalse: 10, fillBlank: 5, shortAnswer: 15, diagramVisual: 20, scenarioBased: 35 },
  },
  'Social Studies': {
    mostlyRecall: { vocabulary: 15, multipleChoice: 25, trueFalse: 10, fillBlank: 15, shortAnswer: 15, diagramVisual: 10, scenarioBased: 10 },
    balanced: { vocabulary: 10, multipleChoice: 15, trueFalse: 10, fillBlank: 10, shortAnswer: 20, diagramVisual: 10, scenarioBased: 25 },
    mostlyCritical: { vocabulary: 5, multipleChoice: 10, trueFalse: 10, fillBlank: 5, shortAnswer: 20, diagramVisual: 10, scenarioBased: 40 },
  },
  'Islamic Studies': {
    mostlyRecall: { vocabulary: 20, multipleChoice: 20, trueFalse: 15, fillBlank: 15, shortAnswer: 10, diagramVisual: 5, scenarioBased: 15 },
    balanced: { vocabulary: 15, multipleChoice: 10, trueFalse: 10, fillBlank: 10, shortAnswer: 15, diagramVisual: 5, scenarioBased: 35 },
    mostlyCritical: { vocabulary: 10, multipleChoice: 5, trueFalse: 10, fillBlank: 5, shortAnswer: 15, diagramVisual: 5, scenarioBased: 50 },
  },
};

// Difficulty key mapping from UI labels
export const DIFFICULTY_KEYS = {
  'Mostly Recall': 'mostlyRecall',
  'Balanced': 'balanced',
  'Mostly Critical Thinking': 'mostlyCritical',
};

// Calculate auto distribution: returns { vocabulary: N, multipleChoice: N, ... }
export function calculateAutoDistribution(subject, difficulty, totalQuestions) {
  if (!subject || !difficulty) return null;
  const diffKey = DIFFICULTY_KEYS[difficulty] || difficulty;
  const percentages = distributions[subject]?.[diffKey];
  if (!percentages) return null;

  const typeKeys = Object.keys(percentages);

  // Apply percentages and round
  const result = {};
  let sum = 0;
  for (const key of typeKeys) {
    result[key] = Math.round((percentages[key] / 100) * totalQuestions);
    sum += result[key];
  }

  // Adjust the largest category to match total
  if (sum !== totalQuestions) {
    let largestKey = typeKeys[0];
    for (const key of typeKeys) {
      if (result[key] > result[largestKey]) largestKey = key;
    }
    result[largestKey] += totalQuestions - sum;
  }

  // Enforce minimum rules
  if (totalQuestions >= 10) {
    // Every type gets at least 1
    const zeroTypes = typeKeys.filter(k => result[k] === 0);
    if (zeroTypes.length > 0) {
      for (const key of zeroTypes) {
        result[key] = 1;
      }
      // Rebalance: reduce from largest categories
      let newSum = Object.values(result).reduce((a, b) => a + b, 0);
      while (newSum > totalQuestions) {
        let largestKey = typeKeys[0];
        for (const key of typeKeys) {
          if (result[key] > result[largestKey]) largestKey = key;
        }
        result[largestKey]--;
        newSum--;
      }
    }
  } else {
    // Total < 10: Vocabulary, MC, and Scenario always included
    const required = ['vocabulary', 'multipleChoice', 'scenarioBased'];
    for (const key of required) {
      if (result[key] === 0) result[key] = 1;
    }
    // Remove from non-required types if over
    let newSum = Object.values(result).reduce((a, b) => a + b, 0);
    const nonRequired = typeKeys.filter(k => !required.includes(k));
    while (newSum > totalQuestions) {
      // Reduce smallest non-required that is > 0
      const candidates = nonRequired.filter(k => result[k] > 0);
      if (candidates.length === 0) break;
      candidates.sort((a, b) => result[a] - result[b]);
      result[candidates[0]]--;
      newSum--;
    }
  }

  return result;
}
