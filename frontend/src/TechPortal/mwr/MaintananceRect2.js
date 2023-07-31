import SideBar from '../../components/sidebar/SideBar'
import style from './MaintananceRect2.module.css'
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


function MaintananceRect2() {
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
        ndate: '13/7/2023',
        ldate: '13/7/2023',
        id: '3301',

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
                                <p>Machine Id</p>
                                <input type="text" placeholder='3301' />
                            </div>
                            <div>
                                <p>Machine name</p>
                                <input type="text" placeholder='Vernier Calliper' />
                            </div>
                            <div>
                                <p>Date type</p>
                                <input type="text" placeholder='Daily' />
                            </div>
                        </div>
                        <div className={style.sec2}>
                            <div>
                                <p>Machine location</p>
                                <input type="text" placeholder='Main Hall' />
                            </div>
                            <div>
                                <p>Maintainance type</p>
                                <input type="text" placeholder='Preventive' />
                            </div>
                        </div>
                    </div>
                    <div className={style.tableParent}>
                        <table className={style.table}>
                            <tr className={style.tableHeader}>
                                <th>Maintainance ID</th>
                                <th>Last Time</th>
                                <th>Next Time</th>
                                <th>Nature of Fault</th>
                                <th>Root Cause of Breakdown</th>
                                <th>Detail Offer</th>
                                <th>Replacement</th>
                                <th>Image</th>
                                <th>Certificate</th>
                            </tr>
                            {
                                data.map((obj, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{obj.id}</td>
                                            <td>{obj.ldate}</td>
                                            <td>{obj.ndate}</td>
                                            <td>{obj.id ? <button className={style.btn}>View</button> : null}</td>
                                            <td >{obj.id ? <button className={style.btn}>View</button> : null}</td>
                                            <td >{obj.id ? <button className={style.btn}>View</button> : null}</td>
                                            <td >{obj.id ? <button className={style.btn}>View</button> : null}</td>
                                            <td >{obj.id ? <button className={style.btn}>Download</button> : null}</td>
                                            <td >{obj.id ? <button className={style.btn}>Generate</button> : null}</td>
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

export default MaintananceRect2
