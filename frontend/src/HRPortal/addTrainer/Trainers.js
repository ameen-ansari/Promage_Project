import style from './Trainers.module.css'
import SideBar from '../../components/sidebar/SideBar'
import Search from '../../assets/images/employees/Search.svg'
import add from '../../assets/images/employees/Application Add.svg'
import avatar from '../../assets/images/employees/Avatar.png'
import ProfileUser from '../../components/profileUser/ProfileUser'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import { useEffect, useState } from 'react'
import axios from "axios";
import Btns from '../../components/btns/Btns'
import profile from '../../assets/images/addEmployee/prof.svg'


function Trainers() {
    const [offcanvas, setOffcanvas] = useState(false)
    const [trainersList, setTrainersList] = useState(null);
    const [popUpData, setPopUpData] = useState(null);
    const [showBox, setShowBox] = useState(false);

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(8);

    const [allDataArr, setAllDataArr] = useState(null);



    useEffect(() => {
        axios.get("/readTrainer").then((response) => {
            setAllDataArr(response.data.data);
            setTrainersList(response.data.data.slice(startIndex, endIndex));
        })
    }, [])


    const nextPage = () => {
        setStartIndex(startIndex + 8);
        setEndIndex(endIndex + 8);

    }

    const backPage = () => {
        setStartIndex(startIndex - 8);
        setEndIndex(endIndex - 8);


    }

    useEffect(() => {

        setTrainersList(allDataArr?.slice(startIndex, endIndex))
    }, [startIndex, endIndex])

    const search = (event) => {
        if (event.target.value !== "") {
            setTrainersList(allDataArr.filter((obj) =>
                obj.TrainerCode.includes(event.target.value) || obj.Name.includes(event.target.value)
            ));
        } else {
            setTrainersList(allDataArr?.slice(startIndex, endIndex))
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
            console.log("clicked");
            document.body.removeChild(link);
        } else {
            setPopUpData("File not Uploaded.")
            setShowBox(true);
        }
    };




    const navigate = useNavigate()
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
                <ProfileUser path='/hr/profile' />
                <div className={style.subparent}>
                    <div className={style.searchbar}>
                        <div className={style.sec1}>
                            <img src={Search} alt="" />
                            <input onChange={search} type="text" placeholder='Search Trainer by name or id' />
                        </div>
                        <div onClick={() => {
                            navigate('/hr/addtrainer')
                        }} className={style.sec2} >
                            <img src={add} alt="" />
                            <p>Add Trainer</p>
                        </div>
                    </div>
                    <div className={style.tableParent2}>
                        <table className={style.table}>
                            <tr className={style.headers}>
                                <td>Trainer Code</td>
                                <td>Name</td>
                                <td>Age</td>
                                <td>Email</td>
                                <td>Experience</td>
                                <td>Speciality</td>
                                <td>Documents</td>
                            </tr>
                            {
                                trainersList?.map((trainer, i) => {
                                    return (
                                        <tr className={style.tablebody} key={i}>
                                            <td >
                                                <p>{trainer.TrainerCode}</p>
                                            </td>
                                            <td><div style={{
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",
                                                overflow: "hidden",
                                                backgroundImage: `url(${profile})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}>
                                                <img style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover"
                                                }} onError={(e) => {
                                                    e.target.style.display = 'none'; // Hide the img tag on error
                                                }} src={trainer.TrainerImage || profile} alt={profile} />

                                            </div>{trainer.Name}</td>
                                            <td>{trainer.Age}</td>
                                            <td>{trainer.Email}</td>
                                            <td>{trainer.ExperienceYears}</td>
                                            <td >
                                                <p style={{
                                                    cursor: "pointer"
                                                }} onClick={() => {
                                                    setPopUpData(trainer.Specialities);
                                                    setShowBox(true);
                                                }} className={style.view}>View</p>
                                            </td>
                                            <td >
                                                <button onClick={() => {
                                                    handleDownload(trainer.TrainerDocument)
                                                }} style={{
                                                    cursor: "pointer"
                                                }} className={style.download}>Download</button>
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
                showBox && (

                    <div class={style.alertparent}>
                        <div class={style.alert}>

                            <p class={style.msg}>{popUpData}</p>

                            <div className={style.alertbtns}>

                                <button onClick={() => {
                                    setShowBox(false);

                                }} className={style.btn2}>OK</button>

                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default Trainers
