
class FlowField {

    constructor(r,pos) {
  
      this.resolution = r;
      this.pos = pos;
  
      this.cols = width/7 / this.resolution;
      this.rows = height / this.resolution;

      this.columns = int(abs(this.pos * width/7) / this.resolution);
      this.numbers = this.columns + this.cols;

  
      this.field = this.make2Darray(width);
      this.init();
    }
  
    make2Darray(n) {
      let array = [];
      for (let i = 0; i < n; i++) {
        array[i] = [];
      }
      return array;
    }
  
    init(r,f) {

      this.r = r;
      this.f = f;
  
    if(this.pos == 4.9){
      noiseSeed(Math.floor(random(10000)));
      let xoff = 0;
      for (let i = this.columns; i < this.numbers; i++) {
        let yoff = 0;
        for (let j = 0; j < this.rows; j++) {
          let theta = map(sin(xoff)+cos(yoff),-(this.r+0.1)/500,(this.f+0.1)/500,TWO_PI,-TWO_PI);
          this.field[i][j] = createVector(cos(theta), sin(theta));
          yoff += 0.1;
        }
        xoff += 0.1;
      }
  }else{
      noiseSeed(Math.floor(random(10000)));
      let xoff = 0;
      for (let i = this.columns; i < this.numbers; i++) {
        let yoff = 0;
        for (let j = 0; j < this.rows; j++) {
          let theta = map(sin(xoff)+cos(yoff),-(this.r+0.1)/200,(this.f+0.1)/200,TWO_PI,-TWO_PI);        
          this.field[i][j] = createVector(cos(theta), sin(theta));
          yoff += 0.1;
        }
        xoff += 0.1;
      }
    }
    }
  
  
    display() {
      for (let i = this.columns; i < this.numbers; i++) {
        for (let j = 0; j < this.rows; j++) {
          this.drawVector(this.field[i][j], (i) * this.resolution, j * this.resolution, this.resolution - 2);
        }
      }
    }
  
    lookup(lookup) {
      let column = Math.floor(constrain(lookup.x / this.resolution, this.columns, this.numbers - 1));
      let row = Math.floor(constrain(lookup.y / this.resolution, 0, this.rows - 1));
      //println(lookup.x);
      return this.field[column][row].copy();
    }
  
  
    drawVector(v, x, y, scayl) {
      push();
      let arrowsize = 4;
  
      translate(x, y);
      stroke(200);
  
      rotate(v.heading());
  
      let len = v.mag() * scayl;
  
      //line(0, 0, len, 0);
      //line(len,0,len-arrowsize,+arrowsize/2);
      //line(len,0,len-arrowsize,-arrowsize/2);
      pop();
    }
  }