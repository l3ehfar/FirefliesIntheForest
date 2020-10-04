# Fireflies In the Forest

[video presentation](https://youtu.be/9nMOuwf2mxg)

Summary:
Fireflies in the Forest is an interactive project programmed in p5js. I simply developed an autonomous agent's system that reacts to the character's hands' position. The pose detection is done with Posenet library, and the background's image processing (controlling the pixels' brightness) is programmed using shaders.
Moreover, the flow path on the trees is based on a regression neural network using ml5js which has been trained on the character's position. In addition, in some points a specific position of a character is determined by a classification neural network which leads to the reaction of the fireflies against it.
•	Music: "The Humming / The Ghost" by Binkbeats featuring Maxime Barlag

Introduction:
Since the early human life on earth, the man couldn’t tolerate without art as wherever we went, it seems the urge to signal a presence went with us, so continuously we need to implant correspondent artistic seeds to survive our era.
This project is a part of a journey with a friend around our enthusiasm for human and machine interaction. it’s been a year that we’ve been trying several methods to observe the way human enjoying contribution with machine decisions and the opposite, and we find Art as the best approach to sense the joy in human’s mind as a companion along with the machine’s mind, the joy he sensed as a contributor in nowadays machinery world.
For this particular project we’re trying to use Human Pose Estimation models to interact with the machine’s decisions directly. I’m writing this document just to inform about the different ways including vast frameworks and libraries I’ve tried to find the best approach to embed our point of view of a world which human has a close vivid relation with machines as well. 

Pose Estimation: 
As I said, the primitive idea of our project was established based on the Pose Estimation approach.
The first library I’ve used was the first and the most famous of them all, the Openose library.
Openpose is a real-time multi-person keypoint detection library for body, face, hands, and foot estimation. In the version I’ve tried, the 2D detection, it occasionally detects 19 major points of the human body despite of one person in front of the camera or more than one, but due to its low frame rate per second in my GPU, I didn’t get the intended Result as I had anticipated.
Indeed, I ended up with the second library I had tried, the Posenet library.
Posenet is a real-time pose detection library in the browser using TensorFlow.js, a library for machine learning in Javascript. PoseNet can be used to estimate either a single pose or multiple poses, it detects 17 major points of the human body and in my experience, it is a smoother library in comparison with Openpose.
In the end, the easiest way of implanting Posenet in my project was using ml5.js, an open-source, friendly high-level interface to TensorFlow.js. it has built on top of TensorFlow.js with no other external dependencies, And I benefited from a lot of its features to elevate the basic idea of my project.

Physics libraries:
As I tended to experience different libraries in order to obtain vast opportunities to get familiar with new aspects of interactivity, I’ve got interested in Physics libraries such as Box2D, Toxiclibs, and Matter.js.

Box2D:
The first physics library I worked with was Box2D. it is a rigid body simulation library to work with geometric collisions for games and other computer graphic mediums. As I was working with the Processing framework, a java framework, I got started with the JBox2D library that is the close java version to Box2D itself.

Toxiclibs:
Toxiclibs is an independent, open-source library collection for computational design tasks with Java & Processing. It includes several packages with different usages, in order to obtain its physics libraries, I imported toxi.geom and toxi.physics packages to be able to work with Mesh container, springs, 2D and 3D particle physics engines. In my opinion, the advantage of Toxiclibs is the easier implementation of working with different forces. 

Matter.js:
As I decided to develop my project in Javascript, I should have worked with a javascript physics library. So, I got an opportunity to get familiar with a 2D rigid body physics engine called Matter.js.
Matter.js library can get used easily to simulate 2D physics in the browser. It offers a lot of features like the ability to create rigid bodies and assign physical properties like mass, area, or density to them. It almost contains both Box2D and Toxiclibs properties.


As I was experiencing to implement the more possibilities of these physics libraries, the idea of what I hope to demonstrate got clearer each day. after all, I felt like unable to have complete access to control more elaborate forces compelled to my objects as these physics libraries imitate a particular aim like very few real forces we experienced in our real world, so after looking at several different ways of modeling motion and simulating physics, the idea of simulating my actual system with more specific physics rules happened to me. 


A simulation of my own tangible world:
I used fundamental programming technics to implement an ideal objective interplay to simulate an actual environment with feasible attributes disband from what commonly available physics libraries have enforced. In other words, my goal was to achieve a natural system based on combination and cooperation to implant a complex system out of simple interchangeable rules.

Fundamental factors I used:

1)	Random numbers:
As you already have noticed the nature consists of patterns. There is a pattern in almost every creature and its behavior. These patterns mostly composed of an arrangement out of irregularities. In my experience, randomness plays an important rule to accomplish anarchy entailed of scattered behaviors with a regular pattern to emergence. There is a chaotic with an enforcement to merge a unique purpose. 

I use three approaches with a little differential in their implementations to obtain a natural random treatment:
1)	Random numbers
2)	Perlin noise
3)	Gaussian distribution


