const Trip = require('../models/Trip');

const createTrip = async (req,res) => {
    const{name, destination, startDate, endDate} = req.body;
    try
    {
        const trip = await Trip.create({
            name, destination, startDate, endDate, createdBy: req.userId, members: [req.userId]
        });

        res.status(201).json(trip);
    }
    catch(err)
    {
        res.status(500).json({msg: err.message});
    }
};

const getUserTrips = async (req,res) => {
    try
    {
        const trips = await Trip.find({members: req.userId});
        res.json(trips);
    }
    catch(err)
    {
        res.status(500).json({ msg: err.message});
    }
};

const joinTrip = async (req,res) => {
    try
    {
        const trip = await Trip.findById(req.params.id);
        if(!trip.members.includes(req.userId))
        {
            trip.members.push(req.userId);
            await trip.save();
        }
        res.json(trip);
    }
    catch(err)
    {
        res.status(500).json({msg: err.message});
    }
}

module.exports = { createTrip, getUserTrips, joinTrip };