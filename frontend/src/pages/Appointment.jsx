import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctor from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [reportImg, setreportImg] = useState('')
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [speciality, setSpeciality] = useState([]);
  const fetchDocInfo = () => {
    const foundDoc = doctors.find(doc => doc._id === docId);
    setDocInfo(foundDoc || null);
  };
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setreportImg(e.target.files[0])
    console.log(e.target.files[0]);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const getAvailableSlots = () => {
    if (!docInfo) return; // Only fetch slots if doctor info is available

    setDocSlots([]);
    let today = new Date();

    for (let i = 1; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDate()
        let month = currentDate.getMonth()+1
        let year = currentDate.getFullYear()

        const slotDate = day+"_"+month+"_"+year
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if(isSlotAvailable){
          timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
        
      }
      setDocSlots(prev => ([...prev, timeSlots]));

      
    }
  };

  const bookAppointment = async () => {
    if(!token){
      toast.warn('Login to book appointment')
      return navigate('/login')
    }
    
    
    
    try {
      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth()+1
      let year = date.getFullYear()
      
      const slotDate = day+"_"+month+"_"+year
      const formData = new FormData();
    formData.append("image", reportImg); 
    formData.append('docId',docId)
    formData.append('slotDate',slotDate)
    formData.append('slotTime',slotTime)
    formData.append('symptoms',speciality)
    

      console.log({slotDate,docId,speciality});
      console.log("aaaaaaaaaaaaa",reportImg);
      const {data} = await axios.post(backendUrl+'/api/user/book-appointment', formData, {headers: {token}})
      
      if(data.success){
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return docInfo && (
    <div>
      {/* ---------- Doctor Details ---------- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" />
          </p>

          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
          </div>

          <p className="text-gray-500 font-medium mt-4">
            Appointment fee: <span className='text-gray-600 font-bold'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* ---------- Booking Slots ---------- */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking slots</p>

        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length > 0 && docSlots[slotIndex]?.map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
        <div className="flex-1 flex flex-col gap-1">
  <p>Symptoms</p>
  <div className="flex flex-col gap-2">
    {["Vommiting", "HeadAche", "Fever/Cold/Cough", "Asthma", "Stroke", "Skin Allergies"].map((specialty) => (
      <label key={specialty} className="flex items-center gap-2">
        <input 
          type="checkbox" 
          value={specialty} 
          checked={speciality.includes(specialty)} 
          onChange={(e) => {
            if (e.target.checked) {
              // Add to the selected specialties if not already selected and if less than 2 are selected
              if (speciality.length < 2) setSpeciality([...speciality, specialty]);
            } else {
              // Remove the specialty if unchecked
              setSpeciality(speciality.filter((item) => item !== specialty));
            }
          }}
          className="border rounded"
        />
        {specialty}
      </label>
    ))}
  </div>
</div>
        </div>
        <div className="my-6">
            {/* <input
              type="file"
              accept="image/*"
              id="fileUpload"
              onChange={(e)=> setreportImg(e.target.files[0])
            }
              className="hidden" // This hides the input field
            /> */}
            <input
              type="file"
              accept="image/*"
              id="fileUpload"
              onChange={handleImageChange
            }
              className="hidden" // This hides the input field
            />
   {image && (
  <div className="mt-4 mb-6 space-y-2">

    <div className="p-4 border border-gray-200 rounded-lg shadow-lg bg-gray-50 inline-block items-center">
      <div className="w-40 h-30 rounded-lg overflow-hidden">
        <img
          src={image}
          alt="Uploaded Preview"
          className="w-full h-full object-cover"
          />
      </div>
    <button
      className="mt-3 ml-4 px-4 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition"
      onClick={() => setImage(null)}
      >
      Remove Image
    </button>
    </div>

  </div>
)}



            <label
              htmlFor="fileUpload"
              className={`bg-primary text-white text-sm font-light px-10 py-3 rounded-full cursor-pointer ${
                !slotTime ? "opacity-50 cursor-not-allowed" : ""
              }`}
              style={{ pointerEvents: slotTime ? "auto" : "none" }} // Disable interaction if slotTime is false
            >
              Upload Your Test Report
            </label>
          </div>
        {/* Placeholder for booking button */}
        <button onClick={bookAppointment} className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6" disabled={!slotTime}>Book an appointment</button>
      </div>

      {/* Listing Related Doctors */}
      <RelatedDoctor docId={docId} speciality={docInfo.speciality} />

    </div>
  );
};

export default Appointment;
