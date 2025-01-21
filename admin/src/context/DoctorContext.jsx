import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [appointments, setAppointments] = useState([])
    const [dashData,setDashData]=useState(false)
    const [ProfileData,setProfileData]=useState(false)
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/doctor/appointments", { headers: { dToken } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
                console.log(data.appointments);

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }
    }
    const backendUrl = "http://localhost:3000"

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + "/api/doctor/complete-appointment", { appointmentId }, { headers: { dToken } })
            if (data.success) {
                
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(data.message)

        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + "/api/doctor/cancel-appointment", { appointmentId }, { headers: { dToken } })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(data.message)

        }
    }

const getDashData =async ()=>{
    try {
        const {data} = await axios.get(backendUrl+'/api/doctor/dashboard',{headers:{dToken}})
        if (data.success) {
            console.log(data);
            setDashData(data.dashData)
        } else {
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error);
        toast.error(data.message)

    }
}

const getProfileData = async()=>{
    try {
        const {data} = await axios.get(backendUrl+'/api/doctor/profile',{headers:{dToken}})
        if (data.success) {
            console.log(data.profileData);
            setProfileData(data.profileData)
        } else {
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error);
        toast.error(data.message)

    }
}

    const value = {
        dToken, setDToken,
        backendUrl,
        appointments, setAppointments,
        getAppointments,
        cancelAppointment,completeAppointment,
        dashData,setDashData,getDashData,
        ProfileData,setProfileData,getProfileData
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider