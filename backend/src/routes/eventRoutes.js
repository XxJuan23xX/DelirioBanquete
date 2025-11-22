// src/routes/eventRoutes.js
const express = require('express');
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

const upload = require("../../middleware/upload");

const router = express.Router();

router.get('/', getEvents);        // GET /api/events
   // POST /api/events
router.get('/:id', getEventById);  // GET /api/events/:id
router.put('/:id', updateEvent);   // PUT /api/events/:id
router.delete('/:id', deleteEvent);// DELETE /api/events/:id
router.post("/", upload.single("image"), createEvent);

module.exports = router;
