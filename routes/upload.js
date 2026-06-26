const express = require('express');
const router = express.Router();
const Dose = require('../models/doses');
const mongoose = require('mongoose');
const upload = require('../middleware/multer');
const path = require('path');
const { readCSV } = require('../services/csvService');

// ==============================
// Mock OCR (من CSV)
// ==============================
async function mockOCRFromCSV() {
    const data = await readCSV(
        path.join(__dirname, '../data/medicines_full.csv')
    );

      return {
        medicines: data.slice(0,3).map(item => ({
           name: item.drug_name,
           activeIngredient: item.active_ingredient,
           uses: item.Uses,
           doses: ['08:00', '20:00'],
           durationDays: 5
            
           }))
};
}


// userId مؤقت
const DEMO_USER_ID = new mongoose.Types.ObjectId();

// ==============================
// Upload Route
// ==============================
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // ✅ تشغيل الفنكشن صح
        const ocrResult = await mockOCRFromCSV();

        if (!ocrResult?.medicines?.length) {
            return res.status(400).json({
                message: "No medicines found in OCR result"
            });
        }

        const allDoses = [];

        // ==============================
        // Generate doses
        // ==============================
        ocrResult.medicines.forEach(med => {
    const { name, doses, durationDays } = med;

    for (let day = 0; day < durationDays; day++) {
        doses.forEach(time => {
            const [hour, minute] = time.split(":");

            const scheduledAt = new Date();
            scheduledAt.setDate(scheduledAt.getDate() + day);
            scheduledAt.setHours(hour, minute, 0, 0);

            allDoses.push({
                userId: DEMO_USER_ID,
                medicineName: name,
                scheduledAt,
                taken: false
            });
        });
    }
});
       
        const savedDoses = await Dose.insertMany(allDoses);
        res.status(200).json({
            message: "Image uploaded successfully",
            file: req.file.filename,
            totalGeneratedDoses: savedDoses.length
          });

    

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
});

module.exports = router;
