
// ElevatorState manages all state updates between classes
class ElevatorState {
  constructor(elevators) {
    if (!elevators) {
      throw new Error('Must provide Elevators in order to track their state')
    }

    this.allElevators = elevators;
  }
  moveElevator(elevatorIndex, newFloor) {
    this.allElevators[elevatorIndex].reportElevatorRequest(elevatorIndex, newFloor);
    this.allElevators[elevatorIndex].reportDoorState('closing', elevatorIndex);

    const movementPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        // TODO - right now this is only handling positive movement to a floor
        let updatedFloor = this.allElevators[elevatorIndex].currentFloor = this.allElevators[elevatorIndex].currentFloor + 1;
        this.allElevators[elevatorIndex].reportMovementToFloor(elevatorIndex, updatedFloor);

        resolve(updatedFloor);
      }, 1000);
    });
    
    return movementPromise;
  }

}

class Elevator {
  constructor(currentFloor = 1) {
    // initial elevator assumptions
    this.currentFloor = currentFloor;
    this.isDoorClosed = true;
    this.moveInProgress = false;   
  }
  reportElevatorRequest(elevatorIndex, newFloor) {
    // Each elevator will report as is moves from floor to floor.
    console.log(`Moving elevator ${elevatorIndex} to floor ${newFloor}`)
    this.moveInProgress = true; 
  }
  reportMovementToFloor(elevatorIndex, newFloor) {
    // Each elevator will report as is moves from floor to floor.
    console.log(`Elevator just passed ${newFloor}`)
    this.currentFloor = newFloor;
    this.moveInProgress = true;
  }
  reportDoorState(doorState, elevatorIndex) {
    // Each elevator will report when it opens or closes its doors.
    console.log(`${doorState} door of elevator ${elevatorIndex}`)
    this.isDoorClosed = true;
  }
  reportElevatorArrived() {
    console.log('Done')
    this.isDoorClosed = false;
    this.isMoveInProgress = false;
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

    let closestElevatorIndex = this.findClosestElevator(this.elevatorState.allElevators, floorRequested);
    
    let movedFloor = this.moveElevatorInState(closestElevatorIndex, floorRequested).then(finishedFloor => {
      if (finishedFloor !== floorRequested) {
        // NOTE: logging a representation of where the state is at this point to show it updated
        console.log(this.elevatorState)
        
        // TODO - callback bananas is going on, this is not done and needs to be improved, async/await would be better fit if possible
        return this.moveElevatorInState(closestElevatorIndex, finishedFloor);


      } 
    });

  }
  moveElevatorInState(closestElevatorIndex, floorRequested) {
    // move elevator closest to floor requested
    var updatedFloorIndex = this.elevatorState.moveElevator(closestElevatorIndex, floorRequested)
      .then(function (updatedFloor) {
        return updatedFloor;
      });
      
    return updatedFloorIndex;
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