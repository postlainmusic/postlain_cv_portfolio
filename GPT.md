Đúng, đây là lúc phải đập bỏ tư duy “6 world = 6 effect” và trả lại đúng mục đích ban đầu: một câu chuyện nghề nghiệp được kể bằng hình ảnh, vật liệu, chuyển động và typography.
Mình sẽ trả Antigravity một specification đủ chi tiết để nó không tự diễn giải lệch nữa. Đặc biệt, không chọn ECS thuần túy cho project này. Với quy mô hiện tại, kiến trúc phù hợp nhất là:
- Experience Runtime + Hierarchical State Machine cho narrative.
- One RAF / One Simulation Clock cho toàn bộ runtime.
- Data-driven Material Engine cho các vật liệu.
- Typography Physics Engine dùng force-based physics + spring/damping + constraints.
- Scroll = narrative timeline, không phải browser section scrolling thông thường.
- WebGL/Canvas chỉ dùng nơi thực sự cần, DOM/CSS vẫn được dùng cho semantic text và accessibility.
- GSAP là choreographer, không phải physics engine.
Và đây là prompt mình muốn đưa thẳng cho Antigravity:


POSTLAIN MASTER BUILD DIRECTIVE
From Portfolio Website → Cinematic Interactive Visual Narrative
STATUS
THIS DOCUMENT OVERRIDES PREVIOUS INTERPRETATIONS OF THE SIX-WORLD STRUCTURE.
The previous “VOID / WATER / WOOD / FIRE / METAL / EARTH” interpretation became too close to a material showcase.
That is no longer the goal.
The goal is:
POSTLAIN is a visual story about Ngô Phúc, told almost entirely through images, materials, typography, motion, sound and interaction.

The user should not feel that they are browsing a portfolio.
They should feel that they are moving through a visual narrative.
The technology must disappear into the experience.

1. THE CORE STORY
The entire experience follows one human journey:
BEGINNING
    ↓
HEAT
    ↓
ASPIRATION
    ↓
EXPERIENCE
    ↓
DREAM
    ↓
CONNECTION
The six environments are not six unrelated “elements”.
They are six chapters of the same story.

2. THE FINAL WORLD STRUCTURE
WORLD 00 — VOID
DESERT / THE BEGINNING
Visual metaphor:
A dry, almost empty desert.
This is the starting point.
It represents:
- uncertainty
- the blank beginning
- the first step
- the starting point of a relationship with a future employer
- an empty landscape waiting for something to happen
Do NOT interpret VOID as a generic black void.
Do NOT create a futuristic space.
Do NOT create particles floating in darkness.
It should feel:
- dry
- spacious
- quiet
- mineral
- warm
- almost silent
- slightly lonely
- cinematic
Narrative
Only a very short greeting.
No biography.
No giant paragraph.
No navigation explanation.
No “scroll to explore”.
No “01 / 06”.
No progress indicator.
No visible section name.
The visitor should understand the environment intuitively.
Interaction
The desert is initially almost still.
Pointer / touch / scroll produces subtle environmental response:
- dust movement
- soft displacement
- atmospheric distortion
- tiny material reactions
- typography movement
Typography should feel physically embedded into the environment.
It must NOT look like text placed over a background.
The first interaction should establish the central rule of POSTLAIN:
The visitor affects the world.


3. WORLD 01 — FIRE
VOLCANO / THE FIRST SPARK
The desert gradually transforms into a volcanic landscape.
This transition must happen inside the same continuous composition.
Do NOT:
DESERT
fade out
↓
FIRE
fade in
Instead:
DESERT
↓
ground tension
↓
subsurface heat
↓
cracks
↓
embers
↓
volcanic glow
↓
eruption
↓
FIRE
The landscape should feel as though the same world is changing state.
Narrative purpose
Fire represents:
- energy
- passion
- first impression
- enthusiasm
- willingness to create
- the person behind POSTLAIN
This is where:
NGÔ PHÚC / POSTLAIN
first becomes strongly visible.
But the identity should emerge from the volcano, not appear as a conventional title.
Possible behavior:
subsurface glow
→ molten fragments
→ typography forms
→ letters gain mass
→ typography rises with volcanic pressure
→ identity stabilizes
The name should feel physically born from the environment.
Typography physics
Fire typography:
- high velocity
- high temperature
- elastic deformation
- upward force
- explosive displacement
- temporary fragmentation
- strong settling
Typography can stretch, split and reconnect.
But readability must return during the settling phase.

