import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Contexts/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../../../firebase.init';

const SignUp = () => {
    const { register, handleSubmit, reset } = useForm();
    const { createUser, GoogleSignIn } = useContext(AuthContext);

    const onSubmit = (data) => {
        console.log(data);
        const { email, password } = data;
        createUser(email, password)
            .then(user => {
                //const currentUser = user.user;
                console.log(user.user);
                updateProfile(auth.currentUser, {
                    displayName: data.displayName, photoURL: data.photoURL
                }).then(() => {
                    // Profile updated!
                    Swal.fire({
                        title: "Registration SuccessFull!",
                        icon: "success",
                        draggable: true
                    });
                    reset();
                }).catch((error) => {
                    // An error occurred
                    Swal.fire({
                        title: "Account Creation failed!",
                        text: error.message,
                        icon: "error",
                        draggable: true
                    });
                });

            }).catch(err => {
                 Swal.fire({
                        title: "Account Creation failed!",
                        text: err.message,
                        icon: "error",
                        draggable: true
                    });
            })

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
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                console.log(error.message);
            });
    }
    return (
        <div>
            <div className="text-center lg:text-left mb-4">
                <h1 className="text-5xl font-bold">SignUp now!</h1>

            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <label className=" text-[#03373d] dark:text-[#caeb66] font-semibold text-sm">Name</label>
                    <input type="text" {...register('displayName')} className="input w-sm" placeholder="Enter Your Full Name" />
                    <label className=" text-[#03373d] dark:text-[#caeb66] font-semibold text-sm">PhotoURL</label>
                    <input type="text" {...register('photoURL')} className="input w-sm" placeholder="Enter Your PhotoURL" />
                    <label className=" text-[#03373d] dark:text-[#caeb66] font-semibold text-sm">Email</label>
                    <input type="email" {...register('email')} className="input w-sm" placeholder="Email" />
                    <label className=" text-[#03373d] dark:text-[#caeb66] font-semibold text-sm">Password</label>
                    <input type="password" {...register('password')} className="input w-sm" placeholder="Password" />
                    <a className="link link-hover my-2 text-sm text-[#03373d] dark:text-[#caeb66]">Forgot password?</a>
                    <PrimaryButton buttonText={`SignUp`} />

                </fieldset>
            </form>
            <div className="divider w-sm">OR</div>
            <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5] w-sm hover:bg-[#03373d] hover:text-[#caeb66] transition-colors duration-300">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                SignUp with Google
            </button>
            <div className='flex gap-2 pt-2'>
                <p className='text-[#03373d] dark:text-[#caeb66]'>Already have an account? </p>
                <Link className='link-hover text-lime-700 dark:text-lime-300' to='/login'>Please Login</Link>
            </div>
        </div>
    );
};

export default SignUp;