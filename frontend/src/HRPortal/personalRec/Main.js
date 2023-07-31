import SideBar from '../../components/sidebar/SideBar'
import style from './Main.module.css'
import Search from '../../assets/images/employees/Search.svg'
import add from '../../assets/images/employees/Application Add.svg'
import ProfileUser from '../../components/profileUser/ProfileUser'
import { useNavigate } from 'react-router-dom'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import Navbar from '../../components/navbar/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'


function Main() {

    const [offcanvas, setOffcanvas] = useState(false);
    const [personReqList, setPersonReqList] = useState(null);

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(8);

    const [allDataArr, setAllDataArr] = useState(null);

    useEffect(() => {
        axios.get("/readPersonalRecuisition").then((response) => {
            setAllDataArr(response.data.data);
            setPersonReqList(response.data.data.slice(startIndex, endIndex));
        })
    }, [])

    const statusUpdated = () => {
        axios.get("/readPersonalRecuisition").then((response) => {
            setAllDataArr(response.data.data);
            setPersonReqList(response.data.data.slice(startIndex, endIndex));
        })
    }

    const nextPage = () => {
        setStartIndex(startIndex + 8);
        setEndIndex(endIndex + 8);

    }

    const backPage = () => {
        setStartIndex(startIndex - 8);
        setEndIndex(endIndex - 8);


    }

    useEffect(() => {

        setPersonReqList(allDataArr?.slice(startIndex, endIndex))
    }, [startIndex, endIndex])

    const search = (event) => {
        if (event.target.value !== "") {
            console.log(event.target.value);

            console.log(allDataArr);
            const searchedList = allDataArr?.filter(obj => obj.Department.includes(event.target.value)
            )
            console.log(searchedList);
            setPersonReqList(searchedList);
        } else {
            setPersonReqList(allDataArr?.slice(startIndex, endIndex))
        }
    }

    const [popUpData, setPopUpData] = useState(null);
    const [showBox, setShowBox] = useState(false);
    const [dataToSend, setDataToSend] = useState(null);


    const navigate = useNavigate()
    const showform = () => {
        navigate('/hr/addpersonalrec')
    }
    const [alert, setalert] = useState(false)
    const [alert2, setalert2] = useState(false)
    const alertManager = () => {
        setalert(!alert)
    }
    const alertManager2 = () => {
        setalert2(!alert2)
    }




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
                <div className={style.subparent}>
                    <ProfileUser path='/hr/profile' />
                    <div className={style.searchbar}>
                        <div className={style.sec1}>
                            <img src={Search} alt="" />
                            <input onChange={search} type="text" placeholder='Search by Department ' />
                        </div>
                        <div className='d-flex'>
                            <div onClick={showform} className={style.sec2}>
                                <img src={add} alt="" />
                                <p>Add New</p>
                            </div>
                        </div>
                    </div>
                    <div className={style.tableParent}>

                        <table className={style.table}>
                            <tr className={style.headers}>
                                <td>Station</td>
                                <td>job title</td>
                                <td>Supervisor</td>
                                <td>Department</td>
                                <td>Action</td>
                                <td>Action</td>
                                <td></td>
                                <td>Status</td>
                                <td>Reason</td>
                            </tr>
                            {
                                personReqList?.map((reqPerson, i) => {
                                    return (
                                        <tr className={style.tablebody} key={i}>
                                            <td className={style.textStyle2}>{reqPerson.Station}</td>
                                            <td className={style.textStyle3}>{reqPerson.JobTitle}</td>
                                            <td className={style.textStyle3}>{reqPerson.Supervisor}</td>
                                            <td className={style.textStyle3}>{reqPerson.Department}</td>
                                            <td ><button onClick={() => {
                                                navigate(`/hr/showcredentails/${reqPerson._id}`)
                                            }} className={style.viewBtn}>View</button>
                                            </td>
                                            <td >



                                                <button onClick={() => {
                                                    setDataToSend({
                                                        personId: reqPerson._id,
                                                        status: "Approved"
                                                    });
                                                    alertManager2();
                                                }} className={style.viewBtn2}>Approve</button>
                                                <button onClick={() => {
                                                    setDataToSend({
                                                        personId: reqPerson._id,
                                                        status: "Disapproved"
                                                    });
                                                    alertManager();
                                                }} className={style.orangebtn}>Disapprove</button>



                                            </td>
                                            <td className={style.textStyle3}></td>
                                            <td className={reqPerson.Status === '' ? `${style.status} ${style.blue}` : reqPerson.Status === 'Approved' ? `${style.status} ${style.green}` : `${style.status} ${style.red}`}>{reqPerson.Status}</td>
                                            <td ><button onClick={() => {
                                                if (reqPerson.Status === "Approved") {
                                                    setPopUpData("This Application is Approved.");

                                                } else if (reqPerson.Status === "Disapproved") {
                                                    setPopUpData(reqPerson.Reason);
                                                } else {
                                                    setPopUpData("Application is pending still.")
                                                }
                                                setShowBox(true);
                                            }} className={style.viewBtn}>View</button>
                                            </td>
                                        </tr>
                                    )

                                })
                            }

                        </table>
                    </div>
                    <div className={style.Btns}>
                        {startIndex > 0 && (

                            <button onClick={backPage}>
                                {'<< '}Back
                            </button>
                        )}
                        {allDataArr?.length > endIndex && (

                            <button onClick={nextPage}>
                                next{'>> '}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {
                alert ?
                    <div class={style.alertparent}>
                        <div class={style.alert}>
                            <form onSubmit={() => {
                                axios.patch("/updatePersonStatus", dataToSend).then(() => {
                                    statusUpdated();
                                    Swal.fire({
                                        title: 'Success',
                                        text: 'Status Updated Successfully',
                                        icon: 'success',
                                        confirmButtonText: 'Go!',
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            // window.location.reload();
                                        }
                                    })


                                }).catch((error) => {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Failed to Update Status',
                                        confirmButtonText: 'OK.'

                                    })
                                })

                                alertManager();
                            }}>

                                <textarea onChange={(event) => {
                                    setDataToSend({ ...dataToSend, Reason: event.target.value })
                                }} name="" id="" cols="30" rows="10" placeholder='Reason here' required></textarea>
                                <div className={style.alertbtns}>
                                    <button type='submit' className={style.btn1}>Submit</button>
                                    <button onClick={alertManager} className={style.btn2}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div> : null
            }
            {
                alert2 ?
                    <div class={style.alertparent}>
                        <div class={style.alert}>
                            <p>Are you sure to submit ?</p>
                            <div className={style.alertbtns}>
                                <button onClick={() => {
                                    axios.patch("/updatePersonStatus", dataToSend).then(() => {
                                        statusUpdated()
                                        Swal.fire({
                                            title: 'Success',
                                            text: 'Status Updated Successfully',
                                            icon: 'success',
                                            confirmButtonText: 'Go!',
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                // window.location.reload();
                                            }
                                        })
                                    }).catch((error) => {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Failed to Update Status',
                                            confirmButtonText: 'OK.'

                                        })
                                    })

                                    alertManager2();
                                }} className={style.btn3}>Submit</button>
                                <button onClick={alertManager2} className={style.btn2}>Cencel</button>
                            </div>
                        </div>
                    </div> : null
            }
            {
                showBox &&
                <div class={style.alertparent}>
                    <div class={style.alert}>
                        <p>{popUpData}</p>
                        <div className={style.alertbtns}>

                            <button onClick={() => {
                                setShowBox(false);
                            }} className={style.btn2}>Ok.</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Main

