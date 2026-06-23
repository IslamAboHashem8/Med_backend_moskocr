const cron = require("node-cron");
const Dose = require("../models/doses");
const Notification = require("../models/notification");

// كل دقيقة
cron.schedule("*/1 * * * *", async () => {
    console.log("Cron running...");

    const now = new Date();

    // هات الجرعات اللي وقتها فات أو مساوي للوقت الحالي ومش متاخدة
    const dueDoses = await Dose.find({
        taken: false,
        scheduledAt: { $lte: now }
    });

    for (const dose of dueDoses) {
        await Notification.create({
            userId: dose.userId,
            doseId: dose._id,
            message: `It's time to take ${dose.medicineName}!`,
            seen: false
        });
    }
});