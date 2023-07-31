import SideBar from '../../components/sidebar/SideBar'
import style from './TrainingsRef.module.css'
import Search from '../../assets/images/employees/Search.svg'
import add from '../../assets/images/employees/Application Add.svg'
import ProfileUser from '../../components/profileUser/ProfileUser'
import Navbar from '../../components/navbar/Navbar'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Btns from '../../components/btns/Btns'


function TrainingsRef() {
    const [offcanvas, setOffcanvas] = useState(false)
    const [trainingsList, setTrainingsList] = useState(null);
    const [showBox, setShowBox] = useState(false);

    const [dataToShow, setDataToShow] = useState(null);

    let next = 'Next page >>'
    const navigate = useNavigate()

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(8);

    const [allDataArr, setAllDataArr] = useState(null);


    useEffect(() => {
        axios.get("/readTraining").then((response) => {
            setAllDataArr(response.data.data)
            setTrainingsList(response.data.data.slice(startIndex, endIndex));
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

    useEffect(()=>{

        setTrainingsList(allDataArr?.slice(startIndex, endIndex))
    }, [startIndex, endIndex])


    const search = (event)=>{
        if (event.target.value !== "") {
            console.log(event.target.value);
            
            const searchedList = allDataArr.filter((obj) => 

                obj.TrainingCode.includes(event.target.value) || obj.TrainingName.includes(event.target.value)
            )
            console.log(searchedList);
            setTrainingsList(searchedList);
        } else {
            setTrainingsList(allDataArr?.slice(startIndex, endIndex))
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
            setDataToShow("File not Uploaded.")
            setShowBox(true);
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
                    <SideBar tab={"trainings"} />
                </div>
                <div className={style.subparent}>
                    <ProfileUser path='/hr/profile' />
                    <div className={style.searchbar}>
                        <div className={style.sec1}>
                            <img src={Search} alt="" />
                            <input onChange={search} type="text" placeholder='Search Training by name' />
                        </div>
                        <div className={style.sec2} onClick={() => {
                            navigate('/hr/addtraining')
                        }}>
                            <img src={add} alt="" />
                            <p>Add New</p>
                        </div>
                    </div>
                    <div className={style.tableParent}>

                        <table className={style.table}>
                            <tr className={style.headers}>
                                <td>Training ID</td>
                                <td>Training Name</td>
                                <td>Description</td>
                                <td>Evaluation Criteria </td>
                                <td>Documents</td>
                            </tr>
                            {
                                trainingsList?.map((training, i) => {
                                    return (
                                        <tr className={style.tablebody} key={i}>
                                            <td ><p style={{
                                                backgroundColor : "#f0f5f0",
                                                padding : "2px 5px",
                                                borderRadius : "10px",
                                                fontFamily: "Inter",
                                                fontSize: "12px",
                                                fontStyle: "normal",
                                                fontWeight: "400",
                                                lineHeight: "20px",
                                            }}>{training.TrainingCode}</p></td>
                                            <td className={style.simpleContent}>{training.TrainingName}</td>
                                            <td >

                                                <p onClick={() => {
                                                    console.log("clicked")
                                                    setShowBox(true);
                                                    setDataToShow(training.Description)
                                                }} className={style.click}>View</p>
                                            </td>
                                            <td >

                                                <p onClick={() => {
                                                    setShowBox(true);
                                                    setDataToShow(training.EvaluationCriteria)
                                                }} className={style.click}>View</p>
                                            </td>
                                            <td >
                                                <p onClick={() => {
                                                    handleDownload(training.TrainingMaterial)
                                                }} className={style.download}>Download</p>
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

                            <p class={style.msg}>{dataToShow}</p>

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

export default TrainingsRef
