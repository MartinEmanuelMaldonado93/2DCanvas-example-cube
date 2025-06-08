import { rotateYO } from "./transformation.utils";
import { rotateX } from "./utils";

export function perspectiveProjection({
  point,
  height,
  width,
  fov,
  viewDistance,
  cubeCenter = { x: 0, y: 0, z: 0 },
}: {
  point: Point3D;
  width: number;
  height: number;
  viewDistance: number;
  fov: number;
  cubeCenter?: { x: number; y: number; z: number };
}) {
  const translated = {
    x: point.x - cubeCenter?.x,
    y: point.y - cubeCenter.y,
    z: point.z - cubeCenter.z,
  };
  const safeZ = Math.max(viewDistance + translated.z, 0.001); // Evita división por cero

  const factor = fov / safeZ;
  // Proyectar y centrar
  return {
    x: translated.x * factor + width / 2,
    y: translated.y * factor + height / 2,
    z: point.z,
  };
}

export function orthographicProjection(
  point: Point3D,
  width: number,
  height: number
) {
  // Escalar las coordenadas para que se ajusten al canvas
  // const scale = Math.min(width, height) / 2; // Ajustar al tamaño del canvas
  // return {
  //   x: point.x * scale + width / 2, // Centrar en el canvas
  //   y: -point.y * scale + height / 2, // Invertir Y para que crezca hacia arriba
  //   z: point.z,
  // };
  const scale = Math.min(width, height) / 2;

  const x = point.x + width / 2; // Centrar en el canvas
  const y = point.y + height / 2; // Invertir eje Y para la pantalla

  // return { x, y, z: 0 };
  return point;
}

export function projectWithCameraTilt(
  points: Point3D[],
  width: number,
  height: number,
  tiltAngle = Math.PI / 15
) {
  return points.map((point) => {
    // 1. Rotar el punto para inclinar la cámara
    let rotatedPoint = rotateX(point, tiltAngle);
    rotatedPoint = rotateYO(rotatedPoint, Math.PI / 3);
    // rotatedPoint = projectToZView(point);
    // rotatedPoint = projectToXView(point);
    return orthographicProjection(rotatedPoint, width, height);
  });
}

// app.appendChild(canvas);
// Proyección ortográfica para la vista X (frontal)
export function projectToXView(point: Point3D) {
  return { x: 0, y: point.y, z: point.z };
}

// Proyección ortográfica para la vista Y (superior)
export function projectToYView(point: Point3D) {
  return { x: point.x, y: 0, z: point.z };
}

// Proyección ortográfica para la vista Z (lateral)
export function projectToZView(point: Point3D) {
  return { x: point.x, y: point.y, z: 0 };
}
