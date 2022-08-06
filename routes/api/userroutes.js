const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser, 
  addFriend, 
  deleteFriend
} = require('../../controllers/usercontroller');

// /api/user
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

  // /api/users/userId/friends/:friendsId
  router
  .route('/:userId/friends/:friendsId')
  .post(addFriend)
  .delete(deleteFriend)

module.exports = router;