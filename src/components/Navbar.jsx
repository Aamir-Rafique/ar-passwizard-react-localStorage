import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-green-500'>
            <div className=' h-12 px-2 flex justify-between mx-40 items-center'>
                <div className='font-bold text-[1.4rem]'>ARPass</div>
                <ul className='flex gap-7'>
                    <li><a href="#" rel='noopner'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jeuxydnh.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#0,secondary:#ffffff">
                        </lord-icon>
                    </a></li>
                    <li><a href="https://github.com/Aamir-Rafique" target='_blank' rel='noopner'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jjxzcivr.json"
                            stroke="bold"
                            trigger="hover"
                            colors="primary:#0,secondary:#ffffff">
                        </lord-icon></a>
                    </li>
                </ul>
            </div>
        </nav>

    )
}

export default Navbar