4. FIRE → WATER TRANSFORMATION
This is one of the most important moments in the entire experience.
The volcano must not simply disappear.
The heat should:
cool
↓
condense
↓
liquefy
↓
flow
↓
become WATER
The user should perceive a continuous physical transformation.
No hard scene cut.
No simple crossfade.
No generic GSAP transition.
The transition itself should be one of the signature moments of the website.

5. WORLD 02 — WATER
WATERFALL / ASPIRATION
Water represents:
- ambition
- dedication
- persistence
- desire
- commitment
- continuous movement
This is not just “the water effect”.
It is the emotional middle of the story.
Visual direction
The scene should become:
- deep mineral water
- waterfall / flowing water
- natural depth
- restrained refraction
- dark blue mineral tones
- physical movement
- cinematic light
Avoid generic:
- rainbow WebGL fluid
- neon blue
- psychedelic shaders
- liquid blob UI
- abstract screensaver appearance
Typography
This is one of the major signature interactions.
Typography should behave like material inside the water.
As the user scrolls:
scroll velocity
↓
water velocity
↓
typography velocity
↓
letters move through water
↓
letters distort through refraction
Text can travel:
- vertically
- downstream
- across the waterfall
- around surfaces
- behind/through water
The text must feel like it is inside the water, not above it.
Scroll narrative
The visitor scrolls.
The text moves with the water.
When the text has completed its journey:
text exits
↓
water divides
↓
flow moves toward both sides
↓
space opens
↓
forest begins growing
This is another major transformation.

6. WORLD 03 — WOOD
ANCIENT FOREST / EXPERIENCE
This is the most content-rich chapter.
Wood represents:
professional experience and accumulated knowledge.
The forest is not decorative.
The forest IS the CV.

7. WOOD MUST BE A HORIZONTAL NARRATIVE
This world should introduce a completely different spatial rhythm.
The user continues scrolling vertically, but the experience translates the narrative horizontally.
Conceptually:
VERTICAL USER SCROLL
        ↓
TIMELINE PROGRESS
        ↓
HORIZONTAL FOREST JOURNEY
The browser should not simply display a normal horizontal scrollbar.
The horizontal movement must feel cinematic and controlled.
Landscape
A large ancient forest.
Not cartoon trees.
Not generic 3D forest assets.
Use:
- silhouettes
- atmospheric depth
- volumetric light
- fog
- branches
- bark
- roots
- layered parallax
- subtle wind
- organic structures
The environment can be largely 2D / 2.5D.
We do NOT need an expensive fully 3D world.
The elements should have dimensionality.

8. THE TREES ARE THE CV
Each major professional period should correspond to an ancient tree.
For example:
TREE
│
├── YEAR / PERIOD
├── COMPANY / PLACE
├── ROLE
├── KEY EXPERIENCE
└── CONTRIBUTION
Use the ACTUAL CV CONTENT already present in the repository.
Do NOT invent employers, dates, roles, achievements or claims.
Before implementing the trees:
1. Inspect the existing CV data.
2. Identify all professional milestones.
3. Preserve factual accuracy.
4. Convert the information into visual narrative units.

9. TYPOGRAPHY MUST BE PHYSICALLY PART OF THE TREES
This is extremely important.
Do NOT do:
TREE IMAGE

[Company Name]
[Role]
[Description]
floating as HTML text over the tree.
Instead:
TREE BARK
   ↓
CARVED TYPOGRAPHY
   ↓
AGE / WEATHER / DEPTH
The company name and important information should visually feel:
- carved
- engraved
- burned
- grown into
- physically attached to the bark
Typography should inherit:
- bark perspective
- lighting
- occlusion
- depth
- roughness
- shadow
- displacement
A visitor should initially wonder:
“Is that actually written into the tree?”

That is the correct result.

