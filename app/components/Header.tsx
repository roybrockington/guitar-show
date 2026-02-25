import Image from 'next/image'
import React from 'react'

const Header = () => {
    return (
        <header 
            className='bg-black w-full flex justify-around p-4 sticky top-0 z-50 bg-linear-to-t from-gray-400 to-gray-900 print:hidden'
        >
            <Image 
                src="https://soundservicelabs.com/build/assets/labs-e012a3ff.png"
                className='invert p-2'
                alt="ESP Guitars"
                width={70}
                height={2}
            />
            <p className='flex flex-col text-white uppercase'>
                <span className='font-bold'>Guitar &amp; Bass Show</span>
                <span className='font-light'>2026</span>
            </p>
        </header>
    )
}

export default Header
