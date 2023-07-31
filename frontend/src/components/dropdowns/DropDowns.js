import React, { useState } from 'react';
import style from './DropDowns.module.css'
import arrow from '../../assets/images/sidebar/dropdownArrow.svg'
import profile from '../../assets/images/sidebar/profile.svg'
import user from '../../assets/images/sidebar/User Multiple Group.svg'
import clipboardChecked from '../../assets/images/sidebar/Clipboard Check.svg'
import calendar from '../../assets/images/sidebar/Blank Calendar.svg'
import copyPaste from '../../assets/images/sidebar/Copy Paste.svg'
import lift from '../../assets/images/sidebar/Lift.svg'
import pageS from '../../assets/images/sidebar/Page Setting.svg'
import addLayer from '../../assets/images/sidebar/Add Layer 2.svg'
import { useNavigate } from 'react-router-dom';

const DropDowns = ({ tab }) => {
    const [isOpen, setIsOpen] = useState(true);

    const navigate = useNavigate()

    const toggleDropdown = () => {
        if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };


    const indicatorManager = (e) => {
        console.log(e)

        navigate(e)
    }
    return (
        <div className={style.parent}>
            <div className={style.dropdown}>
                <div style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px"

                }}  >
                    <div >
                        <img src={profile} alt="" />
                    </div>
                    <p style={{
                        fontFamily: 'Poppins',
                        fontSize: '15px',
                        fontWeight: '500',
                        lineHeight: '23px',
                        letterSpacing: '0em',
                        color: '#ffffff',
                        marginBottom: '0'
                    }}>HR Panel</p>
                    <div onClick={toggleDropdown} style={{
                        borderRadius: '1.5rem',
                        width: '1.5rem',
                        height: '1.5rem',
                        flexGrow: '0 !important',
                        backgroundColor: 'rgba(253, 189, 164, 0.38)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        justifySelf: 'flex-end',

                        cursor: 'pointer',
                    }} >
                        <img className={isOpen ? style.rotate : style.notrotate} src={arrow} alt="" />
                    </div>
                </div>
                {isOpen ? <div className={style.optsParent}>
                    <ul className={style.opts}>
                        <li className={tab === 'employees' ? style.checkedli : null} onClick={() => indicatorManager('/hr/employees')}>
                            <img src={user} alt="" />
                            Employees
                        </li>
                        <li className={tab === 'trainingRecords' ? style.checkedli : null} onClick={() => indicatorManager('/hr/trainings')}>
                            <img src={copyPaste} alt="" />
                            Training Records</li>
                        <li className={tab === 'trainings' ? style.checkedli : null} onClick={() => indicatorManager('/hr/trainingsref')}>
                            <img src={pageS} alt="" />
                            Trainings</li>
                        <li className={tab === 'plannedTrainings' ? style.checkedli : null} onClick={() => indicatorManager('/hr/planned/trainings')}>
                            <img src={pageS} alt="" />
                            Planned Training</li>
                        <li className={tab === 'trainers' ? style.checkedli : null} onClick={() => indicatorManager('/hr/trainers')}>
                            <img src={addLayer} alt="" />
                            Trainers</li>
                        <li className={tab === 'personalRecuisition' ? style.checkedli : null} onClick={() => indicatorManager('/hr/personalrec')}>
                            <img src={lift} alt="" />
                            Personal Rect.</li>
                        <li className={tab === 'yearlyPlans' ? style.checkedli : null} onClick={() => indicatorManager('/hr/yearlyPlan')}>
                            <img src={calendar} alt="" />
                            Yearly Plan
                        </li>
                        <li className={tab === 'monthlyPlans' ? style.checkedli : null} onClick={() => indicatorManager('/hr/addmonthlyplan')}>
                            <img src={clipboardChecked} alt="" />
                            Monthly Plan
                        </li>
                    </ul>
                </div> : null}
                <div className={style.dropdown}>
                    <div style={{
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px"

                    }} onClick={() => {
                        navigate("/trainer")
                    }} >
                        <div >
                            <img src={profile} alt="" />
                        </div>
                        <p style={{
                            fontFamily: 'Poppins',
                            fontSize: '15px',
                            fontWeight: '500',
                            lineHeight: '23px',
                            letterSpacing: '0em',
                            color: '#ffffff',
                            marginBottom: '0'
                        }}>Trainer Panel</p>
                        <div style={{
                            borderRadius: '1.5rem',
                            width: '1.5rem',
                            height: '1.5rem',
                            flexGrow: '0 !important',
                            backgroundColor: 'rgba(253, 189, 164, 0.38)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            justifySelf: 'flex-end',

                            cursor: 'pointer',
                        }} >
                            <img className={style.notrotate} src={arrow} alt="" />
                        </div>
                    </div>

                </div>
                <div className={style.dropdown}>
                    <div style={{
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px"

                    }} onClick={() => {
                        navigate("/tech")
                    }} >
                        <div >
                            <img src={profile} alt="" />
                        </div>
                        <p style={{
                            fontFamily: 'Poppins',
                            fontSize: '15px',
                            fontWeight: '500',
                            lineHeight: '23px',
                            letterSpacing: '0em',
                            color: '#ffffff',
                            marginBottom: '0'
                        }}>Tech Panel</p>
                        <div style={{
                            borderRadius: '1.5rem',
                            width: '1.5rem',
                            height: '1.5rem',
                            flexGrow: '0 !important',
                            backgroundColor: 'rgba(253, 189, 164, 0.38)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            justifySelf: 'flex-end',

                            cursor: 'pointer',
                        }} >
                            <img className={style.notrotate} src={arrow} alt="" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DropDowns;

