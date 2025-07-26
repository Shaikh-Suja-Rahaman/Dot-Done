import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import TrueFocus from '../animatedComponents/TrueFocus/TrueFocus';

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')

  const {session, signInUser} = UserAuth();
  const navigate = useNavigate()

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true);
    try{
      const result = await signInUser({email, password});
      if(result.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError("an error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side: slightly lighter dark */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2  text-white bg-zinc-800">
        <TrueFocus
          sentence="DOT DONE"
          manualMode={false}
          blurAmount={5}
          borderColor="#22c55e"
          animationDuration={2}
          pauseBetweenAnimations={1}
          className="text-8xl font-extrabold tracking-tight mb-8"
        />
        <p className="text-zinc-400 text-lg mt-5">Welcome back! Sign in to continue.</p>
      </div>
      {/* Right side: form, darker */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-zinc-900 min-h-screen">
        <form onSubmit={handleSignIn} className="bg-zinc-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-zinc-700">
          <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">Sign in</h2>
          <p className="mb-6 text-center text-zinc-400">
            Don't have an Account?{' '}
            <Link to="/signup" className="text-green-400 hover:underline font-semibold">Sign Up!</Link>
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-200 mb-1">Email</label>
              <input 
                onChange={(e) => setEmail(e.target.value)}
                id="email" type="email"
                className="w-full px-3 py-2 border border-zinc-700 rounded-lg bg-zinc-900 text-zinc-100 focus:outline-none focus:border-green-400 transition"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-200 mb-1">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password" type="password"
                className="w-full px-3 py-2 border border-zinc-700 rounded-lg bg-zinc-900 text-zinc-100 focus:outline-none focus:border-green-400 transition"
              />
            </div>
            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-400 transition-colors font-semibold">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            {error && <p className='text-red-400 text-center pt-4'>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin