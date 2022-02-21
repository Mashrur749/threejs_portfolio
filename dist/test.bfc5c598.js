// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/test.js":[function(require,module,exports) {
///////////////////////////////////////////////////////////////////
// CSS3DRenderer Demo
// By Philippe Leefsma, July 2015
///////////////////////////////////////////////////////////////////
//References:
//http://codereply.com/answer/83pofc/threejs-properly-blending-css3d-webgl.html
//http://learningthreejs.com/blog/2013/04/30/closing-the-gap-between-html-and-webgl/
var controls, camera, glScene, cssScene, glRenderer, cssRenderer; ///////////////////////////////////////////////////////////////////
// Creates WebGL Renderer
//
///////////////////////////////////////////////////////////////////

function createGlRenderer() {
  var glRenderer = new THREE.WebGLRenderer({
    alpha: true
  });
  glRenderer.setClearColor(0xECF8FF);
  glRenderer.setPixelRatio(window.devicePixelRatio);
  glRenderer.setSize(window.innerWidth, window.innerHeight);
  glRenderer.domElement.style.position = 'absolute';
  glRenderer.domElement.style.zIndex = 1;
  glRenderer.domElement.style.top = 0;
  return glRenderer;
} ///////////////////////////////////////////////////////////////////
// Creates CSS Renderer
//
///////////////////////////////////////////////////////////////////


function createCssRenderer() {
  var cssRenderer = new THREE.CSS3DRenderer();
  cssRenderer.setSize(window.innerWidth, window.innerHeight);
  cssRenderer.domElement.style.position = 'absolute';
  glRenderer.domElement.style.zIndex = 0;
  cssRenderer.domElement.style.top = 0;
  return cssRenderer;
} ///////////////////////////////////////////////////////////////////
// Creates plane mesh
//
///////////////////////////////////////////////////////////////////


function createPlane(w, h, position, rotation) {
  var material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    opacity: 0.0,
    side: THREE.DoubleSide
  });
  var geometry = new THREE.PlaneGeometry(w, h);
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = position.x;
  mesh.position.y = position.y;
  mesh.position.z = position.z;
  mesh.rotation.x = rotation.x;
  mesh.rotation.y = rotation.y;
  mesh.rotation.z = rotation.z;
  return mesh;
} ///////////////////////////////////////////////////////////////////
// Creates CSS object
//
///////////////////////////////////////////////////////////////////


function createCssObject(w, h, position, rotation, url) {
  var html = ['<div style="width:' + w + 'px; height:' + h + 'px;">', '<iframe src="' + url + '" width="' + w + '" height="' + h + '">', '</iframe>', '</div>'].join('\n');
  var div = document.createElement('div');
  $(div).html(html);
  var cssObject = new THREE.CSS3DObject(div);
  cssObject.position.x = position.x;
  cssObject.position.y = position.y;
  cssObject.position.z = position.z;
  cssObject.rotation.x = rotation.x;
  cssObject.rotation.y = rotation.y;
  cssObject.rotation.z = rotation.z;
  return cssObject;
} ///////////////////////////////////////////////////////////////////
// Creates 3d webpage object
//
///////////////////////////////////////////////////////////////////


function create3dPage(w, h, position, rotation, url) {
  var plane = createPlane(w, h, position, rotation);
  glScene.add(plane);
  var cssObject = createCssObject(w, h, position, rotation, url);
  cssScene.add(cssObject);
} ///////////////////////////////////////////////////////////////////
// Creates material with random color
//
///////////////////////////////////////////////////////////////////


function createColoredMaterial() {
  var material = new THREE.MeshBasicMaterial({
    color: Math.floor(Math.random() * 16777215),
    shading: THREE.FlatShading,
    side: THREE.DoubleSide
  });
  return material;
} ///////////////////////////////////////////////////////////////////
// Creates 3D geometry to place in the scene
//
///////////////////////////////////////////////////////////////////


function create3dGeometry() {
  var mesh1 = new THREE.Mesh(new THREE.CylinderGeometry(0, 200, 300, 20, 4), createColoredMaterial());
  mesh1.position.x = 0;
  mesh1.position.y = -300;
  mesh1.position.z = 400;
  glScene.add(mesh1);
  var mesh2 = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), createColoredMaterial());
  mesh2.position.x = -300;
  mesh2.position.y = -300;
  mesh2.position.z = 400;
  glScene.add(mesh2);
  var mesh3 = new THREE.Mesh(new THREE.SphereGeometry(100, 128, 128), createColoredMaterial());
  mesh3.position.x = 500;
  mesh3.position.y = -300;
  mesh3.position.z = 400;
  glScene.add(mesh3);
} ///////////////////////////////////////////////////////////////////
// Initializes scene
//
///////////////////////////////////////////////////////////////////


function initialize() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 100, 3000);
  controls = new TrackballControls(camera);
  glRenderer = createGlRenderer();
  cssRenderer = createCssRenderer(); //document.body.appendChild(glRenderer.domElement);

  document.body.appendChild(cssRenderer.domElement);
  cssRenderer.domElement.appendChild(glRenderer.domElement);
  glScene = new THREE.Scene();
  cssScene = new THREE.Scene();
  var ambientLight = new THREE.AmbientLight(0x555555);
  glScene.add(ambientLight);
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(-.5, .5, -1.5).normalize();
  glScene.add(directionalLight);
  create3dPage(1000, 1000, new THREE.Vector3(-1050, 0, 400), new THREE.Vector3(0, 45 * Math.PI / 180, 0), 'http://viewer.autodesk.io/node/ng-gallery/#/home');
  create3dPage(900, 1000, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), 'http://adndevblog.typepad.com/cloud_and_mobile');
  create3dPage(1000, 1000, new THREE.Vector3(1050, 0, 400), new THREE.Vector3(0, -45 * Math.PI / 180, 0), 'http://mongo.autodesk.io');
  create3dGeometry();
  update();
} ///////////////////////////////////////////////////////////////////
// Updates scene
//
///////////////////////////////////////////////////////////////////


function update() {
  controls.update();
  glRenderer.render(glScene, camera);
  cssRenderer.render(cssScene, camera);
  requestAnimationFrame(update);
} ///////////////////////////////////////////////////////////////////
// On document ready
//
///////////////////////////////////////////////////////////////////


$(document).ready(function () {
  initialize();
});
},{}],"C:/Users/rmash/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57097" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/rmash/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/test.js"], null)
//# sourceMappingURL=/test.bfc5c598.js.map