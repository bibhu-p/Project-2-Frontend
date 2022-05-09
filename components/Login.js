import { useState } from 'react';
import axios from 'axios';
import { FaRegUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { useRouter } from 'next/router';
import Modal from './Modal';
const Login = () => {

    const router = useRouter()
    const [showModal, setShowModal] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [action, setAction] = useState('add')
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });
    const [formErr, setFormErr] = useState({
        email: false,
        pwd: false
    });

    const classes = {
        valid: "flex pl-3 items-center transition ease-in-out focus:duration-300 border-0  text-[0.9rem] rounded  md:mx-8  w-full md:w-[85%] h-9 outline-0 focus:ring-gray-800 ring-1 ring-gray-800",
        inValid: "flex pl-3 items-center transition ease-in-out focus:duration-300 border-0  text-[0.9rem] rounded outline-0 md:mx-8  w-full md:w-[85%] h-9 ring-1 ring-red-400 focus:ring-red-400 focus:ring-1"
    }


    const clear = () => {
        setFormValues({ ...formValues, email: '', password: '' });
    }

    const onLogin = () => {

        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!formValues.email) {
            setFormErr({ ...formErr, email: true })
            return;
        } else if (!regex.test(formValues.email)) {
            setFormErr({ ...formErr, email: true })
            return;
        }
        if (!formValues.password) {
            setFormErr({ ...formErr, pwd: true })
            return;
        }
        setSpinner(true)
        axios.post('http://localhost:5001/user/login', formValues)
        .then((response) => {
          setSpinner(false)
          let type = response.data.data.userType;
          localStorage.setItem("userId", JSON.stringify(response.data.data._id));
          localStorage.setItem("authToken", JSON.stringify(response.data.token));
        //   localStorage.setItem("userType", JSON.stringify(type));
        //   console.log(type);
        if(type === 'admin'){
            router.push('/admin/dashboard')
        }else{
          router.push('/user/view')
        }
          clear()

        })
        .catch((error) => {
          setSpinner(false)
          clear()
          return console.log(error);
        });
    }
    return (
        <>
            <div className="flex justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 items-center bg-slate-200 h-screen">
                <div className=" w-auto h-[60%] shadow-md shadow-gray-600 rounded-lg mx-3 bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 ">
                    <div className=' mt-6 flex justify-center items-center rounded-xl bg-transparent '>
                        <span className=' text-3xl text-slate-50'> Login </span>
                    </div>
                    <div className=' p-6 mt-8 justify-center items-center bg-transparent'>
                        <div className={formErr.email ? classes.inValid : classes.valid}>
                            <FaRegUser size={15} color='white' />
                            <input
                                type={'text'}
                                id="email"
                                name="email"
                                autoComplete=''
                                value={formValues.email}
                                onChange={(e) => { setFormErr({ ...formErr, email: false }); setFormValues({ ...formValues, email: e.target.value }) }}
                                className=' border-0 bg-transparent outline-0 w-full px-2'
                            />
                        </div>

                        <div className='mt-5'>
                            <div className={formErr.pwd ? classes.inValid : classes.valid}>
                                <RiLockPasswordLine size={18} color='white' />
                                <input
                                    type={'password'}
                                    value={formValues.password}
                                    onChange={(e) => { setFormErr({ ...formErr, pwd: false }); setFormValues({ ...formValues, password: e.target.value }) }}
                                    className='border-0 bg-transparent outline-0 w-full px-2'
                                    name="password"
                                    id="password" />
                            </div>
                        </div>
                        <button className=" float-right h-6 text-gray-50 text-xs">Forgot password?</button>
                        <div className="flex justify-center align-center mt-8 w-full ">
                            <button onClick={() => onLogin()} className='bg-gray-800 w-[6rem] ring-1 ring-gray-800 h-10 text-white rounded-md hover:bg-gray-600 hover:ring-0 flex justify-center items-center font-semibold transition ease-in-out hover:duration-300'>
                            {spinner ? <AiOutlineLoading3Quarters className='animate-spin'/> : 'Login'}
                            </button>
                        </div>
                        <div className="mt-4 text-center text-sm text-gray-50">New User?<button onClick={() => { setShowModal(true); }} className='sm:mx-3 text-sm'>Register</button></div>
                    </div>
                </div>
            </div>

            {showModal ? <Modal
            setShowModal={setShowModal}
            // getData={getData}
            action={action}
      /> : null}
        </>
    );
}

export default Login;

Login.getLayout = function PageLayout(page) {
    return (
      <>
        {page}
      </>
    )
  }