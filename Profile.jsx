import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { token, backendUrl, navigate } = useContext(ShopContext);

  const [profilePhoto, setProfilePhoto] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const defaultAvatar = "https://via.placeholder.com/150?text=User";
  const fetchProfile = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/user/user-data", 
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setProfilePhoto(response.data.userData.profilePhoto || "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      navigate("/login");
    }
  }, [token]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result); // Base64 preview
      };
      reader.readAsDataURL(file);
    }
  };
  const savePhoto = async () => {
    if (!profilePhoto) return;

    setIsUploading(true);
    try {
      const response = await axios.post(
        backendUrl + "/api/user/update-profile-photo",
        { profilePhoto },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Profile photo updated!");
      } else {
        toast.error("Failed to save photo");
        fetchProfile(); 
      }
    } catch (error) {
      toast.error("Upload failed");
      fetchProfile();
    }
    setIsUploading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 py-12 text-center">
          <div className="relative inline-block">
            <img
              src={profilePhoto || defaultAvatar}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
            />

            {/* Upload Button Overlay */}
            <label
              htmlFor="photo-upload"
              className="absolute bottom-2 right-2 bg-black text-white rounded-full p-3 cursor-pointer shadow-lg hover:bg-gray-800 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <h1 className="text-4xl font-light text-gray-800 mt-8">My Profile</h1>
          <p className="text-gray-600 mt-2">Update your photo below</p>
        </div>

        <div className="p-10 text-center space-y-6">
          {profilePhoto && profilePhoto !== profilePhoto ? (
            <button
              onClick={savePhoto}
              disabled={isUploading}
              className="px-10 py-4 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition"
            >
              {isUploading ? "Saving..." : "Save Photo"}
            </button>
          ) : null}

          <div className="pt-8">
            <button
              onClick={() => navigate("/orders")}
              className="px-8 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 transition mr-4"
            >
              My Orders
            </button>
            <button
              onClick={() => navigate("/collection")}
              className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;