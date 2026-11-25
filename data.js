// Douglas Training programme — 25 Nov 2026.
// Cards: { name, dose, cues, mistake, knee?, links: [{ title, site, href }] }.
const yt = (id) => `https://www.youtube.com/watch?v=${id}`;


// Shared gym warm-up (Day B and Day C). Day A prepends the easy SkiErg / bike.
const warmup = [
  {
    name: "Stick or broom mobility opener",
    dose: "2–3 min",
    cues: [
      "Broom, PVC or a light band. Wide grip, ribs down",
      "Slow pass-throughs: take it up, over and behind, then back, only in a pain-free range",
      "Open the chest and upper back: stick across the shoulders or behind the arms and gently open",
      "Easy standing or seated spinal rotations — turn from the mid-back, not the lower back"
    ],
    mistake: "Forcing a narrow grip, deep overhead squats, or cranking the right shoulder to end range.",
    knee: "Stay standing or seated. Skip deep stick squats and any lunging pass-throughs.",
    links: [
      { title: "Full Body PVC Pipe WarmUp", site: "YouTube · Kyle Gran", href: yt("Tzyl-Cl5Www") },
      { title: "Band Shoulder Dislocates", site: "YouTube · T Nation", href: yt("th1CUY49IzY") },
      { title: "Shoulder Passthroughs", site: "YouTube", href: yt("p-F-GywE92E") }
    ],
  },
  {
    name: "Thoracic rotations",
    dose: "8 each side",
    cues: [
      "Lie on your side, knees bent and stacked",
      "Arms out in front, palms together",
      "Open the top arm across and follow it with your eyes",
      "Breathe out as you rotate and let the shoulder sink",
      "Unweighted, and only through a pain-free range on the right shoulder"
    ],
    mistake: "Letting the knees and hips roll back with the arm. Rotate from the mid-back.",
    knee: "Put a cushion between the knees if bending them is sore.",
    links: [
      { title: "Thoracic Rotation Open Book", site: "YouTube · Elite Performance Institute", href: yt("peeW19ofFUg") }
    ],
  },
  {
    name: "Wall slides",
    dose: "10–12",
    cues: [
      "Forearms on the wall, elbows at 90°",
      "Ribs down and core braced",
      "Slide up while keeping forearms on the wall",
      "Lower slowly to the start"
    ],
    mistake: "Arching your lower back to reach higher.",
    links: [
      { title: "How To Do Wall Slides", site: "YouTube · Live Lean TV", href: yt("jd1y1Hz4VAM") }
    ],
  }
];


// Day A only. The other gym days use `warmup` (no machine). No rower.
const warmupA = [
  {
    name: "Easy SkiErg or upright bike",
    dose: "5 min easy",
    cues: [
      "SkiErg: damper 4–5, soft knees, small hip hinge, easy pace",
      "Or an easy upright bike if that feels better today",
      "Sit tall and keep it conversational",
      "Stop well short of getting tired"
    ],
    mistake: "Turning the warm-up into intervals.",
    knee: "No rowing until the physio clears your right knee.",
    links: [
      { title: "Mastering SkiErg Form", site: "YouTube · The Barbell Physio", href: yt("klX-UF8mTy8") }
    ],
  },
  ...warmup,
];

