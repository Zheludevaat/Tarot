// Holographic Tarot Explorer Logic (offline)
// Data and graph logic with additional connection types

const GEMATRIA_VALUES = { "Aleph": 1, "Beth": 2, "Gimel": 3, "Daleth": 4, "Heh": 5, "Vau": 6, "Zain": 7, "Cheth": 8, "Teth": 9, "Yod": 10, "Kaph": 20, "Lamed": 30, "Mem": 40, "Nun": 50, "Samekh": 60, "Ayin": 70, "Peh": 80, "Tzaddi": 90, "Koph": 100, "Resh": 200, "Shin": 300, "Tau": 400 };
const ASTROLOGICAL_OPPOSITES = { "Aries": "Libra", "Libra": "Aries", "Taurus": "Scorpio", "Scorpio": "Taurus", "Gemini": "Sagittarius", "Sagittarius": "Gemini", "Cancer": "Capricorn", "Capricorn": "Cancer", "Leo": "Aquarius", "Aquarius": "Leo", "Virgo": "Pisces", "Pisces": "Virgo" };
const KABBALISTIC_COMPLEMENTARY_SEPHIROTH = [ new Set(["Kether", "Malkuth"]), new Set(["Chokmah", "Binah"]), new Set(["Chesed", "Geburah"]), new Set(["Netzach", "Hod"]) ];
const UNIVERSAL_ARCHETYPAL_PRINCIPLES = [ "Initiation", "Will", "Intuition", "Nurturing", "Structure", "Guidance", "Choice", "Control", "Courage", "Introspection", "Cycles", "Balance", "Perspective", "Transformation", "Harmony", "Shadow", "Revelation", "Hope", "Subconscious", "Clarity", "Awakening", "Completion", "Chaos", "Order", "Freedom", "Constraint", "Growth", "Decay", "Light", "Darkness", "Emanation", "Containment", "DivineFlow", "Manifestation", "Concealment" ];

const PRINCIPLE_EXPLANATIONS = {
  Initiation: "The spark that launches a new journey.",
  Will: "The drive that shapes reality through intention.",
  Intuition: "Understanding that emerges beyond rational thought.",
  Nurturing: "Compassionate support that fosters growth.",
  Structure: "Order and form that create stability.",
  Guidance: "A source of direction lighting the path forward.",
  Choice: "Decision points that define one's path.",
  Control: "The ability to influence or restrain forces.",
  Courage: "Bravery in the face of uncertainty.",
  Introspection: "Turning inward to gain self-knowledge.",
  Cycles: "Recurring phases that shape experience.",
  Balance: "Dynamic equilibrium among forces.",
  Perspective: "The vantage point from which events are interpreted.",
  Transformation: "Profound change from one state to another.",
  Harmony: "Alignment that creates synergy.",
  Shadow: "Hidden aspects revealing unresolved issues.",
  Revelation: "Sudden clarity unveiling deeper truth.",
  Hope: "Expectation that guides toward better outcomes.",
  Subconscious: "Hidden influences beneath conscious awareness.",
  Clarity: "Seeing circumstances without distortion.",
  Awakening: "Realization that opens new awareness.",
  Completion: "The fulfillment of a cycle or goal.",
  Chaos: "Disruptive energy that sparks renewal.",
  Order: "Structured arrangement fostering predictability.",
  Freedom: "Ability to act without restraint.",
  Constraint: "Limitations that shape possibilities.",
  Growth: "Expansion and development over time.",
  Decay: "Breaking down to make room for renewal.",
  Light: "Illumination and conscious awareness.",
  Darkness: "The unknown aspects that challenge perception.",
  Emanation: "Outward flow from a central source.",
  Containment: "Boundaries that restrict or hold energy in place.",
  DivineFlow: "Effortless movement guided by higher forces.",
  Manifestation: "Bringing ideas into tangible form.",
  Concealment: "The deliberate hiding of truths or intentions."
};

const CONNECTION_EXPLANATIONS = {
  "Fractal Embedding":
    "One card's patterns appear inside the other, mirroring its essence in fractal form.",
  "Symbol Echo":
    "Shared iconography resonates between the cards, reinforcing their themes.",
  "Shared Geometry":
    "Identical geometric forms create structural harmony across the cards.",
  "Shared Astrology":
    "A common celestial influence guides both cards' energies.",
  "Astrological Opposition":
    "Opposing zodiac signs create tension that sparks dynamic growth.",
  "Complementary Sephiroth":
    "Kabbalistic paths complement each other, suggesting spiritual reciprocity.",
  "Gematria Resonance":
    "Numerical values align closely, hinting at occult synchronicity."
};

function glossaryLink(term) {
  return `<a href="#glossary-${term.replace(/\s+/g,'-')}" class="underline glossary-link">${term}</a>`;
}

