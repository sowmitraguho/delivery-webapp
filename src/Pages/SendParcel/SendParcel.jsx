import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const SendParcel = () => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        let cost = 50;
        if (data.type === 'non-document') {
            cost += parseFloat(data.weight || 0) * 10;
        }
        if (data.senderServiceCenter !== data.receiverServiceCenter) {
            cost += 30;
        }

        // toast.info(`Delivery Cost: $${cost.toFixed(2)}`, {
        //     position: 'top-center',
        //     autoClose: false,
        //     closeOnClick: false,
        //     draggable: false,
        //     onClose: async () => {
        //         const parcel = {
        //             ...data,
        //             cost,
        //             creation_date: new Date().toISOString()
        //         };
        //         console.log(parcel);
        //         // Save to localStorage
        //         const existing = JSON.parse(localStorage.getItem('parcels') || '[]');
        //         localStorage.setItem('parcels', JSON.stringify([...existing, parcel]));

        //         // Save to fake API
        //         // await fetch('https://fake-api.example.com/parcels', {
        //         //     method: 'POST',
        //         //     headers: { 'Content-Type': 'application/json' },
        //         //     body: JSON.stringify(parcel)
        //         // });

        //         toast.success('Parcel successfully submitted!');
        //         reset();
        //     },
        //     toastId: 'cost-toast',
        //     render: ({ closeToast }) => (
        //         <div className="text-center">
        //             <p className="mb-2">Delivery Cost: ${cost.toFixed(2)}</p>
        //             <button className="btn btn-sm bg-[#caeb66] text-[#03373d] dark:bg-[#4b6e0f] dark:text-white" onClick={closeToast}>Confirm</button>
        //         </div>
        //     )
        // });

        Swal.fire({
            title: "Are you sure?",
            text: `Delivery Cost: $${cost.toFixed(2)}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm!"
        }).then((result) => {
            if (result.isConfirmed) {
                const parcel = {
                    ...data,
                    cost,
                    creation_date: new Date().toISOString()
                };
                console.log(parcel);
                // Save to localStorage
                const existing = JSON.parse(localStorage.getItem('parcels') || '[]');
                localStorage.setItem('parcels', JSON.stringify([...existing, parcel]));

                // Save to fake API
                // await fetch('https://fake-api.example.com/parcels', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(parcel)
                // });

                Swal.fire({
                    title: "Order Confirmed!",
                    text: 'Parcel successfully submitted!',
                    icon: "success"
                });
                reset();
            }
        });



    };


    //watch 
    const senderRegion = watch('senderRegion');
    const receiverRegion = watch('receiverRegion');

    const serviceCenters = {
        "Dhaka": [
            "Dhaka", "Gazipur", "Kishoreganj", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi",
            "Rajbari", "Shariatpur", "Tangail", "Faridpur", "Gopalganj", "Madaripur"
        ],
        "Chattogram": [
            "Chattogram", "Cox's Bazar", "Bandarban", "Rangamati", "Khagrachari",
            "Brahmanbaria", "Comilla", "Chandpur", "Feni", "Noakhali", "Lakshmipur"
        ],
        "Rajshahi": [
            "Rajshahi", "Chapainawabganj", "Naogaon", "Natore", "Joypurhat",
            "Pabna", "Sirajganj", "Bogura"
        ],
        "Khulna": [
            "Khulna", "Bagerhat", "Satkhira", "Jessore", "Jhenaidah", "Magura", "Meherpur", "Narail", "Kushtia", "Chuadanga"
        ],
        "Barisal": [
            "Barisal", "Barguna", "Bhola", "Jhalokathi", "Patuakhali", "Pirojpur"
        ],
        "Sylhet": [
            "Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"
        ],
        "Rangpur": [
            "Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat",
            "Nilphamari", "Panchagarh", "Thakurgaon"
        ],
        "Mymensingh": [
            "Mymensingh", "Netrokona", "Sherpur", "Jamalpur"
        ]
    };


    const type = watch('type');

    return (
        <div className="max-w-7xl mx-auto p-20 text-[#03373d] shadow-2xl my-16 dark:text-white">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-2">Send a Parcel</h1>
            <p className="mb-6">Send documents or packages quickly and securely using our delivery service.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="card p-6 bg-white dark:bg-gray-800 shadow border border-green-950 dark:border-white">
                    <h2 className="text-xl font-semibold mb-4">Parcel Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label>Type</label>
                            <select className="select select-bordered w-full" {...register("type", { required: true })}>
                                <option value="">Select type</option>
                                <option value="document">Document</option>
                                <option value="non-document">Non-Document</option>
                            </select>
                            {errors.type && <p className="text-red-500">Required</p>}
                        </div>
                        <div>
                            <label>Title</label>
                            <input className="input input-bordered w-full" {...register("title", { required: true })} />
                            {errors.title && <p className="text-red-500">Required</p>}
                        </div>
                        {type === 'non-document' && (
                            <div>
                                <label>Weight (kg)</label>
                                <input className="input input-bordered w-full" type="number" step="0.01" {...register("weight")} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Sender Info */}
                <div className="card p-6 bg-white dark:bg-gray-800 shadow  border border-green-950 dark:border-white">
                    <h2 className="text-xl font-semibold mb-4">Sender Info</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label>Name</label>
                            <input className="input input-bordered w-full" defaultValue="Your Name" {...register("senderName", { required: true })} />
                            {errors.senderName && <p className="text-red-500">Required</p>}
                        </div>
                        <div>
                            <label>Contact</label>
                            <input className="input input-bordered w-full" {...register("senderContact", { required: true })} />
                            {errors.senderContact && <p className="text-red-500">Required</p>}
                        </div>
                        <div>
                            <label>Region</label>
                            <select className="select select-bordered w-full" {...register("senderRegion", { required: true })}>
                                <option value="">Select</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Chattogram">Chattogram</option>
                                <option value="Rajshahi">Rajshahi</option>
                                <option value="Khulna">Khulna</option>
                                <option value="Barisal">Barisal</option>
                                <option value="Sylhet">Sylhet</option>
                                <option value="Rangpur">Rangpur</option>
                                <option value="Mymensingh">Mymensingh</option>

                            </select>
                            {errors.senderRegion && <p className="text-red-500">Required</p>}
                        </div>
                        <div>
                            <label>Service Center</label>
                            <select className="select select-bordered w-full" {...register("senderServiceCenter", { required: true })}>
                                <option value="">Select</option>
                                {serviceCenters[senderRegion]?.map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>

                            {errors.senderServiceCenter && <p className="text-red-500">Required</p>}
                        </div>
                        <div>
                            <label>Address</label>
                            <input className="input input-bordered w-full" {...register("senderAddress", { required: true })} />
                            {errors.senderAddress && <p className="text-red-500">Required</p>}
                        </div>
                        <div>
                            <label>Pick-up Instruction</label>
                            <textarea className="textarea textarea-bordered w-full" {...register("pickupInstruction", { required: true })}></textarea>
                            {errors.pickupInstruction && <p className="text-red-500">Required</p>}
                        </div>
                    </div>
                </div>
                {/* Reciever Info */}
                <div className="card p-6 bg-white dark:bg-gray-800 shadow  border border-green-950 dark:border-white">
                    <h2 className="text-xl font-semibold mb-4">Receiver Info</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label>Name</label>
                            <input className="input input-bordered w-full" {...register("receiverName", { required: true })} />
                            {errors.receiverName && <p className="text-red-500">Required</p>}
                        </div>
                        <div>
                            <label>Contact</label>
                            <input className="input input-bordered w-full" {...register("receiverContact", { required: true })} />
                            {errors.receiverContact && <p className="text-red-500">Required</p>}
                        </div>
                        <div>
                            <label>Region</label>
                            <select className="select select-bordered w-full" {...register("receiverRegion", { required: true })}>
                                <option value="">Select</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Chattogram">Chattogram</option>
                                <option value="Rajshahi">Rajshahi</option>
                                <option value="Khulna">Khulna</option>
                                <option value="Barisal">Barisal</option>
                                <option value="Sylhet">Sylhet</option>
                                <option value="Rangpur">Rangpur</option>
                                <option value="Mymensingh">Mymensingh</option>


                            </select>
                            {errors.receiverRegion && <p className="text-red-500">Required</p>}
                        </div>
                        <div>
                            <label>Service Center</label>
                            <select className="select select-bordered w-full" {...register("receiverServiceCenter", { required: true })}>
                                <option value="">Select</option>
                                {serviceCenters[receiverRegion]?.map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>

                            {errors.receiverServiceCenter && <p className="text-red-500">Required</p>}
                        </div>
                        <div>
                            <label>Address</label>
                            <input className="input input-bordered w-full" {...register("receiverAddress", { required: true })} />
                            {errors.receiverAddress && <p className="text-red-500">Required</p>}
                        </div>
                        <div>
                            <label>Delivery Instruction</label>
                            <textarea className="textarea textarea-bordered w-full" {...register("deliveryInstruction", { required: true })}></textarea>
                            {errors.deliveryInstruction && <p className="text-red-500">Required</p>}
                        </div>
                    </div>
                </div>
                </div>

                <div className="text-center">
                    <button className="btn w-full text-lg bg-[#caeb66] text-[#03373d] dark:bg-[#4b6e0f] dark:text-white " type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SendParcel;