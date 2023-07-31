const express = require('express')
const cors = require('cors');
const app = express();
const employeeRouter = require('./src/routers/HR/EmployeeRouter')
const monthlyPlanRouter = require('./src/routers/HR/MonthlyPlanRouter')
const yearlyPlanRouter = require('./src/routers/HR/YearlyPlanRouter')
const trainingRouter = require('./src/routers/HR/TrainingRouter')
const trainerRouter = require('./src/routers/HR/TrainerRouter')
const personalRecuisitionRouter = require('./src/routers/HR/PersonalRecuisitionRouter')
require('./src/db/connectdb')

const machineryRouter = require('./src/routers/Tech/machineryRouter')
const equipmentRouter = require('./src/routers/Tech/equipmentRouter')
const calibrationRouter = require('./src/routers/Tech/calibrationRecord')
const maintainceRouter = require('./src/routers/Tech/preventiveMaintainanceRouter')
const workrequestRouter = require('./src/routers/Tech/workRequest')


// * Connecting To Port
const port = process.env.PORT || 1126;
app.use(cors());

// ! Automatically parse incoming JSON to an object so we access it in our request handlers
app.use(express.json())
app.use(express.urlencoded({extended: false}))
  
// Set CORS headers manually
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE', 'PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
// * Using the employeeRouter file
app.use(employeeRouter);

// * Using the monthlyPlanRouter file
app.use(monthlyPlanRouter);

// * Using the yeralyPlanRouter file
app.use(yearlyPlanRouter);

// * Using the trainingRouter file
app.use(trainingRouter);

// * Using the trainerRouter file
app.use(trainerRouter);

// * Using the personalRecuisitionRouter file
app.use(personalRecuisitionRouter);

// * Using the machineryRouter file
app.use(machineryRouter);

app.use(equipmentRouter)

app.use(calibrationRouter)

app.use(maintainceRouter)

app.use(workrequestRouter)



// * listening To Port
app.listen(port, () => {
    console.log(`This is the ${port} active port! Wait for DB Connection...`);
});





























// app.get('', async (req, res) => {
//    res.send("Hello")
// })

// const myFunction = async () => {
//      const token = jwt.sign({_id:'abc123!'},'thisisthesecret', {expiresIn: '7 days'})
//     console.log(token);
    
//     const data =jwt.verify(token,'thisisthesecret')
//     console.log(data);
// }
// myFunction();