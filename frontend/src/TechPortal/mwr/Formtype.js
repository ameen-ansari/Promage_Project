import SideBar from '../../components/sidebar/SideBar'
import style from './Formtype.module.css'
import Search from '../../assets/images/employees/Search.svg'
import add from '../../assets/images/employees/Application Add.svg'
import avatar from '../../assets/images/employees/Avatar.png'
import profile from '../../assets/images/addEmployee/prof.svg'
import ProfileUser from '../../components/profileUser/ProfileUser'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import Navbar from '../../components/navbar/Navbar'
import axios from "axios";
import Btns from '../../components/btns/Btns'
import TechPortalSidebar from '../../components/sidebar/TechPortalSidebar'


function Formtype() {
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const [offcanvas, setOffcanvas] = useState(false)
    const { employeeID } = useParams();
    const [employeesList, setEmployeesList] = useState(null);
    const [alert, setalert] = useState(false);
    const [popUpData, setPopUpData] = useState(null);
    const alertManager = () => {
        setalert(!alert)
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
        console.log(file);
    };

    const handleImageClick = () => {
        fileInputRef.current.click(); // Trigger the click event on the file input
    };
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
        cr: 'Taskeen'

    }
    let data = [
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
                            <div>
                                <p>Maintainance type</p>
                                <textarea type="text" />
                            </div>
                            <div>
                                <p>Detail Offer</p>
                                <textarea type="text" />
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
                            <div className={style.invisiable}> 
                            <p>Maintainance type</p>
                                <input type="text" placeholder='Preventive' />
                            </div>
                            <div>
                                <p>Root Cause of Breakdown</p>
                                <textarea type="text" />
                            </div>
                            <div>
                                <p>Replacement</p>
                                <textarea type="text" />
                            </div>
                        </div>
                    </div>
                    <div className={style.btnparent}>
                        <button className={style.download} onClick={handleImageClick}>Upload Image</button>
                        <button className={style.next} onClick={()=>{
                            navigate('/tech/maintanancerect2')
                        }}>Generate Certificate</button>
                        <input onChange={handleImageChange} name='TrainerDocument' type='file' ref={fileInputRef} style={{ display: 'none' }} />
                    </div>

                    <div className={style.btnparent2}>
                        <button className={style.orangeBtn}>Submit</button>
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

export default Formtype
