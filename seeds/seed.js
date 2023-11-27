const sequelize = require('../config/connection');
const { Landmark, User, Comment} = require('../models');

const userData = require('./userData.json');
const landmarkData = require('./LandmarkData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const landmark of landmarkData) {
    await Landmark.create({
      ...landmark,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const comments = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
