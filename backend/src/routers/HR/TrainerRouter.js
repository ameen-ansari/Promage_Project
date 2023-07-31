const express = require("express");
const Trainer = require("../../models/HR/TrainerModel");
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

// * Post Trainer Data Into MongooDB Database
router.post("/addTrainer",upload.fields([{ name: 'TrainerImage' }, { name: 'TrainerDocument' }]), async (req, res) => {

  console.log("request made trainer..")

  // try {
    // Get the files of the uploaded image and document
    console.log(req.files);
    var imageFile;
    var documentFile;
    var imageUrl;
    var documentUrl;
    if (req.files['TrainerImage']) {
      imageFile = req.files['TrainerImage'][0];
       // Upload the image buffer to Cloudinary and obtain the URL
     imageUrl = await uploadToCloudinary(imageFile);
    
     console.log(imageUrl);
    }
    if (req.files['TrainerDocument']) {
      
       documentFile = req.files['TrainerDocument'][0];

       // Upload the document buffers to Cloudinary and obtain the URLs
     documentUrl = await uploadToCloudinary(documentFile)
 
    console.log(documentUrl);
    }

   
    
    
    


    const trainer = new Trainer({

      ...req.body,
      TrainerImage:imageUrl,
      TrainerDocument:documentUrl

    });

    await trainer.save().then(console.log("saved..")).catch((error)=>{
      console.log(error);
    })
    console.log(new Date().toLocaleString() + " " + "Loading Trainer...");

    res.status(201).send({ status: true, message: "The Trainer is added!", data: trainer });
    console.log(new Date().toLocaleString() + " " + "ADD Trainer Successfully!");

  // } catch (e) {

  //   if (e.code === 11000) {
  //     // todo it get the Object Keys (KeyPattern *Property of MongoDB for duplication error *) from error
  //     const duplicateKeys = Object.keys(e.keyPattern);

  //     let errorMessage = "Trainer with this ";

  //     // todo It checks both duplication of Email
  //     if (duplicateKeys.includes("Email")) {
  //       errorMessage += "Email is already exist!";
  //     }

  //     res.status(400).send({ status: false, message: errorMessage });

  //   } else {

  //     res.status(400).send({ status: false, message: e.message });

  //   }
  // }
  
});

// * GET All Trainer Data From MongooDB Database
router.get("/readTrainer", async (req, res) => {

  try {

    const trainer = await Trainer.find()
    console.log(new Date().toLocaleString() + " " + "Loading Trainer...");

    const totalCollections = await Trainer.countDocuments();

    res.status(201).send({ status: true, message: "The following are the trainer!", totaldocuments: totalCollections, data: trainer });
    console.log(new Date().toLocaleString() + " " + "READ Trainer Successfully!");

  } catch (e) {

    res.status(500).json({ message: e.message });

  }

});

// * DELETE Trainer Data By Id From MongooDB Database
router.delete('/deleteTrainer/:id', async (req, res) => {
  
  try {

      const trainer = await Trainer.findOneAndDelete({ _id: req.params.id })
      console.log(new Date().toLocaleString() + ' ' + 'Loading Trainers...')

      if (!trainer) {
          res.status(404).send({ status:false, message: "This Trainer is Not found!"})
      }

      res.status(201).send({ status:true, message: "The following trainer is Delete!", data: trainer });
      console.log(new Date().toLocaleString() + ' ' + 'DELETE Trainer Successfully!')
  
    } catch (e) {
      
      res.status(500).json({ message: e.message });
    
    }

})

// * DELETE All Trainers Data From MongooDB Database
router.delete('/deleteAllTrainers', async (req, res) => {
  
  try {
      
      const trainer = await Trainer.deleteMany({})
      console.log(new Date().toLocaleString() + ' ' + 'Loading Trainers...')

      if (trainer.deletedCount === 0) {
          res.status(404).send({ status:false, message: "No Trainers found to delete!"})
      }

      res.status(201).send({ status:true, message: "All trainers have been deleted!", data: trainer });
      console.log(new Date().toLocaleString() + ' ' + 'DELETE Trainers Successfully!')
  
    } catch (e) {
      
      res.status(500).json({ message: e.message });
  
    }
    
})

module.exports = router;












































// // * Post Trainer Data Into MongooDB Database
// router.post("/addTrainer", async (req, res) => {

//   try {

//     const trainer = new Trainer({
//       ...req.body,
//     });

//     await trainer.save();
//     console.log(new Date().toLocaleString() + " " + "Loading Trainer...");

//     res.status(201).send({ status: true, message: "The Trainer is added!", data: trainer });
//     console.log(new Date().toLocaleString() + " " + "ADD Trainer Successfully!");

//   } catch (e) {

//     if (e.code === 11000) {
      
//       let errorMessage = '';

//       if (e.errmsg.includes('Email') && e.errmsg.includes(req.body.Email)) {
        
//         errorMessage = 'Email already exists!';
      
//       } else {
        
//         errorMessage = 'Duplicate key error';
      
//       }

//       res.status(400).send({ status: false, message: errorMessage });
    
//     } else {

//       res.status(400).send({ status: false, message: e.message });
    
//     }
//   }
// });
