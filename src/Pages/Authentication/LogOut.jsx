import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const LogOut = () => {
    const { LogOut } = useContext(AuthContext);

    const handleLogOut = () => {


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to access some features!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                LogOut()
                    .then(() => {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "You have logged out successfully!!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }).catch((error) => {
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: error.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
            }
        });






    }
    return (
        <div>
            <button onClick={handleLogOut} className="btn border-none shadow-none bg-[#caeb66] text-[#03373d] rounded font-bold  hover:bg-[#03373d] hover:text-[#caeb66] transition-colors duration-300">Log Out</button>
        </div>
    );
};

export default LogOut;