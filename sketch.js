let vehicles = [];
let fireFlies = [];


let video;
let poseNet;
let poses = [];

let debug = true;
let flowfield, flowfield2;

let button1, button2;
let theShader;

let shaderBg;

let right = false;

let img, backImage;

let countfireFlies = 0;

let keypoint_x,keypoint_y;

var positions = [];

let pose;
let skeleton;

let brain;
let state = 'waiting';
let xslider, yslider;
let targetfield;
const count = 500
let yCount = 0

let brain2;
let poseLabel = "Y";

var constellation = [];
var n;
var dconst;
var k = 100;
var freeCount = 0;



function keyPressed() {
  if (key == 's') {
    brain.saveData();
  } else if (key == 'd') {

    let r = xslider.value();
    let f = yslider.value();
    targetfield = [r, f];

    console.log(r, f);


    setTimeout(function () {
      console.log('collecting');
      state = 'collecting';
      setTimeout(function () {
        console.log('not collecting');
        state = 'waiting';
      }, 5000)
    }, 5000)
  }
}


function preload() {
  img = loadImage('scene.png');
  backImage = loadImage("a.jpeg");
  theShader = loadShader('performance.vert', 'performance.frag');
}


function setup() {
  createCanvas(windowWidth-25, windowHeight-30);

  n = 80;

  for (var i = 0; i <= n; i++) {
    constellation.push(new star());
  }

  xslider = createSlider(0, width, 0);
  yslider = createSlider(0, height, 0);

  colorMode(HSB,360,100,100,250);

    // Make graphics buffer
    shaderBg = createGraphics(windowWidth, windowHeight, WEBGL);
  
    img.resize(width,height);

 
  for (let i = 0; i < 90; i++) {
    vehicles.push(new Vehicle(random(width), random(height),random() ,random(0.05,0.5), random(), random(0.5,1),random(0.02,0.1),i*PI/31,random(0.001,0.06), random(5,15)));
  }
  for (let i = 0; i < 60; i++) {
    fireFlies.push(new Firefly(random(width/4, 3*width/4), random(height/2),random() ,random(0.05,0.5), random(), random(0.5,1),random(0.02,0.1),i*PI/31,random(0.001,0.06), random(15,25)));
  }

  flowfield = new FlowField(20,4.9);
  flowfield2 = new FlowField(20,1.1);

    // Create a camera object, and a poseNet tracker for it
    video = createCapture(VIDEO);
    video.size(width, height);
    poseNet = ml5.poseNet(video);
    poseNet.on('pose', function(results) {
    if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;

    if (state == 'collecting') {
      let inputs = [];
      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        inputs.push(x);
        inputs.push(y);
      }

      brain.addData(inputs, targetfield);
    }
      }
    poses = results;
   });
   video.hide();
   
  let options = {
    inputs: 34,
    outputs: 2,
    task: 'regression',
    debug: true
  }
  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'model.json',
    metadata: 'model_meta.json',
    weights: 'model.weights.bin'
  }
  brain.load(modelInfo, brainLoaded);
  //brain.loadData('flowfield.json', dataReady);

  let options2 = {
    inputs: 34,
    outputs: 4,
    task: 'classification',
    debug: true
  }
  brain2 = ml5.neuralNetwork(options2);
  const modelInfo2 = {
    model: 'model2.json',
    metadata: 'model_meta2.json',
    weights: 'model.weights2.bin',
  };
  brain2.load(modelInfo2, brainLoaded2);

}

function brainLoaded2() {
  classifyPose();
}

function brainLoaded() {
  predictPose();
}

