import SideBar from '../../components/sidebar/SideBar'
import style from './AddTrainer.module.css'
import edit from '../../assets/images/addEmployee/edit.svg'
import profile from '../../assets/images/addEmployee/prof.svg'
import ProfileUser from '../../components/profileUser/ProfileUser'
import copyP from '../../assets/images/employeeProfile/CopyP.svg'
import Office from '../../assets/images/employeeProfile/Office.svg'
import msg from '../../assets/images/hrprofile/mail.svg'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import Navbar from '../../components/navbar/Navbar'
import { useRef, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function AddTrainer() {
    const [offcanvas, setOffcanvas] = useState(false)
    const fileInputRef = useRef(null);
    const documentRef = useRef(null);
    const [alert, setalert] = useState(false)
    const [trainerData, setTrainerData] = useState(null);
    const alertManager = () => {
        setalert(!alert)
    }
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = () => {
        fileInputRef.current.click(); // Trigger the click event on the file input
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [selectedDocument, setSelectedDocument] = useState(null);


    const navigate = useNavigate();
    const handleDocumentClick = () => {
        documentRef.current.click();

    };

    const makeRequest = () => {
        if (trainerData !== null) {
            axios.post("/addTrainer", trainerData).then(() => {

                setTrainerData(null);
                console.log("request made !");
                Swal.fire({
                    title: 'Success',
                    text: 'Submitted Successfully',
                    icon: 'success',
                    confirmButtonText: 'Go!',

                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/hr/trainers");
                    }
                })

            }).catch((error) => {

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

    const handleDocumentChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedDocument(file.name);
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
                    <SideBar tab={"trainers"} />
                </div>
                <div className={style.form}>
                    <ProfileUser path='/hr/profile' />
                    <div className={style.headers}>
                        <div className={style.spans}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className={style.para}>
                            Add Trainer
                        </div>

                    </div>
                    <form encType='multipart/form-data' onSubmit={(event) => {
                        event.preventDefault();
                        const data = new FormData(event.target);

                        setTrainerData(data)
                        event.target.reset();


                        alertManager();

                    }}>

                        <div className={style.profile}>
                            <img style={{
                                width: "200px",
                                height: "200px",
                                borderRadius: "360px",
                            }} src={selectedImage || profile} onClick={handleImageClick} alt="" />
                            <div>
                                <img src={edit} onClick={handleImageClick} alt="" />
                            </div>
                            <input
                                type="file"
                                id="file-input"
                                name='TrainerImage'
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className={style.sec1}>
                            <div>
                                <input name='Name' type="text" placeholder='Name here' required />
                                <img style={{ width: '20px', height: '20px', cursor: 'pointer' }} src={profile} alt="" />
                            </div>
                            <div>
                                <input name='Age' type="number" placeholder='Age here' required />
                                <img style={{ width: '20px', height: '20px', cursor: 'pointer' }} src={profile} alt="" />
                            </div>
                            <div>
                                <input name='Email' type="email" placeholder='Email here' required />
                                <img style={{ width: '20px', height: '20px', cursor: 'pointer' }} src={msg} alt="" />
                            </div>
                            <div>
                                <input name='ExperienceYears' type="number" placeholder='Experience here' required />
                                <img style={{ width: '20px', height: '20px', cursor: 'pointer' }} src={Office} alt="" />
                            </div>
                            <div className={style.spec}>
                                <input name='Specialities' type="text" placeholder='Speciality here' />
                                <img style={{ width: '20px', height: '20px', cursor: 'pointer' }} src={copyP} alt="" />
                            </div>
                            <input onChange={handleDocumentChange} name='TrainerDocument' type='file' ref={documentRef} style={{ display: 'none' }} />
                            <div className={style.btns}>

                                <p style={{
                                    padding: "13px 20px",
                                    cursor: 'pointer',
                                    width: "246px",
                                    height: "58px",
                                    flexShrink: "0",
                                    borderRadius: "10px",
                                    border: "1px solid #ee6a5f",
                                    color: "#ee6a5f",
                                    fontSize: "17px",
                                    fontFamily: "Poppins",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "normal",
                                    background: "#fff",
                                }} onClick={() => {
                                    setalert(false);
                                    handleDocumentClick();
                                }}
                                >{selectedDocument?.slice(0, 15) || "Upload Documents"}</p>
                                <button type='submit'>Submit</button>
                            </div>
                        </div>
                    </form>
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

export default AddTrainer
