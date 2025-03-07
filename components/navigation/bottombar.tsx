import {  Heart, House, Menu, ShoppingCart, User } from 'lucide-react'
import React from 'react'

const BottomBar = () => {
  return (
    <div className="md:hidden h-16 fixed bottom-0 left-0 w-full bg-primary  text-gray-800 border-t border-[#A9BA9D] px-2 flex justify-between items-center">
        <div className="cursor-pointer h-full w-[60px] relative flex items-center justify-center ">
           <House className='text-accent-1'/>        
           <div className="absolute inset-0 h-[5px] w-full rounded-b-lg bg-accent-1 shadow-lg shadow-[rgba(183, 65, 14, 0.5)]" >
            </div>
        </div>
        <div className="cursor-pointer h-full w-[60px] relative flex items-center justify-center ">
           <Heart/>        
            <div className="absolute inset-0 h-[5px] w-full rounded-b-lg"></div>
        </div>
        <div className="cursor-pointer h-full w-[60px] relative flex items-center justify-center ">
            <ShoppingCart />       
            <div className="absolute inset-0 h-[5px] w-full rounded-b-lg"></div>
        </div>
        <div className="cursor-pointer h-full w-[60px] relative flex items-center justify-center ">
            <User />        
            <div className="absolute inset-0 h-[5px] w-full rounded-b-lg"></div>
        </div>
        <div className="cursor-pointer h-full w-[60px] relative flex items-center justify-center ">
            <Menu />        
            <div className="absolute inset-0 h-[5px] w-full rounded-b-lg"></div>
        </div>       
    </div>
  )
}

export default BottomBar