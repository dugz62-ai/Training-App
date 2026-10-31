// Generated from Douglas's Training Programme – Exercise Guide Page. Do not hand-edit links.
const yt = (id) => `https://www.youtube.com/watch?v=${id}`;

const warmup = [
  {
    name: "Arm bike or upper-body bike",
    dose: "5 min easy",
    cues: ["Crank axle at about shoulder height", "Soft elbows at full reach, never locked", "Sit tall, shoulders down, smooth rhythm", "Mix forward and backward cranking"],
    mistake: "Going hard straight away. This is just to get warm.",
    knee: "Seated arm bike only. Keep feet flat and legs still.",
    links: [{ title: "Exercise Tutorial: Technogym Arm Ergometer", site: "YouTube · Travis Tarrant", href: yt("BLVu198om5g") }],
  },
  {
    name: "Thoracic rotations",
    dose: "8 each side",
    cues: ["Lie on your side, knees bent and stacked", "Arms out in front, palms together", "Open the top arm across and follow it with your eyes", "Breathe out as you rotate and let the shoulder sink"],
    mistake: "Letting the knees and hips roll back with the arm. Rotate from the mid-back.",
    knee: "Put a cushion between the knees if bending them is sore.",
    links: [{ title: "Thoracic Rotation Open Book", site: "YouTube · Elite Performance Institute", href: yt("peeW19ofFUg") }],
  },
  {
    name: "Wall slides",
    dose: "10–12",
    cues: ["Forearms on the wall, elbows at 90°", "Ribs down and core braced", "Slide up while keeping forearms on the wall", "Lower slowly to the start"],
    mistake: "Arching your lower back to reach higher.",
    links: [{ title: "How To Do Wall Slides", site: "YouTube · Live Lean TV", href: yt("jd1y1Hz4VAM") }],
  },
  {
    name: "Band dislocates (shoulder pass-throughs)",
    dose: "10–12",
    cues: ["Light band, very wide grip, arms straight", "Lift it slowly up, over and behind you", "Come back the same way", "Narrow the grip only when it's pain-free"],
    mistake: "Bending the elbows or arching the back to get it over.",
    links: [{ title: "Band Shoulder Dislocates", site: "YouTube · T Nation", href: yt("th1CUY49IzY") }],
  },
];

const dayA = [
  {
    name: "Single-arm incline dumbbell press",
    dose: "4 × 8–10 each side",
    cues: ["Bench at 30–45°, free hand braced on the bench or hip", "Ribs down — don't let the torso twist toward the working side", "Lower to chest level under control", "Press up and slightly in"],
    mistake: "Rotating or shrugging toward the dumbbell.",
    knee: "Get the dumbbell up with your hand, not by kicking it off your knee.",
    links: [{ title: "How to do a Single-Arm Incline Dumbbell Chest Press", site: "YouTube · NASM", href: yt("iJ-GwVeUuCg") }],
  },
  {
    name: "Chest-supported row",
    dose: "4 × 10",
    cues: ["Chest stays glued to the pad", "Let the arms hang so the shoulder blades stretch forward", "Pull the elbows back towards your hips", "Lower slowly to a full stretch"],
    mistake: "Lifting your chest off the pad to heave the weight.",
    knee: "Stand on the floor or the foot plate, never kneel on the bench with the sore knee.",
    links: [{ title: "Chest Supported Row", site: "YouTube · Renaissance Periodization", href: yt("4Idz7uwm3OU") }],
  },
  {
    name: "Flat barbell bench press",
    dose: "3 × 8",
    cues: ["Eyes under the bar, grip a bit wider than shoulders", "Shoulder blades squeezed back and down", "Lower to the lower chest with elbows at about 45°", "Press up and slightly back towards your face"],
    mistake: "Bouncing the bar off the chest or losing upper-back tightness.",
    knee: "Skip heavy leg drive for now. Feet flat, firm but gentle.",
    links: [{ title: "How To Get A Huge Bench Press with Perfect Technique", site: "YouTube · Jeff Nippard", href: yt("vcBig73ojpE") }],
  },
  {
    name: "Low-to-high cable fly",
    dose: "3 × 12",
    cues: ["Pulleys set low, a step forward from the stack", "Slight bend in the elbows, kept fixed", "Sweep up and in to upper-chest height", "Pause at the top, control the stretch down"],
    mistake: "Bending and straightening the arms, so it becomes a press or curl.",
    knee: "Use a split stance you're comfortable with, or sit on a bench between the cables.",
    links: [
      { title: "Cable Incline Flye", site: "YouTube · Renaissance Periodization", href: yt("UPGRju60F60") },
      { title: "Low-To-High Cable Fly", site: "YouTube · ScottHermanFitness", href: yt("eQ_NBB6OBH4") },
    ],
  },
  {
    name: "KB halos",
    dose: "Finisher, 3 rounds: × 8 each way",
    cues: ["Light bell held upside down by the horns", "Circle it close around your head", "Keep the head still and the core braced", "Go slowly, alternate directions"],
    mistake: "Moving your head out of the way or arching your back.",
    knee: "Do them seated on a bench if standing bothers the knee.",
    links: [
      { title: "Kettlebell Halo Tutorial", site: "YouTube · Brittany van Schravendijk", href: yt("Sci3lijQBmk") },
      { title: "Kettlebell Halo", site: "YouTube · Onnit Academy", href: yt("wJcmanVh5EE") },
    ],
  },
  {
    name: "KB pullovers",
    dose: "Finisher, 3 rounds: × 10",
    cues: ["Lie on a bench or the floor, bell over your chest by the horns", "Small fixed bend in the elbows", "Lower in an arc behind your head to a lat stretch", "Pull it back over the chest with your lats"],
    mistake: "Letting the ribs flare and the lower back arch at the bottom.",
    links: [{ title: "Kettlebell Pullover", site: "YouTube · seanskahan", href: yt("0JGIeZ5RTDE") }],
  },
  {
    name: "KB single-arm floor press",
    dose: "Finisher, 3 rounds: × 10 each arm",
    cues: ["Lie on the floor, upper arm at about 45° from your body", "Wrist straight, bell sitting over the forearm", "Lower until the elbow lightly touches the floor", "Press up without twisting your torso"],
    mistake: "Bouncing the elbow off the floor.",
    knee: "Keep the sore leg straight on the floor if bending it hurts.",
    links: [{ title: "1 Arm Kettlebell Floor Press Exercise Tutorial", site: "YouTube · Luka Hocevar", href: yt("B340QckIfJM") }],
  },
  {
    name: "Dead bug",
    dose: "3 × 10 per side",
    cues: ["On your back, hips and knees at 90°, arms up", "Press the lower back into the floor", "Reach one arm back and the opposite leg out", "Breathe out as you extend, return slowly"],
    mistake: "The lower back lifting off the floor. Make the reach shorter.",
    knee: "Keep the knee bent when you extend that leg, and tap the heel down.",
    links: [
      { title: "How to Do a Dead Bug", site: "YouTube · Hinge Health", href: yt("GbSC02oU3To") },
      { title: "Physical Therapy – Dead Bug Exercise", site: "YouTube · ChoosePT", href: yt("8NBNM8haZx0") },
    ],
  },
  {
    name: "Prone Y-T-W raises (light plates)",
    dose: "2 rounds × 8 each letter",
    cues: ["Face down, forehead on a towel, thumbs up", "Y: arms overhead in a Y, lift a few cm", "T: arms out to the sides, lift", "W: elbows bent, pull them back and squeeze"],
    mistake: "Shrugging, or lifting your chest to get the arms higher.",
    knee: "Put a folded towel under the knees if lying face down presses on the sore one.",
    links: [{ title: "Shoulder Mobility | Prone YTW", site: "YouTube · Cali Hoss", href: yt("TMnRKdNOrrA") }],
  },
  {
    name: "Prone cobra hold",
    dose: "3 × 30s",
    cues: ["Face down, arms by your sides", "Lift the chest a little, shoulder blades down and back", "Turn the thumbs up towards the ceiling", "Chin tucked, eyes on the floor"],
    mistake: "Cranking the head up and arching through the lower back.",
    knee: "Towel under the knees if needed.",
    links: [{ title: "Prone Cobra", site: "YouTube · CrossFit LA", href: yt("kdWi2eCkvHY") }],
  },
];

