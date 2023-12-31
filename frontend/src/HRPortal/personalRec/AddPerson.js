import ProfileUser from '../../components/profileUser/ProfileUser'
import style from './AddPersom.module.css'
import SideBar from '../../components/sidebar/SideBar'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import { useEffect, useRef, useState } from 'react'

function AddPerson({ setPersonFormData, personFormData }) {
    const [offcanvas, setOffcanvas] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {

        console.log(personFormData);
    }, [personFormData])




    return (
        <div className={style.parent}>
            <div className={style.sidebar}>
                <Navbar func={() => {
                    setOffcanvas(!offcanvas)
                }} />
                <SideBar tab={"personalRecuisition"} />
                <HROffcanvas path='/hr/profile' status={offcanvas} />
            </div>
            <ProfileUser path='/hr/profile' />
            <div className={style.subparent}>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    navigate("/hr/hiringrec");
                }}>

                    <div className={style.formDivider}>
                        <div className={style.sec1}>
                            <div className={style.headers}>
                                <div className={style.spans}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div className={style.para}>
                                    Employee Details
                                </div>
                            </div>

                            <div className={style.card1bodyp}>
                                <div className={style.card1body}>
                                    <div className='d-flex justify-content-start align-items-start'>
                                        <p className={style.paraincard}>Station</p>
                                    </div>
                                    <div className={style.inputp}>
                                        <input onChange={(event) => {
                                            setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                        }} name='Station' value={personFormData?.Station} type="text" />
                                    </div>
                                </div>
                                <div className={style.card1body}>
                                    <div className='d-flex justify-content-start align-items-start'>
                                        <p className={style.paraincard}>Job Title</p>
                                    </div>
                                    <div className={style.inputp}>
                                        <input onChange={(event) => {
                                            setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                        }} value={personFormData?.JobTitle} name='JobTitle' type="text" />
                                    </div>
                                </div>
                                <div className={style.card1body}>
                                    <div className='d-flex justify-content-start align-items-start'>
                                        <p className={style.paraincard}>Department</p>
                                    </div>
                                    <div className={style.inputp}>
                                        <input onChange={(event) => {
                                            setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                        }} value={personFormData?.Department} name='Department' type="text" required />
                                    </div>
                                </div>
                                <div className={style.card1body}>
                                    <div className='d-flex justify-content-start align-items-start'>
                                        <p className={style.paraincard}>Section</p>
                                    </div>
                                    <div className={style.inputp}>
                                        <input onChange={(event) => {
                                            setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                        }} value={personFormData?.Section} name='Section' type="text" required />
                                    </div>
                                </div>
                                <div className={style.card1body}>
                                    <div className='d-flex justify-content-start align-items-start'>
                                        <p className={style.paraincard}>Supervisor</p>
                                    </div>
                                    <div className={style.inputp}>
                                        <input onChange={(event) => {
                                            setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                        }} value={personFormData?.Supervisor} name='Supervisor' type="text" required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.sec2}>
                            <div className={style.sec1p1}>
                                <div className={style.headers}>
                                    <div className={style.spans}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <div className={style.para}>
                                        Employement Terms
                                    </div>
                                </div>
                                <div className={` ${style.bg} ${style.checksParent}`}>
                                    <div className={style.checks}>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} checked={personFormData?.EmploymentType === "Permanent"} name='EmploymentType' style={{ width: '26px', height: '36px' }} value="Permanent" type="radio" />
                                            <p className={style.paraind}>Permanent</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input checked={personFormData?.EmploymentType === "Contractual"} onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} name='EmploymentType' style={{ width: '26px', height: '36px' }} value="Contractual" type="radio" />
                                            <p className={style.paraind}>Contractual</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input checked={personFormData?.EmploymentType === "Specific Record"} onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} name='EmploymentType' style={{ width: '26px', height: '36px' }} value="Specific Record" type="radio" />
                                            <p className={style.paraind}>Specific Record</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={` ${style.bg} ${style.checksParent}`}>
                                    <div className={style.checks}>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input checked={personFormData?.EmploymentType === "Part Time"} onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} name='EmploymentType' style={{ width: '26px', height: '36px' }} value="Part Time" type="radio" />
                                            <p className={style.paraind}>Part Time</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input checked={personFormData?.EmploymentType === "Temporary"} onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} name='EmploymentType' style={{ width: '26px', height: '36px' }} value="Temporary" type="radio" />
                                            <p className={style.paraind}>Temporary</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input checked={personFormData?.EmploymentType === "Internship"} onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} name='EmploymentType' style={{ width: '26px', height: '36px' }} value="Internship" type="radio" />
                                            <p className={style.paraind}>Internship</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className={style.sec1p2}>
                                <div className={style.headers}>
                                    <div className={style.spans}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <div className={style.para}>
                                        Salary
                                    </div>

                                </div>
                                <div className={style.card1bodyp}>
                                    <div className={style.card1body}>
                                        <div style={{ width: '70%', }} className='d-flex justify-content-start align-items-start'>
                                            <p className={style.paraincard}>Gross Salary</p>
                                        </div>
                                        <div className={style.inputp}>
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} value={personFormData?.GrossSalary} name='GrossSalary' type="number" />
                                        </div>
                                    </div>
                                    <div className={style.card1body}>
                                        <div style={{ width: '70%', }} className='d-flex justify-content-start align-items-start'>
                                            <p className={style.paraincard}>Net Salary</p>
                                        </div>
                                        <div className={style.inputp}>
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} value={personFormData?.NetSalary} name='NetSalary' type="number" />
                                        </div>
                                    </div>
                                    <div className={style.card1body}>
                                        <div style={{ width: '70%', }} className='d-flex justify-content-start align-items-start'>
                                            <p className={style.paraincard}>Basic Salary</p>
                                        </div>
                                        <div className={style.inputp}>
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} value={personFormData?.BasicSalaryDetail} name='BasicSalaryDetail' type="text" />
                                        </div>
                                    </div>
                                    <div className={style.card1body}>
                                        <div style={{ width: '70%', }} className='d-flex justify-content-start align-items-start'>
                                            <p className={style.paraincard}>Allowence</p>
                                        </div>
                                        <div className={style.inputp}>
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} value={personFormData?.AllowanceDetail} name='AllowanceDetail' type="text" />
                                        </div>
                                    </div>
                                    <div className={style.card1body}>
                                        <div style={{ width: '70%', }} className='d-flex justify-content-start align-items-start'>
                                            <p className={style.paraincard}>Incentives</p>
                                        </div>
                                        <div className={style.inputp}>
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} value={personFormData?.IncentivesDetail} name='IncentivesDetail' type="text" />
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>


                    <div className={style.btn}>
                        <button type='submit'  >Next Page</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AddPerson
