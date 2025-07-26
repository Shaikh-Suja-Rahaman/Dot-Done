import React from 'react'
import { Link } from 'react-router-dom'
// import BlurText from '../animatedComponents/BlurText/BlurText'
import bg from "../assets/5479108.jpg";
import Signin from './Signin';

function Landing() {
  return (
    // <div className="relative flex items-center justify-center min-h-screen w-full overflow-hidden text-zinc-100">
    //   {/* Background image */}
    //   <img
    //     src={bg}
    //     alt="Background"
    //     className="absolute inset-0 h-full w-full object-cover z-[-2]"
    //   />
    //   {/* Green glassmorphic overlay */}
    //   <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-green-800/60 to-green-700/60 backdrop-blur-sm z-[-1]" />
    //   <div className="relative z-10 flex flex-col items-center w-full">
    //     <div className='flex justify-center'>
    //       <BlurText
    //         text="DOT DONE"
    //         delay={150}
    //         animateBy="words"
    //         direction="top"
    //         className="text-6xl m-8 font-extrabold tracking-tight text-green-300 drop-shadow-lg special-gothic-expanded-one-regular"
    //       />
    //     </div>
    //     <div className="text-center bg-zinc-900/80 rounded-2xl shadow-2xl p-10 max-w-md w-full border border-green-500/30 backdrop-blur-md">
    //       <h2 className="text-2xl font-bold text-green-400 mb-6">Welcome to DOT DONE</h2>
    //       <p className="text-green-200 mb-8">Organize your tasks, stay productive, and get things done!</p>
    //       <div className="flex justify-center gap-6">
    //         <Link to="/signin" className="px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl shadow transition-all focus:outline-none focus:ring-2 focus:ring-green-300">Sign In</Link>
    //         <Link to="/signup" className="px-6 py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-xl shadow transition-all focus:outline-none focus:ring-2 focus:ring-green-400">Sign Up</Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <Signin/>
    </>
  )
}

export default Landing 