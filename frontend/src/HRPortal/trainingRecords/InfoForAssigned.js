import style from './Info.module.css'
import ProfileUser from '../../components/profileUser/ProfileUser'
import SideBar from '../../components/sidebar/SideBar'
import clock from '../../assets/images/viewtrainings/Clock.svg'
import star from '../../assets/images/viewtrainings/Star.svg'
import mos from '../../assets/images/viewtrainings/mos.svg'
import copy from '../../assets/images/employeeProfile/CopyP.svg'
import calender from '../../assets/images/employeeProfile/Calendar.svg'
import office from '../../assets/images/employeeProfile/Office.svg'
import cnic from '../../assets/images/employeeProfile/UserCard.svg'
import SidebarForTrainerpor from '../../components/sidebar/SidebarForTrainerpor'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Offcanvas from '../../components/offcanvas/Offcanvas'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import axios from 'axios'
import BackBtn from '../../components/btns/BackBtn'

function Info() {
    const [alert, setalert] = useState(false)
    const alertManager = () => {
        setalert(!alert)
    }
    const navigate = useNavigate()
    const [offcanvas, setOffcanvas] = useState(false);
    const [assignedTrainingData, setAssignedTrainingData] = useState(null);
    const [popUpData, setPopUpData] = useState(null);

    const { assignedTrainingID } = useParams();


    console.log(assignedTrainingID);
    useEffect(() => {
        axios.get("/readMonthlyPlan").then((response) => {
            const assignedTrainingsList = response.data.data;

            for (let index = 0; index < assignedTrainingsList.length; index++) {
                if (assignedTrainingsList[index]._id === assignedTrainingID) {
                    setAssignedTrainingData(assignedTrainingsList[index]);
                    console.log(assignedTrainingData);

                }

            }
        })
    }, [])

    const downloadImages = async () => {
        console.log("downloadImages");
        console.log(assignedTrainingData?.Images);

        const images = assignedTrainingData?.Images
        for (let index = 0; index < images.length; index++) {
          await handleDownload(images[index]);


        }

    }


    const handleDownload = async (fileUrl) => {
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
            setPopUpData("File not Uploaded.")
            setalert(true);
        }
    };


    return (
        <>

            <div className={style.parent}>
                <div className={style.sidebar}>
                    <Navbar func={() => {
                        setOffcanvas(!offcanvas)
                    }} />
                    <HROffcanvas status={offcanvas} />
                    <SideBar tab={"trainingRecords"} />
                </div>
                <ProfileUser path='/hr/profile' />
                <div className={style.subparent}>
                    <p className={style.headingtxt}>Training Information</p>
                    <div className={style.cardParent}>
                        <div className={style.card1headers}>
                            <div>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div>
                                <p>Info</p>
                            </div>
                        </div>
                        <div className={style.cardbody}>
                            <div className={style.sec1} >
                                <div>
                                    <img src={calender} alt="" />
                                    <div>
                                        <p className={style.card1para}>Plan Date</p>
                                        <p className={style.card1para2}>{assignedTrainingData?.Date.slice(0, 10).split('-')[2]}-{assignedTrainingData?.Date.slice(0, 10).split('-')[1]}-{assignedTrainingData?.Date.slice(0, 10).split('-')[0]}</p>
                                    </div>
                                </div>
                                {assignedTrainingData?.ActualDate !== null && (

                                    <div>
                                        <img src={calender} alt="" />
                                        <div>
                                            <p className={style.card1para}>Actual Date</p>
                                            <p className={style.card1para2}>{assignedTrainingData?.ActualDate.slice(0, 10).split('-')[2]}-{assignedTrainingData?.ActualDate.slice(0, 10).split('-')[1]}-{assignedTrainingData?.ActualDate.slice(0, 10).split('-')[0]}</p>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <img src={clock} alt="" />
                                    <div>
                                        <p className={style.card1para}>Time</p>
                                        <p className={style.card1para2}>{assignedTrainingData?.Time}</p>
                                    </div>
                                </div>
                                <div>
                                    <img src={star} alt="" />
                                    <div>
                                        <p className={style.card1para}>Month Name</p>
                                        <p className={style.card1para2}>{assignedTrainingData?.Month}</p>
                                    </div>
                                </div>
                                <div>
                                    <img src={star} alt="" />
                                    <div>
                                        <p className={style.card1para}>Description</p>
                                        <p onClick={() => {
                                            setPopUpData(assignedTrainingData?.Training[0].Description);
                                            alertManager();
                                        }
                                        } className={style.bluetxt}>View</p>
                                    </div>
                                </div>


                            </div>
                            <div className={style.sec2} >
                                <div>
                                    <img src={mos} alt="" />
                                    <div>
                                        <p className={style.card1para}>Venue </p>
                                        <p className={style.card1para2}>{assignedTrainingData?.Venue}</p>
                                    </div>
                                </div>
                                <div>
                                    <img src={cnic} alt="" />
                                    <div>
                                        <p className={style.card1para}>Evaluation Criteriaa</p>
                                        <p onClick={() => {
                                            setPopUpData(assignedTrainingData?.Training[0].EvaluationCriteria);
                                            alertManager();
                                        }} className={style.bluetxt}>View</p>
                                    </div>
                                </div>
                                <div>
                                    <img src={copy} alt="" />
                                    <div>
                                        <p className={style.card1para}>Internal/External</p>
                                        <p className={style.card1para2}>{assignedTrainingData?.InternalExternal}</p>
                                    </div>
                                </div>

                                <div>
                                    <img src={office} alt="" />
                                    <div>
                                        <p className={style.card1para}>Trainer Name</p>
                                        <p className={style.card1para2}>{assignedTrainingData?.Trainer[0].Name}</p>
                                    </div>
                                </div>
                                <div>
                                    <img src={cnic} alt="" />
                                    <div>
                                        <p className={style.card1para}>Training Status</p>
                                        <p className={style.redtxt}>{assignedTrainingData?.TrainingResultStatus}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.cardsBtn}>
                            <div className={style.cardbtn1}><p className={style.btntxt}>Images</p><button onClick={downloadImages}  >Download</button></div>
                            <div className={style.cardbtn2}><p className={style.btntxt}>Training Material</p><button onClick={() => {
                                handleDownload(assignedTrainingData?.Training[0].TrainingMaterial);


                            }}>Download</button></div>

                        </div>
                    </div>


                    <div className={style.bottomside}>
                        <p className={style.bheading}>Employess who are getting trained</p>
                        <button onClick={() => {
                            navigate(`/hr/trainedemployees/${assignedTrainingData?._id}`)
                        }} className={style.bottombtn}>Click Here</button>

                    </div>
<BackBtn />
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

export default Info
