const express = require('express');
const router = express.Router();

const Notification = require('../models/notification');

// رجّع كل الـ notifications اللي مش مقروءة
router.get('/', async (req, res) => {
    const notifications = await Notification.find({ seen: false });

    res.json({ notifications });
});

module.exports = router;