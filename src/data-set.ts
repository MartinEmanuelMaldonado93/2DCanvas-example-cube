// Cube coordinates
export const cube = [
  { x: 100, y: 100, z: 100 }, // 0
  { x: 150, y: 100, z: 100 }, // 1
  { x: 150, y: 150, z: 100 }, // 2
  { x: 100, y: 150, z: 100 }, // 3
  { x: 100, y: 100, z: 150 }, // 4
  { x: 150, y: 100, z: 150 }, // 5
  { x: 150, y: 150, z: 150 }, // 6
  { x: 100, y: 150, z: 150 }, // 7
]; // 8 points - array of cardinal points

export const axes = [
  { x: 0, y: 0 },
  { x: 225, y: 225 },
];

// Define edges of the cube by tracing a
export const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0], // Front face
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4], // Back face
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7], // Connecting edges
]; // basically traverse them
