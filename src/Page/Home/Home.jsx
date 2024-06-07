import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import useCarsList from "../../Hooks/useCarsList";
import './Home.css';
const Home = () => {
    const [pickupDate, setPickupDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [reservationId, setReservationId] = useState('')
    const [discount, setDiscount] = useState('')
    const [vehicleName, setVehicleName] = useState('')
    const [selectedRates, setSelectedRates] = useState(null);
    const [selectDuration, setSelectDuration] = useState('')
    const [selectDurationValue, setSelectDeurationValue] = useState(null)

    const [carList] = useCarsList();
    const vehicleType = [...new Set(carList.map(item => item.type))]
    const valicle = carList.map(item => item.make)
    


    const handleDownload = () => {
        // Reservation Details
        // pickup & return date validation
        if (pickupDate >= returnDate) {
            return toast.error('Please select valid return date.!')
        }
        const reservationDetails = {
            reservationId, discount, pickupDate, returnDate
        }
        console.log(reservationDetails);
    }

    const handleSelectVehicle = (e) => {
        const vehicle = e.target.value;
        setVehicleName(vehicle)
        const car = carList.find(car => car.make === vehicle);
        setSelectedRates(car ? car.rates : null);
    }
    // duration name like hour, day, week
    const handleDuration = (e) => {
        const duration = e.target.value;
        setSelectDuration(duration)
    }
    // duration value
    const handleDurationValue = (e) => {
        const durationValue = e.target.value;
        setSelectDeurationValue(durationValue)
        console.log(durationValue);
    }

    console.log(selectDuration);

    return (
        <div className="max-w-7xl mx-auto my-10">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="flex justify-between mb-9">
                <h1 className="text-3xl font-bold">Reservation</h1>
                <button onClick={handleDownload} className="bg-[#5D5CFF] rounded py-2 px-4 text-white">Print / Download</button>
            </div>
            <div className="grid grid-cols-3 gap-8">
                {/* Reservation Details */}
                <div>
                    <h2 className="border-b border-[#5d5cff] mb-5 text-xl font-semibold">Reservation Details</h2>
                    <div>
                        <form className="border border-[#d7d7ff] p-5 rounded flex flex-col">
                            <label>Reservation ID</label>
                            <input className="p-2 border border-[#d7d7ff] rounded my-2" type="text" name="reservation_Id" value={reservationId}
                                onChange={(e) => setReservationId(e.target.value)} />
                            <label className="my-2">Pickup Date<span className="text-red-600">*</span></label>
                            <DatePicker className="border rounded border-[#d7d7ff] text-[#828290] w-full p-2"
                                selected={pickupDate} onChange={(date) => setPickupDate(date)}
                                placeholderText="Select Date and Time"
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                                showIcon
                                toggleCalendarOnIconClick
                            />
                            <label className="my-2">Return Date <span className="text-red-600">*</span></label>
                            <DatePicker className="border rounded border-[#d7d7ff] text-[#828290] w-full p-2"
                                selected={returnDate} onChange={(date) => setReturnDate(date)}
                                placeholderText="Select Date and Time"
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                                showIcon
                                toggleCalendarOnIconClick
                            />
                            <div className="flex my-4 gap-4 items-center">
                                <label>Duration</label>
                                <div className="rounded border p-2 border-[#d7d7ff] flex w-full">
                                    <input onChange={handleDurationValue} className="w-full " name="durationValue" type="number" placeholder="1 Hour 1 Day 1 Week"/>
                                    <select onChange={handleDuration} value={selectDuration} name="duration">
                                        <option value="hourly">Hourly</option>
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                    </select>
                                </div>
                            </div>
                            <label className="my-2">Discount</label>
                            <input className="border rounded p-3  border-[#d7d7ff]" type="number" name="discount"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)} />
                        </form>
                    </div>
                </div>
                {/* Customer Information */}
                <div>
                    <h2 className="border-b border-[#5d5cff] mb-5 text-xl font-semibold">Customer Information</h2>
                    <div>
                        <form className="border border-[#d7d7ff] p-5 rounded flex flex-col">
                            <label className="my-2">First Name : <span className="text-red-600">*</span></label>
                            <input className="p-2 border border-[#d7d7ff] rounded my-2" type="text" name="first_name" required />
                            <label className="my-2">Last Name : <span className="text-red-600">*</span></label>
                            <input className="p-2 border border-[#d7d7ff] rounded my-2" type="text" name="last_name" required />
                            <label className="my-2">Email: <span className="text-red-600">*</span></label>
                            <input className="p-2 border border-[#d7d7ff] rounded my-2" type="email" name="email" required />
                            <label className="my-2">Phone: <span className="text-red-600">*</span></label>
                            <input className="p-2 border border-[#d7d7ff] rounded my-2" type="number" name="phone" required />
                        </form>
                    </div>
                </div>
                {/* Charges Summary */}
                <div>
                    <h2 className="border-b border-[#5d5cff] mb-5 text-xl font-semibold">Charges Summary</h2>
                    <div className="border p-5 border-[#5d5cff] rounded bg-[#DFDFFF]">
                        <table className="w-full">
                            <thead className="border-b border-[#5d5cff]">
                                <tr>
                                    <th>Charge</th>
                                    <th>Unit</th>
                                    <th>Rate</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Daily</td>
                                    <td>Daily</td>
                                    <td>Collision Damage Waiver</td>
                                    <td>Total</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>$99.00</td>
                                    <td>$99.00</td>
                                    <td>$99.00</td>
                                    <td>$99.00</td>
                                </tr>
                                <tr>
                                    <td>$99.00</td>
                                    <td>$99.00</td>
                                    <td>$99.00</td>
                                    <td>$1000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Vehicle Information */}
                <div>
                    <h2 className="border-b border-[#5d5cff] mb-5 text-xl font-semibold">Vehicle Information</h2>
                    <div>
                        <form className="border border-[#d7d7ff] p-5 rounded flex flex-col">
                            <label className="my-2">Vehicle Type : <span className="text-red-600">*</span></label>
                            <select className="border p-3 rounded border-[#d7d7ff]" name="vehicle_type" required>
                                {
                                    vehicleType.map((item, idx) => <option value={item} key={idx}>{item}</option>)
                                }
                            </select>
                            <label className="my-2">Vehicle <span className="text-red-600">*</span></label>
                            <select onChange={handleSelectVehicle} className="border p-3 rounded border-[#d7d7ff]" name="vehicle" value={vehicleName} required>                                
                                {
                                    valicle.map((item, idx) => <option value={item} key={idx}>{item}</option>)
                                }
                            </select>
                        </form>
                    </div>
                </div>
                {/* Additional Charges */}
                <div>
                    <h2 className="border-b border-[#5d5cff] mb-5 text-xl font-semibold">Additional Charges</h2>
                    <div>
                        <form className="border border-[#d7d7ff] p-5 rounded flex flex-col gap-3">
                            <div className="flex justify-between">
                                <div>
                                    <input className="mr-2" type="checkbox" name="Collision_Damage_Waiver" /> <label>Collision Damage Waiver</label>
                                </div>
                                <p>$9.00</p>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <input className="mr-2" type="checkbox" name="Collision_Damage_Waiver" /> <label>Liability Insurance</label>
                                </div>
                                <p>$15.00</p>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <input className="mr-2" type="checkbox" name="Collision_Damage_Waiver" /> <label>Collision Damage Waiver</label>
                                </div>
                                <p>$11.5%</p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* just show */}
                {selectedRates && (
                <div>
                    <h3>Rates for {vehicleName}</h3>
                    <p>Hourly: ${selectedRates.hourly * selectDurationValue}</p>
                    <p>Daily: ${selectedRates.daily * selectDurationValue}</p>
                    <p>Weekly: ${selectedRates.weekly * selectDurationValue}</p>
                </div>
            )}
            </div>
        </div>
    );
};

export default Home;