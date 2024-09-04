import React from 'react'

const PrimaryButton = ({text, onClick, type}) => {
  return (
    <>
     <button
     onClick={onClick}
     className={`${type}`}
     >
     <span className='btn_hover'>
        {text}
     </span>
     </button> 
    </>
  )
}

export default PrimaryButton
