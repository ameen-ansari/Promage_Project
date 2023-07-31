const express = require('express');
const MonthlyPlan = require('../../models/HR/MonthlyPlanModel');
const Employee = require('../../models/HR/EmployeeModel');
const Trainer = require('../../models/HR/TrainerModel');
const Training = require('../../models/HR/TrainingModel');
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

const uploadToCloudinary = async (files) => {

  linksArr = [];

  for (let index = 0; index < files.length; index++) {
    const file = files[index];

    const tempFilePath = `./${file.originalname}`;
    fs.writeFileSync(tempFilePath, file.buffer); // write the buffer to a temporary file
    const result = await cloudinary.uploader.upload(tempFilePath);


    fs.unlinkSync(tempFilePath); // delete the temporary file
    linksArr.push(result.secure_url);
  }

  return linksArr

}

// * POST Monthly Plan Data Into MongoDB Database
router.post('/addMonthlyPlan', async (req, res) => {
  console.log("request ai");
  console.log(req.body);

  try {


    // todo Check if Trainer and Training exist
    const trainerExist = await Trainer.findById(req.body.Trainer._id);
    const trainingExist = await Training.findById(req.body.Training._id);

    if (!trainerExist || !trainingExist) {
      const errorMessage = [];
      if (!trainerExist) {
        errorMessage.push("Trainer not found");
      }
      if (!trainingExist) {
        errorMessage.push("Training not found");
      }

      return res.status(404).send({
        status: false,
        message: errorMessage.join(" and "),
      });
    }

    const monthlyPlan = new MonthlyPlan({ ...req.body });
    await monthlyPlan.save();

    console.log(new Date().toLocaleString() + ' ' + 'Loading MonthlyPlan...');
    res.status(201).send({
      status: true,
      message: "The monthlyPlan is added!",
      data: monthlyPlan,
    });
    console.log(new Date().toLocaleString() + ' ' + 'ADD MonthlyPlan Successfully!');
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// * GET All MonthlyPlan Data From MongooDB Database
router.get('/readMonthlyPlan', async (req, res) => {
  try {
    const monthlyPlan = await MonthlyPlan.find().populate("Training Trainer Employee");

    console.log(new Date().toLocaleString() + ' ' + 'Loading MonthlyPlans...')

    const totalCollections = await MonthlyPlan.countDocuments()

    res.status(201).send({ status: true, message: "The following are monthlyplans!", totaldocuments: totalCollections, data: monthlyPlan, });
    console.log(new Date().toLocaleString() + ' ' + 'READ MonthlyPlans Successfully!')

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// * PATCH Assign Employee ID to MonthlyPlan in MongoDB Database
router.patch('/assignEmployee', async (req, res) => {
  const employeeIds = req.body.employeeIds;
  const monthlyId = req.body.monthlyId;
  console.log(req.body);

  try {
    console.log(monthlyId);
    const monthlyPlan = await MonthlyPlan.findOne({ _id: monthlyId });
    console.log(monthlyPlan);

    if (!monthlyPlan) {
      console.log(new Date().toLocaleString() + ' ' + `${monthlyId} MonthlyPlan not found!`);
      return res.status(404).send({ status: false, message: `${monthlyId} MonthlyPlan not found!` });
    }

    // todo Check if employeeIds is defined and is an array
    if (!Array.isArray(employeeIds)) {
      console.log(new Date().toLocaleString() + ' ' + 'Employee IDs should be provided as an array!');
      return res.status(400).send({ status: false, message: 'Employee IDs should be provided as an array!' });
    }

    const employees = await Employee.find({ _id: { $in: employeeIds } });

    const foundEmployeeIds = employees.map((employee) => employee._id.toString());
    const notFoundEmployeeIds = employeeIds.filter((id) => !foundEmployeeIds.includes(id));

    let message = "";

    if (notFoundEmployeeIds.length > 0) {
      console.log(new Date().toLocaleString() + ' ' + 'Employee ID not found:', notFoundEmployeeIds);
      message += `Employee ID not found: ${notFoundEmployeeIds.join(", ")}. `;
    }

    const alreadyAssignedEmployees = monthlyPlan.Employee.filter((employee) => foundEmployeeIds.includes(employee.toString()));

    if (alreadyAssignedEmployees.length > 0) {
      console.log(new Date().toLocaleString() + ' ' + 'Already assigned employees:', alreadyAssignedEmployees);
      message += `Already assigned employees: ${alreadyAssignedEmployees.join(", ")}. `;
    }

    const newEmployeeIds = employeeIds.filter((id) => !monthlyPlan.Employee.includes(id));

    if (newEmployeeIds.length > 0) {
      // Update Employee schema for newly assigned employees
      await Employee.updateMany(
        { _id: { $in: newEmployeeIds } },
        { $set: { Assigned: true } }
      );

      // Assign employees to MonthlyPlan
      monthlyPlan.Employee.push(...newEmployeeIds);
      monthlyPlan.Assigned = true;

      await monthlyPlan.save();

      console.log(new Date().toLocaleString() + ' ' + 'Employees assigned successfully:', newEmployeeIds);
      message += `Employees assigned successfully: ${newEmployeeIds.join(", ")}. `;
    }

    if (message === "") {
      message = "No new employees to assign.";
    }

    res.status(200).send({ status: true, message: "success" });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

// * PATCH Update the Status when Training is Conducted in MongoDB Database
router.patch('/update-training-status', async (req, res) => {

  try {


    const dataArr = req.body;
    console.log(dataArr);



    for (let index = 0; index < dataArr.length; index++) {
      const employeeId = dataArr[index].EmployeeId;
      const monthlyId = dataArr[index].trainingId;
      console.log(dataArr[index]);

      // Check if the Employee ID is found
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        throw new Error('Employee ID not found');
      } else {
        // employee found..
        // console.log(employee);
        // Check if the MonthlyPlan ID is found



        const monthlyPlan = await MonthlyPlan.findById(monthlyId);
        if (!monthlyPlan) {
          throw new Error('MonthlyPlan ID not found');
        } else {
          console.log("plan found");
        }

        const employeeData = employee.EmployeeData;

        function hasId(array, id) {
          for (const obj of array) {
            if (obj.Training.toString() === id.toString()) {
              return true;
            }
          }
          return false;
        }

        const existObj = hasId(employeeData, dataArr[index].trainingId)

        console.log(existObj);




        console.log(req.body[index].trainingId);
        if (existObj) {


          for (let dataIndex = 0; dataIndex < employeeData.length; dataIndex++) {
            console.log(employeeData[dataIndex].Training.toString());
            if (employeeData[dataIndex].Training.toString() === dataArr[index].trainingId) {
              employeeData[dataIndex].Marks = dataArr[index].Marks;
              employeeData[dataIndex].IsPass = dataArr[index].IsPass;
              employeeData[dataIndex].IsPresent = dataArr[index].IsPresent;
              employeeData[dataIndex].Remarks = dataArr[index].Remarks;
              employeeData[dataIndex].EmployeeResultStatus = "Active"


              if (dataArr[index].IsPass === true) {
                employee.TrainingStatus = "Trained"
              }




              if (monthlyPlan) {
                monthlyPlan.TrainingResultStatus = "Conducted";
                monthlyPlan.ActualDate = new Date();
              }
            }
          }
        } else {
          employeeData.push({
            Training: dataArr[index].trainingId,
            EmployeeResultStatus: "Active",
            Marks: dataArr[index].Marks,
            Remarks: dataArr[index].Remarks,
            IsPresent: dataArr[index].IsPresent,
            IsPass: dataArr[index].IsPass

          });

          if (monthlyPlan) {
            monthlyPlan.TrainingResultStatus = "Conducted";
            monthlyPlan.ActualDate = new Date();
          }
          if (dataArr[index].IsPass === true) {
            employee.TrainingStatus = "Trained"
          }
        }



        await monthlyPlan.save()
        await employee.save().then(() => {

        })
      }
    }
    
    res.status(200).send({ status: true, message: "Success" });
  } catch (error) {
    if (error) {
      
      res.status(400).send({ message: error.message });
    } else {
      
    }
  }
})





//  Update the images in mothplan 
router.patch('/upload-images', upload.array("Images"), async (req, res) => {


  try {



    console.log(req.body);
    console.log(req.files);

    const monthlyPlan = await MonthlyPlan.findById(req.body.planId);

    if (monthlyPlan) {


      const imagesLinksArr = await uploadToCloudinary(req.files);
      console.log(imagesLinksArr);

      monthlyPlan.Images = imagesLinksArr;

      await monthlyPlan.save().then(() => {
        res.status(200).send({ status: true, message: "Success" });
      })

    } else {
      throw new Error('MonthlyPlan ID not found');
    }


  } catch (error) {
    if (error) {

      res.status(400).send({ message: error.message });
    }
  }
})






// * DELETE MonthlyPlan Data By Id From MongooDB Database
router.delete('/deleteMonthlyPlan/:id', async (req, res) => {

  try {

    const monthlyPlan = await MonthlyPlan.findOneAndDelete({ _id: req.params.id })
    console.log(new Date().toLocaleString() + ' ' + 'Loading MonthlyPlans...')

    if (!monthlyPlan) {
      res.status(404).send({ status: false, message: "This MonthlyPlan is Not found!" })
    }

    res.status(201).send({ status: true, message: "The following monthlyPlan is Delete!", data: monthlyPlan });
    console.log(new Date().toLocaleString() + ' ' + 'DELETE MonthlyPlan Successfully!')

  } catch (e) {

    res.status(500).json({ message: e.message });

  }

})

router.delete('/deleteAllMonthlyPlans', async (req, res) => {
  try {
    const monthlyPlan = await MonthlyPlan.deleteMany({});
    console.log(new Date().toLocaleString() + ' ' + 'Loading MonthlyPlans...');

    if (monthlyPlan.deletedCount === 0) {
      res.status(404).send({ status: false, message: "No MonthlyPlans found to delete!" });
    }

    res.status(201).send({ status: true, message: "All monthlyPlans have been deleted!", data: monthlyPlan });
    console.log(new Date().toLocaleString() + ' ' + 'DELETE MonthlyPlans Successfully!');
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router