const dayB = [
  {
    name: "Lat pulldown or assisted pull-up",
    dose: "4 × 8–10",
    cues: ["Grip a bit wider than shoulders, thighs under the pad", "Slight lean back, chest up", "Drive the elbows down to your ribs, bar to the upper chest", "Control it all the way up to a full stretch"],
    mistake: "Swinging back to yank the weight down.",
    knee: "Lat pulldown is the safer pick. The assisted machine has you kneeling on a pad, so skip it until the knee is fine with that.",
    links: [
      { title: "Proper Lat Pulldown Tutorial", site: "YouTube · Moose The Physio", href: yt("XpItbVgoCiI") },
      { title: "How To Use The Assisted Pull Up Machine", site: "YouTube · PureGym", href: yt("wFj808u2HWU") },
    ],
  },
  {
    name: "Seated dumbbell shoulder press",
    dose: "3 × 10",
    cues: ["Back supported, bench upright or slightly reclined", "Start with dumbbells at ear height, elbows slightly forward", "Press up and slightly in", "Lower to about 90° at the elbow"],
    mistake: "Arching off the backrest as the set gets hard.",
    knee: "Get the dumbbells up with your arms, not by kicking them off your knees.",
    links: [{ title: "How To: Seated Dumbbell Shoulder Press", site: "YouTube · Kade Howell", href: yt("E9ShwbwZ1zw") }],
  },
  {
    name: "Single-arm kettlebell row",
    dose: "3 × 10 per arm · alternate KB and DB week to week",
    cues: ["Hinge with a flat back, free hand on a bench", "Torso square to the floor", "Pull the bell to your hip with the elbow close", "Lower under control to a full stretch", "Single-arm DB row is the same pattern — swap the kettlebell for a dumbbell on alternate weeks"],
    mistake: "Twisting the torso open to lift the bell.",
    knee: "Stand in a split stance with your hand on the bench. Don't kneel on the bench with the sore knee.",
    links: [{ title: "Tutorial: Kettlebell Single Arm Row", site: "YouTube · Keanu Soto", href: yt("rQqDQkbbNrk") }],
  },
  {
    name: "Straight-arm cable pulldown",
    dose: "3 × 15",
    cues: ["High pulley, bar or rope, step back", "Slight hip hinge, small fixed elbow bend", "Sweep the bar down to your thighs using your lats", "Let it rise slowly to a stretch overhead"],
    mistake: "Bending the elbows so it becomes a triceps pushdown.",
    links: [
      { title: "Straight-Arm Pulldown Complete Guide", site: "YouTube · DeltaBolic", href: yt("zECTZHrvuMg") },
      { title: "How To Do The Straight Arm Pulldown", site: "Athlean-X", href: "https://learn.athleanx.com/articles/back-for-men/how-to-do-a-straight-arm-pulldown" },
    ],
  },
  {
    name: "Cable external rotation",
    dose: "3 × 15 per arm",
    cues: ["Pulley at elbow height, stand side-on", "Elbow at 90° and pinned to your side", "Rotate the forearm out, away from your belly", "Return slowly. Keep it light"],
    mistake: "Letting the elbow drift off your side or twisting the torso.",
    knee: "Tuck a rolled towel between elbow and ribs to keep it in place.",
    links: [{ title: "Cable Shoulder External Rotation", site: "YouTube · Physio Plus Fitness", href: yt("GxDF2AYsI1Q") }],
  },
  {
    name: "KB side bends",
    dose: "KB core, 3 rounds: 30s each side",
    cues: ["Stand tall, bell in one hand by your side", "Bend straight sideways, bell sliding down the leg", "Come back up using the opposite side of your waist", "Hips and shoulders stay square"],
    mistake: "Leaning forward or twisting instead of bending sideways.",
    knee: "Knees soft and still. Stand with feet a bit wider for balance.",
    links: [{ title: "Kettlebell Side Bend", site: "YouTube · FIT Sisters", href: yt("9UtNxvpL65o") }],
  },
  {
    name: "Hollow hold",
    dose: "KB core, 3 rounds: 30s",
    cues: ["On your back, lower back pressed into the floor", "Lift shoulders and legs off the floor", "Arms by your ears or by your sides", "Breathe shallow, hold the shape"],
    mistake: "The lower back lifting. Tuck the knees in to make it easier.",
    knee: "Tucked or bent-knee version is fine if straight legs strain the knee.",
    links: [
      { title: "Hollow Body Hold Progression", site: "YouTube · GMB Fitness", href: yt("LlDNef_Ztsc") },
      { title: "Hollow Body Hold Progressions", site: "YouTube · Zack Henderson", href: yt("HAfUt2Cco74") },
    ],
  },
  {
    name: "Single-arm plank",
    dose: "KB core, 3 rounds: 30s",
    cues: ["High plank, feet wider than hips", "Hand under shoulder, push the floor away", "Lift one hand to your hip, hips stay level", "Switch arms halfway"],
    mistake: "Hips twisting or sagging when the hand lifts.",
    knee: "Stay on your toes with legs straight. Don't drop to the knees.",
    links: [
      { title: "Single Arm Plank Hold", site: "YouTube · Jenny LaBaw", href: yt("TdpIiHh2q5g") },
      { title: "Single Arm Plank", site: "ACE Fitness", href: "https://www.acefitness.org/resources/everyone/exercise-library/321/single-arm-plank/" },
    ],
  },
  {
    name: "Superman hold",
    dose: "3 × 30s",
    cues: ["Face down, arms overhead, legs long", "Lift arms, chest and legs a few cm", "Squeeze glutes and upper back", "Eyes on the floor, neck long"],
    mistake: "Lifting too high and crunching the lower back.",
    knee: "Lift arms only (or arms and the good leg) if lifting the sore leg hurts.",
    links: [{ title: "Superman Hold Exercise | Form, Tips & Common Mistakes", site: "YouTube · FIT.nl", href: yt("g0Kr9Wd3CeQ") }],
  },
  {
    name: "Suitcase hold",
    dose: "3 × 30–40s each side",
    cues: ["Heavy dumbbell or kettlebell in one hand", "Stand tall, shoulders level", "Don't lean toward or away from the weight", "Hold still — no steps"],
    mistake: "Leaning over to the side of the weight.",
    knee: "Static only. No walking. Walking carries come back after the physio clears the knee.",
    links: [{ title: "Suitcase Hold", site: "YouTube · Mike Boyle Strength & Conditioning", href: yt("lHuqn4aZcVI") }],
  },
];

