import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Contexts/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const { createUser, GoogleSignIn } = useContext(AuthContext);

    const onSubmit = (data) => {
        console.log(data);
        const { email, password } = data;
        createUser(email, password)
            .then(user => {
                const currentUser = user.user;
                console.log(currentUser);
                
            }).catch(err => {
                console.log(err.message);
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
                    <label className="label">Name</label>
                    <input type="text" {...register('name')} className="input w-sm" placeholder="Enter Your Full Name" />
                    <label className="label">PhotoURL</label>
                    <input type="text" {...register('PhotoURL')} className="input w-sm" placeholder="Enter Your PhotoURL" />
                    <label className="label">Email</label>
                    <input type="email" {...register('email')} className="input w-sm" placeholder="Email" />
                    <label className="label">Password</label>
                    <input type="password" {...register('password')} className="input w-sm" placeholder="Password" />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4 w-sm">SignUp</button>

                </fieldset>
            </form>
            <div className="divider w-sm">OR</div>
            <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5] w-sm">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                SignUp with Google
            </button>
        </div>
    );
};

export default SignUp;