function classifyPose() {
  if (pose) {
    let inputs2 = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs2.push(x);
      inputs2.push(y);
    }
    brain2.classify(inputs2, gotResult2);
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult2(error, results) {
  
  if (results[0].confidence > 0.75) {
    poseLabel = results[0].label.toUpperCase();
  }
  //console.log(results[0].confidence);
  classifyPose();
}

function predictPose() {
  if (pose) {
    let inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.predict(inputs, gotResault);
  } else {
    setTimeout(predictPose, 100);
  }
}

function dataReady() {
  brain.normalizeData();
  brain.train({ epochs: 50 }, finished);
}

function finished() {
  console.log('model trained');
  brain.save();
}

function gotResault(error, resaults) {
  let r = resaults[0].value;
  let f = resaults[1].value;
  xslider.value(r);
  yslider.value(f);
  predictPose();
}


function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  translate(width,0);
  scale(-1, 1);

  drawShader2();

  push();
  blendMode(OVERLAY);
  drawShader();
  pop();

  var firefliyopacity = 0;

if(poseLabel == 'A'){
if(freeCount<10){
  freeCount+=0.2;
  firefliyopacity = freeCount;
}if(freeCount> 10 && freeCount < 20){
  freeCount+=0.2;
  firefliyopacity = map(freeCount,10,18,10,0);
}
for (let f of fireFlies) {
  f.run(keypoint_x,keypoint_y);
  f.follow(flowfield);
  f.follow(flowfield2);
  f.display(firefliyopacity,firefliyopacity);
  f.light(random(1,3.5),random(0.2),random(0.05,0.2));
}
  }else{
    freeCount = 0;
  }

  let r = xslider.value();
  let f = yslider.value();

  if (debug) flowfield.display();
  flowfield.init(r,f);

  if (debug) flowfield2.display();
  flowfield2.init(r,f);

  for (let v of vehicles) {
    // v.applyBehaviors(vehicles);
    v.run(keypoint_x,keypoint_y);
    v.follow(flowfield);
    v.follow(flowfield2);
    v.display();
    v.light(random(1,3.5),random(0.2),random(0.05,0.2));
  }

  if(countfireFlies > 50){
    countfireFlies = 50;
  }

  for (let i = 0; i < poses.length; i++) {
    let pose = poses[0].pose;
    if(pose.keypoints[9].position.x < pose.keypoints[10].position.x){
    keypoint_x = pose.keypoints[9].position.x;   
    keypoint_y = pose.keypoints[9].position.y;  
    }else{
      keypoint_x = pose.keypoints[10].position.x;   
      keypoint_y = pose.keypoints[10].position.y;   
    }
    positions.push(keypoint_x)

    if(positions.length > 2) {
      positions.splice(0,1);    
    }
  }

  if(abs(positions[0] - positions[1])>=20){
    if(countfireFlies > -1){
      countfireFlies -= 100;
      }
  }


  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint5 = pose.keypoints[5];
      let keypoint6 = pose.keypoints[6];
      let keypoint11 = pose.keypoints[11];
      let keypoint12 = pose.keypoints[12];
      let keypoint9 = pose.keypoints[9];
      let keypoint7 = pose.keypoints[7];
      let keypoint8 = pose.keypoints[8];
      let keypoint10 = pose.keypoints[10];
      let keypoint0 = pose.keypoints[0];
      let keypoint1 = pose.keypoints[1];
      let keypoint2 = pose.keypoints[2];
      let dist_x = abs(keypoint1.position.x - keypoint2.position.x)/2;
      let handDist = map(dist_x, 9 , 60 , 1 , 2);

      if (keypoint5.score > 0.2) {
        noStroke();

        // var m = 1
        fill(250,250); 

        // ellipse(keypoint10.position.x,keypoint10.position.y,10,10);
        // ellipse(keypoint9.position.x,keypoint9.position.y,10,10);


        // push();
        // beginShape();
        // curveVertex(keypoint5.position.x - m * cos(TWO_PI),keypoint5.position.y + m * sin(TWO_PI));
        // curveVertex(keypoint5.position.x - m * cos(TWO_PI),keypoint5.position.y + m * sin(TWO_PI));
        // curveVertex(keypoint6.position.x - m * cos(TWO_PI),keypoint6.position.y + m * sin(TWO_PI));
        // curveVertex(keypoint6.position.x+20 - m * cos(TWO_PI),(keypoint6.position.y+keypoint12.position.y)/2 + m * sin(TWO_PI));
        // curveVertex(keypoint12.position.x - m * cos(TWO_PI),keypoint12.position.y + m * sin(TWO_PI));
        // curveVertex(keypoint11.position.x + m * cos(TWO_PI),keypoint11.position.y - m * sin(TWO_PI));
        // curveVertex(keypoint5.position.x-20 + m * cos(TWO_PI),(keypoint5.position.y+keypoint11.position.y)/2 - m * sin(TWO_PI));
        // curveVertex(keypoint5.position.x + m * cos(TWO_PI),keypoint5.position.y - m * sin(TWO_PI));
        // curveVertex(keypoint6.position.x + m * cos(TWO_PI),keypoint6.position.y - m * sin(TWO_PI));
        // curveVertex(keypoint6.position.x + m * cos(TWO_PI),keypoint6.position.y - m * sin(TWO_PI));
        // endShape(CLOSE); 
        // pop();

        // m = 10;

      }
    }
  }
  // text(poseLabel, width / 2, height / 2);
}


