import style from './AssignTrainings.module.css'
import SideBar from '../../components/sidebar/SideBar'
import search from '../../assets/images/employees/Search.svg'
import add from '../../assets/images/employees/Application Add.svg'
import avatar from '../../assets/images/employees/Avatar.png'
import ProfileUser from '../../components/profileUser/ProfileUser'
import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import profile from '../../assets/images/addEmployee/prof.svg'
import Swal from 'sweetalert2'


function AssignTrainings() {
    const [offcanvas, setOffcanvas] = useState(false)
    const [employeesToShow, setEmployeesToShow] = useState(null);
    const { plannedTrainingID } = useParams();
    const [plannedTraining, setPlannedTraining] = useState(null);
    const [reqIds, setReqIds] = useState({
        monthlyId: "",
        employeeIds: []
    })
    const [alert, setalert] = useState(false);
    const alertManager = () => {
        setalert(!alert)
    }


    useEffect(() => {



        axios.get("/readMonthlyPlan").then((response) => {
            const plannedTrainingsList = response.data.data;

            for (let index = 0; index < plannedTrainingsList.length; index++) {

                if (plannedTrainingsList[index]._id === plannedTrainingID) {

                    setPlannedTraining(plannedTrainingsList[index]);
                    break;
                }
            }


        })
    }, [])


    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(8);

    const [allDataArr, setAllDataArr] = useState(null);

    useEffect(() => {
        if (plannedTraining !== null) {


            axios.get("/readEmployee").then((response) => {
                const allEmployees = response.data.data;
                let depEmployees = [];
                for (let index = 0; index < allEmployees.length; index++) {
                    if (allEmployees[index].Department === plannedTraining.Department) {
                        depEmployees.push(allEmployees[index]);
                    }

                }
                setAllDataArr(depEmployees);

                setEmployeesToShow(depEmployees?.slice(startIndex, endIndex));
            });

        }
        setReqIds({ ...reqIds, monthlyId: plannedTrainingID })
        console.log(reqIds);

    }, [plannedTraining])
    const [dataToSend, setDataToSend] = useState(null);


    const nextPage = () => {
        setStartIndex(startIndex + 8);
        setEndIndex(endIndex + 8);

    }

    const backPage = () => {
        setStartIndex(startIndex - 8);
        setEndIndex(endIndex - 8);


    }

    useEffect(() => {

        setEmployeesToShow(allDataArr?.slice(startIndex, endIndex))
    }, [startIndex, endIndex])




    const updateReqIds = (employeeID) => {
        const addedEmployeeIds = reqIds.employeeIds;

        if (addedEmployeeIds.includes(employeeID)) {
            const indexofId = addedEmployeeIds.indexOf(employeeID)
            addedEmployeeIds.splice(indexofId, 1);
        } else {
            addedEmployeeIds.push(employeeID)
        }
        setReqIds({ ...reqIds, employeeIds: addedEmployeeIds })
        console.log(reqIds);

    }

    const navigate = useNavigate();

    const makeRequest = () => {
        if (dataToSend) {

            axios.patch("/assignEmployee", dataToSend).then(() => {

                console.log("request made ..");
                setDataToSend(null);

                Swal.fire({
                    title: 'Success',
                    text: 'Submitted Successfully',
                    icon: 'success',
                    confirmButtonText: 'Go!',

                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/hr/trainings")

                    }
                })
            }).catch((error) => {

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Try filling data again',
                    confirmButtonText: 'OK.'

                })
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Try filling data again',
                confirmButtonText: 'OK.'
            })
        }
    }


    return (
        <>
            <div className={style.parent}>
                <div className={style.sidebar}>
                    <Navbar func={() => {
                        setOffcanvas(!offcanvas)
                    }} />
                    <SideBar tab={"plannedTrainings"} />
                    <HROffcanvas status={offcanvas} />
                </div>
                <ProfileUser path='/hr/profile' />
                <div className={style.subparent}>
                    <div className={style.searchbar}>
                        <div className={style.sec1}>
                            <img src={search} alt="" />
                            <input type="text" placeholder='Search Training by name' />
                        </div>
                        {reqIds.employeeIds?.length !== 0 && (

                            <div onClick={() => {
                                setDataToSend(reqIds);
                                alertManager();
                            }} className={style.sec2}>
                                <p>Assign Training</p>
                            </div>
                        )}
                    </div>
                    <div className={style.tableParent2}>
                        <table className={style.table}>
                            <tr className={style.headers}>
                                <td></td>
                                <td>Employee Code</td>
                                <td>Name</td>
                                <td>CNIC</td>
                                <td>Phone Number</td>
                                <td>Email</td>
                            </tr>
                            {
                                employeesToShow?.map((employee, i) => {
                                    return (
                                        <tr className={style.tablebody} key={i}>
                                            <td><input type="checkbox" onChange={() => {
                                                updateReqIds(employee._id)
                                            }} /></td>
                                            <td className={style.textStyle1}>
                                                <p>{employee.EmployeeCode}</p>
                                            </td>
                                            <td className={style.textStyle2}>

                                                <div style={{
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
                                                    }} src={employee.EmployeeImage || profile} onError={(e) => {
                                                        e.target.style.display = 'none'
                                                    }} alt="" />

                                                </div>

                                                {employee.EmployeeName}</td>
                                            <td className={style.textStyle2}>{employee.CNIC}</td>
                                            <td className={style.textStyle2}>{employee.PhoneNumber}</td>
                                            <td className={style.textStyle3}>{employee.Email}</td>
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
                        {allDataArr?.length > endIndex && (

                            <button onClick={nextPage}>
                                next{'>> '}
                            </button>
                        )}
                    </div>
                </div>
            </div >
            {
                alert ?
                    <div class={style.alertparent}>
                        <div class={style.alert}>
                            <p class={style.msg}>Do you want to submit this information?</p>
                            <div className={style.alertbtns}>
                                <button onClick={() => {
                                    alertManager();
                                    makeRequest();

                                }
                                } className={style.btn1}>Submit</button>


                                <button onClick={alertManager} className={style.btn2}>Cencel</button>

                            </div>
                        </div>
                    </div> : null
            }

        </>
    )
}

export default AssignTrainings