// Day A · Chest and posture
const dayA = [
  {
    name: "Single-arm incline dumbbell press",
    dose: "4 × 8–10 each side",
    cues: [
      "Bench at 30–45°, free hand braced on the bench or hip",
      "Ribs down — don't let the torso twist toward the working side",
      "Lower to chest level under control",
      "Press up and slightly in"
    ],
    mistake: "Rotating or shrugging toward the dumbbell.",
    knee: "Get the dumbbell up with your hand, not by kicking it off your knee.",
    links: [
      { title: "How to do a Single-Arm Incline Dumbbell Chest Press", site: "YouTube · NASM", href: yt("iJ-GwVeUuCg") }
    ],
  },
  {
    name: "Chest-supported row",
    dose: "4 × 10",
    cues: [
      "Chest stays glued to the pad",
      "Let the arms hang so the shoulder blades stretch forward",
      "Pull the elbows back towards your hips",
      "Lower slowly to a full stretch"
    ],
    mistake: "Lifting your chest off the pad to heave the weight.",
    knee: "Stand on the floor or the foot plate, never kneel on the bench with the sore knee.",
    links: [
      { title: "Chest Supported Row", site: "YouTube · Renaissance Periodization", href: yt("4Idz7uwm3OU") }
    ],
  },
  {
    name: "Flat barbell bench press",
    dose: "3 × 8",
    cues: [
      "Eyes under the bar, grip a bit wider than shoulders",
      "Shoulder blades squeezed back and down",
      "Lower to the lower chest with elbows at about 45°",
      "Press up and slightly back towards your face"
    ],
    mistake: "Bouncing the bar off the chest or losing upper-back tightness.",
    knee: "Skip heavy leg drive for now. Feet flat, firm but gentle.",
    links: [
      { title: "How To Get A Huge Bench Press with Perfect Technique", site: "YouTube · Jeff Nippard", href: yt("vcBig73ojpE") }
    ],
  },
  {
    name: "Flat or high-to-low cable fly",
    dose: "3 × 12, pain-free range",
    cues: [
      "Flat cable fly, or pulleys set high and sweep down (high-to-low)",
      "Skip low-to-high — it hurts the right shoulder",
      "Slight fixed elbow bend. Stop inside a pain-free range",
      "If the cable still niggles, do a flat dumbbell fly instead"
    ],
    mistake: "Forcing the range, or shrugging. Low-to-high is out for now.",
    knee: "Use a split stance you're comfortable with, or sit on a bench between the cables.",
    links: [
      { title: "How To: Cable Fly (High-To-Low)", site: "YouTube · ScottHermanFitness", href: yt("8Um35Es-ROE") },
      { title: "How to Properly Do a Dumbbell Fly", site: "YouTube · Mind Pump TV", href: yt("QENKPHhQVi4") }
    ],
  },
  {
    name: "KB halos",
    dose: "Finisher, 3 rounds: × 8 each way",
    cues: [
      "Light bell held upside down by the horns",
      "Circle it close around your head",
      "Keep the head still and the core braced",
      "Go slowly, alternate directions"
    ],
    mistake: "Moving your head out of the way or arching your back.",
    knee: "Do them seated on a bench if standing bothers the knee.",
    links: [
      { title: "Kettlebell Halo Tutorial", site: "YouTube · Brittany van Schravendijk", href: yt("Sci3lijQBmk") },
      { title: "Kettlebell Halo", site: "YouTube · Onnit Academy", href: yt("wJcmanVh5EE") }
    ],
  },
  {
    name: "KB pullovers",
    dose: "Finisher, 3 rounds: × 10",
    cues: [
      "Lie on a bench or the floor, bell over your chest by the horns",
      "Small fixed bend in the elbows",
      "Lower in an arc behind your head to a lat stretch",
      "Pull it back over the chest with your lats"
    ],
    mistake: "Letting the ribs flare and the lower back arch at the bottom.",
    links: [
      { title: "Kettlebell Pullover", site: "YouTube · seanskahan", href: yt("0JGIeZ5RTDE") }
    ],
  },
  {
    name: "KB single-arm floor press",
    dose: "Finisher, 3 rounds: × 10 each arm",
    cues: [
      "Lie on the floor, upper arm at about 45° from your body",
      "Wrist straight, bell sitting over the forearm",
      "Lower until the elbow lightly touches the floor",
      "Press up without twisting your torso"
    ],
    mistake: "Bouncing the elbow off the floor.",
    knee: "Keep the sore leg straight on the floor if bending it hurts.",
    links: [
      { title: "1 Arm Kettlebell Floor Press Exercise Tutorial", site: "YouTube · Luka Hocevar", href: yt("B340QckIfJM") }
    ],
  },
  {
    name: "Dead bug",
    dose: "3 × 10 per side",
    cues: [
      "On your back, hips and knees at 90°, arms up",
      "Press the lower back into the floor",
      "Reach one arm back and the opposite leg out",
      "Breathe out as you extend, return slowly"
    ],
    mistake: "The lower back lifting off the floor. Make the reach shorter.",
    knee: "Keep the knee bent when you extend that leg, and tap the heel down.",
    links: [
      { title: "How to Do a Dead Bug", site: "YouTube · Hinge Health", href: yt("GbSC02oU3To") },
      { title: "Physical Therapy – Dead Bug Exercise", site: "YouTube · ChoosePT", href: yt("8NBNM8haZx0") }
    ],
  },
  {
    name: "Prone Y-T-W raises (bodyweight)",
    dose: "2 rounds × 8 each letter, bodyweight only",
    cues: [
      "Face down, forehead on a towel, thumbs up. No plates or dumbbells",
      "Y: arms overhead in a Y, lift a few cm",
      "T: arms out to the sides, lift",
      "W: elbows bent, pull them back and squeeze"
    ],
    mistake: "Adding weight, shrugging, or lifting your chest to get the arms higher.",
    knee: "Put a folded towel under the knees if lying face down presses on the sore one.",
    links: [
      { title: "Shoulder Mobility | Prone YTW", site: "YouTube · Cali Hoss", href: yt("TMnRKdNOrrA") }
    ],
  },
  {
    name: "Grounded rotation (seated, tall-kneeling or quadruped)",
    dose: "2–3 × 8 per side",
    cues: [
      "Pick the position that feels best on the knee: seated, quadruped, or tall-kneeling if the knee is happy",
      "Unweighted. Rotate through the mid-back and hips, eyes following the turn",
      "Keep the planted knee quiet — no twisting over a bent, loaded knee",
      "Pain-free range only, especially on the right shoulder"
    ],
    mistake: "Yanking the shoulder or pivoting on a planted, bent knee.",
    knee: "Prefer seated or quadruped. Skip tall-kneeling if the knee objects, and don't twist on the sore side.",
    links: [
      { title: "Thread The Needle For Thoracic Rotation", site: "YouTube · Elite Performance Institute", href: yt("7C8-zj3nRro") }
    ],
  }
];