2)	2D Vectors:
As I developed my project in a p5js 2D canvas sketch, I had to calculate every position of my objects, and also the forces compelled to them due to their X-axis and Y-axis. So, the easiest data structure to contain these parameters was using 2D Vectors. 
2D Vectors make practical opportunities such as Magnitude and Normalization to calculate angles and where they point to, finding the distance between two objects by Subtracting their vectors, adding Velocity, Accelerations and so on to their locations and implement motions.


3)	Applying Force to Vectors:
A force is a vector that causes an object with mass to accelerate. I use two approaches to develop these forces as the most significant attributes of my simulation. The first approach is making up new forces as I’m the creator of my own world, or modeling real tangible forces based on Newton Laws such as Gravity, Gravity depends on Mass, Friction Force, Drag Force and complex attractions between Vectors.

4)	Oscillation:
First and foremost, trigonometry plays a prominent facet in my project as it yields nice smooth ease-in, ease-out, circular movements, wave patterns, and above all, concede complex forces calculations assigned to my objects like calculating angular velocity and so forth.
One of the most beneficial features of using trigonometry is the behavior of sine and cosine exposed to Oscillation, a periodic movement between two targets. In order to take terms like Amplitude, Period, and Frequency as granted, I was able to take advantage of simple harmonic motion (or, to be fancier, “the periodic sinusoidal oscillation of an object”). These implementations are more explicit in the gradual changes of the fireflies flying in the project.



5)	Particle System:
The term particle system is an incredibly common and useful technique in computer graphics.
A particle system is a collection of many particles that together represent a fuzzy object. Over a period of time, particles are generated into a system, move and change from within the system, and die from the system. 
Inheritance and polymorphism are sure the most significant applications of a particle system in a computer graphics project.




Autonomous Agents:

Implementing the so-called terms as the basic factors were intended to end up breathing life into a vivid system in which any given object has its own fears and also intentions. Therefore, developing a system based on Autonomous Agents happened to me. 
 There are three crucial components of an autonomous agent system:
•	An autonomous agent has a limited ability to perceive the environment:
limitations are an eligible thing for a natural environment, so, an autonomous agent doesn’t have to be aware of the whole canvas, for instance, a consciousness of its 50 pixels adjacency is convincing enough. 





There are four significant implementations I’ve applied to my autonomous agent system including:
1-	Action Selection: 
The object takes a look at its environment and calculates an action based on a desire.

2-	Steering:
Once an action has been selected, the object has to calculate its next move. For us, the next move will be a force. 
steering force = desired velocity - current velocity.

3-	Arriving Behavior:
The object moving toward its target at its most velocity(seek) but as it gets closer, its velocity should get decreased to be able to stop at the target(arrive). Although in some cases it passes the target and turn back to it again. 

Some basic implementations containing above-mentioned features:
https://editor.p5js.org/l3ehfar/sketches/vb2pySwmf
https://editor.p5js.org/l3ehfar/sketches/Q61SWNdFe

4-	Flow Fields:
Flow field is a two-dimensional array, a convenient data structure in which to store a grid of information. Each object in this array has its own 2D Vector calculation based on a pattern, in my case a Perlin Noise. In such situation each object can then retrieve a desired vector from the flow field array. 

Move your mouse within sketch
https://editor.p5js.org/l3ehfar/sketches/b6ssTWBuk





complex systems:
Now, each of particle is a simulated being that makes decisions about how to seek and flow and follow. But what is a life led alone, without the love and support of others? Our purpose here is not only to build individual behaviors for our particles, but to put our particles into systems of many particles and allow those particles to interact with each other.
Here are three key principles of complex systems:
•	Simple units with short-range relationships. particles that have a limited perception of their environment.
•	Simple units operate in parallel. This is what we need to simulate in code. For every cycle through draw() loop, each unit will decide how to move (to create the appearance of them all working in parallel).
•	System as a whole exhibits emergent phenomena. Out of the interactions between these simple units emerges complex behavior, patterns, and intelligence. Here we’re talking about the result we are hoping for in our sketches. We know this happens in nature (ant colonies, termites, migration patterns, earthquakes, snowflakes, etc.).
•	Competition and cooperation. One of the things that often makes a complex system tick is the presence of both competition and cooperation between the elements. We will have three rules—alignment, cohesion, and separation. Alignment and cohesion will ask the elements to “cooperate”—i.e. work together to stay together and move together. Separation, however, will ask the elements to “compete” for space. 


