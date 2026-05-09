// Visual tier mappings per subject — 3-tier system
// Tier 1: SVG/HTML/CSS (always code-based) — simple structured visuals
// Tier 2: SVG acceptable, image preferred — moderate complexity
// Tier 3: Image required — complex/realistic illustrations

const VISUAL_PATTERNS = {
  Science: [
    // Tier 3 — image required
    { tier: 3, pattern: /energy transfer.*(sound|light|heat|electric)/i, name: 'Energy Transfer', description: 'energy moving through different materials showing sound waves, light rays, heat conduction, and electric current paths', labels: 'sound waves, light rays, heat arrows, electric current, materials', searchQueries: ['"energy transfer diagram for kids"', '"forms of energy elementary diagram"'] },
    { tier: 3, pattern: /light reflect.*eye|eye.*light/i, name: 'Light and the Eye', description: 'a cross-section of the human eye showing how light reflects off an object and enters the eye', labels: 'light source, object, reflected light, cornea, lens, retina', searchQueries: ['"how we see light diagram kids"', '"light entering eye diagram elementary"'] },
    { tier: 3, pattern: /plant.*(internal|external|structure)|structure.*plant/i, name: 'Plant Structures', description: 'a labeled diagram of a plant showing internal and external structures used for survival and growth', labels: 'roots, stem, leaves, flower, xylem, phloem, chloroplasts', searchQueries: ['"plant structures diagram for kids"', '"plant anatomy elementary diagram"'] },
    { tier: 3, pattern: /animal.*(internal|external|structure)|structure.*animal/i, name: 'Animal Structures', description: 'a labeled diagram of an animal showing internal and external structures used for survival', labels: 'skeleton, muscles, skin, organs, sensory organs', searchQueries: ['"animal structures diagram for kids"', '"animal anatomy elementary diagram"'] },
    { tier: 3, pattern: /animal senses|information processing|senses.*environment/i, name: 'Animal Senses', description: 'an illustration showing how animals receive and process sensory information from the environment', labels: 'eyes, ears, nose, nerve signals, brain', searchQueries: ['"animal senses diagram for kids"', '"sensory system elementary diagram"'] },
    { tier: 3, pattern: /weathering|erosion/i, name: 'Weathering and Erosion', description: 'a before/after landscape showing the effects of weathering and erosion by water, ice, wind, and vegetation', labels: 'water erosion, wind erosion, ice weathering, plant roots, before landscape, after landscape', searchQueries: ['"weathering and erosion diagram for kids"', '"erosion effects elementary diagram"'] },
    { tier: 3, pattern: /rock layers|fossils|past environments/i, name: 'Rock Layers and Fossils', description: 'a geological cross-section showing rock layers with embedded fossils as evidence of past environments', labels: 'sedimentary layers, different fossil types, geological time indicators', searchQueries: ['"rock layers fossils diagram for kids"', '"geological layers elementary diagram"'] },
    { tier: 3, pattern: /natural hazards|earthquake|volcano|flood|tsunami/i, name: 'Natural Hazards', description: 'an illustration showing natural earth processes that cause hazards', labels: 'fault lines, magma, tectonic plates, floodplain, wave patterns', searchQueries: ['"natural hazards diagram for kids"', '"earthquake volcano diagram elementary"'] },
    { tier: 3, pattern: /matter.*particles|particles.*small/i, name: 'Particle Model of Matter', description: 'a particle model showing molecular arrangement in solids, liquids, and gases', labels: 'solid particles (tightly packed), liquid particles (loosely arranged), gas particles (spread apart)', searchQueries: ['"states of matter particles diagram kids"', '"particle model elementary"'] },
    { tier: 3, pattern: /mixtures|solutions|dissolving/i, name: 'Mixtures and Solutions', description: 'an illustration showing dissolving at the molecular level with temperature effects', labels: 'solute particles, solvent particles, dissolved solution, temperature effect', searchQueries: ['"mixtures solutions diagram for kids"', '"dissolving at molecular level elementary"'] },
    { tier: 3, pattern: /chemical reactions|new substances/i, name: 'Chemical Reactions', description: 'a before/after molecular illustration showing how substances combine to form new substances', labels: 'reactant molecules, product molecules, energy', searchQueries: ['"chemical reaction diagram for kids"', '"chemical change elementary diagram"'] },
    { tier: 3, pattern: /photosynthesis/i, name: 'Photosynthesis', description: 'a plant showing the process of photosynthesis with sunlight, water absorption, CO2 intake, and glucose/oxygen production', labels: 'sunlight, water, carbon dioxide, glucose, oxygen, chloroplasts, leaves, roots', searchQueries: ['"photosynthesis diagram for kids"', '"photosynthesis process elementary"'] },
    { tier: 3, pattern: /food web/i, name: 'Food Web', description: 'a food web showing multiple organisms interconnected with arrows showing energy flow', labels: 'producers, primary consumers, secondary consumers, tertiary consumers, decomposers, energy arrows', searchQueries: ['"food web diagram for kids"', '"ecosystem food web elementary"'] },
    { tier: 3, pattern: /decomposer/i, name: 'Decomposers in Ecosystems', description: 'a forest floor scene showing decomposers breaking down dead organisms and returning nutrients to the soil', labels: 'dead leaves, fungi, bacteria, worms, nutrients, soil', searchQueries: ['"decomposers diagram for kids"', '"decomposition ecosystem elementary"'] },
    { tier: 3, pattern: /movement of matter|matter.*ecosystem/i, name: 'Matter Cycle in Ecosystems', description: 'an ecosystem cycle illustration showing how matter moves among plants, animals, decomposers, and the environment', labels: 'plants, animals, decomposers, soil, air, water, nutrients', searchQueries: ['"matter cycle ecosystem diagram kids"', '"nutrient cycle elementary"'] },
    { tier: 3, pattern: /stars.*brightness|apparent brightness/i, name: 'Star Brightness and Distance', description: 'a night sky showing stars at different distances with comparison of apparent brightness vs actual size', labels: 'nearby bright star, distant dim star, distance indicators, brightness comparison', searchQueries: ['"star brightness distance diagram kids"', '"apparent brightness stars elementary"'] },
    { tier: 3, pattern: /major systems|geosphere|atmosphere|biosphere/i, name: "Earth's Major Systems", description: "a layered illustration showing Earth's geosphere, hydrosphere, atmosphere, and biosphere", labels: 'geosphere, hydrosphere, atmosphere, biosphere, interactions', searchQueries: ['"earth systems diagram for kids"', '"geosphere hydrosphere atmosphere elementary"'] },
    { tier: 3, pattern: /water cycle/i, name: 'The Water Cycle', description: 'a landscape showing the complete water cycle with evaporation from ocean, cloud formation, precipitation, and runoff', labels: 'evaporation, condensation, precipitation, collection, runoff, water vapor, clouds', searchQueries: ['"water cycle diagram for kids"', '"water cycle labeled diagram elementary"'] },
    { tier: 3, pattern: /habitat/i, name: 'Animal Habitat', description: 'a realistic habitat scene showing key features, plants, and organisms in their environment', labels: 'habitat features, plants, animals, abiotic factors', searchQueries: ['"animal habitat illustration for kids"', '"ecosystem habitat elementary"'] },

    // Tier 2 — image preferred, SVG acceptable
    { tier: 2, pattern: /earth.*features.*map|maps.*landform/i, name: "Earth's Features Map", description: "a map showing Earth's physical features and landform patterns", labels: 'mountains, plains, rivers, lakes, landforms', searchQueries: ['"earth landforms map for kids"', '"physical features map elementary"'] },
    { tier: 2, pattern: /shadow.*patterns|length.*direction.*shadow/i, name: 'Shadow Patterns', description: 'a diagram showing how shadow length and direction change throughout the day based on sun position', labels: 'morning sun, noon sun, afternoon sun, shadow lengths', searchQueries: ['"shadow patterns diagram kids"', '"sun shadow length elementary"'] },
    { tier: 2, pattern: /seasonal.*sunrise|sunrise.*sunset/i, name: 'Seasonal Patterns', description: 'a diagram showing Earth tilt and how it creates seasonal sunrise/sunset pattern changes', labels: "Earth's tilt, summer position, winter position, sunrise times, sunset times", searchQueries: ['"seasonal sunrise sunset diagram kids"', '"earth tilt seasons elementary"'] },
    { tier: 2, pattern: /earth.*orbit|revolution.*sun/i, name: "Earth's Orbit", description: "a diagram showing Earth's orbital path around the sun", labels: 'Earth, Sun, orbit path, seasons positions, axis tilt', searchQueries: ['"earth orbit diagram for kids"', '"earth revolution elementary"'] },
    { tier: 2, pattern: /freshwater|saltwater|hydrosphere/i, name: "Water Distribution", description: "a world map or diagram showing the distribution of Earth's freshwater and saltwater", labels: 'oceans, ice caps, groundwater, rivers, lakes, percentages', searchQueries: ['"earth water distribution diagram"', '"freshwater saltwater distribution kids"'] },
  ],
  'Social Studies': [
    // Tier 3 — image required
    { tier: 3, pattern: /colonial life/i, name: 'Colonial Life', description: 'a historical scene showing daily life in colonial America with buildings, clothing, and activities', labels: 'colonial houses, clothing, tools, crops, church', searchQueries: ['"colonial life illustration for kids"', '"colonial America scene elementary"'] },
    { tier: 3, pattern: /native american.*settlement|early peoples/i, name: 'Native American Settlements', description: 'a historical scene showing Native American settlements with dwellings, activities, and landscape', labels: 'dwellings, crops, tools, gathering areas, natural features', searchQueries: ['"Native American settlement illustration kids"', '"early peoples North America elementary"'] },
    { tier: 3, pattern: /american revolution.*event|revolution.*key event/i, name: 'American Revolution', description: 'a historical scene depicting a key event from the American Revolution', labels: 'key figures, location, activities, era-appropriate details', searchQueries: ['"American Revolution illustration for kids"', '"Revolutionary War scene elementary"'] },

    // Tier 2 — image preferred, SVG acceptable
    { tier: 2, pattern: /map.*illinois|illinois.*map|physical geography.*illinois|illinois.*region/i, name: 'Illinois Map', description: 'a color-coded map of Illinois showing regions, rivers, and key geographic features', labels: 'regions, Lake Michigan, Mississippi River, major cities', searchQueries: ['"Illinois regions map for kids"', '"Illinois physical geography map elementary"'] },
    { tier: 2, pattern: /physical geography.*united states|U\.?S\.?.*region|region.*landform|landform.*map/i, name: 'U.S. Physical Geography', description: 'a color-coded map of the United States showing major regions, landforms, and climate zones', labels: 'regions, mountain ranges, plains, rivers, coastlines', searchQueries: ['"US physical geography map for kids"', '"United States regions map elementary"'] },
    { tier: 2, pattern: /westward expansion|oregon trail|lewis and clark|louisiana purchase/i, name: 'Westward Expansion Routes', description: 'a trail map showing westward expansion routes across the United States', labels: 'Oregon Trail, Lewis and Clark route, Louisiana Purchase territory, key landmarks', searchQueries: ['"westward expansion map for kids"', '"Oregon Trail Lewis Clark map elementary"'] },
    { tier: 2, pattern: /geography.*influenced|settlement pattern|bodies of water.*shaped/i, name: 'Settlement Patterns Map', description: 'a map showing how geographic features influenced where people settled', labels: 'rivers, ports, fertile land, mountain barriers, settlement locations', searchQueries: ['"settlement patterns geography map kids"', '"how geography influenced settlement elementary"'] },
  ],
  'Islamic Studies': [
    // Tier 2 — image preferred, SVG acceptable
    { tier: 2, pattern: /هجرة|hijrah|هِجْرَة/i, name: 'Hijrah Route', description: 'a map showing the route of the Hijrah from Makkah to Madinah', labels: 'Makkah, Madinah, Cave of Thawr, route path, key stops', searchQueries: ['"hijrah route map for kids"', '"migration Makkah Madinah map"'] },
    { tier: 2, pattern: /فتح مكة|conquest.*makkah/i, name: 'Conquest of Makkah', description: 'a map showing the route and key locations during the Conquest of Makkah', labels: 'Madinah, Makkah, army route, key locations', searchQueries: ['"conquest of Makkah map"', '"Fath Makkah route map"'] },
  ],
};

// Default Tier 1 visual descriptions per subject
const DEFAULT_TIER1_VISUALS = {
  Math: 'a clear mathematical diagram, number line, chart, or visual model appropriate for this topic',
  ELA: 'a graphic organizer, story map, Venn diagram, or text structure chart appropriate for this topic',
  Science: 'a flowchart, classification chart, data table, or simple diagram appropriate for this topic',
  'Social Studies': 'a timeline, T-chart, Venn diagram, or organizational chart appropriate for this topic',
  'Islamic Studies': 'a flowchart, timeline, or concept map appropriate for this topic (if applicable)',
};

export function getVisualTier(subject, topicName) {
  const topicStr = typeof topicName === 'object'
    ? `${topicName.english} ${topicName.arabic}`
    : topicName;
  const patterns = VISUAL_PATTERNS[subject];
  if (patterns) {
    for (const entry of patterns) {
      if (entry.pattern.test(topicStr)) {
        return { ...entry };
      }
    }
  }
  return {
    tier: 1,
    description: DEFAULT_TIER1_VISUALS[subject] || 'a clear, labeled diagram appropriate for this topic',
  };
}
