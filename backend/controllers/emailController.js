const nodemailer = require('nodemailer');
const Trip = require('../models/Trip');
const User = require('../models/User');

const sendTripInvite = async (req, res) => {
    const {tripId, receiverEmail} = req.body;
    const senderId = req.user.id;

    try
    {
        const trip = await Trip.findById(tripId).populate('createdBy');
        if(!trip)
        {
            return res.status(404).json({ msg: 'Trip not found'});
        }

        if(trip.createdBy._id.toString() !== senderId)
        {
            return res.status(403).json({msg: 'Only trip creator can send invite links'});
        }

        const inviteLink = `https://triphub.com/join/${trip._id}?inviter=${senderId}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"${trip.creatorBy.name} via TripHub" <${process.env.EMAIL_ID}>`,
            to: receiverEmail,
            subject: `{trip.creatorBy.name} invited you to join a trip on TripHub`,
            html: `
                <h2>${trip.createdBy.name} invited you</h2>
                <p>You’ve been invited to join the trip: <b>${trip.name}</b></p>
                <a href="${inviteLink}">Click here to accept invitation</a>
                <p>If you don’t have a TripHub account, sign up first.</p>
            `
        });

        res.status(200).json({msg: "Invitation email sent successfully" });
    }

    catch(err)
    {
        console.log(err);
        res.status(500).json({msg: "Can not sent the trip invite link"});
    }
};

module.exports = sendTripInvite;