export type cameraType = "x" | "y" | "z";
export type Point = { x: number; y: number; z: number };

// Transform the cube coordinates based on the camera position
export function transformCube(cube: Point[], camera: cameraType) {
  return cube.map(({ x, y, z }) => {
    if (camera === "x") return { x: z, y, z: x };
    if (camera === "y") return { x, y: z, z: y };
    return { x, y, z };
  });
}

export function rotateX(point: Point, angle: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x,
    // review theory, rotation
    y: point.y * cos - point.z * sin,
    z: point.y * sin + point.z * cos,
  };
}

export function rotateY(point: Point, angle: number): Point {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x * cos + point.z * sin,
    y: point.y - 0.01,
    z: -point.x * sin + point.z * cos,
  };
}

export function project({
  point,
  w,
  h,
  fov,
  viewerDistance,
}: {
  point: Point;
  w: number;
  h: number;
  fov: number;
  viewerDistance: number;
}) {
  const factor = fov / (viewerDistance + point.z);
  const centerXaxis = w / 4;
  const centerYaxis = h / 1.6;
  const x = point.x * factor + centerXaxis;
  const y = -point.y * factor + centerYaxis;
  return { x, y };
}

export function calculateCubeCenter(
  cube: { x: number; y: number; z: number }[]
): {
  x: number;
  y: number;
  z: number;
} {
  const xValues = cube.map((point) => point.x);
  const yValues = cube.map((point) => point.y);
  const zValues = cube.map((point) => point.z);

  return {
    x: (Math.min(...xValues) + Math.max(...xValues)) / 2,
    y: (Math.min(...yValues) + Math.max(...yValues)) / 2,
    z: (Math.min(...zValues) + Math.max(...zValues)) / 2,
  };
}

/** Calculate each point position */
export function projectOrthographic(
  point: Point,
  width: number,
  height: number
): Omit<Point, "z"> {
  // const x = point.x + width / 2; // Centrar en el canvas
  // const y = -point.y + height / 2; // Invertir eje Y para la pantalla
  // return { x, y };
  // console.log(point)
  return point;
  return {
    x: point.x + window.innerWidth / 2,
    y: -point.y + window.innerHeight / 2,
  };
}

// Function to generate random points around the cube
export function generateRandomPoints(cube: Point[], count: number) {
  const points = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * cube.length);
    const curr = cube[randomIndex];
    const randomPositionPoint = {
      x: Math.random() * curr.x,
      y: Math.random() * curr.y,
      z: Math.random() * curr.z,
    };
    points.push(randomPositionPoint);
  }
  return points;
}
// Function to determine the color of the points
export function determinePointColor() {
  return Math.random() < 0.5 ? "green" : "red";
}
