const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// * Creation of MonthlyPlan Schema
const monthlyPlanSchema = new mongoose.Schema({

  // ? This attribute is to check the status of MonthlyPlan if the specific 
  // ? MonthlyPlan assigned training or trainer? 
  Assigned: {
    type: Boolean,
    default: false
  },

  ActualDate: {
    type: Date,
    default: null,
  }, 

  TrainingResultStatus: {
    type: String,
    enum: ['Conducted', 'Not Conducted'],
    default: 'Not Conducted'
  },

  
  Date: {
    type: Date,
    required: true
  },

  Month: {
    type: String,
    required: true,
  },

  Time: {
    type: String,
    required: true
  },

  // ! It should be drop-down like Department1, Department2, ... on frontend
  Department: {
    type: String,
    required: true
  },

  // ! This type of attribute (ref) used to link to the table like training, In front-end, it should populate all the trainings
  Training: [{
   type: Schema.Types.ObjectId,
    ref: 'Training'
  }],
  
  // ! This type of attribute (ref) used to link to the table like trainers, In front-end, it should populate all the trainers  
  Trainer: [{
    type: Schema.Types.ObjectId,
    ref: 'Trainer'
  }], 

  Employee: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  }],

  Venue: {
    type: String,
    required: true
  },

  Duration: {
    type: String,
    required: true
  },

  Images : [],

  // ! If the user select the External option then show the trainer names in dropdown menu, if not then do not show the trainer names 
  InternalExternal: {
    type: String,
    enum: ['Internal', 'External'],
    required: true
  },

}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// * Properly initialized the Attendees property for the Trainer model.
monthlyPlanSchema.pre('save', function (next) {
  if (!this.Trainer || !this.Training || !this.Employee) {
    this.Trainer = [];
    this.Training = [];
    this.Employee = [];
  }
  next();
});

// * Creation of Model
const MonthlyPlan = mongoose.model('MonthlyPlan', monthlyPlanSchema);
module.exports = MonthlyPlan;