import SideBar from '../../components/sidebar/SideBar'
import style from './Employees.module.css'
import Search from '../../assets/images/employees/Search.svg'
import add from '../../assets/images/employees/Application Add.svg'
import avatar from '../../assets/images/employees/Avatar.png'
import profile from '../../assets/images/addEmployee/prof.svg'
import ProfileUser from '../../components/profileUser/ProfileUser'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import Navbar from '../../components/navbar/Navbar'
import axios from "axios";
import Btns from '../../components/btns/Btns'


function Employees() {
    const [offcanvas, setOffcanvas] = useState(false)
    const { employeeID } = useParams();
    const [employeesList, setEmployeesList] = useState(null);
    const [alert, setalert] = useState(false);
    const [popUpData, setPopUpData] = useState(null);
    const alertManager = () => {
        setalert(!alert)
    }
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(8);

    const [allDataArr, setAllDataArr] = useState(null);
    useEffect(() => {
        axios.get("/readEmployee").then((response) => {
            setAllDataArr(response.data.data);
            setEmployeesList(response.data.data.slice(startIndex, endIndex))
        })
    }, [])


    const nextPage = () => {
        setStartIndex(startIndex + 8);
        setEndIndex(endIndex + 8);

    }

    const backPage = () => {
        setStartIndex(startIndex - 8);
        setEndIndex(endIndex - 8);


    }

    useEffect(() => {

        setEmployeesList(allDataArr?.slice(startIndex, endIndex))
    }, [startIndex, endIndex])


    const search = (event) => {
        if (event.target.value !== "") {
            console.log(event.target.value);

            const searchedList = allDataArr.filter((obj) =>

                obj.EmployeeName.includes(event.target.value) || obj.EmployeeCode.includes(event.target.value)
            )
            console.log(searchedList);
            setEmployeesList(searchedList);
        } else {
            setEmployeesList(allDataArr?.slice(startIndex, endIndex))
        }
    }

    let next = 'Next page >>'

    const navigate = useNavigate()
    const pushAddEmployee = () => {
        navigate('/hr/addemployee')
    }
    const pushEmployeeProfile = (employeeID) => {
        navigate(`/hr/employeeProfile/${employeeID}`)
    }

    const handleDownload = (fileUrl) => {
        if (fileUrl) {

            const link = document.createElement('a');
            link.href = fileUrl;

            // Extracting the file name from the URL
            const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);

            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            setPopUpData("File not Uploaded.")
            setalert(true);
        }
    };
    return (
        <>
            <div className={style.parent}>
                <div className={style.sidebar}>
                    <Navbar func={() => {
                        setOffcanvas(!offcanvas)
                    }} />
                    <SideBar tab={"employees"} />
                    <HROffcanvas status={offcanvas} />
                </div>
                <div className={style.subparent}>
                    <ProfileUser path='/hr/profile' />
                    <div className={style.searchbar}>
                        <div className={style.sec1}>
                            <img src={Search} alt="" />
                            <input onChange={search} type="text" placeholder='Search Employee by name or id' />
                        </div>
                        <div onClick={pushAddEmployee} className={style.sec2}>
                            <img src={add} alt="" />
                            <p>Add Employee</p>
                        </div>
                    </div>
                    <div className={style.tableParent}>

                        <table className={style.table}>
                            <tr className={style.headers}>
                                <td>Employee ID</td>
                                <td>Name</td>
                                <td>CNIC</td>
                                <td>Phone Number</td>
                                <td>Email</td>
                                <td>Department</td>
                                <td>Training Status</td>
                                <td>Profile</td>
                                <td>CV Certificate</td>
                            </tr>
                            {
                                employeesList?.map((employee, i) => {
                                    return (
                                        <tr className={style.tablebody} key={i}>
                                            <td className={style.txtStyle1}>
                                                <p>{employee.EmployeeCode}</p>
                                            </td>
                                            <td className={style.txtStyle2}>
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
                                                    }} onError={(e) => {
                                                        e.target.style.display = 'none'; // Hide the img tag on error
                                                    }} src={employee.EmployeeImage || profile} alt="Image" />

                                                </div> {employee.EmployeeName}</td>
                                            <td className={style.txtStyle4}>{employee.CNIC}</td>
                                            <td className={style.txtStyle4}>{employee.PhoneNumber}</td>
                                            <td className={style.txtStyle3}>{employee.Email}</td>
                                            <td className={style.txtStyle4}>{employee.Department}</td>
                                            <td className={employee.TrainingStatus === 'Trained' ? style.txtStyle5 : style.txtStyle6}><p  >{employee.TrainingStatus}</p></td>
                                            <td>
                                                <button className={style.viewBtn} onClick={() => {
                                                    pushEmployeeProfile(employee._id)
                                                }
                                                }

                                                >
                                                    View
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => {
                                                    handleDownload(employee.EmployeeCV)
                                                }} className={style.downloadBtn}>
                                                    Download
                                                </button>
                                            </td>
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

export default Employees
