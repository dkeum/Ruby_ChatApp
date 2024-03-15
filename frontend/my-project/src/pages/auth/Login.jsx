import { useEffect, useMemo, useState, useRef } from "react";
// import { useAuth } from "../../hooks/useAuth";
import NavBar from "@/components/NavBar";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { particleConfig } from "../../components/particles";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const LoginPage = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // const { login } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    // load the particles for background
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
    //focux on the username input field
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const particlesLoaded = () => {
    // console.log(container);
  };

  const options = useMemo(() => particleConfig, []);

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
        const { accessToken } = await login({ username, password }).unwrap()
        dispatch(setCredentials({ accessToken }))
        setUsername('')
        setPassword('')
        navigate('/dashboard')
    } catch (err) {
        if (!err.status) {
            setErrMsg('No Server Response');
        } else if (err.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg(err.data?.message);
        }
        errRef.current.focus();
    }
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
            <p>Login</p>
          </header>
          <p ref={errRef} aria-live="assertive">{errMsg}</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-y-4">
            <div>
              <input
                id="username"
                type="text"
                value={username}
                ref={userRef}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full rounded-lg p-2"
                required
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
                required
              />
            </div>
            <button
              className="w-full text-center bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded-full text-white"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="text-center text-white">
            {"Don't have an account?"}
            <Link
              to="/createaccount"
              className="text-blue-500 hover:underline pl-2"
            >
              Create one here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
