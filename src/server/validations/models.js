// User model
var userModel = {
  username: { min: 10, max: 15 },
  email: { min: 5, max: 10 }
};

// Event model
var eventModel = {
  name: { min: 5, max: 25 },
  description: { min: 20, max: 800 }
};

module.exports = {
  userModel: userModel,
  eventModel: eventModel
};
