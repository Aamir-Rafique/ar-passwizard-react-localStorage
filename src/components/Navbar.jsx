import React from 'react'

const Navbar = () => {

    return (
        <nav className='bg-blue-400 '>
            <div className=' h-12 px-2 flex justify-between mx-2 md:mx-55 items-center'>
                <div className=' text-[1.2rem] md:text-[1.4rem] '><span className='font-bold to-blue-950'>AR</span>PassWizard</div>
                <ul className='flex gap-5 md:gap-7 pt-1.5'>
                    <li><a href="#" rel='noopner' title='Home'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jeuxydnh.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#0,secondary:#ffffff"
                            style={{ width: 37, height: 37 }}>
                        </lord-icon>
                    </a></li>
                    <li><a href="https://github.com/Aamir-Rafique" title='GitHub' target='_blank' rel='noopner'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jjxzcivr.json"
                            stroke="bold"
                            trigger="hover"
                            style={{ width: 38, height: 38 }}
                            colors="primary:#0,secondary:#ffffff">
                        </lord-icon></a>
                    </li>
                </ul>
            </div>
        </nav>

    )
}

export default Navbar
