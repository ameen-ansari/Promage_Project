import SideBar from '../../components/sidebar/SideBar'
import style from './TrainedEmployees.module.css'
import Search from '../../assets/images/employees/Search.svg'
import avatar from '../../assets/images/employees/Avatar.png'
import ProfileUser from '../../components/profileUser/ProfileUser'
import Switch from '../../components/switch/Switch'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import Navbar from '../../components/navbar/Navbar'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import profile from '../../assets/images/addEmployee/prof.svg'
import BackBtn from '../../components/btns/BackBtn'


function TrainedEmployees() {
    const [alert, setalert] = useState(false)
    const alertManager = () => {
        setalert(!alert)
    }
    const [popUpData, setPopUpData] = useState(null);
    const [offcanvas, setOffcanvas] = useState(false)
    const [trainingToShow, setTrainingToShow] = useState(null);
    const [employeeDataToShow, setEmployeeDataToShow] = useState(null);
    const { assignedTrainingID } = useParams();

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(8);

    const search = (event) => {
        if (event.target.value !== "") {
            console.log(event.target.value);

            const searchedList = trainingToShow?.Employee?.filter((obj) =>

                obj.EmployeeName.includes(event.target.value) || obj.EmployeeCode.includes(event.target.value)
            )
            console.log(searchedList);
            setTrainedEmployees(searchedList);
        } else {
            setTrainedEmployees(trainingToShow?.Employee)
        }
    }

    const [trainedEmployees, setTrainedEmployees] = useState(null);
    useEffect(() => {
        axios.get("/readMonthlyPlan").then((response) => {
            const plannedTrainingsList = response.data.data;
            for (let index = 0; index < plannedTrainingsList.length; index++) {
                if (plannedTrainingsList[index]._id === assignedTrainingID) {
                    setTrainingToShow(plannedTrainingsList[index]);
                    setTrainedEmployees(plannedTrainingsList[index].Employee.slice(startIndex, endIndex))
                    break;
                }

            }
        })
    }, [])
    console.log(trainingToShow);

    const nextPage = () => {
        setStartIndex(startIndex + 8);
        setEndIndex(endIndex + 8);

    }

    const backPage = () => {
        setStartIndex(startIndex - 8);
        setEndIndex(endIndex - 8);


    }
    useEffect(() => {

        setTrainedEmployees(trainingToShow?.Employee.slice(startIndex, endIndex))
    }, [startIndex, endIndex])

    function findObjectIndexByPropertyValue(array) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].Training === assignedTrainingID) {
                return i; // Return the index if property value is found
            }
        }
        return null; // Return null if property value is not found in any object
    }

    return (
        <>
            <div className={style.parent}>
                <div className={style.sidebar}>
                    <Navbar func={() => {
                        setOffcanvas(!offcanvas)
                    }} />
                    <SideBar tab={"trainingRecords"} />
                    <HROffcanvas status={offcanvas} />
                </div>
                <div className={style.subparent}>
                    <p className={style.redtxt}>Employees who are getting trained</p>
                    <ProfileUser path='/hr/profile' />
                    <div className={style.searchbar}>
                        <div className={style.sec1}>
                            <img src={Search} alt="" />
                            <input onChange={search} type="text" placeholder='Search Employee by name or id' />
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
                            </tr>
                            {
                                trainedEmployees?.map((employee, i) => {
                                    console.log(employee)
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

                                            {(employee.EmployeeData.length !== 0 && findObjectIndexByPropertyValue(employee.EmployeeData) !== null) ? (

                                                <>

                                                    <td>{employee.EmployeeData[findObjectIndexByPropertyValue(employee.EmployeeData)].EmployeeResultStatus}</td>
                                                    <td><label className={style.switch}>
                                                        <input type="checkbox" checked={employee.EmployeeData[findObjectIndexByPropertyValue(employee.EmployeeData)].IsPass} />

                                                        <span className={`${style.slider} ${style.round}`} ></span>
                                                    </label ></td>

                                                    <td>
                                                        <label className={style.switch}>
                                                            <input type="checkbox" checked={employee.EmployeeData[findObjectIndexByPropertyValue(employee.EmployeeData)].IsPresent} />
                                                            <span className={`${style.slider} ${style.round}`} ></span>
                                                        </label >
                                                    </td>
                                                    <td>{employee.EmployeeData[findObjectIndexByPropertyValue(employee.EmployeeData)].Marks}</td>
                                                    <td>
                                                        <p onClick={() => {
                                                            setPopUpData(employee.EmployeeData[findObjectIndexByPropertyValue(employee.EmployeeData)].Remarks || "No Remarks are given");
                                                            alertManager();
                                                            setalert(true);
                                                        }} className={style.click}>Click Here</p>
                                                    </td>

                                                </>
                                            ) : (
                                                <>
                                                    <td>Pending</td>
                                                    <td><label className={style.switch}>
                                                        <input type="checkbox" checked={false} />

                                                        <span className={`${style.slider} ${style.round}`} ></span>
                                                    </label ></td>

                                                    <td>
                                                        <label className={style.switch}>
                                                            <input type="checkbox" checked={false} />
                                                            <span className={`${style.slider} ${style.round}`} ></span>
                                                        </label >
                                                    </td>
                                                    <td>Not Given</td>
                                                    <td>
                                                        <p onClick={() => {
                                                            setPopUpData("No Remarks Given");
                                                            alertManager();
                                                            setalert(true);
                                                        }} className={style.click}>Click Here</p>
                                                    </td>
                                                </>
                                            )


                                            }
                                        </tr>
                                    )

                                })
                            }
                        </table>
                    </div>
                    {/* <div className={style.Btns}>
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
                    </div> */}
                    <BackBtn />
                </div>
            </div>
            {
                alert ?
                    <div class={style.alertparent}>
                        <div class={style.alert}>
                            <p class={style.msg}>{popUpData}</p>
                            <div className={style.alertbtns}>

                                <button onClick={alertManager} className={style.btn2}>OK.</button>

                            </div>
                        </div>
                    </div> : null
            }

        </>
    )
}

export default TrainedEmployees
