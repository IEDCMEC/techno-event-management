// @ts-ignore
import { useState } from "react";

import Image from "next/image";
import idea from  '../../assets/idea.png';

const colors = {
  primary: "#2596be",
  background: "#041c2c",
 // parent:"#045375"
};

const Signup = () => {
  return (
    <div className="w-full h-screen flex items-start ">
      <div className="w-11/12 h-full flex flex-col bg-[#2596be]">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
           
        </div>
        <Image src = {idea} alt="background" className="h-full object-contain" />
      </div>
      <div className="w-full h-full bg-[#041c2c] flex flex-col p-20 justify-between">
        <h1 className="text-5xl text-[#2596be] font-semibold font-poppins">
          IEDC MEC
        </h1>

        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col mb-4">
            <h3 className="text-3xl text-[#2596be] font-semibold mb-5 font-poppins">Sign Up</h3>
            <p className="text-base mb-1 font-poppins text-white">
              Create your account!
            </p>
          </div>

          <div className="w-80 flex flex-col">
            <input
              type="email"
              placeholder=" Email"
              className="w-full text-black py-2 my-2 rounded-md p-2 bg-none hover:bg-slate-200  active:bg-slate-200 focus:outline-none focus:ring focus:ring-sky-400 border-b border-black outline-none focus:outline-none"
            />

            <input
              type="password"
              placeholder=" Password"
              className="w-full text-black py-2 my-2 rounded-md p-2 bg-none hover:bg-slate-200 active:bg-slate-200 focus:outline-none focus:ring focus:ring-sky-400 border-b border-black outline-none focus:outline-none"
            />

              <input
              type="password"
              placeholder=" Confirm Password"
              className="w-full text-black py-2 my-2 rounded-md p-2 bg-none hover:bg-slate-200 active:bg-slate-200 focus:outline-none focus:ring focus:ring-sky-400 border-b border-black outline-none focus:outline-none"
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="w-full flex">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <p className="text-sm font-poppins text-white">Remember Me</p>
            </div>
            
          </div>
          <div className="w-full flex flex-col my-4"></div>
          <button className="w-1/2 mx-10 text-white my-2 bg-sky-800 hover:bg-sky-900 font-semibold rounded-md p-2 text-center flex items-center justify-center font-poppins">
            Sign up
          </button>
        
        </div>

        <div className="w-full flex items-center justify-center relative py-2">
          
        </div>
       
        </div>
      </div>
   
  );
};

export default Signup;

