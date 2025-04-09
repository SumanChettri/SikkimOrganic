import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaCamera } from "react-icons/fa";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    pincode: "",
    profileImage: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profileImage: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const { data } = await axios.post("http://localhost:5000/api/users/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Registration successful! 🎉");
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-300 via-green-400 to-green-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-center text-green-700 mb-4">🌿 Create Account</h2>

        {/* Profile Image Upload */}
        <div className="flex justify-center mb-4 relative">
          <label className="cursor-pointer relative">
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            {previewImage ? (
              <img src={previewImage} alt="Profile Preview" className="w-20 h-20 rounded-full object-cover border-2 border-green-500" />
            ) : (
              <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-full border-2 border-gray-300">
                <FaCamera className="text-gray-600 text-2xl" />
              </div>
            )}
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Full Name */}
          <div className="flex items-center border-b-2 border-gray-300 focus-within:border-green-500 p-2">
            <FaUser className="text-green-600 mr-2" />
            <input type="text" name="fullName" placeholder="Full Name" className="w-full outline-none" onChange={handleChange} required />
          </div>

          {/* Email */}
          <div className="flex items-center border-b-2 border-gray-300 focus-within:border-green-500 p-2">
            <FaEnvelope className="text-green-600 mr-2" />
            <input type="email" name="email" placeholder="Email" className="w-full outline-none" onChange={handleChange} required />
          </div>

          {/* Password */}
          <div className="flex items-center border-b-2 border-gray-300 focus-within:border-green-500 p-2">
            <FaLock className="text-green-600 mr-2" />
            <input type="password" name="password" placeholder="Password" className="w-full outline-none" onChange={handleChange} required />
          </div>

          {/* Phone */}
          <div className="flex items-center border-b-2 border-gray-300 focus-within:border-green-500 p-2">
            <FaPhone className="text-green-600 mr-2" />
            <input type="text" name="phone" placeholder="Phone" className="w-full outline-none" onChange={handleChange} required />
          </div>

          {/* Address */}
          <div className="flex items-center border-b-2 border-gray-300 focus-within:border-green-500 p-2">
            <FaMapMarkerAlt className="text-green-600 mr-2" />
            <input type="text" name="address" placeholder="Address" className="w-full outline-none" onChange={handleChange} required />
          </div>

          {/* Pincode */}
          <div className="flex items-center border-b-2 border-gray-300 focus-within:border-green-500 p-2">
            <FaMapMarkerAlt className="text-green-600 mr-2" />
            <input type="text" name="pincode" placeholder="Pincode" className="w-full outline-none" onChange={handleChange} required />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-bold"
            type="submit"
          >
            Register Now 🚀
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
