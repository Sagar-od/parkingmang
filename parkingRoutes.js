const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');

// Get all slots status (200 slots)
router.get('/slots', auth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('owner', 'name customerId');
    const slots = Array.from({ length: 200 }, (_, i) => {
      const vehicle = vehicles.find(v => v.slotNumber === i + 1);
      return vehicle ? { 
        occupied: true, 
        slotNumber: i + 1, 
        vehicleDetails: vehicle 
      } : { 
        occupied: false, 
        slotNumber: i + 1 
      };
    });
    res.send(slots);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Admin: Add vehicle to slot
router.post('/assign', auth, adminAuth, async (req, res) => {
  try {
    const { email, plateNumber, vehicleType, slotNumber } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ error: 'User not found' });

    const existingSlot = await Vehicle.findOne({ slotNumber });
    if (existingSlot) return res.status(400).send({ error: 'Slot already occupied' });

    const vehicle = new Vehicle({
      owner: user._id,
      plateNumber,
      vehicleType,
      slotNumber,
      paymentStatus: 'Paid',
      paidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    await vehicle.save();
    res.status(201).send(vehicle);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Admin: Remove vehicle
router.delete('/remove/:slotNumber', auth, adminAuth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOneAndDelete({ slotNumber: req.params.slotNumber });
    if (!vehicle) return res.status(404).send({ error: 'Vehicle not found' });
    res.send({ message: 'Vehicle removed and slot freed' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Admin: Manage Payment (Add months)
router.patch('/payment/:slotNumber', auth, adminAuth, async (req, res) => {
  try {
    const { monthsToAdd } = req.body;
    const vehicle = await Vehicle.findOne({ slotNumber: req.params.slotNumber });
    if (!vehicle) return res.status(404).send({ error: 'Vehicle not found' });

    const currentExpiry = vehicle.paidUntil > new Date() ? vehicle.paidUntil : new Date();
    vehicle.paidUntil = new Date(currentExpiry.getTime() + monthsToAdd * 30 * 24 * 60 * 60 * 1000);
    vehicle.paymentStatus = 'Paid';
    
    await vehicle.save();
    res.send(vehicle);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Customer: Get my vehicle status
router.get('/my-vehicle', auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ owner: req.user._id });
    if (!vehicle) return res.status(404).send({ message: 'No vehicle assigned' });
    res.send(vehicle);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
