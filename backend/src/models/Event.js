// src/models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    eventType: {
      type: String,
      enum: ['Boda', 'XV años', 'Graduación', 'Cumpleaños', 'Otro'],
      default: 'Otro',
    },
    eventDate: {
      type: Date,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    package: {
      type: String, // luego lo puedes cambiar a ref a otro modelo de "Package"
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pendiente', 'Confirmado', 'Cancelado'],
      default: 'Pendiente',
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model('Event', eventSchema);
