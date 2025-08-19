import React, { useState } from "react";
import { LOGIN_API } from "../utils/baseApi";
import { REGISTRATION_API } from "../utils/baseApi";

export default function CenteredAuthTabs() {
  const [tab, setTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ id: "", email: "", password: "" });

  const handleChange = (e, isRegister = false) => {
    const { name, value } = e.target;
    if (isRegister) {
      setRegisterData((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tab === "login") {
      try {
        const res = await fetch(LOGIN_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: loginData.email,
            userPassword: loginData.password,
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Login success:", data);
        alert(`Login successful for: ${data.userEmail || loginData.email}`);
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
      } catch (err) {
        console.error("Login failed:", err);
        alert("Login failed! Please check credentials.");
      }
    } else {
 try {
        const res = await fetch(REGISTRATION_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: Number(registerData.id),
            userEmail: registerData.email,
            userPassword: registerData.password,
          }),
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();
        console.log("Registration success:", data);
        alert(`Registered successfully for: ${registerData.email}`);
      } catch (err) {
        console.error("Registration failed:", err);
        alert("Registration failed! Please try again.");
      }

      console.log("Register payload:", registerData);
      alert(`Register: ID = ${registerData.id}, Email = ${registerData.email}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <div className="bg-green-300 border border-gray rounded-[30px] shadow-lg min-w-[20%] min-w-[50%] m-[100px] p-10">
        {/* Tabs */}
        <div className="flex justify-center m-5">
          <div className="flex rounded-[20px] bg-gray-500 p-3">
            {["login", "register"].map((type) => (
              <button
                key={type}
                onClick={() => setTab(type)}
                className={`px-12 py-1 rounded-[15px] font-medium transition-all duration-200 m-1  ${
                  tab === type
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {type === "login" ? "Login" : "Register"}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          
          {/* ID field only for Register */}
          {tab === "register" && (
            <>
              <label htmlFor="id" className="block self-start ml-7">ID</label>
              <input
                name="id"
                type="number"
                placeholder="Enter ID"
                value={registerData.id}
                onChange={(e) => handleChange(e, true)}
                required
                className="h-12 w-80 border border-gray-300 rounded-[10px] px-3 mb-4 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              />
            </>
          )}

          <label htmlFor="email" className="block self-start ml-7">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={tab === "login" ? loginData.email : registerData.email}
            onChange={(e) => handleChange(e, tab === "register")}
            required
            className="h-12 w-80 border border-gray-300 rounded-[10px] px-3 mb-4 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          />

          <label htmlFor="password" className="block self-start ml-7">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={tab === "login" ? loginData.password : registerData.password}
            onChange={(e) => handleChange(e, tab === "register")}
            required
            className="h-12 w-80 border border-gray-300 rounded-[10px] px-3 mb-6 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          />

          <button
            type="submit"
            className="h-12 w-80 rounded-[30px] bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            {tab === "login" ? "Log In" : "Create Account"}
          </button>

          <p className="mt-4 text-sm text-black-900">
            {tab === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
        </form>
      </div>
    </div>
  );
}
