import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import ReactToPrint from 'react-to-print';
import useCarsList from "../../Hooks/useCarsList";
import './Home.css';

const Home = () => {
    const [pickupDate, setPickupDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [reservationId, setReservationId] = useState('')
    const [discount, setDiscount] = useState('')
    const [vehicleName, setVehicleName] = useState('')
    const [vehicleMake, setVehicleMake] = useState('')
    const [selectedRates, setSelectedRates] = useState(0);
    const [selectDuration, setSelectDuration] = useState('');
    const [selectDurationValue, setSelectDeurationValue] = useState();
    const [collisionDamageWaiver, setCollisionDamageWaiver] = useState(0);
    const [liabilityInsurance, setLiabilityInsurance] = useState(0);
    const [carList] = useCarsList();
    const vehicleType = [...new Set(carList.map(item => item.type))]
    const valicle = carList.map(item => item.make)
    const [nameFirst, setFirstName] = useState();
    const [nameLast, setLastName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userPhone, setUserPhone] = useState();
    const ref = useRef()

    const firstName = (e) => {
        const nameFirst = e.target.value
        setFirstName(nameFirst);
    }
    const lastName = (e) => {
        const nameLast = e.target.value
        setLastName(nameLast);
    }
    const email = (e) => {
        const uEmail = e.target.value
        setUserEmail(uEmail);
    }
    const phone = (e) => {
        const uPhone = e.target.value
        setUserPhone(uPhone);
    }

    const handleDownload = () => {
        // pickup & return date validation
        if (pickupDate >= returnDate) {
            return toast.error('Please select valid return date.!')
        }
    }

    const handleVehicleMake = (e) => {
        const make = e.target.value
        setVehicleMake(make)
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
    }
    // additional charge
    const handleCheckboxDamage = (e) => {
        setCollisionDamageWaiver(e.target.checked ? 9.00 : 0);
    }
    const handleCheckboxInsurance = (e) => {
        setLiabilityInsurance(e.target.checked ? 15.00 : 0)
    }
    // rate for every cars
    const rate = () => {
        if (!selectedRates || !selectDurationValue) return 0;
        const rentPrice = selectDuration === "Hourly" ? selectedRates.hourly : selectDuration === "Daily" ? selectedRates.daily : selectedRates.weekly;
        return rentPrice
    }
    // price for each rents
    const price = () => {
        if (!selectedRates || !selectDurationValue) return 0;
        const totalDuration = selectDuration === "Hourly" ? selectedRates.hourly : selectDuration === "Daily" ? selectedRates.daily : selectedRates.weekly;
        return (totalDuration * selectDurationValue) || 0;
    }
    const totalRentalCost = () => {
        if (!selectedRates || !selectDurationValue) return 0;
        const totalDuration = selectDuration === "Hourly" ? selectedRates.hourly : selectDuration === "Daily" ? selectedRates.daily : selectedRates.weekly;
        return <div>
            {
                (totalDuration * selectDurationValue + liabilityInsurance + collisionDamageWaiver) - discount
            }
        </div> || 0;
    };

    return (
        <div className="max-w-7xl mx-auto my-10">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="flex justify-between mb-9">
                <h1 className="text-3xl font-bold">Reservation</h1>
                <ReactToPrint trigger={() => <button onClick={handleDownload} className="bg-[#5D5CFF] rounded py-2 px-4 text-white">Print / Download</button>} content={() => ref.current} ></ReactToPrint>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
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
                                    <input onChange={handleDurationValue} className="w-full " defaultValue={0} name="durationValue" type="number" placeholder="1 Hour 1 Day 1 Week" />
                                    <select onChange={handleDuration} value={selectDuration} name="duration">
                                        <option defaultValue="">Select One</option>
                                        <option value="Hourly">Hourly</option>
                                        <option value="Daily">Daily</option>
                                        <option value="Weekly">Weekly</option>
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
                            <input onChange={firstName} className="p-2 border border-[#d7d7ff] rounded my-2" type="text" name="first_name" required />
                            <label className="my-2">Last Name : <span className="text-red-600">*</span></label>
                            <input onChange={lastName} className="p-2 border border-[#d7d7ff] rounded my-2" type="text" name="last_name" required />
                            <label className="my-2">Email: <span className="text-red-600">*</span></label>
                            <input onChange={email} className="p-2 border border-[#d7d7ff] rounded my-2" type="email" name="email" required />
                            <label className="my-2">Phone: <span className="text-red-600">*</span></label>
                            <input onChange={phone} className="p-2 border border-[#d7d7ff] rounded my-2" type="number" name="phone" required />
                        </form>
                    </div>
                </div>
                {/* Charges Summary */}
                <div>
                    <h2 className="border-b border-[#5d5cff] mb-5 text-xl font-semibold">Charges Summary</h2>
                    <div className="border p-5 border-[#5d5cff] rounded bg-[#DFDFFF]">
                        <table className="w-full">
                            <thead className="mb-3 border-b border-[#5d5cff] text-left">
                                <tr>
                                    <th>Charge</th>
                                    <th>Unit</th>
                                    <th>Rate</th>
                                    <th className="text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{selectDuration}</td>
                                    <td>1</td>
                                    <td>
                                        ${rate()}
                                    </td>
                                    <td className="text-right">
                                        ${price()}
                                    </td>
                                </tr>
                                {/* additional charge */}
                                <tr>
                                    <td>{collisionDamageWaiver === 0 ? '' : 'Collision Damage Waiver'}</td>
                                    <td></td>
                                    <td>{collisionDamageWaiver === 0 ? '' : <p>${collisionDamageWaiver}</p>}</td>
                                    <td className="text-right">{collisionDamageWaiver === 0 ? '' : <p>${collisionDamageWaiver}</p>}</td>
                                </tr>
                                <tr>
                                    <td>{liabilityInsurance === 0 ? '' : 'Liability Insurance'}</td>
                                    <td></td>
                                    <td>{liabilityInsurance === 0 ? '' : <p>${liabilityInsurance}</p>}</td>
                                    <td className="text-right">{liabilityInsurance === 0 ? '' : <p>${liabilityInsurance}</p>}</td>
                                </tr>
                                {/* discount */}
                                <tr>
                                    <td>{discount ? 'Discount' : ''}</td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-right">
                                        {discount ? <p>${discount}</p> : ''}
                                    </td>
                                </tr>
                                {/* total */}
                                <tr>
                                    <td>Total</td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-right">${totalRentalCost()}</td>
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
                            <select onChange={handleVehicleMake} className="border p-3 rounded border-[#d7d7ff]" name="vehicle_type" required>
                                {
                                    vehicleType.map((item, idx) => <option value={item} key={idx}>{item}</option>)
                                }
                            </select>
                            <label className="my-2">Vehicle <span className="text-red-600">*</span></label>
                            <select onChange={handleSelectVehicle} className="border p-3 rounded border-[#d7d7ff]" name="vehicle" value={vehicleName} required>
                                <option defaultValue=''>Select One</option>
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
                                    <input onChange={handleCheckboxDamage} className="mr-2" type="checkbox" name="Collision_Damage_Waiver" /> <label>Collision Damage Waiver</label>
                                </div>
                                <p>$9.00</p>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <input onChange={handleCheckboxInsurance} className="mr-2" type="checkbox" name="Collision_Damage_Waiver" /> <label>Liability Insurance</label>
                                </div>
                                <p>$15.00</p>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <input className="mr-2" type="checkbox" name="Collision_Damage_Waiver" /> <label>Rental Tax</label>
                                </div>
                                <p>$11.5%</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* print content or pdf content */}
            <div className="hidden">
                <div className="">
                    <div ref={ref} className="flex gap-5 px-12 py-10">
                        <div className="w-1/2">
                            <div className="flex justify-between">
                                <img className="w-[180px] h-[90px]" src="https://s3.amazonaws.com/cka-dash/182-1021-RTO100/model1.png" alt="logo" />
                                <div className="w-1/2">
                                    <p>CH Car Place Inc <br />162 Bergen st Brooklyn, <br /> NY 11213 <br />PH#</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div>
                                    <h2 className="font-semibold">RENTER INFO</h2>
                                    <p>{nameFirst} {nameLast} <br /> {userEmail}</p>
                                    <p>Phone : {userPhone}</p>
                                </div>
                                <div>
                                    <p> <span>Prickup Date and Time:</span> <br /> {pickupDate.toLocaleString()}</p>
                                    <p> <span>Return Date and Time:</span> <br /> {returnDate.toLocaleString()}</p>
                                </div>
                            </div>
                            <div>
                                <h2 className="font-semibold py-2">ADDITIONAL AUTHORIZED DRIVER(S)</h2>
                                <h3 className="font-semibold">UNIT DETAILS</h3>
                                <p>Unit: {vehicleName} <br />Make & Model: {vehicleMake} {vehicleName}</p>
                                <p className="mt-4">BILL TO:</p>
                                <p>Payment Type: Unpaid <br />AUTH: $0.00</p>
                                <p>Referral: <br /> NOTICE: <br /> Collision Insurance (CDW)- $7 per day</p>
                                <p>Limits liability of damages to one's own vehicle up to provides you coverage for rental vehicle damage or $1000 in event of an accident,by waiving this coverage renter agrees to be hold liable for damages up to the entire value of the vehicle.</p>
                                <div className="flex justify-between px-20 py-5">
                                    <button>Accept</button> <button>Reject</button>
                                </div>
                                <p>Rental service may be refused anyone when done in the best interest of the renting company or customer - Rates do not include gasoline. - Reserves the right Additional Driver 1 to collect deposit covering estimated rental charges.</p>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <h2>Reservation</h2>
                            <h3>RA #0121</h3>
                            <p>REPAIR ORDER:</p>
                            <p>CLAIM:</p>
                            <p>Date/Time Out: {returnDate.toLocaleString()} <br /> Date/Time In: {pickupDate.toLocaleString()} </p>
                            {/* charge summery */}
                            <div className="bg-[#e6e6e3]">
                                <h2 className="mb-5 text-xl font-semibold">Charges Summary</h2>
                                <div className="">
                                    <table className="w-full">
                                        <thead className="mb-3 border-b border-[#5d5cff] text-left">
                                            <tr>
                                                <th>Charge</th>
                                                <th>Unit</th>
                                                <th>Rate</th>
                                                <th className="text-right">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{selectDuration}</td>
                                                <td>1</td>
                                                <td>
                                                    ${rate()}
                                                </td>
                                                <td className="text-right">
                                                    ${price()}
                                                </td>
                                            </tr>
                                            {/* additional charge */}
                                            <tr>
                                                <td>{collisionDamageWaiver === 0 ? '' : 'Collision Damage Waiver'}</td>
                                                <td></td>
                                                <td>{collisionDamageWaiver === 0 ? '' : <p>${collisionDamageWaiver}</p>}</td>
                                                <td className="text-right">{collisionDamageWaiver === 0 ? '' : <p>${collisionDamageWaiver}</p>}</td>
                                            </tr>
                                            <tr>
                                                <td>{liabilityInsurance === 0 ? '' : 'Liability Insurance'}</td>
                                                <td></td>
                                                <td>{liabilityInsurance === 0 ? '' : <p>${liabilityInsurance}</p>}</td>
                                                <td className="text-right">{liabilityInsurance === 0 ? '' : <p>${liabilityInsurance}</p>}</td>
                                            </tr>
                                            {/* discount */}
                                            <tr>
                                                <td>{discount ? 'Discount' : ''}</td>
                                                <td></td>
                                                <td></td>
                                                <td className="text-right">
                                                    {discount ? <p>${discount}</p> : ''}
                                                </td>
                                            </tr>
                                            {/* total */}
                                            <tr>
                                                <td>Total</td>
                                                <td></td>
                                                <td></td>
                                                <td className="text-right">${totalRentalCost()}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <p>
                                Your rental agreement offers, for an additional charge, an optional waiver to cover all or a part of your responsibility for damage to or loss of the vehicle: Before deciding whether to purchase the walver, you may wish to determine whether your own automobile insurance or credit card agreement loss and determine the amount of the deductible under your own insurance coverage. The purchase of the waiver is not mandatory. The waiver is not Insurance. I acknowledge that I have received and read a copy of this.
                            </p>
                            <p className="mt-5">Renters Signature</p>
                            <p>__________________________________________</p>
                            <p>Additonal Driver 1</p>
                            <p>__________________________________________</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;