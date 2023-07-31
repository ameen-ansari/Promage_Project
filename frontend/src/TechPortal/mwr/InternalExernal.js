import SideBar from '../../components/sidebar/SideBar'
import style from './InternalExernal.module.css'
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


function InternalExernal() {
    const [offcanvas, setOffcanvas] = useState(false)
    const { employeeID } = useParams();
    const [employeesList, setEmployeesList] = useState(null);
    const [alert, setalert] = useState(false);
    const [popUpData, setPopUpData] = useState(null);
    const alertManager = () => {
        setalert(!alert)
    }
    let next = 'Next page >>'

    const navigate = useNavigate()
    const pushAddEmployee = () => {
        navigate('/hr/addemployee')
    }
    const pushEmployeeProfile = (employeeID) => {
        navigate(`/hr/employeeProfile/${employeeID}`)
    }

    let sampleData = {
        companyName: 'Taskeen',
        id: '3301',
        reference: 'Taskeen'
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

                    <div className={style.tableParent}>
                        <table className={style.table}>
                            <tr className={style.tableHeader}>
                                <th roleSpan={2}>Id</th>
                                <th colSpan={3}>
                                    <div className={style.intext}>Internal</div>
                                    <div>
                                        <p>Image</p>
                                        <p>Certificate</p>
                                        <p>Master callibration certificate</p>
                                    </div>
                                </th>
                                <th colSpan={3}>
                                    <div className={style.intext}>External</div>
                                    <div>
                                        <p>Company name</p>
                                        <p>Master callibrator  reference</p>
                                        <p>Certificate</p>
                                    </div>
                                </th>

                            </tr>
                            {
                                data.map((obj, i) => {
                                    return (
                                        <tr className={style.body} key={i}>
                                            <td>{obj.id}</td>
                                            <td>{obj.id ? <button className={style.btn}>View</button> : null}</td>
                                            <td>{obj.id ? <button className={style.btn}>View</button> : null}</td>
                                            <td >{obj.id ? <button className={style.btn}>View</button> : null}</td>
                                            <td>{obj.companyName}</td>
                                            <td >{obj.reference}</td>
                                            <td>{obj.id ? <button className={style.btn}>View</button> : null}</td>
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

export default InternalExernal
