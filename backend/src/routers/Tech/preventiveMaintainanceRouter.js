const express = require('express');
const router = express.Router();
const Maintainance = require('../../models/Tech/preventiveMaintainance');
const Machine = require('../../models/Tech/MachineryModel');
require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer();
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});
const uploadToCloudinaryImg = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          reject(new Error('Failed to upload file to Cloudinary'));
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(buffer);
  });
};

// POST route to add a Calibration Record
router.post('/addPreventiveMaintaince/:MachineId', upload.fields([{ name: 'image' }, { name: 'document' }]), async (req, res) => {
  try {
    console.log('Received request to add preventive maintenance.');

    const machineId = req.params.MachineId;
    if (!machineId) {
      return res.status(404).json({ error: 'Please Provide Machine ID' });
    }

    console.log('Checking if machine exists...');
    const machine = await Machine.findById({_id:machineId});
    if (!machine) {
      return res.status(404).json({ error: 'Machine not found' });
    }
    console.log('Machine found.');

    let {
      maintainanceFrequencey,
      natureOfFault,
      rootCause,
      detailOfWork,
      generateCertificate
    } = req.body;

    if (!natureOfFault || !rootCause || !detailOfWork || !generateCertificate) {
      return res.status(400).json({ error: 'Required fields missing.' });
     }

    console.log('Validating maintenance frequency...');
    maintainanceFrequencey = maintainanceFrequencey.toLowerCase();

    console.log('Checking last maintenance record...');
    const lastMaintaince = await Maintainance.findOne({Machinery:machineId});
    
    console.log('Uploading image...');
    let imageUrl
    const imageBuffer = req.files['image'][0].buffer;
    const imageUploadResult = await uploadToCloudinaryImg(imageBuffer);
    imageUrl = imageUploadResult.secure_url;

    const today = new Date(); 
    let lastMaintainanceDate

    if (!lastMaintaince) {
      lastMaintainanceDate = new Date(today.setDate(today.getDate() - 1));
      console.log('This is the first maintenance record for this machine.');
    } else {
    day = new Date();
    
      switch (maintainanceFrequencey) {
        case 'daily':
          lastMaintainanceDate = new Date(today.setDate(today.getDate() - 1));
          break;
        case 'weekly':
          lastMaintainanceDate = new Date(today.setDate(today.getDate() - 7));
          break;
        case 'monthly':
          lastMaintainanceDate = new Date(today.setMonth(today.getMonth() - 1));
          break;
        case 'quarterly':
          lastMaintainanceDate = new Date(today.setMonth(today.getMonth() - 6));
          break;
        case 'yearly':
          lastMaintainanceDate = new Date(today.setFullYear(today.getFullYear() - 1));
          break;
        default:
          return res.status(400).json({ error: 'Invalid maintainance frequency provided' });
      }
    }
    
    console.log('Calculating next maintenance date...');
    const todayForNextDate = new Date();// Reset the date to today for calculating next maintenance date
    let nextMaintainanceDate
    switch (maintainanceFrequencey) {
      case 'daily':
        nextMaintainanceDate = new Date(todayForNextDate.setDate(todayForNextDate.getDate() + 1));
        break;
      case 'weekly':
        nextMaintainanceDate = new Date(todayForNextDate.setDate(todayForNextDate.getDate() + 7));
        break;
      case 'monthly':
        nextMaintainanceDate = new Date(todayForNextDate.setMonth(todayForNextDate.getMonth() + 1));
        break;
      case 'quarterly':
        nextMaintainanceDate = new Date(todayForNextDate.setMonth(todayForNextDate.getMonth() + 6));
        break;
      case 'yearly':
        nextMaintainanceDate = new Date(todayForNextDate.setFullYear(todayForNextDate.getFullYear() + 1));
        break;
    }
    console.log('Creating maintenance record...');
    const maintainanceRecord = new Maintainance({
      Machinery: machineId,
      lastMaintainanceDate,
      nextMaintainanceDate,
      natureOfFault,
      rootCause,
      detailOfWork,
      uploadImage:imageUrl,
      generateCertificate,
    });
    
    try {
      await maintainanceRecord.save();
      console.log('Maintainance record saved successfully');
      res.status(200).json({ message: 'Maintainance record added successfully', data: maintainanceRecord });
    } catch (err) {
      console.error('Error while saving the maintainance record: ', err);
      res.status(500).json({ error: 'Server Error' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add Maintainance' ,message:error.message});
  }
});

// * GET All Machinery Data From MongooDB Database
router.get('/getAllMaintenanceRecords', async (req, res) => {
  try {
    console.log('Received request to fetch all maintenance records.');

    const allMaintenanceRecords = await Maintainance.find().populate('Machinery');

    console.log(`Found ${allMaintenanceRecords.length} maintenance records.`);
    res.status(200).json({ message: 'Fetched all maintenance records successfully', data: allMaintenanceRecords });
  } catch (error) {
    console.error('Failed to fetch maintenance records: ', error.message);
    res.status(500).json({ error: 'Failed to fetch maintenance records', message: error.message });
  }
});

router.get('/getMaintenanceByMachineId/:MachineId', async (req, res) => {
  try {
    const machineId = req.params.MachineId;
    console.log(`Received request to fetch maintenance records for Machine ID: ${machineId}`);

    const maintenanceRecords = await Maintainance.find({ Machinery: machineId }).populate('Machinery');

    if (maintenanceRecords.length === 0) {
      console.log('No maintenance records found for the given Machine ID.');
      return res.status(404).json({ message: 'No maintenance records found for the given Machine ID' });
    }

    console.log(`Found ${maintenanceRecords.length} maintenance records for the given Machine ID.`);
    res.status(200).json({ message: 'Fetched maintenance records successfully', data: maintenanceRecords });
  } catch (error) {
    console.error('Failed to fetch maintenance records by Machine ID: ', error.message);
    res.status(500).json({ error: 'Failed to fetch maintenance records by Machine ID', message: error.message });
  }
});

router.get('/getMaintenanceById/:MaintainanceId', async (req, res) => {
  try {
    const maintainanceId = req.params.MaintainanceId;
    console.log(`Received request to fetch maintenance record for Maintenance ID: ${maintainanceId}`);

    const maintenanceRecord = await Maintainance.findById(maintainanceId).populate('Machinery');

    if (!maintenanceRecord) {
      console.log('No maintenance record found for the given Maintenance ID.');
      return res.status(404).json({ message: 'No maintenance record found for the given Maintenance ID' });
    }

    console.log('Successfully fetched the maintenance record for the given Maintenance ID.');
    res.status(200).json({ message: 'Fetched maintenance record successfully', data: maintenanceRecord });
  } catch (error) {
    console.error('Failed to fetch maintenance record by Maintenance ID: ', error.message);
    res.status(500).json({ error: 'Failed to fetch maintenance record by Maintenance ID', message: error.message });
  }
});

router.delete('/deleteAllMaintenanceRecords', async (req, res) => {
  try {
    console.log('Received request to delete all maintenance records.');

    const result = await Maintainance.deleteMany();

    if (result.deletedCount === 0) {
      console.log('No records to delete.');
      return res.status(404).json({ message: 'No maintenance records found to delete.' });
    }

    console.log(`Deleted ${result.deletedCount} maintenance records.`);
    res.status(200).json({ message: `Successfully deleted ${result.deletedCount} maintenance records.` });
  } catch (error) {
    console.error('Failed to delete maintenance records: ', error.message);
    res.status(500).json({ error: 'Failed to delete maintenance records', message: error.message });
  }
});

router.delete('/deleteMaintenanceById/:MaintainanceId', async (req, res) => {
  try {
    const maintainanceId = req.params.MaintainanceId;
    console.log(`Received request to delete maintenance record for Maintenance ID: ${maintainanceId}`);

    const result = await Maintainance.findByIdAndDelete(maintainanceId);

    if (!result) {
      console.log('No maintenance record found for the given Maintenance ID to delete.');
      return res.status(404).json({ message: 'No maintenance record found for the given Maintenance ID to delete.' });
    }

    console.log('Successfully deleted the maintenance record for the given Maintenance ID.');
    res.status(200).json({ message: 'Successfully deleted the maintenance record.' });
  } catch (error) {
    console.error('Failed to delete maintenance record by Maintenance ID: ', error.message);
    res.status(500).json({ error: 'Failed to delete maintenance record by Maintenance ID', message: error.message });
  }
});

module.exports = router;