// Day B · Back, shoulders and core
const dayB = [
  {
    name: "Lat pulldown or assisted pull-up",
    dose: "4 × 8–10",
    cues: [
      "Grip a bit wider than shoulders, thighs under the pad",
      "Slight lean back, chest up",
      "Drive the elbows down to your ribs, bar to the upper chest",
      "Control it all the way up to a full stretch"
    ],
    mistake: "Swinging back to yank the weight down.",
    knee: "Lat pulldown is the safer pick. The assisted machine has you kneeling on a pad, so skip it until the knee is fine with that.",
    links: [
      { title: "Proper Lat Pulldown Tutorial", site: "YouTube · Moose The Physio", href: yt("XpItbVgoCiI") },
      { title: "How To Use The Assisted Pull Up Machine", site: "YouTube · PureGym", href: yt("wFj808u2HWU") }
    ],
  },
  {
    name: "Seated dumbbell shoulder press",
    dose: "3 × 10",
    cues: [
      "Back supported, bench upright or slightly reclined",
      "Start with dumbbells at ear height, elbows slightly forward",
      "Press up and slightly in",
      "Lower to about 90° at the elbow",
      "Pain-free range only — don't force the right arm to lock out overhead"
    ],
    mistake: "Arching off the backrest as the set gets hard, or pushing through shoulder pain.",
    knee: "Get the dumbbells up with your arms, not by kicking them off your knees.",
    links: [
      { title: "How To: Seated Dumbbell Shoulder Press", site: "YouTube · Kade Howell", href: yt("E9ShwbwZ1zw") }
    ],
  },
  {
    name: "Single-arm kettlebell row",
    dose: "3 × 10 per arm · alternate KB and DB week to week",
    cues: [
      "Hinge with a flat back, free hand on a bench",
      "Torso square to the floor",
      "Pull the bell to your hip with the elbow close",
      "Lower under control to a full stretch",
      "Single-arm DB row is the same pattern — swap the kettlebell for a dumbbell on alternate weeks"
    ],
    mistake: "Twisting the torso open to lift the bell.",
    knee: "Stand in a split stance with your hand on the bench. Don't kneel on the bench with the sore knee.",
    links: [
      { title: "Tutorial: Kettlebell Single Arm Row", site: "YouTube · Keanu Soto", href: yt("rQqDQkbbNrk") }
    ],
  },
  {
    name: "Straight-arm cable pulldown",
    dose: "3 × 15",
    cues: [
      "High pulley, bar or rope, step back",
      "Slight hip hinge, small fixed elbow bend",
      "Sweep the bar down to your thighs using your lats",
      "Let it rise slowly to a stretch overhead"
    ],
    mistake: "Bending the elbows so it becomes a triceps pushdown.",
    links: [
      { title: "Straight-Arm Pulldown Complete Guide", site: "YouTube · DeltaBolic", href: yt("zECTZHrvuMg") },
      { title: "How To Do The Straight Arm Pulldown", site: "Athlean-X", href: "https://learn.athleanx.com/articles/back-for-men/how-to-do-a-straight-arm-pulldown" }
    ],
  },
  {
    name: "Cable external rotation",
    dose: "3 × 15 per arm",
    cues: [
      "Pulley at elbow height, stand side-on",
      "Elbow at 90° and pinned to your side",
      "Rotate the forearm out, away from your belly",
      "Return slowly. Keep it light"
    ],
    mistake: "Letting the elbow drift off your side or twisting the torso.",
    knee: "Tuck a rolled towel between elbow and ribs to keep it in place.",
    links: [
      { title: "Cable Shoulder External Rotation", site: "YouTube · Physio Plus Fitness", href: yt("GxDF2AYsI1Q") }
    ],
  },
  {
    name: "KB side bends",
    dose: "KB core, 3 rounds: 30s each side",
    cues: [
      "Stand tall, bell in one hand by your side",
      "Bend straight sideways, bell sliding down the leg",
      "Come back up using the opposite side of your waist",
      "Hips and shoulders stay square"
    ],
    mistake: "Leaning forward or twisting instead of bending sideways.",
    knee: "Knees soft and still. Stand with feet a bit wider for balance.",
    links: [
      { title: "Kettlebell Side Bend", site: "YouTube · FIT Sisters", href: yt("9UtNxvpL65o") }
    ],
  },
  {
    name: "Hollow hold",
    dose: "KB core, 3 rounds: 30s",
    cues: [
      "On your back, lower back pressed into the floor",
      "Lift shoulders and legs off the floor",
      "Arms by your ears or by your sides",
      "Breathe shallow, hold the shape"
    ],
    mistake: "The lower back lifting. Tuck the knees in to make it easier.",
    knee: "Tucked or bent-knee version is fine if straight legs strain the knee.",
    links: [
      { title: "Hollow Body Hold Progression", site: "YouTube · GMB Fitness", href: yt("LlDNef_Ztsc") },
      { title: "Hollow Body Hold Progressions", site: "YouTube · Zack Henderson", href: yt("HAfUt2Cco74") }
    ],
  },
  {
    name: "Single-arm plank",
    dose: "KB core, 3 rounds: 30s",
    cues: [
      "High plank, feet wider than hips",
      "Hand under shoulder, push the floor away",
      "Lift one hand to your hip, hips stay level",
      "Switch arms halfway"
    ],
    mistake: "Hips twisting or sagging when the hand lifts.",
    knee: "Stay on your toes with legs straight. Don't drop to the knees.",
    links: [
      { title: "Single Arm Plank Hold", site: "YouTube · Jenny LaBaw", href: yt("TdpIiHh2q5g") },
      { title: "Single Arm Plank", site: "ACE Fitness", href: "https://www.acefitness.org/resources/everyone/exercise-library/321/single-arm-plank/" }
    ],
  },
  {
    name: "Inverted-row isometric holds",
    dose: "3 × 20–30s",
    cues: [
      "Bar, Smith machine or straps at about waist height; body in a straight line",
      "Pull the chest to the bar, elbows back, shoulder blades squeezed",
      "Hold the top, or a mid-range position if the top bothers the right shoulder",
      "Breathe steadily. Raise the bar (more upright) to make it easier"
    ],
    mistake: "Letting the hips sag, or holding with a shrugged neck and no squeeze in the back.",
    knee: "Heels on the floor. Don't jump up to the bar or drop off it.",
    links: [
      { title: "35 second isometric hold with chest to bar", site: "YouTube", href: yt("4R9PzfMkrqA") }
    ],
  },
  {
    name: "Suitcase or farmer carry",
    dose: "3 × 30–40s each side (or both hands)",
    cues: [
      "One bell by your side (suitcase) or one in each hand if you have them (farmer)",
      "Stand tall, shoulders level, walk at an easy pace",
      "Moderate load — you should be able to walk smoothly and keep the hips even",
      "Put the bell down between sides. No overhead carries"
    ],
    mistake: "Leaning away from the weight, rushing, or going so heavy that the gait gets sloppy.",
    knee: "Easy, controlled walking only. Stop if the knee feels unstable or painful. No pivoting or turning under load.",
    links: [
      { title: "Suitcase VS Farmers Carry", site: "YouTube · Cem Trainer", href: yt("89Ojpz5GuLM") },
      { title: "Suitcase Hold", site: "YouTube · Mike Boyle Strength & Conditioning", href: yt("lHuqn4aZcVI") }
    ],
  }
];

