import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import door_base from './Texture/door/Door_Wood_001_basecolor.jpg';
import door_roughness from './Texture/door/Door_Wood_001_roughness.jpg';
import door_normal from './Texture/door/Door_Wood_001_normal.jpg';
import door_metal from './Texture/door/Door_Wood_001_metallic.jpg';
import door_height from './Texture/door/Door_Wood_001_height.png';
import door_occlusion from './Texture/door/Door_Wood_001_ambientOcclusion.jpg';

import window_base from './Texture/window/Glass_Window_002_basecolor.jpg';
import window_roughness from './Texture/window/Glass_Window_002_roughness.jpg';
import window_normal from './Texture/window/Glass_Window_002_normal.jpg';
import window_metal from './Texture/window/Glass_Window_002_metallic.jpg';
import window_height from './Texture/window/Glass_Window_002_height.png';
import window_occlusion from './Texture/window/Glass_Window_002_ambientOcclusion.jpg';

import grass_base from './Texture/grass/Stylized_Grass_001_basecolor.jpg';
import grass_roughness from './Texture/grass/Stylized_Grass_001_roughness.jpg';
import grass_normal from './Texture/grass/Stylized_Grass_001_normal.jpg';
import grass_height from './Texture/grass/Stylized_Grass_001_height.png';
import grass_occlusion from './Texture/grass/Stylized_Grass_001_ambientOcclusion.jpg';

import roof_base from './Texture/roof/Roof_Tiles_Japanese_001_basecolor.jpg';
import roof_roughness from './Texture/roof/Roof_Tiles_Japanese_001_roughness.jpg';
import roof_normal from './Texture/roof/Roof_Tiles_Japanese_001_normal.jpg';
import roof_height from './Texture/roof/Roof_Tiles_Japanese_001_height.png';
import roof_occlusion from './Texture/roof/Roof_Tiles_Japanese_001_ambientOcclusion.jpg';

import wall_base from './Texture/wall/Old_Graffiti_Wall_001_COLOR.jpg';
import wall_roughness from './Texture/wall/Old_Graffiti_Wall_001_ROUGH.jpg';
import wall_normal from './Texture/wall/Old_Graffiti_Wall_001_NORM.jpg';
import wall_height from './Texture/wall/Old_Graffiti_Wall_001_DISP.png';
import wall_occlusion from './Texture/wall/Old_Graffiti_Wall_001_OCC.jpg';

import grave_base from './Texture/grave/Wall_Stone_018_basecolor.jpg';


const canvas = document.querySelector('.webgl');

const sizes = {width: window.innerWidth, height: window.innerHeight};
const cursor = {x: 0, y: 0};

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    perspectiveCamera.aspect = sizes.width / sizes.height;
    perspectiveCamera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, perspectiveCamera);
});
window.addEventListener('dblclick', () => {
    console.log('double click');
    if(document.fullscreenElement) {
        console.log('exiting fullscreen');
        document.exitFullscreen();
    }
    else {
        console.log('entering fullscreen');
        canvas.requestFullscreen();
    }
});
canvas.addEventListener('mousemove', (e) => {
    const x = e.clientX / sizes.width - 0.5;
    const y = -(e.clientY / sizes.height - 0.5);
    cursor.x = x - 0.5;
    cursor.y = y - 0.5;
});


const clock = new THREE.Clock();
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();

const door_baseTexture = textureLoader.load(door_base);
const door_roughnessTexture = textureLoader.load(door_roughness);
const door_normalTexture = textureLoader.load(door_normal);
const door_metalTexture = textureLoader.load(door_metal);
const door_heightTexture = textureLoader.load(door_height);
const door_occlusionTexture = textureLoader.load(door_occlusion);

const window_baseTexture = textureLoader.load(window_base);
const window_roughnessTexture = textureLoader.load(window_roughness);
const window_normalTexture = textureLoader.load(window_normal);
const window_metalTexture = textureLoader.load(window_metal);
const window_heightTexture = textureLoader.load(window_height);
const window_occlusionTexture = textureLoader.load(window_occlusion);

