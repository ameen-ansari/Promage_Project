import React, { useState } from 'react'
import style from './welcome.module.css'
import welcomeImg from '../../assets/images/sidebar/welcomeimg.svg'
import Navbar from '../../components/navbar/Navbar'
import TechOffcanvas from '../../components/offcanvas/TechOffcanvas'
import TechPortalSidebar from '../../components/sidebar/TechPortalSidebar'

function Wellcome() {
  const [offcanvas, setOffcanvas] = useState(false)
  return (
    <div className={`${style.parent}`}>
      <div className={`${style.sidebar}`}>
        <Navbar func={() => {
          setOffcanvas(!offcanvas)
        }} />
        <TechPortalSidebar />
        <TechOffcanvas status={offcanvas} />
      </div>
      <div className={style.welcome}>
        <img src={welcomeImg} alt="" />
        <p>Welcome to Tech Panel!</p>
      </div>
    </div>
  )
}

export default Wellcome