let angle = 0.0;
let d = 0.0;
function drawShader2(){
  // pass the shader to the graphics buffer
  shaderBg.shader(theShader);

  let yMouse = sin(angle);
  let xMouse = cos(angle);

  d = abs(sin(angle))*0.06;
 let brightness = 0.7;

 if(abs(sin(angle))>=0.6){
  angle += random(0,0.05);
 }else{
   angle += random(0,0.008);
 }


  

  // pass the interactive information to the shader
  theShader.setUniform('resolution', [width, height]);
  theShader.setUniform('mouse', [xMouse, yMouse]);
  theShader.setUniform('texImg', backImage);
  theShader.setUniform('count', d);
  theShader.setUniform('brightness', brightness);

  // draw the shader
  shaderBg.rect(0,0,width,height);
  image(shaderBg,0,0,width,height);
}


function drawShader(){
  // pass the shader to the graphics buffer
  shaderBg.shader(theShader);
  
  // get the mouse coordinates, map them to values between 0-1 space

  let yMouse = map(keypoint_y, 0, height, height, 0) / height;
  let xMouse = keypoint_x / width;

 let c = map(countfireFlies, 0 , 50, 100.0, 5.0);
 let brightness = 1.0 - (10 * d);


  // pass the interactive information to the shader
  theShader.setUniform('resolution', [width, height]);
  theShader.setUniform('mouse', [xMouse, yMouse]);
  theShader.setUniform('texImg', img);
  theShader.setUniform('brightness', brightness);
  theShader.setUniform('count', c);

  // draw the shader
  shaderBg.rect(0,0,width,height);
  image(shaderBg,0,0,width,height);
}


function star() {

  this.a = random(5 * TAU); // "5*TAU" => render will be more homogeneous
  this.r = random(k/2 * .2, k/2 * .25); // first position will looks like a donut
  this.loc = createVector(k / 2 + sin(this.a) * this.r, k / 2 + cos(this.a) * this.r);
  this.speed = createVector();
  this.speed = p5.Vector.random2D();
  //this.speed.random2D();
  this.bam = createVector();
  this.m;


  this.update = function() {
      this.bam = p5.Vector.random2D(); // movement of star will be a bit erractic
      //this.bam.random2D();
      this.bam.mult(0.45);
      this.speed.add(this.bam);
      // speed is done according distance between loc and the mouse :
      this.m = constrain(map(dist(this.loc.x, this.loc.y, mouseX, mouseY), 0, width, 8, .05), .05, 8); // constrain => avoid returning "not a number"
      this.speed.normalize().mult(this.m);

      // No colision detection, instead loc is out of bound
      // it reappears on the opposite side :
      if (dist(this.loc.x, this.loc.y, k / 2, k / 2) > (k / 2) * 0.98) {
        if (this.loc.x < k / 2) {
          this.loc.x = k - this.loc.x - 4; // "-4" => avoid blinking stuff
        } else if (this.loc.x > k / 2) {
          this.loc.x = k - this.loc.x + 4; // "+4"  => avoid blinking stuff
        }
        if (this.loc.y < k / 2) {
          this.loc.y = k - this.loc.y - 4;
        } else if (this.loc.x > k / 2) {
          this.loc.y = k - this.loc.y + 4;
        }
      }
      this.loc = this.loc.add(this.speed);
    } // End of update()
} // End of class