Combination:
The most exciting and intriguing behaviors will come from mixing and matching multiple steering forces, and we’ll need a mechanism for doing so. Here we have a mover that responds to two forces. This all works nicely because of the way we designed the Mover class to accumulate the force vectors into its acceleration vector. Let’s consider a sketch where all vehicles have two desires:
•	Seek the desired location.
•	Separate from any vehicles that are too close.

Flocking:
Flocking is a 

group animal behavior that is characteristic of many living creatures, such as birds, fish, and insects. 
1.	We will use the steering force formula (steer = desired - velocity) to implement the rules of flocking.
2.	These steering forces will be group behaviors and require each vehicle to look at all the other vehicles.
3.	We will combine and weight multiple forces.
4.	The result will be a complex system—intelligent group behavior will emerge from the simple rules of flocking without the presence of a centralized system or leader.
 the three rules of flocking.
1.	Separation (also known as “avoidance”): Steer to avoid colliding with your neighbors.
2.	Alignment (also known as “copy”): Steer in the same direction as your neighbors.
3.	Cohesion (also known as “center”): Steer towards the center of your neighbors (stay with the group).





Taking GPU for granted:
Developing a physical environment with the cardinal rules of programming with a group of objects running complex calculations in each frame leaves no space for implanting graphical calculations such as image processing, pixel sorting, and so forth.  From the standpoint of efficiency, I’ve decided to leave these graphical calculations to the GPU to bring about parallel processing. The consequence was getting familiar with GPU.js and Shaders.

GPU.js:
GPU.js is a JavaScript Acceleration library for computing on GPU in JavaScript. GPU.js automatically transpiles simple JavaScript functions into shader language and compiles them so they run on your GPU. As GPU.js has a complicated integrating with p5.js framework, I gave it up and I’ve decided to take advantage of the shader itself.


Shaders:
A shader is a small program that runs entirely on GPU.
Since a shader is its script you simply place it in a separate file from your p5 sketch.js, just like when you load in a soundfile or image. Concisely, the p5js run its scripts on the GPU and then pass the results to the CPU to maintain the rest of the code.
 
In this project, as a background, I’ve decided to use shader’s image processing possibility on GPU to process, first and foremost, the pixels with low brightness and make them darker in the position of the target, in my case the spectator’s position. In the latter, the overall brightness of the background gets waxed and waned in a sinusoid time cycle. Eventually, the lightning on the trees gets to appear and disappear as a reaction to the aggregation of more than ten bright objects. All handled by GPU with a reasonable time-consuming.


Neural network:
To regulate some attributes of the project, I’ve decided to exploitا neural network training based on Posenet node positions. I used two types of neural networks entailing the regression model and the classification model of the ml5.js framework.

Neural Network Regression: 
In order to regulate the patterns of the Flow Fields on the trees, I made use of Neural Network Regression. I trained the model with various positions of the character; each assigned a specific value for the X-axis and Y-axis of the flow fields. This gives rise to a smooth wave in the visual of the fireflies floating on the flow fields of the trees.
 ![regression training](https://github.com/l3ehfar/FirefliesIntheForest/blob/master/images/regressionTraining.png)

Neural Network Classification:
I train another neural network based on the character’s position in order to recognize a specific pose and visually response to that. For this purpose, I used the Neural Network Classification approach. 
![classification training](https://github.com/l3ehfar/FirefliesIntheForest/blob/master/images/positiontrain.png)
 










Sources:

* https://github.com/CMU-Perceptual-Computing-Lab/openpose
* https://github.com/tensorflow/tfjs-models/tree/master/posenet
* https://www.tensorflow.org/js
* https://ml5js.org/
* https://box2d.org/
* http://www.jbox2d.org/
* http://toxiclibs.org/
* https://brm.io/matter-js/
* https://natureofcode.com/
* https://github.com/gpujs/gpu.js/#readme
* https://itp-xstory.github.io/p5js-shaders/


