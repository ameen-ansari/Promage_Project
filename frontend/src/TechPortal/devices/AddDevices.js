import style from './Adddevices.module.css'
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

function AddDevices() {
    const [location, setlocation] = useState(false)
    const [offcanvas, setOffcanvas] = useState(false)
    const [internal, serInternal] = useState(false)
    const [external, setExternal] = useState(false)
    const [value1, setValue1] = useState('Internal')
    const [value2, setValue2] = useState('External')
    const [dropd, setdropd] = useState(false)
    const [alert, setalert] = useState(false)
    const alertManager = () => {
        setalert(!alert)
    }

    const internalH = (e) => {
        serInternal(!internal)
        setValue1(e)
    }
    const externalH = (e) => {
        setExternal(!external)
        setValue2(e)
    }
    const locationH = (value) => {
        console.log(value);
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
                                Add Measuring Device
                            </div>

                        </div>
                        <div className={style.userform}>
                            <div className={style.sec1}>
                                <div className='mb-4'>
                                    <input type="text" placeholder='Device name' />
                                    <img src={profile} alt="" />
                                </div>
                                <div>
                                    <input type="text" placeholder='Device location' />
                                    <div onClick={locationH} className={style.indicator}>
                                        <img src={Phone} alt="" />
                                        <div>
                                            <img className={location ? style.rotate : null} src={arrow} alt="" />
                                        </div>
                                    </div>
                                </div>
                                {location ?
                                    <div className={style.droper}>
                                        <p className={style.optStyle} onClick={() => locationH('1')}>xyz</p>
                                        <p className={style.optStyle} onClick={() => locationH('2')}>xyz</p>
                                        <p className={style.optStyle} onClick={() => locationH('3')}>xyz</p>
                                        <p className={style.optStyle} onClick={() => locationH('4')}>xyz</p>
                                    </div> : null
                                }
                                <div className='mt-4'>
                                    <input type="number" placeholder='Range' />
                                </div>
                                <div className={style.dropdown}>
                                    <p>Add Callibration</p>
                                    <div className={style.indicator2}>
                                        <p className={style.optStyle}>{value1}</p>
                                        <div onClick={() => internalH(value1)}>
                                            <img className={internal ? style.rotate : null} src={arrow} alt="" />
                                        </div>
                                    </div>
                                    {internal ?
                                        <div className={style.droper}>
                                            <p className={style.optStyle} onClick={() => internalH('Daily')}>Daily</p>
                                            <p className={style.optStyle} onClick={() => internalH('Weekly')}>Weekly</p>
                                            <p className={style.optStyle} onClick={() => internalH('Monthly')}>Monthly</p>
                                            <p className={style.optStyle} onClick={() => internalH('Yearly')}>Yearly</p>
                                        </div> : null
                                    }
                                    <div className={style.indicator2}>
                                        <p className={style.optStyle}>{value2}</p>
                                        <div onClick={() => externalH(value2)}>
                                            <img className={external ? style.rotate : null} src={arrow} alt="" />
                                        </div>
                                    </div>
                                    {external ?
                                        <div className={style.droper}>
                                            <p className={style.optStyle} onClick={() => externalH('Daily')}>Daily</p>
                                            <p className={style.optStyle} onClick={() => externalH('Weekly')}>Weekly</p>
                                            <p className={style.optStyle} onClick={() => externalH('Monthly')}>Monthly</p>
                                            <p className={style.optStyle} onClick={() => externalH('Yearly')}>Yearly</p>
                                        </div> : null
                                    }
                                </div>

                                <div className={style.btns}>
                                    <button className={style.submit} onClick={alertManager}>Submit</button>
                                </div>
                            </div>

                        </div>
                        <div className={style.resbtns}>
                            <button className={style.submit} onClick={alertManager}>Submit</button>
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

export default AddDevices
