const {Thoughts, User} = require('../models');

const thoughtsController = {
    // GET ROUTE - get all thoughts
    getAllThoughts(req,res){
        Thoughts.find({})
        .section("-__v")
        .sort({_id:-1})
        .then(dbThoughtsData=> res.json(dbThoughtsData))
        .catch(err=>{
            console.log(err);
            res.sendStatus(400);
        })
    },
    // GET ROUTE - get thought by id
    getThoughtByID({params}, res) {
        Thoughts.findOne({_id:params.id})
        .section("-__v")
        .then(dbThoughtsData=> res.json(dbThoughtsData))
        .catch(err=>{
            console.log(err);
            res.sendStatus(400);
        })
    },
    // POST ROUTE - create thought and add to user
    addThought({params,body}, res){
        console.log(params);
        Thoughts.create(body)
            .then(({_id})=> {
                return User.findOneAndUpdate(
                    {_id:params.userId},
                    {$push:{thoughts:_id}},
                    {new:true}
                )
            })
            .then(dbUserData => {
                console.log(dbUserData);
                if(!dbUserData){
                    res.status(404).json({message:'No user found with this id.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
     // POST ROUTE - create reaction and add as stored with single thought 
     addReaction({params, body},res){
        Thoughts.findOneAndUpdate(
            {_id:params.thoughtsId}, //.thoughtId
            {$push: {reactions:body}},
            {new:true, runValidators:true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id.' });
              return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
     },
     // PUT ROUTE - update single thought by id
    updateThought({params,body},res){
    Thoughts.findOneAndUpdate({_id:paramas.thoughtsId},body,{new:true,runValidators:true})
    .then(dbThoughtsData => {
        if(!dbThoughtsData){
            res.status(404).json({message:'No thought found with this id.'});
            return;
        }
        res.json(dbThoughtsData)
    })
    .catch(err => res.json(err))
}, 
    // DELETE ROUTE - delete thought by id
    deleteThought({params},res){
        Thoughts.findOneAndDelete({_id:params.thoughtsId})
            .then(deletedThought =>{
                if(!deletedThought){
                    return res.status(404).json({message:"No comment with this id"});
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtsId } }, //.thoughtId
                    { new: true }
                  )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                  res.status(404).json({ message: 'No user found with this id.' });
                  return;
                }
                res.json(dbUserData);
              })
              .catch(err => res.json(err));
    },
 // DELETE ROUTE - delete reaction stored with single thought 
    deleteReaction({params},res){
        Thoughts.findOneAndUpdate(
            {_id:params.thoughtsId}, //.thoughtId
            {pull:{reactions:{reactionId:params.reactionId}}},
            {new:true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
        }
}


module.exports = thoughtsController;