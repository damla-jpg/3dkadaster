import React, { Component } from 'react'
import { OBJLoader } from 'three-stdlib'
import "./App.css"
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Object3D } from 'three'

// Global GL Variables
var scene, camera, renderer, controls;
// City reference
var city1 = new Object3D;

// Init application
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "/objects/amsterdam_ne.obj"
    }
  }

  // On view change (tab changes -> forces model change)
  setView = (city) => {
    // Set view state
    this.setState({ view: city })
    // Clear the scene and add the model to the scene
    scene.clear()
    this.addToScene(this.state.view);
  }

  // Handles the model change
  addToScene = (path) => {
    const loader = new OBJLoader();

    var city_geometry

    loader.load(
      path,

      function (object) {
        // Init City
        city1 = object
        scene.add(city1);
        renderer.render(scene, camera);

        city_geometry = new THREE.Box3().setFromObject(object);
        const center = city_geometry.getCenter(new THREE.Vector3());

        // Set City Transform
        object.position.x += (object.position.x - center.x);
        object.position.y += (object.position.y - center.y);
        object.position.z += (object.position.z - center.z);


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
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor("#202020");
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene = new THREE.Scene();

    var camera_render_distance = 50000
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, camera_render_distance);

    controls = new OrbitControls(camera, renderer.domElement);

    // Set camera postion
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 1500;

    // Camera settings
    controls.enableDamping = false;
    controls.minAzimuthAngle = 0
    controls.maxAzimuthAngle = 0
    controls.panSpeed = 5
    controls.zoomSpeed = 5

    controls.update()
    this.mount.appendChild(renderer.domElement);

    console.log('Cagrildims')
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
        <header className='app-header'>Welcome to 3D Kadaster!</header>
        <p className='note'>Note to user: If the city does not load please wait a little bit. Since rendering city models can be challenging
          for React it can take a couple minutes to show. You can also simply try to load another city first and then move back to the other.
          Use right click and/or the mouse wheel to move around the object and left click to look up and down.
        </p>
        <button className="nav-button" onClick={() => this.setView("/objects/amsterdam_ne.obj")}>Amsterdam North East</button>
        <button className="nav-button" onClick={() => this.setView("/objects/amsterdam_nw.obj")}>Amsterdam North West</button>
        <button className="nav-button" onClick={() => this.setView("/objects/amsterdam_se.obj")}>Amsterdam South East</button>
        <button className="nav-button" onClick={() => this.setView("/objects/amsterdam_sw.obj")}>Amsterdam South West</button>
        <button className="nav-button" onClick={() => this.setView("/objects/groningen.obj")}>Groningen</button>
        <button className="nav-button" onClick={() => this.setView("/objects/maastricht.obj")}>Maastricht</button>
        <button className="nav-button" onClick={() => this.setView("/objects/rotterdam.obj")}>Rotterdam</button>
      </div>
    )
  }

}
