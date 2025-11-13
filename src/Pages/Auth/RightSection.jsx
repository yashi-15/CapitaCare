import React from 'react'
import { FiBox } from 'react-icons/fi'

const RightSection = () => {
  return (
    <div className="hidden sm:flex basis-1/3 bg-gradient-to-br from-primarygradient-start via-primarygradient-middle to-primarygradient-end flex-col items-center justify-center gap-5">
                <div className="flex items-center gap-4 p-2 w-42 md:w-54 bg-white rounded-md outline-8 outline-white/50 outline-offset-0">
                    <div className="bg-gray-100 p-2 rounded-full">
                        <FiBox className="text-primary w-4 h-4 lg:w-6 lg:h-6" />{" "}
                    </div>
                    <div className="flex flex-col gap-2 grow">
                        <div className="flex justify-between gap-2 items-center">
                            <h3 className='text-xs md:text-sm lg:text-base'>Newly SR</h3>
                            <span className="text-[10px] lg:text-xs text-green-700 bg-green-200 px-2 rounded-full">Paid</span>
                        </div>
                        <div>
                            <div className="p-1 rounded-full bg-gray-100 w-10"></div>
                        </div>
                    </div>
                </div>
                <div className="max-w-50 md:max-w-70 lg:max-w-90">
                    <h1 className="text-center text-white font-semibold text-xl lg:text-3xl mb-4">"The automatic categorization of your finances"</h1>
                    <p className="text-center text-white font-light text-xs lg:text-base">Transform your financial management with a simple, powerful tool designed for clarity and precision.</p>
                </div>
            </div>
  )
}

export default RightSection
