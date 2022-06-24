const flights = require('../models/flights.json')
const fs = require('fs');

exports.example = (req, res) => {
    console.log("example");
    res.send("Flight example");
}

//fetch all flights
exports.flightList = (req, res) => {
    return res.json({flights:flights});
}

//fetch a single flight
exports.singleFlight = (req, res) => {
    let id = req.params.id;
    let foundFlight = flights.find(flight => {
        return String(flight.id) === id;
    })
    if(foundFlight) return res.status(200).json({message: 'Flight Found',flight:foundFlight});
    else return res.status(404).json({message: 'Flight with ID = '+id+' Not Found'})
}

//add a new flight
exports.newFlight = (req, res) => {
    let userInput = req.body.flight;
    if(userInput){
        userInput.date = new Date().toLocaleDateString();
        userInput.time = new Date().toLocaleTimeString();
        flights.push(userInput);
        let stringedData = JSON.stringify(flights, null, 2); //stringify the json data and re-write the json file
        fs.writeFile('models/flights.json', stringedData, function(err){
            if(err){
                return res.status(500).json({message: err}) ;//internal server error
            }
        })
        //send response to client
        return res.status(200).json({message : "New Flight Added!!"});
    }
    else return res.status(201).json({message: 'Please enter an object values in the body'})
}

//update a flight
exports.updateFlight = (req, res) => {
    //store user input
    let userInput = req.body.flight;
    //get the flight
    let id = req.params.id;
    let foundFlight = flights.find(flight => {
        return String(flight.id) === id;
    })
    if(userInput){
        if(foundFlight){
            //update json object
            Object.keys(foundFlight).forEach((key, index) => {
                foundFlight[key] = userInput[key];
            });

            //update json file
            let stringedData = JSON.stringify(flights, null, 2); //stringify the json data
            fs.writeFile('models/flights.json', stringedData, function(err){
            if(err){
                return res.status(500).json({message: err}) ;//internal server error
            }
        })
            return res.status(200).json({message: 'Flight Updated'});
        }
        else return res.status(404).json({message: 'Flight with ID = '+id+' Not Found'})
    }
    else return res.status(201).json({message: 'Please enter the new values in the body'})
}

//delete a flight
exports.deleteFlight = (req, res) => {
    //confirm that the flight exist
    let id = req.params.id;
    let foundFlight = flights.find(foundFlight => {
        return String(foundFlight.id) === id;
    })
    if(foundFlight) {
        flights.splice(flights.indexOf(foundFlight), 1); //remove one flight in that particular position from the json object
        let stringedData = JSON.stringify(flights, null, 2); //stringify the json data
        //update the json file
        fs.writeFile('models/flights.json', stringedData, function(err){
            if(err){
                return res.status(500).json({message: err}) ;//internal server error
            }
        })
        return res.status(200).json({message: 'Flight Deleted'});
    }
    else return res.status(404).json({message: 'Flight with ID = '+id+' Not Found'})
}
