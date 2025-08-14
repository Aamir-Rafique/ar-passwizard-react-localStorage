import React from 'react'
import { useState, useEffect } from 'react'
import Confetti from 'react-confetti';
import { Copy, Type } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {

    const [form, setForm] = useState({ site: '', username: '', password: '' });
    const [passwordArray, setPasswordArray] = useState([]);
    const [isEditing, setIsEditing] = useState(true);
    const [editId, setEditId] = useState(null);

    //state to reveal password in table:
    const [revealedIndex, setRevealedIndex] = useState(null);

    //state to show notification to tell user that they cannot edit this tabel element without clicking edit icon!
    const [NoEditNotification, setNoEditNotification] = useState(null);

    //state to track if user has been notified about horizontal scroll on mobile
    const [hasShownScrollNotification, setHasShownScrollNotification] = useState(false);

    // Independence Day Popup State
    const [showIndependencePopup, setShowIndependencePopup] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [is14August, setIs14August] = useState(false);

    //load form values (site, username, password) from local storage
    useEffect(() => {
        const passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }

        // Check if scroll notification has been shown before
        const scrollNotificationShown = localStorage.getItem("scrollNotificationShown");
        if (scrollNotificationShown) {
            setHasShownScrollNotification(true);
        }

        // Show popup only in August and only if not dismissed this session
        const now = new Date();
        const isAugust = now.getMonth() === 7; // 0-indexed, 7 = August
        const is14Aug = isAugust && now.getDate() === 14;
        setIs14August(is14Aug);
        const popupDismissed = sessionStorage.getItem('independencePopupDismissed');
        if (isAugust && !popupDismissed) {
            setShowIndependencePopup(true);
        }

        // Listen for window resize for confetti
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    // Dismiss popup and remember for session
    const handleClosePopup = () => {
        setShowIndependencePopup(false);
        sessionStorage.setItem('independencePopupDismissed', 'true');
    };


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // setForm(e.target.value); cannot use this, because it is for a single variable state, but we have an a state object with multiple items..
    }

    const savePassword = (e) => {
        e.preventDefault();
        if (!form.site) {
            toast("Please input webiste name or URL!", {});
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

                // Show scroll notification for mobile users when first password is added
                showScrollNotificationOnMobile();
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

    const showNoEditNotification = () => {
        if (!NoEditNotification)
            toast("Please click Edit icon to edit", {
                autoClose: 2000
            });
    }

    // Function to check if device is mobile and show scroll notification
    const showScrollNotificationOnMobile = () => {
        const isMobile = window.innerWidth <= 768; // Mobile breakpoint

        if (isMobile && !hasShownScrollNotification && passwordArray.length === 0) {
            // Show notification after a short delay to ensure the table is rendered
            setTimeout(() => {
                toast("💡 Tip: swipe the table horizontally to view all password details!", {
                    autoClose: 5000,
                    position: "top-center"
                });
                setHasShownScrollNotification(true);
                localStorage.setItem("scrollNotificationShown", "true");
            }, 1000);
        }
    }


    return (
        <>
            {/* Independence Day Popup */}
            {showIndependencePopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-300 bg-opacity-50">
                    <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={500}  recycle={false} />
                    <div className="relative bg-green-50 rounded-2xl shadow-xl p-6 max-w-md w-[90%] text-center animate-bounceIn">
                        <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">
                            {is14August ? 'Happy Independence Day!' : 'Happy Independence Month!'}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-700 mb-4">
                            {is14August
                                ? <>Wishing all Pakistanis a joyful 14th August!<br />May your day be filled with happiness and pride. 🎉</>
                                : <>Wishing all Pakistanis a wonderful August!<br />Celebrate freedom and unity all month long. 🇵🇰</>}
                        </p>
                        <button
                            onClick={handleClosePopup}
                            className="mt-2 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size-3 md:size:6 rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>

            <div className=' md:mx-60 mt-2 flex  flex-col justify-center items-center gap-5 md:gap-7 p-4 ' >
                <div className='text-center'>
                    <h1><span className='font-bold'>AR</span>PassWizard</h1>
                    <p>Your own Password Manager</p>
                </div>
                <form action="" onSubmit={savePassword} className=' w-full flex  flex-col  items-center gap-6 p-1'>
                    <input value={form.site} onChange={handleChange} type="text" placeholder='Enter Website URL or App name' className='w-full rounded-2xl border text-center pt-1 pb-1 border-blue-700  focus:ring-1 ring-blue-400  duration-200 outline-none bg-white  ' name="site" id="site" />
                    <div className='w-full flex flex-col md:flex-row gap-6 md:gap-8 ' >
                        <input value={form.username} onChange={handleChange} type="text" placeholder='Input Username' className='p-1 w-full rounded-2xl border border-blue-700  focus:ring-1 ring-blue-400  bg-white duration-200 outline-none text-center' name="username" id="username" />

                        <div className='w-full'>
                            <input value={form.password} onChange={handleChange} type="password" placeholder='Input Password' className='p-1 w-full border-blue-700  focus:ring-1 ring-blue-400 bg-white  duration-200 outline-none   rounded-2xl border pl-2 text-center' name="password" id="password" />
                        </div>
                    </div>
                    <button type='submit' className='flex justify-center gap-1 items-center  rounded-2xl px-3 bg-blue-300 hover:bg-blue-400  outline-none hover:text-white hover:ring-2 active:ring-2 ring-blue-600 duration-200  cursor-pointer '>
                        <lord-icon
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#0,secondary:#7F00FF"
                            style={{ width: 30, height: 35 }}>
                        </lord-icon> <span>{editId ? 'Update Password' : 'Save Password'}</span></button>
                </form>
                <div className='flex flex-col items-center w-full gap-5  mb-5'>
                    {passwordArray.length !== 0 && <h2 className='font-bold'>Your Passwords:</h2>}
                    {passwordArray.length === 0 ? <div className='text-center'>No passwords to show. Start adding passwords now!</div>
                        :
                        <div class="overflow-x-auto w-full">
                            <table className="table-auto w-180 md:w-full rounded-xl overflow-hidden ">
                                <thead className='bg-blue-600 text-white  text-[0.8rem] md:text-[1rem]'>
                                    <tr>
                                        <th className='py-2 border'>Website</th>
                                        <th className='py-2 border'>Username</th>
                                        <th className='py-2 border'>Password</th>
                                        <th className='py-2 border'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-blue-100 text-[0.8rem] md:text-[1rem] '>
                                    {passwordArray.map((item, index) => (
                                        <tr key={index}>
                                            <td className='w-38 border py-2 border-white '>
                                                <div className='flex items-center justify-center text-center gap-1'>
                                                    <input
                                                        onKeyDown={showNoEditNotification}
                                                        className=' w-[80%]  px-2 py-1 text-center  outline-none  bg-blue-50 hover:ring-1  hover:ring-blue-600 active:ring-1  active:ring-blue-600  duration-250 rounded-2xl'
                                                        value={item.site}
                                                    /><a href={item.site} target='_blank' rel='noopener'  >  </a><span title='Copy'><Copy className='text-blue-700 cursor-pointer size-3.5 md:size-4 ' onClick={() => copyText(item.site)} /></span>
                                                </div>
                                            </td>
                                            <td className='text-center w-32 border py-2 md:py-1 border-white '>
                                                <div className='flex items-center justify-center text-center gap-2 '>
                                                    <input
                                                        onKeyDown={showNoEditNotification}
                                                        className=' w-[70%]  px-2 py-1 text-center  outline-none  bg-blue-50 hover:ring-1  hover:ring-blue-600 active:ring-1  active:ring-blue-600  duration-250 rounded-2xl'
                                                        value={item.username}
                                                    />
                                                    <span title='Copy'> <Copy className='text-blue-700 cursor-pointer size-3.5 md:size-4 ' onClick={() => copyText(item.username)} /></span>
                                                </div>
                                            </td>

                                            <td className='text-center w-22 md:w-25 border py-1 border-white '>
                                                <div className='flex items-center  justify-center text-center gap-2 '>
                                                    <input
                                                        onKeyDown={showNoEditNotification}
                                                        onMouseEnter={() => setRevealedIndex(index)}
                                                        onMouseLeave={() => setRevealedIndex(null)}
                                                        type={revealedIndex === index ? "text" : "password"}
                                                        className='w-[60%]   px-2 py-1 text-center  outline-none  bg-blue-50 hover:ring-1  hover:ring-blue-600 active:ring-1  active:ring-blue-600   duration-250 rounded-2xl'
                                                        value={item.password} />
                                                    <span title='Copy'><Copy className='text-blue-700 cursor-pointer size-3.5 md:size-4 ' onClick={() => copyText(item.password)} /></span>
                                                </div>
                                            </td>

                                            <td className='text-center w-25 md:w-20  border py-1 border-white '>
                                                <div className='flex items-center justify-center gap-5'>
                                                    <span className='cursor-pointer ' onClick={() => editPassword(item.id)}><lord-icon
                                                        src="https://cdn.lordicon.com/exymduqj.json"
                                                        trigger="hover"
                                                        title="Edit"
                                                        stroke="bold"
                                                        colors="primary:#0,secondary:#7F00FF"
                                                        style={{ width: 23, height: 23 }}>
                                                    </lord-icon></span>
                                                    <div className='border-l border-l-white h-7'></div>
                                                    <span className='cursor-pointer' onClick={() => deletePassword(item.id)}><lord-icon
                                                        src="https://cdn.lordicon.com/jzinekkv.json"
                                                        trigger="hover"
                                                        title="Delete"
                                                        stroke="bold"
                                                        colors="primary:#0,secondary:#7F00FF"
                                                        style={{ width: 23, height: 23 }}>
                                                    </lord-icon></span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className='mt-2'></div>
                        </div>}
                </div>
            </div >
        </>
    )
}

export default Manager
