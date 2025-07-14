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

const majorArcanaData = [
{"name": "The Fool", "card_number": 0, "color": "#FBBF24", "core_theme": {"positive": "Innocent Potential", "neutral": "Uncharted Journey", "negative": "Reckless Folly"}, "archetypal_principles": {"Initiation": 1, "Will": 0, "Intuition": 0, "Nurturing": 0, "Structure": -1, "Guidance": 0, "Choice": 1, "Control": -1, "Courage": 1, "Introspection": 0, "Cycles": 0, "Balance": 0, "Perspective": 1, "Transformation": 0, "Harmony": 0, "Shadow": -1, "Revelation": 0, "Hope": 1, "Subconscious": 1, "Clarity": 0, "Awakening": 0, "Completion": -1, "Chaos": 1, "Order": -1, "Freedom": 1, "Constraint": -1, "Growth": 1, "Decay": 0, "Light": 1, "Darkness": 0, "Emanation": 1, "Containment": -1, "DivineFlow": 1, "Manifestation": 0, "Concealment": 0}, "fractal_signatures_embedded": ["The Magician", "The World", "Death", "The Star"], "unique_symbols": ["cliff", "white rose", "dog", "sun", "backpack", "butterfly"], "primary_geometry_type": "Mobius", "primary_fractal_pattern": "WaterRipples", "hebrew_letter": "Aleph", "gematria_value": 1, "kabbalistic_path_number": 11, "astrological_correspondence": "Element: Air", "astrological_modality": null, "path_from_sephirah": "Kether", "path_to_sephirah": "Chokmah"},
{"name": "The Magician", "card_number": 1, "color": "#FDE047", "core_theme": {"positive": "Creative Will", "neutral": "Manifestation", "negative": "Manipulation"}, "archetypal_principles": {"Initiation": 1, "Will": 1, "Intuition": 0, "Nurturing": 0, "Structure": 1, "Guidance": 1, "Choice": 0, "Control": 1, "Courage": 0, "Introspection": 0, "Cycles": 0, "Balance": 1, "Perspective": 0, "Transformation": 1, "Harmony": 0, "Shadow": -1, "Revelation": 0, "Hope": 0, "Subconscious": 0, "Clarity": 1, "Awakening": 1, "Completion": 0, "Chaos": 0, "Order": 1, "Freedom": 0, "Constraint": 0, "Growth": 1, "Decay": 0, "Light": 1, "Darkness": 0, "Emanation": 1, "Containment": 0, "DivineFlow": 1, "Manifestation": 1, "Concealment": 0}, "fractal_signatures_embedded": ["The Fool", "The High Priestess", "The Devil", "The Sun"], "unique_symbols": ["wand", "table", "elements (air, fire, water, earth)", "lemniscate", "serpent"], "primary_geometry_type": "Tetrahedron", "primary_fractal_pattern": "CrystalLattice", "hebrew_letter": "Beth", "gematria_value": 2, "kabbalistic_path_number": 12, "astrological_correspondence": "Planet: Mercury", "astrological_modality": null, "path_from_sephirah": "Kether", "path_to_sephirah": "Binah"},
{"name": "The High Priestess", "card_number": 2, "color": "#60A5FA", "core_theme": {"positive": "Sacred Intuition", "neutral": "Hidden Wisdom", "negative": "Unveiled Secrets"}, "archetypal_principles": {"Initiation": 0, "Will": -1, "Intuition": 1, "Nurturing": 0, "Structure": 0, "Guidance": 1, "Choice": 0, "Control": 0, "Courage": 0, "Introspection": 1, "Cycles": 0, "Balance": 0, "Perspective": 1, "Transformation": 0, "Harmony": 0, "Shadow": 0, "Revelation": 0, "Hope": 0, "Subconscious": 1, "Clarity": 0, "Awakening": 0, "Completion": 0, "Chaos": 0, "Order": 0, "Freedom": 0, "Constraint": 0, "Growth": 0, "Decay": 0, "Light": 0, "Darkness": 1, "Emanation": 0, "Containment": 1, "DivineFlow": 0, "Manifestation": 0, "Concealment": 1}, "fractal_signatures_embedded": ["The Moon", "The Star", "The Magician", "The Hermit"], "unique_symbols": ["veil", "pillars (B & J)", "scroll", "pomegranate", "crescent moon", "water"], "primary_geometry_type": "Sphere", "primary_fractal_pattern": "CosmicWeb", "hebrew_letter": "Gimel", "gematria_value": 3, "kabbalistic_path_number": 13, "astrological_correspondence": "Planet: Moon", "astrological_modality": null, "path_from_sephirah": "Kether", "path_to_sephirah": "Tiphareth"},
{"name": "The Empress", "card_number": 3, "color": "#4ADE80", "core_theme": {"positive": "Abundant Creation", "neutral": "Nurturing Growth", "negative": "Overindulgence"}, "archetypal_principles": {"Initiation": 0, "Will": 0, "Intuition": 0, "Nurturing": 1, "Structure": 0, "Guidance": 0, "Choice": 0, "Control": 0, "Courage": 0, "Introspection": 0, "Cycles": 1, "Balance": 0, "Perspective": 0, "Transformation": 1, "Harmony": 1, "Shadow": -1, "Revelation": 0, "Hope": 0, "Subconscious": 0, "Clarity": 0, "Awakening": 0, "Completion": 1, "Chaos": 0, "Order": 0, "Freedom": 0, "Constraint": 0, "Growth": 1, "Decay": 0, "Light": 1, "Darkness": 0, "Emanation": 1, "Containment": 1, "DivineFlow": 1, "Manifestation": 1, "Concealment": 0}, "fractal_signatures_embedded": ["The Emperor", "Strength", "The World", "Temperance"], "unique_symbols": ["scepter", "shield", "wheat field", "waterfall", "venus symbol", "crown"], "primary_geometry_type": "Cube", "primary_fractal_pattern": "FloralBloom", "hebrew_letter": "Daleth", "gematria_value": 4, "kabbalistic_path_number": 14, "astrological_correspondence": "Planet: Venus", "astrological_modality": null, "path_from_sephirah": "Chokmah", "path_to_sephirah": "Binah"},
{"name": "The Emperor", "card_number": 4, "color": "#F87171", "core_theme": {"positive": "Stable Authority", "neutral": "Order & Structure", "negative": "Tyranny"}, "archetypal_principles": {"Initiation": 0, "Will": 1, "Intuition": -1, "Nurturing": -1, "Structure": 1, "Guidance": 1, "Choice": 0, "Control": 1, "Courage": 1, "Introspection": 0, "Cycles": 0, "Balance": 1, "Perspective": 0, "Transformation": 0, "Harmony": 0, "Shadow": -1, "Revelation": 0, "Hope": 0, "Subconscious": -1, "Clarity": 1, "Awakening": 0, "Completion": 0, "Chaos": -1, "Order": 1, "Freedom": -1, "Constraint": 1, "Growth": 0, "Decay": 0, "Light": 1, "Darkness": 0, "Emanation": 0, "Containment": 1, "DivineFlow": 0, "Manifestation": 1, "Concealment": 0}, "fractal_signatures_embedded": ["The Empress", "Justice", "The Chariot", "The Hierophant"], "unique_symbols": ["orb", "scepter", "throne", "ram's head", "barren landscape", "eagle"], "primary_geometry_type": "Pyramid", "primary_fractal_pattern": "MountainRange", "hebrew_letter": "Heh", "gematria_value": 5, "kabbalistic_path_number": 15, "astrological_correspondence": "Zodiac: Aries", "astrological_modality": "Cardinal", "path_from_sephirah": "Chokmah", "path_to_sephirah": "Tiphareth"},
{"name": "The Hierophant", "card_number": 5, "color": "#A78BFA", "core_theme": {"positive": "Spiritual Guidance", "neutral": "Tradition & Belief", "negative": "Dogma"}, "archetypal_principles": {"Initiation": 0, "Will": 0, "Intuition": 0, "Nurturing": 0, "Structure": 1, "Guidance": 1, "Choice": 0, "Control": 0, "Courage": 0, "Introspection": 0, "Cycles": 0, "Balance": 0, "Perspective": 0, "Transformation": 0, "Harmony": 0, "Shadow": -1, "Revelation": 0, "Hope": 0, "Subconscious": 0, "Clarity": 1, "Awakening": 0, "Completion": 0, "Chaos": -1, "Order": 1, "Freedom": 0, "Constraint": 1, "Growth": 0, "Decay": 0, "Light": 1, "Darkness": 0, "Emanation": 0, "Containment": 1, "DivineFlow": 0, "Manifestation": 0, "Concealment": 1}, "fractal_signatures_embedded": ["The Lovers", "Temperance", "Justice", "The Emperor"], "unique_symbols": ["keys", "staff", "students", "pillars", "triple crown", "cross"], "primary_geometry_type": "Octahedron", "primary_fractal_pattern": "AncientRunes", "hebrew_letter": "Vau", "gematria_value": 6, "kabbalistic_path_number": 16, "astrological_correspondence": "Zodiac: Taurus", "astrological_modality": "Fixed", "path_from_sephirah": "Chokmah", "path_to_sephirah": "Chesed"},
{"name": "The Lovers", "card_number": 6, "color": "#818CF8", "core_theme": {"positive": "Harmonious Union", "neutral": "Significant Choice", "negative": "Conflict & Temptation"}, "archetypal_principles": {"Initiation": 0, "Will": 0, "Intuition": 0, "Nurturing": 0, "Structure": 0, "Guidance": 0, "Choice": 1, "Control": 0, "Courage": 0, "Introspection": 0, "Cycles": 0, "Balance": 1, "Perspective": 0, "Transformation": 0, "Harmony": 1, "Shadow": -1, "Revelation": 0, "Hope": 0, "Subconscious": 0, "Clarity": 0, "Awakening": 0, "Completion": 0, "Chaos": 0, "Order": 0, "Freedom": 1, "Constraint": 0, "Growth": 1, "Decay": 0, "Light": 1, "Darkness": 0, "Emanation": 0, "Containment": 0, "DivineFlow": 1, "Manifestation": 0, "Concealment": 0}, "fractal_signatures_embedded": ["The Hierophant", "The Devil", "Temperance", "The Chariot"], "unique_symbols": ["angel", "man", "woman", "apple tree", "serpent", "volcano"], "primary_geometry_type": "Triangle", "primary_fractal_pattern": "IntertwinedVines", "hebrew_letter": "Zain", "gematria_value": 7, "kabbalistic_path_number": 17, "astrological_correspondence": "Zodiac: Gemini", "astrological_modality": "Mutable", "path_from_sephirah": "Binah", "path_to_sephirah": "Tiphareth"},
{"name": "The Chariot", "card_number": 7, "color": "#FB923C", "core_theme": {"positive": "Determined Victory", "neutral": "Controlled Movement", "negative": "Aggressive Impulse"}, "archetypal_principles": {"Initiation": 1, "Will": 1, "Intuition": 0, "Nurturing": 0, "Structure": 0, "Guidance": 0, "Choice": 0, "Control": 1, "Courage": 1, "Introspection": 0, "Cycles": 0, "Balance": 0, "Perspective": 0, "Transformation": 0, "Harmony": 0, "Shadow": -1, "Revelation": 0, "Hope": 0, "Subconscious": 0, "Clarity": 0, "Awakening": 0, "Completion": 0, "Chaos": 0, "Order": 1, "Freedom": 0, "Constraint": 0, "Growth": 1, "Decay": 0, "Light": 1, "Darkness": 0, "Emanation": 0, "Containment": 1, "DivineFlow": 0, "Manifestation": 1, "Concealment": 0}, "fractal_signatures_embedded": ["Strength", "The Tower", "The Emperor", "The Lovers"], "unique_symbols": ["sphinxes (black & white)", "chariot", "canopy of stars", "armor", "city"], "primary_geometry_type": "Cylinder", "primary_fractal_pattern": "SwirlingClouds", "hebrew_letter": "Cheth", "gematria_value": 8, "kabbalistic_path_number": 18, "astrological_correspondence": "Zodiac: Cancer", "astrological_modality": "Cardinal", "path_from_sephirah": "Binah", "path_to_sephirah": "Geburah"},
{"name": "Strength", "card_number": 8, "color": "#FACC15", "core_theme": {"positive": "Inner Courage", "neutral": "Compassionate Power", "negative": "Brutality"}, "archetypal_principles": {"Initiation": 0, "Will": 0, "Intuition": 0, "Nurturing": 1, "Structure": 0, "Guidance": 0, "Choice": 0, "Control": 1, "Courage": 1, "Introspection": 0, "Cycles": 0, "Balance": 1, "Perspective": 0, "Transformation": 0, "Harmony": 1, "Shadow": -1, "Revelation": 0, "Hope": 0, "Subconscious": 0, "Clarity": 0, "Awakening": 0, "Completion": 0, "Chaos": 0, "Order": 1, "Freedom": 0, "Constraint": 0, "Growth": 1, "Decay": 0, "Light": 1, "Darkness": 0, "Emanation": 0, "Containment": 0, "DivineFlow": 1, "Manifestation": 1, "Concealment": 0}, "fractal_signatures_embedded": ["The Chariot", "The Hermit", "The Empress", "The Sun"], "unique_symbols": ["lion", "woman", "lemniscate (infinity symbol)", "rose", "mountain"], "primary_geometry_type": "Spiral", "primary_fractal_pattern": "BoneBlossom", "hebrew_letter": "Teth", "gematria_value": 9, "kabbalistic_path_number": 19, "astrological_correspondence": "Zodiac: Leo", "astrological_modality": "Fixed", "path_from_sephirah": "Chesed", "path_to_sephirah": "Geburah"},
{"name": "The Hermit", "card_number": 9, "color": "#9CA3AF", "core_theme": {"positive": "Wise Introspection", "neutral": "Solitary Guidance", "negative": "Isolation"}, "archetypal_principles": {"Initiation": 0, "Will": 0, "Intuition": 1, "Nurturing": 0, "Structure": 0, "Guidance": 1, "Choice": 0, "Control": 0, "Courage": 0, "Introspection": 1, "Cycles": 0, "Balance": 0, "Perspective": 1, "Transformation": 0, "Harmony": 0, "Shadow": -1, "Revelation": 0, "Hope": 0, "Subconscious": 1, "Clarity": 1, "Awakening": 0, "Completion": 0, "Chaos": 0, "Order": 1, "Freedom": 0, "Constraint": 0, "Growth": 0, "Decay": 0, "Light": 1, "Darkness": 0, "Emanation": 0, "Containment": 1, "DivineFlow": 0, "Manifestation": 0, "Concealment": 1}, "fractal_signatures_embedded": ["Strength", "The Hanged Man", "The High Priestess", "Judgement"], "unique_symbols": ["lantern", "staff", "mountain peak", "cloak", "snake"], "primary_geometry_type": "Cone", "primary_fractal_pattern": "DesertSands", "hebrew_letter": "Yod", "gematria_value": 10, "kabbalistic_path_number": 20, "astrological_correspondence": "Zodiac: Virgo", "astrological_modality": "Mutable", "path_from_sephirah": "Chesed", "path_to_sephirah": "Tiphareth"},
{"name": "Wheel of Fortune", "card_number": 10, "color": "#C084FC", "core_theme": {"positive": "Favorable Cycles", "neutral": "Unfolding Destiny", "negative": "Uncontrollable Chaos"}, "archetypal_principles": {"Initiation": 0, "Will": 0, "Intuition": 0, "Nurturing": 0, "Structure": 0, "Guidance": 0, "Choice": 0, "Control": 0, "Courage": 0, "Introspection": 0, "Cycles": 1, "Balance": 0, "Perspective": 1, "Transformation": 1, "Harmony": 0, "Shadow": -1, "Revelation": 0, "Hope": 0, "Subconscious": 0, "Clarity": 0, "Awakening": 0, "Completion": 0, "Chaos": 1, "Order": 0, "Freedom": 0, "Constraint": 0, "Growth": 1, "Decay": 0, "Light": 0, "Darkness": 0, "Emanation": 0, "Containment": 0, "DivineFlow": 1, "Manifestation": 0, "Concealment": 0}, "fractal_signatures_embedded": ["Justice", "The World", "The Tower", "The Sun"], "unique_symbols": ["wheel", "sphinx", "serpent", "four creatures (Evangelists)", "TARO/ROTA", "clouds"], "primary_geometry_type": "Circle", "primary_fractal_pattern": "ClockworkGears", "hebrew_letter": "Kaph", "gematria_value": 20, "kabbalistic_path_number": 21, "astrological_correspondence": "Planet: Jupiter", "astrological_modality": null, "path_from_sephirah": "Chesed", "path_to_sephirah": "Netzach"},
{"name": "Justice", "card_number": 11, "color": "#34D399", "core_theme": {"positive": "Impartial Fairness", "neutral": "Equilibrium & Truth", "negative": "Rigidity & Bias"}, "archetypal_principles": {"Initiation": 0, "Will": 0, "Intuition": 0, "Nurturing": 0, "Structure": 1, "Guidance": 1, "Choice": 0, "Control": 1, "Courage": 0, "Introspection": 0, "Cycles": 0, "Balance": 1, "Perspective": 0, "Transformation": 0, "Harmony": 0, "Shadow": -1, "Revelation": 0, "Hope": 0, "Subconscious": 0, "Clarity": 1, "Awakening": 0, "Completion": 0, "Chaos": -1, "Order": 1, "Freedom": 0, "Constraint": 1, "Growth": 0, "Decay": 0, "Light": 1, "Darkness": 0, "Emanation": 0, "Containment": 1, "DivineFlow": 0, "Manifestation": 1, "Concealment": 0}, "fractal_signatures_embedded": ["Wheel of Fortune", "The Emperor", "Temperance", "The Hierophant"], "unique_symbols": ["scales", "sword", "blindfold", "red robe", "pillars", "throne"], "primary_geometry_type": "Square", "primary_fractal_pattern": "TiledPavement", "hebrew_letter": "Lamed", "gematria_value": 30, "kabbalistic_path_number": 22, "astrological_correspondence": "Zodiac: Libra", "astrological_modality": "Cardinal", "path_from_sephirah": "Geburah", "path_to_sephirah": "Tiphareth"},
{"name": "The Hanged Man", "card_number": 12, "color": "#3B82F6", "core_theme": {"positive": "Profound Surrender", "neutral": "New Perspective", "negative": "Martyrdom & Stagnation"}, "archetypal_principles": {"Initiation": 0, "Will": -1, "Intuition": 1, "Nurturing": 0, "Structure": 0, "Guidance": 0, "Choice": 0, "Control": -1, "Courage": 0, "Introspection": 1, "Cycles": 0, "Balance": 0, "Perspective": 1, "Transformation": 1, "Harmony": 0, "Shadow": -1, "Revelation": 1, "Hope": 0, "Subconscious": 1, "Clarity": 0, "Awakening": 0, "Completion": 0, "Chaos": 0, "Order": 0, "Freedom": 1, "Constraint": 0, "Growth": 0, "Decay": 0, "Light": 0, "Darkness": 1, "Emanation": 0, "Containment": 0, "DivineFlow": 0, "Manifestation": 0, "Concealment": 1}, "fractal_signatures_embedded": ["The Hermit", "Death", "The Star", "The Moon"], "unique_symbols": ["hanging figure", "T-cross", "halo", "water", "coins", "tree"], "primary_geometry_type": "InvertedTriangle", "primary_fractal_pattern": "RootSystem", "hebrew_letter": "Mem", "gematria_value": 40, "kabbalistic_path_number": 23, "astrological_correspondence": "Element: Water", "astrological_modality": null, "path_from_sephirah": "Geburah", "path_to_sephirah": "Hod"},
{"name": "Death", "card_number": 13, "color": "#4B5563", "core_theme": {"positive": "Radical Transformation", "neutral": "Inevitable Ending", "negative": "Stagnation & Fear"}, "archetypal_principles": {"Initiation": 0, "Will": 0, "Intuition": 0, "Nurturing": 0, "Structure": -1, "Guidance": 0, "Choice": 0, "Control": 0, "Courage": 1, "Introspection": 0, "Cycles": 1, "Balance": 0, "Perspective": 0, "Transformation": 1, "Harmony": 0, "Shadow": -1, "Revelation": 1, "Hope": 0, "Subconscious": 0, "Clarity": 0, "Awakening": 1, "Completion": 0, "Chaos": 0, "Order": -1, "Freedom": 0, "Constraint": 0, "Growth": 0, "Decay": 1, "Light": 0, "Darkness": 1, "Emanation": 0, "Containment": 0, "DivineFlow": 0, "Manifestation": 0, "Concealment": 0}, "fractal_signatures_embedded": ["The Hanged Man", "Temperance", "The Tower", "Judgement"], "unique_symbols": ["skeleton", "rose", "banner", "king", "child", "woman", "river", "sun"], "primary_geometry_type": "Scythe", "primary_fractal_pattern": "DecayingLeaves", "hebrew_letter": "Nun", "gematria_value": 50, "kabbalistic_path_number": 24, "astrological_correspondence": "Zodiac: Scorpio", "astrological_modality": "Fixed", "path_from_sephirah": "Tiphareth", "path_to_sephirah": "Netzach"},
{"name": "Temperance", "card_number": 14, "color": "#2563EB", "core_theme": {"positive": "Harmonious Integration", "neutral": "Moderation & Flow", "negative": "Extremism & Imbalance"}, "archetypal_principles": {"Initiation": 0, "Will": 0, "Intuition": 0, "Nurturing": 0, "Structure": 0, "Guidance": 1, "Choice": 0, "Control": 0, "Courage": 0, "Introspection": 0, "Cycles": 0, "Balance": 1, "Perspective": 0, "Transformation": 1, "Harmony": 1, "Shadow": -1, "Revelation": 0, "Hope": 0, "Subconscious": 0, "Clarity": 0, "Awakening": 0, "Completion": 1, "Chaos": -1, "Order": 1, "Freedom": 0, "Constraint": 0, "Growth": 1, "Decay": 0, "Light": 1, "Darkness": 0, "Emanation": 0, "Containment": 0, "DivineFlow": 1, "Manifestation": 0, "Concealment": 0}, "fractal_signatures_embedded": ["Death", "The Devil", "Justice", "The World"], "unique_symbols": ["angel", "cups (pouring water)", "irises", "path", "sun", "mountain"], "primary_geometry_type": "Vessel", "primary_fractal_pattern": "FlowingWater", "hebrew_letter": "Samekh", "gematria_value": 60, "kabbalistic_path_number": 25, "astrological_correspondence": "Zodiac: Sagittarius", "astrological_modality": "Mutable", "path_from_sephirah": "Tiphareth", "path_to_sephirah": "Yesod"},
{"name": "The Devil", "card_number": 15, "color": "#374151", "core_theme": {"positive": "Liberation from Chains", "neutral": "Material Bondage", "negative": "Obsession & Addiction"}, "archetypal_principles": {"Initiation": 0, "Will": 0, "Intuition": 0, "Nurturing": -1, "Structure": 0, "Guidance": -1, "Choice": -1, "Control": -1, "Courage": 0, "Introspection": 0, "Cycles": 0, "Balance": -1, "Perspective": 0, "Transformation": 0, "Harmony": -1, "Shadow": 1, "Revelation": 0, "Hope": -1, "Subconscious": 0, "Clarity": -1, "Awakening": 0, "Completion": 0, "Chaos": 1, "Order": -1, "Freedom": 0, "Constraint": 1, "Growth": 0, "Decay": 0, "Light": 0, "Darkness": 1, "Emanation": -1, "Containment": 1, "DivineFlow": -1, "Manifestation": 1, "Concealment": 0}, "fractal_signatures_embedded": ["Temperance", "The Tower", "The Lovers", "The Magician"], "unique_symbols": ["devil figure", "chained figures", "inverted pentagram", "torch", "tail", "goat"], "primary_geometry_type": "Pentagram", "primary_fractal_pattern": "InfernalFlames", "hebrew_letter": "Ayin", "gematria_value": 70, "kabbalistic_path_number": 26, "astrological_correspondence": "Zodiac: Capricorn", "astrological_modality": "Cardinal", "path_from_sephirah": "Tiphareth", "path_to_sephirah": "Hod"},
{"name": "The Tower", "card_number": 16, "color": "#EF4444", "core_theme": {"positive": "Sudden Revelation", "neutral": "Catastrophic Upheaval", "negative": "Utter Destruction"}, "archetypal_principles": {"Initiation": 0, "Will": 0, "Intuition": 0, "Nurturing": -1, "Structure": -1, "Guidance": 0, "Choice": 0, "Control": -1, "Courage": 0, "Introspection": 0, "Cycles": 0, "Balance": -1, "Perspective": 0, "Transformation": 1, "Harmony": -1, "Shadow": 1, "Revelation": 1, "Hope": -1, "Subconscious": 0, "Clarity": 0, "Awakening": 1, "Completion": -1, "Chaos": 1, "Order": -1, "Freedom": 0, "Constraint": 1, "Growth": 0, "Decay": 1, "Light": 0, "Darkness": 1, "Emanation": -1, "Containment": -1, "DivineFlow": -1, "Manifestation": 1, "Concealment": 0}, "fractal_signatures_embedded": ["The Devil", "The Star", "Death", "The Chariot"], "unique_symbols": ["lightning", "falling crown", "falling figures", "tower", "fire", "clouds"], "primary_geometry_type": "ShatteredCube", "primary_fractal_pattern": "CrackedEarth", "hebrew_letter": "Peh", "gematria_value": 80, "kabbalistic_path_number": 27, "astrological_correspondence": "Planet: Mars", "astrological_modality": null, "path_from_sephirah": "Netzach", "path_to_sephirah": "Hod"},
{"name": "The Star", "card_number": 17, "color": "#0EA5E9", "core_theme": {"positive": "Renewed Hope", "neutral": "Divine Inspiration", "negative": "Despair & Emptiness"}, "archetypal_principles": {"Initiation": 0, "Will": 0, "Intuition": 1, "Nurturing": 1, "Structure": 0, "Guidance": 0, "Choice": 0, "Control": 0, "Courage": 0, "Introspection": 0, "Cycles": 0, "Balance": 1, "Perspective": 0, "Transformation": 0, "Harmony": 1, "Shadow": -1, "Revelation": 0, "Hope": 1, "Subconscious": 0, "Clarity": 1, "Awakening": 0, "Completion": 0, "Chaos": 0, "Order": 0, "Freedom": 1, "Constraint": 0, "Growth": 1, "Decay": 0, "Light": 1, "Darkness": 0, "Emanation": 1, "Containment": 0, "DivineFlow": 1, "Manifestation": 0, "Concealment": 0}, "fractal_signatures_embedded": ["The Tower", "The Moon", "Temperance", "The Hanged Man"], "unique_symbols": ["stars (7 or 8)", "nude figure", "pitchers & water", "bird", "tree", "river"], "primary_geometry_type": "Octagram", "primary_fractal_pattern": "Nebula", "hebrew_letter": "Tzaddi", "gematria_value": 90, "kabbalistic_path_number": 28, "astrological_correspondence": "Zodiac: Aquarius", "astrological_modality": "Fixed", "path_from_sephirah": "Netzach", "path_to_sephirah": "Yesod"},
{"name": "The Moon", "card_number": 18, "color": "#6B7280", "core_theme": {"positive": "Deep Intuition", "neutral": "Subconscious Realms", "negative": "Illusion & Fear"}, "archetypal_principles": {"Initiation": 0, "Will": 0, "Intuition": 1, "Nurturing": 0, "Structure": 0, "Guidance": 0, "Choice": 0, "Control": 0, "Courage": 0, "Introspection": 1, "Cycles": 0, "Balance": 0, "Perspective": 0, "Transformation": 0, "Harmony": 0, "Shadow": 1, "Revelation": 0, "Hope": -1, "Subconscious": 1, "Clarity": -1, "Awakening": 0, "Completion": 0, "Chaos": 0, "Order": 0, "Freedom": 0, "Constraint": 0, "Growth": 0, "Decay": 0, "Light": 0, "Darkness": 1, "Emanation": 0, "Containment": 1, "DivineFlow": 0, "Manifestation": 0, "Concealment": 1}, "fractal_signatures_embedded": ["The Star", "The Sun", "The High Priestess", "The Hermit"], "unique_symbols": ["moon (full & crescent)", "dogs/wolves", "crayfish", "path", "towers", "water", "river"], "primary_geometry_type": "Crescent", "primary_fractal_pattern": "DreamMist", "hebrew_letter": "Koph", "gematria_value": 100, "kabbalistic_path_number": 29, "astrological_correspondence": "Zodiac: Pisces", "astrological_modality": "Mutable", "path_from_sephirah": "Netzach", "path_to_sephirah": "Malkuth"},
{"name": "The Sun", "card_number": 19, "color": "#F97316", "core_theme": {"positive": "Radiant Joy", "neutral": "Absolute Clarity", "negative": "Delusion & Overexposure"}, "archetypal_principles": {"Initiation": 0, "Will": 0, "Intuition": 0, "Nurturing": 1, "Structure": 0, "Guidance": 0, "Choice": 0, "Control": 0, "Courage": 0, "Introspection": 0, "Cycles": 0, "Balance": 0, "Perspective": 0, "Transformation": 0, "Harmony": 1, "Shadow": -1, "Revelation": 1, "Hope": 1, "Subconscious": -1, "Clarity": 1, "Awakening": 0, "Completion": 1, "Chaos": -1, "Order": 1, "Freedom": 1, "Constraint": -1, "Growth": 1, "Decay": 0, "Light": 1, "Darkness": 0, "Emanation": 1, "Containment": 0, "DivineFlow": 1, "Manifestation": 1, "Concealment": 0}, "fractal_signatures_embedded": ["The Moon", "Judgement", "The Fool", "The Magician"], "unique_symbols": ["sun", "child", "white horse", "sunflowers", "wall", "banner"], "primary_geometry_type": "RadiantCircle", "primary_fractal_pattern": "SunflowerPattern", "hebrew_letter": "Resh", "gematria_value": 200, "kabbalistic_path_number": 30, "astrological_correspondence": "Planet: Sun", "astrological_modality": null, "path_from_sephirah": "Hod", "path_to_sephirah": "Yesod"},
{"name": "Judgement", "card_number": 20, "color": "#F59E0B", "core_theme": {"positive": "Profound Awakening", "neutral": "Call to Reckoning", "negative": "Guilt & Self-Condemnation"}, "archetypal_principles": {"Initiation": 0, "Will": 0, "Intuition": 0, "Nurturing": 0, "Structure": 0, "Guidance": 0, "Choice": 0, "Control": 0, "Courage": 0, "Introspection": 1, "Cycles": 1, "Balance": 0, "Perspective": 0, "Transformation": 1, "Harmony": 0, "Shadow": -1, "Revelation": 1, "Hope": 0, "Subconscious": 0, "Clarity": 1, "Awakening": 1, "Completion": 0, "Chaos": 0, "Order": 1, "Freedom": 0, "Constraint": 0, "Growth": 0, "Decay": 0, "Light": 1, "Darkness": 0, "Emanation": 0, "Containment": 0, "DivineFlow": 1, "Manifestation": 1, "Concealment": 0}, "fractal_signatures_embedded": ["The Sun", "The World", "Death", "The Hermit"], "unique_symbols": ["angel", "trumpet", "coffins", "figures rising", "mountains", "clouds"], "primary_geometry_type": "Cross", "primary_fractal_pattern": "SoundWaves", "hebrew_letter": "Shin", "gematria_value": 300, "kabbalistic_path_number": 31, "astrological_correspondence": "Element: Fire", "astrological_modality": null, "path_from_sephirah": "Hod", "path_to_sephirah": "Malkuth"},
{"name": "The World", "card_number": 21, "color": "#10B981", "core_theme": {"positive": "Wholeness & Completion", "neutral": "Integration & Fulfillment", "negative": "Stagnation & Entrapment"}, "archetypal_principles": {"Initiation": 0, "Will": 0, "Intuition": 0, "Nurturing": 1, "Structure": 1, "Guidance": 0, "Choice": 0, "Control": 0, "Courage": 0, "Introspection": 0, "Cycles": 1, "Balance": 1, "Perspective": 1, "Transformation": 1, "Harmony": 1, "Shadow": -1, "Revelation": 0, "Hope": 1, "Subconscious": 0, "Clarity": 1, "Awakening": 1, "Completion": 1, "Chaos": 0, "Order": 1, "Freedom": 1, "Constraint": 0, "Growth": 1, "Decay": 0, "Light": 1, "Darkness": 0, "Emanation": 1, "Containment": 1, "DivineFlow": 1, "Manifestation": 1, "Concealment": 0}, "fractal_signatures_embedded": ["The Fool", "Judgement", "The Empress", "Temperance"], "unique_symbols": ["wreath", "dancer", "four creatures (Evangelists)", "ribbons", "wand", "globe"], "primary_geometry_type": "Ellipse", "primary_fractal_pattern": "CosmicEgg", "hebrew_letter": "Tau", "gematria_value": 400, "kabbalistic_path_number": 32, "astrological_correspondence": "Planet: Saturn", "astrological_modality": null, "path_from_sephirah": "Yesod", "path_to_sephirah": "Malkuth"}
];

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
  const principles = Object.entries(card.archetypal_principles)
    .filter(([, v]) => v !== 0)
    .map(([k, v]) => {
      const label = v > 0 ? 'Dominant' : 'Shadow';
      const color = v > 0 ? 'text-green-400' : 'text-red-400';
      return `<details class="mb-1"><summary class="cursor-pointer"><strong>${k}:</strong> <span class="${color} font-medium">${label}</span></summary><div class="text-gray-400 pl-4 mt-1">${PRINCIPLE_EXPLANATIONS[k] || ''}</div></details>`;
    })
    .join('');
  return `
  <h2 class="text-2xl mb-4"><span class="font-bold title-font text-xl" style="color:${card.color};">${card.name}</span></h2>
  <p class="text-gray-300 text-sm leading-relaxed mb-4">At its heart, this card embodies the archetype of <strong>${card.core_theme.neutral}</strong>. This manifests as the potential for <strong>${card.core_theme.positive}</strong> when embraced, but can fall into the shadow of <strong>${card.core_theme.negative}</strong>.</p>
  <h3 class="font-bold title-font text-lg text-gray-100 mb-2">Key Archetypal Principles</h3>
  <p class="text-xs text-gray-400 mb-1">Dominant principles appear in <span class="text-green-400">green</span>; shadow influences in <span class="text-red-400">red</span>.</p>
  <div class="text-sm text-gray-300 mb-4 space-y-2">${principles}</div>
  <h3 class="font-bold title-font text-lg text-gray-100 mb-2">Symbolic Language</h3>
  <details class="mb-4"><summary class="cursor-pointer text-gray-300 text-sm leading-relaxed">The card speaks through various motifs.</summary>
    <div class="mt-2 pl-4 space-y-1 text-sm text-gray-300">
      <p><strong>Symbols:</strong> ${card.unique_symbols.join(', ')}</p>
      <p><strong>Geometry:</strong> ${card.primary_geometry_type}</p>
      <p class="text-gray-400">${GEOMETRY_EXPLANATIONS[card.primary_geometry_type] || ''}</p>
      <p><strong>Fractal Pattern:</strong> ${card.primary_fractal_pattern}</p>
      <p class="text-gray-400">${FRACTAL_PATTERN_EXPLANATIONS[card.primary_fractal_pattern] || ''}</p>
      <p><strong>Embedded In:</strong> ${card.fractal_signatures_embedded.join(', ')}</p>
    </div>
  </details>
  <h3 class="font-bold title-font text-lg text-gray-100 mb-2">Esoteric Framework</h3>
  <div class="text-sm text-gray-300 space-y-2">
    <details><summary class="cursor-pointer">Astrological Influence: ${card.astrological_correspondence}</summary><div class="pl-4 mt-1 text-gray-400">${ASTROLOGY_EXPLANATIONS[card.astrological_correspondence] || ''}</div></details>
    <details><summary class="cursor-pointer">Kabbalistic Path ${card.kabbalistic_path_number}</summary><div class="pl-4 mt-1 text-gray-400">From <strong>${card.path_from_sephirah}</strong> to <strong>${card.path_to_sephirah}</strong><br>${SEPHIRAH_EXPLANATIONS[card.path_from_sephirah] || ''} &rarr; ${SEPHIRAH_EXPLANATIONS[card.path_to_sephirah] || ''}</div></details>
    <details><summary class="cursor-pointer">Hebrew Letter: ${card.hebrew_letter} (${card.gematria_value})</summary><div class="pl-4 mt-1 text-gray-400">${HEBREW_LETTER_EXPLANATIONS[card.hebrew_letter] || ''}</div></details>
  </div>
  `;
}
function generateCombinationInterpretation(cards, allLinks) {
  let html = '';
  const header = cards.map(c => `<span class="font-bold title-font text-xl" style="color:${c.color};">${c.name}</span>`).join(' & ');
  html += `<h2 class="text-2xl mb-4">${header}</h2>`;
  const themes = cards.map(c => `<strong>${c.core_theme.neutral}</strong>`).join(' and ');
  html += `<p class="text-gray-300 text-sm leading-relaxed mb-4">This constellation fuses the archetypes of ${themes}, weaving their narratives together.</p>`;
  const combined = {};
  cards.forEach(c => {
    Object.entries(c.archetypal_principles).forEach(([k, v]) => {
      combined[k] = (combined[k] || 0) + v;
    });
  });
  const comboPrinciples = Object.entries(combined)
    .filter(([, v]) => v !== 0)
    .map(([k, v]) => {
      const label = v > 0 ? 'Shared Dominance' : 'Collective Shadow';
      const color = v > 0 ? 'text-green-400' : 'text-red-400';
      return `<details class="mb-1"><summary class="cursor-pointer"><strong>${k}:</strong> <span class="${color} font-medium">${label}</span></summary><div class="text-gray-400 pl-4 mt-1">${PRINCIPLE_EXPLANATIONS[k] || ''}</div></details>`;
    })
    .join('');
  if (comboPrinciples) {
    html += `<h3 class="font-bold title-font text-lg text-gray-100 mb-2">Combined Archetypal Currents</h3>`;
    html += `<p class="text-xs text-gray-400 mb-1">Green indicates mutually reinforcing traits; red shows shared challenges.</p>`;
    html += `<div class="text-sm text-gray-300 mb-4 space-y-2">${comboPrinciples}</div>`;
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
              summary = `A <em>Fractal Embedding</em> reveals how ${c1.name} mirrors patterns within ${c2.name}.`;
              break;
            case 'Symbol Echo':
              summary = `Shared symbols create a mutual resonance.`;
              break;
            case 'Shared Geometry':
              summary = `Both share the geometry of <strong>${c1.primary_geometry_type}</strong>.`;
              break;
            case 'Shared Astrology':
              summary = `Unified under <strong>${c1.astrological_correspondence}</strong>.`;
              break;
            case 'Astrological Opposition':
              summary = `Opposing zodiac signs generate balanced tension.`;
              break;
            case 'Complementary Sephiroth':
              summary = `Their sephiroth paths complete each other.`;
              break;
            case 'Gematria Resonance':
              summary = `Gematria values closely align.`;
              break;
          }
          if (summary) {
            const explain = CONNECTION_EXPLANATIONS[type] || '';
            html += `<li class="p-3 bg-gray-900/50 rounded-md border-l-2 border-purple-400"><details><summary class="cursor-pointer">${summary}</summary><div class="text-gray-400 mt-1 pl-2">${explain}</div></details></li>`;
          }
        });
      }
    }
  }
  html += '</ul>';
  return html;
}
const { nodes, links } = buildGraphData();
assignAndNormalizeWeights(nodes, links);

