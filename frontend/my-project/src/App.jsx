import "./App.css";
import Features from "./components/Features";
import Hero from "./components/Hero";
import Introduction from "./components/Introduction";
import NavBar from "./components/NavBar";

function App() {

  const featuresList1 = [
    {
      emoji: "🎯",
      description: "Matching system based on shared interests",
    },
    {
      emoji: "💬",
      description: "Private text chat between two users",
    },
    {
      emoji: "📹",
      description: "Private video chat between two users",
    },
    {
      emoji: "👥",
      description: "Chat with multiple users in a group",
    },
    {
      emoji: "📷",
      description: "Share photos and media files with other users",
    },
    {
      emoji: "🔍",
      description: "Filter matches based on gender and karma rating",
    },
  ];

  const additionalFeaturesList = [
    {
      emoji: "👫",
      description: "Great for making new friends",
    },
    {
      emoji: "🛡️",
      description: "Full-time moderation and support",
    },
    {
      emoji: "⚡",
      description: "Lightweight and lightning-fast",
    },
    {
      emoji: "🛠️",
      description: "Customizable",
    },
    {
      emoji: "📱",
      description: "Works great on mobile",
    },
    {
      emoji: "🔄",
      description: "Frequent updates",
    },
  ];
  return (
    <div>
      <NavBar />
      <Hero/>
      <Introduction/>
      <Features FeatureList={featuresList1} backgroundColor={"bg-white"} title={"Features"}/>
      <Features FeatureList={additionalFeaturesList} backgroundColor={"bg-red-500"} title={"More Features"}/>
    </div>
  );
}

export default App;


