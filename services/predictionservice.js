function predictForget(userId, doseTime) {
  return {
    willForget: Math.random() > 0.5,
    confidence: Math.random().toFixed(2)
  };
}

module.exports = { predictForget };