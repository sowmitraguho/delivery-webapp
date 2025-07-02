import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';


const SendParcel = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const axios = useAxios();
    //cost calculation
    const calculateCostBreakdown = (data) => {
        const isOutside = data.senderServiceCenter !== data.receiverServiceCenter;
        const type = data.type;
        const weight = parseFloat(data.weight) || 0;
        let baseCost = 0;
        let extraCharge = 0;
        let total = 0;
        let notes = [];

        if (type === "document") {
            baseCost = isOutside ? 80 : 60;
            total = baseCost;
            notes.push(`Base Charge for Document (${isOutside ? 'Outside' : 'Within'} City): Tk ${baseCost}`);
        } else {
            if (weight <= 3) {
                baseCost = isOutside ? 150 : 110;
                total = baseCost;
                notes.push(`Base Charge for more than or equal 3Kg Non-Document Product (${isOutside ? 'Outside' : 'Within'} City): Tk ${baseCost}`);
            } else {
                baseCost = isOutside ? 150 : 110;
                const additional = parseFloat(((weight - 3) * 40).toFixed(2));
                extraCharge = isOutside ? additional + 40 : additional;
                total = baseCost + extraCharge;
                notes.push(`Base Charge for more than 3Kg Non-Document Product: Tk ${baseCost}`);
                notes.push(`Extra Weight Charge: Tk ${additional}`);
                if (isOutside) notes.push(`Outside City Extra: Tk 40`);
            }
        }

        return { total, notes };
    };



    const proceedToPayment = (parcelData) => {
        console.log("Proceeding to payment with:", parcelData);
        // You’ll plug in your payment system here
    };


    const onSubmit = async (data) => {
        let cost = 50;
        if (data.type === 'non-document') {
            cost += parseFloat(data.weight || 0) * 10;
        }
        if (data.senderServiceCenter !== data.receiverServiceCenter) {
            cost += 30;
        }

        //cost calculation
        const { notes, total } = calculateCostBreakdown(data);

        Swal.fire({
            title: "Payment Breakdown & Confirmation",
            html: `
                    <div class="text-left leading-relaxed">
                        <p><strong>Parcel Type:</strong> ${data.type}</p>
                        <p><strong>Weight:</strong> ${data.weight || 'N/A'} kg</p>
                        <hr class="my-2"/>
                        ${notes.map(n => `<p>✅ ${n}</p>`).join('')}
                        <hr class="my-2"/>
                        <p class="text-lg font-bold">Total Cost: Tk ${total}</p>
                    </div>
    `,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#caeb66", // match light mode
            cancelButtonColor: "#03373d", // match dark mode
            confirmButtonText: `<span class="flex items-center gap-2"> Proceed to Pay</span>`,
            cancelButtonText: `<span class="flex items-center gap-2"> Continue Editing</span>`,
            customClass: {
                confirmButton: "btn text-[#03373d] dark:text-white bg-[#caeb66] dark:bg-[#4b6e0f] border-none",
                cancelButton: "btn bg-[#03373d] text-white hover:bg-[#055c6c] border-none",
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const parcel = {
                    ...data,
                    cost,
                    creation_date: new Date().toISOString()
                };

                // Save to localStorage
                const existing = JSON.parse(localStorage.getItem('parcels') || '[]');
                localStorage.setItem('parcels', JSON.stringify([...existing, parcel]));

                //conected to server
                axios.post('/parcels', parcel)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));

                // TODO: Integrate real payment gateway here
                Swal.fire({
                    title: "Payment proceeding!",
                    icon: "success",
                    draggable: true
                });
                proceedToPayment(parcel);

            } else {
                console.log("User chose to continue editing.");
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