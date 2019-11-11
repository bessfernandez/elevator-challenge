
// ElevatorState manages all state updates between classes
class ElevatorState {
  constructor(elevators) {
    if (!elevators) {
      throw new Error('Must provide Elevators in order to track their state')
    }

    this.allElevators = elevators;
  }
  moveElevator(elevatorIndex, newFloor) {
    this.reportMovement(elevatorIndex, newFloor);

    // An elevator request can be made at any floor, to go to any other floor.


  }
  reportMovement(elevatorIndex, newFloor) {
    // Each elevator will report when it opens or closes its doors.
    console.log(`Closing door of elevator ${elevatorIndex}`)
    
    // Each elevator will report as is moves from floor to floor.
    console.log(`Moving eleator ${elevatorIndex} to floor ${newFloor}`)
  }
  reportDoorState() {

  }
}

class Elevator {
  constructor(currentFloor = 1) {
    // initial elevator assumptions
    this.currentFloor = currentFloor;
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
      if (i === 1) {
        this.allElevators.push(new Elevator(10))

      } else {
        this.allElevators.push(new Elevator())
      }
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

    let closestElevatorIndex = this.findClosestElevator(this.elevatorState.allElevators, floorRequested)
    
    // move elevator closest to floor requested
    this.elevatorState.moveElevator(closestElevatorIndex, floorRequested);

    
    // console.log(this.elevatorState)
  }
  findClosestElevator(allElevators, floorRequested) {
    // map new obj containing current floor state
    // follows { elevatorIndex: floor}
    let currentFloors = allElevators.map((elev, index) => {
      return { [index]: Math.abs(elev.currentFloor - floorRequested)}
    });
    
    // find closest elevator based on value of obj
    let closestElv = currentFloors.sort((elvA, elvB) => { 
      if (Object.values(elvB)[0] < Object.values(elvA)[0]) {
        return 1;
      } else {
        return -1;
      }
    })
    
    // return index of elevator which is the key
    return (Number(Object.keys(closestElv[0])));
  }
}
  
// create elevator
const myElevatorSimulator = new ElevatorSimulator(2, 4);

// request specific elevator ro move to a floor
myElevatorSimulator.requestElevatorMovement(1, 3);