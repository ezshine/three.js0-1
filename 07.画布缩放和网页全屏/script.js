// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0x000000 );

// Object
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1,10,10,10)

const cubeMaterial = new THREE.MeshBasicMaterial({
    color:0xff0000,
})
const mesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(mesh)


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Control
const controls = new THREE.OrbitControls(camera, canvas)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,

})
renderer.setSize(sizes.width, sizes.height)

// Resize Handler
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})

// fullscreen
window.addEventListener('dblclick', () =>
{
    if(!document.fullscreenElement)
    {
        canvas.requestFullscreen()
    }
    else
    {
        document.exitFullscreen()
    }
})

const tick = () =>{
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick);
}
tick();