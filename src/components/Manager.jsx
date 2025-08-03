import React from 'react'
import { useState, useEffect } from 'react';
import { EyeClosed, EyeIcon } from 'lucide-react'

const Manager = () => {

    const [passwordEye, setpasswordEye] = useState(EyeClosed);
    const [form, setForm] = useState({ site: '', username: '', password: '' });
    const [passwordArray, setPasswordArray] = useState([]);


    //load form values (site, username, password) from local storage
    useEffect(() => {
        const passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, [])



    const showPassword = () => {
        if (passwordEye === EyeClosed) {
            setpasswordEye(EyeIcon);
        }
        else {
            setpasswordEye(EyeClosed);
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // setForm(e.target.value); cannot use this, because it is for a single variable state, but we have an a state object with multiple items..
    }

    const savePassword = () => {
        setPasswordArray([...passwordArray, form]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));  //save site, username and password in localStorage.
        console.log([...passwordArray, form]);
    }


    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

            <div className=' mx-60 flex  flex-col justify-center items-center gap-8 p-4' >
                <div className='text-center'>
                    <h1><span className='font-bold'>AR</span>PassWizard</h1>
                    <p>Your own Password Manager</p>
                </div>
                <input value={form.site} onChange={handleChange} type="text" placeholder='Enter Website URL' className='w-full rounded-2xl border text-center pt-1 pb-1 border-green-700  focus:ring-1 ring-green-400  duration-200 outline-none ' name="site" id="" />
                <div className='w-full flex gap-8 ' >
                    <input value={form.username} onChange={handleChange} type="text" placeholder='Input Username' className='p-1 w-full rounded-2xl border border-green-700  focus:ring-1 ring-green-400  duration-200 outline-none text-center' name="username" id="" />

                    <div className='relative '>
                        <input value={form.password} onChange={handleChange} type="text" placeholder='Input Password' className='p-1 w-full border-green-700  focus:ring-1 ring-green-400  duration-200 outline-none   rounded-2xl border pl-2' name="password" id="" />
                        <span className='absolute right-1 top-1.5 cursor-pointer' title={passwordEye === EyeClosed ? 'Show Password' : 'Hide Password'} onClick={showPassword} >
                            {React.createElement(passwordEye)}
                        </span>
                    </div>
                </div>
                <button onClick={savePassword} className='flex justify-center items-center border rounded-2xl px-2 bg-green-300 cursor-pointer'><lord-icon
                    src="https://cdn.lordicon.com/sbnjyzil.json"
                    trigger="hover"
                    stroke="bold"></lord-icon>Add Password</button>
                <div className='flex flex-col items-center w-full gap-5 mt-5 '>
                    <h2 className='font-bold'>Your Passwords:</h2>
                    {passwordArray.length === 0 ? <div>No passwords to show! Start adding passwords now.</div>
                        :
                        <table className="table-auto w-full rounded-md overflow-hidden ">
                            <thead className='bg-green-600 text-white '>
                                <tr>
                                    <th className='py-1.5'>Website</th>
                                    <th className='py-1.5'>Username</th>
                                    <th className='py-1.5'>Password</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className='text-center w-32 border-2 py-1 border-white '><a href={item.site} target='_blank' rel='noopener'>{item.site}</a></td>
                                        <td className='text-center w-32 border-2 py-1 border-white '>{item.username}</td>
                                        <td className='text-center w-32 border-2 py-1 border-white '>{item.password}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}

                </div>
            </div>
        </>
    )
}

export default Manager
