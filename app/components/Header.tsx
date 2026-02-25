import Image from 'next/image'
import React from 'react'

const Header = () => {
    return (
        <header
            className='bg-gradient-to-b from-black via-gray-900 to-gray-800 w-full flex justify-around items-center p-6 sticky top-0 z-50 print:hidden shadow-xl border-b-4 border-[#FF4912]'
        >
            <Image
                src="https://soundservicelabs.com/build/assets/labs-e012a3ff.png"
                className='invert p-2 drop-shadow-lg'
                alt="ESP Guitars"
                width={80}
                height={2}
            />
            <div className='flex text-white uppercase text-center'>
                <div className='font-bold text-xl tracking-wider drop-shadow-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                    Guitar &amp; Bass Show
                <span className='font-bold text-xl tracking-widest text-[#FF4912] drop-shadow-[0_0_10px_rgba(255,73,18,0.5)] ml-4'>
                    2026
                </span>
                </div>
            </div>
        </header>
    )
}

export default Header