const GEOMETRY_EXPLANATIONS = {
  Circle: "Wholeness and eternal cycles.",
  Cone: "Focus rising toward a point of power.",
  Crescent: "Partial illumination and growth.",
  Cross: "Intersection of paths and balance.",
  Cube: "Grounded structure and stability.",
  Cylinder: "Ongoing motion along a set course.",
  Ellipse: "Orbiting cycles and return.",
  InvertedTriangle: "Descent of spirit into matter.",
  Mobius: "A single surface twisting into infinity.",
  Octagram: "Eightfold harmony and regeneration.",
  Octahedron: "Balance between above and below.",
  Pentagram: "Integration of the five elements.",
  Pyramid: "Ascension through layered effort.",
  RadiantCircle: "Expanding illumination and joy.",
  Scythe: "Cutting away the outworn.",
  ShatteredCube: "Breaking rigid constraints.",
  Sphere: "Unity and limitless potential.",
  Spiral: "Evolution unfolding in cycles.",
  Square: "Foundation and reliability.",
  Tetrahedron: "Dynamic action and change.",
  Triangle: "Focused intent and aspiration.",
  Vessel: "Container for transformation."
};

const FRACTAL_PATTERN_EXPLANATIONS = {
  AncientRunes: "Marks of forgotten wisdom repeating through time.",
  BoneBlossom: "Life emerging from endings.",
  ClockworkGears: "Interlocking cycles of precision.",
  CosmicEgg: "Potential of creation coiled within.",
  CosmicWeb: "Threads that bind the universe together.",
  CrackedEarth: "Shifting foundations and upheaval.",
  CrystalLattice: "Structured growth and clarity.",
  DecayingLeaves: "Natural release and renewal.",
  DesertSands: "Windswept change and adaptation.",
  DreamMist: "Ephemeral visions swirling softly.",
  FloralBloom: "Beauty unfolding in delicate patterns.",
  FlowingWater: "Emotion and intuition in motion.",
  InfernalFlames: "Purifying intensity and passion.",
  IntertwinedVines: "Relationships growing together.",
  MountainRange: "Steadfast endurance rising high.",
  Nebula: "Stellar birth within swirling clouds.",
  RootSystem: "Hidden support and connection.",
  SoundWaves: "Vibrations carrying messages.",
  SunflowerPattern: "Radiant growth that follows the light.",
  SwirlingClouds: "Restless thoughts and change.",
  TiledPavement: "Ordered paths that intersect.",
  WaterRipples: "Expanding effects from a single action."
};

const ASTROLOGY_EXPLANATIONS = {
  "Element: Air": "Thought, communication and intellect.",
  "Element: Fire": "Passion, energy and transformation.",
  "Element: Water": "Emotion, intuition and flow.",
  "Planet: Jupiter": "Expansion, luck and philosophy.",
  "Planet: Mars": "Drive, conflict and assertion.",
  "Planet: Mercury": "Mind, messages and agility.",
  "Planet: Moon": "Cycles, instincts and memory.",
  "Planet: Saturn": "Structure, discipline and limits.",
  "Planet: Sun": "Vitality, clarity and purpose.",
  "Planet: Venus": "Harmony, attraction and pleasure.",
  "Zodiac: Aquarius": "Innovation, detachment and vision.",
  "Zodiac: Aries": "Initiation, courage and impulse.",
  "Zodiac: Cancer": "Nurturing, protection and feeling.",
  "Zodiac: Capricorn": "Ambition, mastery and endurance.",
  "Zodiac: Gemini": "Curiosity, duality and exchange.",
  "Zodiac: Leo": "Radiance, pride and creativity.",
  "Zodiac: Libra": "Balance, partnership and fairness.",
  "Zodiac: Pisces": "Dreams, empathy and dissolution.",
  "Zodiac: Sagittarius": "Exploration, optimism and truth.",
  "Zodiac: Scorpio": "Intensity, secrets and transformation.",
  "Zodiac: Taurus": "Stability, pleasure and persistence.",
  "Zodiac: Virgo": "Refinement, service and analysis."
};

const SEPHIRAH_EXPLANATIONS = {
  Kether: "Crown of pure potential.",
  Chokmah: "Wisdom and generative spark.",
  Binah: "Understanding and structure.",
  Chesed: "Mercy and expansive love.",
  Geburah: "Strength and disciplined power.",
  Tiphareth: "Beauty balancing the divine and human.",
  Netzach: "Victory through endurance and desire.",
  Hod: "Splendor of intellect and communication.",
  Yesod: "Foundation linking form and force.",
  Malkuth: "Kingdom manifest in the physical world."
};

