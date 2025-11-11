// src/routes/eventRoutes.js
const express = require('express');
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

const router = express.Router();

router.get('/', getEvents);        // GET /api/events
router.post('/', createEvent);     // POST /api/events
router.get('/:id', getEventById);  // GET /api/events/:id
router.put('/:id', updateEvent);   // PUT /api/events/:id
router.delete('/:id', deleteEvent);// DELETE /api/events/:id

module.exports = router;
