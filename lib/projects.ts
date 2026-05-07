const F = (id: string) => `https://framerusercontent.com/images/${id}`

export type ProcessSection = {
  title: string
  body: string
  image?: string
  imageCaption?: string
  image2?: string
  imageCaption2?: string
  video?: string
}

export type ReflectionItem = {
  title: string
  body: string
}

export type Project = {
  // Works grid (cards)
  slug: string
  title: string
  subtitle: string
  tags: string[]
  bg: string
  heroImage: string

  // Case study
  h1: string
  subtitleParagraph: string
  year: string
  scope: string
  role: string
  showcaseImages: string[]

  problemSpaceHeading: string
  problemSpace: string

  conceptHeading: string
  concept: string

  processSections: ProcessSection[]

  meetTheWork: string
  finalImages: { src: string; caption: string; isVideo?: boolean }[]

  reflectionHeading: string
  reflection: ReflectionItem[]
  sourceCode?: { url: string; label: string }
  featured?: boolean
  showcaseZoom?: number
  showcaseOrigin?: string
  showcaseObjectFit?: 'cover' | 'contain'
  sectionLabels?: {
    problemSpace?: string
    concept?: string
    process?: string
    finalDesign?: string
    reflection?: string
  }
}

export const projects: Project[] = [
  // ── IMPERMANENCE ────────────────────────────────────────────────────────────
  {
    slug: 'impermanence',
    title: 'Impermanence',
    subtitle: 'A p5.js + Arduino installation that translates light into living memory — where darkness makes things bloom.',
    tags: ['CREATIVE COMPUTING', 'INTERACTIVE INSTALLATION'],
    bg: '#D8DDD8',
    heroImage: F('GMNzAMSCYtZXRzaB7bg0DFxz08.gif'),

    h1: 'A p5.js installation that turns darkness into living memory',
    subtitleParagraph: 'Impermanence is a browser-based installation controlled by an Arduino photoresistor. When the room darkens, coloured particles bloom and pentatonic notes emerge, as if memory is surfacing. When light returns, everything dissolves.',
    year: '2024',
    scope: 'Creative Computing\nInteractive Installation',
    role: 'Solo. Concept, circuit design, p5.js code, and sound system.',
    showcaseImages: [
      F('GMNzAMSCYtZXRzaB7bg0DFxz08.gif'),
    ],

    problemSpaceHeading: 'Memory is not stored. It is performed — and it needs the right conditions.',
    problemSpace: 'We forget not because we choose to, but because the conditions for remembering stop existing. A smell, a song, a sudden quiet — these are triggers, not choices. **Impermanence** builds that logic into hardware: a photoresistor sensor that releases colour and sound only when the room is dark. You cannot force it. You can only remove the light.',

    conceptHeading: 'What if forgetting was just a problem of light?',
    concept: 'An Arduino Uno reads ambient light continuously via a photoresistor voltage divider. When darkness drops below a set threshold, p5.js spawns coloured particles and activates pentatonic oscillators, and the room begins to remember. Sustained darkness triggers memory mode: particles glow brighter and resist decay. When light returns, everything dissolves. The audience does not interact. They inhabit.',

    processSections: [
      {
        title: 'Circuit Design',
        body: 'The circuit uses a photoresistor in a voltage divider configuration wired to analog input A0 on an Arduino Uno. Values stream 0 (total dark) to 1023 (bright) over Web Serial API — no server, no latency. The darkness threshold was set at 300 after testing in the gallery space, where ambient light during opening hours hovered around 450.',
      },
      {
        title: 'Visual System',
        body: 'The visual logic was drawn directly from constellations: nodes of light connected by proximity, not by design. Twelve pastel colours, each assigned a unique pentatonic frequency, map to individual particle types. Particles exhibit emergent flocking behaviour, connecting via proximity-based lines when within 80px of each other. Extended darkness beyond 1.5 seconds triggers memory mode, where particles glow brighter and their decay timer resets. The result is a sky that shifts each time the room goes dark.',
        image: '/constellation.webp',
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ I\'ve always been so fascinated by these sparkles above.',
      },
      {
        title: 'Sound Design',
        body: 'Twelve independent sine wave oscillators run in parallel via p5.sound. Each maps to one colour-particle pair. When a particle spawns, its oscillator briefly activates — **amplitude mapped to darkness intensity**. The result is a generative, non-repeating harmony that grows denser the longer the room stays dark. No loop. No file. Pure synthesis.',
      },
      {
        title: 'Process',
        body: 'The build started with the serial connection: getting the Arduino to talk to the browser reliably was harder than expected. Baud rate, cable quality, and browser permissions all introduced failure points. Once serial was stable, the particle system came together quickly — the flocking logic is simpler than it looks. Sound was the last layer, tuned in the gallery space itself during setup.',
        image: F('TMyHiq1SiK9esypoj7AADxXGQWc.jpg'),
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Gallery setup. Arduino wired to breadboard, running alongside the browser sketch on a laptop.',
      },
    ],

    meetTheWork: 'Impermanence asks one question: what do you remember when the room goes dark? The installation offers no interface, no prompt, and no correct response. It simply responds.',
    finalImages: [
      {
        src: F('GMNzAMSCYtZXRzaB7bg0DFxz08.gif'),
        caption: '°·⸜(｡˃ ᵕ ˂ )⸝ look at them go !!! little particles finding each other in the dark ,,',
      },
    ],

    reflectionHeading: 'What the piece changed about how I think about hardware.',
    reflection: [
      {
        title: 'Web Serial is fragile in ways that matter',
        body: 'Permissions reset between sessions. Cables introduce signal noise. Baud rate mismatches produce silence rather than errors. Building a fallback mode that simulates sensor input from the mouse would make this viable in any gallery context, not just ones where serial works.',
      },
      {
        title: 'The threshold is a design decision, not a calibration',
        body: 'Setting the darkness threshold at 300 was not a technical choice. It was a curatorial one: how dark does the room need to be before memory surfaces? A future version would let the threshold shift across an exhibition\'s run, so the piece becomes harder to trigger as the days progress.',
      },
    ],
    sourceCode: {
      url: 'https://editor.p5js.org/audrey17leo/sketches/_ktpYi75f',
      label: 'View source on p5.js editor',
    },
  },

  // ── MEMORY DISTORTION BOX ───────────────────────────────────────────────────
  {
    slug: 'memory-distortion-box',
    title: 'Memory Distortion Box',
    subtitle: 'A sensor-driven sound installation that treats grief as data, retrieved only in darkness, never on demand.',
    tags: ['INSTALLATION', 'SOUND ART'],
    bg: '#1a1a2e',
    heroImage: '/memory-distortion-box-cover.png',

    h1: 'A sensor-driven sound installation that treats grief as a retrieval problem',
    subtitleParagraph: 'Also titled Random Access Grief, the Memory Distortion Box is a sealed, featureless object built around an Arduino Uno, a photoresistor voltage divider on analog pin A0, and a three-channel Pure Data patch communicating over serial at 9600 baud. The 10-bit ADC reading maps ambient light to playback speed, pitch shift, and reverb depth in real time. When the room darkens past the threshold, the audio begins: slowing, distorting, reversing. When light returns, silence.',
    year: '2024',
    scope: 'Sound Installation\nPhysical Fabrication\nCircuit Design\nDSP Programming',
    role: 'Solo. Concept, CAD modelling, laser-cut fabrication, circuit design, and Pure Data DSP programming.',
    showcaseImages: [
      '/memory-distortion-box-cover.png',
    ],

    problemSpaceHeading: "Grief doesn't arrive when you call it. It arrives when the room gets quiet.",
    problemSpace: 'The Memory Distortion Box encodes interaction into the physics of the circuit. The photoresistor on A0 is the only input: no buttons, no screen, no UI. Ambient light keeps the analog read value high and the audio silent. Darkness drops the reading below the threshold (empirically set at 300 out of 1023) and triggers playback. The only way to hear the piece is to physically block the sensor with your hand and wait, which enforces a slowness that most digital experiences do not.',

    conceptHeading: 'Emotional memory as data corruption. Loss as hardware failure.',
    concept: 'Three audio channels run concurrently in a Pure Data patch, each receiving the same normalised sensor value (0.0 to 1.0) but processing it through different DSP chains. Channel 1 uses [speed~] on a voice recording: playback rate drops linearly with light level and reverses below 0.3. Channel 2 passes a drone oscillator through [pitch~], dropping by up to a tritone in total darkness. Channel 3 drives a granular texture via grain size and density parameters, becoming denser as light falls. The three channels are summed but never tempo-synced, producing a composition that shifts irreproducibly each time the threshold is crossed.',

    processSections: [
      {
        title: 'Enclosure',
        body: 'The enclosure was designed in AutoCAD as a 180×120×80mm box with finger-joint edges and kerf compensation set to 0.2mm for the laser cutter. Material: 6mm black MDF, cut on a CO2 laser, assembled with wood glue and internal 3D-printed PLA corner brackets for rigidity. The front face has a 6mm circular aperture for the photoresistor, no label, no indicator LED, no visible seam. The Arduino and breadboard sit on a laser-cut internal shelf; all wiring is routed flush to avoid rattle. The object is deliberately archival in appearance: it should read as a found object, not a prototype.',
        image: '/3dmodel.png',
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ 3D model. AutoCAD enclosure design before fabrication.',
      },
      {
        title: 'Circuit and Sensor Logic',
        body: 'The sensor circuit is a standard photoresistor voltage divider: a 10kΩ fixed resistor and an LDR in series between 5V and GND, with the midpoint read on Arduino analog pin A0. The Arduino\'s 10-bit ADC returns values from 0 (dark) to 1023 (bright). These values are sent over serial at 9600 baud as a single integer per loop iteration. The Pure Data patch receives via [comport] and normalises the reading to a 0.0–1.0 float using [/ 1023]. The threshold (300) was determined empirically during calibration: it corresponds to the ambient light level of a dim gallery room with no directed light on the sensor.',
        image: '/tinkercad-schematic.png',
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Schematic made on Tinkercad.',
      },
      {
        title: 'Audio System',
        body: 'The Pure Data patch runs three independent DSP chains fed by the same normalised sensor value. Voice channel: a pre-recorded field recording loaded into [readsf~], routed through a [vd~] variable delay line to simulate speed change. Below a normalised value of 0.3, playback direction inverts via buffer scrubbing. Drone channel: a [osc~] sine oscillator detuned in real time using the sensor value mapped to a pitch range of one tritone (six semitones), processed through a [freeverb~] reverb unit with wet depth also sensor-driven. Granular channel: a custom granular abstraction controls grain size (30 to 300ms), density (1 to 12 grains/sec), and scatter, all inverse-mapped to light level. The three channels sum to a stereo [dac~] output. No tempo sync between channels: the composition is structurally non-repeating.',
        image: '/puredata.png',
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Pure Data patch. Three-channel DSP system with sensor-mapped parameters.',
      },
    ],

    meetTheWork: 'Random Access Grief. A box that remembers on its own terms: only in the dark, never twice the same way.',
    finalImages: [
      {
        src: F('dxTiqEF1kzI84WXVQxeFdo9YvgA.jpg'),
        caption: '°·⸜(｡˃ ᵕ ˂ )⸝ Finished Piece.',
      },
      {
        src: F('LcHld9m2pHmj4Yprv3J6BtyH0BM.jpg'),
        caption: '°·⸜(｡˃ ᵕ ˂ )⸝ Other tinkers we did, lasercut and soldering.',
      },
    ],

    reflectionHeading: 'What the audience taught me that the design process did not.',
    reflection: [
      {
        title: 'The hand was the right interface all along',
        body: 'Visitors consistently covered the aperture with their palm rather than reducing ambient room light. This collapsed the interaction distance from room-scale to body-scale, which changed what the piece communicated. A v2 would formalise this: replace the LDR with a proximity or capacitive touch sensor recessed into a palm-sized indent, giving the hand a designated place and making the gesture legible without instruction. The circuit change is minimal; the interaction design implication is significant.',
      },
      {
        title: 'Modular patch design is a production requirement, not a preference',
        body: 'The PD patch grew organically during development and became difficult to debug under exhibition conditions. A single misrouted connection could silence all three channels with no obvious visual indicator. A v2 would restructure into named subpatches ([voice-channel], [drone-channel], [granular-channel]) with isolated test modes, a [loadbang]-driven calibration routine, and error state indicators using [print] to console. Maintainability in live installation contexts is a design constraint, not an afterthought.',
      },
    ],
  },

  // ── PLASTIC PANIC ────────────────────────────────────────────────────────────
  {
    slug: 'plastic-panic',
    title: 'Plastic Panic',
    subtitle: 'A 2D pixel game built in Godot where ocean debris density scales with survival time. Education through systems, not lectures.',
    tags: ['GAME DESIGN', 'C++', 'PIXEL ART', 'ORIGINAL MUSIC'],
    bg: '#134E5E',
    heroImage: F('v6vBj0wRDyoQcOvYUg0KCOKBwSg.jpg'),

    h1: 'A pixel game that makes ocean pollution feel urgent before you have time to think',
    subtitleParagraph: 'Plastic Panic is a 2D pixel game built in Godot using GDScript. The player controls a sea turtle navigating a procedurally spawning debris field; spawn rate scales with elapsed survival time. Collision applies a progressive speed penalty until movement stops. The mechanic is deliberately simple: the weight comes from what the turtle represents, not from system complexity.',
    year: '2024',
    scope: 'Game Design\nCreative Technology',
    role: 'Solo. Visual design, Godot/C++ programming, sprite animation, and original music composition in Strudel.',
    showcaseImages: [
      F('v6vBj0wRDyoQcOvYUg0KCOKBwSg.jpg'),
    ],

    problemSpaceHeading: 'Environmental education fails when it lectures. It works when it makes you feel something first.',
    problemSpace: 'A beach cleanup in Bali made the scale of the problem concrete: plastic being collected was immediately replaced by new plastic washing in from the tide. The cleanup felt futile in a way that was clarifying. The problem is not littering; it is throughput. Plastic Panic communicates that through repetition: trash keeps spawning, spawn rate keeps climbing, and the player has to keep moving.',

    conceptHeading: 'The mechanic is simple. The weight comes from what the turtle represents.',
    concept: 'A sea turtle navigates an ocean filling with debris. Spawn rate accelerates over elapsed time; there is no winning state, only a longer survival interval. Collision triggers a progressive movement speed reduction until the entity reaches zero velocity. No explosion, no game-over fanfare. The system is designed to feel futile just before it terminates.',

    processSections: [
      {
        title: 'Sprite Design',
        body: 'All assets were drawn in Procreate at 32x32px: the turtle, three trash variants (plastic bag, bottle, wrapper), and tiling ocean background. The 32x32 constraint enforced legibility at runtime scale with no room for surface detail. Character and object designs were kept visually distinct to ensure immediate readability at high debris density.',
        image: F('jEDXcktxbk4MdNruBhFeZou94c.jpg'),
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Sprite sheet. Characters and trash objects drawn at 32x32px in Procreate.',
      },
      {
        title: 'Animation',
        body: 'The turtle swim cycle is four frames: neutral, left-stroke, glide, right-stroke, running at 8fps. The low frame rate reinforces the underwater physics feel and distinguishes the character from surface-speed game conventions. Trash objects use a per-instance randomised drift vector to simulate ocean current; no two objects move identically, preventing the scene from reading as static.',
        image: F('rJx8qOAaKbF54gKAS46arHJseU.gif'),
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Animation frames. Turtle movement cycle, four-frame loop at 8fps.',
      },
      {
        title: 'Gameplay Mechanics',
        body: 'Built in Godot using C++. Movement uses a momentum model: the turtle continues moving after input is released, making avoidance feel physical rather than cursor-like. Trash objects spawn from the right edge at randomised heights and speeds scaled to elapsed survival time. Collision detection uses Godot\'s built-in Area2D nodes. Score increments per second survived. No threshold, no congratulations screen.',
      },
      {
        title: 'Sound',
        body: 'The soundtrack was composed in Strudel, a live-coding environment for generative music. A pentatonic melody runs over an ocean-ambient drone. Tempo is directly coupled to the trash spawn rate: as the spawn interval decreases, BPM increases proportionally. Tension escalates in the audio before the player consciously registers it in the game state.',
      },
    ],

    meetTheWork: 'Plastic Panic. A game about surviving something that does not stop.',
    finalImages: [
      {
        src: '/plasticpanic.mov',
        caption: '°·⸜(｡˃ ᵕ ˂ )⸝ Gameplay. Debris density increases over time. There is no winning state.',
        isVideo: true,
      },
    ],

    reflectionHeading: 'What coding the mechanics taught me about what things mean.',
    reflection: [
      {
        title: 'Momentum is a design decision, not a feature',
        body: 'Movement tuning took more iteration than any other mechanic. Too much momentum and the game becomes uncontrollable; too little and it reads like a cursor. The turtle needs to feel alive, which required more precision in the physics parameters than expected.',
      },
      {
        title: 'The score is the message',
        body: 'Survival time as the score metric communicates one thing: you can last, but not forever. A v2 would convert elapsed time to a real-world data point at the game-over screen. "You lasted 47 seconds. That\'s how long it takes 8 million plastic bottles to enter the ocean."',
      },
    ],
  },

  // ── REDESIGNED AIR PURIFIER ──────────────────────────────────────────────────
  {
    slug: 'cr-purifier',
    title: 'Redesigned Air Purifier',
    subtitle: 'Compact air purifier redesigned for small-space living. Corner-mounted, tool-free, under £40.',
    tags: ['PRODUCT DESIGN', 'FABRICATION', 'MARKETING'],
    bg: '#D6D0C8',
    heroImage: '/cr-purifier-render-nobg.png',

    h1: 'A compact air purifier redesigned for the spaces people actually live in',
    subtitleParagraph: 'Most air purifiers need 50cm of floor space. This one fits in a corner — two MERV-13 filters in an L-shape, no tools needed, under £40 from a hardware store.',
    year: '2023',
    scope: 'Product Design\nFabrication\nBuild Documentation',
    role: 'Solo. User research, mechanical design, physical prototyping, laser cutting, and go-to-market documentation.',
    showcaseImages: [
      '/cr-purifier-render-nobg.png',
    ],

    problemSpaceHeading: 'The most effective air purifier format is too big for the rooms where air quality matters most.',
    problemSpace: 'The standard four-filter square configuration requires a 50×50cm footprint and projects into the room on all sides. For the average UK student bedroom (under 10sqm) or shared flat, this is a non-starter. The filter-to-fan ratio on that design is well-established: four 20×20-inch MERV-13 faces to a single box fan. The design challenge was reducing that footprint without gutting the filtration logic. The constraint: no specialist tools, no custom components, no ordering online.',

    conceptHeading: 'Same filtration logic. Forty percent smaller footprint. No tools required.',
    concept: 'Two MERV-13 filters are arranged in an L-configuration rather than a square, reducing the footprint from four filter faces to two. The unit sits in a corner: the two adjacent walls act as passive airflow guides, directing intake air toward both filter faces and partially compensating for the reduced filtration area. CADR (Clean Air Delivery Rate) drops relative to the four-filter format but remains above the threshold for rooms under 20sqm. The fan sits on top facing up, pulling air through both filter faces simultaneously. Build time is under 20 minutes. The instruction set fits on one side of A5.',

    processSections: [
      {
        title: 'Research and Geometry Testing',
        body: 'The first stage was working out whether corner placement could genuinely substitute for the missing filter faces. Two-filter L-configurations reduce total filter area by 50%, which under normal conditions halves CADR. Corner deployment partially recovers this by redirecting ambient airflow: at 90-degree wall junctions, air pressure from room circulation is guided toward both filter faces rather than dissipating. I tested three room configurations to check whether this effect was consistent across different wall materials and room sizes. It was consistent enough to proceed. The design locked in: two filters, corner-only placement, fan on top.',
        image: F('Lg89TpGFsjWu5n4clXjJo1drbM.jpg'),
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Sketches to visualize.',
      },
      {
        title: 'Prototyping',
        body: 'First build used two MERV-13 20×20-inch filters, a 20-inch box fan, and duct tape at the join. Functional but not structurally sound for repeated assembly. I moved the join to a laser-cut 6mm MDF bracket, designed with a friction-fit tongue-and-groove that holds both filter faces at exactly 90 degrees without adhesive. The bracket is flat-pack: ships in an envelope, assembles in under two minutes. No tools. No glue.',
        image: F('kuIEK27hBhGsWgpYo9EZzXK2QHM.jpg'),
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Sketches to visualize.',
      },
      {
        title: 'Material Specification',
        body: 'Full bill of materials: two MERV-13 20×20-inch filters (£12–16 each), one 20-inch box fan (£18–24), one laser-cut MDF bracket (£2–4 if self-cut, designed for 6mm sheet with 0.2mm kerf compensation). Total: £32–44 depending on sourcing. All components are stocked at B&Q, Screwfix, or equivalent. The bracket file is designed for a standard 600×400mm laser bed. Assembly requires no tools. Disassembly is full and reversible.',
        image: F('erRmJeaSNj01D1SZLrJ8Y5TXl2E.jpg'),
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Prototype A. Laser-cut MDF bracket replacing duct tape. Friction-fit, no adhesive.',
      },
    ],

    meetTheWork: 'Compact. Corner-deployed. Under 20 minutes to build. No tools. Under £40.',
    finalImages: [
      {
        src: '/FRONT PURIFIER.jpg',
        caption: '',
      },
      {
        src: F('dqQB5hZNeH5HPAkMfd0M7A5K9I.jpg'),
        caption: '°·⸜(｡˃ ᵕ ˂ )⸝ Final piece.',
      },
    ],

    reflectionHeading: 'What I would do differently.',
    reflection: [
      {
        title: 'The instructions needed more work than the object',
        body: 'I spent most of the project on the physical design. But when I tested it with people who had never built anything before, the object itself was fine. The instructions weren\'t. "Friction-fit joint" means nothing if you\'ve never assembled flat-pack before. A v2 would photograph every step at 1:1 scale, no text, and run it past someone who\'d never seen the product.',
      },
      {
        title: 'The CADR claim needs a particle counter',
        body: 'The corner-placement airflow guidance argument is geometrically sound and consistent in informal testing across three room configurations. But "consistent in informal testing" is not a measured CADR figure. A rigorous v2 would run the unit against a calibrated particle counter in a sealed room and publish the numbers. Until then, the efficiency claim is directionally correct but not independently verified.',
      },
    ],
  },

  // ── VICHY RE:GEN ─────────────────────────────────────────────────────────────
  {
    slug: 'vichy-regen',
    title: 're:GEN',
    subtitle: 'A skincare education strategy that turns beauty advisors into genuine supplement advocates. Event design, LMS modules, and objection-handling for a new product category.',
    tags: ['MARKETING STRATEGY', 'EDUCATION DESIGN'],
    bg: '#3D0808',
    heroImage: '/vichy-hero.png',

    h1: "A strategy to close the knowledge, trust, and infrastructure gaps for Vichy's first supplement in 90 years",
    subtitleParagraph: "re:GEN is a speculative education strategy for the launch of VICHY Liftactiv Collagen Supplements, the brand's first ingestible product in nine decades. The brief: convert beauty advisors across key UK retail partners into confident supplement advocates, in a single morning.",
    year: '2025',
    scope: 'Marketing Strategy\nEducation Design\nEvent Design',
    role: 'Solo. Strategy, concept development, event design, and LMS module design. Interfaces prototyped in Figma Make and Nano Banana Pro.',
    showcaseImages: ['/vichy-hero.png'],
    showcaseObjectFit: 'cover',
    featured: true,

    problemSpaceHeading: 'Three gaps. One launch window. Zero existing infrastructure.',
    problemSpace: "Vichy's first supplement launch in 90 years arrived without the infrastructure to sell it. Skincare advisors had never sold an ingestible: no language for absorption, no confidence around ingredients, no category reference. Nearly half of consumers are sceptical of beauty supplements, and doubt is contagious when the advisor can't neutralise it. The deeper problem was structural: **Vichy's Pharma Academy was built for pharmacy professionals, not the retail network**, and no training for ingestible beauty existed in the UK market. The brief required building knowledge without overwhelming, trust without overclaiming, and reaching advisors the current infrastructure couldn't.",

    conceptHeading: 're:GEN. Feel the Gen.',
    concept: "A one-morning experience built on one insight: a fact told is forgotten, a fact felt is kept. re:GEN structures three outcomes (Educate, Equip, Advocate) across a 3-hour event with pre- and post-event digital learning. Two sessions, 40-50 advisors each. Location: a wellness studio, not a conference room, because environment primes behaviour.",

    processSections: [
      {
        title: 'The Gen Bowl',
        body: 'Advisors arrive to a styled yogurt bowl: orange slices, almonds, pumpkin seeds, dark chocolate. Each ingredient maps directly to an active in the supplement: Vitamin C (80mg), Vitamin E (15mg), Zinc (5mg), Copper (150µg). The food IS the lesson. Embodied learning encodes facts differently: when you taste an ingredient, it becomes a reference point, not a number.',
        image: '/vichy-gen-bowl.jpg',
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Each quadrant of the bowl maps to one active in the pill.',
      },
      {
        title: 'Building Confidence at the Counter',
        body: '**Dermatologist Q&A**: anonymous question cards, answered live in plain language. Only a clinician can address safety concerns with authority. **The Sell Station**: advisors role-play as customer types for 90 seconds each, practising key selling points until the language feels natural, not rehearsed. **Leave Feeling the GEN**: every advisor receives the GENesis Lite Kit: a 7-day supplement supply, serum sample, and script card. The education continues every morning they take the capsule.',
        image: '/vichy-journey.jpg',
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Confidence stations 02–04: dermatologist Q&A, sell station, take-home kit.',
      },
      {
        title: "Online Learning: Let's GENup!",
        body: "**Pre-event LMS module. 5 minutes. Phone-completable.** Sent one week before, covering Product Heritage and Science, the Components, and a Recap Quiz. True/False questions are used deliberately: active recall improves retention more than passive reading. Completion tracked via LMS report. Interface designed in Figma Make and Nano Banana Pro to meet advisors where they already are.",
        image: '/vichy-lms1.jpg',
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Sample LMS UI — quiz section with instant incorrect-answer feedback.',
      },
      {
        title: 'Online Learning: Handle It the GENius Way!',
        body: '**Post-event video series. Three 90-second peer-filmed videos, weekly.** Each tackles a real counter objection: "I\'ve tried collagen before," "Why a pill over a serum?", "How long until results?" Peer-filmed by design: credibility is built by relatability, not authority. Key vocabulary highlighted on-screen. Community channel for real-time sharing. All videos captioned.',
        image: '/vichy-lms2.jpg',
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Handle It series — mobile LMS UI and objection-handling video format.',
      },
    ],

    meetTheWork: 're:GEN closes three gaps (knowledge, trust, infrastructure) in one morning. Every advisor leaves with a script in their head and a capsule in their bag.',
    finalImages: [
      {
        src: '/vichy-regen-logo.jpg',
        caption: '°·⸜(｡˃ ᵕ ˂ )⸝ re:GEN. The programme identity.',
      },
      {
        src: '/vichy-thankyou.jpg',
        caption: '°·⸜(｡˃ ᵕ ˂ )⸝ VICHY Liftactiv Collagen Supplement. 10 years in the making.',
      },
    ],

    reflectionHeading: 'What this taught me about designing for behaviour change, not just knowledge transfer.',
    reflection: [
      {
        title: 'Constraint was a creative brief in disguise',
        body: "Working within tight parameters forced a clearer answer to the same question at every turn: what actually changes someone's behaviour? The Gen Bowl exists because it was more memorable than a lecture and more immersive than a slide deck. Constraint collapsed the distance between insight and execution.",
      },
      {
        title: 'Peer-filmed content closes the credibility gap faster than brand-produced content',
        body: "The Handle It series is peer-filmed deliberately. An advisor watching a brand-produced objection-handling video knows they're being managed. Watching a colleague do it naturalistically removes that distance. For v2, I'd A/B test peer-filmed versus brand-produced format on the same objection, measuring retention and confidence at the counter rather than just completion rates.",
      },
    ],

    sectionLabels: {
      problemSpace: 'THE BRIEF',
      concept: 'THE STRATEGY',
      process: 'THE EXPERIENCE',
      finalDesign: 'THE DELIVERABLE',
      reflection: 'WHAT I LEARNED',
    },
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getNextProject(slug: string): Project | undefined {
  const idx = projects.findIndex(p => p.slug === slug)
  if (idx === -1) return undefined
  return projects[(idx + 1) % projects.length]
}