10. WOOD INTERACTION
As the user moves through the forest:
- trees pass at different depths
- branches move subtly
- leaves respond to movement
- typography reveals itself
- camera/parallax shifts
- atmosphere changes
When approaching a tree:
distance decreases
↓
tree gains visual prominence
↓
carved typography becomes readable
↓
secondary information reveals
↓
tree becomes part of the timeline
Do NOT use conventional cards.
Do NOT create six rectangular experience panels.
Do NOT create dashboard-like CV components.
The forest is the information architecture.

11. WOOD MEMORY
The forest should remember the user's movement.
If the visitor interacts with a tree:
- leaves can move
- dust can move
- bark particles can react
- subtle light residue can remain
But memory must be bounded.
Do not accumulate unlimited particles or DOM nodes.
Use:
- persistent abstract state
- spatial hashing
- pooled particles
- capped traces
- decaying low-value detail
The user should feel that they left a trace.
The engine should not remember 30,000 individual particles.

12. WOOD → METAL / MOON
Do not literally transform the forest into “metal”.
The previous elemental naming is now secondary.
The visual story takes priority.
The forest gradually becomes darker.
Wind increases.
Leaves begin to move.
Branches bend.
A storm arrives.
The storm becomes the transition mechanism.
FOREST
↓
WIND
↓
STORM
↓
LEAVES
↓
DARKNESS
↓
CLOUDS
↓
CLEARING
↓
MOON
↓
STARS
This is the bridge to the final chapter.

13. WORLD 04 — MOON / STARS
DREAM / FUTURE / CONNECTION
This replaces the old abstract METAL interpretation.
This environment represents:
- dreams
- future
- possibility
- collaboration
- aspiration
- what could happen if POSTLAIN and the right people work together
The metaphor:
The moon is not the destination. It is the light that makes the next destination visible.

The scene should feel:
- nocturnal
- quiet
- cinematic
- vast
- beautiful
- emotionally mature
Avoid:
- cyberpunk
- neon futuristic UI
- sci-fi dashboard
- glowing technology grids
- generic space portfolio
The stars can be subtle.
The moon should provide the primary composition.

14. CONTACT FORM MUST BELONG TO THE WORLD
Do not put a standard white rectangular form in the middle of the moon scene.
The form must feel like part of the environment.
Possible treatment:
- translucent mineral/glass surface
- moonlit paper
- subtle atmospheric panel
- typography integrated with the scene
- restrained borders
- soft depth
- physical response to cursor
But usability remains absolute.
Inputs must still be:
- accessible
- keyboard navigable
- readable
- focusable
- valid
- usable on mobile
Visual sophistication must never destroy usability.

15. FINAL NARRATIVE
The visitor should reach the final environment and understand:
I saw where this person began.
I saw their energy.
I saw what they aspire to.
I saw what they have experienced.
Now I understand where they want to go.
Then:
Contact.
No sales pitch.
No giant “LET'S WORK TOGETHER”.
No agency language.
No unnecessary paragraph.
The final scene should leave space for the visitor to decide:
“I want to talk to this person.”


16. WHAT HAPPENED TO EARTH?
Remove the previous six-element interpretation.
There is no requirement to preserve:
VOID
WATER
WOOD
FIRE
METAL
EARTH
as six equal visual chapters.
The original elemental concept has served its purpose.
The final narrative is now:
DESERT
→
VOLCANO
→
WATERFALL
→
FOREST
→
MOON / STARS
→
CONTACT
This is a stronger story.
The old material taxonomy can still influence the physics system internally.
It must NOT dictate the visual narrative.

17. ARCHITECTURE DECISION
DO NOT BUILD THIS AS SIX REACT COMPONENTS WITH SIX INDEPENDENT ANIMATION LOOPS.
Use:
POSTLAIN EXPERIENCE RUNTIME
│
├── Narrative State Machine
│
├── Timeline / Scroll Progress
│
├── Input Engine
│
├── Material Engine
│
├── Typography Physics Engine
│
├── Transition Engine
│
├── Audio Engine
│
├── Renderer
│
└── Accessibility Layer

