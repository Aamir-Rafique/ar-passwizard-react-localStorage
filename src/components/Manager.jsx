import React from 'react'
import { useState, useEffect } from 'react'
import { Copy } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {

    const [form, setForm] = useState({ site: '', username: '', password: '' });
    const [passwordArray, setPasswordArray] = useState([]);
    const [isEditing, setIsEditing] = useState(true);
    const [editId, setEditId] = useState(null);

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
        if (!form.site) {
            toast("Please input webiste name or url!", {});
        }
        else if (!form.username) {
            toast("Please input username!", {});
        }
        else if (!form.password) {
            toast("Password field cannot be empty!", {});
        }
        else if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            if (editId) {
                setPasswordArray([{ ...form, id: uuidv4() }, ...passwordArray]);  //to keep edited item on top
                localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));  //save site, username and password in localStorage.
                toast("Password Updated! ", {});
                setForm({ site: '', username: '', password: '' });
                setIsEditing(true);
                setEditId(null);
            }
            else {
                setPasswordArray([{ ...form, id: uuidv4() }, ...passwordArray]);
                localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));  //save site, username and password in localStorage.
                toast("Password saved! ", {});
                setForm({ site: '', username: '', password: '' });
            }
        }
        else {
            toast("Input fields cannot have less than 3 charachters!", {});
        }
    }

    const deletePassword = (id) => {
        let c = confirm("Are you sure you want to delete password?");
        if (c) {
            setPasswordArray(passwordArray.filter((item) => item.id !== id));
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item) => item.id !== id)));
            toast("Password deleted successfully! ", {});
        }
    }


    const editPassword = (id) => {
        if (isEditing) {
            setEditId(id);
            console.log("edit id" + id);
            setForm(passwordArray.filter(i => i.id === id)[0])
            setPasswordArray(passwordArray.filter((item) => item.id !== id));
            setIsEditing(false);
        }
        else {
            toast("Please save the current Password first!", {});
        }
    }

    const copyText = (text) => {
        toast("Item copied to clipboard: " + text, {});
        navigator.clipboard.writeText(text);
    }


    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size-3 md:size:6 rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>

            <div className=' md:mx-60 mt-2 flex  flex-col justify-center items-center gap-5 md:gap-7 p-4 ' >
                <div className='text-center'>
                    <h1><span className='font-bold'>AR</span>PassWizard</h1>
                    <p>Your own Password Manager</p>
                </div>
                <form action="" onSubmit={savePassword} className=' w-full flex  flex-col  items-center gap-6 p-1'>
                    <input value={form.site} onChange={handleChange} type="text" placeholder='Enter Website URL or App name' className='w-full rounded-2xl border text-center pt-1 pb-1 border-blue-700  focus:ring-1 ring-blue-400  duration-200 outline-none bg-white  ' name="site" id="" />
                    <div className='w-full flex flex-col md:flex-row gap-6 md:gap-8 ' >
                        <input value={form.username} onChange={handleChange} type="text" placeholder='Input Username' className='p-1 w-full rounded-2xl border border-blue-700  focus:ring-1 ring-blue-400  bg-white duration-200 outline-none text-center' name="username" id="" />

                        <div className='w-full'>
                            <input value={form.password} onChange={handleChange} type="password" placeholder='Input Password' className='p-1 w-full border-blue-700  focus:ring-1 ring-blue-400 bg-white  duration-200 outline-none   rounded-2xl border pl-2 text-center' name="password" id="" />
                        </div>
                    </div>
                    <button type='submit' className='flex justify-center gap-1 items-center  rounded-2xl px-3 bg-blue-300 hover:bg-blue-400  outline-none hover:text-white hover:ring-2 active:ring-2 ring-blue-600 duration-200  cursor-pointer '>
                        <lord-icon
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="hover"
                            stroke="bold"
                            style={{ width: 30, height: 35 }}>
                        </lord-icon> <span>{editId? 'Update Password':'Save Password'}</span></button>
                </form>
                <div className='flex flex-col items-center w-full gap-5  mb-5'>
                    {passwordArray.length !== 0 && <h2 className='font-bold'>Your Passwords:</h2>}
                    {passwordArray.length === 0 ? <div className='text-center'>No passwords to show. Start adding passwords now!</div>
                        :
                        <table className="table-auto    w-full rounded-xl overflow-hidden ">
                            <thead className='bg-blue-600 text-white  text-[0.8rem] md:text-[1rem]'>
                                <tr>
                                    <th className='py-1.5 border'>Website</th>
                                    <th className='py-1.5 border'>Username</th>
                                    <th className='py-1.5 border'>Password</th>
                                    <th className='py-1.5 border'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-blue-100 text-[0.8rem] md:text-[1rem] break-words'>
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className='  w-32 border py-1 border-white '>
                                            <div className='flex items-center justify-center text-center gap-1 md:gap-2'>
                                                <a href={item.site} target='_blank' rel='noopener'>{item.site}</a><span title='Copy'><Copy className='text-blue-700 cursor-pointer size-3 md:size-4 ' onClick={() => copyText(item.site)} /></span>
                                            </div>
                                        </td>
                                        <td className='text-center w-32 border py-1 border-white '>
                                            <div className='flex items-center justify-center text-center gap-1 md:gap-2 '>
                                                {item.username}<span title='Copy'> <Copy className='text-blue-700 cursor-pointer size-3 md:size-4 ' onClick={() => copyText(item.username)} /></span>
                                            </div>
                                        </td>

                                        <td className='text-center w-32 border py-1 border-white '>
                                            <div className='flex items-center  justify-center text-center gap-1 md:gap-2'>
                                                {item.password} <span title='Copy'><Copy className='text-blue-700 cursor-pointer size-3 md:size-4 ' onClick={() => copyText(item.password)} /></span>
                                            </div>
                                        </td>

                                        <td className='text-center w-20  border py-1 border-white '>
                                            <div className='flex items-center justify-center mx-0.5 gap-2 md:gap-5'>
                                                <span className='cursor-pointer' onClick={() => editPassword(item.id)}><lord-icon
                                                    src="https://cdn.lordicon.com/exymduqj.json"
                                                    trigger="hover"
                                                    title="Edit"
                                                    stroke="bold"
                                                    colors="primary:#0,secondary:#7F00FF"
                                                    style={{ width: 25, height: 25 }}>
                                                </lord-icon></span>
                                                <span className='cursor-pointer' onClick={() => deletePassword(item.id)}><lord-icon
                                                    src="https://cdn.lordicon.com/jzinekkv.json"
                                                    trigger="hover"
                                                    title="Delete"
                                                    stroke="bold"
                                                    colors="primary:#0,secondary:#7F00FF"
                                                    style={{ width: 25, height: 25 }}>
                                                </lord-icon></span>
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
