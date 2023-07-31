const express = require('express');
const PersonalRecuisition = require('../../models/HR/PersonalRecuisitionModel')
const router = new express.Router();

// * Post PersonalRecuisition Data Into MongooDB Database
router.post('/addPersonalRecuisition', async (req, res) => {


  console.log("person add karto yr..");
  console.log(req.body);
  // try {

    const personalRecuisition = new PersonalRecuisition({
      ...req.body
    });

    await personalRecuisition.save().then(console.log("saved")).catch((error)=>{
      console.log(error);
    })
    console.log(new Date().toLocaleString() + ' ' + 'Loading Required Person...')

    res.status(201).send({ status: true, message: "The Required Person is added!", data: personalRecuisition, });
    console.log(new Date().toLocaleString() + ' ' + 'ADD Required Person Successfully!')

  // } catch (e) {

  //   res.status(400).json({ message: e.message })

  // }

});

// * GET All Personal Recuisition Data From MongooDB Database
router.get('/readPersonalRecuisition', async (req, res) => {

  try {

    const personalRecuisition = await PersonalRecuisition.find()
    // console.log(new Date().toLocaleString() + ' ' + 'Loading Required Person...')

    const totalCollections = await PersonalRecuisition.countDocuments()

    res.status(201).send({ status: true, message: "The following are Required Person!", totaldocuments: totalCollections, data: personalRecuisition, });
    // console.log(new Date().toLocaleString() + ' ' + 'READ Required Person Successfully!')

  } catch (e) {

    res.status(500).json({ message: e.message });

  }

});

router.patch('/updatePersonStatus', async (req, res)=>{

  try {
    
    
    const reqPerson =  await PersonalRecuisition.findById(req.body.personId)
    
    if(req.body.status === "Approved"){
      reqPerson.Status = "Approved"
    } else if (req.body.status === "Disapproved"){
    reqPerson.Status = "Disapproved",
    reqPerson.Reason = req.body.Reason
  }


  await reqPerson.save().then(console.log("person Updated"))
  res.status(200).send("Success")

  
} catch (error) {
  console.log(error);
  res.send(error);
}
  
  
})

// * DELETE All Personal Recuision Data From MongooDB Database
router.delete('/deleteAllPersonalRecuision', async (req, res) => {
  
  try {
      
      const personalRecuisition = await PersonalRecuisition.deleteMany({})
      console.log(new Date().toLocaleString() + ' ' + 'Loading PersonalRecuisitions...')

      if (personalRecuisition.deletedCount === 0) {
          res.status(404).send({ status:false, message: "No PersonalRecuisitions found to delete!"})
      }

      res.status(201).send({ status:true, message: "All personalRecuisitions have been deleted!", data: personalRecuisition });
      console.log(new Date().toLocaleString() + ' ' + 'DELETE PersonalRecuisitions Successfully!')
  
    } catch (e) {
      
      res.status(500).json({ message: e.message });
  
    }
    
})

module.exports = router








































// const authMiddleware = require('../auth/authMiddleware');

// ! Post PersonalRecuisition Data Into MongooDB Database
// router.post('/addRequiredPerson', authMiddleware, async (req, res) => {

//   try {

//     const personalRecuisition = new PersonalRecuisition({

//       ...req.body

//     });

//     // todo it push the user Id to CreatedBy if that Id is not already pushed
//     if (!personalRecuisition.CreatedBy.includes(req.user._id)) {

//       personalRecuisition.CreatedBy.push(req.user._id);

//     }

//     await personalRecuisition.save()
//     console.log(new Date().toLocaleString() + ' ' + 'Loading Required Person...')

//     res.status(201).send({ status: true, message: "The Required Person is added!", data: personalRecuisition, });
//     console.log(new Date().toLocaleString() + ' ' + 'ADD Required Person Successfully!')

//   } catch (e) {

//     res.status(400).json({ message: e.message })

//   }

// });




// // * GET Personal Recuisition Data By Authorized User Specifically Data of that User From MongooDB Database
// router.get('/readRequiredPerson', authMiddleware, async (req, res) => {

//   try {

//     const personalRecuisition = await PersonalRecuisition.find({ CreatedBy: req.user._id })
//     console.log(new Date().toLocaleString() + ' ' + 'Loading Auth Required Person...')

//     const totalCollections = await personalRecuisition.length;

//     res.status(200).send({ status: true, message: "The following are Required Person!", totaldocuments: totalCollections, data: personalRecuisition, });
//     console.log(new Date().toLocaleString() + ' ' + 'READ Auth Required Person Successfully!')

//   } catch (e) {

//     res.status(500).json({ message: e.message });

//   }

// });




// ! GET Personal Recuisition Data By Authorized User From MongooDB Database
// router.get('/readRequiredPerson', authMiddleware, async (req, res) => {

//   try {

//     const personalRecuisition = await PersonalRecuisition.find()
//     console.log(new Date().toLocaleString() + ' ' + 'Loading Auth Required Person...')

//     const totalCollections = await personalRecuisition.length;

//     res.status(200).send({ status: true, message: "The following are Required Person!", totaldocuments: totalCollections, data: personalRecuisition, });
//     console.log(new Date().toLocaleString() + ' ' + 'READ Auth Required Person Successfully!')

//   } catch (e) {

//     res.status(500).json({ message: e.message });

//   }

// });