18. NARRATIVE ENGINE
Use a hierarchical state machine / state graph.
Conceptually:
ExperienceState = {
  chapter: 'VOID' | 'FIRE' | 'WATER' | 'WOOD' | 'MOON',
  progress: number,
  transition: number,
  interaction: InteractionState
}
Each chapter owns:
ChapterDefinition = {
  id,
  enter,
  update,
  render,
  exit,
  narrativeRange,
  materialProfile,
  typographyProfile,
  transitionProfile
}
But the chapters must NOT own RAF loops.
There is one global runtime.

19. SCROLL IS A NARRATIVE TIMELINE
This is critical.
Do not think:
scroll → next section
Think:
scroll
↓
narrative progress
↓
continuous world transformation
Example:
0.00 - 0.14
DESERT

0.14 - 0.25
DESERT → VOLCANO

0.25 - 0.40
VOLCANO

0.40 - 0.52
VOLCANO → WATER

0.52 - 0.66
WATER

0.66 - 0.84
FOREST / EXPERIENCE

0.84 - 0.91
STORM

0.91 - 1.00
MOON / CONTACT
These values are examples.
Tune them against actual content and pacing.
The important concept is:
continuous narrative progress, not discrete page switching.

20. INPUT ENGINE
Normalize:
pointer
touch
wheel
keyboard
gesture
into one interaction stream.
Use coalesced input.
Do not allow raw pointer events to directly mutate hundreds of DOM elements.
Convert input into:
ForceEvent
GestureEvent
NavigationIntent
InteractionIntent
The simulation consumes these events.

21. TYPOGRAPHY PHYSICS MODEL
Use a force-based particle/glyph model, not animation presets.
Each important glyph or text group can conceptually contain:
GlyphState {
  position
  velocity
  acceleration
  rotation
  angularVelocity
  scale
  opacity

  mass
  drag
  tension
  density
  pressure
  temperature

  deformation
  persistence

  targetPosition
  materialResponse
}
Physics should use:
FORCES
↓
ACCUMULATION
↓
INTEGRATION
↓
CONSTRAINTS
↓
DAMPING
↓
COMPOSITION
Prefer a stable semi-implicit integration approach for interactive typography.
Avoid uncontrolled physics.
Every typography profile must have:
- maximum displacement
- maximum rotation
- maximum scale deviation
- damping
- settling time
- readability threshold

22. TYPOGRAPHY IS NOT JUST GLYPH PARTICLES
Do not turn every paragraph into individual floating letters.
Use three levels:
LEVEL 1
Semantic text block.
LEVEL 2
Text group physics.
LEVEL 3
Individual glyph physics.
Use individual glyph physics only where it creates meaningful visual impact.
This preserves performance and readability.

23. MATERIAL RESPONSE
Create material profiles.
Example:
DESERT_PROFILE
VOLCANO_PROFILE
WATER_PROFILE
FOREST_PROFILE
MOON_PROFILE
Each profile defines:
force response
velocity response
drag
temperature
deformation
lighting
density
memory
settling
The same Typography Engine can therefore produce completely different behavior without duplicating code.

24. EVERY ELEMENT MUST HAVE A REASON TO MOVE
This is the most important visual rule.
Do NOT animate something merely because:
“It looks cool.”

Every movement must have a cause.
Examples:
Wind
Leaves move.
Water
Typography drifts with current.
Heat
Typography expands and rises.
Storm
Trees bend.
Pointer proximity
Material reacts.
Scroll
Narrative composition changes.
Audio
Very subtle environmental response.
Focus
Interactive UI responds.
This creates a believable world.

25. BACKGROUND DOES NOT NEED TO BE FULL 3D
Do not over-engineer the environment.
Use a hybrid rendering strategy:
2D composition
+
2.5D depth
+
WebGL material effects
+
Canvas particles
+
DOM semantic typography
+
CSS/GSAP choreography
Only use actual 3D geometry where depth materially improves the scene.
The goal is not:
“Look how much 3D technology we used.”

The goal is:
“This scene feels physically real.”


26. AUDIO ENGINE
Audio is part of the narrative.
Do not add generic background music.
The soundscape should evolve with the story.
Conceptually:
DESERT
near silence / dry atmosphere

VOLCANO
low rumble / heat / rising energy

WATER
flow / air / spatial movement

FOREST
wind / leaves / distant atmosphere

STORM
increasing energy

