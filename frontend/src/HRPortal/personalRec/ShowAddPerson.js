import ProfileUser from '../../components/profileUser/ProfileUser'
import style from './ShowAddPersom.module.css'
import SideBar from '../../components/sidebar/SideBar'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import Navbar from '../../components/navbar/Navbar'
import axios from "axios";

function ShowAddPerson() {
    const [offcanvas, setOffcanvas] = useState(false)
    const navigate = useNavigate()
    const { personID } = useParams();
    const [reqPersonData, setReqPersonData] = useState(null);
    console.log(personID);

    useEffect(() => {
        axios.get("/readPersonalRecuisition").then((response) => {

            const reqPersonsList = response.data.data;
            for (let index = 0; index < reqPersonsList.length; index++) {
                if (reqPersonsList[index]._id === personID) {
                    setReqPersonData(reqPersonsList[index])
                }

            }
        })
    })
    return (
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
                                    <p>{reqPersonData?.Station}</p>
                                </div>
                            </div>
                            <div className={style.card1body}>
                                <div className='d-flex justify-content-start align-items-start'>
                                    <p className={style.paraincard}>Job Title</p>
                                </div>
                                <div className={style.inputp}>
                                    <p>{reqPersonData?.JobTitle}</p>
                                </div>
                            </div>
                            <div className={style.card1body}>
                                <div className='d-flex justify-content-start align-items-start'>
                                    <p className={style.paraincard}>Department</p>
                                </div>
                                <div className={style.inputp}>
                                    <p>{reqPersonData?.Department}</p>
                                </div>
                            </div>
                            <div className={style.card1body}>
                                <div className='d-flex justify-content-start align-items-start'>
                                    <p className={style.paraincard}>Section</p>
                                </div>
                                <div className={style.inputp}>
                                    <p>{reqPersonData?.Section}</p>
                                </div>
                            </div>
                            <div className={style.card1body}>
                                <div className='d-flex justify-content-start align-items-start'>
                                    <p className={style.paraincard}>Supervisor</p>
                                </div>
                                <div className={style.inputp}>
                                    <p>{reqPersonData?.Supervisor}</p>
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
                            <div className={style.term}>
                                <p>{reqPersonData?.EmploymentType}</p>
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
                                    <div className='d-flex justify-content-start align-items-start'>
                                        <p className={style.paraincard}>Gross Salary</p>
                                    </div>
                                    <div className={style.inputp}>
                                        <p>{reqPersonData?.GrossSalary}</p>
                                    </div>
                                </div>
                                <div className={style.card1body}>
                                    <div className='d-flex justify-content-start align-items-start'>
                                        <p className={style.paraincard}>Net Salary</p>
                                    </div>
                                    <div className={style.inputp}>
                                        <p>{reqPersonData?.NetSalary}</p>
                                    </div>
                                </div>
                                <div className={style.card1body}>
                                    <div className='d-flex justify-content-start align-items-start'>
                                        <p className={style.paraincard}>Basic Salary</p>
                                    </div>
                                    <div className={style.inputp}>
                                        <p>{reqPersonData?.BasicSalaryDetail}</p>
                                    </div>
                                </div>
                                <div className={style.card1body}>
                                    <div className='d-flex justify-content-start align-items-start'>
                                        <p className={style.paraincard}>Allowence</p>
                                    </div>
                                    <div className={style.inputp}>
                                        <p>{reqPersonData?.AllowanceDetail}</p>
                                    </div>
                                </div>
                                <div className={style.card1body}>
                                    <div className='d-flex justify-content-start align-items-start'>
                                        <p className={style.paraincard}>Incentives</p>
                                    </div>
                                    <div className={style.inputp}>
                                        <p>{reqPersonData?.IncentivesDetail}</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div className={style.btn}>
                    <button onClick={() => {
                        navigate(`/hr/showpersonalrec/${reqPersonData._id}`)
                    }}>Next Page</button>
                </div>
                
            </div>
        </div>
    )
}

export default ShowAddPerson
