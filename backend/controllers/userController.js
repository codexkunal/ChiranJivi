import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import nodemailer from "nodemailer";
import "dotenv/config";


const registerUser = async (req, res) => {
  try {
    const { name, email, password, pincode } = req.body;

    if (!name || !password || !email || !pincode) {
      return res.json({
        success: false,
        message: "Missing details",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    if (pincode.length != 6) {
      return res.json({
        success: false,
        message: "Please enter a valid pincode",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
      pincode
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, message: "Login Successful", token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
      const imageURL = imageUpload.secure_url

      await userModel.findByIdAndUpdate(userId, { image: imageURL })
    }

    res.json({ success: true, message: "Profile updated" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// const bookAppointment = async (req, res) => {
//   try {
//     const { userId, docId, slotDate, slotTime, symptoms } = req.body;

//     const docData = await doctorModel.findById(docId).select('-password');
//     if (!docData.available) {
//       return res.json({ success: false, message: "Doctor not available" });
//     }

//     let slots_booked = docData.slots_booked;
//     if (slots_booked[slotDate]) {
//       if (slots_booked[slotDate].includes(slotTime)) {
//         return res.json({ success: false, message: "Slot not available" });
//       } else {
//         slots_booked[slotDate].push(slotTime);
//       }
//     } else {
//       slots_booked[slotDate] = [slotTime];
//     }

//     const userData = await userModel.findById(userId).select('-password');

//     delete docData.slots_booked;

//     const appointmentData = {
//       userId,
//       docId,
//       userData,
//       docData,
//       amount: docData.fees,
//       slotTime,
//       slotDate,
//       symptoms,
//       data: Date.now()
//     };

//     const newAppointment = new appointmentModel(appointmentData);
//     await newAppointment.save();

//     await doctorModel.findByIdAndUpdate(docId, { slots_booked });

//     const Allusers = await userModel.find(
//       { email: { $exists: true, $ne: null }, pincode: { $exists: true, $ne: null } }
//     ).select('_id email pincode');

//     const AllAppointment = await appointmentModel.find(
//       { symptoms: { $exists: true, $ne: null } }
//     ).select('userId symptoms createdAt');

//     const patients = Allusers.map(user => {
//       const userAppointments = AllAppointment.filter(appointment => appointment.userId.toString() === user._id.toString());
//       const latestAppointment = userAppointments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

//       return {
//         _id: user._id,
//         pincode: user.pincode,
//         symptoms: latestAppointment ? latestAppointment.symptoms : [],
//         email: user.email
//       };
//     });

//     async function checkDiseaseOverlap(patients, threshold) {
//       const alerts = {};

//       const groupedByPincode = patients.reduce((acc, patient) => {
//         if (!acc[patient.pincode]) acc[patient.pincode] = [];
//         acc[patient.pincode].push(patient);
//         return acc;
//       }, {});

//       for (const [pincode, patientsInPincode] of Object.entries(groupedByPincode)) {
//         const diseaseFrequency = {};

//         patientsInPincode.forEach(({ symptoms }) => {
//           symptoms.forEach(disease => {
//             diseaseFrequency[disease] = (diseaseFrequency[disease] || 0) + 1;
//           });
//         });

//         for (const [disease, count] of Object.entries(diseaseFrequency)) {
//           if (count >= threshold) {
//             console.log(`ALERT: Increase in ${disease} cases in pincode ${pincode}`);
//             await notifyPatients(pincode, disease); // Send notification asynchronously
//           }
//         }
//       }
//     }

//     async function notifyPatients(pincode, disease) {
      // const affectedPatients = patients.filter(
      //   patient => patient.pincode === pincode && patient.symptoms.includes(disease)
      // );
//       let transporter =  nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: "jugrajsingh46984@gmail.com",
//           pass: "sbjfkhvpserozbqp",
//         },
//       });

//       affectedPatients.forEach(patient => {
//         const mailOptions = {
//           from: 'jugrajsingh46984@gmail.com',
//           to: patient.email, 
//           subject: `ALERT: Increase in ${disease} Cases in Your Area`,
//           text: `Dear Patient,

//     We have detected an increase in cases of ${disease} in your area (Pincode: ${pincode}).
//     Please take the necessary precautions and consult a healthcare professional if needed.

//     Stay Safe,
//     Your Health Monitoring System`
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//           if (error) {
//             console.log(`Error sending email to ${patient.email}: `, error);
//           } else {
//             console.log(`Email sent to ${patient.email}: `, info.response);
//           }
//         });
//       });
//     }

//     await checkDiseaseOverlap(patients, 2);

//     res.json({ success: true, message: "Appointment Booked" });

//   } catch (error) {
//     console.error("Error booking appointment:", error);
//     res.status(500).json({ success: false, message: "Error booking appointment" });
//   }
// };


const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime, symptoms } = req.body;

    const docData = await doctorModel.findById(docId).select('-password');
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = docData.slots_booked;
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    const userData = await userModel.findById(userId).select('-password');

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      symptoms,
      data: Date.now()
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    const Allusers = await userModel.find(
      { email: { $exists: true, $ne: null }, pincode: { $exists: true, $ne: null } }
    ).select('_id email pincode');

    const AllAppointment = await appointmentModel.find(
      { symptoms: { $exists: true, $ne: null } }
    ).select('userId symptoms createdAt');

    const patients = Allusers.map(user => {
      const userAppointments = AllAppointment.filter(appointment => appointment.userId.toString() === user._id.toString());
      const latestAppointment = userAppointments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

      return {
        _id: user._id,
        pincode: user.pincode,
        symptoms: latestAppointment ? latestAppointment.symptoms : [],
        email: user.email
      };
    });

    async function checkDiseaseOverlap(patients, threshold) {
      const alerts = {};

      const groupedByPincode = patients.reduce((acc, patient) => {
        if (!acc[patient.pincode]) acc[patient.pincode] = [];
        acc[patient.pincode].push(patient);
        return acc;
      }, {});

      for (const [pincode, patientsInPincode] of Object.entries(groupedByPincode)) {
        const diseaseFrequency = {};

        patientsInPincode.forEach(({ symptoms }) => {
          symptoms.forEach(disease => {
            diseaseFrequency[disease] = (diseaseFrequency[disease] || 0) + 1;
          });
        });

        for (const [disease, count] of Object.entries(diseaseFrequency)) {
          if (count >= threshold) {
            console.log(`ALERT: Increase in ${disease} cases in pincode ${pincode}`);
            await notifyPatients(pincode, disease); // Send notification asynchronously
          }
        }
      }
    }

    async function notifyPatients(pincode, disease) {
      const affectedPatients = patients.filter(
        patient => patient.symptoms.includes(disease)
      );
      console.log('affectedPatients',affectedPatients);
      
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER, // Use environment variable for email user
          pass: process.env.EMAIL_PASS, // Use environment variable for email password
        },
      });
      console.log('Patients',patients);
try {
  
  const emailPromises = affectedPatients.map(patient => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: patient.email,
      subject: `ALERT: Increase in ${disease} Cases in Your Area`,
      text: `Dear Patient,

We have detected an increase in cases of ${disease} in your area (Pincode: ${pincode}).
Please take the necessary precautions and consult a healthcare professional if needed.

Stay Safe,
Your Health Monitoring System`
    };

    // Send email and return the promise
     transporter.sendMail(mailOptions)
      .then(info => {
        console.log("Message sent: %s", info.messageId);  // Log the message ID after sending
      })
      .catch(error => {
        console.error("Error sending email to", patient.email, error);
      });
  });

  // Wait for all emails to be sent
  await Promise.all(emailPromises);
  console.log('Emails sent successfully');
} catch (error) {
  console.log(error);
}

      // Wait for all emails to be sent
    
    }

    await checkDiseaseOverlap(patients, 2);

    res.json({ success: true, message: "Appointment Booked" });

  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ success: false, message: "Error booking appointment" });
  }
};


const listAppointment = async (req, res) => {
  try {

    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId }) //find appointment for particular user
    res.json({ success: true, appointments })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: 'Unauthorized action' });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })


    const { docId, slotDate, slotTime } = appointmentData

    const doctorData = await doctorModel.findById(docId)

    let slots_booked = doctorData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.json({ success: true, message: 'Appointment Cancelled' })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment };
