import SideBar from '../../components/sidebar/SideBar'
import style from './Trainings.module.css'
import Search from '../../assets/images/employees/Search.svg'
import add from '../../assets/images/employees/Application Add.svg'
import ProfileUser from '../../components/profileUser/ProfileUser'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import axios from "axios";
import Btns from '../../components/btns/Btns'


function PlannedTrainings() {
    const [offcanvas, setOffcanvas] = useState(false)
    const [plannedTrainings, setPlannedTrainings] = useState(null);

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(8);

    const [allDataArr, setAllDataArr] = useState(null);



    useEffect(() => {
        axios.get("/readMonthlyPlan").then((response) => {
            let plannedTrainingsArr = [];
            const allTrainings =  response.data.data;

            for (let index = 0; index < allTrainings.length; index++) {
                if (allTrainings[index].Assigned !== true) {
                   plannedTrainingsArr.push(allTrainings[index])
                }
            }
            setAllDataArr(plannedTrainingsArr);
            setPlannedTrainings(plannedTrainingsArr.slice(startIndex, endIndex));

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

        setPlannedTrainings(allDataArr?.slice(startIndex, endIndex))
    }, [startIndex, endIndex])


    const search = (event)=>{
        if (event.target.value !== "") {
            console.log(event.target.value);
            
            
            const searchedList = allDataArr?.filter((obj) =>  obj.Training[0].TrainingName.includes(event.target.value))
            console.log(searchedList);
            setPlannedTrainings(searchedList);
        } else {
            setPlannedTrainings(allDataArr?.slice(startIndex, endIndex))
        }
    }




    const navigate = useNavigate()


    return (
        <div className={style.parent}>
            <div className={style.sidebar}>
                <Navbar func={() => {
                    setOffcanvas(!offcanvas)
                }} />
                <SideBar tab={"plannedTrainings"} />
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
                            <td>Department</td>
                            <td>Action</td>
                            <td>Action</td>
                        </tr>
                        {
                            plannedTrainings?.map((plannedTraining, i) => {
                                return (
                                    <tr className={style.tablebody} key={i}>
                                        <td className={style.textStyle1}>{plannedTraining.Training[0]?.TrainingName}</td>
                                        <td className={style.textStyle2}>{plannedTraining.Venue}</td>
                                        <td className={style.textStyle3}>{plannedTraining.Duration}</td>
                                        <td className={style.textStyle3}>{plannedTraining.Month}</td>
                                        <td className={style.textStyle3}>{plannedTraining.Time}</td>
                                        <td className={style.textStyle3}>{plannedTraining.Department}</td>
                                        <td ><button onClick={() => {
                                            navigate(`/hr/plannedtraininginfo/${plannedTraining._id}`)
                                        }} className={style.viewBtn}>View</button>
                                        </td>
                                        <td ><button onClick={() => {
                                            navigate(`/hr/assign/trainings/${plannedTraining._id}`)
                                        }} className={style.orangebtn}>Assign training</button>
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

export default PlannedTrainings
