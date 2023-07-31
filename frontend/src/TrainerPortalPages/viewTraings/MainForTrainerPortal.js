import style from './Main.module.css'
import Search from '../../assets/images/employees/Search.svg'
import avatar from '../../assets/images/employees/Avatar.png'
import ProfileUser from '../../components/profileUser/ProfileUser'
import Switch from '../../components/switch/Switch'
import SidebarForTrainerpor from '../../components/sidebar/SidebarForTrainerpor'
import Navbar from '../../components/navbar/Navbar'
import Offcanvas from '../../components/offcanvas/Offcanvas'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Btns from '../../components/btns/Btns'
import profile from '../../assets/images/addEmployee/prof.svg'
import Swal from 'sweetalert2'


function MainForTrainerPortal() {
    const [offcanvas, setOffcanvas] = useState(false);
    const [trainingToShow, setTrainingToShow] = useState(null);
    const [alert, setAlert] = useState(null);
    const alertManager = () => {
        setAlert(!alert)
    }
    const [remarksInput, setRemarksInput] = useState(false)
    const showRemarksInput = () => {
        setRemarksInput(!remarksInput)
    }

    const navigate = useNavigate();

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(8);

    const [trainingEmployees, setTrainingEmployees] = useState(null);

    const makeRequest =  () => {
        console.log(dataToSend);

         axios.patch("/update-training-status", dataToSend).then((res) => {
            console.log("request made !");

            console.log(res.status);
            setDataToSend(null);

            Swal.fire({
                title: 'Success',
                text: 'Submitted Successfully',
                icon: 'success',
                confirmButtonText: 'Go!',

            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/trainer/completedTasks");

                }
            })

        }).catch((error) => {
            console.log("An error occurred:", error);

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Try filling data again',
                confirmButtonText: 'OK.'

            })
            // Handle the error appropriately (e.g., display an error message)
        })

    }

    const [showBox, setShowBox] = useState(false);
    const [popUpData, setPopUpData] = useState(null);
    const { assignedTrainingId } = useParams();

    const [idForRemarks, setIdForRemarks] = useState(null);

    const [dataToSend, setDataToSend] = useState([]);

    var trainerFormData = [
        // {
        //     EmployeeId : "",
        //     trainingId :  assignedTrainingId,
        //     Marks : "",
        //     Remarks : "",
        //     IsPass : false,
        //     IsPresent : true
        // }
    ];

    function trainingIdIndex(array) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].Training === assignedTrainingId) {
                return i; // Return the index if property value is found
            }
        }
        return null; // Return null if property value is not found in any object
    }

    const nextPage = () => {
        setStartIndex(startIndex + 8);
        setEndIndex(endIndex + 8);

    }

    const backPage = () => {
        setStartIndex(startIndex - 8);
        setEndIndex(endIndex - 8);


    }


    const search = (event) => {
        if (event.target.value !== "") {
            console.log(event.target.value);

            const searchedList = trainingToShow?.Employee?.filter((obj) =>

                obj.EmployeeName.includes(event.target.value) || obj.EmployeeCode.includes(event.target.value)
            )
            console.log(searchedList);
            setTrainingEmployees(searchedList);
        } else {
            setTrainingEmployees(trainingToShow?.Employee)
        }
    }

    useEffect(() => {

        setTrainingEmployees(trainingToShow?.Employee?.slice(startIndex, endIndex))
    }, [startIndex, endIndex])

    const handleDataChange = (event, employeeId) => {
        if (dataToSend) {

            trainerFormData = dataToSend;
        }
        const existEmployeeIndex = trainerFormData.findIndex(obj => obj.EmployeeId === employeeId);

        const Name = event.target.name
        console.log(employeeId);
        console.log(trainerFormData);
        if (existEmployeeIndex !== -1) {
            // obj found


            if (Name === 'IsPass' || Name === 'IsPresent') {
                trainerFormData[existEmployeeIndex][Name] = event.target.checked;
            } else {
                trainerFormData[existEmployeeIndex][Name] = event.target.value;
            }

        } else {

            console.log("nor found");
            if (Name === "IsPass" || Name === "IsPresent") {
                trainerFormData.push({
                    EmployeeId: employeeId,
                    trainingId: assignedTrainingId,
                    IsPass: false,
                    IsPresent: false,
                    [Name]: event.target.checked
                })
            } else {

                trainerFormData.push({
                    EmployeeId: employeeId,
                    trainingId: assignedTrainingId,
                    IsPass: false,
                    IsPresent: false,
                    Remarks: '',
                    [Name]: event.target.value
                })
            }
        }

        setDataToSend(trainerFormData)
        console.log(dataToSend);
        console.log(trainerFormData);
    }




    useEffect(() => {
        axios.get("/readMonthlyPlan").then((response) => {
            const plannedTrainingsList = response.data.data;

            for (let index = 0; index < plannedTrainingsList.length; index++) {
                if (plannedTrainingsList[index]._id === assignedTrainingId) {
                    setTrainingToShow(plannedTrainingsList[index]);
                    setTrainingEmployees(plannedTrainingsList[index].Employee.slice(startIndex, endIndex))
                    break;
                }

            }
        })
    }, [])



    
    return (
        <>
            <form onSubmit={(event) => {
                event.preventDefault();

                alertManager();
                console.log(dataToSend);
                console.log(trainerFormData);
            }}>

                <div className={style.parent}>
                    <div className={style.sidebar}>
                        <Navbar func={() => {
                            setOffcanvas(!offcanvas)
                        }} />
                        <Offcanvas status={offcanvas} />
                        <SidebarForTrainerpor tab={trainingToShow?.TrainingResultStatus === "Conducted" ? (
                            "completedTasks"
                        ) : (
                            "pendingTasks"
                        )} />
                    </div>
                    <div className={style.subparent}>
                        <p className={style.redtxt}>Employees who are getting trained</p>
                        <ProfileUser path='/trainer/profile' />
                        <div className={style.searchbar}>
                            <div className={style.sec1}>
                                <img src={Search} alt="" />
                                <input onChange={search} type="text" placeholder='Search Training by name' />
                            </div>
                            <div >
                                {trainingToShow?.TrainingResultStatus !== "Conducted" && (

                                    <button type='submit' className={style.redtxtbtn}>Conduct Now</button>
                                )}
                            </div>
                        </div>
                        <div className={style.tableParent}>
                            <table className={style.table}>
                                <tr className={style.headers}>
                                    <td>Employee Code</td>
                                    <td>Name</td>
                                    <td>CNIC</td>
                                    <td>Phone Number</td>
                                    <td>Email</td>
                                    <td>Result Status</td>

                                    <td>Pass/Fail</td>
                                    <td>Attendence</td>
                                    <td>Obtained Marks</td>
                                    <td>Remarks</td>
                                    {trainingToShow?.TrainingResultStatus === "Conducted" && (

                                        <td>Generate Certificate</td>
                                    )}
                                </tr>
                                {
                                    trainingEmployees?.map((employee, i) => {
                                        return (
                                            <tr className={style.tablebody} key={i}>
                                                <td>
                                                    <p>{employee.EmployeeCode}</p>
                                                </td>
                                                <td className={style.name}><div style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    borderRadius: "50%",
                                                    overflow: "hidden",
                                                    backgroundImage: `url(${profile})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}>
                                                    <img style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover"
                                                    }} src={employee.EmployeeImage || profile}
                                                        onError={(e) => {
                                                            e.target.style.display = 'none'
                                                        }} alt="" />

                                                </div> {employee.EmployeeName}</td>
                                                <td>{employee.CNIC}</td>
                                                <td>{employee.PhoneNumber}</td>
                                                <td>{employee.Email}</td>
                                                <td>{employee.EmployeeData[trainingIdIndex(employee.EmployeeData)]?.EmployeeResultStatus || "Pending"}</td>

                                                <td>
                                                    <label className={style.switch}>
                                                        {trainingToShow?.TrainingResultStatus === "Conducted" ? (
                                                            <input type="checkbox" checked={employee.EmployeeData[trainingIdIndex(employee.EmployeeData)]?.IsPass} />
                                                        ) : (

                                                            <input name='IsPass' type="checkbox" onChange={(event) => {
                                                                handleDataChange(event, employee._id)
                                                            }} />
                                                        )}
                                                        <span className={`${style.slider} ${style.round}`} ></span>
                                                    </label >
                                                </td>
                                                <td>
                                                    <label className={style.switch}>
                                                        {trainingToShow?.TrainingResultStatus === "Conducted" ? (
                                                            <input type="checkbox" checked={employee.EmployeeData[trainingIdIndex(employee.EmployeeData)]?.IsPresent} />
                                                        ) : (

                                                            <input name='IsPresent' type="checkbox" onChange={(event) => {
                                                                handleDataChange(event, employee._id)
                                                            }} />
                                                        )}
                                                        <span className={`${style.slider} ${style.round}`} ></span>
                                                    </label >
                                                </td>
                                                <td>
                                                    {trainingToShow?.TrainingResultStatus === "Conducted" ? (
                                                        <>
                                                            {employee.EmployeeData[trainingIdIndex(employee.EmployeeData)]?.Marks}
                                                        </>

                                                    ) : (


                                                        <input placeholder='Give marks' name='Marks' style={{
                                                            width: "100px"
                                                        }} type='number' onChange={(event) => {
                                                            handleDataChange(event, employee._id);
                                                        }} required />

                                                    )}
                                                </td>
                                                <td>
                                                    {trainingToShow?.TrainingResultStatus === "Conducted" ? (
                                                        <p onClick={() => {
                                                            setPopUpData(employee.EmployeeData[trainingIdIndex(employee.EmployeeData)]?.Remarks || "No Remarks Given");
                                                            setShowBox(true)
                                                            console.log(employee)

                                                        }} className={style.btn}>View</p>
                                                    ) : (

                                                        <p onClick={() => {
                                                            setDataToSend(trainerFormData);
                                                            setIdForRemarks(employee._id);
                                                            showRemarksInput();

                                                        }} className={style.btn}>Add Remarks</p>
                                                    )}
                                                </td>
                                                {trainingToShow?.TrainingResultStatus === "Conducted" && (

                                                    <td>
                                                        <p className={style.btn}>Click Here</p>
                                                    </td>
                                                )}
                                            </tr>
                                        )

                                    })
                                }
                            </table>
                        </div>
                        <div className={style.Btns}>
                            {startIndex > 0 && (

                                <button onClick={backPage}>
                                    {'<< '}Back
                                </button>
                            )}
                            {trainingToShow?.Employee?.length > endIndex && (

                                <button onClick={nextPage}>
                                    next{'>> '}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                {
                    remarksInput ?
                        <div class={style.alertparent}>
                            <div class={style.alert}>

                                <textarea cols={55} rows={3} style={{
                                    padding: "5px",
                                    margin: "10px",
                                    border: "none",

                                }} placeholder='Remarks Here..' name='Remarks' type='text' onChange={(event) => {
                                    trainerFormData = dataToSend;
                                    handleDataChange(event, idForRemarks);


                                }} />
                                <div >

                                    <button onClick={() => {

                                        showRemarksInput();

                                        console.log(trainerFormData);
                                    }} className={style.btn2}>Add</button>

                                </div>
                            </div>
                        </div> : null
                }
                {
                    alert ?
                        <div class={style.alertparent}>
                            <div class={style.alert}>
                                <p class={style.msg}>Do you want to submit this information?</p>
                                <div className={style.alertbtns}>
                                    <button onClick={() => {
                                        alertManager();
                                        makeRequest()
                                        

                                    }
                                    } className={style.btn1}>Submit</button>


                                    <button onClick={alertManager} className={style.btn2}>Cencel</button>

                                </div>
                            </div>
                        </div> : null
                }
                {
                    showBox ?
                        <div class={style.alertparent}>
                            <div class={style.alert}>
                                <p class={style.msg}>{popUpData}</p>
                                <div className={style.alertbtns}>
                                    <button onClick={() => {
                                        setShowBox(false);

                                    }
                                    } className={style.btn1}>Close</button>




                                </div>
                            </div>
                        </div> : null
                }
            </form>
        </>
    )
}

export default MainForTrainerPortal