const HEBREW_LETTER_EXPLANATIONS = {
  Aleph: "The breath of beginnings (1).",
  Beth: "A house or container (2).",
  Gimel: "A camel, the journey (3).",
  Daleth: "A door of opportunity (4).",
  Heh: "Window of revelation (5).",
  Vau: "Nail or hook that joins (6).",
  Zain: "Sword of discernment (7).",
  Cheth: "Fence of protection (8).",
  Teth: "Serpent power within (9).",
  Yod: "The divine spark (10).",
  Kaph: "Palm receptive to gifts (20).",
  Lamed: "Staff guiding learning (30).",
  Mem: "Waters of depth (40).",
  Nun: "Fish of life and movement (50).",
  Samekh: "Prop or support (60).",
  Ayin: "Eye that perceives (70).",
  Peh: "Mouth expressing command (80).",
  Tzaddi: "Hook drawing forth righteousness (90).",
  Koph: "Back of the head, subconscious (100).",
  Resh: "Head of authority (200).",
  Shin: "Tooth of transforming fire (300).",
  Tau: "Mark of completion (400)."
};

const ALL_GLOSSARY_DEFS = {
  ...PRINCIPLE_EXPLANATIONS,
  ...CONNECTION_EXPLANATIONS,
  ...GEOMETRY_EXPLANATIONS,
  ...FRACTAL_PATTERN_EXPLANATIONS,
  ...ASTROLOGY_EXPLANATIONS,
  ...SEPHIRAH_EXPLANATIONS,
  ...HEBREW_LETTER_EXPLANATIONS
};

let majorArcanaData = [];
let nodes = [];
let links = [];
let width, height;
let floatAngles = [];
let svg, tooltip, narrativeHub, narrativeTabs, narrativeContentArea;
let backBtn, resetBtn, glossaryBtn, connectionLegend;
let simulation, linkGroup, nodeGroup, linkSelection, nodeSelection;

function getCardByName(name) {
  return majorArcanaData.find(c => c.name === name) || null;
}

