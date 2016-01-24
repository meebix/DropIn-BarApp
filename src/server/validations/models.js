// User model
var userModel = {
  username: { min: 5, max: 100 },
  email: { min: 5, max: 100 }
};

// Event model
var eventModel = {
  name: { min: 5, max: 25 },
  description: { min: 20, max: 800 }
};

// Reward model
var rewardModel = {
  reward: { min: 5, max: 50 }
};

// Profile model
var profileModel = {
  name: { min: 5, max: 50 }
};

module.exports = {
  userModel: userModel,
  eventModel: eventModel,
  rewardModel: rewardModel,
  profileModel: profileModel
};
