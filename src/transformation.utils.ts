export function rotateY(cube: Point3D[], angle: number, center: Point3D) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  cube.forEach((p) => {
    const dx = p.x - center.x;
    const dz = p.z - center.z;

    const rotatedX = dx * cos - dz * sin;
    const rotatedZ = dx * sin + dz * cos;
    // modify the values
    p.x = rotatedX + center.x;
    p.z = rotatedZ + center.z;
    return p;
  });
  return cube;
}

export function rotateYO(point: Point3D, angle: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  // Rotar alrededor del eje Y
  return {
    x: point.x * cos + point.z * sin, // Inclinación hacia la izquierda
    y: point.y,
    z: -point.x * sin + point.z * cos,
  };
}

export function rotateX(point: Point3D, angle: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  // Rotar alrededor del eje X
  return {
    x: point.x,
    y: point.y * cos - point.z * sin, // Inclinación hacia arriba
    z: point.y * sin + point.z * cos,
  };
}
