const Car = require('../models/car')
const User = require('../models/user')

module.exports = {

    index: async (req, res, next) => {
        //get all cars
        const cars = await Car.find({});
        res.status(200).json(cars);
    },

    newCar: async (req, res, next) => {
        //find the seller
        const seller = await User.findById(req.body.seller)
        //create new car
        const newCar = req.body;
        delete newCar.seller;
        const car = new Car(newCar);
        //to save seller into car collection
        car.seller = seller;
        await car.save();
        //add newly created car to the actual seller
        seller.cars.push(car);
        await seller.save();
        //we are done
        res.status(200).json(car)
    },

    getCar: async (req, res, next) => {
        const car = await Car.findById(req.params.carId);
        res.status(200).json(car);
    },

    replaceCar: async (req, res, next) => {
        const { carId } = req.params;
        const newcar = req.body;
        const result = await Car.findOneAndUpdate(carId, newcar);
        res.status(200).json({ success: true })

    },

    updateCar: async (req, res, next) => {
        const { carId } = req.params;
        const newcar = req.body;
        const result = await Car.findOneAndUpdate(carId, newcar);
        res.status(200).json({ success: true })
    },

    deleteCar: async (req, res, next) => {
        // get car id
        const { carId } = req.params;
        // search about car in db
        const car = await Car.findById(carId);
        //then get seller id form car collection
        const sellerId = car.seller;
        //search about seller id in db
        const seller = await User.findById(sellerId);
        // remove car
        await car.remove();
        //remove car from the seller's list
        seller.cars.pull(car);
        //save the result
        await seller.save();
        //we done
        res.status(200).json({ success: true })
        //you can use return keyword to stop code 
    }
    
}