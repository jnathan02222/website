class Endpoint {
    constructor(x, y, growthSpeed){
        this.x = x;
        this.y = y;
        this.growthSpeed = growthSpeed;
        this.radius = 0;
        this.maxRadius = 1.5;
    }

    step(){
        if(this.radius < this.maxRadius){
            this.radius += this.growthSpeed;

        }
     
    }
}


export default Endpoint;