// Day C · Chest, arms and push-ups
const dayC = [
  {
    name: "Paused flat dumbbell press",
    dose: "4 × 8 @ 22 kg, 1s pause · build to 4 × 10",
    cues: [
      "Shoulder blades pinned into the bench",
      "Lower to the sides of the chest, elbows at about 45°",
      "Pause one full second at the bottom",
      "Press up and in without clanking the dumbbells"
    ],
    mistake: "Cutting the pause short and bouncing out of the bottom.",
    knee: "Get the dumbbells up with your hands, not by kicking them off your knees.",
    links: [
      { title: "Dumbbell Pause Bench Press", site: "YouTube · Jordan Syatt", href: yt("3SUNUipUXcw") },
      { title: "Dumbbell Bench Press (Better Chest Activation)", site: "YouTube · Athlean-X", href: yt("SHsUIZiNdeY") }
    ],
  },
  {
    name: "Archer push-ups",
    dose: "3 × 6 per side, hands on a bench",
    cues: [
      "Hands on a bench, much wider than shoulders, body straight",
      "Shift over one hand and bend that arm",
      "Other arm stays long and straight",
      "Press back to centre, switch sides"
    ],
    mistake: "Hips twisting or sagging as you shift.",
    knee: "Hands on a bench is the standard. Stay on your toes, don't kneel on the sore knee.",
    links: [
      { title: "Archer Push Ups | Correct Form Tutorial", site: "YouTube · Victory Calisthenics", href: yt("A0r8ploEnZY") }
    ],
  },
  {
    name: "Pike push-ups",
    dose: "3 × 10",
    cues: [
      "Hips high in an upside-down V",
      "Hands shoulder-width, shoulders over the wrists",
      "Lower the top of your head towards the floor",
      "Press back up along the same line"
    ],
    mistake: "Flaring the elbows straight out to the sides.",
    knee: "Bend the knees slightly if a straight-leg pike pulls on the sore knee.",
    links: [
      { title: "How To Do Pike Push-Ups | Correct Form", site: "YouTube · Calixpert", href: yt("shEnAXgc9y4") }
    ],
  },
  {
    name: "Light chest-supported dumbbell row",
    dose: "3 × 20 @ 10–12 kg",
    cues: [
      "Incline bench at 30–45°, chest on the pad",
      "Light dumbbells, arms hanging",
      "Elbows back to the hips, squeeze the shoulder blades",
      "Steady tempo for the whole 20"
    ],
    mistake: "Shrugging up towards the ears as you tire.",
    knee: "Feet on the floor behind the bench. Don't kneel on the seat.",
    links: [
      { title: "Chest Supported Row – the correct way", site: "YouTube · Paul Oneid", href: yt("9p4-Xa_8MCw") }
    ],
  },
  {
    name: "Band pull-aparts",
    dose: "3 × 20",
    cues: [
      "Light band at shoulder height, arms straight",
      "Shoulders down and back first",
      "Pull the band apart until it touches your chest",
      "Let it come back slowly"
    ],
    mistake: "Bending the elbows or arching the lower back.",
    links: [
      { title: "How To Fix 3 Common Band Pull Apart Mistakes", site: "YouTube · Paul Clingan", href: yt("SLFDrgKarUs") },
      { title: "How to do a Band Pull Apart", site: "YouTube · Luke Selway", href: yt("qi2y-eI_kuI") }
    ],
  },
  {
    name: "Seated cable row",
    dose: "3 × 10 @ 40 kg",
    cues: [
      "Sit tall, chest up, neutral spine",
      "Pull the handle to your belly, elbows close",
      "Squeeze the shoulder blades at the end",
      "Let the arms extend slowly"
    ],
    mistake: "Rocking back and forth to move the weight.",
    knee: "Keep the knees slightly bent and comfortable on the foot plate. Use the chest-supported row instead if the position hurts.",
    links: [
      { title: "How To Do A Seated Cable Row", site: "YouTube · PureGym", href: yt("lJoozxC0Rns") },
      { title: "How to Seated Cable Row with Hunter Labrada", site: "YouTube · Bodybuilding.com", href: yt("EhAho9Szp-0") }
    ],
  },
  {
    name: "KB lateral-to-front raise",
    dose: "3 × 12 @ 4 kg",
    cues: [
      "Light bell, stand tall",
      "Raise out to the side to shoulder height",
      "Sweep it round to the front",
      "Lower slowly, no swinging"
    ],
    mistake: "Leaning back and swinging the bell up.",
    knee: "Do it seated if standing is uncomfortable.",
    links: [
      { title: "Single Kettlebell Lateral Raise to Front Raise", site: "YouTube · HoneGym", href: yt("r3fLJvwVIaw") }
    ],
  },
  {
    name: "Goblet curl to pullover",
    dose: "3 × 10 @ 16 kg",
    cues: [
      "Curl standing: hold the bell by the horns, elbows pinned to your ribs",
      "Do 10 curls, then lie back for the pullovers",
      "Pullover: bell over the chest, arc it behind your head and back using the lats",
      "16 kg for both parts unless the pullover needs a slightly lighter bell"
    ],
    mistake: "Swinging the curl with your back, or flaring the ribs on the pullover.",
    links: [
      { title: "Build Big Functional Biceps With Goblet Curls", site: "YouTube · The Bioneer", href: "https://www.youtube.com/shorts/QPRQFg3ZzxY" },
      { title: "Kettlebell Pullover", site: "YouTube · seanskahan", href: yt("0JGIeZ5RTDE") }
    ],
  },
  {
    name: "Rope triceps pushdown",
    dose: "3 × 10",
    cues: [
      "High pulley, rope, elbows pinned to your sides",
      "Push down, spread the rope at the bottom",
      "Squeeze the triceps",
      "Control it back up to about 90°"
    ],
    mistake: "Elbows drifting forward and leaning over the rope.",
    links: [
      { title: "Do Cable Tricep Pushdowns Like This", site: "YouTube · Mind Pump TV", href: yt("NtsMXK8haZx0") },
      { title: "How To – Tricep Rope Press Down", site: "YouTube · Hunter Labrada", href: yt("8CbJK7mmisE") }
    ],
  },
  {
    name: "Bird dog",
    dose: "3 × 10 per side",
    cues: [
      "Hands under shoulders, knees under hips",
      "Brace, flat back",
      "Reach one arm forward and the opposite leg back",
      "Hold for a second, return slowly"
    ],
    mistake: "The hips tipping or the lower back arching.",
    knee: "Kneel on a thick pad, or skip it and do an extra set of dead bugs if kneeling hurts.",
    links: [
      { title: "The Bird-Dog: Proper Form & Common Mistakes", site: "YouTube · Mission Move PT", href: yt("omBMXz-6RaM") },
      { title: "How to Do the Bird Dog Exercise", site: "YouTube · Hinge Health", href: yt("xEDnlOxeJH4") }
    ],
  },
  {
    name: "Light glute bridge",
    dose: "3 × 10–12",
    cues: [
      "On your back, feet flat, knees bent about 90°, heels under the knees",
      "Bodyweight first; a light kettlebell or dumbbell on the hips is optional",
      "Squeeze the glutes and lift to a straight line from shoulders to knees",
      "Pause at the top, then lower slowly. Don't push into a big lower-back arch"
    ],
    mistake: "Driving the ribs up and cranking the lower back instead of using the glutes.",
    knee: "Keep the bend comfortable — about 90°, no deep heel-to-hip tuck. Stop if the knee feels unstable.",
    links: [
      { title: "How to Do a Glute Bridge Exercise: A Guide from Physical Therapists", site: "YouTube", href: yt("PhTDzR0TpZs") },
      { title: "How to do a Glute bridge", site: "YouTube · NASM", href: yt("SKOMwg1JLrU") }
    ],
  }
];

