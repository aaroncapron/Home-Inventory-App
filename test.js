// 10-16-2024 | Successfully tested the creation of a new user and item, and retrieval from the db.

const sequelize = require('./utils/database');
const User = require('./models/User');
const Item = require('./models/Item');

const testDatabase = async () => {
  try {
    // Sync the user model and force clear
    await User.sync({ force: true });

    // sync item model and force clear
    await Item.sync({ force: true });

    // new user
    const user = await User.create({
      username: 'testuser',
      password: 'testpassword',
    });
    console.log('User  saved successfully:', user.toJSON());

    // new item
    const item = await Item.create({
      name: 'Test Item',
      category: 'Test Category',
      quantity: 10,
      userId: user.id, // linked to user
    });
    console.log('Item saved successfully:', item.toJSON());

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
};

testDatabase();