const dayC = [
  {
    name: "Paused flat dumbbell press",
    dose: "4 × 10 (1s pause)",
    cues: ["Shoulder blades pinned into the bench", "Lower to the sides of the chest, elbows at about 45°", "Pause one full second at the bottom", "Press up and in without clanking the dumbbells"],
    mistake: "Cutting the pause short and bouncing out of the bottom.",
    knee: "Get the dumbbells up with your hands, not by kicking them off your knees.",
    links: [
      { title: "Dumbbell Pause Bench Press", site: "YouTube · Jordan Syatt", href: yt("3SUNUipUXcw") },
      { title: "Dumbbell Bench Press (Better Chest Activation)", site: "YouTube · Athlean-X", href: yt("SHsUIZiNdeY") },
    ],
  },
  {
    name: "Archer push-ups",
    dose: "3 rounds: × 6 per side",
    cues: ["Hands much wider than shoulders, body straight", "Shift over one hand and bend that arm", "Other arm stays long and straight", "Press back to centre, switch sides"],
    mistake: "Hips twisting or sagging as you shift.",
    knee: "Hands on a bench to make it easier. Stay on your toes, don't kneel on the sore knee.",
    links: [{ title: "Archer Push Ups | Correct Form Tutorial", site: "YouTube · Victory Calisthenics", href: yt("A0r8ploEnZY") }],
  },
  {
    name: "Pike push-ups",
    dose: "3 rounds: × 8",
    cues: ["Hips high in an upside-down V", "Hands shoulder-width, shoulders over the wrists", "Lower the top of your head towards the floor", "Press back up along the same line"],
    mistake: "Flaring the elbows straight out to the sides.",
    knee: "Bend the knees slightly if a straight-leg pike pulls on the sore knee.",
    links: [{ title: "How To Do Pike Push-Ups | Correct Form", site: "YouTube · Calixpert", href: yt("shEnAXgc9y4") }],
  },
  {
    name: "Light chest-supported dumbbell row",
    dose: "3 × 20",
    cues: ["Incline bench at 30–45°, chest on the pad", "Light dumbbells, arms hanging", "Elbows back to the hips, squeeze the shoulder blades", "Steady tempo for the whole 20"],
    mistake: "Shrugging up towards the ears as you tire.",
    knee: "Feet on the floor behind the bench. Don't kneel on the seat.",
    links: [{ title: "Chest Supported Row – the correct way", site: "YouTube · Paul Oneid", href: yt("9p4-Xa_8MCw") }],
  },
  {
    name: "Band pull-aparts",
    dose: "3 × 20",
    cues: ["Light band at shoulder height, arms straight", "Shoulders down and back first", "Pull the band apart until it touches your chest", "Let it come back slowly"],
    mistake: "Bending the elbows or arching the lower back.",
    links: [
      { title: "How To Fix 3 Common Band Pull Apart Mistakes", site: "YouTube · Paul Clingan", href: yt("SLFDrgKarUs") },
      { title: "How to do a Band Pull Apart", site: "YouTube · Luke Selway", href: yt("qi2y-eI_kuI") },
    ],
  },
  {
    name: "Seated cable row",
    dose: "3 × 12",
    cues: ["Sit tall, chest up, neutral spine", "Pull the handle to your belly, elbows close", "Squeeze the shoulder blades at the end", "Let the arms extend slowly"],
    mistake: "Rocking back and forth to move the weight.",
    knee: "Keep the knees slightly bent and comfortable on the foot plate. Use the chest-supported row instead if the position hurts.",
    links: [
      { title: "How To Do A Seated Cable Row", site: "YouTube · PureGym", href: yt("lJoozxC0Rns") },
      { title: "How to Seated Cable Row with Hunter Labrada", site: "YouTube · Bodybuilding.com", href: yt("EhAho9Szp-0") },
    ],
  },
  {
    name: "KB lateral-to-front raise",
    dose: "3 × 10",
    cues: ["Light bell, stand tall", "Raise out to the side to shoulder height", "Sweep it round to the front", "Lower slowly, no swinging"],
    mistake: "Leaning back and swinging the bell up.",
    knee: "Do it seated if standing is uncomfortable.",
    links: [{ title: "Single Kettlebell Lateral Raise to Front Raise", site: "YouTube · HoneGym", href: yt("r3fLJvwVIaw") }],
  },
  {
    name: "Goblet curl to pullover",
    dose: "3 × 10",
    cues: ["Curl: hold the bell by the horns, elbows pinned to your ribs", "Curl to the chest, lower slowly", "Pullover: lie back, bell over the chest", "Arc it behind your head and back using the lats"],
    mistake: "Swinging the curl with your back, or flaring the ribs on the pullover.",
    links: [
      { title: "Build Big Functional Biceps With Goblet Curls", site: "YouTube · The Bioneer", href: "https://www.youtube.com/shorts/QPRQFg3ZzxY" },
      { title: "Kettlebell Pullover", site: "YouTube · seanskahan", href: yt("0JGIeZ5RTDE") },
    ],
  },
  {
    name: "Rope triceps pushdown",
    dose: "3 × 10",
    cues: ["High pulley, rope, elbows pinned to your sides", "Push down, spread the rope at the bottom", "Squeeze the triceps", "Control it back up to about 90°"],
    mistake: "Elbows drifting forward and leaning over the rope.",
    links: [
      { title: "Do Cable Tricep Pushdowns Like This", site: "YouTube · Mind Pump TV", href: yt("NtsMXK8rxX0") },
      { title: "How To – Tricep Rope Press Down", site: "YouTube · Hunter Labrada", href: yt("8CbJK7mmisE") },
    ],
  },
  {
    name: "Bird dog",
    dose: "3 × 10 per side",
    cues: ["Hands under shoulders, knees under hips", "Brace, flat back", "Reach one arm forward and the opposite leg back", "Hold for a second, return slowly"],
    mistake: "The hips tipping or the lower back arching.",
    knee: "Kneel on a thick pad, or skip it and do an extra set of dead bugs if kneeling hurts.",
    links: [
      { title: "The Bird-Dog: Proper Form & Common Mistakes", site: "YouTube · Mission Move PT", href: yt("omBMXz-6RaM") },
      { title: "How to Do the Bird Dog Exercise", site: "YouTube · Hinge Health", href: yt("xEDnlOxeJH4") },
    ],
  },
  {
    name: "Overhead KB hold",
    dose: "3 × 30s each side",
    cues: ["Arm locked out, bicep by the ear", "Ribs down, glutes squeezed", "Bell stacked over the shoulder — stand still, no steps", "Stop if the lower back arches"],
    mistake: "Arching the lower back to keep the bell up.",
    knee: "Static only. No walking. Walking carries come back after the physio clears the knee.",
    links: [{ title: "Single arm overhead hold", site: "YouTube · Exercise Physiology Brisbane", href: yt("mXKFXCuJTs0") }],
  },
];

const intervals = [
  {
    name: "Arm-bike paddle intervals",
    dose: "5 min easy, 8 × (30s hard / 60s easy), 5 min cool-down",
    cues: ["Set up like the warm-up: axle at about shoulder height", "Hard: fast and strong, as if paddling for a wave", "Easy: slow spin, catch your breath", "Add one round a week, up to 12"],
    mistake: "Going so hard in round 1 that the last rounds fall apart.",
    knee: "Seated with feet flat. No rower or stair machine for now.",
    links: [
      { title: "Exercise Tutorial: Technogym Arm Ergometer", site: "YouTube · Travis Tarrant", href: yt("BLVu198om5g") },
      { title: "15 Minute Intervals + Arms Cycling Workout", site: "YouTube · Move with Char", href: yt("9rS3u2CYycg") },
    ],
  },
];

const mobility = [
  {
    name: "Cat-cow",
    dose: "× 10",
    cues: ["Hands under shoulders, knees under hips", "Breathe in: drop the belly, lift chest and tailbone", "Breathe out: round the back from the tailbone up", "Move slowly through the whole spine"],
    mistake: "Only moving the lower back.",
    knee: "Kneel on a folded mat. Do it seated on a bench if kneeling hurts.",
    links: [{ title: "How to do a Cat-Cow | The Right Way", site: "YouTube · Well+Good", href: yt("y_cKHKi9UaM") }],
  },
  {
    name: "Thread the needle",
    dose: "× 8 per side",
    cues: ["Start on all fours", "Slide one arm under your body, palm up", "Let that shoulder and ear drop towards the floor", "Reach back up to the ceiling to open"],
    mistake: "Shifting the hips sideways instead of rotating the upper back.",
    knee: "Kneel on padding, or skip it on days kneeling hurts and do extra thoracic rotations.",
    links: [{ title: "Thread The Needle For Thoracic Rotation", site: "YouTube · Elite Performance Institute", href: yt("7C8-zj3nRro") }],
  },
  {
    name: "Lying dumbbell thoracic rotation",
    dose: "× 10 per side",
    cues: ["Lie on your side, knees stacked and bent, light dumbbell in hand", "Arm straight up, then open it towards the floor behind you", "Follow the dumbbell with your eyes", "Return slowly. Keep the knees together"],
    mistake: "Letting the knees and hips roll open too.",
    knee: "Pillow between the knees if bending them is sore.",
    links: [{ title: "Open Books (Sidelying Thoracic Rotation)", site: "YouTube · Revival Performance PT", href: yt("rDviWORCWEw") }],
  },
  {
    name: "90/90 hip switches",
    dose: "× 8 per side (only if the knee is fine)",
    cues: ["Sit with both knees bent at about 90°, one in front and one to the side", "Sit tall, hands behind you if needed", "Rotate both knees over to the other side", "Move slowly, don't force the knees down"],
    mistake: "Slumping back or rushing the switch.",
    knee: "This twists the knee. Skip it completely if there's any pain, and wait for the physio's OK.",
    links: [
      { title: "90 90 Hip Switch", site: "YouTube · The Active Life", href: yt("m51AZSXMvEA") },
      { title: "How To Do The 90/90 Stretch (Correctly!)", site: "YouTube · Pippin Performance", href: yt("MH919hRvrVE") },
    ],
  },
  {
    name: "Wall slides",
    dose: "× 12",
    cues: ["Forearms on the wall, elbows at 90°", "Ribs down, core braced", "Slide up while keeping forearms on the wall", "Lower slowly"],
    mistake: "Arching your lower back to reach higher.",
    links: [{ title: "How To Do Wall Slides", site: "YouTube · Live Lean TV", href: yt("jd1y1Hz4VAM") }],
  },
  {
    name: "Dead hang",
    dose: "3 × 20–30s",
    cues: ["Overhand grip, shoulder-width", "Arms straight, body relaxed", "Breathe slowly, no swinging", "Step down when grip fades"],
    mistake: "Jumping up to the bar or dropping off it.",
    knee: "Step up and down from a box. Never jump on or off.",
    links: [
      { title: "How to dead hang", site: "YouTube · Adam McCubbin", href: yt("3CEmHJXbNpc") },
      { title: "Dead Hang: Benefits and How To", site: "Healthline", href: "https://www.healthline.com/health/fitness-exercise/dead-hang" },
    ],
  },
];


window.EX = { warmup, dayA, dayB, dayC, intervals, mobility };
