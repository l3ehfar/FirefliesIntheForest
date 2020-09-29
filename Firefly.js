lineangle = 0.0;
class Firefly {
  constructor(x, y, angle, speed, lightangle, lightscalar, lightspeed, lightspeedangle, maxforce, maxspeed) {
    // All the usual stuff
    this.position = createVector(x, y);
    this.r = 10;
    this.maxforce = maxforce; // Maximum steering force
    this.maxspeed = maxspeed;
    this.recallspeed = maxspeed;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.history = [];
    this.angle = angle;
    this.speed = speed;
    this.lightangle = lightangle;
    this.lightangleFollowpath = lightangle;
    this.lightspeedangle = lightspeedangle;
    this.rotateangle = lightangle;
    this.lightscalar = lightscalar;
    this.lightspeed = lightspeed;
    this.shine = 0;
    this.HSB_S = 60;
    this.R = maxspeed;
  }

  run(keypoint_x, keypoint_y) {
    this.update(createVector(keypoint_x, keypoint_y));
    this.borders();
    this.shining();
  }
        

  follow(flow) {

      let separateForce = this.separate(vehicles);
      var m = 0;
      separateForce.mult(m);

      this.applyForce(separateForce);


  }

  // applyBehaviors(vehicles) {

  //   // for (let i = 0; i < poses.length; i++) {
  //   // let pose = poses[i].pose;
  //   // let keypoint = pose.keypoints[9];   
  //   //let seekForce = this.seek(createVector(keypoint.position.x, keypoint.position.y));
  //   let seekForce = this.seek(createVector(mouseX, mouseY));
  //   let separateForce = this.separate(vehicles);
  //   // let seekForce = this.seek(createVector(mouseX, mouseY));

  //   separateForce.mult(slider1.value());
  //   seekForce.mult(slider2.value());

  //   this.applyForce(separateForce);
  //   this.applyForce(seekForce);  

  // }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // Separation
  // Method checks for nearby vehicles and steers away
  separate(vehicles) {
    let desiredseparation = 60;
    let sum = createVector();
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < vehicles.length; i++) {
      let d = p5.Vector.dist(this.position, vehicles[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, vehicles[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        sum.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      sum.div(count);
      // Our desired vector is the average scaled to maximum speed
      sum.normalize();
      sum.mult(this.maxspeed);
      // Implement Reynolds: Steering = Desired - Velocity
      sum.sub(this.velocity);
      sum.limit(this.maxforce);
    }
    return sum;
  }

  shining() {
    let d = p5.Vector.dist(createVector(keypoint_x, keypoint_y), this.position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d < 50)) {
      if (countfireFlies < 47) {
        countfireFlies += 3;
      } else {
        countfireFlies += 0.008; 
      }
    }
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    let d = desired.mag();
    // Normalize desired and scale to maximum speed
    desired.normalize();
    if (d < 200) {
      // slowing down
      let m = map(d, 70, 200, 0, this.maxspeed);
      desired.mult(m);
    } else {
      // maxspeed
      desired.mult(this.maxspeed);
    }
    // Steering = Desired minus velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    return steer;
  }

  // Method to update location
  update(target) {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);

    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    let d = desired.mag();
    let m = 0.5;
    let n = 1;
    if (d < 200) {
      m = map(d, 70, 200, 3, 12);
      n = map(d, 70, 200, 0, 5);
    } else {
      m = 1;
    }

    if (this.position.x >= (4.9 * width / 7) && this.position.x <= (4.9 * width / 7 + width / 7)) {
      this.position.x += 0.2 * sin(this.angle)
      this.position.y += 0.2 * cos(this.angle)
    } else if (this.position.x <= 1.2 * width / 8 + width / 8 && this.position.x >= 1.2 * width / 8) {
      this.position.x += 0.2 * sin(this.angle)
      this.position.y += 0.2 * cos(this.angle)
    } else {
      this.position.x += (sin(this.rotateangle) * this.lightscalar) * m * abs(sin(this.rotateangle)) * sin(this.angle);
      this.position.y += (sin(this.rotateangle) * this.lightscalar) * (m * sin(this.rotateangle)) * cos(this.angle);
      this.position.x += sin(this.angle)
      this.position.y += cos(this.angle)
    }

    this.angle += (this.speed);

    let v = createVector(this.position.x, this.position.y);
    this.history.push(v);

    if (this.history.length > 10) {
      this.history.splice(0, 1);
    }
  }

  display(low,high) {
      this.low = low;
      this.high = high;
    this.HSB_S = map(this.recallspeed, 5, 20, 100, 70);
    this.R = map(this.recallspeed, 15, 25, 20 / 20, 10 / 20);
    this.opacity = map(this.recallspeed, 5, 20, this.low,this.high);
      if (this.R < 13 / 17) {
        for (let i = 7; i < (this.history.length - 2); i++) {
          let position_ = this.history[i];
          fill(47, this.HSB_S, 100, (this.lightscalar * 3 * this.opacity * i - ((sin(this.lightspeedangle + this.lightangleFollowpath)) * this.lightscalar) * 3 * this.opacity * i));
          noStroke();
          ellipse(position_.x, position_.y, 6 * this.R)
        }
      } else {
        for (let i = 6; i < (this.history.length - 2); i++) {
          let position_ = this.history[i];
          fill(47, this.HSB_S, 100, (this.lightscalar * 3 * this.opacity * i - ((sin(this.lightspeedangle + this.lightangleFollowpath)) * this.lightscalar) * 3 * this.opacity * i) * 10 * abs(sin(this.lightangleFollowpath)));
          noStroke();
          ellipse(position_.x, position_.y, 6 * this.R)
        }
      }
  }

  light(lightsin, followsin, onandofspeed) {
    this.lightsin = lightsin;
    this.followsin = followsin;
    this.onandofspeed = onandofspeed;
    let d = p5.Vector.dist(createVector(keypoint_x, keypoint_y), this.position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d < 50)) {
      push();
      if (this.position.x >= (4.9 * width / 7) && this.position.x <= (4.9 * width / 7 + width / 7)) {
      } else if (this.position.x <= 1.3* width / 8 + width / 8 && this.position.x >= 1.3* width / 8) {
      } else {
        for (let i = 8; i < this.history.length; i++) {
          let position_ = this.history[i];
          fill(47, this.HSB_S, 100, 40 - (abs(sin(this.lightangle)) * this.lightscalar) * 10 * (i - 4));
          noStroke();
          ellipse(position_.x, position_.y, ((i - 6) * 7) * this.R);
        }
      }
      pop();
    }

    this.rotateangle += this.lightspeed;
    this.lightangle += (this.followsin);
    this.lightangleFollowpath += (this.onandofspeed * this.lightsin);

  }

  // Wraparound
  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }
}
