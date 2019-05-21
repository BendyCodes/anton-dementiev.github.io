
include('com/three');
include('com/threejs/Projector');
include('com/threejs/CanvasRenderer');
include('com/threejs/MTLLoader');
include('com/threejs/OBJMTLLoader');
include('com/threejs/ColladaLoader');
include('com/threejs/DDSLoader');

GodStep.ThreeJS = function (soul){
    this.soul = soul;
    this.loadState = 0;
    var renderer;

    if(soul.WEBGL) {
        this.renderer = renderer = new THREE.WebGLRenderer({ alpha: true,  antialias: true})
    } else {
        this.renderer = renderer = new THREE.CanvasRenderer({ alpha: true});
    }

    this.camera3D = new THREE.PerspectiveCamera(70, soul.W/soul.H, 1, 1000 );
   // this.camera3D.position.z = 450;
    //this.camera3D.position.y = 150;
    //this.camera3D.position.z = 500;

    this.scene3D = new THREE.Scene();

    renderer.setSize(soul.W, soul.H);
  //  renderer.setClearColor(0x00ff00, .1);

    soul.div.appendChild(renderer.domElement);
    var soulCanvas = (soul.WEBGL) ? soul.webgl.view : soul.canvas.view;
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.left = soulCanvas.offsetLeft + 'px';
    renderer.domElement.style.top = soulCanvas.offsetTop + 'px';

    renderer.domElement.style.zIndex =  soulCanvas.style.zIndex -1;

};
extend(GodStep.ThreeJS, Object);

pro.render3D = function() {
    var renderer = this.renderer;
    var scene = this.scene3D;
    var camera = this.camera3D;

    renderer.render(scene, camera);
};
pro.resize = function(w, h) {
    this.resolution = 1;

    var canvas = this.renderer.domElement;
    canvas.width = w / this.resolution;
    canvas.height = h / this.resolution;


    canvas.style.width = w / this.resolution + "px";
    canvas.style.height = h / this.resolution + "px";
};

pro.loadModelDae = function(name, callBack) {
    this.callback = callBack;

    var r = GodPath + "img/models/" + name + '.dae';
    var loader = new THREE.ColladaLoader();
    loader.three = this;

    loader.load(r, this.h_loadModel, this.h_progressModel, this.h_errorModel );
};
pro.loadModel = function(name, callBack) {
    this.callback = callBack;
    var r = GodPath + "img/models/" + name + "/";
  // THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
    var loader = new THREE.OBJMTLLoader();
        loader.three = this;

    loader.load( r + name + '.obj', r + name + '.mtl', this.h_loadModel, this.h_progressModel, this.h_errorModel );
};
pro.loadCubeTexture = function(name, callBack) {
    this.callBack = callBack;
    if(this.renderer instanceof THREE.WebGLRenderer) {
        if(!this.cubeScene) {
            this.cubeScene = new THREE.Scene();
            this.cubeCamera = new THREE.PerspectiveCamera(50, this.soul.W/this.soul.H, 1, 1000);
            this.cubeScene.add( this.cubeCamera );

            this.cubeTextures = [];
        }

        var r = GodPath + "img/models/cube/" + name + "/";
        this.cubeTextureUrls = [ r + "px.jpg", r + "nx.jpg",
            r + "py.jpg", r + "ny.jpg",
            r + "pz.jpg", r + "nz.jpg" ];
        this.cubeTextureUrls.name = name;
        this.cubeTexturesNeedToLoaded = this.cubeTextureUrls.length;
        for(var i = 0; i<this.cubeTexturesNeedToLoaded; i++) {
            new GodStep.Ajax(this.cubeTextureUrls[i], this, this.h_loadedTexture, this.h_errorTexture);
        }
    } else {
        this.callBack();
    }
};

pro.h_loadModel = function(object) {
    object.loader.three.scene3D.add(object);
    object.loader.three.callBack();
};
pro.h_errorModel = function(e) {
    trace('error' + e);
};
pro.h_progressModel = function(e) {
   // trace('progress' + e);
};
pro.h_errorTexture = function(e) {
    trace(e);
};
pro.h_loadedTexture = function(e) {
    var parent = e.currentTarget.parent;
    parent.cubeTexturesNeedToLoaded--;
    if(parent.cubeTexturesNeedToLoaded == 0) {
        var textureCube = THREE.ImageUtils.loadTextureCube( parent.cubeTextureUrls );
        parent.cubeTextures[parent.cubeTextureUrls.name] = textureCube;
        var shader = THREE.ShaderLib[ "cube" ];
        shader.uniforms[ "tCube" ].value = textureCube;
        var material = new THREE.ShaderMaterial( {
                fragmentShader: shader.fragmentShader,
                vertexShader: shader.vertexShader,
                uniforms: shader.uniforms,
                depthWrite: false,
                side: THREE.BackSide
            } ),
            mesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), material );
        parent.cubeScene.add( mesh );
        parent.callBack();
    }
};
