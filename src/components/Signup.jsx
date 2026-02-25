import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import TrueFocus from '../animatedComponents/TrueFocus/TrueFocus';

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const [name, setName] = useState('');
  const [userClass, setUserClass] = useState('');

  const {session, signUpNewUser} = UserAuth();
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await signUpNewUser({ email, password });
      if (result.error) {
        if (
          result.error.message?.toLowerCase().includes('user already registered') ||
          result.error.message?.toLowerCase().includes('already exists')
        ) {
          setError('User already exists. Please sign in.');
        } else {
          setError(result.error.message || 'An error occurred');
        }
        return;
      }
      if (result.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      //yes that is what i had thought as well
      // laksdlklaksldklkalsdklkaskdlaksldkl
      if (
        err.message?.toLowerCase().includes('user already registered') ||
        err.message?.toLowerCase().includes('already exists')
      ) {
        setError('User already exists. Please sign in.');
      } else {
        setError('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex">
      {/* Left side: slightly lighter dark */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 text-white bg-[#1a1a1a] border-r border-zinc-800">
        <TrueFocus
          sentence="DOT DONE"
          manualMode={false}
          blurAmount={5}
          borderColor="#22c55e"
          animationDuration={2}
          pauseBetweenAnimations={1}
          className="text-8xl font-display font-black tracking-tighter mb-8"
        />
        <p className="text-zinc-500 text-base mt-8 font-body tracking-wide">CREATE YOUR ACCOUNT AND GET PRODUCTIVE</p>
      </div>
      {/* Right side: form, darker */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-[#151515] min-h-screen px-8">
        <form onSubmit={handleSignUp} className="bg-[#1a1a1a] p-10 shadow-2xl w-full max-w-md border border-zinc-800">
          <h2 className="text-3xl font-display font-bold text-green-400 mb-8 text-center tracking-tight">SIGN UP</h2>
          <p className="mb-8 text-center text-zinc-400 font-body text-sm tracking-wide">
            Already have an account?{' '}
            <Link to="/" className="text-green-400 hover:text-green-300 font-heading font-semibold transition-colors tracking-wide">SIGN IN</Link>
          </p>
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-heading font-semibold text-zinc-400 mb-2 tracking-widest uppercase">Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email" type="email"
                className="w-full px-4 py-3 border border-zinc-800 bg-[#151515] text-zinc-100 focus:outline-none focus:border-green-400 transition-colors font-body"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-heading font-semibold text-zinc-400 mb-2 tracking-widest uppercase">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password" type="password"
                className="w-full px-4 py-3 border border-zinc-800 bg-[#151515] text-zinc-100 focus:outline-none focus:border-green-400 transition-colors font-body"
              />
            </div>
            <button type="submit" className="w-full bg-green-500 text-white py-3 hover:bg-green-400 transition-colors font-heading font-semibold tracking-widest uppercase text-sm shadow-lg mt-6">
              {loading ? 'SIGNING UP...' : 'SIGN UP'}
            </button>
            {error && <p className='text-red-400 text-center pt-4 font-body text-sm'>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup