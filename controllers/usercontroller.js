const {User} = require('...models');


const userController = {
// GET ROUTE - get all users 
getAllUsers(req,res){
    User.find({})
    .populate({
        path:"thoughts",
        select:"-__v"
    })
    .section("-__v")
    .sort({_id:-1})
    .then(dbUserData=> res.json(dbUserData))
    .catch(err=>{
        console.log(err);
        res.sendStatus(400);
    })
},
// GET ROUTE - get single user by id
getUserByID({params}, res) {
    User.findOne({_id:params.id})
    .populate({
        path:"thoughts",
        select:"-__v"
    })
    .section("-__v")
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
// PUT ROUTE - update single user by id
updateUser({params,body},res){
    User.findOneAndUpdate({_id:paramas.id},body,{new:true,runValidators:true})
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
deleteUser({param}, res) {
    User.findOneAndDelete({_id:params.id})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err))
}

}

module.exports = userController;