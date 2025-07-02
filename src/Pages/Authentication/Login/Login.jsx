import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { GoogleSignIn, signIn, loading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // Get the route user came from (or default to home)
    const from = location.state?.from?.pathname || '/';

    const onSubmit = (data) => {
        console.log(data);
        const {email, password} = data;
        signIn(email, password)
        .then (res=>{
            console.log(res.user);
        }).catch(err=>console.log(err));

    }
    const handleGoogleLogin = () => {
        GoogleSignIn()
            .then((result) => {
                const user = result.user;
                console.log(user);
                if (user?.uid) {
                    Swal.fire({
                        title: "You Have Logged in successfully! ",

                        icon: "success"
                    });
                }
                navigate(from, { replace: true });  
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                console.log(error.message);
            });
    }
    return (
        <div className='flex flex-col justify-center pb-10'>
            <div className="text-center lg:text-left mb-4">
                <h1 className="text-5xl font-bold">Login now!</h1>

            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <label className=" text-[#03373d] dark:text-[#caeb66] font-semibold text-sm">Email</label>
                    <input type="email" {...register('email')} className="input w-sm" placeholder="Email" />
                    <label className=" text-[#03373d] dark:text-[#caeb66] font-semibold text-sm">Password</label>
                    <input type="password" {...register('password')} className="input w-sm" placeholder="Password" />
                    <a className="link link-hover my-2 text-sm text-[#03373d] dark:text-[#caeb66]">Forgot password?</a>
                    <button className="btn border-none shadow-none bg-[#caeb66] text-[#03373d] rounded font-bold  hover:bg-[#03373d] hover:text-[#caeb66] transition-colors duration-300 w-sm">Login</button>
                </fieldset>
            </form>
            <div className="divider w-sm">OR</div>
            <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5] w-sm hover:bg-[#03373d] hover:text-[#caeb66] transition-colors duration-300">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                SignUp with Google
            </button>
            <div className='flex gap-2 mt-6'>
                <p className='text-[#03373d] dark:text-[#caeb66]'>Not have an account? </p>
                <Link className='link-hover text-lime-700 dark:text-lime-300' to='/signup'>Please SignUp</Link>
            </div>
        </div>
    );
};

export default Login;