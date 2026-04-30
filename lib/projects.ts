const F = (id: string) => `https://framerusercontent.com/images/${id}`

export type ProcessSection = {
  title: string
  body: string
  image?: string
  imageCaption?: string
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
    subtitleParagraph: 'Impermanence is a browser-based installation controlled by an Arduino photoresistor. When the room darkens, coloured particles bloom and pentatonic notes emerge — as if memory is surfacing. When light returns, everything dissolves. No button. No interface. Just a room and whatever you bring into it.',
    year: '2024',
    scope: 'Creative Computing\nInteractive Installation',
    role: 'Solo. Concept, circuit design, p5.js code, and sound system.',
    showcaseImages: [
      F('GMNzAMSCYtZXRzaB7bg0DFxz08.gif'),
      F('TMyHiq1SiK9esypoj7AADxXGQWc.jpg'),
    ],

    problemSpaceHeading: 'Memory is not stored. It is performed — and it needs the right conditions.',
    problemSpace: 'We forget not because we choose to, but because the conditions for remembering stop existing. A smell, a song, a sudden quiet — these are triggers, not choices. **Impermanence** builds that logic into hardware: a photoresistor sensor that releases colour and sound only when the room is dark. You cannot force it. You can only remove the light.',

    conceptHeading: 'What if forgetting was just a problem of light?',
    concept: 'An Arduino Uno reads ambient light continuously via a photoresistor voltage divider. When darkness drops below a set threshold, p5.js spawns coloured particles and activates pentatonic oscillators — the room begins to remember. Sustained darkness triggers memory mode: particles glow brighter and resist decay. When light returns, everything dissolves. The audience does not interact. They inhabit.',

    processSections: [
      {
        title: 'Circuit Design',
        body: 'The circuit uses a photoresistor in a voltage divider configuration wired to analog input A0 on an Arduino Uno. Values stream 0 (total dark) to 1023 (bright) over Web Serial API — no server, no latency. The darkness threshold was set at 300 after testing in the gallery space, where ambient light during opening hours hovered around 450.',
      },
      {
        title: 'Visual System',
        body: 'Twelve pastel colours, each assigned a unique pentatonic frequency, map to individual particle types. Particles exhibit emergent flocking behaviour — connecting via proximity-based lines when within 80px of each other. Extended darkness beyond 1.5 seconds triggers memory mode, where particles glow brighter and their decay timer resets.',
        image: F('GMNzAMSCYtZXRzaB7bg0DFxz08.gif'),
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Live capture. Particle system responding to darkness. Each colour corresponds to a unique frequency.',
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
        caption: '°·⸜(｡˃ ᵕ ˂ )⸝ Live installation, UCL Slade 2024. Particle density increases with darkness duration.',
      },
    ],

    reflectionHeading: 'What the piece changed about how I think about hardware.',
    reflection: [
      {
        title: 'Web Serial is fragile in ways that matter',
        body: 'Permissions reset between sessions. Cables introduce signal noise. Baud rate mismatches produce silence rather than errors. Building a fallback mode that simulates sensor input from the mouse would make this viable in any gallery context — not just ones where serial works.',
      },
      {
        title: 'The threshold is a design decision, not a calibration',
        body: 'Setting the darkness threshold at 300 was not a technical choice — it was a curatorial one: how dark does the room need to be before memory surfaces? A future version would let the threshold shift across an exhibition\'s run, so the piece becomes harder to trigger as the days progress.',
      },
    ],
  },

  // ── MEMORY DISTORTION BOX ───────────────────────────────────────────────────
  {
    slug: 'memory-distortion-box',
    title: 'Memory Distortion Box',
    subtitle: 'A sensor-driven sound installation that treats grief as data — retrieved only in darkness, never on demand.',
    tags: ['INSTALLATION', 'SOUND ART'],
    bg: '#1a1a2e',
    heroImage: '/memory-distortion-box-cover.png',

    h1: 'A sensor-driven sound installation that treats grief as a retrieval problem',
    subtitleParagraph: 'Also titled Random Access Grief, the Memory Distortion Box is a sealed object with no visible controls. It contains a photoresistor, an Arduino, and three layered audio channels run through Pure Data. When the room darkens, the audio begins — slowing, distorting, reversing. When light returns, silence. You cannot ask it anything. You can only wait.',
    year: '2024',
    scope: 'Sound Installation\nPhysical Fabrication',
    role: 'Solo. Concept, enclosure fabrication, circuit design, and Pure Data audio programming.',
    showcaseImages: [
      '/memory-distortion-box-cover.png',
    ],

    problemSpaceHeading: "Grief doesn't arrive when you call it. It arrives when the room gets quiet.",
    problemSpace: 'The Memory Distortion Box builds emotional logic into hardware. There is no interface, no button, no screen. **A photoresistor sensor is the only input.** The only way to hear the piece is to make the room dark — which means slowing down, covering the aperture with your hand, and waiting. The piece enforces a posture that most digital grief objects do not.',

    conceptHeading: 'Emotional memory as data corruption. Loss as hardware failure.',
    concept: 'The work draws from Nina Lykke on vibrant death, Audrey Samson on digital funerals, and Mary Shelley\'s Frankenstein — grief as system process, loss as data corruption. Three audio channels run in parallel: a recorded voice fragment, a synthesised drone, and a granular texture layer. Each responds to the sensor differently — the voice slows and reverses; the drone drops in pitch; the texture density increases. The three layers never fully sync, producing an always-shifting composition that cannot be heard the same way twice.',

    processSections: [
      {
        title: 'Enclosure',
        body: 'The physical box was modelled in AutoCAD, laser-cut from black MDF, and assembled with 3D-printed corner brackets. The design is deliberately **featureless**: no visible electronics, no indicator lights, no label. The object should read as an archive, not a gadget. The photoresistor sits behind a small aperture on the front face — barely visible until you look for it.',
        image: F('dxTiqEF1kzI84WXVQxeFdo9YvgA.jpg'),
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Finished enclosure. Laser-cut MDF. The photoresistor aperture sits on the front face.',
      },
      {
        title: 'Circuit and Sensor Logic',
        body: 'An Arduino Uno with a photoresistor voltage divider sends light values over serial to Pure Data. The PD patch maps these values to playback speed, pitch, and reverb depth — darker room means slower, lower, more distorted audio. The mapping curves are exponential, not linear: small changes near the threshold produce dramatic shifts in sound.',
        image: F('jcWnNh2XQzANhtazhUAFduc3YI.jpg'),
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Arduino circuit. Photoresistor voltage divider wired to analog input A0.',
      },
      {
        title: 'Audio System',
        body: 'Three audio layers run in parallel in Pure Data. The voice fragment — a field recording of a conversation — slows below intelligibility and eventually reverses. The drone pitch follows the sensor: darkest room, lowest note. The granular texture layer increases in density, filling the silences the other layers leave. The three channels are mixed but never synced.',
        image: F('2Gbc2EgI0DuORbWIKq993qZw.jpg'),
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Pure Data patch. Three-channel audio system with sensor-mapped parameters.',
      },
    ],

    meetTheWork: 'Random Access Grief. A box that remembers on its own terms — only in the dark, never twice the same way.',
    finalImages: [
      {
        src: F('LIDJaHcpCu72wmbIeF8IQtDo8.jpg'),
        caption: '°·⸜(｡˃ ᵕ ˂ )⸝ Installation view. Memory Distortion Box in the UCL Slade gallery, 2024.',
      },
      {
        src: F('LcHld9m2pHmj4Yprv3J6BtyH0BM.jpg'),
        caption: '°·⸜(｡˃ ᵕ ˂ )⸝ Detail. Visitors instinctively covered the sensor with their hand.',
      },
    ],

    reflectionHeading: 'What the audience taught me that the design process did not.',
    reflection: [
      {
        title: 'The hand was the right interface all along',
        body: 'Visitors consistently placed their hand over the aperture rather than blocking ambient light from a distance. That intimate gesture changed what the piece meant. A v2 would design for that: a sensor recessed into a palm-sized indent that invites the hand as the primary interaction.',
      },
      {
        title: 'Complexity in Pure Data is a maintenance problem',
        body: 'The patch became complex enough that debugging during the exhibition was genuinely risky. A modular rebuild — clearly named subpatches, a calibration mode accessible without a laptop — would make this viable for a longer run or an unattended installation.',
      },
    ],
  },

  // ── PLASTIC PANIC ────────────────────────────────────────────────────────────
  {
    slug: 'plastic-panic',
    title: 'Plastic Panic',
    subtitle: 'A 2D pixel game where you guide a sea turtle through ocean debris — education disguised as play.',
    tags: ['GAME DESIGN', 'C++', 'PIXEL ART', 'ORIGINAL MUSIC'],
    bg: '#134E5E',
    heroImage: F('v6vBj0wRDyoQcOvYUg0KCOKBwSg.jpg'),

    h1: 'A pixel game that makes ocean pollution feel urgent before you have time to think',
    subtitleParagraph: 'Plastic Panic is a 2D pixel game built in Godot where the player controls a sea turtle navigating an ocean filling with trash. Points reward survival. Failure means watching the turtle slow, then stop. The mechanic is simple by design — the emotional weight comes from what the turtle represents, not from game complexity.',
    year: '2024',
    scope: 'Game Design\nCreative Technology',
    role: 'Solo. Visual design, Godot/C++ programming, sprite animation, and original music composition in Strudel.',
    showcaseImages: [
      F('v6vBj0wRDyoQcOvYUg0KCOKBwSg.jpg'),
    ],

    problemSpaceHeading: 'Environmental education fails when it lectures. It works when it makes you feel something first.',
    problemSpace: 'Kids in Bali are on their phones while the beaches around them fill with plastic. A beach cleanup I attended made this visceral: the plastic being collected was immediately replaced by new plastic washing in from the tide. **The cleanup felt futile in a way that was clarifying.** The problem is not littering — it is scale. Plastic Panic tries to communicate that scale through repetition: trash keeps coming, and the player has to keep moving.',

    conceptHeading: 'The mechanic is simple. The weight comes from what the turtle represents.',
    concept: 'A sea turtle navigates an ocean filling with trash. The spawn rate accelerates over time — there is no winning, only surviving longer. Collision means the turtle slows, then stops. No explosion. No drama. Just stillness. The game is designed to feel futile just before it ends, which is the point.',

    processSections: [
      {
        title: 'Sprite Design',
        body: 'All assets were drawn in Procreate at **32×32px** — the turtle, three trash variants (plastic bag, bottle, wrapper), and the ocean background tiles. Keeping everything at 32×32 was a constraint that forced visual clarity: every object had to read immediately, with no room for detail. The turtle needed to feel alive. The trash needed to feel wrong in the same space.',
        image: F('jEDXcktxbk4MdNruBhFeZou94c.jpg'),
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Pixel Art Sprite Sheet. Characters and trash objects drawn at 32×32px in Procreate.',
      },
      {
        title: 'Animation',
        body: 'The turtle swim cycle is four frames: neutral, left-stroke, glide, right-stroke. The cycle runs at 8fps to match the underwater feel — **slower than most game animations**. The trash objects have a slow drift to simulate ocean current. The drift direction varies slightly per object so the ocean never looks static.',
        image: F('rJx8qOAaKbF54gKAS46arHJseU.gif'),
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Animation Frames. Turtle movement cycle, four-frame loop at 8fps.',
      },
      {
        title: 'Gameplay Mechanics',
        body: 'Built in Godot using C++. The turtle moves with momentum — it keeps moving after the key is released, which makes avoidance feel physical. Trash objects spawn from the right edge at randomised heights and speeds that increase over time. Collision detection uses Godot\'s built-in Area2D nodes. Score increments every second of survival. There is no score threshold. No end screen congratulations. Just a number and the ocean.',
      },
      {
        title: 'Sound',
        body: 'The soundtrack was composed in Strudel — a live-coding environment for generative music. The melody uses a pentatonic scale over an ocean-ambient drone. **The tempo increases with the trash spawn rate**, so the music and the tension rise together without any explicit trigger. As the game becomes harder, the music becomes more urgent. The player feels it before they notice it.',
      },
    ],

    meetTheWork: 'Plastic Panic. A game about surviving something that does not stop.',
    finalImages: [
      {
        src: F('X5bXg2as57rJNkntyg32Ks7VY.mp4'),
        caption: '°·⸜(｡˃ ᵕ ˂ )⸝ Gameplay. Trash density increases over time. There is no winning.',
        isVideo: true,
      },
      {
        src: F('BxnQlUIzd8upbeqjusD9JCf3QhY.jpg'),
        caption: '°·⸜(｡˃ ᵕ ˂ )⸝ Game Over Screen. No explosion. No drama. Just the turtle, stopped.',
      },
    ],

    reflectionHeading: 'What coding the mechanics taught me about what things mean.',
    reflection: [
      {
        title: 'Momentum is a design decision, not a feature',
        body: 'Too much and the game feels uncontrollable. Too little and it feels sterile. I spent more time tuning movement feel than on any other mechanic — and it was the right call. How a character moves changes what it represents. The turtle needs to feel like something alive, not a cursor.',
      },
      {
        title: 'The score is the message',
        body: 'Survival time as a score metric means the game communicates one thing: you can last, but not forever. A v2 would translate the survival time into a real-world statistic at the game-over screen — not as a reward, but as a fact. "You lasted 47 seconds. That\'s how long it takes 8 million plastic bottles to enter the ocean."',
      },
    ],
  },

  // ── BATIK ────────────────────────────────────────────────────────────────────
  {
    slug: 'batik',
    title: 'ACS Jakarta Batik',
    subtitle: 'A hand-crafted batik pattern selected from 800+ submissions — now the official uniform for ACS Jakarta.',
    tags: ['ILLUSTRATION', 'CULTURAL DESIGN', 'TEXTILE'],
    bg: '#C4956A',
    heroImage: F('uSZYqdffpgEPmgXRujB1GtCrIPc.png'),

    h1: 'Designing a school uniform from the meaning up, not the pattern down',
    subtitleParagraph: 'The brief was to design a batik uniform for ACS Jakarta. The real challenge was: how do you make something 1,500 students wear every week feel like it means something? The answer was to start with what batik actually is — a visual encoding system — rather than with what it looks like.',
    year: '2023',
    scope: 'Illustration\nCultural Design\nTextile',
    role: 'Solo. Cultural research, pattern composition, colour development, and fabric specification.',
    showcaseImages: [
      F('K4gwJNWnGHo2ZqY3m1oMm03AXI.jpg'),
      F('NOXLUfLL0wVijF7S7mkCGnNxL4.jpg'),
    ],

    problemSpaceHeading: 'A uniform worn every day should mean something. Most do not, because nobody started with meaning.',
    problemSpace: 'School uniforms are worn without thought. They become invisible. The brief asked for a batik uniform — but batik is not a style. It is a form of **visual encoding**, where every motif carries a documented meaning. Designing one without understanding that encoding would produce something that looked like batik, without being it. That distinction mattered to me before I drew a line.',

    conceptHeading: 'Batik is a visual encoding system. That is where the design started.',
    concept: 'The composition centres on sido asih iconography — six-petaled flowers encoding love and compassion — interlocked with dragon-scale elements representing courage. The pattern was designed to be readable at uniform scale: legible from a distance, detailed up close. Three layers of scale — macro structure, mid-level motif, and fine-line detail — give it depth at every viewing distance.',

    processSections: [
      {
        title: 'Research: Javanese Iconography',
        body: 'Two weeks of reading classical Javanese batik documentation before drawing a single line. The sido asih flower, kawung dragon scales, and diagonal grid structures each carry specific cultural meanings that predate the colonial period. **Using them required understanding what they said, not just how they looked.** This phase produced a reference library of 40+ motifs with documented meanings.',
        image: F('0s7gvf2J1mCKSUpofh2ZuO0zME.jpg'),
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Initial sketches. Early motif exploration — testing placement, scale, and density relationships.',
      },
      {
        title: 'Composition',
        body: 'The central challenge was density. Batik patterns need to work at fabric scale, where individual motifs become texture. Too sparse and the uniform reads as plain. Too dense and it reads as noise. The final composition uses three layers of visual scale so the pattern has depth at every viewing distance — whether you\'re across a classroom or close enough to read the threads.',
        image: F('DcbQlUSeNELrf7gOQcsDryTrjrQ.jpg'),
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Composition development. Testing how motifs tile at uniform scale.',
      },
      {
        title: 'Colour Development',
        body: 'Three palettes were developed and evaluated for how they would translate onto wax-resist batik fabric dye. Digital colour does not map directly to dye — what reads as warm on screen often pulls orange under fluorescent light on cotton. **The final palette prioritised legibility and fade resistance**: colours that would remain readable after repeated washing across a school year.',
        image: F('NvlcUpadjfchIlphrvm2dBd9B6Y.png'),
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Colour testing. Three palette variants evaluated for fabric dye translation.',
      },
    ],

    meetTheWork: 'The ACS Jakarta Batik Uniform. Worn by 1,500 students weekly. Selected from 800+ submissions.',
    finalImages: [
      {
        src: F('K4gwJNWnGHo2ZqY3m1oMm03AXI.jpg'),
        caption: '°·⸜(｡˃ ᵕ ˂ )⸝ Final Pattern A. The finished uniform design, now official ACS Jakarta school wear.',
      },
      {
        src: F('NOXLUfLL0wVijF7S7mkCGnNxL4.jpg'),
        caption: '°·⸜(｡˃ ᵕ ˂ )⸝ Final Pattern B. Detail at fabric scale — showing all three layers of visual density.',
      },
    ],

    reflectionHeading: 'What designing for fabric changed about how I think about context.',
    reflection: [
      {
        title: 'Screen design assumes fixed conditions. Fabric does not.',
        body: 'Fabric is worn in sunlight, fluorescent corridors, and low evening light — and it moves. Designing for those conditions forced me to think about pattern as environment rather than image. A design that works on screen is a starting point, not a result.',
      },
      {
        title: 'Ownership changes what an object means',
        body: 'A pattern selected by teachers for students is a different object than one students feel some ownership of. I would involve students in the research phase of a v2 — not to co-design, but to understand what they wanted the uniform to say about them. The symbolism already in the pattern could then be explained back to the people who wear it.',
      },
    ],
  },

  // ── COMPACT CR PURIFIER ──────────────────────────────────────────────────────
  {
    slug: 'cr-purifier',
    title: 'Compact CR Purifier',
    subtitle: 'A reimagination of the Corsi-Rosenthal box — designed to fit the spaces people actually live in.',
    tags: ['PRODUCT DESIGN', 'FABRICATION', 'MARKETING'],
    bg: '#D6D0C8',
    heroImage: F('MTovtjuyQtyaQcX0pOUhLYiDg.jpg'),

    h1: 'A scaled-down Corsi-Rosenthal box designed for the spaces people actually live in',
    subtitleParagraph: 'The Corsi-Rosenthal box is one of the most effective DIY air purifiers available — peer-reviewed, cheap to build, and dramatically better than most commercial alternatives. It is also 50cm on each side. This project redesigns it for the spaces where air quality matters most: dorm rooms, studio flats, and shared bedrooms where floor space is not a given.',
    year: '2023',
    scope: 'Product Design\nFabrication',
    role: 'Solo. Research, design, physical prototyping, and build documentation.',
    showcaseImages: [
      F('MTovtjuyQtyaQcX0pOUhLYiDg.jpg'),
      F('dqQB5hZNeH5HPAkMfd0M7A5K9I.jpg'),
    ],

    problemSpaceHeading: 'The most effective DIY air purifier is too big for most of the places where air quality actually matters.',
    problemSpace: 'The standard CR box requires four 20×20-inch filters and a box fan — a 50cm square that projects into the room. For dorm rooms, studio flats, and shared bedrooms, that footprint is prohibitive. An effective solution that people cannot actually use **is not a solution**. The design challenge was: same filtration logic, smaller footprint, no specialist tools.',

    conceptHeading: 'Same filtration logic. Forty percent smaller footprint. No tools required.',
    concept: 'The compact CR Purifier uses two MERV-13 filters in an L-configuration rather than four in a square, allowing the unit to sit in a corner. The corner becomes part of the design — walls guide airflow to compensate for reduced filter faces. All materials are available at hardware stores. Construction time is under 20 minutes. The instructions fit on one side of A5.',

    processSections: [
      {
        title: 'Research: Understanding the Original',
        body: 'Before modifying the CR box, I needed to understand exactly why it works. The standard design uses four filter faces to maximise filtration area relative to fan capacity. Reducing filter faces reduces CADR (Clean Air Delivery Rate). The design question became: **can geometry compensate for reduced filter area?** Corner placement was the answer — two walls become passive airflow guides.',
        image: F('Lg89TpGFsjWu5n4clXjJo1drbM.jpg'),
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Early sketches. Exploring L-configuration and corner placement geometry.',
      },
      {
        title: 'Prototyping',
        body: 'The first prototype used off-the-shelf components: two MERV-13 filters, a 20-inch box fan, and duct tape. Corner placement was tested across three room configurations to evaluate whether wall airflow guidance was consistent. It was. The duct tape join was then replaced with a laser-cut MDF bracket for structural stability.',
        image: F('kuIEK27hBhGsWgpYo9EZzXK2QHM.jpg'),
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Prototype A. First build — duct tape join, corner-deployed configuration.',
      },
      {
        title: 'Material Specification',
        body: 'Every component is available at a hardware store for under £40 in the UK or $45 in the US. No online ordering required. No soldering. No power tools. The only tool required is scissors. This constraint drove the bracket design: the MDF bracket is pre-cut and packaged flat, assembled without adhesive using a friction-fit joint.',
        image: F('erRmJeaSNj01D1SZLrJ8Y5TXl2E.jpg'),
        imageCaption: '°·⸜(｡˃ ᵕ ˂ )⸝ Prototype B. Laser-cut MDF bracket replacing duct tape. Friction-fit, no adhesive.',
      },
    ],

    meetTheWork: 'The Compact CR Purifier. Corner-deployed. Under 20 minutes to build. No tools. Under £40.',
    finalImages: [
      {
        src: F('MTovtjuyQtyaQcX0pOUhLYiDg.jpg'),
        caption: '°·⸜(｡˃ ᵕ ˂ )⸝ Final Prototype A. Fan mounted on top, two MERV-13 filter faces on sides.',
      },
      {
        src: F('dqQB5hZNeH5HPAkMfd0M7A5K9I.jpg'),
        caption: '°·⸜(｡˃ ᵕ ˂ )⸝ Final Prototype B. Corner deployment — walls guide airflow to both filter faces.',
      },
    ],

    reflectionHeading: 'What accessibility actually means when the object is hardware.',
    reflection: [
      {
        title: 'The barrier was confidence, not cost',
        body: 'I assumed "accessible" meant cheap. Testing with people who had never built anything showed that the real barrier was confidence — "I could break it", "I\'m not sure where this goes." The instructions matter as much as the design. A v2 would include a one-page visual build guide with no text — just photographs of each step.',
      },
      {
        title: 'The L-configuration needs independent verification',
        body: 'The geometry works in theory and in informal testing. But it has not been independently measured for CADR against a standard CR box using a particle counter in a sealed room. Until that comparison exists, the claim that corner placement compensates for reduced filter area is an educated estimate, not a measured result.',
      },
    ],
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
