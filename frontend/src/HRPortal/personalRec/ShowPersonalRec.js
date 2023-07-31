import ProfileUser from '../../components/profileUser/ProfileUser'
import SideBar from '../../components/sidebar/SideBar'
import style from './ShowPersonalRec.module.css'
import arrow from '../../assets/images/addEmployee/arrow.svg'
import date from '../../assets/images/employeeProfile/Calendar.svg'
import Navbar from '../../components/navbar/Navbar'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"

function ShowPersonalRec() {
    const [offcanvas, setOffcanvas] = useState(false)
    const { personID } = useParams();
    const [reqPersonData, setReqPersonData] = useState(null);
    console.log(personID);
    const navigate = useNavigate()

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
                <div className={style.formDivider}>
                    <div className={style.sec1}>
                        <div className={style.inputParent}>
                            <div className={style.para}>
                                <p>Minimum Qualification Required</p>
                            </div>
                            <div>
                                <p>{reqPersonData?.MiniQualification}</p>

                            </div>
                        </div>
                        <div className={style.inputParent}>
                            <div className={style.para}>
                                <p>Minimum Experience Required</p>
                            </div>
                            <div>
                                <p>{reqPersonData?.MiniExperienced}</p>

                            </div>
                        </div>
                        <div className={style.inputParent}>
                            <div className={style.para}>
                                <p>Industry Specific Experience</p>
                            </div>
                            <div>
                                <p>{reqPersonData?.IndustrySpecificExp}</p>

                            </div>
                        </div>
                        <div className={style.inputParent}>
                            <div className={style.para}>
                                <p>Age Bracket</p>
                            </div>
                            <div>
                                <p>{reqPersonData?.AgeBracket}</p>

                            </div>
                        </div>
                        <div className={style.textareaParent}>
                            <div className={style.para}>
                                <p>Main Job Responsibilities</p>
                            </div>
                            <div style={{ height: '168px !important' }}>
                                <p>{reqPersonData?.MainJobResponsibility}</p>

                            </div>
                        </div>
                        <div className={style.inputParent}>
                            <div className={style.para}>
                                <p>Designation</p>
                            </div>
                            <div>
                                <p>{reqPersonData?.Designation}</p>

                            </div>
                        </div>
                    </div>
                    <div className={style.sec2}>
                        <div className={` ${style.bg} ${style.checksParent}`}>
                            <div className={style.para}>
                                <p>Computer Skill Level</p>
                            </div>
                            <div className={style.term}>
                                <p>{reqPersonData?.ComputerSkill}</p>
                            </div>
                        </div>
                        <div className={` ${style.bg} ${style.checksParent}`}>
                            <div className={style.para}>
                                <p>Communication Skill Level</p>
                            </div>
                            <div className={style.term}>
                                <p>{reqPersonData?.CommunicationSkill}</p>
                            </div>
                        </div>
                        <div className={` ${style.bg} ${style.checksParent}`}>
                            <div className={style.para}>
                                <p>Justification Level</p>
                            </div>
                            <div className={style.term}>
                                <p>{reqPersonData?.Justification}</p>
                            </div>
                        </div>

                        <div className={style.inputParentSec2}>
                            <div className={style.para}>
                                <p>Others</p>
                            </div>
                            <div>
                                <p>{reqPersonData?.Others}</p>
                            </div>
                        </div>
                        <div className={style.inputParentSec2}>
                            <div className={style.para}>
                                <p>Request Initiated by</p>
                            </div>
                            <div>
                                <p>{reqPersonData?.RequestInitiatedBy}</p>
                            </div>
                        </div>
                    </div>
                </div>
                        <div className={style.btn}>
                            <button onClick={() => {
                                navigate(`/hr/showcredentails/${reqPersonData?._id}`)
                            }}>Previous Page</button>
                        </div>

            </div>
        </div>
    )
}

export default ShowPersonalRec
