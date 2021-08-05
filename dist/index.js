import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'
const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
const light = new THREE.AmbientLight( 0x404040, 5 ); // soft white light
scene.add( light );
const pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 0, 2, 0 );
scene.add( pointLight );

const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshLambertMaterial({
    color:0x660066
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


//Boilerplate code
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
camera.position.set(0,0,4)
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.shadowMap.enabled = true

function animate(){
    requestAnimationFrame(animate)
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
    renderer.render(scene, camera)
}

animate()
