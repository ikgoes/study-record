class Line{
    constructor(coord1,coord2){
        this.A = coord1;
        this.B = coord2;
    }
}

Line.prototype.getDistance = function(cord1, cord2){
    let distance = Math.sqrt(Math.pow((cord1.x - cord2.x),2) + Math.pow((cord1.y - cord2.y),2));
    return distance;
}

class Triangle extends Line{
    constructor(coord1,coord2,coord3){
        super(coord1,coord2);
        this.C = coord3;
    }

    getArea(){
        let a = super.getDistance(this.A,this.B);
        let b = super.getDistance(this.A,this.C);
        let c = super.getDistance(this.B,this.C);
        let s = (a + b + c) / 2; 
        let area = Math.sqrt(s*(s-a)*(s-b)*(s-c));
        return area;
    }
}

class Rectengle extends Triangle{
    constructor(coord1,coord2,coord3,coord4){
        super(coord1,coord2,coord3);
        this.D = coord4;
    }

    getarea(){
        return super.getArea(this.A,this.B,this.C) + super.getArea(this.A,this.B,this.D);
    }
}   

Rectengle.prototype.isRectengle = function(){
    let cx,cy;
    let d1,d2,d3,d4;

    cx = (this.A.x + this.B.x + this.C.x + this.D.x) /4;
    cy = (this.A.y + this.B.y + this.C.y + this.D.y) /4;
    d1 = Math.pow((cx-this.A.x),2) + Math.pow((cy-this.A.y),2);
    d2 = Math.pow((cx-this.B.x),2) + Math.pow((cy-this.B.y),2);
    d3 = Math.pow((cx-this.C.x),2) + Math.pow((cy-this.C.y),2);
    d4 = Math.pow((cx-this.D.x),2) + Math.pow((cy-this.D.y),2);
    return (d1 == d2 && d2 == d3 && d3 == d4);
}

module.exports = { Line, Triangle, Rectengle };