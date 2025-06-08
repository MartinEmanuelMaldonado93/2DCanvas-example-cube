import { GUI } from "dat.gui";
// import { perspectiveProjection } from "./canvas.utils";
import { cube, edges } from "./data-set";
import "./style.css";
import {
  orthographicProjection,
  perspectiveProjection,
} from "./projection-cameras";
import { rotateY } from "./transformation.utils";

const canvas = setupCanvas();
const ctx = canvas.getContext("2d")!;

clearCanvas(canvas.width, canvas.height);
const scene = setupGUI(canvas.width, canvas.height);

let angle = 0;
// let flagDots = false;

let lastTime = performance.now();
runScene(ctx, null);

function runScene(ctx: CanvasRenderingContext2D, currentTime: number | null) {
  clearCanvas(canvas.width, canvas.height);

  const cubeCenter = { x: 125, y: 125, z: 125 };
  if (!currentTime) {
    currentTime = performance.now();
    lastTime = currentTime;
  }

  let delta = (currentTime - lastTime) / 1_000;
  // if (!isFinite(delta) || delta < 0) delta = 0;
  lastTime = currentTime;

  angle += 1.2 * delta;

  const cubeRotated = rotateY(
    cube.map((p) => ({ ...p })),
    angle,
    cubeCenter
  );

  const projectedCube = projectCube(cubeRotated, canvas.width, canvas.height);

  ctx.beginPath();
  edges.forEach((edge) => {
    const p1 = projectedCube[edge[0]];
    const p2 = projectedCube[edge[1]];
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
  });
  ctx.strokeStyle = "white";
  ctx.stroke();
  drawGrid(canvas.width, canvas.height);

  // if (flagDots) {
  //   drawRandomPoints(canvas.width, canvas.height);
  //   flagDots = false;
  // }
  requestAnimationFrame((time) => runScene(ctx, time));
}

function setupCanvas() {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const canvas = document.createElement("canvas")!;
  canvas.addEventListener("mousemove", (e) => {
    console.log(e.x, e.y);
  });
  app.appendChild(canvas);

  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
  canvas.style.position = "fixed"; // Previene desplazamiento
  canvas.style.left = "0";
  canvas.style.imageRendering = "crisp-edges";
  return canvas;
}

function setupGUI(width: number, height: number) {
  const gui = new GUI();
  const scene = {
    fov: 120,
    viewDistance: 75,
    clearCanvas,
  };
  const cubeFolder = gui.addFolder("Cube");
  cubeFolder
    .add(scene, "fov", 0, 500, 5)
    .onChange(() => scene.clearCanvas(width, height));
  cubeFolder
    .add(scene, "viewDistance", 0, 200, 5)
    .onChange(() => scene.clearCanvas(width, height));
  cubeFolder.open();
  return scene;
}

function drawRandomPoints(width: number, height: number) {
  const dots = generateRandomPoints(10, 100, 10);
  dots.forEach((dot) => {
    // const projectedDot = perspectiveProjection({
    //   fov: scene.fov,
    //   viewDistance: scene.viewDistance,
    //   height,
    //   width,
    //   point: dot,
    // });
    const projectedDot = orthographicProjection(dot, width, height);
    ctx.beginPath();
    ctx.arc(projectedDot.x, projectedDot.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = determinePointColor();
    ctx.fill();
  });
}

function generateRandomPoints(
  count: number,
  cubeSize: number,
  padding: number = 0
) {
  const points: Point3D[] = [];

  for (let i = 0; i < count; i++) {
    // Generar coordenadas aleatorias dentro del cubo + padding
    const x = (Math.random() - 0.5) * (cubeSize + padding * 2);
    const y = (Math.random() - 0.5) * (cubeSize + padding * 2);
    const z = (Math.random() - 0.5) * (cubeSize + padding * 2);

    points.push({ x, y, z });
  }

  return points;
}

export function determinePointColor() {
  return Math.random() < 0.5 ? "green" : "red";
}

function projectCube(cube: Point3D[], width: number, height: number) {
  const cubeCenter = { x: 125, y: 125, z: 125 };

  const projectedCube = cube.map((point) => {
    // return orthographicProjection(point, width, height);
    const perspectivePoint = perspectiveProjection({
      viewDistance: scene.viewDistance,
      fov: scene.fov,
      height,
      width,
      point,
      cubeCenter,
    });
    return perspectivePoint;
  });

  return projectedCube;
}

function drawGrid(width: number, height: number) {
  //draw horizontal line
  ctx.beginPath();
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.strokeStyle = "gray";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();
}

function clearCanvas(width: number, height: number) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
}
