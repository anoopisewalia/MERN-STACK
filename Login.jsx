import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login"); // "Login" or "Sign Up"
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect to home if already logged in
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === "Sign Up") {
        // Register new user
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(response.data.message || "Registration failed");
        }
      } else {
        // Login existing user
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Welcome back!");
        } else {
          toast.error(response.data.message || "Login failed");
        }
      }
    } catch (error) {
      console.log(error); // Fixed typo: was "error.messgae"
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Name field - only show on Sign Up */}
      {currentState === "Sign Up" && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800 rounded"
          placeholder="Name"
          required={currentState === "Sign Up"}
        />
      )}

      {/* Email field */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800 rounded"
        placeholder="Email"
        required
      />

      {/* Password field */}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800 rounded"
        placeholder="Password"
        required
      />

      {/* Links: Forgot Password & Toggle Login/Sign Up */}
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer hover:text-gray-600"></p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer hover:text-gray-600"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer hover:text-gray-600"
          >
            Login here
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-black text-white w-full py-3 cursor-pointer font-light mt-4 hover:bg-gray-900 transition rounded"
      >
        {currentState === "Sign Up" ? "Sign Up" : "Sign In"}
      </button>
    </form>
  );
};

export default Login;