import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { particleConfig } from "./particles";
import { Link } from "react-router-dom";

const Hero = () => {
  const [init, setInit] = useState(false);

  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    // Handle captcha value change
  };

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(() => particleConfig, []);

  if (init) {
    return (
      <div className="min-h-[800px] min-w-screen bg-slate-900 pt-10">
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          className="-z-10"
        />
        <div className="flex flex-col text-white gap-y-5 absolute top-[25rem] sm:left-[30%] md:left-[35%]">
          <h1 className="font-bold text-center text-3xl ">
            Ruby is a New Chat Application
          </h1>
          <div className="flex justify-center text-center">
            <p className="max-w-[400px]">
              {`    With Ruby, you can talk to people from around the world for free.
              Click the 'Google' button to get started. If you don't have a
              Google account, click the 'I'm not a robot' box, then click
              'start'.`}
            </p>
          </div>
          <button>Start (Google Account)</button>
          <div className="flex flex-col justify-center gap-y-3 text-center">
            <p>or</p>
            <p>Verify with recaptcha first then Start</p>
            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey="YOUR_SITE_KEY"
                onChange={handleCaptchaChange}
              />
            </div>
            <div className="flex justify-center">
              <Link to={"/dashboard"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded w-[300px] ">
                  Start Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>Loading page...</>;
};

export default Hero;
