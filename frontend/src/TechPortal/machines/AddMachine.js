import style from './AddMachine.module.css'
import profile from '../../assets/images/techPortal/SClock.svg'
import Phone from '../../assets/images/employeeProfile/Location.svg'
import arrow from '../../assets/images/addEmployee/arrow.svg'
import ProfileUser from '../../components/profileUser/ProfileUser'
import { useState } from 'react'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import Navbar from '../../components/navbar/Navbar'
import settings from '../../assets/images/techPortal/settings.svg'
import TechPortalSidebar from '../../components/sidebar/TechPortalSidebar'
import TechOffcanvas from '../../components/offcanvas/TechOffcanvas'
import BackBtn from '../../components/btns/BackBtn'

function AddMachine() {
    const [offcanvas, setOffcanvas] = useState(false)
    const [optvalue, setoptvalue] = useState('')
    const [dropd, setdropd] = useState(false)
    const [location, setlocation] = useState(false)
    const [alert, setalert] = useState(false)
    const alertManager = () => {
        setalert(!alert)
    }

    const optManager = (e) => {
        setdropd(!dropd)
        setoptvalue(e)
    }
    const locationmanager = () =>{
        setlocation(!location)
        
    }
    return (
        <>
            <div className={style.parent}>
                <div className={style.sidebar}>
                    <Navbar func={() => {
                        setOffcanvas(!offcanvas)
                    }} />
                    <TechPortalSidebar />
                    <TechOffcanvas status={offcanvas} />
                </div>
                <div className={style.addEmployee}>
                    <ProfileUser path='/hr/profile' />
                    <div className={style.form}>
                        <div className={style.headers}>
                            <div className={style.spans}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className={style.para}>
                                Add Machinery
                            </div>

                        </div>
                        <div className={style.userform}>
                            <div className={style.sec1}>
                                <div className='mb-5'>
                                    <input type="text" placeholder='Machinery name' />
                                    <img src={profile} alt="" />
                                </div>
                                <div>
                                    <input type="text" placeholder='Machinery location' />
                                    <div className={style.indicator}>
                                        <img src={Phone} alt="" />
                                        <div onClick={locationmanager}>
                                            <img className={location ? style.rotate : null} src={arrow} alt="" />
                                        </div>
                                    </div>
                                </div>
                                {location ?
                                    <div className={style.droper}>
                                        <p className={style.optStyle}>xyz</p>
                                        <p className={style.optStyle}>xyz</p>
                                        <p className={style.optStyle}>xyz</p>
                                        <p className={style.optStyle}>xyz</p>
                                    </div> : null
                                }
                                <div className={style.dropdown}>
                                    <p>Add Maintainance</p>
                                    {/* <div className={style.indicator2}>
                                        <img src={settings} alt="" />
                                        <p className={style.optStyle}>{optvalue}</p>
                                        <div onClick={() => optManager(optvalue)}>
                                            <img className={dropd ? style.rotate : null} src={arrow} alt="" />
                                        </div>
                                    </div>
                                    {dropd ? */}
                                        <div className={style.droper}>
                                            <p className={style.optStyle} ><input onChange={alertManager} type="checkbox" /> Daily</p>
                                            <p className={style.optStyle} ><input onChange={alertManager} type="checkbox" /> Weekly</p>
                                            <p className={style.optStyle} ><input onChange={alertManager} type="checkbox" /> Monthly</p>
                                            <p className={style.optStyle} ><input onChange={alertManager} type="checkbox" /> Yearly</p>
                                            <p className={style.optStyle} ><input onChange={alertManager} type="checkbox" /> Quaterly</p>
                                        </div>
                                    {/* } */}
                                </div>
                                <div className={style.btns}>
                                    <button className={style.submit} >Submit</button>
                                </div>
                            </div>

                        </div>
                        <div className={style.resbtns}>
                            <button className={style.submit} >Submit</button>
                        </div>

                    </div>
                    <BackBtn />

                </div>
            </div>
            {
                alert ?
                    <div class={style.alertparent}>
                        <div class={style.alert}>
                            <textarea name="" id="" cols="30" rows="10" placeholder='Comment here'></textarea>
                            <div className={style.alertbtns}>
                                <button onClick={alertManager} className={style.btn1}>Submit</button>
                                <button onClick={alertManager} className={style.btn2}>Cancel</button>
                            </div>
                        </div>
                    </div> : null
            }

        </>
    )
}

export default AddMachine