const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select('#tarot-graph');
const tooltip = d3.select('#tooltip');
const narrativeHub = d3.select('#narrative-hub');
const narrativeTabs = d3.select('#narrative-tabs');
const narrativeContentArea = d3.select('#narrative-content-area');
const backBtn = d3.select('#back-btn');
const resetBtn = d3.select('#reset-btn');

let selectionHistory = [];

const simulation = d3.forceSimulation(nodes)
  .force('link', d3.forceLink(links).id(d=>d.id).strength(0.05).distance(200))
  .force('charge', d3.forceManyBody().strength(-250))
  .force('center', d3.forceCenter(width/2, height/2));

const linkGroup = svg.append('g').attr('class','links');
const nodeGroup = svg.append('g').attr('class','nodes');

let linkSelection = linkGroup.selectAll('line').data(links).join('line')
  .attr('class','link')
  .attr('stroke-width', d => Math.sqrt(d.weight)/2);

let nodeSelection = nodeGroup.selectAll('.node').data(nodes);
const nodeEnter = nodeSelection.enter().append('g')
  .attr('class','node')
  .call(drag(simulation));
nodeEnter.append('circle').attr('r',12);
nodeEnter.append('text').text(d=>d.name).attr('x',16).attr('y',4);
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
  if (selectionHistory.length>1) {
    narrativeContentArea.append('div').attr('id','pane-constellation').attr('class','narrative-pane active')
      .html(generateCombinationInterpretation(selectionHistory, links));
  }
  selectionHistory.forEach(card => {
    narrativeContentArea.append('div').attr('id',`pane-${card.id.replace(/\s+/g,'-')}`)
      .attr('class', `narrative-pane ${selectionHistory.length===1?'active':''}`)
      .html(generateSingleCardInterpretation(card));
  });
  d3.selectAll('.narrative-tab').on('click', function() {
    d3.selectAll('.narrative-tab').classed('active', false);
    d3.selectAll('.narrative-pane').classed('active', false);
    d3.select(this).classed('active', true);
    d3.select('#'+this.dataset.target).classed('active', true);
  });
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
