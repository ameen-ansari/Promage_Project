import ProfileUser from '../../components/profileUser/ProfileUser'
import SideBar from '../../components/sidebar/SideBar'
import style from './PersonalRec.module.css'
import arrow from '../../assets/images/addEmployee/arrow.svg'
import date from '../../assets/images/employeeProfile/Calendar.svg'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import Navbar from '../../components/navbar/Navbar'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios";
import Swal from 'sweetalert2'
import BackBtn from '../../components/btns/BackBtn'

function PersonalRec({ personFormData, setPersonFormData }) {
    const [offcanvas, setOffcanvas] = useState(false)
    const [alert, setalert] = useState(false)
    const alertManager = () => {
        setalert(!alert)
    }
    const navigate = useNavigate();

    const makeRequest = () => {
        if (personFormData) {
            axios.post("/addPersonalRecuisition", personFormData).then(() => {

                console.log("request made !");
                setPersonFormData(null);


                Swal.fire({
                    title: 'Success',
                    text: 'Submitted Successfully',
                    icon: 'success',
                    confirmButtonText: 'Go!',
                  
                  }).then( (result ) => {
                    if (result.isConfirmed) {
                        
                        navigate("/hr/personalrec")
                    }
                  })
            }).catch((error)=>{

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Try filling data again',
                    confirmButtonText: 'OK.'
                 
                  })
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Try filling data again',
                confirmButtonText: 'OK.'
              })
        }
    }


    console.log(personFormData);

    return (
        <>
            <div className={style.parent}>
                <div className={style.sidebar}>
                    <Navbar func={() => {
                        setOffcanvas(!offcanvas)
                    }} />
                    <HROffcanvas path='/hr/profile' status={offcanvas} />
                    <SideBar tab={"personalRecuisition"} />
                </div>
                <ProfileUser path='/hr/profile' />
                <div className={style.subparent}>
                    <div className={style.headers}>
                        <div className={style.spans}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className={style.heading}>
                            Hiring Specification
                        </div>
                    </div>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        alertManager();


                    }}>

                        <div className={style.formDivider}>
                            <div className={style.sec1}>
                                <div className={style.inputParent}>
                                    <div className={style.para}>
                                        <p>Minimum Qualification Required</p>
                                    </div>
                                    <div>
                                        <input onChange={(event) => {
                                            setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                        }} value={personFormData?.MiniQualification} name='MiniQualification' type="text" required />

                                    </div>
                                </div>
                                <div className={style.inputParent}>
                                    <div className={style.para}>
                                        <p>Minimum Experience Required</p>
                                    </div>
                                    <div>
                                        <input onChange={(event) => {
                                            setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                        }} value={personFormData?.MiniExperienced} name='MiniExperienced' type="text" required />

                                    </div>
                                </div>
                                <div className={style.inputParent}>
                                    <div className={style.para}>
                                        <p>Industry Specific Experience</p>
                                    </div>
                                    <div>
                                        <input onChange={(event) => {
                                            setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                        }} value={personFormData?.IndustrySpecificExp} name='IndustrySpecificExp' type="text" required />

                                    </div>
                                </div>
                                <div className={style.inputParent}>
                                    <div className={style.para}>
                                        <p>Age Bracket</p>
                                    </div>
                                    <div>
                                        <input onChange={(event) => {
                                            setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                        }} value={personFormData?.AgeBracket} name='AgeBracket' type="text" required />

                                    </div>
                                </div>
                                <div className={style.textareaParent}>
                                    <div className={style.para}>
                                        <p>Main Job Responsibilities</p>
                                    </div>
                                    <div style={{ height: '168px !important' }}>
                                        <textarea onChange={(event) => {
                                            setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                        }} value={personFormData?.MainJobresponsibility} name='MainJobResponsibility' type="text" required />

                                    </div>
                                </div>
                                <div className={style.inputParent}>
                                    <div className={style.para}>
                                        <p>Designation</p>
                                    </div>
                                    <div>
                                        <input onChange={(event) => {
                                            setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                        }} value={personFormData?.Designation} name='Designation' type="text" required />

                                    </div>
                                </div>
                            </div>
                            <div className={style.sec2}>
                                <div className={` ${style.bg} ${style.checksParent}`}>
                                    <div className={style.para}>
                                        <p>Communication Skill</p>
                                    </div>
                                    <div className={style.checks}>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} checked={personFormData?.CommunicationSkill === "High"} name='CommunicationSkill' value="High" style={{ width: '26px', height: '36px' }} type="radio" />
                                            <p className={style.paraind}>High</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} checked={personFormData?.CommunicationSkill === "Medium"} value="Medium" name='CommunicationSkill' style={{ width: '26px', height: '36px' }} type="radio" />
                                            <p className={style.paraind}>Medium</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} checked={personFormData?.CommunicationSkill === "Average"} value="Average" name='CommunicationSkill' style={{ width: '26px', height: '36px' }} type="radio" />
                                            <p className={style.paraind}>Average</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} checked={personFormData?.CommunicationSkill === "Not Applicable"} value="Not Applicable" name='CommunicationSkill' style={{ width: '26px', height: '36px' }} type="radio" />
                                            <p className={style.paraind}>Not Applicable</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={` ${style.bg} ${style.checksParent}`}>
                                    <div className={style.para}>
                                        <p>Computer Skill</p>
                                    </div>
                                    <div className={style.checks}>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} checked={personFormData?.ComputerSkill === "High"} name='ComputerSkill' value="High" style={{ width: '26px', height: '36px' }} type="radio" />
                                            <p className={style.paraind}>High</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} checked={personFormData?.ComputerSkill === "Medium"} name='ComputerSkill' value="Medium" style={{ width: '26px', height: '36px' }} type="radio" />
                                            <p className={style.paraind}>Medium</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} checked={personFormData?.ComputerSkill === "Average"} name='ComputerSkill' value="Average" style={{ width: '26px', height: '36px' }} type="radio" />
                                            <p className={style.paraind}>Average</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} checked={personFormData?.ComputerSkill === "Not Applicable"} name='ComputerSkill' style={{ width: '26px', height: '36px' }} value="Not Applicable" type="radio" />
                                            <p className={style.paraind}>Not Applicable</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={` ${style.bg} ${style.checksParent}`}>
                                    <div className={style.para}>
                                        <p>Justification</p>
                                    </div>
                                    <div className={style.checks}>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} checked={personFormData?.Justification === "New Business Need"} value="New Business Need" name='Justification' style={{ width: '26px', height: '36px' }} type="radio" />
                                            <p className={style.paraind}>New Business Need</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} checked={personFormData?.Justification === "New Structure Need"} name='Justification' value="New Structure Need" style={{ width: '26px', height: '36px' }} type="radio" />
                                            <p className={style.paraind}>New Structure Need</p>
                                        </div>
                                    </div>
                                    <div className={style.checks}>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} checked={personFormData?.Justification === "New Target Requirement"} name='Justification' value="New Target Requirement" style={{ width: '26px', height: '36px' }} type="radio" />
                                            <p className={style.paraind}>New Target Requirment</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} checked={personFormData?.Justification === "Department Extension"} value="Department Extension" name='Justification' style={{ width: '26px', height: '36px' }} type="radio" />
                                            <p className={style.paraind}>Department Extension</p>
                                        </div>
                                    </div>
                                    <div className={style.checks}>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} checked={personFormData?.Justification === "Work Overloaded Sharing"} name='Justification' style={{ width: '26px', height: '36px' }} value="Work Overload Sharing" type="radio" />
                                            <p className={style.paraind}>Work Overload Sharing</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input onChange={(event) => {
                                                setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                            }} checked={personFormData?.Justification === "Employee Resignation"} name='Justification' value="Employee Resignation" style={{ width: '26px', height: '36px' }} type="radio" />
                                            <p className={style.paraind}>Employee Resignation</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={style.inputParentSec2}>
                                    <div className={style.para}>
                                        <p>Others</p>
                                    </div>
                                    <div>
                                        <input onChange={(event) => {
                                            setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                        }} value={personFormData?.others} name='others' type="text" />
                                    </div>
                                </div>
                                <div className={style.inputParentSec2}>
                                    <div className={style.para}>
                                        <p>Request Initiated by</p>
                                    </div>
                                    <div>
                                        <input onChange={(event) => {
                                            setPersonFormData({ ...personFormData, [event.target.name]: event.target.value })
                                        }} value={personFormData?.RequestInitiatedBy} name='RequestInitiatedBy' type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.btn}>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                   <BackBtn />
                </div>
            </div>
            {
                alert ?
                    <div class={style.alertparent}>
                        <div class={style.alert}>
                            <p class={style.msg}>Do you want to submit this information?</p>
                            <div className={style.alertbtns}>
                                <button onClick={() => {
                                    alertManager();
                                    makeRequest();

                                }
                                } className={style.btn1}>Submit</button>


                                <button onClick={alertManager} className={style.btn2}>Cencel</button>

                            </div>
                        </div>
                    </div> : null
            }

        </>
    )
}

export default PersonalRec
