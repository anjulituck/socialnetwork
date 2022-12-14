const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema (
    {
        thoughtText:{
            type:String,
            required:true,
            minLength:1,
            maxLength:280
            },
        createdAt:{
            type:Date, 
            default:Date.now, 
            get:createdAtVal => dateFormat(createdAtVal)
            },
        username:{
            type:String,
            required:true

            },
        reactions:[
            {
                type:Schema.Types.ObjectId, 
                ref:'User'
            }
        ]
    },
    {
        toJSON:{
            virtuals:true,
            getters:true
        },
        id:false
    }
);

const ReactionSchema = new Schema (
    {
        reactionId:{
            type:Schema.Types.ObjectId, 
            default: () => new Types.ObjectId()
        }, 
        reactionBody:{
            type:String,
            required:true,
            maxLength:280
        },
        username:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date, 
            default:Date.now, 
            get:createdAtVal => dateFormat(createdVal)
            }
    },
    {
        toJSON: {
            getters:true
        }
    }
);

// reationCount virtual

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})

const Thought= model('Thoughts', ThoughtSchema);

module.exports = Thought;