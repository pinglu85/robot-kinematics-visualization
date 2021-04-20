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
  Vector3,
  MathUtils,
  LoadingManager,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import URDFLoader from 'urdf-loader';

const URDF_FILE_PATH = './src/urdf/KUKA_LWR/urdf/kuka_lwr.URDF';
const CAMERA_POS_X = 2;
const CAMERA_POS_Y = 2;
const CAMERA_POS_Z = 2;

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

// *** Initialize three.js scene ***

const scene = new Scene();

const camera = new PerspectiveCamera(
  45, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near
  1000 // Far
);
camera.position.set(CAMERA_POS_X, CAMERA_POS_Y, CAMERA_POS_Z);
camera.lookAt(0, 0, 0);

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

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
controls.minDistance = 4;
controls.target.y = 1;
controls.update();

// *** Load URDF ***

let robot;

const manager = new LoadingManager();
const loader = new URDFLoader(manager);
loader.load(URDF_FILE_PATH, (result) => {
  console.log(result);
  robot = result;
});

// Wait until all geometry has been loaded, then add
// the robot to the scene.
manager.onLoad = () => {
  // Rotate the robot
  robot.rotation.x = -Math.PI / 2;
  // Center the robot
  // robot.translateOnAxis(0, 0, 0);
  // robot.position.copy(new Vector3(0.0, 0.0, 0.0));
  // Traverse the robot and cast shadow
  robot.traverse((c) => {
    c.castShadow = true;
  });

  const deg = Math.floor(Math.random() * 91);
  // Bent the robot
  for (let i = 0; i < 7; i++) {
    robot.joints[`kuka_arm_${i}_joint`].setJointValue(MathUtils.degToRad(deg));
  }

  scene.add(robot);
};

// *** Render the scene onto the screen ***

const render = function () {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};
render();
