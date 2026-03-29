/**
 * Each level: man, door, switch, obstacle use { x, groundY? }.
 * groundY matches floor `y` in levels.js (before horizon offset)—omit when on the leftmost floor.
 */
export const levels = [
  {
    id: 1,
    title: "The outer gate",
    objective: "Stand on the plate, then pass the roller when it swings away.",
    man: { x: 30 },
    door: { x: 680 },
    switch: { x: 380 },
    obstacle: { x: 860 },
    speed: 165,
    floors: [{ x: 0, y: 450, width: 960, height: 50 }],
  },

  {
    id: 2,
    title: "Broken causeway",
    objective: "Jump the gap first—then find the plate and the exit.",
    man: { x: 35 },
    door: { x: 820 },
    switch: { x: 200 },
    obstacle: { x: 0 },
    speed: 185,
    floors: [
      { x: 0, y: 450, width: 290, height: 50 },
      { x: 400, y: 450, width: 600, height: 50 },
    ],
  },

  {
    id: 3,
    title: "The high switch",
    objective: "Climb up to the ledge to press the plate, then return to ground for the door.",
    man: { x: 40, groundY: 450 },
    door: { x: 780, groundY: 450 },
    switch: { x: 410, groundY: 360 },
    obstacle: { x: 140, groundY: 450 },
    speed: 200,
    floors: [
      { x: 0, y: 450, width: 270, height: 50 },
      { x: 330, y: 360, width: 240, height: 50 },
      { x: 620, y: 450, width: 380, height: 50 },
    ],
  },

  {
    id: 4,
    title: "Shifting stone",
    objective: "Ride the moving platform across—time your landing on the far side.",
    man: { x: 35 },
    door: { x: 820 },
    switch: { x: 160 },
    obstacle: { x: 520 },
    speed: 200,
    floors: [
      { x: 0, y: 450, width: 300, height: 50 },
      { x: 360, y: 400, width: 220, height: 50, speed: 75 },
      { x: 640, y: 450, width: 360, height: 50 },
    ],
  },

  {
    id: 5,
    title: "Patrol corridor",
    objective: "After the plate, slip past the roller in the narrow stretch before the door.",
    man: { x: 40 },
    door: { x: 780 },
    switch: { x: 220 },
    obstacle: { x: 480 },
    speed: 230,
    floors: [
      { x: 0, y: 450, width: 360, height: 50 },
      { x: 400, y: 450, width: 580, height: 50 },
    ],
  },

  {
    id: 6,
    title: "Three landings",
    objective: "Ascend each tier: plate on the middle, exit on the top.",
    man: { x: 35, groundY: 450 },
    door: { x: 860, groundY: 320 },
    switch: { x: 400, groundY: 380 },
    obstacle: { x: 700, groundY: 320 },
    speed: 245,
    floors: [
      { x: 0, y: 450, width: 260, height: 50 },
      { x: 300, y: 380, width: 200, height: 50 },
      { x: 540, y: 320, width: 440, height: 50 },
    ],
  },

  {
    id: 7,
    title: "Twin bridges",
    objective: "Two moving spans—cross both, then thread the hazard to the door.",
    man: { x: 30 },
    door: { x: 860 },
    switch: { x: 140 },
    obstacle: { x: 620 },
    speed: 265,
    floors: [
      { x: 0, y: 450, width: 280, height: 50 },
      { x: 320, y: 410, width: 160, height: 50, speed: 115 },
      { x: 520, y: 360, width: 160, height: 50, speed: 95 },
      { x: 720, y: 450, width: 280, height: 50 },
    ],
  },

  {
    id: 8,
    title: "Last-inch squeeze",
    objective: "Plate on the left, then weave past the roller on the mid tier to the high exit.",
    man: { x: 40, groundY: 450 },
    door: { x: 720, groundY: 330 },
    switch: { x: 120, groundY: 450 },
    obstacle: { x: 520, groundY: 380 },
    speed: 285,
    floors: [
      { x: 0, y: 450, width: 340, height: 50 },
      { x: 380, y: 380, width: 240, height: 50 },
      { x: 660, y: 330, width: 340, height: 50 },
    ],
  },

  {
    id: 9,
    title: "Stepping stones",
    objective: "Small ledges—no room for sloppy jumps. Plate is mid-path; door at the end.",
    man: { x: 25, groundY: 450 },
    door: { x: 900, groundY: 450 },
    switch: { x: 430, groundY: 360 },
    obstacle: { x: 0 },
    speed: 300,
    floors: [
      { x: 0, y: 450, width: 200, height: 50 },
      { x: 240, y: 410, width: 120, height: 50 },
      { x: 400, y: 360, width: 120, height: 50 },
      { x: 560, y: 410, width: 120, height: 50 },
      { x: 720, y: 450, width: 280, height: 50 },
    ],
  },

  {
    id: 10,
    title: "The final climb",
    objective: "Moving ledges, a climbing route, and a fast hazard—everything at once.",
    man: { x: 30, groundY: 450 },
    door: { x: 880, groundY: 310 },
    switch: { x: 360, groundY: 410 },
    obstacle: { x: 530, groundY: 360 },
    speed: 320,
    floors: [
      { x: 0, y: 450, width: 240, height: 50 },
      { x: 280, y: 410, width: 140, height: 50, speed: 125 },
      { x: 460, y: 360, width: 140, height: 50, speed: 145 },
      { x: 640, y: 310, width: 360, height: 50 },
    ],
  },
];
