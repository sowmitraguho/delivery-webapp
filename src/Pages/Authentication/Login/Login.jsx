import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => console.log(data);
    return (
        <div className='flex flex-col justify-center'>
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
        </div>
    );
};

export default Login;