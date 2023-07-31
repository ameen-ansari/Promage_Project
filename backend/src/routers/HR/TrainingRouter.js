const express = require('express');
const Training = require('../../models/HR/TrainingModel')
const router = new express.Router();
require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require("fs");


cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

const upload = multer();

const uploadToCloudinary = async (file) => {
  
  const tempFilePath = `./${file.originalname}`;
  fs.writeFileSync(tempFilePath, file.buffer); // write the buffer to a temporary file
  const result = await cloudinary.uploader.upload(tempFilePath);
    
  
  fs.unlinkSync (tempFilePath); // delete the temporary file
  return result.secure_url;
    
  }

// * Post Training Data Into MongoDB Database
router.post('/addTraining', upload.fields([{ name: 'TrainingMaterial' }]), async (req, res) => {
  console.log("request made training..")
  // try {
    var trainingMaterial;

  if (req.files['TrainingMaterial']) {
    
    trainingMaterial = req.files['TrainingMaterial'][0];
  }
    
  var materialUrl;

  if (trainingMaterial) {
    
     materialUrl = await uploadToCloudinary(trainingMaterial);
  }
    

    console.log(materialUrl);

    const training = new Training({
      ...req.body,
      TrainingMaterial: materialUrl
    });

    await training.save().then(console.log("saved successfully")).catch((error)=>{
      console.log(error);
    });
    console.log(new Date().toLocaleString() + ' ' + 'Loading Training...');
    res.status(201).send({ status: true, message: "The Training is added!", data: training });
    console.log(new Date().toLocaleString() + ' ' + 'ADD Training Successfully!');
//  } catch (e) {
//     res.status(400).json({ message: e.message });
//   } 
});


// // POST Training Data Into MongoDB Database with document upload
// router.post('/addTraining', upload.fields([{ name: 'TrainingMaterial[]' }]), async (req, res) => {
//   try {
//     // const documentBuffers = req.files['TrainingMaterial'].map(file => file.buffer);
//     const documentBuffers = req.files['TrainingMaterial[]'].map(file => file.buffer);
//     const documentUrls = [];
//     for (const documentBuffer of documentBuffers) {
//       const documentUploadResult = await uploadToCloudinaryDoc(documentBuffer);
//       documentUrls.push(documentUploadResult.secure_url);
//     }
//     console.log(documentUrls);

//     const training = new Training({
//       ...req.body,
//       TrainingMaterial: documentUrls
//     });

//     await training.save();
//     console.log(new Date().toLocaleString() + ' ' + 'Loading Training...');

//     res.status(201).send({ status: true, message: "The Training is added!", data: training });
//     console.log(new Date().toLocaleString() + ' ' + 'ADD Training Successfully!');
//   } catch (e) {
//     res.status(400).json({ message: e.message });
//   }
// });

// cloudinary.config({
//   cloud_name: process.env.cloud_name,
//   api_key: process.env.api_key,
//   api_secret: process.env.api_secret
// });
// const upload = multer();

// const uploadToCloudinaryDoc = (buffer) => {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       { resource_type: 'raw' },
//       (error, result) => {
//         if (error) {
//           reject(new Error('Failed to upload file to Cloudinary'));
//         } else {
//           resolve(result);
//         }
//       }
//     );

//     uploadStream.end(buffer);
//   });
// };
// // * Post Training Data Into MongooDB Database
// router.post('/addTraining', upload.fields([ { name: 'TrainingMaterial' }]),  async (req, res) => {

//   try {

//     const documentBuffers = req.files['TrainingMaterial'].map(file => file.buffer);

//     const documentUrls = [];
//     for (const documentBuffer of documentBuffers) {
//       const documentUploadResult =await uploadToCloudinaryDoc(documentBuffer);
//       documentUrls.push(documentUploadResult.secure_url);
      
//     }
//     console.log(documentUrls);

//     const training = new Training({

//       ...req.body,
//       TrainingMaterial:documentUrls

//     });

//     await training.save()
//     console.log(new Date().toLocaleString() + ' ' + 'Loading Training...')

//     res.status(201).send({ status: true, message: "The Training is added!", data: training, });
//     console.log(new Date().toLocaleString() + ' ' + 'ADD Training Successfully!')

//   } catch (e) {

//     res.status(400).json({ message: e.message })

//   }

// });



// * GET All Training Data From MongooDB Database
router.get('/readTraining', async (req, res) => {

  console.log("request made for training")
  try {
      
    const training = await Training.find();
    console.log(new Date().toLocaleString() + ' ' + 'Loading Training...')

    const totalCollections = await Training.countDocuments()

    res.status(201).send({ status: true, message: "The following are training!", totaldocuments: totalCollections, data: training, });
    console.log(new Date().toLocaleString() + ' ' + 'READ Training Successfully!')

  } catch (e) {

    res.status(500).json({ message: e.message });

  }

});

// * DELETE Training Data By Id From MongooDB Database
router.delete('/deleteTraining/:id', async (req, res) => {
  
  try {

      const training = await Training.findOneAndDelete({ _id: req.params.id })
      console.log(new Date().toLocaleString() + ' ' + 'Loading Trainings...')

      if (!training) {
          res.status(404).send({ status:false, message: "This Training is Not found!"})
      }

      res.status(201).send({ status:true, message: "The following training is Delete!", data: training });
      console.log(new Date().toLocaleString() + ' ' + 'DELETE Training Successfully!')
  
    } catch (e) {
      
      res.status(500).json({ message: e.message });
    
    }

})

// * DELETE All Trainings Data From MongooDB Database
router.delete('/deleteAllTrainings', async (req, res) => {
  
  try {
      
      const training = await Training.deleteMany({})
      console.log(new Date().toLocaleString() + ' ' + 'Loading Trainings...')

      if (training.deletedCount === 0) {
          res.status(404).send({ status:false, message: "No Trainings found to delete!"})
      }

      res.status(201).send({ status:true, message: "All trainings have been deleted!", data: training });
      console.log(new Date().toLocaleString() + ' ' + 'DELETE Trainings Successfully!')
  
    } catch (e) {
      
      res.status(500).json({ message: e.message });
  
    }
    
})

module.exports = router










































// // * Post Training Data Into MongooDB Database
// router.post('/addTraining',  async (req, res) => {

//   try {

//     const training = new Training({
//       ...req.body
//     });

//     await training.save()
//     console.log(new Date().toLocaleString() + ' ' + 'Loading Training...')

//     res.status(201).send({ status: true, message: "The Training is added!", data: training, });
//     console.log(new Date().toLocaleString() + ' ' + 'ADD Training Successfully!')

//   } catch (e) {

//     res.status(400).json({ message: e.message })

//   }

// });
