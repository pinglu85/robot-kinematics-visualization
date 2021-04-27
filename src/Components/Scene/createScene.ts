import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  DirectionalLight,
  AmbientLight,
  Mesh,
  PlaneBufferGeometry,
  MeshPhongMaterial,
  DoubleSide,
  PCFSoftShadowMap,
  Object3D,
  Box3,
  Vector3,
  MathUtils,
  LoadingManager,
  BufferGeometry,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import URDFLoader, { URDFRobot } from 'urdf-loader';

import { jointInfosStore } from '../../stores';
import type { JointInfo } from '../../types';
import modifyPath from './utils/modifyPath';
import scaleInView from './utils/scaleInView';

const URDF_FILE_PATH = '../urdf/KUKA_LWR/urdf/kuka_lwr.URDF';
const CAMERA_POS_X = 10;
const CAMERA_POS_Y = 10;
const CAMERA_POS_Z = 10;

/*

THREE.js
   Y
   |
   |
   .-----X
 ／
Z

ROS URDf
       Z
       |   X
       | ／
 Y-----.

*/

let scene: Scene;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let manager: LoadingManager;
let loader: URDFLoader;
let robot: URDFRobot;

function createScene(canvasEl: HTMLCanvasElement): void {
  init(canvasEl);
  render();
}

function init(canvasEl: HTMLCanvasElement): void {
  // *** Initialize three.js scene ***

  scene = new Scene();

  camera = new PerspectiveCamera();
  camera.aspect = window.innerWidth / window.innerHeight; // Aspect ratio
  camera.position.set(CAMERA_POS_X, CAMERA_POS_Y, CAMERA_POS_Z);

  renderer = new WebGLRenderer({ antialias: true, canvas: canvasEl });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  const directionalLight = new DirectionalLight(0xffffff, 1.0);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.setScalar(1024);
  directionalLight.position.set(5, 30, 5);
  scene.add(directionalLight);

  const ambientLight = new AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  const ground = new Mesh(
    new PlaneBufferGeometry(),
    new MeshPhongMaterial({ color: 0x111111, side: DoubleSide })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.scale.setScalar(10);
  ground.receiveShadow = true;
  scene.add(ground);

  // Allow user to rotate around the robot.
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1;
  controls.target.y = 1;
  controls.update();

  // *** Load URDF ***

  manager = new LoadingManager();
  loader = new URDFLoader(manager);
  loadRobot();
}

// *** Render the scene onto the screen ***

function render(): void {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function loadRobot(url = URDF_FILE_PATH, files?: Record<string, File>): void {
  if (robot) {
    removeOldRobotFromScene();
  }

  const filesHaveBeenUploaded = files !== undefined;
  if (filesHaveBeenUploaded) {
    loader.loadMeshCb = (
      path: string,
      manager: LoadingManager,
      onComplete: (obj: Object3D, err?: ErrorEvent) => void
    ): void => {
      const stlLoader = new STLLoader(manager);
      const modifiedPath = modifyPath(path);
      const fileURL = URL.createObjectURL(files[modifiedPath]);
      stlLoader.load(
        fileURL,
        (result: BufferGeometry) => {
          const material = new MeshPhongMaterial();
          const mesh = new Mesh(result, material);
          onComplete(mesh);
        },
        null,
        (err: ErrorEvent) => {
          onComplete(null, err);
        }
      );
    };
  }

  loader.load(url, (result: URDFRobot): void => {
    console.log(result);
    robot = result;
  });

  // Wait until all geometry has been loaded, then add
  // the robot to the scene.
  manager.onLoad = (): void => {
    // Rotate the robot
    robot.rotation.x = -Math.PI / 2;
    // Center the robot
    // robot.translateOnAxis(0, 0, 0);
    // robot.position.copy(new Vector3(0.0, 0.0, 0.0));
    // Traverse the robot and cast shadow
    robot.traverse((c: Object3D): void => {
      // if (c instanceof Mesh) {
      //   c.material.color.set(0xffd324);
      // }
      c.castShadow = true;
    });

    // Pass each joint's limits and initial degree to `Interface`.
    jointInfosStore.update(updateJointInfos);

    // Updates the global transform of the object and its descendants.
    robot.updateMatrixWorld(true);

    // Create a bounding box of robot.
    const box = new Box3().setFromObject(robot);

    const boxSize = box.getSize(new Vector3()).length();
    const boxCenter = box.getCenter(new Vector3());

    scaleInView(boxSize * 0.5, boxSize, boxCenter, camera);

    scene.add(robot);
  };
}

function removeOldRobotFromScene(): void {
  const name = scene.getObjectByName(robot.name);
  scene.remove(name);
}

function rotateJoints(jointInfos: JointInfo[]): void {
  if (!robot) return;

  const { joints } = robot;
  const jointNames = Object.keys(joints);
  jointNames.forEach((jointName: string, idx: number): void => {
    const { degree } = jointInfos[idx];
    joints[jointName].setJointValue(MathUtils.degToRad(degree));
  });
}

function updateJointInfos(): JointInfo[] {
  return Object.keys(robot.joints).map((jointName: string) => {
    const { lower, upper } = robot.joints[jointName].limit;
    const lowerDegree = Number(MathUtils.radToDeg(Number(lower)).toFixed());
    const upperDegree = Number(MathUtils.radToDeg(Number(upper)).toFixed());

    return {
      lower: lowerDegree,
      upper: upperDegree,
      degree:
        Math.floor(Math.random() * (upperDegree - lowerDegree + 1)) +
        lowerDegree,
    };
  });
}

export default createScene;
export { rotateJoints, loadRobot };
