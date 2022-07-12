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

// Font
const fontLoader = new THREE.FontLoader()

const donutsArray = [];

fontLoader.load(
    './fonts/ali-puhui-extrabold.json',
    (font) =>
    {
        console.log('loaded')

        const textGeometry = new THREE.TextGeometry(
            '大帅老猿',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        
        const matcapTexture = new THREE.TextureLoader().load("./textures/matcap2.png");
        const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)

        // textGeometry.computeBoundingBox()
        // console.log(textGeometry.boundingBox)

        // text.position.set(
        //     textGeometry.boundingBox.max.x*-.5,
        //     textGeometry.boundingBox.max.y*-.5,
        //     textGeometry.boundingBox.max.z*-.5
        // )

        textGeometry.center();

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        
        for(let i = 0; i < 100; i++)
        {
            const donut = new THREE.Mesh(donutGeometry, donutMaterial)
            scene.add(donut)

            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donut.scale.set(scale, scale, scale)

            donutsArray.push(donut);
        }
    }
)


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

const tick = () =>{

    for(let i = 0;i<donutsArray.length;i++){
        let donut = donutsArray[i];
        donut.rotation.x += 0.01;
        donut.rotation.y += 0.01;
    }

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick);
}
tick();