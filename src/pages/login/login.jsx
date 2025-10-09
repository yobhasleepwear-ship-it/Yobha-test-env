import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { LoginUser, RegisterUser , sendOtp, verifyOtp} from "../../service/login";
import HeaderWithSidebar from "../../comman/app-header/app-header";
import Footer from "../../comman/footer/footer";

import * as localStorageService from "../../service/localStorageService";
import { LocalStorageKeys } from "../../constants/localStorageKeys";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("email");
  const [isSignup, setIsSignup] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [otp, setOtp] = useState("");
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const payload = { fullName, email, password, phoneNumber };
      const response = await RegisterUser(payload); // call signup API

      console.log("Signup successful:", response);

      const { token, refreshToken, user } = response.data;
      console.log(token, "token")
   
      localStorageService.setValue(LocalStorageKeys.AuthToken, token);
      localStorageService.setValue(LocalStorageKeys.RefreshToken, refreshToken);
      localStorageService.setValue(LocalStorageKeys.User, JSON.stringify(user));

      navigate("/");
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Signup failed. Try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const payload = { email, password };
      const response = await LoginUser(payload);
      console.log("Login successful:", response);

  
      const { token, refreshToken, user } = response.data;
      console.log(token, "token");

      
      localStorageService.setValue(LocalStorageKeys.AuthToken, token);
      localStorageService.setValue(LocalStorageKeys.RefreshToken, refreshToken);
      localStorageService.setValue(LocalStorageKeys.User, JSON.stringify(user));

    
      navigate("/"); 
    } catch (err) {
      console.error("Login failed:", err);
      alert(err.response?.data?.message || "Login failed. Try again.");
    }
  };
