import React from 'react'
import { FiBox } from 'react-icons/fi'

const RightSection = () => {
  return (
    <div className="basis-1/3 bg-gradient-to-br from-primarygradient-start via-primarygradient-middle to-primarygradient-end flex flex-col items-center justify-center gap-5">
                <div className="flex items-center gap-4 p-2 w-54 bg-white rounded-md outline outline-8 outline-white/50 outline-offset-0">
                    <div className="bg-gray-100 p-2 rounded-full">
                        <FiBox size={26} className="text-primary" />{" "}
                    </div>
                    <div className="flex flex-col gap-2 grow">
                        <div className="flex justify-between gap-2 items-center">
                            <h3>Newly SR</h3>
                            <span className="text-xs text-green-700 bg-green-300 px-2 rounded-full">Paid</span>
                        </div>
                        <div>
                            <div className="p-1 rounded-full bg-gray-100 w-10"></div>
                        </div>
                    </div>
                </div>
                <div className="max-w-90">
                    <h1 className="text-center text-white font-semibold text-3xl mb-4">"The automatic categorization of your finances"</h1>
                    <p className="text-center text-white font-light">Transform your financial management with a simple, powerful tool designed for clarity and precision.</p>
                </div>
            </div>
  )
}

export default RightSection
