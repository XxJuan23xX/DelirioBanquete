// src/controllers/eventController.js
const Event = require('../models/Event');

// Crear evento
const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    return res.status(201).json(event);
  } catch (error) {
    console.error('Error al crear evento:', error);
    return res.status(400).json({ message: 'No se pudo crear el evento', error: error.message });
  }
};

// Obtener todos los eventos
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });
    return res.json(events);
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    return res.status(500).json({ message: 'Error al obtener eventos' });
  }
};

// Obtener un evento por ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Evento no encontrado' });
    return res.json(event);
  } catch (error) {
    console.error('Error al obtener evento:', error);
    return res.status(500).json({ message: 'Error al obtener evento' });
  }
};

// Actualizar evento
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) return res.status(404).json({ message: 'Evento no encontrado' });
    return res.json(event);
  } catch (error) {
    console.error('Error al actualizar evento:', error);
    return res.status(400).json({ message: 'No se pudo actualizar el evento', error: error.message });
  }
};

// Eliminar evento
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Evento no encontrado' });
    return res.json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    return res.status(500).json({ message: 'No se pudo eliminar el evento' });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
