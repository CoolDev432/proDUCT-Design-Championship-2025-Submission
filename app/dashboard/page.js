import React from "react";
import Nav from "./components/Nav";
import Stats from "./components/Stats";
import Hero from "./components/Hero";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">
      <Nav />
      <div className="absolute top-70 left-20 w-62 h-62 bg-indigo-500/30 rounded-full blur-3xl"></div>
      <main className="relative z-10 flex flex-col p-40">
        <Hero />
        <Stats />
      </main>
    </div>
  );
};

export default Dashboard;