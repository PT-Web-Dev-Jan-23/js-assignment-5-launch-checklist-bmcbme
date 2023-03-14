// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let div = document.getElementById('missionTarget')
   div.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}  </li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons} </li>
                </ol>
                <img src= ${imageUrl}>`
   
}

function validateInput(testInput) {
    let numberInput = Number(testInput)
   if(testInput === '') {
    return 'Empty'
   } else if (isNaN(numberInput)) {
    return " Not a Number"
   } else if (isNaN(numberInput) === false){
    return "Is a Number"
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   let pilotStatus = document.getElementById('pilotStatus')
   let copilotStatus = document.getElementById('copilotStatus')
   let fuel = document.getElementById('fuelLevel')
   let cargo = document.getElementById('cargoLevel')

   if (validateInput(pilot) === 'Empty' || validateInput(copilot) === ' Empty' || validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === "Empty") {
    alert('All Fields required')
   } else if  (validateInput(fuelLevel) === 'Not a number' || validateInput(cargoLevel) === 'Not a number') {
    alert ('Must enter numerical value for Fuel and Cargo Levels')
   } else if (validateInput(pilot) === 'Is a Number' || validateInput(copilot) === 'Is a Number') {
    alert('Cannot enter numerical value for Pilot and CoPilot')
   } else {
    list.style.visibilty = 'visible'
    pilotStatus.innerHTML = ` Pilot ${pilot} is ready for launch`
    copilotStatus.innerHTML = ` Copilot ${copilot} is ready for launch`
    let launchStatus = document.getElementById('launchStatus')
    if (fuelLevel < 10000 && cargoLevel <= 10000) {
        list.style.visibilty = 'visible'
        fuelLevel.innerHTML = "Fuel level too low for launch"
        cargoLevel.innerHTML = "Cargo mass low enough for launch"
        launchStatus.innerHTML= "Shuttle Not Ready for Launch"
        launchStatus.style.color = "#C7254E"
    } else if (fuelLevel >= 10000 && cargoLevel > 10000) {
        list.style.visibilty = 'visible'
       fuelLevel.innerHTML = "Fuel level high enough for launch"
       cargoLevel.innerHTML = "Cargo mass too high for launch"
       launchStatus.innerHTML = "Shuttle Not Ready for Launch"
       launchStatus.style.color = "#C7254E"
    } else if (fuelLevel < 10000 && cargoLevel > 10000 ) {
        list.style.visibilty = 'visible'
        fuelLevel.innerHTML= "Fuel level too low for launch"
        cargoLevel.innerHTML = "Cargo mass too heavy for launch"
        launchStatus.innerHTML = "Shuttle Not Ready for Launch"
        launchStatus.style.color = "#C7254E"
    } else {
        list.style.visibilty = 'hidden'
        fuelLevel.innerHTML = "Fuel level high enough for launch"
        cargoLevel.innerHTML = "Cargo mass low enough for launch"
        launchStatus.innerHTML = "Shuttle is ready for launch"
        launchStatus.style.color = "#419F6A"
    }
    
   }
   
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        if (response.status >= 400) {
            throw new Error ('Bad response')
        } 
        else {
            return response.json()
        }
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random()*planets.length)
    return planets[index]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
