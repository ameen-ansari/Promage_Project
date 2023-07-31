

import React, { useState } from 'react';
import style from './DropDowns.module.css'
import arrow from '../../assets/images/sidebar/dropdownArrow.svg'
import profile from '../../assets/images/sidebar/profile.svg'
import SClock from '../../assets/images/techPortal/SClock.svg'
import menu2 from '../../assets/images/techPortal/colorswatches.svg'
import menu3 from '../../assets/images/techPortal/3rd.svg'
import { useNavigate } from 'react-router-dom';

const TechPortalDropDown = ({ tab }) => {
    const [isOpen, setIsOpen] = useState(true);

    let navigate = useNavigate()
    const [indicator, setIndicator] = useState('a');

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
                <div onClick={()=>{
                    navigate('/')
                }} style={{
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
                    <div  style={{
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
                            <img className={isOpen ? style.rotate : style.notrotate}  src={arrow} alt="" />
                        </div>
                    </div>

                </div>
                {isOpen ? <div className={style.optsParent}>
                    <ul className={style.opts}>
                        <li className={indicator === '/tech/machines' ? style.checkedli : null} onClick={() => indicatorManager('/tech/machines')}>
                            <img src={SClock} alt="" />
                            Machinery
                        </li>
                        <li className={indicator === '/tech/devices' ? style.checkedli : null} onClick={() => indicatorManager('/tech/devices')}>
                            <img src={menu2} alt="" />
                            Measuring Devices
                        </li>
                        <li className={indicator === '/tech/mwr' ? style.checkedli : null} onClick={() => indicatorManager('/tech/mwr')}>
                            <img src={menu3} alt="" />
                            MWR  Request
                        </li>
                    </ul>
                </div> : null}
            </div>
        </div>
    );
};

export default TechPortalDropDown;



