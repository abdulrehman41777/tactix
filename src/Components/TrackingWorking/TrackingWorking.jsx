import React from 'react'
import styles from './trackingworking.module.css';


const TrackingWorking = ({data}) => {
  return (
    <article className={styles.working_box}>
    <div  className={styles.working_box_img_container}>
    <img src={data.img} alt="working img" />
    </div>
    <h2 className='py-4 mt-5'>{data.title}</h2>
    <p>{data.desc}</p>
</article>
  )
}

export default TrackingWorking
