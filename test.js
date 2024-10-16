const sequelize = require('./utils/database');
const User = require('./models/User');
const Item = require('./models/Item');

// successfully tested the creation of a new user and item, and retrieval from the db.

// const testDatabase = async () => {
//   try {
//     // sync the user model and force clear
//     await User.sync({ force: true });

//     // sync item model and force clear
//     await Item.sync({ force: true });

//     // new user
//     const user = await User.create({
//       username: 'testuser',
//       password: 'testpassword',
//     });
//     console.log('User  saved successfully:', user.toJSON());

//     // new item
//     const item = await Item.create({
//       name: 'Test Item',
//       category: 'Test Category',
//       quantity: 10,
//       userId: user.id, // linked to user
//     });
//     console.log('Item saved successfully:', item.toJSON());

//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     await sequelize.close();
//   }
// };

// testDatabase();

// successfully tested the retrieve all, retrieve by ID, update, and delete functions from db.
async function test() {
    try {
      // Retrieve all users
      const users = await User.findAll();
      console.log('All users:', users);
  
      // Retrieve all items
      const allItems = await Item.findAll();
      console.log('All items:', allItems);
  
      // Retrieve a user by ID
      const user = await User.findByPk(1);
      console.log('User  with ID 1:', user);
  
      // Retrieve an item by ID
      const item = await Item.findByPk(1);
      console.log('Item with ID 1:', item);
  
      // Update a user
      const updatedUser  = await User.findByPk(1);
      updatedUser .username = 'Updated Username';
      await updatedUser .save();
      console.log('Updated user:', updatedUser );
  
      // Update an item
      const updatedItem = await Item.findByPk(1);
      updatedItem.name = 'Updated Item Name';
      await updatedItem.save();
      console.log('Updated item:', updatedItem);
  
      // Delete items associated with the user
      const userItems = await Item.findAll({ where: { userId: 1 } });
      for (const userItem of userItems) {
        await userItem.destroy();
        console.log(`Item with ID ${userItem.id} deleted successfully`);
      }
  
      // Now delete the user
      const deletedUser  = await User.findByPk(1);
      await deletedUser .destroy();
      console.log('User  deleted successfully');
    } catch (err) {
      console.error('Error:', err);
    }
  };

test();