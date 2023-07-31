const express = require('express');
const router = express.Router();
const Calibration = require('../../models/Tech/calibrationRecord');
const Equipment = require('../../models/Tech/EquipmentModel');
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
const uploadToCloudinaryCv = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'raw' },
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
router.post('/addCalibration/:EquipmentId', upload.fields([{ name: 'image' }, { name: 'document' }]), async (req, res) => {
  try {
    const EquipmentId = req.params.EquipmentId;
    if (!EquipmentId) {
      return res.status(404).json({ error: 'Please Provide Machine ID' });
    }

    // Get the Equipment by ID
    const equipment = await Equipment.findById(EquipmentId);

    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    let cvUploadResult;
    let imageUrl

    if (equipment.calibrationStatus === 'Internal') {
      // Get the file buffers of the uploaded image and document
      const imageBuffer = req.files['image'][0].buffer;
      const cvBuffers = req.files['document'][0].buffer;

      // Upload the image buffer to Cloudinary and obtain the URL
      const imageUploadResult = await uploadToCloudinaryImg(imageBuffer);
      imageUrl = imageUploadResult.secure_url;

      let DocUploadResult = await uploadToCloudinaryCv(cvBuffers);
      cvUploadResult = DocUploadResult.secure_url;



    } else if (equipment.calibrationStatus === 'External') {
      const cvBuffers = req.files['document'][0].buffer;

      let DocUploadResult = await uploadToCloudinaryCv(cvBuffers);
      cvUploadResult = DocUploadResult.secure_url;
    }

    // Set the current date
    const currentDate = new Date();

    // Set the due date based on machineMaintenence
    let dueDate;
    switch (equipment.equipmentFrequency) {
      case 'Daily':
        dueDate = new Date(currentDate);
        dueDate.setDate(currentDate.getDate() + 1);
        break;
      case 'Weekly':
        dueDate = new Date(currentDate);
        dueDate.setDate(currentDate.getDate() + 7);
        break;
      case 'Monthly':
        dueDate = new Date(currentDate);
        dueDate.setMonth(currentDate.getMonth() + 1);
        break;
      case 'Yearly':
        dueDate = new Date(currentDate);
        dueDate.setFullYear(currentDate.getFullYear() + 1);
        break;
      default:
        break;
    }

    // Create a new Calibration record
    const calibrationRecord = new Calibration({
      Equipment: EquipmentId,
      date: currentDate,
      firstReading: req.body.firstReading,
      secondReading: req.body.secondReading,
      thirdReading: req.body.thirdReading,
      dueDate: dueDate
    });
    
    if (equipment.calibrationStatus === 'Internal') {
      calibrationRecord.internal = {
        uploadImage:imageUrl,
        generateDocument:req.body.generateDocument,
        uploadMasterCalibratorCertificate:cvUploadResult,
      }

    } else if (equipment.calibrationStatus === 'External') {
      calibrationRecord.external = {
        comapnyName:req.body.companyName,
        masterCalibratorRefrence:req.body.generateDocument,
        uploadMasterCalibratorCertificate:cvUploadResult,
      }
    }

    // Save the Calibration record
    const savedCalibration = await calibrationRecord.save();
    return res.status(201).send({ status: true, message: "Calibration Record is added!", data: savedCalibration, });

  } catch (error) {
    return res.status(500).json({ error: 'Failed to add Calibration Record',message:error.message });
  }
});

// * GET All Machinery Data From MongooDB Database
router.get('/readAllCalibration', async (req, res) => {
  try {
    const calibration = await Calibration.find().populate('Equipment');

    const totalCollections =  await Calibration.countDocuments()

    res.status(201).send({ status: true, message: "The following are Callibration!", totaldocuments: totalCollections , data: calibration, });

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Callibration' ,message:error.message});
  }
});

// GET route to fetch machinery by ID
router.get('/readCalibration/:id', async (req, res) => {
  try {
    const calibrationId = req.params.id;
    if (!calibrationId) {
      return res.status(404).json({ error: 'Please Provide Machine ID' });
    }
    const calibration = await Calibration.findById(calibrationId).populate('equipmentId', '-_id -__v');

    if (!calibration) {
      return res.status(404).json({ error: 'calibration not found' });
    }

    res.status(201).send({ status:true, message: "The following calibration!", data: calibration });

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch calibration',message:error.message });
  }
});
module.exports = router;