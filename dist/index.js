import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls";

let fish
let theLoader
var fishArr = new Array;
let fishMixerArr = new Array;


const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xf6f6f6)
const light = new THREE.AmbientLight( 0x404040, 5 ); // soft white light
scene.add( light );
const pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 0, 2, 0 );
scene.add( pointLight );


//Boilerplate code
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
camera.position.set(0,10,0)
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.shadowMap.enabled = true

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();


const clock = new THREE.Clock()
function animate(){
    requestAnimationFrame(animate)

    //make the fish animte
    var dt = clock.getDelta()
    for (var i = 0; i<num; i++){
        if(fishMixerArr[i]){
            fishMixerArr[i].update(dt)
        }
    }

    //make the fish move forward
    for (var i = 0; i<num; i++){
        var speed = (Math.random() * (6 - 3) + 3).toFixed(2)
        if(fishArr[i]){
            fishArr[i].position.x -= 0.01 * speed
        }
    }

    //make the fish start over
    for (var i = 0; i<num; i++){
        const [x, y, z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(7))
        if(fishArr[i].position.x < - 40){
            fishArr[i].position.x = x*10 + 40;
            fishArr[i].position.y = y-10;
            fishArr[i].position.z = z*5 - 10;
        }
    }
    renderer.render(scene, camera)
}
function addFish(index){
    var size = (Math.random() * (3 - 1) + 1).toFixed(2)
    const [x, y, z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(7))
  theLoader = new GLTFLoader()
  theLoader.load(
    './clown_fish (1)/scene.gltf',
    gltf => {
        fish = gltf.scene
        fish.scale.set(size*.4,size*.4,size*.4)
        fish.position.set(x*10 + 40, y-10, z*5-10)
        fish.rotation.y += Math.PI/2;
        let Mixer = new THREE.AnimationMixer(fish)
        Mixer.clipAction(gltf.animations[0]).play();
      scene.add(fish);
      fishArr[index] = fish;
      fishMixerArr[index] = Mixer;
    }
  )
}

let num = 20
for(var i = 0; i < num; i++){
    addFish(i);
}
animate()
