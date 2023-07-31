import SideBar from '../../components/sidebar/SideBar'
import style from './AddEmployees.module.css'
import edit from '../../assets/images/addEmployee/edit.svg'
import profile from '../../assets/images/addEmployee/prof.svg'
import mail from '../../assets/images/hrprofile/mail.svg'
import Phone from '../../assets/images/employeeProfile/Phone.svg'
import copyp from '../../assets/images/employeeProfile/CopyP.svg'
import Location from '../../assets/images/employeeProfile/Location.svg'
import UserCard from '../../assets/images/employeeProfile/UserCard.svg'
import arrow from '../../assets/images/addEmployee/arrow.svg'
import man from '../../assets/images/hrprofile/man.svg'
import ProfileUser from '../../components/profileUser/ProfileUser'
import { useRef, useState } from 'react'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import Navbar from '../../components/navbar/Navbar'
import Calendar from '../../assets/images/employeeProfile/Calendar.svg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function AddEmployees() {
    const [offcanvas, setOffcanvas] = useState(false)
    const [alert, setalert] = useState(false)
    const alertManager = () => {
        setalert(!alert)
    }
    const fileInputRef = useRef(null);
    const documentRef = useRef(null);
    const [employeeData, setEmployeeData] = useState(null);
    const [phone, setPhone] = useState(null);
    const [CNIC, setCNIC] = useState(null);




    const handleImageClick = () => {
        fileInputRef.current.click(); // Trigger the click event on the file input
    };
    const handleDocumentClick = () => {
        setalert(false)
        documentRef.current.click(); // Trigger the click event on the file input
    };
    const navigate = useNavigate();
    const [dataError, setDataError] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState(null);

    const makeRequest = () => {
        if (employeeData) {

            axios.post("/addEmployee", employeeData).then((response) => {

                console.log("request made !");
                setEmployeeData(null);

                Swal.fire({
                    title: 'Success',
                    text: 'Submitted Successfully',
                    icon: 'success',
                    confirmButtonText: 'Go!',
                   
                  }).then( (result ) => {
                    if (result.isConfirmed) {
                        
                        // navigate("/hr/employees");
                    }
                  })

                  console.log(response);

                

            }).catch((error)=>{
                if(error.response.status === 400){                  
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.message,
                        confirmButtonText: 'OK.'                        
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Try filling data again',
                        confirmButtonText: 'OK.'
                      })

                }
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
                    <SideBar tab={"employees"} />
                    <HROffcanvas status={offcanvas} />
                </div>
                <div className={style.addEmployee}>
                    <ProfileUser path='/hr/profile' />
                    <div className={style.form}>
                        <div className={style.headers}>
                            <div className={style.spans}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className={style.para}>
                                Add&nbsp;Employee
                            </div>

                        </div>
                        <form encType='multipart/form-data' onSubmit={(event) => {
                            event.preventDefault();


                            if (phone.length !== 11 && CNIC.length !== 13) {
                                setDataError(true);
                            } else {

                                const data = new FormData(event.target);

                                setEmployeeData(data);
                                alertManager();
                            }
                        }}>

                            <div  className={style.profile}>
                                <img style={{
                                width : "200px",
                                height : "200px",
                                borderRadius : "360px",
                            }} src={selectedImage || profile} alt="" onClick={handleImageClick} />
                                <div>
                                    <img src={edit} alt="" onClick={handleImageClick} />
                                </div>
                                <input
                                    type="file"
                                    id="file-input"
                                    name='Image'
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className={style.userform}>
                                <div className={style.sec1}>
                                    <div>
                                        <input name='EmployeeName' type="text" placeholder='Name* here' required />
                                        <img src={man} alt="" />
                                    </div>
                                    <div>
                                        <input id='phoneNumber' onChange={(event) => {
                                            setPhone(event.target.value);
                                        }} name='PhoneNumber' type="number" placeholder='Phone Number* (11 digits)' required />
                                        <img src={Phone} alt="" />
                                    </div>
                                    <div>
                                        <input name='Email' type="email" placeholder='Email* here' required />
                                        <img src={mail} alt="" />
                                    </div>
                                    <div>
                                        <input id='CNIC' onChange={(event) => {
                                            setCNIC(event.target.value);
                                        }} name='CNIC' type="number" placeholder='CNIC* (without dashes"-")' required />
                                        <img src={UserCard} alt="" />
                                    </div>
                                    <div>
                                        <input name='Qualification' type="text" placeholder='Qualification* here' required />
                                        <img src={copyp} alt="" />
                                    </div>
                                </div>
                                <div className={style.sec2}>
                                    <div>
                                        <select name='Department' style={{ width: "100%" }} required>
                                            <option value="" selected disabled>Choose Department*</option>
                                            <option value="Department 1">Department 1</option>
                                            <option value="Department 2">Department 2</option>
                                            <option value="Department 3">Department 3</option>
                                        </select>
                                        {/* <div className={style.indicator}>
                                            <img src={man} alt="" />
                                            <div>
                                                <img src={arrow} alt="" />
                                            </div>
                                        </div> */}
                                    </div>
                                    <div>
                                        <input name='Address' type="text" placeholder='Address* here' />
                                        <img src={Location} alt="" required />
                                    </div>
                                    <div>
                                        <input name='Designation' type="text" placeholder='Designation* here' required />
                                        <div className={style.indicator}>
                                            <img src={mail} alt="" />
                                            {/* <div>
                                                <img src={arrow} alt="" />
                                            </div> */}
                                        </div>
                                    </div>
                                    <div><p style={{
                                        marginLeft: "20px"
                                    }}>Date of Birth :</p>
                                        <input name='DateOfBirth' type="date" style={{
                                            width: "50%"
                                        }} placeholder='Date of Birth*' required />

                                    </div>
                                    <input onChange={handleDocumentChange} name='CV' type='file' ref={documentRef} style={{ display: 'none' }} />
                                    <div >

                                        <p className={style.pbtn} onClick={() => {
                                            handleDocumentClick();
                                            setalert(false);
                                        }}>{ selectedDocument?.slice(0, 15)  || "Upload Documents"}</p>
                                        <div className={style.btns}>
                                            <button type='submit'>Submit</button>
                                        </div>
                                    </div>


                                </div>

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

                                }
                                } className={style.btn1}>Submit</button>


                                <button onClick={alertManager} className={style.btn2}>Cencel</button>

                            </div>
                        </div>
                    </div> : null
            }
            {
                dataError ?
                    <div class={style.alertparent}>
                        <div class={style.alert}>
                            <p class={style.msg}>Please enter a valid information. Check phone Number digits and CNIC.</p>
                            <div className={style.alertbtns}>
                                <button onClick={() => {
                                    setDataError(false);


                                }
                                } className={style.btn1}>Ok.</button>




                            </div>
                        </div>
                    </div> : null
            }

        </>
    )
}

export default AddEmployees
