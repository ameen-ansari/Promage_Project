const mongoose = require('mongoose');
const validator = require('validator')
const Schema = mongoose.Schema;

// * Creation of Employee Schema
const employeeSchema = new mongoose.Schema({

  // ? This attribute is to check the status of employee if the specific 
  // ? employee assigned monthlyPlan or not?
  Assigned: {
    type: Boolean,
    default: false
  },

  TrainingStatus: {
    type: String,
    enum: ['Trained', 'Not Trained'],
    default: 'Not Trained'
  },

  EmployeeCode: {
    type: String,
    unique: true,
  },

  EmployeeName: {
    type: String,
    required: true
  },

  PhoneNumber: {
    type: Number,
    required: true,
    validate: {
      validator: function (PhoneNumber) {
        const phoneNumberString = PhoneNumber.toString();
        return phoneNumberString.length <= 11;
      },
      message: 'Phone number must have a maximum of 11 digits.',
    },
  },

  Email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },

  CNIC: {
    type: Number,
    unique: true,
    required: true,
    validate: {
      validator: function (cnic) {
        const cnicString = cnic.toString();
        return cnicString.length === 13;
      },
      message: 'CNIC must have exactly 13 digits.',
    },
  },

  Qualification: {
    type: String,
    required: true
  },

  // ! It should be drop-down like Department1, Department2, ... on frontend
  Department: {
    type: String,
    required: true
  },

  Address: {
    type: String,
    required: true
  },

  // ! It should be drop-down like Designation1, Designation2, ... on frontend  
  Designation: {
    type: String,
    required: true
  },

  DateOfBirth: {
    type: Date,
    required: true,
  },

  EmployeeCV: {
    type: String
  },

  EmployeeImage: {
    type: String
  },

  EmployeeData: [{

    Training: {
      type: Schema.Types.ObjectId,
      ref: 'Training'
    },

    EmployeeResultStatus: {
      type: String,
      enum: ['Pending', 'Active'],
      default: 'Pending'
    },

    Marks: {
      type: Number
    },

    Remarks: {
      type: String,
    },

    IsPresent: {
      type: Boolean,
      default: false
    },

    IsPass: {
      type: Boolean,
      default: false
    },
  }


  ],


}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// ? Pre-save middleware to generate the next employee code
employeeSchema.pre('save', async function (next) {
  try {
    const latestEmployee = await this.constructor.findOne(
      {},
      { EmployeeCode: 1 },
      { sort: { EmployeeCode: -1 } }
    ).exec();

    let nextNumericPart = 1;
    if (latestEmployee) {
      const numericPart = parseInt(latestEmployee.EmployeeCode.slice(1), 10);
      nextNumericPart = numericPart + 1;
    }

    this.EmployeeCode = 'E' + nextNumericPart.toString().padStart(3, '0');
    next();
  } catch (error) {
    next(error);
  }
});

// * Creation of Model
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;