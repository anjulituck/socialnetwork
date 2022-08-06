const {User, Thought} = require('../models');

const userController = {
// GET ROUTE - get all users 
getAllUsers(req,res){
    User.find({})
    .populate({
        path:"thought",
        select:"-__v",
        model:Thought
    })
    .select("-__v")
    .sort({_id:-1})
    .then(dbUserData=> res.json(dbUserData))
    .catch(err=>{
        console.log(err);
        res.sendStatus(400);
    })
},
// GET ROUTE - get single user by id
getUserById({params}, res) {
    User.findOne({_id:params.id})
    .populate({
        path:"thought",
        select:"-__v",
        model:Thought
    })
    .select("-__v")
    .then(dbUserData=> res.json(dbUserData))
    .catch(err=>{
        console.log(err);
        res.sendStatus(400);
    })
},
// POST ROUTE - create new user 
createUser({body},res){
    User.create(body)
    .then(dbUserData=> res.json(dbUserData))
    .catch(err=>{
        console.log(err);
        res.sendStatus(400);
    })
},
// POST ROUTE - add friend to single user 
    addFriend({params},res){
    User.findOneAndUpdate(
        {_id:params.userId}, //.thoughtId
        {$push: {friends:params.friendId}},
        {new:true} //,runValidators:true
    )
    .populate({
        path:"friends",
        select:"-__v"
    })
    .select("-__v")
    .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id.' });
          return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
 },
// PUT ROUTE - update single user by id
updateUser({params,body},res){
    User.findOneAndUpdate({_id:params.id},body,{new:true,runValidators:true})
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message:'No user found with this id.'});
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => res.json(err))
}, 
// DELETE ROUTE - delete single user by id
deleteUser({params}, res) {
    User.findOneAndDelete({_id:params.id})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err))
},
// DELETE ROUTE - delete friend from list to single user 
    deleteFriend({params},res){
    User.findOneAndDelete(
        {_id:params.userId}, //.thoughtId
        {$pull: {friends:params.friendId}},
        {new:true} 
    )
    .select("-__v")
    .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id.' });
          return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
 }
}

module.exports = userController;