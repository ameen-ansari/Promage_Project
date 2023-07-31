const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// * Creation of YearlyPlan Schema
const yearlyPlanSchema = new Schema({
  
  Year: {
    type: Number,
    required: true
  },
  
  Month: [{
    MonthName: {
      type: String,
      required: true
    },
    
    Trainings: [{   
      Training: {
        type: Schema.Types.ObjectId,
        ref: 'Training'
      },
      
      WeekNumbers: [{
        type: Number,
        required: true
      }]
    }]
  }],
  
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// * Creation of Model
const YearlyPlan = mongoose.model('YearlyPlan', yearlyPlanSchema);
module.exports = YearlyPlan;
