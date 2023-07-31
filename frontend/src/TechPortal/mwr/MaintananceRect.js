import SideBar from '../../components/sidebar/SideBar'
import style from './MaintananceRect.module.css'
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


function MaintananceRect() {
    const [offcanvas, setOffcanvas] = useState(false)
    const { employeeID } = useParams();
    const [employeesList, setEmployeesList] = useState(null);
    const [popUpData, setPopUpData] = useState(null);
 
    let next = 'Next page >>'

    const navigate = useNavigate()
    const pushAddEmployee = () => {
        navigate('/hr/addemployee')
    }
    const pushEmployeeProfile = (employeeID) => {
        navigate(`/hr/employeeProfile/${employeeID}`)
    }

    let sampleData = {
        date: '13/7/2023',
        time: '4pm',

    }
    let data = [
        sampleData,
        {},
        {},
        {},
        {},
        {},
        {},


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
                    <ProfileUser />
                    <div className={style.headers}>
                        <div className={style.spans}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className={style.para}>
                            Maintainance Record
                        </div>

                    </div>
                    <div className={style.form}>
                        <div className={style.sec1}>
                            <div>
                                <p>Equipment code</p>
                                <input type="text" placeholder='3301' />
                            </div>
                            <div>
                                <p>Priority</p>
                                <input type="text" placeholder='A-Emergency Jobs' />
                            </div>
                        </div>
                        <div className={style.sec2}>
                            <div>
                                <p>Area</p>
                                <input type="text" placeholder='Area 1' />
                            </div>
                            <div>
                                <p>Discipline</p>
                                <input type="text" placeholder='Mechanical' />
                            </div>
                        </div>
                    </div>
                    <div className={style.tableParent}>
                        <table className={style.table}>
                            <tr className={style.tableHeader}>
                                <th>Time</th>
                                <th>Date</th>
                                <th>Reason of Pending</th>
                                <th>Description</th>
                                <th>JobAssign</th>
                                <th>Designation</th>
                                <th>Detail</th>
                            </tr>
                            {
                                data.map((obj, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{obj.time}</td>
                                            <td>{obj.date}</td>
                                            <td >{obj.time ? <button className={style.btn}>View</button> : null}</td>
                                            <td >{obj.time ? <button className={style.btn}>View</button> : null}</td>
                                            <td ></td>
                                            <td ></td>
                                            <td ></td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                    <div className={style.btnparent}>
                        <button className={style.download}>Download</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MaintananceRect
