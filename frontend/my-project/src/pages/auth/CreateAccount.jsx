import { useEffect, useMemo, useState } from "react";
// import { useAuth } from "../../hooks/useAuth";
import NavBar from "@/components/NavBar";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { particleConfig } from "../../components/particles";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";


import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useSignupMutation } from "./authApiSlice";


export function CreateAccount (){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("male"); // Default value is "male"
 const navigate = useNavigate()

  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    })
  }, []);

  const particlesLoaded = () => {
    // Handle particles loaded
  };

  const options = useMemo(() => particleConfig, []);

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword || !gender) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Here you would usually send a request to your backend to create the account
      // For the sake of this example, we're using a mock authentication
      const { accessToken } = await signup({ username, password, gender }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setGender("male"); // Reset gender to default
      navigate('/dashboard')
    } catch (err) {
      console.error("Error creating account:", err);
      // Handle error
    }
  };

  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    // Handle captcha value change
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="h-screen min-w-screen bg-slate-900">
      <NavBar />
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
      <div className="w-screen h-[calc(100vh-7.5rem)] bg-slate-800 flex items-center justify-center">
        <div className="border border-white p-5 rounded-lg flex flex-col gap-y-5">
          <header className="text-4xl text-white font-bold text-center">
            <p>Create Account</p>
          </header>
          <form onSubmit={handleCreateAccount} className="flex flex-col gap-y-4">
            <div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full rounded-lg p-2"
              />
            </div>
            <div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-lg p-2"
              />
            </div>
            <div>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full rounded-lg p-2"
              />
            </div>
            <div className="flex flex-row text-white gap-x-3">
              <label>
                <input
                  type="radio"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  checked={gender === "others"}
                  onChange={() => setGender("others")}
                />
                Others
              </label>
            </div>
            <ReCAPTCHA
              sitekey="YOUR_SITE_KEY"
              onChange={handleCaptchaChange}
            />
            <button
              className="w-full text-center bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded-full text-white"
              type="submit"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
