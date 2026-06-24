import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {

  const [stats, setStats] =
useState({

  totalBounties: 0,
  openBounties: 0,
  completedBounties: 0,
  repositories: 0,

});

const user =
  JSON.parse(
    localStorage.getItem("user")
  );

useEffect(() => {

  const fetchStats =
    async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:5000/api/dashboard/stats/${user.id}`

          );

        setStats(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  fetchStats();

}, []);

  return (

    <div className="min-h-screen bg-black text-white px-5 py-6">

      {/* LABEL */}
      <p className="uppercase tracking-[0.35em] text-[9px] text-gray-500 mb-3">
        Dashboard
      </p>

      {/* HEADING */}
      <h1 className="text-[30px] font-semibold mb-6">
        Hi, {user?.username}
      </h1>

      {/* STATS */}
      {/* STATS */}
<div className="grid grid-cols-4 border border-white/10 mb-8">

  <div className="border-r border-white/10 px-5 py-4">

    <p className="uppercase tracking-[0.35em] text-[9px] text-gray-500 mb-3">
      Total Bounties
    </p>

    <h2 className="text-2xl font-semibold">
      {stats.totalBounties}
    </h2>

  </div>

  <div className="border-r border-white/10 px-5 py-4">

    <p className="uppercase tracking-[0.35em] text-[9px] text-gray-500 mb-3">
      Open
    </p>

    <h2 className="text-2xl font-semibold">
      {stats.openBounties}
    </h2>

  </div>

  <div className="border-r border-white/10 px-5 py-4">

    <p className="uppercase tracking-[0.35em] text-[9px] text-gray-500 mb-3">
      Completed
    </p>

    <h2 className="text-2xl font-semibold">
      {stats.completedBounties}
    </h2>

  </div>

  <div className="px-5 py-4">

    <p className="uppercase tracking-[0.35em] text-[9px] text-gray-500 mb-3">
      Repositories
    </p>

    <h2 className="text-2xl font-semibold">
      {stats.repositories}
    </h2>

  </div>

</div>

{/* QUICK ACTIONS */}

<div className="border border-white/10">

  <div className="px-5 py-4 border-b border-white/10">

    <h2 className="text-lg font-medium">
      Quick Actions
    </h2>

  </div>

  <div className="grid grid-cols-2 md:grid-cols-4">

    <a
      href="/postbounty"
      className="
        p-5
        border-r border-white/10
        hover:bg-white/5
        transition
      "
    >
      Post Bounty
    </a>

    <a
      href="/repositories"
      className="
        p-5
        border-r border-white/10
        hover:bg-white/5
        transition
      "
    >
      Repositories
    </a>

    <a
      href="/my-applications"
      className="
        p-5
        border-r border-white/10
        hover:bg-white/5
        transition
      "
    >
      My Applications
    </a>

    <a
      href="/profile"
      className="
        p-5
        hover:bg-white/5
        transition
      "
    >
      Profile
    </a>

  </div>

</div>

    </div> 

  );

};

export default Dashboard;