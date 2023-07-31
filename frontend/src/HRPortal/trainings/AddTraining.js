import SideBar from '../../components/sidebar/SideBar'
import style from './AddTraining.module.css'
import office from '../../assets/images/employeeProfile/Office.svg'
import copyp from '../../assets/images/employeeProfile/CopyP.svg'
import cnic from '../../assets/images/employeeProfile/UserCard.svg'
import ProfileUser from '../../components/profileUser/ProfileUser'
import { useRef, useState } from 'react'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import Navbar from '../../components/navbar/Navbar'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function AddTraining() {
    const [offcanvas, setOffcanvas] = useState(false)
    const [alert, setalert] = useState(false);
    const [trainingData, setTrainingData] = useState(null);
    const alertManager = () => {
        setalert(!alert)
    }
    const navigate = useNavigate();

    const documentRef = useRef(null);
    const [selectedDocument, setSelectedDocument] = useState(null);

    const handleDocumentClick = () => {
        documentRef.current.click(); // Trigger the click event on the file input
    };

    const handleDocumentChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedDocument(file.name);
        }
    };

    const makeRequest = () => {
        if (trainingData) {
            console.log(trainingData);
            axios.post("/addTraining", trainingData).then(() => {

                console.log("request made !");
                setTrainingData(null);
                Swal.fire({
                    title: 'Success',
                    text: 'Submitted Successfully',
                    icon: 'success',
                    confirmButtonText: 'Go!',
                  
                  }).then( (result ) => {
                    if (result.isConfirmed) {
                        
                        navigate("/hr/trainingsref");
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


    return (
        <>

            <div className={style.parent}>
                <div className={style.sidebar}>
                    <Navbar func={() => {
                        setOffcanvas(!offcanvas)
                    }} />
                    <HROffcanvas status={offcanvas} />
                    <SideBar tab={"trainings"} />
                </div>
                <ProfileUser path='/hr/profile' />
                <div className={style.form}>
                    <div className={style.headers}>
                        <div className={style.spans}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className={style.para}>
                            Add Training
                        </div>

                    </div>
                    <div className={style.sec1}>
                        <form encType='multipart/form-data' onSubmit={(event) => {
                            event.preventDefault();
                            const data = new FormData(event.target);
                            setTrainingData(data);
                            alertManager();
                        }}>

                            <div>
                                <p>Training Name</p>
                                <div>
                                    <img src={office} alt="" />
                                    <input name='TrainingName' type="text" required />
                                </div>
                            </div>
                            <div>
                                <p>Description</p>
                                <div>
                                    <img src={copyp} alt="" />
                                    <textarea name='Description' className={style.fortextarea} type="text" required />
                                </div>
                            </div>
                            <div>
                                <p>Evaluation Criteria</p>
                                <div>
                                    <img src={cnic} alt="" />
                                    <textarea name='EvaluationCriteria' className={style.fortextarea} type="text" required />
                                </div>
                            </div>
                            <input onChange={handleDocumentChange} name='TrainingMaterial' type='file' ref={documentRef} style={{ display: 'none' }} />
                            <div className={style.btns}>
                                <p  style={{
                                    padding : "13px 20px", 
                                    cursor : 'pointer',
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
                                }} onClick={handleDocumentClick}>{selectedDocument?.slice(0, 15) || "Training Material"}</p>
                                <button type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>
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
                                }} className={style.btn1}>Submit</button>
                                <button onClick={alertManager} className={style.btn2}>Cencel</button>

                            </div>
                        </div>
                    </div> : null
            }
        </>
    )
}

export default AddTraining
