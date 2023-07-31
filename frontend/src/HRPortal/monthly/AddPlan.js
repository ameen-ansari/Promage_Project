import ProfileUser from '../../components/profileUser/ProfileUser'
import SideBar from '../../components/sidebar/SideBar'
import style from './AddPlan.module.css'
import arrow from '../../assets/images/addEmployee/arrow.svg'
import date from '../../assets/images/employeeProfile/Calendar.svg'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import Navbar from '../../components/navbar/Navbar'
import { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function AddPlan() {
    const [offcanvas, setOffcanvas] = useState(false);
    const [planData, setPlanData] = useState(null);
    const [alert, setalert] = useState(false);
    const [trainings, setTrainings] = useState(null);
    const [trainers, setTrainers] = useState(null);



    const alertManager = () => {
        setalert(!alert)
    }

    useEffect(() => {
        axios.get("/readTraining").then((response) => {
            setTrainings(response.data.data);
        });

        axios.get("/readTrainer").then((response) => {
            setTrainers(response.data.data);
        })
    }, [])
    const navigate = useNavigate();

    const makeRequest = () => {
        if (planData) {
            console.log(planData);
            axios.post("/addMonthlyPlan", planData).then(() => {
                console.log("request made !");
                setPlanData(null);


                Swal.fire({
                    title: 'Success',
                    text: 'Submitted Successfully',
                    icon: 'success',
                    confirmButtonText: 'Go!',

                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
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
    const [time, setTime] = useState({
        startTime: '',
        endTime: ''
    });

    const handleTimeConversion = (event) => {
        const timeInput = event.target.value;
        const timeParts = timeInput.split(":");
        let hours = parseInt(timeParts[0], 10);
        const minutes = timeParts[1];
        const amPm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;

        const timeIn12HourFormat = `${hours}:${minutes}${amPm}`;

        setTime({ ...time, [event.target.name]: timeIn12HourFormat })
    };

    const months = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    return (
        <>
            <div className={style.parent}>
                <div className={style.sidebar}>
                    <Navbar func={() => {
                        setOffcanvas(!offcanvas)
                    }} />
                    <HROffcanvas status={offcanvas} />
                    <SideBar tab={"monthlyPlans"} />
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
                            Add Monthly Plan
                        </div>
                    </div>
                    <form encType='multipart/form-data' onSubmit={(event) => {
                        event.preventDefault();
                        const formData = new FormData(event.target);
                        const formDataObject = {};

                        for (let [key, value] of formData.entries()) {
                            formDataObject[key] = value;
                        }

                        formDataObject.Trainer = JSON.parse(formDataObject.Trainer);
                        formDataObject.Training = JSON.parse(formDataObject.Training);
                        formDataObject.Time = time.startTime + " " + " to " + " " + time.endTime

                        console.log(formDataObject);

                        setPlanData(formDataObject);
                        alertManager();


                    }}>
                        <div className={style.formDivider}>
                            <div className={style.sec1}>
                                <div className={style.inputParent}>
                                    <div className={style.para}>
                                        <p>Month Name</p>
                                    </div>
                                    <div>
                                        <select style={{ width: "100%" }} name='Month' required>
                                            <option value="" selected disabled>Choose Month</option>
                                            {months.map((month) => {


                                                return (
                                                    <option value={month}>{month}</option>
                                                )
                                            })}
                                        </select>

                                    </div>
                                </div>

                                <div className={style.inputParent}>
                                    <div className={style.para}>
                                        <p>Start time : </p>

                                    </div>
                                    <div>
                                        <input onChange={handleTimeConversion} name='startTime' type="time" placeholder='(e.g) 9:00 AM to 6:00 PM' required />


                                    </div>
                                </div>
                                <div className={style.inputParent}>

                                    <div className={style.para}>
                                        <p>End time : </p>

                                    </div>
                                    <div>
                                        <input onChange={handleTimeConversion} name='endTime' type="time" placeholder='(e.g) 9:00 AM to 6:00 PM' required />


                                    </div>

                                </div>

                                <div className={style.inputParent}>
                                    <div className={style.para}>
                                        <p>Training</p>
                                    </div>
                                    <div>
                                        <select name='Training' style={{ width: "100%" }} required>
                                            <option value="" selected disabled>Choose Training</option>
                                            {trainings?.map((training) => {

                                                return (

                                                    <option value={JSON.stringify(training)}>{training.TrainingName}</option>
                                                )
                                            })}
                                        </select>

                                    </div>
                                </div>
                                <div className={style.inputParent}>
                                    <div className={style.para}>
                                        <p>Department</p>
                                    </div>
                                    <div>
                                        <select name='Department' style={{ width: "100%" }} required >
                                            <option value="" selected disabled>Choose Department</option>
                                            <option value="Department 1">Department 1</option>
                                            <option value="Department 2">Department 2</option>
                                            <option value="Department 3">Department 3</option>

                                        </select>

                                    </div>
                                </div>
                                <div className={style.inputParent}>
                                    <div className={style.para}>
                                        <p>Trainer</p>
                                    </div>
                                    <div>
                                        <select name='Trainer' style={{ width: "100%" }} required >
                                            <option value="" selected disabled>Choose Trainer</option>
                                            {trainers?.map((trainer) => {

                                                return (

                                                    <option key={trainer._id} value={JSON.stringify(trainer)}>{trainer.Name}</option>
                                                )
                                            })}
                                        </select>

                                    </div>
                                </div>
                            </div>
                            <div className={style.sec2}>
                                <div className={style.inputParent}>
                                    <div className={style.para}>
                                        <p>Venue</p>
                                    </div>
                                    <div>
                                        <input name='Venue' type="text" placeholder='(e.g) Training Hall' required />

                                    </div>
                                </div>
                                <div className={style.inputParent}>
                                    <div className={style.para}>
                                        <p>Duration</p>
                                    </div>
                                    <div>
                                        <input name='Duration' type="text" placeholder='(e.g) 2 Days' required />

                                    </div>
                                </div>
                                <div className={style.inputParent}>
                                    <div className={style.para}>
                                        <p>Date</p>
                                    </div>
                                    <div>
                                        <input name='Date' type="date" required />

                                    </div>
                                </div>
                                <div className={`${style.checkinputParent} ${style.bg}`}>
                                    <div className={style.para}>
                                        <p>Internal/External</p>
                                    </div>
                                    <div className={style.dropdown}>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input name='InternalExternal' style={{ width: '26px', height: '36px' }} value="Internal" type="radio" required />
                                            <p className={style.paraind}>Internal</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center gap-2' >
                                            <input name='InternalExternal' style={{ width: '26px', height: '36px' }} value="Internal" type="radio" required />
                                            <p className={style.paraind}>External</p>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.btn}>
                            <button type='submit' >Submit</button>
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

export default AddPlan