const grass_baseTexture = textureLoader.load(grass_base);

grass_baseTexture.wrapS = grass_baseTexture.wrapT = THREE.RepeatWrapping;
grass_baseTexture.repeat.set(10, 10);

const roof_baseTexture = textureLoader.load(roof_base);
const roof_roughnessTexture = textureLoader.load(roof_roughness);
const roof_normalTexture = textureLoader.load(roof_normal);
const roof_heightTexture = textureLoader.load(roof_height);
const roof_occlusionTexture = textureLoader.load(roof_occlusion);


const wall_baseTexture = textureLoader.load(wall_base);
const wall_roughnessTexture = textureLoader.load(wall_roughness);
const wall_normalTexture = textureLoader.load(wall_normal);
const wall_heightTexture = textureLoader.load(wall_height);
const wall_occlusionTexture = textureLoader.load(wall_occlusion);


const grave_baseTexture = textureLoader.load(grave_base);

const house = new THREE.Group();
scene.add(house);


const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({color: 0x00bb00});
planeMaterial.map = grass_baseTexture;
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2));
plane.rotation.x = -Math.PI / 2;
plane.position.set(0, -1, 0);
planeMaterial.side = THREE.DoubleSide;
scene.add(plane);


const wallGeometry = new THREE.BoxGeometry(4, 2.5, 4);
const wallMaterial = new THREE.MeshStandardMaterial({color: 0xac8e82});
wallMaterial.map = wall_baseTexture;
wallMaterial.normalMap = wall_normalTexture;
wallMaterial.aoMap = wall_occlusionTexture;
const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.geometry.setAttribute('uv2', new THREE.BufferAttribute(wall.geometry.attributes.uv.array, 2));
wall.position.set(0, 0.26, 0);
house.add(wall);


const roofGeometry = new THREE.ConeGeometry(3.5, 1, 4);
const roofMaterial = new THREE.MeshStandardMaterial({color: 0xb35f45});
roofMaterial.map = roof_baseTexture;
roofMaterial.normalMap = roof_normalTexture;
roofMaterial.roughnessMap = roof_roughnessTexture;
roofMaterial.aoMap = roof_occlusionTexture;
roofMaterial.displacementMap = roof_heightTexture;
roofMaterial.displacementScale = 0.1;
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.set(0, 1.5 + roofGeometry.parameters.height/2, 0);
roof.rotation.y = Math.PI / 4;
house.add(roof);

const doorGeometry = new THREE.PlaneGeometry(2, 2, 100, 100);
const doorMaterial = new THREE.MeshStandardMaterial({color: 0xee5f45});
doorMaterial.map = door_baseTexture;
doorMaterial.normalMap = door_normalTexture;
doorMaterial.roughnessMap = door_roughnessTexture;
doorMaterial.metalnessMap = door_metalTexture;
doorMaterial.aoMap = door_occlusionTexture;
doorMaterial.displacementMap = door_heightTexture;
doorMaterial.displacementScale = 0.2;
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.geometry.setAttribute('uv2', new THREE.BufferAttribute(door.geometry.attributes.uv.array, 2));
door.position.set(0, 0, 2 + 0.001);
house.add(door);

const windowGeometry = new THREE.PlaneGeometry(1.5, 1.2, 100, 100);
const windowMaterial = new THREE.MeshStandardMaterial({color: 0xee5f45});
windowMaterial.map = window_baseTexture;
windowMaterial.normalMap = window_normalTexture;
windowMaterial.roughnessMap = window_roughnessTexture;
windowMaterial.metalnessMap = window_metalTexture;
windowMaterial.aoMap = window_occlusionTexture;
windowMaterial.displacementMap = window_heightTexture;
windowMaterial.displacementScale = 0.05;
const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
window1.geometry.setAttribute('uv2', new THREE.BufferAttribute(window1.geometry.attributes.uv.array, 2));
window1.position.set(2.001, 1.25/4, 0);
window1.rotation.y = Math.PI / 2;