MOON
music opens / becomes spacious / resolves
The music must be subtle enough that it does not become annoying.
User must have:
- mute
- volume control
- autoplay-safe behavior
- reduced-motion compatibility
Do not force audio autoplay if browser policy prevents it.
If interaction is required to start audio, make it part of the experience without explicit tutorial text.

27. MUSIC MUST BE SYNCHRONIZED TO NARRATIVE
Do not play one MP3 from beginning to end without adaptation.
Use:
Narrative Progress
↓
Audio State
↓
Volume
↓
EQ
↓
Layer intensity
↓
Atmosphere
If appropriate, use Web Audio API for controlled layers.
But do not over-engineer it if the actual music assets do not justify it.

28. TRANSITION ENGINE
Transitions are not fades.
Build transitions as physical transformations.
Required major transitions:
DESERT → VOLCANO
Heat emerges from ground.
VOLCANO → WATER
Lava cools / liquefies / becomes flow.
WATER → FOREST
Water divides and feeds the forest.
FOREST → STORM
Wind destabilizes the environment.
STORM → MOON
Clouds clear and reveal the moon.
Each transition must have:
anticipation
build-up
transformation
peak
settling
No abrupt section swaps.

29. NAVIGATION
There must be:
- NO visible scrollbar design
- NO page counter
- NO “01 / 05”
- NO section labels
- NO tutorial
- NO “scroll down”
- NO giant navigation menu
- NO unnecessary arrows
The user should navigate naturally with:
- wheel
- touch
- trackpad
- keyboard
Navigation UI should remain almost invisible.
However, accessibility navigation must still exist for keyboard and screen readers.
Visual minimalism must not mean inaccessible interaction.

30. RESPONSIVE EXPERIENCE
Mobile is not:
desktop × 0.5
Build a mobile composition.
Desktop:
wide cinematic composition
Mobile:
vertical cinematic composition
The narrative remains identical.
The spatial composition changes.

31. PERFORMANCE ARCHITECTURE
Maintain the seven red rules:
1. One RAF.
2. One simulation clock.
3. Fixed physics timestep.
4. GPU-resident simulation where applicable.
5. Input coalescing.
6. Active-world simulation only.
7. Adaptive performance governor.
Additional rule:
Do not use WebGL merely because WebGL is available.

If CSS transforms are enough, use CSS.
If Canvas is enough, use Canvas.
If WebGL creates the material illusion substantially better, use WebGL.
Use the least expensive technology capable of producing the intended visual result.

32. RENDERING LAYERS
Recommended:
LAYER 0
Atmosphere / background

LAYER 1
Material simulation

LAYER 2
Depth / particles

LAYER 3
World objects

LAYER 4
Typography material

LAYER 5
Semantic DOM content

LAYER 6
Interactive controls
Do not put everything into one canvas.
Accessibility requires semantic DOM for important content.

33. PERFORMANCE BUDGET
Target:
Desktop 60Hz
< 16.67ms/frame
Desktop 120Hz
< 8.33ms/frame where practical
Mobile
stable 60Hz where hardware permits
Physics can reduce to:
60Hz
↓
30Hz
without reducing render frequency.
Use interpolation.
Adaptive quality should reduce:
1. simulation resolution
2. particle count
3. pressure iterations
4. shadow complexity
5. DPR
before sacrificing the core interaction.

34. NO RUNAWAY MEMORY
Especially for:
- forest traces
- particles
- typography objects
- audio nodes
- WebGL textures
- framebuffers
- event listeners
Use:
- object pools
- resource pools
- capped history
- cleanup on chapter exit
- explicit GPU resource disposal

35. ACCESSIBILITY
Important content must exist outside visual effects.
Screen readers must be able to recover:
- POSTLAIN
- Ngô Phúc
- professional experience
- companies
- roles
- dates
- contact
- email
Reduced motion should transform:
complex physics
↓
calm transitions
not:
beautiful experience
↓
blank page
The story must remain understandable without motion.

36. CONTENT RULE
Use only the actual source material available in the repository.
Do not invent:
- employers
- dates
- positions
- achievements
- skills
- biography
- projects
The experience can reinterpret content visually.
It cannot fabricate content.

