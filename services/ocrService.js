const { readCSV } = require('./csvService');

async function mockOCRFromCSV() {
  const meds = await readCSV('data/medicines.csv');

  return {
    medicines: meds.slice(0, 2).map(med => ({
      name: med.drug_name,
      doses: med.doses.split('|'),
      durationDays: Number(med.duration)
    }))
  };
}

module.exports = { mockOCRFromCSV };