// Paddle conditioning (pick one, or rotate)
const intervals = [
  {
    name: "Seated battle ropes",
    dose: "3–4 × 45s, rest 45–60s. You've done 3 × 45s.",
    cues: [
      "Sit tall, one rope end in each hand",
      "Alternating waves, shoulders down",
      "Torso stays still — drive the waves from the shoulders",
      "Rest 45–60s. Log each work interval in seconds"
    ],
    mistake: "Rocking the torso or kneeling on the sore knee.",
    knee: "Stay seated so the right knee takes no load. Bend the knees slightly if a long sit pulls on them.",
    links: [
      { title: "Battle Rope Seated Waves", site: "YouTube · Dangerously Fit", href: yt("BMS0bK7w4Io") }
    ],
  },
  {
    name: "SkiErg intervals",
    dose: "30s on / 60s off × 4 rounds at ~70%. Add a round each week, up to 6.",
    cues: [
      "Damper 4–5, soft knees, small hip hinge",
      "30 seconds at about 70%, then 60 seconds easy or off",
      "Start at 4 rounds. Add one round each week, up to 6",
      "Log the rounds you finished, and the damper in the level box"
    ],
    mistake: "Squatting the stroke, or starting so hard the last rounds fall apart.",
    knee: "No rowing until the physio clears your right knee. SkiErg only.",
    links: [
      { title: "Mastering SkiErg Form", site: "YouTube · The Barbell Physio", href: yt("klX-UF8mTy8") }
    ],
  },
  {
    name: "Straight-arm cable pulldown (paddle stroke)",
    dose: "3 × 15, slow and controlled",
    cues: [
      "High pulley, bar or rope, slight hip hinge",
      "Arms stay nearly straight, a small fixed elbow bend",
      "Sweep down like a paddle stroke",
      "Slow on the way down and on the way back"
    ],
    mistake: "Bending the elbows or rushing the reps so it becomes a pushdown.",
    knee: "Soft knees, feet planted. No rower.",
    links: [
      { title: "Straight-Arm Pulldown Complete Guide", site: "YouTube · DeltaBolic", href: yt("zECTZHrvuMg") }
    ],
  }
];

