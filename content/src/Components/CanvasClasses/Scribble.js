import Endpoint from "./Endpoint.js"
class Scribble {
    static types = ["circle", "line", "thickLine", "ladder"];
    static branchProbability = 0.3;


    constructor(canvasManager, x, y, targetX, targetY, speed, type){
        this.canvasManager = canvasManager;
        this.points = [x, y, x, y];
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = speed;
        this.type = type;
        this.done = false;

        
    }

    step(){
        
        if(this.done){
            return;
        }
        //Calculate distances 
        let distance = this.getDistance((this.points)[(this.points).length - 2], (this.points)[(this.points).length - 1], this.targetX, this.targetY);
        
        let distanceX = this.targetX - (this.points)[(this.points).length - 2];
        let distanceY = this.targetY - (this.points)[(this.points).length - 1];
        //If close enough, choose new point
        if(distance < this.speed){
            
            //Finish segment
            (this.points)[(this.points).length - 2] = this.targetX;
            (this.points)[(this.points).length - 1] = this.targetY;
            
            
            //Determine new target
            let possibleXChanges = [];
            let possibleYChanges = [];
            
            if(distanceX > 0){
                possibleXChanges.push(0, 1);
            }else if(distanceX < 0){
                possibleXChanges.push(-1, 0);
            }else{
                possibleXChanges.push(-1, 0, 1);
            }
            if(distanceY > 0){
                possibleYChanges.push(0, 1);
            }else if(distanceY < 0){
                possibleYChanges.push(-1, 0);
            }else{
                possibleYChanges.push(-1, 0, 1);
            }
            
            let possibleChanges = [];
            for(let i = 0; i < possibleXChanges.length; i++){
                for(let j = 0; j < possibleYChanges.length; j++){
                    if(!(this.canvasManager).isClaimed(this.targetX + possibleXChanges[i], this.targetY + possibleYChanges[j])){
                        
                        //If diagonal, check half node
                        if(possibleXChanges[i] !== 0 && possibleYChanges[j] !== 0){
                            if((this.canvasManager).isClaimed(this.targetX + possibleXChanges[i]/2, this.targetY + possibleYChanges[j]/2)){
                                continue;
                            }
                        }

                        possibleChanges.push([possibleXChanges[i], possibleYChanges[j]]);
                        
                    }
                }
            }
            let newTargetX;
            let newTargetY;

            if(possibleChanges.length > 0){
                let change = possibleChanges[Math.floor(Math.random() * possibleChanges.length)];
                newTargetX = change[0] + this.targetX;
                newTargetY = change[1] + this.targetY;

                (this.canvasManager).claim(newTargetX, newTargetY);

                 //If diagonal, claim half node
                if(change[0] !== 0 && change[1] !== 0){
                    (this.canvasManager).claim(this.targetX + change[0]/2, this.targetY + change[1]/2);
                }
        
                (this.points).push(this.targetX, this.targetY);
                
                
             
            }else{
                this.done = true;
                (this.canvasManager).addEndpoint(new Endpoint(this.targetX, this.targetY, this.speed));
            }

            
             
            //Fill surrounding squares
            if(this.type !== "newborn"){
                for(let i =  - 1; i <= 1; i++){
                    for(let j =  - 1; j <=  1; j++){
                        if(!(this.canvasManager).isClaimed(i + this.targetX, j + this.targetY)){
                            (this.canvasManager).claim(i + this.targetX, j + this.targetY);

                            let originX = i + this.targetX;
                            let originY = j + this.targetY;
                            let type = "newborn"
                            if(Math.random() < Scribble.branchProbability && !(this.canvasManager).isClaimed(this.targetX + i/2, this.targetY +  j/2)){
                                originX = this.targetX;
                                originY = this.targetY;
                                type = this.type;

                                if(i !== 0 && j !== 0){
                                    (this.canvasManager).claim(this.targetX + i/2, this.targetY +  j/2);
                                }

                            }else{
                                (this.canvasManager).addEndpoint(new Endpoint(originX, originY, this.speed));
                            }
                            

                            (this.canvasManager).addScribble(new Scribble(this.canvasManager, originX, originY, i + this.targetX, j + this.targetY, this.speed, type));
                        }
                    }
                }
            }else{
                this.type = (Scribble.types)[Math.floor(Math.random() * (Scribble.types).length)];
            }
            
            this.targetX = newTargetX;
            this.targetY = newTargetY;
            
        }else{
            
            //Move endpoint
        
            (this.points)[(this.points).length - 2] += (distanceX/distance)*this.speed;
            (this.points)[(this.points).length - 1] += (distanceY/distance)*this.speed;
        }
       
    }
    getDistance(x1, y1, x2, y2){
        return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1))
    }

    

    
}

export default Scribble;



