import style from './Devices.module.css'
import search from '../../assets/images/employees/Search.svg'
import add from '../../assets/images/employees/Application Add.svg'
import ProfileUser from '../../components/profileUser/ProfileUser'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import Navbar from '../../components/navbar/Navbar'
import TechPortalSidebar from '../../components/sidebar/TechPortalSidebar'
import TechOffcanvas from '../../components/offcanvas/TechOffcanvas'
import Table3 from '../components/Table3'
import Table2 from '../components/Table2'


function Devices() {
    const [offcanvas, setOffcanvas] = useState(false)
    let sampledata = {
        code: '3310',
        name: 'Weaving Machine',
        location: 'Main Hall',
        daily: 'selected',
        weekly: 'selected',
        mothly: 'selected',
        yearly: 'selected',
    }
    let data = [
        sampledata,
        sampledata,
        sampledata,
        sampledata,
        sampledata,
        sampledata,
        sampledata,
        sampledata,
    ]
    let next = 'Next page >>'

    const navigate = useNavigate()
    const pushAddEmployee = () => {
        navigate('/tech/adddevices')
    }
    const pushEmployeeProfile = () => {
        alertManager()
    }
    const [alert, setalert] = useState(false)
    const alertManager = () => {
        setalert(!alert)
    }
    const pushrecs = () => {
        navigate('/tech/callibrationrect')
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
                <div className={style.subparent}>
                    <ProfileUser path='/hr/profile' />
                    <div className={style.searchbar}>
                        <div className={style.sec1}>
                            <img src={search} alt="" />
                            <input type="text" placeholder='Search Measuring Device by name or code' />
                        </div>
                        <div onClick={pushAddEmployee} className={style.sec2}>
                            <img src={add} alt="" />
                            <p>Add Device</p>
                        </div>
                    </div>
                    <div className={style.tableParent}>
                        <div className={style.tables}>
                            <Table3 />
                            <Table2 viewfunc={pushrecs} startfunc={alertManager} value='Daily' th='Callibration' />
                            <Table2 viewfunc={pushrecs} startfunc={alertManager} value='weekly' th='Callibration' />
                            <Table2 viewfunc={pushrecs} startfunc={alertManager} value='Monthly' th='Callibration' />
                            <Table2 viewfunc={pushrecs} startfunc={alertManager} value='Quaterly' th='Callibration' />
                            <Table2 viewfunc={pushrecs} startfunc={alertManager} value='Yearly' th='Callibration' />
                        </div>
                    </div>
                    <div className={style.next}>
                        <button>
                            {next}
                        </button>
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
                                <button onClick={() => {
                                    navigate('/tech/callibrationrect2')
                                }} className={style.btn1}>Callibrate</button>
                                <button onClick={alertManager} className={style.btn2}>Cancel</button>
                            </div>
                        </div>
                    </div> : null
            }

        </>
    )
}

export default Devices
