import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { TweenLite } from "https://unpkg.com/gsap@2.1.3/TweenLite.js"
// import * as THREE from "./three.module.js";
// import { TweenLite } from "./TweenLite.js"

export function colorToFog(target, value) {
    const color2 = new THREE.Color( value );
    var initial = new THREE.Color(target.color);
    TweenLite.to(initial, 3, {
        r: color2.r,
        g: color2.g,
        b: color2.b,
        onUpdate: function () {
          target.color = initial;
        }
    });
  }
  export function colorToScene(target, value) {
    const color2 = new THREE.Color( value );
    var initial = target.background
    TweenLite.to(initial, 1.5, {
        r: color2.r,
        g: color2.g,
        b: color2.b,
        onUpdate: function () {
          target.color = initial;
        }
    });
  }
  export function colorToLight(target, value) {
    const color2 = new THREE.Color( value );
    var initial = new THREE.Color(target.color);
    TweenLite.to(initial, 3, {
        r: color2.r,
        g: color2.g,
        b: color2.b,
        onUpdate: function () {
          target.color = initial;
        }
    })
  }