const handlePhoneContinue = async (e) => {
  e.preventDefault();
  if (phoneNumber.trim()) {
    try {
      await sendOtp(`${countryCode}${phoneNumber}`);
      setShowOtpModal(true);
      alert("OTP sent successfully!");
    } catch (err) {
      console.error("Send OTP failed:", err);
      alert(err.response?.data?.message || "Failed to send OTP");
    }
  } else {
    alert("Please enter phone number");
  }
};
const handleGoogleLogin = () => {
 
  const returnUrl = "http://localhost:3000/home"; 
  window.location.href = `http://65.2.184.190/api/GoogleAuth/google/redirect?params=${encodeURIComponent(returnUrl)}`;
};


  return (
    <>
      <HeaderWithSidebar />
      <div className="min-h-screen flex flex-col md:flex-row bg-[#FAF6F2] pt-16">
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
                  className={`py-2 px-3 md:px-4 font-semibold text-sm md:text-lg transition-all ${activeTab === "email"
                    ? "border-b-2 border-[#B76E79] text-[#B76E79]"
                    : "text-[#A46B60] hover:text-[#B76E79]"
                    }`}
                >
                  Email
                </button>
                <button
                  onClick={() => setActiveTab("phone")}
                  className={`py-2 px-3 md:px-4 font-semibold text-sm md:text-lg transition-all ${activeTab === "phone"
                    ? "border-b-2 border-[#B76E79] text-[#B76E79]"
                    : "text-[#A46B60] hover:text-[#B76E79]"
                    }`}
                >
                  Phone
                </button>
              </div>

              {/* Login Form */}
              <form className="space-y-4 md:space-y-5" onSubmit={activeTab === "phone" ? handlePhoneContinue : handleLogin}>
                {activeTab === "email" ? (
                  <>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 md:px-5 py-3 md:py-4 rounded-2xl border border-[#B76E79]/30 focus:border-[#B76E79] focus:ring-1 focus:ring-[#FFD7C2]/40 outline-none text-[#5A3A36] bg-white/30 backdrop-blur-sm shadow-inner text-sm md:text-base"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 md:px-5 py-3 md:py-4 rounded-2xl border border-[#B76E79]/30 focus:border-[#B76E79] focus:ring-1 focus:ring-[#FFD7C2]/40 outline-none text-[#5A3A36] bg-white/30 backdrop-blur-sm shadow-inner text-sm md:text-base"
                    />
                  </>
                ) : (
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-20 sm:w-24 md:w-28 px-2 sm:px-3 py-3 md:py-4 rounded-2xl border border-[#B76E79]/30 focus:border-[#B76E79] focus:ring-1 focus:ring-[#FFD7C2]/40 outline-none text-[#5A3A36] bg-white/30 backdrop-blur-sm shadow-inner text-xs sm:text-sm md:text-base font-semibold cursor-pointer"
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+65">🇸🇬 +65</option>
                      <option value="+86">🇨🇳 +86</option>
                      <option value="+81">🇯🇵 +81</option>
                      <option value="+82">🇰🇷 +82</option>
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+39">🇮🇹 +39</option>
                      <option value="+34">🇪🇸 +34</option>
                      <option value="+7">🇷🇺 +7</option>
                      <option value="+55">🇧🇷 +55</option>
                      <option value="+52">🇲🇽 +52</option>
                      <option value="+27">🇿🇦 +27</option>
                      <option value="+234">🇳🇬 +234</option>
                      <option value="+20">🇪🇬 +20</option>
                      <option value="+60">🇲🇾 +60</option>
                      <option value="+62">🇮🇩 +62</option>
                      <option value="+63">🇵🇭 +63</option>
                      <option value="+66">🇹🇭 +66</option>
                      <option value="+84">🇻🇳 +84</option>
                      <option value="+92">🇵🇰 +92</option>
                      <option value="+880">🇧🇩 +880</option>
                      <option value="+94">🇱🇰 +94</option>
                      <option value="+977">🇳🇵 +977</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 min-w-0 px-3 sm:px-4 md:px-5 py-3 md:py-4 rounded-2xl border border-[#B76E79]/30 focus:border-[#B76E79] focus:ring-1 focus:ring-[#FFD7C2]/40 outline-none text-[#5A3A36] bg-white/30 backdrop-blur-sm shadow-inner text-sm md:text-base"
                    />
                  </div>
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
              <button  onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 md:gap-4 py-3 md:py-4 border border-[#B76E79]/20 rounded-2xl hover:bg-[#FFF1E0]/30 transition-all text-[#5A3A36] font-medium text-sm md:text-base">
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
              <form className="space-y-4 md:space-y-5" onSubmit={handleSignup}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 md:px-5 py-3 md:py-4 rounded-2xl border border-[#B76E79]/30 focus:border-[#B76E79] focus:ring-1 focus:ring-[#FFD7C2]/40 outline-none text-[#5A3A36] bg-white/30 backdrop-blur-sm shadow-inner text-sm md:text-base"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 md:px-5 py-3 md:py-4 rounded-2xl border border-[#B76E79]/30 focus:border-[#B76E79] focus:ring-1 focus:ring-[#FFD7C2]/40 outline-none text-[#5A3A36] bg-white/30 backdrop-blur-sm shadow-inner text-sm md:text-base"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 md:px-5 py-3 md:py-4 rounded-2xl border border-[#B76E79]/30 focus:border-[#B76E79] focus:ring-1 focus:ring-[#FFD7C2]/40 outline-none text-[#5A3A36] bg-white/30 backdrop-blur-sm shadow-inner text-sm md:text-base"
                />
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-20 sm:w-24 md:w-28 px-2 sm:px-3 py-3 md:py-4 rounded-2xl border border-[#B76E79]/30 focus:border-[#B76E79] focus:ring-1 focus:ring-[#FFD7C2]/40 outline-none text-[#5A3A36] bg-white/30 backdrop-blur-sm shadow-inner text-xs sm:text-sm md:text-base font-semibold cursor-pointer"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+86">🇨🇳 +86</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+82">🇰🇷 +82</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+7">🇷🇺 +7</option>
                    <option value="+55">🇧🇷 +55</option>
                    <option value="+52">🇲🇽 +52</option>
                    <option value="+27">🇿🇦 +27</option>
                    <option value="+234">🇳🇬 +234</option>
                    <option value="+20">🇪🇬 +20</option>
                    <option value="+60">🇲🇾 +60</option>
                    <option value="+62">🇮🇩 +62</option>
                    <option value="+63">🇵🇭 +63</option>
                    <option value="+66">🇹🇭 +66</option>
                    <option value="+84">🇻🇳 +84</option>
                    <option value="+92">🇵🇰 +92</option>
                    <option value="+880">🇧🇩 +880</option>
                    <option value="+94">🇱🇰 +94</option>
                    <option value="+977">🇳🇵 +977</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 min-w-0 px-3 sm:px-4 md:px-5 py-3 md:py-4 rounded-2xl border border-[#B76E79]/30 focus:border-[#B76E79] focus:ring-1 focus:ring-[#FFD7C2]/40 outline-none text-[#5A3A36] bg-white/30 backdrop-blur-sm shadow-inner text-sm md:text-base"
                  />
                </div>
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
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
    <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl border border-[#B76E79]/20">
      <h2 className="text-2xl md:text-3xl font-bold text-[#B76E79] mb-3 md:mb-4 text-center">
        Enter OTP
      </h2>
      <p className="text-center text-[#7A5650] mb-6 text-sm md:text-base">
        We sent a verification code to
      </p>
      
      {/* Phone Number Display */}
      <div className="bg-gradient-to-r from-[#FDF7F2] to-[#F8EDE3] rounded-xl p-3 mb-6 text-center border border-[#B76E79]/20">
        <p className="text-[#B76E79] font-bold text-base md:text-lg break-all">
          {countryCode} {phoneNumber}
        </p>
      </div>

      {/* OTP Input */}
      <input
        type="text"
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength="6"
        className="w-full px-4 md:px-5 py-3 md:py-4 rounded-2xl border border-[#B76E79]/30 focus:border-[#B76E79] focus:ring-2 focus:ring-[#FFD7C2]/40 outline-none text-[#5A3A36] bg-white/30 backdrop-blur-sm shadow-inner mb-5 text-center text-lg md:text-xl font-semibold tracking-widest"
      />
      <button
        className="w-full py-3 md:py-4 bg-gradient-to-r from-[#B76E79] via-[#E6B7A9] to-[#FFD7C2] text-white font-semibold rounded-2xl transition-transform hover:scale-[1.03] text-sm md:text-base"
        onClick={async () => {
          try {
            const response = await verifyOtp(`${countryCode}${phoneNumber}`, otp);
            console.log("OTP verified:", response);

            // Save tokens if returned
            const { token, refreshToken, user } = response?.data;
            localStorageService.setValue(LocalStorageKeys.AuthToken, token);
            localStorageService.setValue(LocalStorageKeys.RefreshToken, refreshToken);
            localStorageService.setValue(LocalStorageKeys.User, JSON.stringify(user));

            
            setShowOtpModal(false);
            navigate("/");
          } catch (err) {
            console.error("OTP verification failed:", err);
           
          }
        }}
      >
        Verify OTP
      </button>
      
      {/* Resend OTP */}
      <p className="text-center text-[#7A5650] mt-4 text-sm">
        Didn't receive code?{" "}
        <button
          onClick={async () => {
            try {
              await sendOtp(`${countryCode}${phoneNumber}`);
              // Show success message
            } catch (error) {
              console.error("Resend OTP error:", error);
            }
          }}
          className="text-[#B76E79] font-semibold hover:text-[#E6B7A9] transition-colors underline"
        >
          Resend OTP
        </button>
      </p>

      <button
        className="text-center text-[#A46B60] mt-3 cursor-pointer hover:text-[#B76E79] text-sm w-full transition-colors"
        onClick={() => setShowOtpModal(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}

    </div>
    <Footer />
    </>
  );
};

export default LoginPage;