function buildGraphData() {
  const nodes = majorArcanaData.map(card => ({ id: card.name, ...card }));
  const links = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const card1 = nodes[i];
      const card2 = nodes[j];
      let types = new Set();
      if (card2.fractal_signatures_embedded.includes(card1.id) || card1.fractal_signatures_embedded.includes(card2.id)) types.add("Fractal Embedding");
      if (card1.unique_symbols.some(s => card2.unique_symbols.includes(s))) types.add("Symbol Echo");
      if (card1.primary_geometry_type === card2.primary_geometry_type) types.add("Shared Geometry");
      if (card1.astrological_correspondence === card2.astrological_correspondence) types.add("Shared Astrology");
      const c1Zodiac = card1.astrological_correspondence.replace("Zodiac: ", "");
      const c2Zodiac = card2.astrological_correspondence.replace("Zodiac: ", "");
      if (c1Zodiac in ASTROLOGICAL_OPPOSITES && ASTROLOGICAL_OPPOSITES[c1Zodiac] === c2Zodiac) types.add("Astrological Opposition");
      // complementary sephiroth
      KABBALISTIC_COMPLEMENTARY_SEPHIROTH.forEach(pair => {
        if (pair.has(card1.path_from_sephirah) && pair.has(card2.path_to_sephirah)) types.add("Complementary Sephiroth");
      });
      // gematria resonance
      if (Math.abs(card1.gematria_value - card2.gematria_value) <= 5) types.add("Gematria Resonance");
      if (types.size > 0) links.push({ source: card1.id, target: card2.id, types: Array.from(types) });
    }
  }
  return { nodes, links };
}
function assignAndNormalizeWeights(nodes, links) {
  links.forEach(link => {
    let rawWeight = 1;
    link.types.forEach(type => {
      if (type === "Fractal Embedding" || type === "Astrological Opposition") rawWeight += 2.5;
      else if (type === "Shared Astrology" || type === "Complementary Sephiroth") rawWeight += 2.0;
      else if (type === "Shared Geometry" || type === "Gematria Resonance") rawWeight += 1.5;
      else rawWeight += 1.0;
    });
    link.raw_weight = Math.min(rawWeight, 25);
  });
  const nodeRawIncidentSums = {};
  nodes.forEach(node => { nodeRawIncidentSums[node.id] = 0; });
  links.forEach(link => {
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
    nodeRawIncidentSums[sourceId] += link.raw_weight;
    nodeRawIncidentSums[targetId] += link.raw_weight;
  });
  const totalRawWeightSum = Object.values(nodeRawIncidentSums).reduce((a,b) => a+b, 0);
  const targetIncidentSumPerNode = totalRawWeightSum / nodes.length;
  links.forEach(link => {
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
    const factorU = targetIncidentSumPerNode / (nodeRawIncidentSums[sourceId] || 1);
    const factorV = targetIncidentSumPerNode / (nodeRawIncidentSums[targetId] || 1);
    link.weight = Math.max(0.5, Math.min(8, link.raw_weight * ((factorU + factorV) / 2)));
  });
  return links;
}
function generateSingleCardInterpretation(card) {
  const values = Object.entries(card.archetypal_principles).filter(([, v]) => v !== 0);
  const posCount = values.filter(([, v]) => v > 0).length;
  const negCount = values.filter(([, v]) => v < 0).length;
  const principles = values
    .map(([k, v]) => {
      const color = v > 0 ? 'bg-green-400' : 'bg-red-400';
      const reason = v > 0 ? 'This theme strongly influences the card.' : 'This theme emerges as a challenge to integrate.';
      return `<details class="mb-1"><summary class="cursor-pointer flex items-center"><span class="w-2 h-2 mr-2 rounded-full ${color}"></span><strong>${k}</strong></summary><div class="text-gray-400 pl-4 mt-1">${PRINCIPLE_EXPLANATIONS[k] || ''}<br><em>${reason}</em></div></details>`;
    })
    .join('');
  return `
  <h2 class="text-2xl mb-4"><span class="font-bold title-font text-xl" style="color:${card.color};">${card.name}</span></h2>
  <p class="text-gray-300 text-sm leading-relaxed mb-4">At its heart, this card embodies the archetype of <strong>${card.core_theme.neutral}</strong>. This manifests as the potential for <strong>${card.core_theme.positive}</strong> when embraced, but can fall into the shadow of <strong>${card.core_theme.negative}</strong>.</p>
  <h3 class="font-bold title-font text-lg text-gray-100 mb-2">Key Archetypal Principles</h3>
  <p class="text-xs text-gray-400 mb-1"><span class="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>dominant &nbsp; <span class="inline-block w-2 h-2 bg-red-400 rounded-full mr-1"></span>shadow &nbsp; <span class="text-gray-500">(${posCount}/${negCount})</span></p>
  <div class="text-sm text-gray-300 mb-4 space-y-2">${principles}</div>
  <h3 class="font-bold title-font text-lg text-gray-100 mb-2">Symbolic Language</h3>
  <details class="mb-4"><summary class="cursor-pointer text-gray-300 text-sm leading-relaxed">The card speaks through various motifs.</summary>
    <div class="mt-2 pl-4 space-y-1 text-sm text-gray-300">
      <p><strong>Symbols:</strong> ${card.unique_symbols.join(', ')}</p>
      <p><strong>Geometry:</strong> <a href="#glossary-${card.primary_geometry_type}" class="underline glossary-link">${card.primary_geometry_type}</a></p>
      <p class="text-gray-400">${GEOMETRY_EXPLANATIONS[card.primary_geometry_type] || ''}</p>
      <p><strong>Fractal Pattern:</strong> <a href="#glossary-${card.primary_fractal_pattern}" class="underline glossary-link">${card.primary_fractal_pattern}</a></p>
      <p class="text-gray-400">${FRACTAL_PATTERN_EXPLANATIONS[card.primary_fractal_pattern] || ''}</p>
      <p><strong>Embedded In:</strong> ${card.fractal_signatures_embedded.join(', ')}</p>
    </div>
  </details>
  <h3 class="font-bold title-font text-lg text-gray-100 mb-2">Esoteric Framework</h3>
  <div class="text-sm text-gray-300 space-y-2">
    <details><summary class="cursor-pointer">Astrological Influence: <a href="#glossary-${card.astrological_correspondence}" class="underline glossary-link">${card.astrological_correspondence}</a></summary><div class="pl-4 mt-1 text-gray-400">${ASTROLOGY_EXPLANATIONS[card.astrological_correspondence] || ''}</div></details>
    <details><summary class="cursor-pointer">Kabbalistic Path ${card.kabbalistic_path_number}</summary><div class="pl-4 mt-1 text-gray-400">From <a href="#glossary-${card.path_from_sephirah}" class="underline glossary-link"><strong>${card.path_from_sephirah}</strong></a> to <a href="#glossary-${card.path_to_sephirah}" class="underline glossary-link"><strong>${card.path_to_sephirah}</strong></a><br>${SEPHIRAH_EXPLANATIONS[card.path_from_sephirah] || ''} &rarr; ${SEPHIRAH_EXPLANATIONS[card.path_to_sephirah] || ''}</div></details>
    <details><summary class="cursor-pointer">Hebrew Letter: <a href="#glossary-${card.hebrew_letter}" class="underline glossary-link">${card.hebrew_letter} (${card.gematria_value})</a></summary><div class="pl-4 mt-1 text-gray-400">${HEBREW_LETTER_EXPLANATIONS[card.hebrew_letter] || ''}</div></details>
  </div>
  `;
}
function generateCombinationInterpretation(cards, allLinks) {
  if (!cards.length) return '';
  let html = '';
  const header = cards.map(c => `<span class="font-bold title-font text-xl" style="color:${c.color};">${c.name}</span>`).join(' & ');
  html += `<h2 class="text-2xl mb-4">${header}</h2>`;

  const root = cards[0];
  html += `<p class="text-gray-300 text-sm leading-relaxed mb-4">The constellation grows from <strong>${root.name}</strong>, whose core theme is <strong>${root.core_theme.neutral}</strong>. Each additional card layers new meaning onto this foundation.</p>`;

  const combined = { ...root.archetypal_principles };
  let steps = '';
  for (let i = 1; i < cards.length; i++) {
    const card = cards[i];
    steps += `<div class="mt-4"><h4 class="font-semibold text-gray-100">${card.name}</h4>`;
    steps += `<p class="text-gray-300 text-sm leading-relaxed">${card.core_theme.neutral} interacts with ${root.name.toLowerCase()} to expand the narrative.</p>`;

    const pairLink = allLinks.find(l => (l.source.id===root.id && l.target.id===card.id) || (l.source.id===card.id && l.target.id===root.id));
    if (pairLink) {
      steps += '<ul class="text-sm text-gray-300 pl-4 space-y-1">';
      pairLink.types.forEach(type => {
        const explain = CONNECTION_EXPLANATIONS[type] || '';
        const weightDesc = getWeightDescription(pairLink.weight);
        steps += `<li><strong>${weightDesc}</strong> - ${explain}</li>`;
      });
      steps += '</ul>';
    }

    Object.entries(card.archetypal_principles).forEach(([k,v]) => {
      combined[k] = (combined[k] || 0) + v;
    });
    steps += '</div>';
  }

  html += steps;

  const comboValues = Object.entries(combined).filter(([, v]) => v !== 0);
  const comboPos = comboValues.filter(([, v]) => v > 0).length;
  const comboNeg = comboValues.filter(([, v]) => v < 0).length;
  const comboPrinciples = comboValues
    .map(([k, v]) => {
      const color = v > 0 ? 'bg-green-400' : 'bg-red-400';
      const reason = v > 0 ? 'This theme guides the constellation.' : 'This theme highlights collective shadows.';
      return `<details class="mb-1"><summary class="cursor-pointer flex items-center"><span class="w-2 h-2 mr-2 rounded-full ${color}"></span><strong>${k}</strong></summary><div class="text-gray-400 pl-4 mt-1">${PRINCIPLE_EXPLANATIONS[k] || ''}<br><em>${reason}</em></div></details>`;
    })
    .join('');
  if (comboPrinciples) {
    html += `<h3 class="font-bold title-font text-lg text-gray-100 mt-6 mb-2">Overall Archetypal Currents</h3>`;
    html += `<p class="text-xs text-gray-400 mb-1"><span class="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>dominant &nbsp; <span class="inline-block w-2 h-2 bg-red-400 rounded-full mr-1"></span>shadow &nbsp; <span class="text-gray-500">(${comboPos}/${comboNeg})</span></p>`;
    html += `<div class="text-sm text-gray-300 mb-4 space-y-2">${comboPrinciples}</div>`;
    html += summarizePrinciples(combined);
  }

  html += `<h3 class="font-bold title-font text-lg text-gray-100 mb-2">Points of Interaction</h3>`;
  html += '<ul class="space-y-4 text-sm text-gray-300">';
  for (let i=0; i<cards.length; i++) {
    for (let j=i+1; j<cards.length; j++) {
      const c1 = cards[i];
      const c2 = cards[j];
      const link = allLinks.find(l => (l.source.id===c1.id && l.target.id===c2.id) || (l.source.id===c2.id && l.target.id===c1.id));
      if (link) {
        link.types.forEach(type => {
          let summary='';
          switch(type) {
            case 'Fractal Embedding':
              summary = `A ${glossaryLink('Fractal Embedding')} reveals how ${c1.name} mirrors patterns within ${c2.name}.`;
              break;
            case 'Symbol Echo':
              summary = `${glossaryLink('Symbol Echo')} shows a mutual resonance of symbols.`;
              break;
            case 'Shared Geometry':
              summary = `Both share the geometry of <strong>${c1.primary_geometry_type}</strong>.`;
              break;
            case 'Shared Astrology':
              summary = `Unified under <strong>${c1.astrological_correspondence}</strong>.`;
              break;
            case 'Astrological Opposition':
              summary = `${glossaryLink('Astrological Opposition')} creates balanced tension.`;
              break;
            case 'Complementary Sephiroth':
              summary = `${glossaryLink('Complementary Sephiroth')} complete each other.`;
              break;
            case 'Gematria Resonance':
              summary = `${glossaryLink('Gematria Resonance')} shows closely aligned values.`;
              break;
          }
          if (summary) {
            const explain = CONNECTION_EXPLANATIONS[type] || '';
            const weightDesc = getWeightDescription(link.weight);
            summary = `<strong>${weightDesc}</strong> - ${summary}`;
            html += `<li class="p-3 bg-gray-900/50 rounded-md border-l-2 border-purple-400"><details><summary class="cursor-pointer">${summary}</summary><div class="text-gray-400 mt-1 pl-2">${explain}</div></details></li>`;
          }
        });
      }
    }
  }
  html += '</ul>';
  return html;
}

