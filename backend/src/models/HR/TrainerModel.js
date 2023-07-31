const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

// * Creation of Trainer Schema
const trainerSchema = new mongoose.Schema({
  
  TrainerCode: {
    type: String,
    unique: true,
  },

  Name: {
    type: String,
    required: true,
  },

  Age: {
    type: Number,
    required: true,
  },

  Email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },

  Specialities: {
    type: String
  },

  ExperienceYears: {
    type: Number,
    required: true,
  },

  TrainerImage: {
    type: String,
    // required: true
  },
  TrainerDocument: {
    type: String,
    // required: true
  }

}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// ? Pre-save middleware to generate the next trainer code
trainerSchema.pre('save', async function (next) {
  try {
    const latestTrianer = await this.constructor.findOne(
      {},
      { TrainerCode: 1 },
      { sort: { TrainerCode: -1 } }
    ).exec();

    let nextNumericPart = 1;
    if (latestTrianer) {
      const numericPart = parseInt(latestTrianer.TrainerCode.slice(1), 10);
      nextNumericPart = numericPart + 1;
    }

    this.TrainerCode = 'T' + nextNumericPart.toString().padStart(3, '0');
    next();
  } catch (error) {
    next(error);
  }
});

// * Creation of model
const Trainer = mongoose.model('Trainer', trainerSchema);
module.exports = Trainer;