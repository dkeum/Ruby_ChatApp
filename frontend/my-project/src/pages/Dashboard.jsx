import DashboardContent from "../components/DashboardContent";
import NavbarApp from "../components/NavbarApp";

const Dashboard = () => {
  const dashboardContentDescription = [
    {
      title: "1 on 1 Text Chat",
      description: "Ruby will match you to a 1 on 1 text chat",
      emoji: "📱",
    },
    {
      title: "Video Chat",
      description: "Ruby will match you to a video chat",
      emoji: "🎥",
    },
    {
      title: "Group Text Chat",
      description: "Match with a random group of people on Ruby",
      emoji: "💬",
    },
  ];

  return (
    <div className="w-screen h-screen bg-slate-800">
      <NavbarApp />

      <div className="">
        <DashboardContent
          dashboardContentDescription={dashboardContentDescription}
        />
      </div>
    </div>
  );
};

export default Dashboard;
