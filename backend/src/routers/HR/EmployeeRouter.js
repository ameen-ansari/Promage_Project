const express = require('express');
const Employee = require('../../models/HR/EmployeeModel');
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



// * POST Employee Data Into MongooDB Database
router.post('/addEmployee', upload.fields([{ name: 'Image' }, { name: 'CV' }]), async (req, res) => {
  console.log("Request deteceted")

  try {
    // Get the file buffers of the uploaded image and document
    var imageUrl;
    if (req.files['Image']) {
      imageFile = req.files['Image'][0];
      // Upload the image  to Cloudinary and obtain the URL
  
       imageUrl = await uploadToCloudinary(imageFile);
      
    }
    var CVFile;
    var CVUrl;
    if(req.files['CV']){
      // Upload the document  to Cloudinary and obtain the URLs
       CVFile = req.files['CV'][0];
       CVUrl = await uploadToCloudinary(CVFile)

    }

    // Create a new employee document with the image and document URLs
    const employee = new Employee({
      ...req.body,
      EmployeeImage: imageUrl,
      EmployeeCV: CVUrl
    });

    await employee.save().then(()=>{
      res.status(201).send({ status: true, message: "The employee is added!", data: employee, });
      console.log(new Date().toLocaleString() + ' ' + 'Loading Employees...');
      console.log(new Date().toLocaleString() + ' ' + 'ADD Employees Successfully!')

    }).catch((e)=>{
      console.log(e);
      if (e.code === 11000) {

        // todo it get the Object Keys (KeyPattern *Property of MongoDB for duplication error *) from error 
        const duplicateKeys = Object.keys(e.keyPattern);
  
        let errorMessage = "Employee with this ";
  
        // todo It checks both duplication of EmployeeCode and CNIC
        if (duplicateKeys.includes("EmployeeCode") && duplicateKeys.includes("CNIC")) {
  
          errorMessage += "EmployeeCode and CNIC already exist!";
  
          // todo It checks duplication of EmployeeCode
        } else if (duplicateKeys.includes("EmployeeCode")) {
  
          errorMessage += "EmployeeCode already exists!";

          // todo It checks duplication of EmployeeCode
        } else if (duplicateKeys.includes("Email")) {
  
          errorMessage += "Email Address already exists!";
  
          // todo It checks duplication of CNIC
        } else if (duplicateKeys.includes("CNIC")) {
  
          errorMessage += "CNIC already exists!";
  
        }
  
        res.status(400).send({ status: false, message: errorMessage });
  
      } else {
          
        res.send(e);
  
      }
      
    })


  } catch (e) {
    console.log(e);

    
        
      res.send(e);

    

  }

});


// * GET All Employee Data From MongooDB Database
router.get('/readEmployee', async (req, res) => {  
  
  try {

    const employee = await Employee.find()
    console.log(new Date().toLocaleString() + ' ' + 'Loading Employees...')

    const totalCollections =  await Employee.countDocuments()

    res.status(201).send({ status: true, message: "The following are employees!", totaldocuments: totalCollections , data: employee, });
    console.log(new Date().toLocaleString() + ' ' + 'READ Employees Successfully!')
  
  } catch (e) {
    
    res.status(500).json({ message: e.message });
  
  }

});

// * DELETE Employee Data By Id From MongooDB Database
router.delete('/deleteEmployee/:id', async (req, res) => {
  
  try {

      const employee = await Employee.findOneAndDelete({ _id: req.params.id })
      console.log(new Date().toLocaleString() + ' ' + 'Loading Employees...')

      if (!employee) {
          res.status(404).send({ status:false, message: "This Employee is Not found!"})
      }

      res.status(201).send({ status:true, message: "The following employee is Delete!", data: employee });
      console.log(new Date().toLocaleString() + ' ' + 'DELETE Employee Successfully!')
  
    } catch (e) {
      
      res.status(500).json({ message: e.message });
    
    }

})

// * DELETE All Employees Data From MongooDB Database
router.delete('/deleteAllEmployees', async (req, res) => {
  
  try {
      
      const employee = await Employee.deleteMany({})
      console.log(new Date().toLocaleString() + ' ' + 'Loading Employees...')

      if (employee.deletedCount === 0) {
          res.status(404).send({ status:false, message: "No Employees found to delete!"})
      }

      res.status(201).send({ status:true, message: "All employees have been deleted!", data: employee });
      console.log(new Date().toLocaleString() + ' ' + 'DELETE Employees Successfully!')
  
    } catch (e) {
      
      res.status(500).json({ message: e.message });
  
    }
    
})

