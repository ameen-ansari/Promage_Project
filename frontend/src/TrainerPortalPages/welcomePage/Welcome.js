import React, { useState } from 'react'
import style from './Welcome.module.css'
import welcomeImg from '../../assets/images/sidebar/welcomeimg.svg'
import SidebarForTrainerpor from '../../components/sidebar/SidebarForTrainerpor'
import Navbar from '../../components/navbar/Navbar'
import Offcanvas from '../../components/offcanvas/Offcanvas'

function Welcome() {
  const [offcanvas, setOffcanvas] = useState(true)
  return (
    <div className={`${style.parent}`}>
      <div className={`${style.sidebar}`}>
        <SidebarForTrainerpor />
        <Navbar func={() => {
          setOffcanvas(!offcanvas)
        }} />
        <Offcanvas status={offcanvas} />
      </div>
      <div className={style.welcome}>
        <img src={welcomeImg} alt="" />
        <p>Welcome to Trainer Panel!</p>
      </div>
    </div>
  )
}

export default Welcome
