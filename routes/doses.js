const express = require('express');
const router = express.Router();

const Dose = require('../models/doses');

// GET /doses
router.get('/', async (req, res) => {
    try {

        const doses = await Dose.find().limit(50);

        res.status(200).json({
            count: doses.length,
            doses
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});

module.exports = router;