const express = require('express');
const YearlyPlan = require('../../models/HR/YearlyPlanModel')
const router = new express.Router();

router.post('/addYearlyPlan', async (req, res) => {
  console.log(req.body);
  try {
    const yearlyPlan = await YearlyPlan.findOne({
      Year: req.body.Year
    });

    if (yearlyPlan) {
      for (const month of req.body.Month) {
        const existingMonthIndex = yearlyPlan.Month.findIndex(
          (existingMonth) => existingMonth.MonthName === month.MonthName
        );

        if (existingMonthIndex === -1) {
          yearlyPlan.Month.push(month);
        } else {
          yearlyPlan.Month[existingMonthIndex] = month;
        }
      }

      await yearlyPlan.save();
      res.status(200).send({ status: true, message: "The YearlyPlan is updated!", data: yearlyPlan });
      console.log(new Date().toLocaleString() + ' ' + 'UPDATE YearlyPlan Successfully!');

    } else {
      const newYearlyPlan = new YearlyPlan({
        Year: req.body.Year,
        Month: req.body.Month
      });
      await newYearlyPlan.save();
      res.status(201).send({ status: true, message: "The YearlyPlan is added!", data: newYearlyPlan });
      console.log(new Date().toLocaleString() + ' ' + 'ADD YearlyPlan Successfully!');
    }

  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// * GET All YearlyPlan Data into MongooDB Database
router.get('/readYearlyPlan', async (req, res) => {

  try {

    const yearlyPlan = await YearlyPlan.find().populate({
      path: 'Month.Trainings.Training'
    });
    console.log(new Date().toLocaleString() + ' ' + 'Loading YearlyPlan...')

    const totalCollections = await YearlyPlan.countDocuments()

    res.status(201).send({ status: true, message: "The following are yearlyPlan!", totaldocuments: totalCollections, data: yearlyPlan, });
    console.log(new Date().toLocaleString() + ' ' + 'READ YearlyPlan Successfully!')

  } catch (e) {

    res.status(500).json({ message: e.message });

  }

});

// * DELETE YearlyPlan Data By Id From MongooDB Database
router.delete('/deleteYearlyPlan/:id', async (req, res) => {
  
  try {
      const yearlyPlan = await YearlyPlan.findOneAndDelete({ _id: req.params.id })
      console.log(new Date().toLocaleString() + ' ' + 'Loading YearlyPlans...')

      if (!yearlyPlan) {
          res.status(404).send({ status:false, message: "This YearlyPlan is Not found!"})
      }

      res.status(201).send({ status:true, message: "The following yearlyPlan is Delete!", data: yearlyPlan });
      console.log(new Date().toLocaleString() + ' ' + 'DELETE YearlyPlan Successfully!')
  
    } catch (e) {
      
      res.status(500).json({ message: e.message });
    
    }

})

// * DELETE All YearlyPlan Data From MongooDB Database
router.delete('/deleteAllYearlyPlans', async (req, res) => {
  
  try {
      const yearlyPlan = await YearlyPlan.deleteMany({})
      console.log(new Date().toLocaleString() + ' ' + 'Loading YearlyPlans...')

      if (yearlyPlan.deletedCount === 0) {
          res.status(404).send({ status:false, message: "No YearlyPlans found to delete!"})
      }

      res.status(201).send({ status:true, message: "All yearlyPlans have been deleted!", data: yearlyPlan });
      console.log(new Date().toLocaleString() + ' ' + 'DELETE YearlyPlans Successfully!')
  
    } catch (e) {
      
      res.status(500).json({ message: e.message });
  
    }
    
})

module.exports = router











































// // * GET YearlyPlan Data By Authorized User Specifically Data of that User From MongooDB Database
// router.get('/readYearlyPlan', authMiddleware, async (req, res) => {

//   try {

//     const yearlyPlan = await YearlyPlan.find({ CreatedBy: req.user._id })
//     console.log(new Date().toLocaleString() + ' ' + 'Loading Auth YearlyPlan...')

//     const totalCollections = await Section.countDocuments()

//     res.status(200).send({ status: true, message: "The following are YearlyPlan!", totaldocuments: totalCollections, data: yearlyPlan, });
//     console.log(new Date().toLocaleString() + ' ' + 'READ Auth YearlyPlan Successfully!')

//   } catch (e) {

//     res.status(500).json({ message: e.message });

//   }

// });