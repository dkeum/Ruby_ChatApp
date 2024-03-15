import DashboardContent from "../components/DashboardContent";
import NavbarApp from "../components/NavbarApp";

const Settingboard = () => {
    const dashboardContentDescription = [
        {
          title: "Meet",
          description: "Meet and chat to people from around the world",
          emoji: "🌍", // Earth globe emoji
          link: "/dashboard"
          
        },
        {
          title: "Profile",
          description: "Visit and edit your Ruby Profile",
          emoji: "👤", // Bust in silhouette emoji
          link: "/profile"
        },
        {
          title: "Settings",
          description: "Edit your Ruby Account",
          emoji: "⚙️", // Gear emoji
          link: "/setting"
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

export default Settingboard;
