import Booking from "../models/Booking.js"
import Car from "../models/Car.js"


// Function to check availability of a car for a given date
const checkAvailability = async (car, pickupDate, dropDate) => {
    const bookings = await Booking.find({
        car,
        pickupDate: {$lte: dropDate},
        dropDate: {$gte: pickupDate},
    })
    return bookings.length === 0
}

// API to check availability of car for given Date and Location
export const checkAvailabilityofCar = async (req, res) => {
    try {
        const {location, pickupDate, dropDate} = req.body
        // Fetch all available cars for the given situation
        const cars = await Car.find({location, isAvailable: true})

        // Check car availability for given date range using promise
        const availableCarsPromises = cars.map(async (car) => {
            const isAvailable = await checkAvailability(car._id, pickupDate, dropDate)
            return {...car._doc, isAvailable: isAvailable}
        })

        let availableCars = await Promise.all(availableCarsPromises)
        availableCars = availableCars.filter(car => car.isAvailable == true)

        res.json({success: true, availableCars})

    } catch (error) {
        console.log(error.message)
        res.join({success: false, message: error.message})
    }
}

// API to create booking
export const createBooking = async (req, res) => {
    try {
        const {_id} = req.user
        const {car, pickupDate, dropDate} = req.body

        const isAvailable = await checkAvailability(car, pickupDate, dropDate)
        if(!isAvailable) {
            return res.json({success: false, message: "Car is not available!"})
        }

        const carData = await Car.findById(car)

        // Calculating price based on days
        const picked = new Date(pickupDate)
        const dropped = new Date(dropDate)
        const noOfDays = Math.ceil((dropped - picked) / (1000 * 60 * 60 * 24))
        const price = carData.pricePerDay * noOfDays

        await Booking.create({car, owner: carData.owner, user: _id, pickupDate, dropDate, price})

        res.json({success: true, msssage: "Booking created!"})

    } catch (error) {
        console.log(error.message)
        res.join({success: false, message: error.message})
    }
}

// API to list user bookings
export const getUserBookings = async (req, res) => {
    try {

        const {_id} = req.user
        const booking = await Booking.find({ user: _id }).populate("car").sort({createdAt: -1})
        res.json({success: true, bookings})

    } catch (error) {
       console.log(error.message)
        res.join({success: false, message: error.message}) 
    }
}

//API to list owner bookings
export const getOwnerBookings = async (req, res) => {
    try {

        if(req.user.role !== 'owner') {
            return res.json({success: false, message: "Unauthorized!"})
        }

        const bookings = (await Booking.find({owner: req.user._id}).populate('car user').select('-user.password')).sort({createdAt: -1})
        res.json({success: true, bookings})

    } catch (error) {
       console.log(error.message)
        res.join({success: false, message: error.message}) 
    }
}

//API to change the booking status
export const changeBookingStatus = async (req, res) => {
    try {

        const{_id} = req.user
        const {bookingId, status} = req.body
        const booking = await Booking.findById(bookingId)

        if(booking.owner.toString() !== _id.toString()) {
            return res.json({success: false, message: "Unauthorized!"})
        }

        booking.status = status
        await booking.save()

        res.json({success: true, message: "Status update!"})

    } catch (error) {
       console.log(error.message)
        res.join({success: false, message: error.message}) 
    }
}