import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [isSignup, setIsSignup] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneContinue = (e) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      setShowOtpModal(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAF6F2]">
      {/* Left Side - Premium Welcome Panel */}
      <div className="hidden md:flex w-1/2 p-20 flex-col justify-center items-start space-y-6 bg-gradient-to-b from-[#FDF7F2] via-[#F8EDE3] to-[#FDF4EE]">
        <h1 className="text-6xl font-extrabold text-[#B76E79] tracking-wide">
          Welcome Back
        </h1>
        <p className="text-[#7A5650] max-w-md text-lg leading-relaxed">
          Discover the ultimate luxury in sleepwear with YOBHA. Sign in to continue and indulge in exclusivity.
        </p>
        <div className="flex space-x-5 text-[#B76E79] text-3xl">
          <a href="#" className="hover:text-[#E6B7A9] transition-colors"><FaInstagram /></a>
          <a href="#" className="hover:text-[#E6B7A9] transition-colors"><FaFacebookF /></a>
          <a href="#" className="hover:text-[#E6B7A9] transition-colors"><FaTwitter /></a>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-6 md:p-20">
        <div className="w-full md:max-w-md bg-white/20 backdrop-blur-xl rounded-3xl border border-[#B76E79]/20 shadow-lg p-8 md:p-12">
          {/* Brand */}
          <h1 className="text-center text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#B76E79] via-[#E6B7A9] to-[#FFD7C2] mb-10 md:mb-12">
            YOBHA
          </h1>

          {!isSignup ? (
            <>
              {/* Tabs */}
              <div className="flex justify-around mb-6 md:mb-8 border-b border-[#B76E79]/20">
                <button
                  onClick={() => setActiveTab("email")}
                  className={`py-2 px-3 md:px-4 font-semibold text-sm md:text-lg transition-all ${
                    activeTab === "email"
                      ? "border-b-2 border-[#B76E79] text-[#B76E79]"
                      : "text-[#A46B60] hover:text-[#B76E79]"
                  }`}
                >
                  Email
                </button>
                <button
                  onClick={() => setActiveTab("phone")}
                  className={`py-2 px-3 md:px-4 font-semibold text-sm md:text-lg transition-all ${
                    activeTab === "phone"
                      ? "border-b-2 border-[#B76E79] text-[#B76E79]"
                      : "text-[#A46B60] hover:text-[#B76E79]"
                  }`}
                >
                  Phone
                </button>
              </div>

              {/* Login Form */}
              <form className="space-y-4 md:space-y-5" onSubmit={activeTab === "phone" ? handlePhoneContinue : (e) => e.preventDefault()}>
                {activeTab === "email" ? (
                  <>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 md:px-5 py-3 md:py-4 rounded-2xl border border-[#B76E79]/30 focus:border-[#B76E79] focus:ring-1 focus:ring-[#FFD7C2]/40 outline-none text-[#5A3A36] bg-white/30 backdrop-blur-sm shadow-inner text-sm md:text-base"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 md:px-5 py-3 md:py-4 rounded-2xl border border-[#B76E79]/30 focus:border-[#B76E79] focus:ring-1 focus:ring-[#FFD7C2]/40 outline-none text-[#5A3A36] bg-white/30 backdrop-blur-sm shadow-inner text-sm md:text-base"
                    />
                  </>
                ) : (
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 md:px-5 py-3 md:py-4 rounded-2xl border border-[#B76E79]/30 focus:border-[#B76E79] focus:ring-1 focus:ring-[#FFD7C2]/40 outline-none text-[#5A3A36] bg-white/30 backdrop-blur-sm shadow-inner text-sm md:text-base"
                  />
                )}

                <button
                  type="submit"
                  className="w-full py-3 md:py-4 bg-gradient-to-r from-[#B76E79] via-[#E6B7A9] to-[#FFD7C2] text-white font-semibold rounded-2xl transition-transform hover:scale-[1.03] text-sm md:text-base"
                >
                  {activeTab === "email" ? "Login" : "Continue"}
                </button>
              </form>

              {/* OR Divider */}
              <div className="flex items-center my-4 md:my-6 text-[#A46B60]">
                <hr className="flex-grow border-[#B76E79]/20" />
                <span className="px-2 md:px-3 text-sm md:text-base">OR</span>
                <hr className="flex-grow border-[#B76E79]/20" />
              </div>

              {/* Google Login */}
              <button className="w-full flex items-center justify-center gap-3 md:gap-4 py-3 md:py-4 border border-[#B76E79]/20 rounded-2xl hover:bg-[#FFF1E0]/30 transition-all text-[#5A3A36] font-medium shadow-sm text-sm md:text-base">
                <FcGoogle size={22} />
                Continue with Google
              </button>

              {/* Signup Link */}
              <p className="text-center text-[#7A5650] mt-4 md:mt-6 text-sm md:text-base">
                New to Yobha?{" "}
                <span
                  onClick={() => setIsSignup(true)}
                  className="text-[#B76E79] font-semibold cursor-pointer hover:text-[#E6B7A9] transition-colors"
                >
                  Sign Up
                </span>
              </p>
            </>
          ) : (
            <>
              {/* Signup Form */}
              <h2 className="text-center text-2xl md:text-3xl font-bold text-[#B76E79] mb-6 md:mb-8">
                Create Account
              </h2>
              <form className="space-y-4 md:space-y-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 md:px-5 py-3 md:py-4 rounded-2xl border border-[#B76E79]/30 focus:border-[#B76E79] focus:ring-1 focus:ring-[#FFD7C2]/40 outline-none text-[#5A3A36] bg-white/30 backdrop-blur-sm shadow-inner text-sm md:text-base"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 md:px-5 py-3 md:py-4 rounded-2xl border border-[#B76E79]/30 focus:border-[#B76E79] focus:ring-1 focus:ring-[#FFD7C2]/40 outline-none text-[#5A3A36] bg-white/30 backdrop-blur-sm shadow-inner text-sm md:text-base"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 md:px-5 py-3 md:py-4 rounded-2xl border border-[#B76E79]/30 focus:border-[#B76E79] focus:ring-1 focus:ring-[#FFD7C2]/40 outline-none text-[#5A3A36] bg-white/30 backdrop-blur-sm shadow-inner text-sm md:text-base"
                />
                <button
                  type="submit"
                  className="w-full py-3 md:py-4 bg-gradient-to-r from-[#B76E79] via-[#E6B7A9] to-[#FFD7C2] text-white font-semibold rounded-2xl transition-transform hover:scale-[1.03] text-sm md:text-base"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-center text-[#7A5650] mt-4 md:mt-6 text-sm md:text-base">
                Already have an account?{" "}
                <span
                  onClick={() => setIsSignup(false)}
                  className="text-[#B76E79] font-semibold cursor-pointer hover:text-[#E6B7A9] transition-colors"
                >
                  Login
                </span>
              </p>
            </>
          )}
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-3xl p-8 md:p-10 w-11/12 max-w-sm shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-[#B76E79] mb-4 md:mb-6 text-center">Enter OTP</h2>
            <p className="text-center text-[#7A5650] mb-4 md:mb-6 text-sm md:text-base">
              We sent an OTP to <span className="font-semibold">{phoneNumber}</span>
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-4 md:px-5 py-3 md:py-4 rounded-2xl border border-[#B76E79]/30 focus:border-[#B76E79] focus:ring-1 focus:ring-[#FFD7C2]/40 outline-none text-[#5A3A36] bg-white/30 backdrop-blur-sm shadow-inner mb-4 md:mb-5 text-sm md:text-base"
            />
            <button
              className="w-full py-3 md:py-4 bg-gradient-to-r from-[#B76E79] via-[#E6B7A9] to-[#FFD7C2] text-white font-semibold rounded-2xl transition-transform hover:scale-[1.03] text-sm md:text-base"
              onClick={() => setShowOtpModal(false)}
            >
              Verify OTP
            </button>
            <p
              className="text-center text-[#B76E79] mt-3 md:mt-4 cursor-pointer hover:text-[#E6B7A9] text-sm md:text-base"
              onClick={() => setShowOtpModal(false)}
            >
              Cancel
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
