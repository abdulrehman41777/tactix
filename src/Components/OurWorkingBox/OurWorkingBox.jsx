import React from 'react'
import styles from './ourworkingbox.module.css';


const OurWorkingBox = ({data}) => {
  return (
    <article className={styles.working_box}>
         <img src={data.img} alt="working img" />
         <h2 className='py-4'>{data.title}</h2>
         <p>{data.desc}</p>
    </article>
  )
}

export default OurWorkingBox
