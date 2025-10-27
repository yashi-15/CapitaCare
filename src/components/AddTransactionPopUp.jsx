import React from 'react'
import { FiImage } from 'react-icons/fi'
import { RxCross1 } from 'react-icons/rx'

const AddTransactionPopUp = ({type, closePopup}) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 '>
      <div className='w-xl bg-white'>
        <div className='flex justify-between gap-2 p-4 border-b border-accent'>
            <h1 className='font-semibold'>Add {type} </h1>
            <button onClick={closePopup} className='text-secondary'> <RxCross1 /> </button>
        </div>
        <div className='p-4 flex flex-col gap-6'>
            <div className='flex gap-3 items-center'>
                <div className='p-3 bg-accent rounded-md'><FiImage size={25} /></div>
                <div>Pick Icon</div>
            </div>
            <div className='flex flex-col gap-3'>
                    <input type='text' placeholder='Category' name='category' className=" bg-secondary/12 rounded-md p-2 focus:outline-secondary focus:outline-1" />
                    <input type='phone' placeholder='Amount' name='amount' className="bg-secondary/12 rounded-md p-2 focus:outline-secondary focus:outline-1" />
                    <input type='date' placeholder='Date' name='date' className="bg-secondary/12 rounded-md p-2 focus:outline-secondary focus:outline-1" />
                    <textarea type='text' placeholder='Note..' name='note' className="bg-secondary/12 rounded-md p-2 focus:outline-secondary focus:outline-1" />
                    {/* <input type='file' placeholder='Upload reciept' name='recipt' className="bg-secondary/12 rounded-md p-2 focus:outline-secondary focus:outline-1" /> */}
            </div>
            <div className='self-end'>
                <button className='bg-secondary text-white p-2 font-semibold rounded-md' >Add {type}</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddTransactionPopUp
