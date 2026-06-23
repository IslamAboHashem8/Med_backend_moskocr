const express = require('express');
const router = express.Router();
const path = require('path');
const { readCSV } = require('../services/csvService');

router.get('/:medicineName', async (req, res) => {
    try {
        const medicineName = req.params.medicineName.toLowerCase();

        const alternatives = await readCSV(
            path.join(__dirname, '../data/alternatives.csv')
        );

        const result = alternatives
            .filter(item => item.drug_name.toLowerCase() === medicineName)
            .map(item => item.Alternative_Name);

        if (!result.length) {
            return res.status(404).json({ message: 'No alternatives found' });
        }

        res.json({
            medicine: medicineName,
            alternatives: result
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