37. ANTI-AI VISUAL RULE
The website must not look like an AI-generated portfolio template.
Avoid:
- glassmorphism everywhere
- floating gradient blobs
- excessive glow
- generic grain
- neon gradients
- futuristic UI
- rounded SaaS cards
- giant meaningless headings
- random particles
- cursor-following everything
- excessive parallax
- generic “creative developer” aesthetic
- excessive 3D just to demonstrate technology
The visual language must feel authored.
It should contain:
- asymmetry
- restraint
- imperfection
- material specificity
- unusual composition
- intentional typography
- cinematic pacing
- human decisions

38. AWWWARDS-LEVEL EXPERIENCE TARGET
The target is not:
“Make everything animated.”

The target is:
Every visual decision should feel intentional, every interaction should have consequence, and every transition should advance the story.

The website should create memorable moments such as:
MOMENT 1
The empty desert responds to the visitor.
MOMENT 2
The volcano gives birth to POSTLAIN.
MOMENT 3
The volcanic landscape melts into water.
MOMENT 4
Typography physically flows through the waterfall.
MOMENT 5
Water separates and reveals a growing forest.
MOMENT 6
The visitor travels horizontally through the professional timeline.
MOMENT 7
Experience information appears carved into ancient trees.
MOMENT 8
A storm physically removes the forest from view.
MOMENT 9
Clouds clear to reveal the moon.
MOMENT 10
The final contact space feels like the natural emotional resolution.
These are the moments to polish obsessively.
Not random micro-effects.

39. SIGNATURE INTERACTION
The strongest interaction should combine:
SCROLL
+
MATERIAL
+
TYPOGRAPHY
+
ENVIRONMENT
+
AUDIO
For example:
USER SCROLLS
     ↓
environment changes
     ↓
material responds
     ↓
typography moves
     ↓
audio changes
     ↓
composition transforms
     ↓
next chapter emerges
The visitor should feel that their movement is writing the story.

40. IMPLEMENTATION ORDER
Do not attempt to polish all chapters simultaneously.
Build vertical slices.
STEP 1
Experience Runtime
STEP 2
Narrative Timeline
STEP 3
Input Engine
STEP 4
Typography Physics
STEP 5
DESERT → VOLCANO
STEP 6
VOLCANO → WATER
STEP 7
WATER → FOREST
STEP 8
FOREST TIMELINE
STEP 9
FOREST → STORM → MOON
STEP 10
Contact
STEP 11
Audio
STEP 12
Global polish
STEP 13
Performance
STEP 14
Accessibility
STEP 15
Cross-device QA

41. BUILD METHODOLOGY
Do not build the whole system blindly.
For every chapter:
IMPLEMENT
↓
RUN
↓
INTERACT
↓
VERIFY
↓
POLISH
↓
ONLY THEN
↓
MOVE TO NEXT CHAPTER
Never declare a chapter complete based solely on:
TypeScript compiles
or:
Vite build passes
Runtime quality is part of completion.

42. REQUIRED PERFORMANCE INSTRUMENTATION
Development-only instrumentation:
FPS
Frame Time
Physics Time
Render Time
Typography Time
Audio Time
Active Chapter
Simulation Resolution
DPR
Particle Count
Glyph Count
Force Events
GPU Resource Count
Memory Growth
No production HUD.

43. FILE ARCHITECTURE
Adapt the existing repository instead of creating unnecessary duplication.
Target conceptual structure:
src/frontend/narrative/

├── runtime/
│   ├── ExperienceRuntime.ts
│   ├── NarrativeState.ts
│   ├── NarrativeTimeline.ts
│   └── PerformanceGovernor.ts
│
├── interaction/
│   ├── InputEngine.ts
│   ├── ForceField.ts
│   ├── TypographyEngine.ts
│   ├── MaterialEngine.ts
│   └── AudioEngine.ts
│
├── transitions/
│   ├── DesertToFire.ts
│   ├── FireToWater.ts
│   ├── WaterToForest.ts
│   └── ForestToMoon.ts
│
├── worlds/
│   ├── Desert.tsx
│   ├── Fire.tsx
│   ├── Water.tsx
│   ├── Forest.tsx
│   └── Moon.tsx
│
├── rendering/
│   ├── CanvasRenderer.ts
│   ├── WebGLRenderer.ts
│   └── ResourcePool.ts
│
└── accessibility/
    └── NarrativeAccessibility.ts
