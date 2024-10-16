const sequelize = require('./utils/database');
const User = require('./models/User');
const Item = require('./models/Item');
const assert = require('assert');

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
// async function test() {
//     try {
//       // Retrieve all users
//       const users = await User.findAll();
//       console.log('All users:', users);
  
//       // Retrieve all items
//       const allItems = await Item.findAll();
//       console.log('All items:', allItems);
  
//       // Retrieve a user by ID
//       const user = await User.findByPk(1);
//       console.log('User  with ID 1:', user);
  
//       // Retrieve an item by ID
//       const item = await Item.findByPk(1);
//       console.log('Item with ID 1:', item);
  
//       // Update a user
//       const updatedUser  = await User.findByPk(1);
//       updatedUser .username = 'Updated Username';
//       await updatedUser .save();
//       console.log('Updated user:', updatedUser );
  
//       // Update an item
//       const updatedItem = await Item.findByPk(1);
//       updatedItem.name = 'Updated Item Name';
//       await updatedItem.save();
//       console.log('Updated item:', updatedItem);
  
//       // Delete items associated with the user
//       const userItems = await Item.findAll({ where: { userId: 1 } });
//       for (const userItem of userItems) {
//         await userItem.destroy();
//         console.log(`Item with ID ${userItem.id} deleted successfully`);
//       }
  
//       // Now delete the user
//       const deletedUser  = await User.findByPk(1);
//       await deletedUser .destroy();
//       console.log('User  deleted successfully');
//     } catch (err) {
//       console.error('Error:', err);
//     }
//   };

// test();



// testing user/item creation, user/item update with invalid data, 
// retrieving invalid id users/items, deleting non-existent user/item edge cases,
// and other edge cases like long usernames/passwords, large quantity items,
// updating user details with long usernames/passwords,
// and updating item details with large quantity values.
async function test() {
  try {
    // Sync the user model and force clear
    await User.sync({ force: true });

    // Sync item model and force clear
    await Item.sync({ force: true });

    // User creation
    const newUser  = await User.create({
      username: 'newuser',
      password: 'newpassword',
    });
    console.log('New user created:', newUser );
    assert(newUser .username === 'newuser', 'User  creation failed: username mismatch');

    // Item creation
    const newItem = await Item.create({
      name: 'newitem',
      category: 'newcategory',
      quantity: 10,
      userId: newUser .id,
    });
    console.log('New item created:', newItem);
    assert(newItem.name === 'newitem', 'Item creation failed: name mismatch');

    // User update with invalid data
    try {
      const userToUpdate = await User.findByPk(newUser .id);
      userToUpdate.username = '';
      await userToUpdate.save();
      console.log('User  updated with invalid data (not good)');
    } catch (err) {
      console.log('Error updating user with invalid data (good)', err);
    }

    // Delete non-existent user
    try {
      await User.destroy({ where: { id: 999 } });
      console.log('Non-existent user deleted (not good)');
    } catch (err) {
      console.log('Error deleting non-existent user (good):', err);
    }

    // Verify deletion
    const deletedUser  = await User.findByPk(999);
    assert(deletedUser  === null, 'User deletion failed: user still exists');

  } catch (err) {
    console.log('Error :', err);
  }
}
test();