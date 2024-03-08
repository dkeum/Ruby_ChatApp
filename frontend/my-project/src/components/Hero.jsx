// import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { particleConfig } from "./particles";


const Hero = () => {
  const [init, setInit] = useState(false);

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
      <div className="min-h-screen min-w-screen bg-slate-900 pt-10">
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          className="w-screen -z-10"
        />
        <div className="flex flex-col text-white gap-y-5 absolute top-[25rem] sm:left-[30%] md:left-[35%]">
          <h1 className="font-bold text-center text-3xl ">
            Ruby is a New Chat Application
          </h1>
          <div className="flex justify-center text-center">
            <p className="max-w-[400px]">
              With Ruby, you can talk to people from around the world for free.
              Click the 'Google' button to get started. If you don't have a
              Google account, click the 'I'm not a robot' box, then click
              'start'.
            </p>
          </div>
          <button>Start (Google Account)</button>
          <div className="flex justify-center text-center">
            <p>or</p>
          </div>
        </div>
      </div>
    );
  }

  return <>Loading page...</>;
};

export default Hero;
