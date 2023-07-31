import SideBar from '../../components/sidebar/SideBar'
import user from '../../assets/images/hrprofile/user.svg'
import selectImg from '../../assets/images/hrprofile/selectImg.svg'
import mail from '../../assets/images/hrprofile/mail.svg'
import Phone from '../../assets/images/employeeProfile/Phone.svg'
import copyp from '../../assets/images/employeeProfile/CopyP.svg'
import Location from '../../assets/images/employeeProfile/Location.svg'
import Office from '../../assets/images/employeeProfile/Office.svg'
import UserCard from '../../assets/images/employeeProfile/UserCard.svg'
import Calendar from '../../assets/images/employeeProfile/Calendar.svg'
import man from '../../assets/images/hrprofile/man.svg'
import { useEffect, useState } from 'react'
import style from '../HRProfile/HRProfile.module.css'
import style2 from './EmployeeProfile.module.css'
import ProfileUser from '../../components/profileUser/ProfileUser'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import BackBtn from '../../components/btns/BackBtn'
import profile from '../../assets/images/addEmployee/prof.svg'


function EmployeeProfile() {
    const [offcanvas, setOffcanvas] = useState(false)
    const [plannedTrainings, setPlannedTrainings] = useState(null);
    const [employeeData, setEmployeeData] = useState(null);
    const { employeeID } = useParams();

    const navigate = useNavigate();


    useEffect(() => {
        axios.get("/readEmployee").then((Response) => {
            const employeesList = Response.data.data;
            console.log(employeesList);
            for (let index = 0; index < employeesList.length; index++) {
                if (employeesList[index]._id === employeeID) {
                    setEmployeeData(employeesList[index]);
                }

            }

        })
    }, []);
    const [showIcon, setShowIcon] = useState(false)


    useEffect(() => {
        axios.get("/readMonthlyPlan").then((Response) => {
            const trainings = Response.data.data;
            console.log(trainings);
            setPlannedTrainings(trainings);

        })
    }, []);

    function findtrainingIndex(trainingId) {
        if (plannedTrainings) {

            for (let i = 0; i < plannedTrainings.length; i++) {
                if (plannedTrainings[i]._id === trainingId) {
                    return i; // Return the index if property value is found

                }
            }
        }
        return null; // Return null if property value is not found in any object
    }

    const [popUpData, setPopUpData] = useState(null);
    const [showBox, setShowBox] = useState(false);


    const handleDownload = (fileUrl) => {
        if (fileUrl) {

            const link = document.createElement('a');
            link.href = fileUrl;

            // Extracting the file name from the URL
            const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);

            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            setPopUpData("File not Uploaded");
            setShowBox(true);
        }
    };








    return (
        <>

            <div className={style.parent}>
                <div className={`${style.sidebar}`}>
                    <Navbar func={() => {
                        setOffcanvas(!offcanvas)
                    }} />
                    <SideBar tab={"employees"} />
                    <HROffcanvas status={offcanvas} />
                </div>
                <div className={style.profile}>
                    <ProfileUser path='/hr/profile' />
                    <p>Employee Profile</p>
                    <div className={style.hrInfo}>
                        <div>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div>
                            <p>{employeeData?.EmployeeName}</p>
                            <p>{employeeData?.Designation}</p>
                        </div>
                        <div >
                            <img style={{
                                backgroundColor : 'white'
                            }} src={showIcon ? profile : employeeData?.EmployeeImage} onError={(e) => {
                               setShowIcon(true)
                            }} alt="" />
                        </div>

                    </div>
                    <div className={style2.cardParent}>
                        <div className={style2.card1}>
                            <div className={style2.card1headers}>
                                <div>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div>
                                    <p>Info</p>
                                </div>
                            </div>
                            <div className={style2.card1body}>
                                <div>


                                    <div>
                                        <img src={man} alt="" />
                                        <div>
                                            <p className={style2.card1para}>Name</p>
                                            <p className={style2.card1para2}>{employeeData?.EmployeeName}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={mail} alt="" />
                                        <div>
                                            <p className={style2.card1para}>Email</p>
                                            <p className={style2.card1para2}>{employeeData?.Email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={Phone} alt="" />
                                        <div>
                                            <p className={style2.card1para}>Phone</p>
                                            <p className={style2.card1para2}>{employeeData?.PhoneNumber}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={Office} alt="" />
                                        <div>
                                            <p className={style2.card1para}>Department</p>
                                            <p className={style2.card1para2}>{employeeData?.Department}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={Office} alt="" />
                                        <div>
                                            <p className={style2.card1para}>Designation</p>
                                            <p className={style2.card1para2}>{employeeData?.Designation}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <img src={Calendar} alt="" />
                                        <div>
                                            <p className={style2.card1para}>Date Of Birth</p>
                                            <p className={style2.card1para2}>{employeeData?.DateOfBirth.slice(0, 10).split('-')[2]}-{employeeData?.DateOfBirth.slice(0, 10).split('-')[1]}-{employeeData?.DateOfBirth.slice(0, 10).split('-')[0]}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={UserCard} alt="" />
                                        <div>
                                            <p className={style2.card1para}>CNIC</p>
                                            <p className={style2.card1para2}>{employeeData?.CNIC}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={copyp} alt="" />
                                        <div>
                                            <p className={style2.card1para}>Qualification</p>
                                            <p className={style2.card1para2}>{employeeData?.Qualification}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={Location} alt="" />
                                        <div>
                                            <p className={style2.card1para}>Address</p>
                                            <p className={style2.card1para2}>{employeeData?.Address}</p>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className={style2.card2}>
                            <table className={style2.table}>
                                <tr>
                                    <th className={style2.tableheader}>
                                        <td>Serial #</td>
                                        <td>Training Name</td>
                                        <td>Details</td>
                                    </th>
                                </tr>
                                {
                                    employeeData?.EmployeeData?.map((data, i) => {
                                        return (
                                            <tr key={i}>
                                                <tb className={style2.tablebody}>
                                                    <td className={style2.index}>{i + 1}</td>
                                                    {plannedTrainings && (
                                                        <>


                                                            <td className={style2.training}>{plannedTrainings[findtrainingIndex(data.Training)]?.Training[0].TrainingName}</td>
                                                            <td onClick={() => { navigate(`/hr/trainedemployees/${data.Training}`) }} className={style2.clicker}>Details</td>
                                                        </>
                                                    )}
                                                </tb>
                                            </tr>
                                        )
                                    })
                                }

                            </table>
                            <div className={style2.btns}>
                                <button ><a onClick={() => {
                                    if (!employeeData?.EmployeeCV) {
                                        setPopUpData("File not Uploaded");
                                        setShowBox(true);
                                    }
                                }} style={{

                                    textDecoration: "none"
                                }} href={employeeData?.EmployeeCV} target="_blank">Print</a></button>



                                <button onClick={() => {

                                    handleDownload(employeeData?.EmployeeCV)

                                }}>Download Info</button>





                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {
                showBox ?
                    <div style={{
                        width: "100%",
                        height: "100vh",
                        position: "fixed",
                        top: "0%",
                        left: "0%",
                        zIndex: "10",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "rgba(217, 217, 217, 0.7)",
                    }}>
                        <div style={{
                            width: "438px",
                            height: "224px",
                            flexShrink: "0",
                            borderRadius: "10px",
                            background: "#fff",
                        }}>
                            <p style={{
                                marginTop: "25px",
                                marginLeft: "37px",
                                color: "#000",
                                fontFamily: "Poppins",
                                fontSize: "17px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "normal",
                            }}>{popUpData}</p>
                            <div style={{
                                marginTop: "84px",
                                marginLeft: "190px",
                            }}>

                                <button style={{
                                    width: "95px",
                                    height: "38px",
                                    flexShrink: "0",
                                    borderRadius: "10px",
                                    color: "#ee6a5f",
                                    background: "#fff",
                                    border: "1px solid #ee6a5f",
                                    fontFamily: "Poppins",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    marginLeft: "28px",
                                    lineHeight: "normal",

                                }} onClick={() => {
                                    setShowBox(false);
                                }} className={style.btn2}>OK.</button>

                            </div>
                        </div>
                    </div> : null
            }
        </>
    )
}

export default EmployeeProfile
