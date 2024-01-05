import Scribble from './Scribble.js'
import Endpoint from './Endpoint.js'

class CanvasManager {
    constructor(gridWidth, contentWidthPercent, heightToWidthRatio){
        this.gridWidth = gridWidth;
        this.marginWidth = gridWidth*(1 - contentWidthPercent)/2;
        this.gridHeight = gridWidth * heightToWidthRatio;
        this.grid = {}; //Available squares
        this.scribbleList = []; //Scribbles on Canvas
        this.newScribbleList = []; //Scribbles to be added
        this.endpoints = [];
        this.newEndpoints = [];

        this.speed = 0.2;

        this.claim(1, 0);
        this.addScribble(new Scribble(this, 1, 0, 1, 0, this.speed, "newborn"));
        this.addEndpoint(new Endpoint(1, 0, this.speed));

        this.claim(gridWidth - 1, 0);
        this.addScribble(new Scribble(this, gridWidth - 1, 0, gridWidth - 1, 0, this.speed, "newborn"));
        this.addEndpoint(new Endpoint(gridWidth - 1, 0, this.speed));

    }
    reset(gridWidth, contentWidthPercent, heightToWidthRatio){
        this.gridWidth = gridWidth;
        this.marginWidth = gridWidth*(1 - contentWidthPercent)/2;
        this.gridHeight = gridWidth * heightToWidthRatio;
        this.grid = {}; //Available squares
        this.scribbleList = []; //Scribbles on Canvas
        this.newScribbleList = []; //Scribbles to be added
        this.endpoints = [];
        this.newEndpoints = [];

        this.claim(1, 0);
        this.addScribble(new Scribble(this, 1, 0, 1, 0, this.speed, "newborn"));
        this.addEndpoint(new Endpoint(1, 0, this.speed));

        this.claim(gridWidth - 1, 0);
        this.addScribble(new Scribble(this, gridWidth - 1, 0, gridWidth - 1, 0, this.speed, "newborn"));
        this.addEndpoint(new Endpoint(gridWidth - 1, 0, this.speed));
    }

    //Moves all scribbles and updates list of scribbles
    step(){
        //Move each scribble
        for(var i = 0; i < (this.scribbleList).length; i++){
            (this.scribbleList)[i].step();
        }
        //Add new scribbles
        this.scribbleList = (this.scribbleList).concat(this.newScribbleList);
        this.newScribbleList = [];

        //Move each endpoint
        for(var j = 0; j < (this.endpoints).length; j++){
            (this.endpoints)[j].step();
        }
        //Add new endpoints
        this.endpoints = (this.endpoints).concat(this.newEndpoints);
        this.newEndpoints = [];
    }
    //Adds a scribble to the list to be added
    addScribble(newScribble){
        (this.newScribbleList).push(newScribble);
    }

    addEndpoint(newEndpoint){
        (this.newEndpoints).push(newEndpoint);
    }


    //Claims a grid coordinate
    claim(x, y){
        (this.grid)[x + "," + y] = true;
    }
    //Returns true of coordinate is claimed
    isClaimed(x, y){
        if(x <= 0 || x >= this.gridWidth || (x > this.marginWidth && x < this.gridWidth - this.marginWidth)){
            return true;
        }
        if(y < -this.gridHeight/2 || y > this.gridHeight/2){
            return true;
        }
        return ((x + "," + y) in this.grid);
    }

    updateHeight(heightToWidthRatio){
        this.gridHeight = this.gridWidth * heightToWidthRatio;
    }
}

export default CanvasManager;