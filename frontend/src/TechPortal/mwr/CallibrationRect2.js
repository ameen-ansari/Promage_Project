import SideBar from '../../components/sidebar/SideBar'
import style from './CallibrationRect2.module.css'
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


function CallibrationRect2() {
    const [offcanvas, setOffcanvas] = useState(false)
    const { employeeID } = useParams();
    const [employeesList, setEmployeesList] = useState(null);
    const [alert, setalert] = useState(false);
    const [alert2, setalert2] = useState(false);
    const [alert3, setalert3] = useState(false);
    const [alert4, setalert4] = useState(false);
    const [popUpData, setPopUpData] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const alertManager = () => {
        setalert(!alert)
    }
    let next = 'Next page >>'
    const fileInputRef = useRef(null);

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
    const handleImageClick = () => {
        fileInputRef.current.click(); // Trigger the click event on the file input
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
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
                            Callibration Record
                        </div>

                    </div>
                    <div className={style.form}>
                        <div className={style.sec1}>
                            <div>
                                <p>Device Id</p>
                                <input type="text" placeholder='3301' />
                            </div>
                            <div>
                                <p>Device name</p>
                                <input type="text" placeholder='Vernier Calliper' />
                            </div>
                            <div>
                                <p>Date type</p>
                                <input type="text" placeholder='Daily' />
                            </div>
                        </div>
                        <div className={style.sec2}>
                            <div>
                                <p>Device location</p>
                                <input type="text" placeholder='Main Hall' />
                            </div>
                            <div>
                                <p>Device Range</p>
                                <input type="text" placeholder='Preventive' />
                            </div>
                            <div>
                                <p>Callibration type</p>
                                <input type="text" placeholder='Internal' />
                            </div>
                        </div>
                    </div>
                    <div className={style.btnparent}>
                        <p>Add</p>
                        <button onClick={() => {
                            setalert2(!alert2)
                        }} className={style.download}>Internal</button>
                        <button onClick={() => {
                            setalert3(!alert3)
                        }} className={style.next}>External</button>
                    </div>
                    <div className={style.tableParent}>
                        <table className={style.table}>
                            <tr className={style.tableHeader}>
                                <th>Last Callibration date</th>
                                <th colSpan={3}>
                                    <div>Marked Readings</div>
                                    <div>
                                        <p>1st</p>
                                        <p>2nd</p>
                                        <p>3rd</p>
                                    </div>
                                </th>
                                <th>Next Callibration date</th>
                                <th>Condition/Remarks</th>
                                <th>CR Initials</th>
                            </tr>
                            {
                                data.map((obj, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{obj.ldate}</td>
                                            <td><input defaultValue={20} type="number" /></td>
                                            <td><input defaultValue={20} type="number" /></td>
                                            <td ><input defaultValue={20} type="number" /></td>
                                            <td>{obj.ndate}</td>
                                            <td >{obj.id ? <button className={style.btn}>add</button> : null}</td>
                                            <td>{obj.cr}</td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                    <div className={style.btnparent}>
                        <button onClick={alertManager}>Submit</button>
                        <input
                            type="file"
                            id="file-input"
                            name='TrainerImage'
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleImageChange}
                        />
                    </div>

                </div>
            </div>
            {
                alert ?
                    <div class={style.alertparent}>
                        <div class={style.alert}>
                            <textarea name="" id="" cols="30" rows="10" placeholder='Comment here'></textarea>
                            <div className={style.alertbtns}>
                                <button onClick={alertManager} className={style.btn1}>Submit</button>
                                <button onClick={alertManager} className={style.btn2}>Cencel</button>
                            </div>
                        </div>
                    </div> : null
            }
            {
                alert2 ?
                    <div class={style.alertparent2}>
                        <div class={style.alert2}>
                            <div>
                                <p>Image</p>
                                <button className={style.btn1}>Upload</button>
                            </div>
                            <div>
                                <p>Certificate</p>
                                <button className={style.btn1}>Generate</button>
                            </div>
                            <div>
                                <p>Master callibration certificate</p>
                                <button className={style.btn1} onClick={handleImageClick}>Upload</button>
                            </div>
                            <div>
                                <p onClick={() => {
                                    setalert2(!alert2)
                                }}>Ok</p>
                            </div>
                        </div>
                    </div> : null
            }
            {
                alert3 ?
                    <div class={style.alertparent2}>
                        <div class={style.alert2}>
                            <div>
                                <p>Company name</p>
                                <input type="text" />
                            </div>
                            <div>
                                <p>Master callibration reference</p>
                                <input type="text" />
                            </div>
                            <div>
                                <p>Certificate</p>
                                <button className={style.btn1} onClick={handleImageClick}>Upload</button>
                            </div>
                            <div>
                                <p onClick={() => {
                                    setalert3(!alert3)
                                }}>Ok</p>
                            </div>
                        </div>
                    </div> : null
            }

        </>
    )
}

export default CallibrationRect2
