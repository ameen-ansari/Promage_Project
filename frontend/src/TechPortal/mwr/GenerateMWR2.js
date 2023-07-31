import SideBar from '../../components/sidebar/SideBar'
import style from './GenerateMWR.module.css'
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
import arrow from '../../assets/images/addEmployee/arrow.svg'
import TechPortalSidebar from '../../components/sidebar/TechPortalSidebar'


function GenerateMWR2() {
    const [offcanvas, setOffcanvas] = useState(false)
    const [area, setarea] = useState(false)
    const [code, setcode] = useState(false)
    const [pri, setpri] = useState(false)
    const [disc, setDisc] = useState(false)
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
                    <div className={style.headers}>
                        <div className={style.spans}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className={style.para}>
                            Generate MWR
                        </div>

                    </div>
                    <div className={style.form}>
                        <div className={style.sec1}>
                            <div>
                                <p className='mt-2'>Area</p>
                                <div onClick={() => {
                                    setarea(!area)
                                }} className={style.dropdownfield}>
                                    <p></p>
                                    <img className={area ? style.rotate : null} src={arrow} alt="" />
                                </div>
                            </div>
                            {area ?
                                <div className={style.droper}>
                                    <p className={style.optStyle}>xyz</p>
                                    <p className={style.optStyle}>xyz</p>
                                    <p className={style.optStyle}>xyz</p>
                                    <p className={style.optStyle}>xyz</p>
                                </div> : null
                            }
                            <div >
                                <p className='mt-2'>Priority</p>
                                <div onClick={() => {
                                    setpri(!pri)
                                }} className={style.dropdownfield}>
                                    <p></p>
                                    <img className={pri ? style.rotate : null} src={arrow} alt="" />
                                </div>
                            </div>
                            {pri ?
                                <div className={style.droper}>
                                    <div>
                                        <input type="radio" />
                                        <p >A-Emergency Job</p>
                                    </div>
                                    <div>
                                        <input type="radio" />
                                        <p >B-Urgent Job</p>
                                    </div>
                                    <div>
                                        <input type="radio" />
                                        <p >C-Maintainance Job within 8 days</p>
                                    </div>
                                    <div>
                                        <input type="radio" />
                                        <p >D-General purpose within 7 days
                                            or more</p>
                                    </div>
                                </div> : null
                            }
                            <div >
                                <p className='mt-2'>
                                    Description of work
                                </p>
                                <textarea type="text" />
                            </div>
                        </div>
                        <div className={style.sec2}>
                            <div >
                                <p className='mt-2'>Equipment Code</p>
                                <div onClick={() => {
                                    setcode(!code)
                                }} className={style.dropdownfield}>
                                    <p></p>
                                    <img className={code ? style.rotate : null} src={arrow} alt="" />
                                </div>
                            </div>
                            {code ?
                                <div className={style.droper}>
                                    <p className={style.optStyle}>xyz</p>
                                    <p className={style.optStyle}>xyz</p>
                                    <p className={style.optStyle}>xyz</p>
                                    <p className={style.optStyle}>xyz</p>
                                </div> : null
                            }
                            <div>
                                <p className='mt-2'>Discipline</p>
                                <div onClick={() => {
                                    setDisc(!disc)
                                }} className={style.dropdownfield}>
                                    <p></p>
                                    <img className={disc ? style.rotate : null} src={arrow} alt="" />
                                </div>
                            </div>
                            {disc ?
                                <div className={style.droper}>
                                    <div>
                                        <input type="checkbox" />
                                        <p >Mechanical</p>
                                    </div>
                                    <div>
                                        <input type="checkbox" />
                                        <p >Electrical</p>
                                    </div>
                                    <div>
                                        <input type="checkbox" />
                                        <p >Electrical</p>
                                    </div>
                                    <div>
                                        <input type="checkbox" />
                                        <p >Insulation & Paint</p>
                                    </div>
                                    <div>
                                        <input type="checkbox" />
                                        <p >Carpentary</p>
                                    </div>
                                    <div>
                                        <input type="checkbox" />
                                        <p >Civil</p>
                                    </div>
                                </div> : null
                            }
                            <div>
                                <p className='mt-2'>
                                    Special Instruction
                                </p>
                                <textarea type="text" />
                            </div>
                        </div>
                    </div>
                    <div className={style.btnparent}>
                        <p>Image</p>
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

export default GenerateMWR2
