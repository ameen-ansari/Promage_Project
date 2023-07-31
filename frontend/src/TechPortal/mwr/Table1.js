import SideBar from '../../components/sidebar/SideBar'
import style from './Table.module.css'
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
import TechPortalSidebar from '../../components/sidebar/TechPortalSidebar'


function Table1() {
    const [offcanvas, setOffcanvas] = useState(false)
    const { employeeID } = useParams();
    const [employeesList, setEmployeesList] = useState(null);
    const [alert, setalert] = useState(false);
    const [alert2, setalert2] = useState(false);
    const [alert3, setalert3] = useState(false);
    const [popUpData, setPopUpData] = useState(null);
    const alertManager = () => {
        setalert(!alert)
    }
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(8);

    const [allDataArr, setAllDataArr] = useState(null);


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
        navigate('/tech/generatemwr')
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
    let sampleData = {
        id: '3310',
        date: '13/7/2023',
        time: '4pm',
        area: 'Main Hall',
        department: 'IT',
        machineId: '3310',
        startTime: '4pm',
        endTime: '4pm',
        status: 'Pending',
    }
    let data = [
        sampleData,
        sampleData,
        sampleData,
        sampleData,
        sampleData,
        sampleData,
        sampleData,
    ]
    return (
        <>
            <div className={style.parent}>
                <div className={style.sidebar}>
                    <Navbar func={() => {
                        setOffcanvas(!offcanvas)
                    }} />
                    <TechPortalSidebar />
                    <HROffcanvas status={offcanvas} />
                </div>
                <div className={style.subparent}>
                    <ProfileUser path='/hr/profile' />
                    <div className={style.searchbar}>
                        <div className={style.sec1}>
                            <img src={Search} alt="" />
                            <input onChange={search} type="text" placeholder='Search MWR by id' />
                        </div>
                        <div onClick={pushAddEmployee} className={style.sec2}>
                            <img src={add} alt="" />
                            <p>Generate MWR</p>
                        </div>
                    </div>
                    <div className={style.tableParent}>
                        <table className={style.table}>
                            <tr className={style.headers}>
                                <td>MWR Id</td>
                                <td>Date</td>
                                <td>Time</td>
                                <td>Area</td>
                                <td>Department</td>
                                <td>Machine Id</td>
                                <td>Priority</td>
                                <td>Description</td>
                                <td>Instruction</td>
                                <td>Action</td>
                                <td>Start Time</td>
                                <td>End Time</td>
                                <td>Reason of pending </td>
                                <td>Detail</td>
                                <td>Status</td>
                                <td>MWR Detail</td>
                            </tr>
                            {
                                data.map((obj, i) => {
                                    return (
                                        <tr className={style.body} key={i}>
                                            <td>
                                                <p>
                                                    {obj.id}
                                                </p>
                                            </td>
                                            <td className={style.text1}>{obj.date}</td>
                                            <td className={style.text2}>
                                                {obj.time}
                                            </td>
                                            <td className={style.text2}>{obj.area}</td>
                                            <td className={style.text2}>{obj.department}</td>
                                            <td>
                                                <p>
                                                    {obj.machineId}
                                                </p>
                                            </td>
                                            <td className={style.text3}><select name="" id="">
                                                <option value="">A</option>
                                                <option value="">B</option>
                                                <option value="">C</option>
                                                <option value="">D</option>
                                            </select></td>
                                            <td><button onClick={() => {
                                                setalert(!alert)
                                            }} className={style.viewBtn}>View</button></td>
                                            <td><button onClick={() => {
                                                setalert(!alert)
                                            }} className={style.viewBtn}>View</button></td>
                                            <td>
                                                <button className={style.accept}  onClick={() => {
                                                setalert3(!alert3)
                                            }} >Accept</button>
                                                <button onClick={() => {
                                                    setalert2(!alert2)
                                                }} className={style.reject}>Reject</button>
                                                <button className={style.complete}>Complete</button>
                                            </td>
                                            <td className={style.text2}>{obj.startTime}</td>
                                            <td className={style.text2}>{obj.endTime}</td>
                                            <td><button onClick={() => {
                                                setalert(!alert)
                                            }} className={style.viewBtn}>View</button></td>
                                            <td><button className={style.viewBtn} onClick={() => { navigate('/tech/maintanancerect') }}>View</button></td>
                                            <td className={style.text2}>{obj.status}</td>
                                            <td><button onClick={() => { navigate('/tech/generatemwr2') }} className={style.viewBtn}>View</button></td>
                                        </tr>
                                    )

                                })
                            }
                        </table>
                    </div>
                </div>
            </div>
            {
                alert ?
                    <div class={style.alertparent}>
                        <div class={style.alert}>
                            <p class={style.msg}>This Device has serious defect.
                                It has to be maintained daily</p>
                            <div className={style.alertbtns}>
                                <button onClick={alertManager} className={style.btn2}>Close</button>
                            </div>
                        </div>
                    </div> : null
            }
            {
                alert2 ?
                    <div class={style.alertparent}>
                        <div class={style.alert}>
                            <textarea name="" id="" cols="30" rows="10" placeholder='Comment here'></textarea>
                            <div className={style.alertbtns}>
                                <button onClick={() => {
                                    setalert2(!alert2)
                                }} className={style.btn1}>Submit</button>
                                <button onClick={() => {
                                    setalert2(!alert2)
                                }} className={style.btn2}>Cancel</button>
                            </div>
                        </div>
                    </div> : null
            }
            {
                alert3 ?
                    <div class={style.alertparent2}>
                        <div class={style.alert2}>
                            <div>

                                <p>Job Assign</p>
                                <input type="text" />
                            </div>
                            <div>
                                <p>Designation</p>
                                <input type="text" />
                            </div>
                            <div>
                                <p>Detail</p>
                                <input type="text" />
                            </div>
                            <div>
                                <button onClick={() => {
                                    setalert3(!alert3)
                                }} className={style.btn4}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div> : null
            }

        </>
    )
}

export default Table1
