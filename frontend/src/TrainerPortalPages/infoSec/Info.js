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
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Offcanvas from '../../components/offcanvas/Offcanvas'
import axios from 'axios'
import BackBtn from '../../components/btns/BackBtn'
import Swal from 'sweetalert2'

function Info() {
    const [alert, setalert] = useState(false)
    const alertManager = () => {
        setalert(!alert)
    }
    const [popUpData, setPopUpData] = useState(null);
    const navigate = useNavigate()
    const [offcanvas, setOffcanvas] = useState(false)
    const [assignedTrainingToShow, setassignedTrainingToShow] = useState(null);
    const fileInputRef = useRef(null);

    const { assignedTrainingId } = useParams();
    useEffect(() => {
        axios.get("/readMonthlyPlan").then((response) => {
            const assignedTrainingsList = response.data.data;

            for (let index = 0; index < assignedTrainingsList.length; index++) {
                if (assignedTrainingsList[index]._id === assignedTrainingId) {
                    setassignedTrainingToShow(assignedTrainingsList[index]);
                }

            }
        })
    }, [])
    const [alert2, setAlert2] = useState(false);
    const [images, setImages] = useState(null);
    const handleImageClick = () => {

        fileInputRef.current.click(); // Trigger the click event on the file input
    };





    const handleImageChange = (event) => {
        console.log(event.target.files);



        setImages(Array.from(event.target.files))
        setAlert2(true);



    };

    const makeRequest = () => {
        if (images) {

            const formData = new FormData();
            formData.append("planId", assignedTrainingId);
            images.forEach((image, index) => {
                formData.append("Images", image); // Use the correct field name "Images"
            });


           console.log(formData);
            axios.patch("/upload-images", formData).then(() => {
                console.log("request made !");

                Swal.fire({
                    title: 'Success',
                    text: 'Images Uploaded successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok.',
                })
            }).catch((error) => {

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Try Uplaoding Images Again',
                    confirmButtonText: 'OK.'

                })
            })
            setImages(null);
            document.getElementById("imagesInput").value = null;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Try Uploading Images Again',
                confirmButtonText: 'OK.'
            })
        }
    }


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
            setPopUpData("File not Uploaded.")
            setalert(true);
        }
    };
    console.log(assignedTrainingToShow);
    return (
        <>

            <div className={style.parent}>
                <div className={style.sidebar}>
                    <Navbar func={() => {
                        setOffcanvas(!offcanvas)
                    }} />
                    <Offcanvas status={offcanvas} />
                    <SidebarForTrainerpor tab={assignedTrainingToShow?.TrainingResultStatus !== "Conducted" ? (
                        "pendingTasks"
                    ) : (
                        "completedTasks"
                    )} />
                </div>
                <ProfileUser path='/trainer/profile' />
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
                                        <p className={style.card1para2}>{assignedTrainingToShow?.Date.slice(0, 10).split('-')[2]}-{assignedTrainingToShow?.Date.slice(0, 10).split('-')[1]}-{assignedTrainingToShow?.Date.slice(0, 10).split('-')[0]}</p>
                                    </div>
                                </div>
                                {assignedTrainingToShow?.ActualDate && (

                                    <div>
                                        <img src={calender} alt="" />
                                        <div>
                                            <p className={style.card1para}>Actual Date</p>
                                            <p className={style.card1para2}>{assignedTrainingToShow?.ActualDate.slice(0, 10).split('-')[2]}-{assignedTrainingToShow?.ActualDate.slice(0, 10).split('-')[1]}-{assignedTrainingToShow?.ActualDate.slice(0, 10).split('-')[0]}</p>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <img src={clock} alt="" />
                                    <div>
                                        <p className={style.card1para}>Time</p>
                                        <p className={style.card1para2}>{assignedTrainingToShow?.Time}</p>
                                    </div>
                                </div>
                                <div>
                                    <img src={star} alt="" />
                                    <div>
                                        <p className={style.card1para}>Month Name</p>
                                        <p className={style.card1para2}>{assignedTrainingToShow?.Month}</p>
                                    </div>
                                </div>
                                <div>
                                    <img src={star} alt="" />
                                    <div>
                                        <p className={style.card1para}>Description</p>
                                        <p onClick={() => {
                                            setPopUpData(assignedTrainingToShow?.Training[0].Description);
                                            alertManager();
                                        }} className={style.bluetxt}>View</p>
                                    </div>
                                </div>


                            </div>
                            <div className={style.sec2} >
                                <div>
                                    <img src={mos} alt="" />
                                    <div>
                                        <p className={style.card1para}>Venue </p>
                                        <p className={style.card1para2}>{assignedTrainingToShow?.Venue}</p>
                                    </div>
                                </div>
                                <div>
                                    <img src={cnic} alt="" />
                                    <div>
                                        <p className={style.card1para}>Evaluation Criteriaa</p>
                                        <p onClick={() => {
                                            setPopUpData(assignedTrainingToShow?.Training[0].EvaluationCriteria)
                                            alertManager();

                                        }
                                        } className={style.bluetxt}>View</p>
                                    </div>
                                </div>
                                <div>
                                    <img src={copy} alt="" />
                                    <div>
                                        <p className={style.card1para}>Internal/External</p>
                                        <p className={style.card1para2}>{assignedTrainingToShow?.InternalExternal}</p>
                                    </div>
                                </div>

                                <div>
                                    <img src={office} alt="" />
                                    <div>
                                        <p className={style.card1para}>Trainer Name</p>
                                        <p className={style.card1para2}>{assignedTrainingToShow?.Trainer[0].Name}</p>
                                    </div>
                                </div>
                                <div>
                                    <img src={cnic} alt="" />
                                    <div>
                                        <p className={style.card1para}>Training Status</p>
                                        <p onClick={() => {
                                            navigate(`/trainer/trainings/${assignedTrainingToShow?._id}`)
                                        }} style={assignedTrainingToShow?.TrainingResultStatus === "Conducted" ? {
                                            color: "green",
                                        } : {
                                            color: "red"
                                        }}><b>{assignedTrainingToShow?.TrainingResultStatus}</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.cardsBtn}>
                            <input
                                type="file"
                                id="imagesInput"
                                name='Image'
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                multiple
                            />
                            <div className={style.cardbtn1}><p className={style.btntxt}>Images</p><button onClick={handleImageClick}>Upload</button></div>
                            <div className={style.cardbtn2}><p className={style.btntxt}>Training Material</p><button onClick={() => {
                                handleDownload(assignedTrainingToShow?.Training[0].TrainingMaterial)
                            }}>Download</button></div>

                        </div>
                    </div>
                    <div className={style.bottomside}>
                        <p className={style.bheading}>Employess who are getting trained</p>
                        <button onClick={() => {
                            navigate(`/trainer/trainings/${assignedTrainingToShow?._id}`)
                        }} className={style.bottombtn}>Click Here</button>

                    </div>

                </div >
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
            {
                alert2 ?
                    <div class={style.alertparent}>
                        <div class={style.alert}>
                            <p class={style.msg}>Do you want to Upload images ?</p>
                            <div className={style.alertbtns}>
                                <button onClick={() => {
                                    setAlert2(false);
                                    makeRequest();

                                }
                                } className={style.btn1}>Submit</button>


                                <button onClick={() => {
                                    setAlert2(false);
                                }} className={style.btn2}>Cancel</button>

                            </div>
                        </div>
                    </div> : null
            }
        </>
    )
}

export default Info
