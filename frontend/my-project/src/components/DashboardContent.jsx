import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const DashboardContent = ({ dashboardContentDescription }) => {
  return (
    <div className="w-full flex flex-row gap-x-2 justify-center  ">
      {dashboardContentDescription.map((card, index) => (
        <Link  key={index} to={`${card.link}`}>
          <Card
           
            className="h-[400px] min-w-[400px] mt-20 bg-slate-600 hover:bg-slate-500 text-slate-100"
          >
            <CardHeader className="mt-14">
              <CardTitle className="text-center mb-3 text-5xl">
                {card.emoji}{" "}
              </CardTitle>
              <CardTitle className="text-center text-4xl font-bold">
                {card.title}{" "}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-xl font-semibold">
                {card.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default DashboardContent;
