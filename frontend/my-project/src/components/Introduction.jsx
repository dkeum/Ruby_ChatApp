const Introduction = ({ missionRef }) => {
  return (
    <div ref={missionRef} className="w-full flex flex-row min-h-[400px] z-50 ">
      <div className="flex flex-col justify-center text-center gap-y-5 bg-black text-white w-1/3">
        <p className="text-5xl">🚀</p>
        <h1 className="text-2xl font-bold"> The Best Omegle Alternative </h1>
        <div className="flex justify-center">
          <p className="w-1/2 ">
           Ruby is the most popular omegle alternative on the web.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center text-center  gap-y-5 text-white bg-red-500 w-1/3">
        <p className="text-5xl">🌍</p>
        <h1 className="text-2xl font-bold"> Meet New People </h1>
        <div className="flex justify-center">
          <p className="w-1/2 ">
            With Emerald you meet friends from around the world at the click of
            a button.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center text-center  gap-y-5 text-black bg-slate-200 w-1/3">
        <p className="text-5xl">🤖</p>
        <h1 className="text-2xl font-bold"> Bot Free </h1>

        <div className="flex justify-center">
          <p className="w-1/2 ">{
            ` Bots ruin your experience. You can rest assured there are no bots on
            Emerald. We've worked hard to develop effective anti-bot measures.`
          }
           
          </p>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