module.exports = router















































// // Set up Multer storage for image upload
// const imageStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/images/'); // Directory where uploaded images will be stored
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = file.originalname.split('.').pop();
//     const filename = 'image-' + uniqueSuffix + '.' + ext; // Custom image naming scheme
//     cb(null, filename);
//   }
// });

// // Set up Multer storage for CV upload
// const cvStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/cv/'); // Directory where uploaded CV files will be stored
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = file.originalname.split('.').pop();
//     const filename = 'cv-' + uniqueSuffix + '.' + ext; // Custom CV naming scheme
//     cb(null, filename);
//   }
// });

// // Create Multer upload instances for image and CV uploads
// const uploadImage = multer({ storage: imageStorage }).single('image');
// const uploadCV = multer({ storage: cvStorage }).single('cv');

// // Route for uploading image
// router.post('/uploadImage', (req, res) => {
//   uploadImage(req, res, function (err) {
//     if (err) {
//       res.status(500).send({ status: false, message: 'Image upload failed' });
//     } else {
//       const imagePath = req.file ? req.file.path : null;
//       res.status(200).send({ status: true, message: 'Image uploaded successfully', imagePath });
//     }
//   });
// });

// // Route for uploading CV
// router.post('/uploadCV', (req, res) => {
//   uploadCV(req, res, function (err) {
//     if (err) {
//       res.status(500).send({ status: false, message: 'CV upload failed' });
//     } else {
//       const cvPath = req.file ? req.file.path : null;
//       res.status(200).send({ status: true, message: 'CV uploaded successfully', cvPath });
//     }
//   });
// });

// // Route for creating employee with image and CV paths
// router.post('/addEmployee', async (req, res) => {
//   try {
//     const employee = new Employee({
//       ...req.body,
//       image: req.body.imagePath || null, // Save the image path in the employee object
//       cv: req.body.cvPath || null // Save the CV path in the employee object
//     });

//     await employee.save();

//     console.log(new Date().toLocaleString() + ' ' + 'Loading Employees');
//     res.status(201).send({ status: true, message: "The employee is added!", data: employee });
//     console.log(new Date().toLocaleString() + ' ' + 'ADD Employees Successfully!');
//   } catch (e) {
//     if (e.code === 11000) {
//       let errorMessage = '';
//       if (e.errmsg.includes('Email') && e.errmsg.includes(req.body.Email)) {
//         errorMessage = 'Email already exists!';
//       } else if (e.errmsg.includes('CNIC') && e.errmsg.includes(req.body.CNIC.toString())) {
//         errorMessage = 'CNIC already exists!';
//       } else {
//         errorMessage = 'Duplicate key error';
//       }
//       res.status(400).send({ status: false, message: errorMessage });
//     } else {
//       res.status(400).send({ status: false, message: e.message });
//     }
//   }
// });




  // try {
  //   const employee = new Employee({
  //     ...req.body
  // });

  //   await employee.save();
  //   console.log(new Date().toLocaleString() + ' ' + 'Loading Employees');

  //   res.status(201).send({ status: true, message: "The employee is added!", data: employee });
  //   console.log(new Date().toLocaleString() + ' ' + 'ADD Employees Successfully!');
  // } 
















// // * POST Sending Emails
// router.post('/send-email',  (req, res) => {
  
//   // todo Retrieve email from request body
//   const { email } = req.body;
//   console.log(new Date().toLocaleString() + ' ' + 'Loading Email...')

//   // todo Create transporter object
//   let transporter = nodemailer.createTransport({
    
//     host: 'smtp.gmail.com',
//     port: 587,
//     service: 'gmail',
//     secure: false,
//     auth: { 
//       user: 'taskeenhaider509@gmail.com',
//       pass: 'euiolzcgtdzxkscu'
//     }

//   });

//   // todo Define email options
//   let mailOptions = {
    
//     from: 'taskeenhaider509@gmail.com',
//     to: email,
//     subject: 'Test Email',
//     text: 'Please Be Calm...I am testing the APIs'
  
//   };

//   // todo Send email using nodemailer
//   transporter.sendMail(mailOptions, function(error, info){
    
//     if (error) {
      
//       console.log(error);
//       res.status(500).send('Error: Could not send email');
    
//     } else {
      
//       console.log('Email sent: ' + info.response);
//       console.log(new Date().toLocaleString() + ' ' + 'Sending Email...')
      
//       res.status(200).send({ message: "Email sent successfully" });
//       console.log(new Date().toLocaleString() + ' ' + 'Email sent successfully!')
    
//     }
  
//   });

// });