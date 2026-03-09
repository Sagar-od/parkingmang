const cron = require('node-cron');
const Vehicle = require('../models/Vehicle');

// Runs every day at midnight to check for expired payments
const initPaymentChecker = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running daily payment status check...');
    try {
      const now = new Date();
      
      // Find vehicles where payment is overdue
      const overdueVehicles = await Vehicle.find({
        paidUntil: { $lt: now },
        paymentStatus: { $ne: 'Overdue' }
      });

      for (const vehicle of overdueVehicles) {
        vehicle.paymentStatus = 'Overdue';
        vehicle.notifications.push({
          message: `Your parking payment for Slot #${vehicle.slotNumber} is overdue. Please pay to avoid penalties.`,
          date: new Date()
        });
        await vehicle.save();
        console.log(`Notification sent to vehicle in slot ${vehicle.slotNumber}`);
      }

      // Find vehicles expiring soon (within 3 days)
      const expiringSoon = await Vehicle.find({
        paidUntil: { $gt: now, $lt: new Date(now.getTime() + 3*24*60*60*1000) },
        paymentStatus: 'Paid'
      });

      for (const vehicle of expiringSoon) {
        const alreadyNotified = vehicle.notifications.some(n => 
          n.message.includes('expiring soon') && 
          (now - n.date) < 24*60*60*1000
        );

        if (!alreadyNotified) {
          vehicle.notifications.push({
            message: `Your parking subscription for Slot #${vehicle.slotNumber} is expiring in less than 3 days.`,
            date: new Date()
          });
          await vehicle.save();
        }
      }
    } catch (error) {
      console.error('Error in payment checker job:', error);
    }
  });
};

module.exports = initPaymentChecker;
