import { useState } from 'react';
import googleicon from '../../assets/googleicon.png';
import idea from '../../assets/idea.png';
import Image from 'next/image';

const colors = {
  primary: '#2596be',
  background: '#041c2c',
};

const Login = () => {
  return (
    <div className="w-full h-screen flex items-start  ">
      <div className="w-11/12 h-full flex flex-col bg-[#2596be]">
        <div className="absolute top-[20%] left-[10%] flex flex-col"></div>
        <Image src={idea} alt="background" className="h-full object-contain" />
      </div>
      <div className="w-full h-full bg-[#041c2c] flex flex-col p-20 justify-between ">
        <h1 className="text-5xl text-[#2596be] font-semibold font-poppins ">IEDC MEC</h1>

        <div
          className="w-full flex flex-col max-w-[500px] 
        "
        >
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-3 font-poppins text-[#2596be] ">Login</h3>
            <p className="text-base mb-2 font-poppins text-white">
              Welcome Back! Please enter your details.
            </p>
          </div>

          <div className="w-80 flex flex-col">
            <input
              type="email"
              placeholder=" Email"
              className="w-full text-black py-2 my-2 rounded-md p-2 bg-none hover:bg-slate-200 active:bg-slate-200 focus:outline-none focus:ring focus:ring-sky-400 border-b border-black outline-none focus:outline-none"
            />

            <input
              type="password"
              placeholder=" Password"
              className="w-full text-black py-2 my-2 rounded-md p-2 bg-none hover:bg-slate-200 active:bg-slate-200 focus:outline-none focus:ring focus:ring-sky-400 border-b border-black outline-none focus:outline-none"
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="w-full flex">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <p className="text-sm font-poppins text-white flex items-center">Remember Me</p>
            </div>
            <p className=" mx-16 text-sm cursor-pointer underline underline-offset-3 text-white">
              Forgot_Password?
            </p>
          </div>
          <div className="w-full flex flex-col my-4 flex items-center"></div>
          <button className="w-64 mx-9 text-white my-2 bg-sky-800 hover:bg-sky-900 active:bg-sky-900 focus:outline-none focus:ring focus:ring-sky-300 font-semibold rounded-md p-2 text-center flex items-center justify-center font-poppins">
            Log In
          </button>
          <button className="w-64 mx-9 bg-cyan-300 hover:bg-cyan-400 active:bg-sky-400 focus:outline-none focus:ring focus:ring-sky-300 text- my-2 font-semibold border border-black rounded-md p-2 text-center flex items-center justify-center font-poppins">
            Sign up
          </button>
        </div>

        <div className="w-full  justify-center relative py-2">
          <div className="relative w-80 h-[1px] bg-white "></div>
          <p className="text-lg absolute text-white flex items-center mx-40 "></p>
        </div>
        <button className="w-64 mx-9 text- my-2 bg-white hover:bg-slate-300 font-semibold border border-black/40 rounded-md p-2 text-center flex items-center justify-center font-poppins">
          <Image src={googleicon} alt="Google Icon" className="h-5 w-5 mr-4" />
          Sign In with Google
        </button>

        <div className="w-full mx-20 justify-center">
          <p className="text-sm font-normal text-[#2596be]">
            Do not have an account?{' '}
            <span className="font-semibold underline underline-offset-2 cursor-pointer">
              SignUp
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
