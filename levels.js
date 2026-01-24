export const levels = [
  {
    id: 1,
    man: { x: 0 },
    door: { x: 200 },
    switch: { x: 500 },
    obstacle: { x: 50 },
    speed: 400,
    floors: [{ x: 0, y: 450, width: 800, height: 50 }],
  },
  {
    id: 2,
    man: { x: 0 },
    door: { x: 700 },
    switch: { x: 600 },
    obstacle: { x: 400 },
    speed: 250,
    floors: [
      { x: 0, y: 450, width: 300, height: 50 },
      { x: 350, y: 400, width: 200, height: 50 },
      { x: 600, y: 450, width: 200, height: 50 },
    ],
  },
  {
    id: 3,
    man: { x: 0 },
    door: { x: 500 },
    switch: { x: 300 },
    obstacle: { x: 400 },
    speed: 350,
    floors: [
      { x: 0, y: 450, width: 200, height: 50 },
      { x: 250, y: 380, width: 150, height: 50 },
      { x: 450, y: 320, width: 200, height: 50 },
    ],
  },
];
