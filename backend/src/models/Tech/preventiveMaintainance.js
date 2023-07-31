const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const maintainanceSchema = new Schema({
  Machinery: {
    type: Schema.Types.ObjectId,
    ref: 'Machinery',
  },
  lastMaintainanceDate: {
    type: Date,
    required: true,
  },
  nextMaintainanceDate: {
    type: Date,
    required: true,
  },
  natureOfFault:{
    type: String,
    required: true,
  },
  rootCause:{
    type: String,
    required: true,
  },
  detailOfWork:{
    type: String,
    required: true,
  },
  uploadImage:{
    type: String,
    required: true,
  },
  generateCertificate:{
    type: String,
    required: true,
  },
  
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Maintainance = mongoose.model('PreventiveMaintainance', maintainanceSchema);
module.exports = Maintainance;
