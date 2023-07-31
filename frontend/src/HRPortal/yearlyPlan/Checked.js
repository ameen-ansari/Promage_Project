import style from './Checked.module.css'
import SideBar from '../../components/sidebar/SideBar'
import Search from '../../assets/images/employees/Search.svg'
import add from '../../assets/images/employees/Application Add.svg'
import tick from '../../assets/images/tick.svg'
import ProfileUser from '../../components/profileUser/ProfileUser'
import { useEffect, useState } from 'react'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackBtn from '../../components/btns/BackBtn'
function Checked() {
    const [offcanvas, setOffcanvas] = useState(false);
    const [monthToShow, setMonthToShow] = useState(null);
    const { planId, monthName } = useParams();
    const [monthTrainings, setMonthTrainings] = useState(null);


    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(8);

    useEffect(() => {
        axios.get("/readYearlyPlan").then((response) => {
            {

                const yearlyPlansList = response.data.data;
                for (let index = 0; index < yearlyPlansList.length; index++) {
                    if (yearlyPlansList[index]._id === planId) {
                        const months = yearlyPlansList[index].Month;
                        for (let index = 0; index < months.length; index++) {
                            for (let index = 0; index < months.length; index++) {
                                if (months[index].MonthName === monthName) {
                                    setMonthToShow(months[index]);
                                    setMonthTrainings(months[index].Trainings)
                                }

                            }
                        }
                    }

                }
            }
        })
    }, [])
    console.log(monthToShow);

    const nextPage = () => {
        setStartIndex(startIndex + 8);
        setEndIndex(endIndex + 8);
        
    }

    const backPage = () => {
        setStartIndex(startIndex - 8);
        setEndIndex(endIndex - 8);
    }

    const search = (event)=>{
        if (event.target.value !== "") {
            console.log(event.target.value);
            
            const searchedList = monthToShow?.Trainings.filter((obj) =>  obj.Training?.TrainingName.includes(event.target.value)
            )
            console.log(searchedList);
            setMonthTrainings(searchedList);
        } else {
            setMonthTrainings(monthToShow?.Trainings)
        }
    }




    return (
        <div className={style.parent}>
            <div className={style.sidebar}>
                <Navbar func={() => {
                    setOffcanvas(!offcanvas)
                }} />
                <HROffcanvas status={offcanvas} />
                <SideBar tab={"yearlyPlans"} />
            </div>
            <ProfileUser path='/hr/profile' />
            <div className={style.subparent}>
                <div className={style.searchbar}>
                    <div className={style.sec1}>
                        <img src={Search} alt="" />
                        <input onChange={search} type="text" placeholder='Search Training by name ' />
                    </div>
                </div>
                <div className={style.tableParent2}>
                    <table className={style.table}>
                        <tr className={style.headers}>
                            <td>Training Name</td>
                            <td>Week 1</td>
                            <td>Week 2</td>
                            <td>Week 3</td>
                            <td>Week 4</td>
                        </tr>
                        {
                            monthTrainings?.slice(startIndex, endIndex)?.map((trainingData, i) => {
                                return (
                                    <tr className={style.tablebody} key={i}>
                                        <td>
                                            <p>{trainingData.Training.TrainingName}</p>
                                        </td>
                                        <td>
                                            {trainingData.WeekNumbers.includes(1) && (

                                                <img src={tick} />
                                            )}
                                        </td>
                                        <td>
                                            {trainingData.WeekNumbers.includes(2) && (

                                                <img src={tick} />
                                            )}
                                        </td>
                                        <td>
                                            {trainingData.WeekNumbers.includes(3) && (

                                                <img src={tick} />
                                            )}
                                        </td>
                                        <td>
                                            {trainingData.WeekNumbers.includes(4) && (

                                                <img src={tick} />
                                            )}
                                        </td>



                                    </tr>
                                )

                            })
                        }
                    </table>
                </div>
                {/* <div className={style.Btns}>
                    {startIndex > 0 && (

                        <button onClick={backPage}>
                            {'<< '}Back
                        </button>
                    )}
                    {monthToShow?.Trainings?.length > endIndex && (

                        <button onClick={nextPage}>
                            next{'>> '}
                        </button>
                    )}
                </div> */}
                <BackBtn />
            </div>
        </div>
    )
}

export default Checked
