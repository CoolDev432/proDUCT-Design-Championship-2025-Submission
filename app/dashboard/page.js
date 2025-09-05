import React from "react";
import Nav from "./components/Nav";
import Stats from "./components/Stats";
import Hero from "./components/Hero";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">
      <Nav />
      <div className="absolute top-40 left-20 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl"></div>
      <main className="relative z-10 flex flex-col gap-20 pt-32 px-6 md:px-16">
        <Hero />
        <Stats />
      </main>
    </div>
  );
};

export default Dashboard;