const User = require("../models/UserModel")

// * This is middleware without using Tokenization
const authMiddleware = async (req, res, next) => {

  try {
    
    let userId;

    if (req.params.id) {

      userId = req.params.id;

    } else if (req.body.CreatedBy) {

      userId = req.body.CreatedBy;

    } else {

      return res.status(400).send({ message: "User ID not provided" });

    }

    const user = await User.findById(userId);

    if (!user) {

      return res.status(401).send({ message: "Unauthorized" });

    }

    req.user = user;
    next();

  } catch (e) {

    res.status(401).send({ message: "Unauthorized" });

  }

};

module.exports = authMiddleware;



// const User = require("../models/UserModel")

// const authMiddleware = async (req, res, next) => {
//   try {
//     let userId;

//     if (req.params.id) {
//       userId = req.params.id;
//     } else if (req.body.CreatedBy) {
//       userId = req.body.CreatedBy;
//     } else {
//       return res.status(400).send({ message: "User ID not provided" });
//     }

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(401).send({ message: "Unauthorized" });
//     }

//     // Check if the logged-in user is an admin
//     if (req.user.IsAdmin) {
//       // If the logged-in user is an admin, set the user object on the request
//       req.user = user;
//       next();
//     } else {
//       // If the logged-in user is not an admin, check if they are accessing their own data
//       if (user._id.toString() === req.user._id.toString()) {
//         // If the logged-in user is accessing their own data, set the user object on the request
//         req.user = user;
//         next();
//       } else {
//         // If the logged-in user is not an admin and is not accessing their own data, return unauthorized
//         return res.status(401).send({ message: "Unauthorized" });
//       }
//     }

//   } catch (e) {
//     res.status(401).send({ message: "Unauthorized" });
//   }
// };

// module.exports = authMiddleware;


// const User = require("../models/UserModel");

// const authMiddleware = async (req, res, next) => {
//   try {
//     let userId;

//     if (req.params.id) {
//       userId = req.params.id;
//     } else if (req.body.CreatedBy) {
//       userId = req.body.CreatedBy;
//     } else {
//       return res.status(400).send({ message: "User ID not provided" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(401).send({ message: "Unauthorized" });
//     }

//     if (user.IsAdmin) {
//       // If user is admin, allow access to all employee data
//       req.user = user;
//       next();
//     } else {
//       // If user is not admin, only allow access to their own employee data
//       const employees = await Employee.find({
//         CreatedBy: user._id,
//       }).populate("Departments Trainings Trainers");

//       req.user = user;
//       req.employees = employees;
//       next();
//     }
//   } catch (e) {
//     res.status(401).send({ message: "Unauthorized" });
//   }
// };

module.exports = authMiddleware;
