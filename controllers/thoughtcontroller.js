const {Thought, User} = require('../models');

const thoughtController = {
    // GET ROUTE - get all thoughts
    getAllThoughts(req,res){
        Thought.find({})
        .select("-__v")
        .sort({_id:-1})
        .then(dbThoughtData=> res.json(dbThoughtData))
        .catch(err=>{
            console.log(err);
            res.sendStatus(400);
        })
    },
    // GET ROUTE - get thought by id
    getThoughtById({params}, res) {
        Thought.findOne({_id:params.id})
        .select("-__v")
        .then(dbThoughtData=> res.json(dbThoughtData))
        .catch(err=>{
            console.log(err);
            res.sendStatus(400);
        })
    },
    // POST ROUTE - create thought and add to user
    addThought({params,body}, res){
        console.log(params);
        Thought.create(body)
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
        Thought.findOneAndUpdate(
            {_id:params.thoughtId}, //.thoughtId
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
    Thought.findOneAndUpdate({_id:params.thoughtId},body,{new:true,runValidators:true})
    .then(dbThoughtData => {
        if(!dbThoughtData){
            res.status(404).json({message:'No thought found with this id.'});
            return;
        }
        res.json(dbThoughtsData)
    })
    .catch(err => res.json(err))
}, 
    // DELETE ROUTE - delete thought by id
    deleteThought({params},res){
        Thoughts.findOneAndDelete({_id:params.thoughtId})
            .then(deletedThought =>{
                if(!deletedThought){
                    return res.status(404).json({message:"No comment with this id"});
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } }, //.thoughtId
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
            {_id:params.thoughtId}, //.thoughtId
            {pull:{reactions:{reactionId:params.reactionId}}},
            {new:true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
        }
}


module.exports = thoughtController;