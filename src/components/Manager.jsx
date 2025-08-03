import React from 'react'
import { useState, useEffect } from 'react'
import { Copy } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';



const Manager = () => {

    const [form, setForm] = useState({ site: '', username: '', password: '' });
    const [passwordArray, setPasswordArray] = useState([]);


    //load form values (site, username, password) from local storage
    useEffect(() => {
        const passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, [])


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // setForm(e.target.value); cannot use this, because it is for a single variable state, but we have an a state object with multiple items..
    }

    const savePassword = (e) => {
        e.preventDefault();
        setPasswordArray([...passwordArray, form]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));  //save site, username and password in localStorage.
        console.log([...passwordArray, form]);
    }

    const copyText = (text) => {
        toast("Item copied to clipboard: " + text, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text);
    }


    return (

        <>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>

            <div className=' mx-60 flex  flex-col justify-center items-center gap-7 p-4 ' >
                <div className='text-center'>
                    <h1><span className='font-bold'>AR</span>PassWizard</h1>
                    <p>Your own Password Manager</p>
                </div>
                <form action="" onSubmit={savePassword} className=' w-full flex  flex-col  items-center gap-6 p-1'>
                    <input value={form.site} onChange={handleChange} type="text" placeholder='Enter Website URL' className='w-full rounded-2xl border text-center pt-1 pb-1 border-green-700  focus:ring-1 ring-green-400  duration-200 outline-none bg-white  ' name="site" id="" />
                    <div className='w-full flex gap-8 ' >
                        <input value={form.username} onChange={handleChange} type="text" placeholder='Input Username' className='p-1 w-full rounded-2xl border border-green-700  focus:ring-1 ring-green-400  bg-white duration-200 outline-none text-center' name="username" id="" />

                        <div className='w-full'>
                            <input value={form.password} onChange={handleChange} type="password" placeholder='Input Password' className='p-1 w-full border-green-700  focus:ring-1 ring-green-400 bg-white  duration-200 outline-none   rounded-2xl border pl-2 text-center' name="password" id="" />
                        </div>
                    </div>
                    <button type='submit' className='flex justify-center items-center border rounded-2xl px-2 bg-green-300 cursor-pointer'><lord-icon
                        src="https://cdn.lordicon.com/sbnjyzil.json"
                        trigger="hover"
                        stroke="bold"></lord-icon>Add Password</button>
                </form>
                <div className='flex flex-col items-center w-full gap-5  mb-5'>
                    <h2 className='font-bold'>Your Passwords:</h2>
                    {passwordArray.length === 0 ? <div>No passwords to show. Start adding passwords now!</div>
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
                                        <td className='  w-32 border-2 py-1 border-white '>
                                            <div className='flex items-center  justify-center text-center gap-2'>
                                                <a href={item.site} target='_blank' rel='noopener'>{item.site}</a>{item.site === "" ? '' : <Copy className='cursor-pointer size-4' onClick={() => copyText(item.site)} />}   {/*used cond rend here to only prevent adding copy icon when there is no data in the column*/}
                                            </div>
                                        </td>
                                        <td className='text-center w-32 border-2 py-1 border-white '>
                                            <div className='flex items-center  justify-center text-center gap-2'>
                                                {item.username} {item.username === "" ? '' : <Copy className='cursor-pointer size-4' onClick={() => copyText(item.username)} />}
                                            </div>
                                        </td>

                                        <td className='text-center w-32 border-2 py-1 border-white '>
                                            <div className='flex items-center  justify-center text-center gap-2'>
                                                {item.password} {item.password === "" ? '' : <Copy className='cursor-pointer size-4' onClick={() => copyText(item.password)} />}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                </div>
            </div >
        </>
    )
}

export default Manager
