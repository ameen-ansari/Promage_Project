const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calibrationSchema = new Schema({
  Equipment: {
    type: Schema.Types.ObjectId,
    ref: 'Equipment',
  },
  lastCalibrationDate: {
    type: Date,
    required: true,
  },
  measuredReading: {
    type: [
      {
        firstReading: {
          type: Number,
          required: true,
        },
        secondReading: {
          type: Number,
          required: true,
        },
        thirdReading: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
  nextCalibrationDate: {
    type: Date,
    required: true,
  },
  internal: {
    uploadImage: {
      type: String,
    },
    generateDocument: {
      type: String,
    },
    uploadMasterCalibratorCertificate: {
      type: String,
    },
  },
  external: {
    companyName: {
      type: String,
    },
    masterCalibratorReference: {
      type: String,
    },
    uploadMasterCalibratorCertificate: {
      type: String,
    },
  },
  
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Calibration = mongoose.model('CalibrationRecord', calibrationSchema);
module.exports = Calibration;