// Mobility routine · ~10 min
const mobility = [
  {
    name: "Cat-cow",
    dose: "× 10",
    cues: [
      "Hands under shoulders, knees under hips",
      "Breathe in: drop the belly, lift chest and tailbone",
      "Breathe out: round the back from the tailbone up",
      "Move slowly through the whole spine"
    ],
    mistake: "Only moving the lower back.",
    knee: "Kneel on a folded mat. Do it seated on a bench if kneeling hurts.",
    links: [
      { title: "How to do a Cat-Cow | The Right Way", site: "YouTube · Well+Good", href: yt("y_cKHKi9UaM") }
    ],
  },
  {
    name: "Thread the needle",
    dose: "× 8 per side",
    cues: [
      "Start on all fours",
      "Slide one arm under your body, palm up",
      "Let that shoulder and ear drop towards the floor",
      "Reach back up to the ceiling to open"
    ],
    mistake: "Shifting the hips sideways instead of rotating the upper back.",
    knee: "Kneel on padding, or skip it on days kneeling hurts and do extra thoracic rotations.",
    links: [
      { title: "Thread The Needle For Thoracic Rotation", site: "YouTube · Elite Performance Institute", href: yt("7C8-zj3nRro") }
    ],
  },
  {
    name: "Lying dumbbell thoracic rotation",
    dose: "× 10 per side",
    cues: [
      "Lie on your side, knees stacked and bent. Unweighted, or a very light dumbbell",
      "Arm straight up, then open it towards the floor behind you",
      "Follow the hand with your eyes. Pain-free range only on the right shoulder",
      "Return slowly. Keep the knees together"
    ],
    mistake: "Letting the knees and hips roll open too, or forcing the right shoulder to the floor.",
    knee: "Pillow between the knees if bending them is sore.",
    links: [
      { title: "Open Books (Sidelying Thoracic Rotation)", site: "YouTube · Revival Performance PT", href: yt("rDviWORCWEw") }
    ],
  },
  {
    name: "Grounded rotation (seated, tall-kneeling or quadruped)",
    dose: "2–3 × 8 per side",
    cues: [
      "Pick the position that feels best on the knee: seated, quadruped, or tall-kneeling if the knee is happy",
      "Unweighted. Rotate through the mid-back and hips, eyes following the turn",
      "Keep the planted knee quiet — no twisting over a bent, loaded knee",
      "Pain-free range only, especially on the right shoulder"
    ],
    mistake: "Yanking the shoulder or pivoting on a planted, bent knee.",
    knee: "Prefer seated or quadruped. Skip tall-kneeling if the knee objects, and don't twist on the sore side.",
    links: [
      { title: "Thread The Needle For Thoracic Rotation", site: "YouTube · Elite Performance Institute", href: yt("7C8-zj3nRro") }
    ],
  },
  {
    name: "Wall slides",
    dose: "× 12",
    cues: [
      "Forearms on the wall, elbows at 90°",
      "Ribs down, core braced",
      "Slide up while keeping forearms on the wall",
      "Lower slowly"
    ],
    mistake: "Arching your lower back to reach higher.",
    links: [
      { title: "How To Do Wall Slides", site: "YouTube · Live Lean TV", href: yt("jd1y1Hz4VAM") }
    ],
  },
  {
    name: "Dead hang",
    dose: "3 × 40s",
    cues: [
      "Overhand grip, shoulder-width",
      "Arms straight, body relaxed",
      "Breathe slowly, no swinging",
      "Step down when grip fades"
    ],
    mistake: "Jumping up to the bar or dropping off it.",
    knee: "Step up and down from a box. Never jump on or off.",
    links: [
      { title: "How to dead hang", site: "YouTube · Adam McCubbin", href: yt("3CEmHJXbNpc") },
      { title: "Dead Hang: Benefits and How To", site: "Healthline", href: "https://www.healthline.com/health/fitness-exercise/dead-hang" }
    ],
  }
];

