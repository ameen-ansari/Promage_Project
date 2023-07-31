import style from './Mytasks.module.css'
import Search from '../../assets/images/employees/Search.svg'
import add from '../../assets/images/employees/Application Add.svg'
import ProfileUser from '../../components/profileUser/ProfileUser'
import SidebarForTrainerpor from '../../components/sidebar/SidebarForTrainerpor'
import { useNavigate } from 'react-router-dom'
import Offcanvas from '../../components/offcanvas/Offcanvas'
import Navbar from '../../components/navbar/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Btns from '../../components/btns/Btns'
function MyTasks() {

    const [assignedTrainings, setAssignedtrainings] = useState(null);


    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(8);

    const [allDataArr, setAllDataArr] = useState(null);

    useEffect(() => {
        axios.get("/readMonthlyPlan").then((Response) => {
            let assignedTrainingsArr = [];
            const plannedTrainingsList = Response.data.data;
            for (let index = 0; index < plannedTrainingsList.length; index++) {
                if (plannedTrainingsList[index].Assigned === true && plannedTrainingsList[index].TrainingResultStatus === "Not Conducted") {
                    assignedTrainingsArr.push(plannedTrainingsList[index]);
                }
            }
            setAllDataArr(assignedTrainingsArr);
            setAssignedtrainings(assignedTrainingsArr.slice(startIndex, endIndex));


        })
    }, [])
    console.log(assignedTrainings);

    const nextPage = () => {
        setStartIndex(startIndex + 8);
        setEndIndex(endIndex + 8);

    }

    const backPage = () => {
        setStartIndex(startIndex - 8);
        setEndIndex(endIndex - 8);


    }

    useEffect(() => {

        setAssignedtrainings(allDataArr?.slice(startIndex, endIndex))
    }, [startIndex, endIndex])


    const search = (event) => {
        if (event.target.value !== "") {
            console.log(event.target.value);

            const searchedList = allDataArr?.filter((obj) => obj.Training[0].TrainingName.includes(event.target.value)
            )
            console.log(searchedList);
            setAssignedtrainings(searchedList);
        } else {
            setAssignedtrainings(allDataArr?.slice(startIndex, endIndex))
        }
    }

    let next = 'Next page >>'
    const [offcanvas, setOffcanvas] = useState(false)
    const navigate = useNavigate()
    return (
        <div className={style.parent}>
            <div className={style.sidebar}>
                <SidebarForTrainerpor tab={"pendingTasks"} />
                <Navbar func={() => {
                    setOffcanvas(!offcanvas)
                }} />
                <Offcanvas status={offcanvas} />
            </div>
            <ProfileUser path='/trainer/profile' />
            <div className={style.subparent}>
                <div className={style.searchbar}>
                    <div className={style.sec1}>
                        <img src={Search} alt="" />
                        <input onChange={search} type="text" placeholder='Search by training name ' />
                    </div>
                </div>
                <div className={style.tableParent2}>
                    <table className={style.table}>
                        <tr className={style.headers}>
                            <td>Training Name</td>
                            <td>Action</td>
                        </tr>
                        {
                            assignedTrainings?.map((assignedTraining, i) => {
                                return (
                                    <tr className={style.tablebody} key={i}>
                                        <td>
                                            <p>{assignedTraining.Training[0].TrainingName}</p>
                                        </td>
                                        <td ><button onClick={() => {
                                            navigate(`/trainer/traininginfo/${assignedTraining._id}`)
                                        }} className={style.view}>
                                            View
                                        </button></td>
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

export default MyTasks
