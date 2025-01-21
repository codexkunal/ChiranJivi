import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { ProfileData, setProfileData, getProfileData, dToken,backendUrl  } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  const updateProfile = async () => {
    try {
      const updateData = {
        address: ProfileData.address,
        fees: ProfileData.fees,
        available: ProfileData.available
      }
      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })
      if (data.success) {
        setIsEdit(false)
        getProfileData()
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  return ProfileData && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={ProfileData.image} alt="" />
        </div>
        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          <p className='frlx items-center gap-2 text-3xl font-medium text-gray-700'>{ProfileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{ProfileData.degree}- {ProfileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{ProfileData.experience}</button>
          </div>

          <div>
            <p className='flex items-center text-sm gap-1 font-medium text-neutral-800 mt-3'>
              About:
            </p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
              {ProfileData.about}
            </p>
          </div>
          <p className='text-gray-600 mt-4 font-medium'>
            Appointment Fee: <span className='text-gray-800'>{currency} {isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={ProfileData.fees} /> : ProfileData.fees}</span>
          </p>

          <div className='flex gap-2 p-2'>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={ProfileData.address.line1} /> : ProfileData.address.line1}
              <br />
              {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={ProfileData.address.line2} /> : ProfileData.address.line2}
            </p>
          </div>

          <div className='flex gap-1 pt-2'>
            <input checked={ProfileData.available} onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} type="checkbox" />
            <label htmlFor="" >Available</label>

          </div>
          {
            isEdit ?

              <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
              :
              <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