// Travel KB · ~30 min · single kettlebell, no gym. Circuit then carries, rotation and core.
const travelKB = [
  {
    name: "Stick or broom mobility opener",
    dose: "2–3 min",
    cues: [
      "Broom, PVC or a light band. Wide grip, ribs down",
      "Slow pass-throughs: take it up, over and behind, then back, only in a pain-free range",
      "Open the chest and upper back: stick across the shoulders or behind the arms and gently open",
      "Easy standing or seated spinal rotations — turn from the mid-back, not the lower back"
    ],
    mistake: "Forcing a narrow grip, deep overhead squats, or cranking the right shoulder to end range.",
    knee: "Stay standing or seated. Skip deep stick squats and any lunging pass-throughs.",
    links: [
      { title: "Full Body PVC Pipe WarmUp", site: "YouTube · Kyle Gran", href: yt("Tzyl-Cl5Www") },
      { title: "Band Shoulder Dislocates", site: "YouTube · T Nation", href: yt("th1CUY49IzY") },
      { title: "Shoulder Passthroughs", site: "YouTube", href: yt("p-F-GywE92E") }
    ],
  },
  {
    name: "Travel circuit (how this session works)",
    dose: "After the opener: 3 rounds of the next 4 moves, ~45s each, short rest between rounds. Then carries, rotation and core. Whole session ~30 min.",
    cues: [
      "One kettlebell for the whole session",
      "Move steadily — this is quality work, not a sprint",
      "Goblet squats and reverse lunges stay light and shallow",
      "Stop any move that bothers the knee or right shoulder"
    ],
    mistake: "Loading the legs heavily, or turning the circuit into intervals that leave you cooked.",
    knee: "Light, controlled squats and reverse lunges only. No swings, cleans, jumping or pivoting.",
    links: [],
  },
  {
    name: "Single-arm kettlebell row",
    dose: "Circuit, 3 rounds: 8–10 per arm",
    cues: [
      "Hinge with a flat back, free hand on a chair, bench or your thigh",
      "Torso square to the floor",
      "Pull the bell to your hip with the elbow close",
      "Lower under control to a full stretch"
    ],
    mistake: "Twisting the torso open to lift the bell.",
    knee: "Stand in a split stance with your hand on the bench. Don't kneel on the bench with the sore knee.",
    links: [
      { title: "Tutorial: Kettlebell Single Arm Row", site: "YouTube · Keanu Soto", href: yt("rQqDQkbbNrk") }
    ],
  },
  {
    name: "KB floor press or push-ups",
    dose: "Circuit, 3 rounds: 8–10 per arm, or 8–12 push-ups",
    cues: [
      "Floor press: lie on the floor, upper arm at about 45°, lower until the elbow lightly touches, then press",
      "Or do push-ups (hands on a bench or the floor) if that fits better today",
      "Keep the torso quiet — no twisting or sagging",
      "Use the bell you have; this is not a max-effort set"
    ],
    mistake: "Bouncing the elbow, or sagging the hips on push-ups.",
    knee: "Keep the sore leg straight on the floor if bending it hurts.",
    links: [
      { title: "1 Arm Kettlebell Floor Press Exercise Tutorial", site: "YouTube · Luka Hocevar", href: yt("B340QckIfJM") }
    ],
  },
  {
    name: "Light goblet squat or reverse lunge",
    dose: "Circuit, 3 rounds: goblet squats × 8, or reverse lunges × 6 per side. Alternate rounds.",
    cues: [
      "Goblet squat: hold the bell at the chest, sit down only as far as is comfortable — no deep bend",
      "Reverse lunge: step back lightly, lower under control, stand up without pushing off the back foot hard",
      "Alternate rounds (squat, lunge, squat) or pick the one that feels better on the knee today",
      "Light bell, slow tempo, stay balanced"
    ],
    mistake: "Dropping into a deep squat or a long, heavy lunge, or walking lunges.",
    knee: "Shallow and controlled only. No walking lunges, no jumping, no twisting. Stop if it feels unstable or painful.",
    links: [],
  },
  {
    name: "Light glute bridge",
    dose: "Circuit, 3 rounds: 10–12",
    cues: [
      "On your back, feet flat, knees bent about 90°, heels under the knees",
      "Bodyweight first; a light kettlebell or dumbbell on the hips is optional",
      "Squeeze the glutes and lift to a straight line from shoulders to knees",
      "Pause at the top, then lower slowly. Don't push into a big lower-back arch"
    ],
    mistake: "Driving the ribs up and cranking the lower back instead of using the glutes.",
    knee: "Keep the bend comfortable — about 90°, no deep heel-to-hip tuck. Stop if the knee feels unstable.",
    links: [
      { title: "How to Do a Glute Bridge Exercise: A Guide from Physical Therapists", site: "YouTube", href: yt("PhTDzR0TpZs") },
      { title: "How to do a Glute bridge", site: "YouTube · NASM", href: yt("SKOMwg1JLrU") }
    ],
  },
  {
    name: "Suitcase or farmer carry",
    dose: "3 × 30–40s each side, after the circuit",
    cues: [
      "One bell by your side (suitcase) or one in each hand if you have them (farmer)",
      "Stand tall, shoulders level, walk at an easy pace",
      "Moderate load — you should be able to walk smoothly and keep the hips even",
      "Put the bell down between sides. No overhead carries"
    ],
    mistake: "Leaning away from the weight, rushing, or going so heavy that the gait gets sloppy.",
    knee: "Easy, controlled walking only. Stop if the knee feels unstable or painful. No pivoting or turning under load.",
    links: [
      { title: "Suitcase VS Farmers Carry", site: "YouTube · Cem Trainer", href: yt("89Ojpz5GuLM") },
      { title: "Suitcase Hold", site: "YouTube · Mike Boyle Strength & Conditioning", href: yt("lHuqn4aZcVI") }
    ],
  },
  {
    name: "Grounded rotation (seated, tall-kneeling or quadruped)",
    dose: "2 × 8 per side",
    cues: [
      "Pick the position that feels best on the knee: seated, quadruped, or tall-kneeling if the knee is happy",
      "Unweighted. Rotate through the mid-back and hips, eyes following the turn",
      "Keep the planted knee quiet — no twisting over a bent, loaded knee",
      "Pain-free range only, especially on the right shoulder"
    ],
    mistake: "Yanking the shoulder or pivoting on a planted, bent knee.",
    knee: "Prefer seated or quadruped. Skip tall-kneeling if the knee objects, and don't twist on the sore side.",
    links: [
      { title: "Thread The Needle For Thoracic Rotation", site: "YouTube · Elite Performance Institute", href: yt("7C8-zj3nRro") }
    ],
  },
  {
    name: "Dead bug",
    dose: "2 × 8–10 per side",
    cues: [
      "On your back, hips and knees at 90°, arms up",
      "Press the lower back into the floor",
      "Reach one arm back and the opposite leg out",
      "Breathe out as you extend, return slowly"
    ],
    mistake: "The lower back lifting off the floor. Make the reach shorter.",
    knee: "Keep the knee bent when you extend that leg, and tap the heel down.",
    links: [
      { title: "How to Do a Dead Bug", site: "YouTube · Hinge Health", href: yt("GbSC02oU3To") },
      { title: "Physical Therapy – Dead Bug Exercise", site: "YouTube · ChoosePT", href: yt("8NBNM8haZx0") }
    ],
  }
];


// Later, once the physio clears the knee (not programmed yet):
// banded or standard KB swings, trap-bar deadlifts, 45° hip extensions,
// Cossack squats, sled pushes, heavier hip thrusts. 90/90 hip switches can also return.

window.EX = { warmup, warmupA, dayA, dayB, dayC, intervals, mobility, travelKB };
