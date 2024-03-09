const Features = ({ FeatureList, backgroundColor, title, textColor }) => {
  return (
    <div
    id="features"
      className={`flex flex-col items-center pt-10 gap-y-5 ${backgroundColor} ${textColor} min-h-[400px]`}
    >
      <h1 className="text-2xl font-bold my-3">{title} </h1>

      <div className="flex flex-col gap-y-4">
        {FeatureList.map((item, index) => (
          <div key={index} > 
            {item.emoji}
            {item.description}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
