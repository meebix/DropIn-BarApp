// User model
var userModel = {
  username: { min: 5, max: 100 },
  password: {},
  email: { min: 5, max: 100, email: true },
  roleId: {},
  barId: {},
  excludeUser: {}
};

// Event model
var eventModel = {
  name: { min: 5, max: 50 },
  description: { min: 20, max: 1000 },
  photo: {},
  eventStart: {},
  eventEnd: {},
  loyaltyLevelId: {},
  barId: {},
  markedForDeletion: {}
};

// Reward model
var rewardModel = {
  reward: { min: 5, max: 40 }
};

// Profile model
var profileModel = {
  name: { min: 5, max: 50 },
  address: { min: 5, max: 50 },
  city: { min: 2, max: 50, lettersOnly: true },
  state: { min: 2, max: 2, lettersOnly: true },
  zip: { min: 5, max: 5, numbersOnly: true },
  phone: { min: 14, max: 14 }, // 14 due to expected formatting
  email: { min: 5, max: 100, email: true },
  description: { min: 20, max: 1000 },
  thumbnail: {},
  photo: {},
  beaconMajor: { min: 1, max: 5, isNumber: true, numbersOnly: true, name: 'Beacon major' },
  beaconMinor: { min: 1, max: 5, isNumber: true, numbersOnly: true },
  latitude: { min: 1, max: 20, isNumber: true, allowFloat: true },
  longitude: { min: 1, max: 20, isNumber: true, allowFloat: true },
  mondayPromotion: { min: 5, max: 500 },
  tuesdayPromotion: { min: 5, max: 500 },
  wednesdayPromotion: { min: 5, max: 500 },
  thursdayPromotion: { min: 5, max: 500 },
  fridayPromotion: { min: 5, max: 500 },
  saturdayPromotion: { min: 5, max: 500 },
  sundayPromotion: { min: 5, max: 500 },
  reward: {},
  isActive: {}
};

module.exports = {
  userModel: userModel,
  eventModel: eventModel,
  rewardModel: rewardModel,
  profileModel: profileModel
};
