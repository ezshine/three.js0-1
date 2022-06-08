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
// 创建一个空的 BufferGeometry
const geometry = new THREE.BufferGeometry()

// 创建 50 个三角形 (450 values)
const count = 50
const positionsArray = new Float32Array(count * 3 * 3)
for(let i = 0; i < count * 3 * 3; i++)
{
    positionsArray[i] = (Math.random() - 0.5) * 4
}

// 创建 attribute 并赋值给 'position' 属性
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)

const cubeMaterial = new THREE.MeshBasicMaterial({
    color:0xff0000,
    wireframe:true
})
const mesh = new THREE.Mesh(geometry, cubeMaterial)
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


const tick = () =>{
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick);
}
tick();