const router = require('express-promise-router')();
const carController = require('../controllers/cars');



router.route('/')
    .get(carController.index)
    .post(carController.newCar);



router.route('/:carId')
.get(carController.getCar)
.put(carController.replaceCar)
.patch(carController.updateCar)
.delete(carController.deleteCar);


module.exports = router;