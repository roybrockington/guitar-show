import Image from 'next/image'
import React from 'react'

const Header = () => {
    return (
        <header 
            className='bg-black w-full flex justify-around p-4 sticky top-0 z-50 bg-linear-to-t from-gray-900 to-gray-500 print:hidden'
        >
            <Image 
                src="https://www.espguitars-distribution-soundservice.eu/Themes/ESP/Resources/Images/ESP_Logo.png"
                alt="ESP Guitars"
                width={100}
                height={20}
            />
            <p className='flex flex-col text-white uppercase'>
                <span className='font-bold'>BLOODSTOCK</span>
                <span className='font-light'>2025</span>
            </p>
        </header>
    )
}

export default Header