function summarizePrinciples(values){
  const sorted = Object.entries(values).sort((a,b)=>Math.abs(b[1])-Math.abs(a[1]));
  const pos = sorted.filter(([,v])=>v>0).slice(0,3).map(([k])=>k);
  const neg = sorted.filter(([,v])=>v<0).slice(0,3).map(([k])=>k);
  let text='';
  if(pos.length) text += 'Dominant forces: '+pos.join(', ')+'. ';
  if(neg.length) text += 'Shadow influences: '+neg.join(', ')+'.';
  return `<p class="text-gray-300 text-sm mb-4">${text}</p>`;
}

function generateGlossary() {
  function renderSection(title, obj) {
    const id = 'glossary-' + title.replace(/\s+/g,'-');
    const entries = Object.entries(obj).map(([term,def]) =>
      `<p id="glossary-${term.replace(/\s+/g,'-')}" class="text-gray-300"><strong>${term}:</strong> ${def}</p>`).join('');
    return `<details id="${id}" class="mb-4"><summary class="cursor-pointer font-semibold text-gray-100">${title}</summary><div class="mt-2 pl-4 space-y-1">${entries}</div></details>`;
  }
  return `
    <h2 class="text-2xl mb-4">Glossary</h2>
    ${renderSection('Archetypal Principles', PRINCIPLE_EXPLANATIONS)}
    ${renderSection('Connection Types', CONNECTION_EXPLANATIONS)}
    ${renderSection('Geometry', GEOMETRY_EXPLANATIONS)}
    ${renderSection('Fractal Patterns', FRACTAL_PATTERN_EXPLANATIONS)}
    ${renderSection('Astrology', ASTROLOGY_EXPLANATIONS)}
    ${renderSection('Sephiroth', SEPHIRAH_EXPLANATIONS)}
    ${renderSection('Hebrew Letters', HEBREW_LETTER_EXPLANATIONS)}
  `;
}
async function init(){
  const resp = await fetch('assets/majorArcana.json');
  majorArcanaData = await resp.json();
  ({ nodes, links } = buildGraphData());
  assignAndNormalizeWeights(nodes, links);

  width = window.innerWidth;
  height = window.innerHeight;

  floatAngles = nodes.map(() => Math.random() * Math.PI * 2);

  svg = d3.select('#tarot-graph');
  tooltip = d3.select('#tooltip').attr('role','tooltip').attr('aria-live','polite');
  narrativeHub = d3.select('#narrative-hub');
  narrativeTabs = d3.select('#narrative-tabs');
  narrativeContentArea = d3.select('#narrative-content-area');
  backBtn = d3.select('#back-btn');
  resetBtn = d3.select('#reset-btn');
  glossaryBtn = d3.select('#glossary-btn');
  connectionLegend = d3.select('#connection-legend');

let selectionHistory = [];

simulation = d3.forceSimulation(nodes)
  .force('link', d3.forceLink(links).id(d=>d.id).strength(0.05).distance(200))
  .force('charge', d3.forceManyBody().strength(-250))
  .force('center', d3.forceCenter(width/2, height/2));

function orbitForce(alpha){
  nodes.forEach((n,i)=>{
    floatAngles[i]+=0.001;
    n.vx+=Math.cos(floatAngles[i])*0.1*alpha;
    n.vy+=Math.sin(floatAngles[i])*0.1*alpha;
  });
}
simulation.force('orbit', orbitForce);
d3.interval(()=>simulation.alpha(0.05).restart(),10000);

linkGroup = svg.append('g').attr('class','links');
nodeGroup = svg.append('g').attr('class','nodes');

linkSelection = linkGroup.selectAll('line').data(links).join('line')
  .attr('class','link')
  .attr('stroke-width', d => Math.sqrt(d.weight)/2);

nodeSelection = nodeGroup.selectAll('.node').data(nodes);
const nodeEnter = nodeSelection.enter().append('g')
  .attr('class','node')
  .call(drag(simulation));
nodeEnter.append('circle').attr('r',12);
nodeEnter.append('text').text(d=>d.name).attr('x',16).attr('y',4);
nodeEnter.append('title').text(d=>d.name);
nodeSelection = nodeEnter.merge(nodeSelection);
nodeSelection.select('circle').attr('fill', d => d.color);

simulation.on('tick', () => {
  linkSelection.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
  nodeSelection.attr('transform', d => `translate(${d.x},${d.y})`);
});

function getWeightDescription(w) {
  if (w>6) return 'A Profound Connection';
  if (w>4) return 'A Strong Resonance';
  if (w>2) return 'A Subtle Link';
  return 'A Faint Echo';
}

nodeSelection.on('click', (event,d) => {
  if (selectionHistory.includes(d)) return;
  selectionHistory.push(d);
  updateFocusAndNarrative();
});

nodeSelection.on('mouseover', (event,d) => {
  tooltip.style('visibility','visible').style('opacity',1);
  tooltip.html(`<div class="font-bold text-base title-font" style="color:${d.color}">${d.name} (${d.card_number})</div>`);
}).on('mousemove', event => {
  tooltip.style('top',(event.pageY-10)+'px').style('left',(event.pageX+10)+'px');
}).on('mouseout', () => {
  tooltip.style('visibility','hidden').style('opacity',0);
});

linkSelection.append('title').text(d=>`${d.source.name} ↔ ${d.target.name}`);
linkSelection.on('mouseover', (event,d) => {
  tooltip.style('visibility','visible').style('opacity',1);
  const weightDesc = getWeightDescription(d.weight);
  tooltip.html(`<div class="font-bold text-sm" style="color:#a78bfa">${weightDesc}</div><div class="flex items-center gap-2 my-1"><span style="color:${d.source.color}">${d.source.name}</span><span>&harr;</span><span style="color:${d.target.color}">${d.target.name}</span></div><div class="text-xs text-gray-400">Types: ${d.types.join(', ')}</div>`);
}).on('mousemove', event => {
  tooltip.style('top',(event.pageY-10)+'px').style('left',(event.pageX+10)+'px');
}).on('mouseout', () => {
  tooltip.style('visibility','hidden').style('opacity',0);
});

backBtn.on('click', () => {
  if (selectionHistory.length>0) { selectionHistory.pop(); updateFocusAndNarrative(); }
});

resetBtn.on('click', () => { selectionHistory=[]; updateFocusAndNarrative(); });
glossaryBtn.on('click', () => {
  if(selectionHistory.length===0){
    narrativeHub.classed('show', true);
    narrativeTabs.html('<div class="narrative-tab active" data-target="pane-glossary">Glossary</div>');
    narrativeContentArea.html('<div class="narrative-pane active" id="pane-glossary">'+generateGlossary()+'</div>');
    attachGlossaryEvents();
  } else {
    d3.select("[data-target='pane-glossary']").dispatch('click');
  }
});

function updateFocusAndNarrative() { updateFocusState(); updateNarrative(); }

function updateFocusState() {
  const focusIds = new Set(selectionHistory.map(n=>n.id));
  backBtn.property('disabled', selectionHistory.length===0);
  resetBtn.property('disabled', selectionHistory.length===0);
  if (focusIds.size===0) {
    narrativeHub.classed('show', false);
    nodeSelection.attr('class','node').select('circle').attr('r',12);
    linkSelection.attr('class','link');
    simulation.force('link').strength(0.05).distance(200);
    simulation.force('charge').strength(-250);
    simulation.force('center', d3.forceCenter(width/2, height/2));
  } else {
    narrativeHub.classed('show', true);
    const neighborIds = new Set();
    const sharedNeighborIds = new Set();
    selectionHistory.forEach((focusNode,i) => {
      links.forEach(link => {
        const sId = typeof link.source === 'object'? link.source.id : link.source;
        const tId = typeof link.target === 'object'? link.target.id : link.target;
        if (sId===focusNode.id) {
          if (i>0 && neighborIds.has(tId)) sharedNeighborIds.add(tId); else neighborIds.add(tId);
        }
        if (tId===focusNode.id) {
          if (i>0 && neighborIds.has(sId)) sharedNeighborIds.add(sId); else neighborIds.add(sId);
        }
      });
    });
    nodeSelection.attr('class', d => {
      if (focusIds.has(d.id)) return 'node is-focus';
      if (sharedNeighborIds.has(d.id)) return 'node is-shared-neighbor';
      if (neighborIds.has(d.id)) return 'node is-neighbor';
      return 'node is-distant';
    }).select('circle').transition().duration(500)
      .attr('r', d => {
        if (focusIds.has(d.id)) return 20;
        if (sharedNeighborIds.has(d.id)) return 16;
        if (neighborIds.has(d.id)) return 14;
        return 8;
      });
    linkSelection.attr('class', d => {
      const sf = focusIds.has(d.source.id); const tf = focusIds.has(d.target.id);
      if (sf && tf) return 'link is-primary';
      if (sf || tf) return 'link is-secondary';
      return 'link';
    });
    simulation.force('center', null);
    simulation.force('link').strength(l => focusIds.has(l.source.id) || focusIds.has(l.target.id) ? 0.6 : 0.01)
      .distance(l => focusIds.has(l.source.id) || focusIds.has(l.target.id) ? 120 : 300);
    simulation.force('charge').strength(d => focusIds.has(d.id) ? -1000 : -150);
  }
  simulation.alpha(1).restart();
}

function updateNarrative() {
  narrativeTabs.html('');
  narrativeContentArea.html('');
  if (selectionHistory.length===0) {
    narrativeContentArea.html(`<div class="narrative-pane active text-center text-gray-400 p-4"><p>Your journey begins here.</p><p class="text-sm mt-2">Select a card from the cosmic web to receive its interpretation.</p></div>`);
    return;
  }
  if (selectionHistory.length>1) {
    narrativeTabs.append('div').attr('class','narrative-tab active').attr('data-target','pane-constellation').text('Constellation');
  }
  selectionHistory.forEach(card => {
    narrativeTabs.append('div').attr('class', `narrative-tab ${selectionHistory.length===1?'active':''}`)
      .attr('data-target', `pane-${card.id.replace(/\s+/g,'-')}`)
      .text(card.name);
  });
  narrativeTabs.append('div').attr('class','narrative-tab')
    .attr('data-target','pane-glossary').text('Glossary');
  if (selectionHistory.length>1) {
    narrativeContentArea.append('div').attr('id','pane-constellation').attr('class','narrative-pane active')
      .html(generateCombinationInterpretation(selectionHistory, links));
  }
  selectionHistory.forEach(card => {
    narrativeContentArea.append('div').attr('id',`pane-${card.id.replace(/\s+/g,'-')}`)
      .attr('class', `narrative-pane ${selectionHistory.length===1?'active':''}`)
      .html(generateSingleCardInterpretation(card));
  });
  narrativeContentArea.append('div').attr('id','pane-glossary').attr('class','narrative-pane')
    .html(generateGlossary());
  d3.selectAll('.narrative-tab').on('click', function() {
    d3.selectAll('.narrative-tab').classed('active', false);
    d3.selectAll('.narrative-pane').classed('active', false);
    d3.select(this).classed('active', true);
    d3.select('#'+this.dataset.target).classed('active', true);
  });
  attachGlossaryEvents();
}

function attachGlossaryEvents() {
  d3.selectAll('.glossary-link')
    .on('click', function(e){
      e.preventDefault();
      d3.select("[data-target='pane-glossary']").dispatch('click');
      const id = this.getAttribute('href');
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({behavior:'smooth'});
    })
    .on('mouseover', function(event){
      const term = this.textContent.trim();
      const def = ALL_GLOSSARY_DEFS[term] || '';
      if(def){
        tooltip.style('visibility','visible').style('opacity',1).html(`<div class="text-sm">${def}</div>`);
      }
    })
    .on('mousemove', event => {
      tooltip.style('top',(event.pageY-10)+'px').style('left',(event.pageX+10)+'px');
    })
    .on('mouseout', () => { tooltip.style('visibility','hidden').style('opacity',0); });
}

function drag(simulation) {
  function dragstarted(event,d){ if(!event.active) simulation.alphaTarget(0.3).restart(); d.fx=d.x; d.fy=d.y; }
  function dragged(event,d){ d.fx=event.x; d.fy=event.y; }
  function dragended(event,d){ if(!event.active) simulation.alphaTarget(0); if(selectionHistory.length===0){d.fx=null; d.fy=null;} }
  return d3.drag().on('start',dragstarted).on('drag',dragged).on('end',dragended);
}

const zoom = d3.zoom().scaleExtent([0.1,4]).on('zoom', event => {
  nodeGroup.attr('transform', event.transform);
  linkGroup.attr('transform', event.transform);
});
svg.call(zoom);
connectionLegend.html('<strong>Connection Strength</strong><ul class="mt-1 space-y-0.5"><li>A Profound Connection ≥7</li><li>A Strong Resonance 5‑6</li><li>A Subtle Link 3‑4</li><li>A Faint Echo 1‑2</li></ul>');
updateFocusAndNarrative();
}

init();
