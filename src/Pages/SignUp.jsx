import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className="flex h-screen bg-bglight">
            <div className="basis-2/3 flex justify-center items-center">
                <div className='w-sm'>
                    <div className="my-8 mx-4">
                        <h1 className="text-center text-4xl font-bold mb-4">Nice to meet you</h1>
                        <p className="text-center">Before we begin, we need some small details </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <input type="text" name="name" placeholder="Full Name" className="border border-primary rounded-md p-2 focus:outline-primary focus:outline-1" />
                        <input type="text" name="email" placeholder="Email" className="border border-primary rounded-md p-2 focus:outline-primary focus:outline-1" />
                        <input type="password" name="password" placeholder="Password" className="border border-primary rounded-md p-2 focus:outline-primary focus:outline-1" />
                        <button className="bg-primary text-white p-2 font-semibold rounded-full">Sign up dcccd</button>
                    </div>
                    <div className="my-4">
                        <p className="text-center">Already have an account? <Link to={"/login"}><span className="text-primary font-semibold">Log in</span></Link></p>
                    </div>
                </div>
            </div>
            <div className="basis-1/3 bg-gradient-to-br from-primarygradient-start via-primarygradient-middle to-primarygradient-end">h</div>
        </div>
  )
}

export default SignUp
