const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtcontroller');

// /api/thoughts
router
.route('/')
.get(getAllThoughts)
.post(addThought)

// /api/thoughts/:id
router
.route('/:thoughtid')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)

// /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.put(addReaction)
 

//api/thoughts/:thoughtId/:reactionId
router
.route('/:thoughtId/:reactionId')
.delete(deleteReaction)

module.exports = router;