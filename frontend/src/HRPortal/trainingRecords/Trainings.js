import SideBar from '../../components/sidebar/SideBar'
import style from './Trainings.module.css'
import Search from '../../assets/images/employees/Search.svg'
import add from '../../assets/images/employees/Application Add.svg'
import ProfileUser from '../../components/profileUser/ProfileUser'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Btns from '../../components/btns/Btns'

function Trainings() {
    const [offcanvas, setOffcanvas] = useState(false)
    const [assignedtrainings, setAssignedTrainings] =  useState(null);

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(8);

    const [allDataArr, setAllDataArr] = useState(null);

    useEffect(()=>{
        axios.get("/readMonthlyPlan").then((Response)=>{
            let assignedTrainingsArr = [];
            const plannedTrainingsList =  Response.data.data;
            for (let index = 0; index < plannedTrainingsList.length; index++) {
                if (plannedTrainingsList[index].Assigned === true) {
                   assignedTrainingsArr.push(plannedTrainingsList[index])
                }
            }
            setAllDataArr(assignedTrainingsArr);
            setAssignedTrainings(assignedTrainingsArr.slice(startIndex, endIndex));    
        })
    }, [])


    const navigate = useNavigate()
   
    const nextPage = () => {
        setStartIndex(startIndex + 8);
        setEndIndex(endIndex + 8);
        
    }

    const backPage = () => {
        setStartIndex(startIndex - 8);
        setEndIndex(endIndex - 8);
        

    }

    useEffect(()=>{

        setAssignedTrainings(allDataArr?.slice(startIndex, endIndex))
    }, [startIndex, endIndex])

    const search = (event)=>{
        if (event.target.value !== "") {
            console.log(event.target.value);
            
            const searchedList = allDataArr?.filter((obj) => 

                obj.Training[0].TrainingName.includes(event.target.value)
            )
            console.log(searchedList);
            setAssignedTrainings(searchedList);
        } else {
            setAssignedTrainings(allDataArr?.slice(startIndex, endIndex))
        }
    }


    return (
        <div className={style.parent}>
            <div className={style.sidebar}>
                <Navbar func={() => {
                    setOffcanvas(!offcanvas)
                }} />
                <SideBar  tab={"trainingRecords"} />
                <HROffcanvas status={offcanvas} />
            </div>
            <div className={style.subparent}>
                <ProfileUser path='/hr/profile' />
                <div className={style.searchbar}>
                    <div className={style.sec1}>
                        <img src={Search} alt="" />
                        <input onChange={search} type="text" placeholder='Search Training by name' />
                    </div>
                </div>
                <div className={style.tableParent}>

                    <table className={style.table}>
                        <tr className={style.headers}>
                            <td>Training Name</td>
                            <td>Venue</td>
                            <td>Duration</td>
                            <td>Month</td>
                            <td>Time</td>
                            <td>Action</td>
                        </tr>
                        {
                            assignedtrainings?.map((assignedTraining, i) => {
                                return (
                                    <tr className={style.tablebody} key={i}>
                                        <td className={style.textStyle1}>{assignedTraining.Training[0].TrainingName}</td>
                                        <td className={style.textStyle2}>{assignedTraining.Venue}</td>
                                        <td className={style.textStyle3}>{assignedTraining.Duration}</td>
                                        <td className={style.textStyle3}>{assignedTraining.Month}</td>
                                        <td className={style.textStyle3}>{assignedTraining.Time}</td>
                                        <td ><button onClick={() => {
                                            navigate(`/hr/assignedtraininginfo/${assignedTraining._id}`)
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
    )
}

export default Trainings
