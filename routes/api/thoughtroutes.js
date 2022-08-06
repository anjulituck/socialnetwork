const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtcontroller');

// /api/thoughts
router
.route('/')
.get(getAllThoughts)
.post(createThought)

// /api/thoughts/:id
router
.route('/:thoughtid')
.get(getThoughtById)
.post(createReaction)
.put(updateThought)
.delete(deleteThought)

// /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.put(createReaction)
 

//api/thoughts/:thoughtId/:reactionId
router
.route('/:thoughtId/:reactionId')
.delete(deleteReaction)

module.exports = router;