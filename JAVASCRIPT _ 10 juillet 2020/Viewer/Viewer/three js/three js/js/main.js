var createApp = function () {
  let self = {}
  let scene = undefined;
  let camera = undefined;
  let renderer = undefined;
  var cube = undefined;
  var controls = undefined;


  var init = function () {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


    renderer = new THREE.WebGLRenderer({alpha:true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    camera.position.z = 5;

    controls = new THREE.OrbitControls( camera, renderer.domElement );

    
    setUpScene()
    setUpMesh()

  }

  var setUpScene= function () {
    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    var light = new THREE.AmbientLight( 0xffffff );
      scene.add(light);

  }

  var setUpMesh = function(){
    var loader = new THREE.GLTFLoader().setPath('./img/');
    console.log(loader);
    loader.load('Lilly.gltf', function(gltf){
      console.log(gltf);
      scene.add(gltf.scene)
    })
  }


  var start = function () {
    function animate() {
    	requestAnimationFrame( animate );
    	render()
    }
    animate();

  }

  var render = function () {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update();
    renderer.render( scene, camera );
  }


  self.init = init
  self.render = render
  self.start = start
  return self
}

var app = createApp()
app.init()
app.start()
