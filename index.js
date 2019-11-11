
class Elevator {
  constructor() {
    // initial elevator assumptions
    this.currentFloor = 1;
    this.isDoorClosed = true;
    this.moveInProgress = false;   
  }
}

class ElevatorSimulator {
  constructor(elevators = 2, floors = 1) {
    // Initialize the elevator simulation with the desired number of elevators, 
    // and the desired number of floors. Assume ground / min of 1.
    this.totalFloors = floors;
    this.allElevators = [];
    
    if (!elevators) {
      throw new Error('Must provide at least two elevators')
    }
    
    // create a new Elevator class for each elevator
    for (var i = 0; i < elevators; i++) {
      this.allElevators.push(new Elevator())
    }

    console.log(this.allElevators, floors)

  }
}
  
// create elevator
const myElevators = new ElevatorSimulator(2, 4)