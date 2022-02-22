import "../style.css";
import * as THREE from "three";
import vertexShader from "./shaders/vertexShader.glsl";
import fragmentShader from "./shaders/fragmentShader.glsl";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import gsap from "gsap";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";

const timeline = gsap.timeline({
  defaults: {
    duration: 1,
  },
});

timeline
  .from("nav", {
    y: -100,
    opacity: 0,
  })
  .from(
    "#headshot",
    {
      y: -100,
      opacity: 0,
    },
    "<.5"
  )
  .from(
    "#site-header",
    {
      y: 100,
      opacity: 0,
    },
    "<"
  )
  .from(".section-headers", {
    y: -100,
    opacity: 0,
  });

let scrollable = document.querySelector(".scrollable");
const imageElements = document.querySelectorAll(".bit-map-images");
// const imageElements = [];
let current = 0;
let target = 0;
let ease = 0.075;

// Linear inetepolation used for smooth scrolling and image offset uniform adjustment

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

// init function triggered on page load to set the body height to enable scrolling and EffectCanvas initialised
function init() {
  document.body.style.height = `${scrollable.getBoundingClientRect().height}px`;
}

// translate the scrollable div using the lerp function for the smooth scrolling effect.
function smoothScroll() {
  target = window.scrollY;
  current = lerp(current, target, ease);
  scrollable.style.transform = `translateY(${-current}px)`;
}

class Environment {
  constructor() {
    this.container = document.querySelector("main");
    this.images = [...imageElements];
    this.headerTextMesh = null;
    this.meshItems = []; // Used to store all meshes we will be creating.
    this.setupCamera();
    // this.createHeaderText();
    // this.createJobExperience();
    this.createImageMeshItems();
    this.render();
  }

  // Getter function used to get screen dimensions used for the camera and mesh materials
  get viewport() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let aspectRatio = width / height;
    return {
      width,
      height,
      aspectRatio,
    };
  }

  setupCamera() {
    window.addEventListener("resize", this.onWindowResize.bind(this), false);

    // Create new scene
    this.scene = new THREE.Scene();

    // Initialize perspective camera

    let perspective = 1000;
    const fov =
      (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI; // see fov image for a picture breakdown of this fov setting.
    this.camera = new THREE.PerspectiveCamera(
      fov,
      this.viewport.aspectRatio,
      1,
      1000
    );
    this.camera.position.set(0, 0, perspective); // set the camera position on the z axis.

    // renderer
    // this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.viewport.width, this.viewport.height); // uses the getter viewport function above to set size of canvas / renderer
    this.renderer.setPixelRatio(window.devicePixelRatio); // Import to ensure image textures do not appear blurred.
    this.container.appendChild(this.renderer.domElement); // append the canvas to the main element
  }

  onWindowResize() {
    init();
    this.camera.aspect = this.viewport.aspectRatio; // readjust the aspect ratio.
    this.camera.updateProjectionMatrix(); // Used to recalulate projectin dimensions.
    this.renderer.setSize(this.viewport.width, this.viewport.height);
  }

  createHeaderText() {
    this.headerTextMesh = new MeshTextItem(
      document.getElementById("header-text"),
      this.scene
    );
  }

  createImageMeshItems() {
    // Loop thorugh all images and create new MeshItem instances. Push these instances to the meshItems array.
    this.images.forEach((image) => {
      let meshItem = new ImageMappedShader(image, this.scene);
      this.meshItems.push(meshItem);
    });
  }

  // Animate smoothscroll and meshes. Repeatedly called using requestanimationdrame
  render() {
    smoothScroll();
    for (let i = 0; i < this.meshItems.length; i++) {
      this.meshItems[i].render();
    }
    // this.headerTextMesh.render();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}

class MeshItem {
  // Pass in the scene as we will be adding meshes to this scene.
  constructor(element, scene) {
    this.element = element;
    this.scene = scene;
    this.offset = new THREE.Vector2(0, 0); // Positions of mesh on screen. Will be updated below.
    this.sizes = new THREE.Vector2(0, 0); //Size of mesh on screen. Will be updated below.

    this.createMesh();
  }

  setDimensions() {
    const { width, height, top, left } = this.element.getBoundingClientRect();
    this.sizes.set(width, height);
    this.offset.set(
      left - window.innerWidth / 2 + width / 2,
      -top + window.innerHeight / 2 - height / 2
    );
  }
}

class MeshTextItem extends MeshItem {
  constructor(element, scene) {
    super(element, scene);
    this.createMesh();
  }
  createMesh() {
    this.fontLoader = new FontLoader();
    this.fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
      const textGeometry = new TextGeometry(
        "Welcome to My Portfolio. \n ~Mashrur",
        {
          font,
          size: 0.5,
          height: 0.2,
          curveSegments: 5,
          bevelEnabled: true,
          bevelThickness: 0.02,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 4,
        },
        () => {},
        (err) => {
          console.log(err);
        }
      );

      textGeometry.center();

      const material = new THREE.MeshNormalMaterial({});
      this.mesh = new THREE.Mesh(textGeometry, material);
      this.setDimensions();
      this.render();
      this.scene.add(this.mesh);
    });
  }

  render() {
    // this function is repeatidly called for each instance in the aboce
    const { width, height, top, left } = this.element.getBoundingClientRect();
    if (this.mesh) {
      this.setDimensions();
      this.mesh.position.set(this.offset.x, this.offset.y, 0);
      this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);
    }
  }
}

class ImageMappedShader extends MeshItem {
  constructor(element, scene) {
    super(element, scene);
  }
  createMesh() {
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 100, 100);
    this.imageTexture = new THREE.TextureLoader().load(this.element.src);
    this.uniforms = {
      uTexture: {
        //texture data
        value: this.imageTexture,
      },
      uOffset: {
        //distortion strength
        value: new THREE.Vector2(0.0, 0.0),
      },
      uAlpha: {
        //opacity
        value: 1.0,
      },
    };
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      // wireframe: true,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.setDimensions(); // set offset and sizes for placement on the scene
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);

    this.scene.add(this.mesh);
  }

  render() {
    // this function is repeatidly called for each instance in the aboce
    this.setDimensions();
    this.mesh.position.set(this.offset.x, this.offset.y, 0);
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);
    this.uniforms.uOffset.value.set(
      this.offset.x * 0.0,
      -(target - current) * 0.0003
    );
  }
}

init();
new Environment();

function make3DElementObject(type, width, height) {
  const obj = new THREE.Object3D();

  const element = document.createElement(type);
  element.style.width = width + "px";
  element.style.height = height + "px";
  element.style.opacity = 0.999;
  element.style.boxSizing = "border-box";

  var css3dObject = new CSS3DObject(element);
  obj.css3dObject = css3dObject;
  obj.add(css3dObject);

  // make an invisible plane for the DOM element to chop
  // clip a WebGL geometry with it.
  var material = new THREE.MeshPhongMaterial({
    opacity: 0.15,
    color: new THREE.Color(0x111111),
    blending: THREE.NoBlending,
    // side	: THREE.DoubleSide,
  });
  var geometry = new THREE.BoxGeometry(width, height, 1);
  var mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  obj.lightShadowMesh = mesh;
  obj.add(mesh);

  return obj;
}
