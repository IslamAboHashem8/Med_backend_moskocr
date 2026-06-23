const express = require('express');
const router = express.Router();
const Dose = require('../models/doses');

// POST /api/taken/:doseId
router.post('/:doseId', async (req, res) => {
    try {
        const { doseId } = req.params;

        const dose = await Dose.findById(doseId);
        if (!dose) return res.status(404).json({ message: "Dose not found" });

        // Check إذا الجرعة متأخرة
        const now = new Date();
        const isLate = now > dose.scheduledAt;

        dose.taken = true;
        dose.takenAt = now;
        dose.missed = isLate ? true : false;

        await dose.save();

        res.json({
            message: "Dose updated successfully",
            dose
        });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});

module.exports = router;