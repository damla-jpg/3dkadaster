import React, {  Component } from 'react'
import { OBJLoader } from 'three-stdlib'
import "./App.css"
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Object3D } from 'three'
import ReadMe from "./README"

var scene, camera, renderer;
var city1 = new Object3D;

// const Home = () => {
//   return (
//     <div className='App' ref={mount => {
//       this.mount = mount;
//     }}>
//       <button className='readme'>Read Before Using</button>
//       <header className='app-header'>Welcome to 3D Kadaster!</header>
//       {/* <button className="nav-button" onClick={() => this.setView("/objects/city_small.obj")}>Small City</button>
//       <button className="nav-button" onClick={() => this.setView("/cube.obj")}>Cube</button> */}
//       <button className="nav-button" onClick={() => this.setView("/objects/amsterdam_ne.obj")}>Amsterdam North East</button>
//       <button className="nav-button" onClick={() => this.setView("/objects/amsterdam_nw.obj")}>Amsterdam North West</button>
//       <button className="nav-button" onClick={() => this.setView("/objects/amsterdam_se.obj")}>Amsterdam South East</button>
//       <button className="nav-button" onClick={() => this.setView("/objects/amsterdam_sw.obj")}>Amsterdam South West</button>
//       <button className="nav-button" onClick={() => this.setView("/objects/enschede.obj")}>Enschede</button>
//       <button className="nav-button" onClick={() => this.setView("/objects/groningen.obj")}>Groningen</button>
//       <button className="nav-button" onClick={() => this.setView("/objects/maastricht.obj")}>Maastricht</button>
//       <button className="nav-button" onClick={() => this.setView("/objects/rotterdam.obj")}>Rotterdam</button>
//     </div>
//   )

// }

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "/objects/amsterdam_ne.obj",
      page: 1
    }
  }

  togglePage = () => {
    switch (this.state.page) {
        case 1:
            return <Home/>;
        case 2:
            return <AboutUs/>;
        case 3:
            return <Contact/>;
        default:
            return ;
    }
}

  setView = (city) => {
    this.setState({ view: city })
    console.log(this.state.view)
    scene.clear()
    this.addToScene(this.state.view);
  }

  addToScene = (path) => {
    var manager = new THREE.LoadingManager();
    const loader = new OBJLoader(manager);
    // load a resource
    loader.load(
      // resource URL
      path,
      // called when resource is loaded
      function (object) {
        city1 = object
        scene.add(city1);
        renderer.render(scene, camera);
        const aabb = new THREE.Box3().setFromObject(object);
        const center = aabb.getCenter(new THREE.Vector3());

        object.position.x += (object.position.x - center.x + 100);
        object.position.y += (object.position.y - center.y);
        object.position.z += (object.position.z - center.z+ 500);
      },
      // called when loading is in progresses
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      // called when loading has errors
      function (error) {
        console.log('An error happened');
      }
    );

    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  
    scene.add(light);
  }

  componentDidMount() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(125, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 10
    camera.position.y = -5;
    camera.position.z = 5;
    camera.position.fromArray([-20, 10, -140]);
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor("#202020");
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(renderer.domElement);
    var controls = new OrbitControls(camera, renderer.domElement);

    this.setView(city1);


    var animate = function () {
      requestAnimationFrame(animate);
      controls.update()
      renderer.render(scene, camera);
    };
    animate();
  }

  render() {
    return (
      <div className='App' ref={mount => {
        this.mount = mount;
      }}>
        {/* <button className='readme'>Read Before Using</button> */}
        <header className='app-header'>Welcome to 3D Kadaster!</header>
        {/* <button className="nav-button" onClick={() => this.setView("/objects/city_small.obj")}>Small City</button>
        <button className="nav-button" onClick={() => this.setView("/cube.obj")}>Cube</button> */}
        <button className="nav-button" onClick={() => this.setView("/objects/amsterdam_ne.obj")}>Amsterdam North East</button>
        <button className="nav-button" onClick={() => this.setView("/objects/amsterdam_nw.obj")}>Amsterdam North West</button>
        <button className="nav-button" onClick={() => this.setView("/objects/amsterdam_se.obj")}>Amsterdam South East</button>
        <button className="nav-button" onClick={() => this.setView("/objects/amsterdam_sw.obj")}>Amsterdam South West</button>
        <button className="nav-button" onClick={() => this.setView("/objects/enschede.obj")}>Enschede</button>
        <button className="nav-button" onClick={() => this.setView("/objects/groningen.obj")}>Groningen</button>
        <button className="nav-button" onClick={() => this.setView("/objects/maastricht.obj")}>Maastricht</button>
        <button className="nav-button" onClick={() => this.setView("/objects/rotterdam.obj")}>Rotterdam</button>
      </div>
    )
  }

}
