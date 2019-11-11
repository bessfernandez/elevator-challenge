
// ElevatorState manages all state updates between classes
class ElevatorState {
  constructor(elevators) {
    if (!elevators) {
      throw new Error('Must provide Elevators in order to track their state')
    }

    this.allElevators = elevators;
  }
  moveElevator() {
    // Each elevator will report as is moves from floor to floor.
    

    // An elevator request can be made at any floor, to go to any other floor.


  }
  reportMovement() {
    // Each elevator will report when it opens or closes its doors.
  }
  reportDoorState() {

  }
}

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

    this.elevatorState = new ElevatorState(this.allElevators);
  }
  requestElevatorMovement(elevator, floorRequested = 1) {
    // An elevator cannot proceed above the top floor.
    if (floorRequested > this.totalFloors) {
      throw new Error('Cannot move elevator, that floor exceeds total floors')
    }
    
    // An elevator cannot proceed below the ground floor (assume 1 as the min)
    if (floorRequested < 1) {
      throw new Error('Cannot move elevator below first floor')
    }

    
    console.log(this.elevatorState)
  }
}
  
// create elevator
const myElevatorSimulator = new ElevatorSimulator(2, 4);

// request specific elevator ro move to a floor
myElevatorSimulator.requestElevatorMovement(1, 3);