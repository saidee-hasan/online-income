import React from 'react'
import Banner from '../components/Home/Banner'
import LearningSystem from '../components/Home/LearningSystem'
import OurMission from '../components/Home/OurMission'
import Faq from '../components/Home/Faq'

export default function Home() {
  return (
    <div className='bg-black  mt-16'>
<Banner/>
<LearningSystem/>
<OurMission/>
<Faq/>
    </div>
  )
}