Do not blindly rename existing files if doing so creates unnecessary risk.
Refactor incrementally.
Preserve known-working functionality.

44. WATER SAFETY RULE
The current working water simulation is a known-good baseline.
Do not replace it blindly.
Before any WebGL rewrite:
CURRENT WATER
↓
BASELINE TEST
↓
NEW IMPLEMENTATION
↓
A/B
↓
RUNTIME VERIFY
↓
FALLBACK IF REGRESSION
A technically superior implementation that makes the water disappear is a regression.

45. QUALITY GATE
A chapter is NOT DONE until:
VISUAL
- composition feels intentional
- no generic AI aesthetic
- typography belongs to environment
- depth feels convincing
- material behavior is coherent
NARRATIVE
- chapter advances the story
- content is concise
- no redundant text
- no unnecessary explanation
INTERACTION
- input has consequence
- interaction feels physical
- motion is not random
- mobile interaction works
TECHNICAL
- no runtime errors
- no memory leaks
- no runaway allocations
- performance budget respected
- resources cleaned correctly
ACCESSIBILITY
- keyboard works
- screen reader content exists
- reduced motion works
- focus states work
- important information remains readable

46. FINAL CREATIVE PRINCIPLE
Do not ask:
“What effect should we add here?”

Ask:
“What should the visitor feel here, and what physical phenomenon could communicate that feeling?”

Examples:
Need to communicate passion?
→ heat / pressure / eruption.
Need to communicate aspiration?
→ flow / falling water / continuous movement.
Need to communicate experience?
→ age / rings / bark / roots / accumulated structure.
Need to communicate uncertainty?
→ empty desert / silence / space.
Need to communicate possibility?
→ moonlight / stars / vastness.
This is how the technology serves the story.

47. THE FINAL TEST
Open the finished website with no explanation.
Give it to someone who has never seen the project.
Do not tell them:
- what the six worlds mean
- where the CV is
- where the contact form is
- what the interactions are
- what technology is being used
Observe.
If they naturally understand:
beginning
→ energy
→ aspiration
→ experience
→ future
→ contact
then the narrative works.
If they say:
“Cool WebGL effects.”

but cannot remember anything about Ngô Phúc,
the experience has failed.
If they say:
“I remember the volcano, the water, the forest with the carved names, and the moon.”

then the visual storytelling is working.

FINAL DIRECTIVE
STOP THINKING OF POSTLAIN AS A PORTFOLIO UI.
Build:
A cinematic, interactive visual autobiography.

The portfolio content is the information.
The environments are the metaphor.
Typography is the physical language.
Motion is the narrative grammar.
Sound is the atmosphere.
Interaction is the visitor's participation.
Technology is invisible infrastructure.
The final result should feel:
human + cinematic + tactile + intelligent + authored + memorable.
Not:
AI + WebGL + effects + portfolio template.
The experience should make the visitor remember the person, not the implementation.
Build toward that standard.



Và câu trả lời ngắn cho câu hỏi kiến trúc của Antigravity
Nếu nó hỏi lại “chọn mô hình Engine nào?”, trả lời đúng một câu này:
Experience Engine dùng Hierarchical State Machine + continuous narrative timeline; Material Engine dùng data-driven force-based simulation; Typography Physics dùng mass-spring/force model với semi-implicit integration, constraints và material profiles; toàn hệ thống chạy One RAF/One Clock, GSAP chỉ làm choreography, không làm physics.

Còn một điểm rất quan trọng: đừng để Antigravity bắt đầu bằng việc dựng cả 5 cảnh cùng lúc. Hãy bắt nó làm vertical slice đầu tiên: DESERT → VOLCANO → WATER, cho đến khi ba thứ này thật sự “đã mắt” và transition liền mạch. Nếu đoạn này chưa đạt, dựng tiếp forest chỉ là xây tầng hai trên nền móng chưa khô.
Và nếu Antigravity cần chính xác nội dung CV hiện tại để khắc lên từng thân cây, nếu CV đó chưa nằm trong context của nó, bạn có thể gửi file CV cho mình để mình cấu trúc lại thành timeline/content model trước.