const window2 = window1.clone();
window2.position.set(-2.001, 1.25/4, 0);
window2.rotation.y = -Math.PI / 2;

house.add(window1, window2);


const bushesGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushesMaterial = new THREE.MeshStandardMaterial({color: 0x89c854});
bushesMaterial.map = grass_baseTexture;
const bushes1 = new THREE.Mesh(bushesGeometry, bushesMaterial);
bushes1.position.set(1, -0.75, 2.001 + 1/4);
bushes1.scale.set(0.4, 0.4, 0.4);

const bushes2 = bushes1.clone();
bushes2.position.set(1.4, -0.9, 2.001 + 1/2);
bushes2.scale.set(0.2, 0.2, 0.2);

const bushes3 = bushes1.clone();
bushes3.position.set(-1.1, -0.75, 2.001 + 1/4);
bushes3.scale.set(0.45, 0.45, 0.45);

const bushes4 = bushes1.clone();
bushes4.position.set(-1.6, -0.9, 2.001 + 1/4);
bushes4.scale.set(0.25, 0.25, 0.25);

bushes1.castShadow = bushes2.castShadow = bushes3.castShadow = bushes4.castShadow = true;

house.add(bushes1, bushes2, bushes3, bushes4);


const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({color: 0xb2b6b1});
graveMaterial.map = grave_baseTexture;

for(let i = 0; i < 70; i++) {
    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.castShadow = true;
    const radius = Math.random() * 6 + 3;
    grave.position.x = Math.sin(i * Math.PI * 2 / 50) * radius;
    grave.position.y = -0.6 - Math.random() * 1/10;
    grave.position.z = Math.cos(i * Math.PI * 2 / 50) * radius;
    grave.rotation.y = (Math.random() - 0.5) * 0.3;
    grave.rotation.z = (Math.random() - 0.5) * 0.3;
    scene.add(grave);
}

const fog = new THREE.Fog('#262837', 3, 10);
scene.fog = fog;


const perspectiveCamera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
// const perspectiveCamera = new THREE.OrthographicCamera(-1*(sizes.width/sizes.height), 1*(sizes.width/sizes.height), 1, -1, 0.1, 100);
perspectiveCamera.position.set(4, 2, 5);
scene.add(perspectiveCamera);


const controls = new OrbitControls(perspectiveCamera, canvas);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xb9d5ff, 0.5);
scene.add(ambientLight);
const moonLight = new THREE.DirectionalLight(0xb9d5ff, 0.12);
moonLight.castShadow = true;
scene.add(moonLight);
const doorLight = new THREE.PointLight(0xff7d46, 1, 7);
doorLight.position.set(0, 1.2, 2.5);
house.add(doorLight);
// const doorLightHelper = new THREE.PointLightHelper(doorLight, 1);
// house.add(doorLightHelper);
// doorLightHelper.visible = false;
// const doorLightHelper = new THREE.SpotLightHelper(doorLight);
// house.add(doorLightHelper);
// const cameraHelper = new THREE.CameraHelper(doorLight.shadow.camera);
// house.add(cameraHelper);

const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('#262837');
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.render(scene, perspectiveCamera);


const animation = () => {
    const elapsedTime = clock.getElapsedTime();

    // perspectiveCamera.position.x= Math.sin(cursor.x * Math.PI  * 2) * 3;
    // perspectiveCamera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // perspectiveCamera.position.y = Math.cos(cursor.y * Math.PI) * 3;
    // perspectiveCamera.lookAt(cube.position);
    controls.update();
    renderer.render(scene, perspectiveCamera);

    window.requestAnimationFrame(animation);
}
animation();


export default 'another';