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

//Textures

const textureLoader = new THREE.TextureLoader()

const colorTexture = textureLoader.load("./assets/texture_color.jpg");
const emissiveTexture = textureLoader.load("./assets/texture_emissive.jpg");
const bumpTexture = textureLoader.load("./assets/texture_bump.png");
const normalTexture = textureLoader.load("./assets/texture_normal.jpg");
const metalTexture = textureLoader.load("./assets/texture_metalic.jpg");
const roughTexture = textureLoader.load("./assets/texture_roughness.jpg");
const aoTexture = textureLoader.load("./assets/texture_ao.jpg");

// Object
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1,10,10,10)
// for aoMap
cubeGeometry.attributes.uv2 = cubeGeometry.attributes.uv;

// for skybox
const loader = new THREE.CubeTextureLoader();
loader.setPath( 'assets/cube/' );

const textureCube = loader.load( [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ] );
textureCube.encoding = THREE.sRGBEncoding;

scene.background = textureCube;

const cubeMaterial = new THREE.MeshPhysicalMaterial({
    map:colorTexture,
    emissive:0xffffff,
    emissiveMap:emissiveTexture,
    roughness:0,
    metalness:.6,
    metalnessMap:metalTexture,
    roughnessMap:roughTexture,
    transparent : true,
    aoMap:aoTexture,
    envMap:textureCube
})
const mesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(mesh)

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3)
scene.add(directionalLight)

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

// Debug UI

const options = {
    background:0x000000,
    map:true,
    emissiveMap:true,
    emissive:0xffffff,
    alphaMap:false,
    bumpMap:false,
    normalMap:false,
    displaceMap:false,
    metalMap:true,
    roughMap:true,
    aoMap:true,
    envMap:true
}

const gui = new dat.GUI();

const folder1 = gui.addFolder("场景设置")
folder1.addColor(options,'background').name("场景背景色")
.onChange(() =>
{
    scene.background = new THREE.Color( options.background );
})
folder1.add(cubeMaterial,'wireframe');
folder1.open();

const folder2 = gui.addFolder('颜色贴图')
folder2.add(options,'map')
       .onChange(()=>{
           cubeMaterial.map = options.map?colorTexture:null;
           cubeMaterial.needsUpdate = true;
       })
folder2.open();

const folder3 = gui.addFolder('自发光贴图')
folder3.add(options,'emissiveMap')
       .onChange(()=>{
            cubeMaterial.emissiveMap = options.emissiveMap?emissiveTexture:null;
            cubeMaterial.emissive=options.emissiveMap?new THREE.Color(options.emissive):new THREE.Color(0x000000);
            cubeMaterial.needsUpdate = true;
       })
folder3.addColor(options,'emissive')
       .onChange(()=>{
            cubeMaterial.emissive = new THREE.Color(options.emissive)
            cubeMaterial.needsUpdate = true
       })
folder3.open();

const folder4 = gui.addFolder('透明贴图')
folder4.add(options,'alphaMap')
       .onChange(()=>{
            cubeMaterial.alphaMap = options.alphaMap?emissiveTexture:null;
            cubeMaterial.alphaTest = 0.1
            cubeMaterial.needsUpdate = true;
       })
folder4.open();

const folder5 = gui.addFolder('细节')
folder5.add(options,'bumpMap')
       .onChange(()=>{
            cubeMaterial.bumpMap = options.bumpMap?bumpTexture:null;
            cubeMaterial.needsUpdate = true;
       })
folder5.add(options,'normalMap')
        .onChange(()=>{
            cubeMaterial.normalMap = options.normalMap?normalTexture:null;
            cubeMaterial.needsUpdate = true;
        })
folder5.add(options,'displaceMap')
        .onChange(()=>{
            cubeMaterial.displacementMap = options.displaceMap?bumpTexture:null;
            cubeMaterial.displacementScale = .1
            cubeMaterial.needsUpdate = true;
        })
folder5.open();

const folder6 = gui.addFolder('粗糙度和金属感贴图')
folder6.add(options,'metalMap')
        .onChange(()=>{
            cubeMaterial.metalnessMap = options.metalMap?metalTexture:null;
            cubeMaterial.needsUpdate = true;
        })
folder6.add(cubeMaterial,'metalness',0,1,0.01);
folder6.add(options,'roughMap')
        .onChange(()=>{
            cubeMaterial.roughnessMap = options.roughMap?roughTexture:null;
            cubeMaterial.needsUpdate = true;
        })
folder6.add(cubeMaterial,'roughness',0,1,0.01);
folder6.open();

const folder7 = gui.addFolder('环境闭塞贴图')
folder7.add(options,'aoMap')
        .onChange(()=>{
            cubeMaterial.aoMap = options.aoMap?aoTexture:null;
            cubeMaterial.needsUpdate = true;
        })
folder7.open();

const folder8 = gui.addFolder('环境反射贴图')
folder8.add(options,'envMap')
        .onChange(()=>{
            cubeMaterial.envMap = options.envMap?textureCube:null;
            cubeMaterial.needsUpdate = true;
        })
folder8.open();


const tick = () =>{
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick);
}
tick();