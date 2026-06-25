import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [stats, setStats] =
    useState({

      applications: 0,
      completedBounties: 0,
      repositories: 0,

    });

    const [recentApplications,
  setRecentApplications] =
  useState([]);

  useEffect(() => {

    const fetchProfileStats =
      async () => {

        try {

          const response =
            await axios.get(

              `${import.meta.env.VITE_API_URL}/api/profile/stats/${user.id}`

            );

          setStats(
            response.data
          );

          const applications =
  await axios.get(

    `${import.meta.env.VITE_API_URL}/api/applications/user/${user.id}`

  );

setRecentApplications(
  applications.data.slice(0, 5)
);

        } catch (error) {

          console.log(error);

        }

      };

    fetchProfileStats();

  }, []);

  return (

    <div className="min-h-screen bg-black text-white px-6 py-8 max-w-5xl mx-auto">

      <p className="uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-3">
        Profile
      </p>

      <div className="border border-white/10 p-6 mb-8">

        <div className="flex items-center gap-5">

          <img
            src={
              user?.avatar ||
              "https://github.com/github.png"
            }
            alt="avatar"
            className="w-20 h-20 rounded-full"
          />

          <div>

            <h1 className="text-3xl font-semibold">
              {user?.username}
            </h1>

            <p className="text-gray-400 mt-1">
              {user?.email}
            </p>

            <p className="text-gray-500 mt-2">
              Role: {user?.role}
            </p>

          </div>

        </div>

      </div>

    <div className="grid grid-cols-3 border border-white/10 mb-8">

        <div className="border-r border-white/10 p-5">

          <p className="text-gray-500 text-xs uppercase mb-2">
            Applications
          </p>

          <h2 className="text-2xl font-semibold">
            {stats.applications}
          </h2>

        </div>

        <div className="border-r border-white/10 p-5">

          <p className="text-gray-500 text-xs uppercase mb-2">
            Completed
          </p>

          <h2 className="text-2xl font-semibold">
            {stats.completedBounties}
          </h2>

        </div>

        <div className="p-5">

          <p className="text-gray-500 text-xs uppercase mb-2">
            Repositories
          </p>

          <h2 className="text-2xl font-semibold">
            {stats.repositories}
          </h2>

        </div>

      </div>

      <div className="border border-white/10 p-6 mb-8">

  <h2 className="text-xl font-medium mb-5">
    GitHub Account
  </h2>

  <div className="flex items-center gap-4">

    <img
      src={user?.avatar}
      alt="avatar"
      className="w-16 h-16 rounded-full"
    />

    <div>

      <p className="text-lg">
        {user?.username}
      </p>

      <p className="text-gray-500">
        Connected via GitHub OAuth
      </p>

    </div>

  </div>

</div>

<div className="border border-white/10 p-6">

  <h2 className="text-xl font-medium mb-5">
    Recent Applications
  </h2>

  {

    recentApplications.length === 0

    ? (

      <p className="text-gray-500">
        No applications yet.
      </p>

    )

    : (

      recentApplications.map(

        app => (

          <div
            key={app.id}
            className="
              border-b border-white/10
              py-3
            "
          >

            <div>

  <p className="font-medium">
    {app.title}
  </p>

  <div className="mt-2 space-y-1">

    <p className="text-gray-500 text-sm">
      Reward: ${app.reward}
    </p>

    <p className="text-gray-500 text-sm">
      Difficulty: {app.difficulty}
    </p>

    <p className="text-gray-500 text-sm">
      Repository: {app.github_url}
    </p>

    <p
      className={`
        text-sm
        ${
          app.status === "Completed"
            ? "text-green-400"
            : app.status === "Accepted"
            ? "text-blue-400"
            : "text-yellow-400"
        }
      `}
    >
      Status: {app.status}
    </p>

  </div>

</div>

          </div>

        )

      )

    )

  }

</div>

<div className="border border-white/10 p-6 mt-8">

  <h2 className="text-xl font-medium mb-3">
    Earnings
  </h2>

  <h1 className="text-4xl font-semibold">
    $0
  </h1>

  <p className="text-gray-500 mt-2">
    Payment integration coming soon
  </p>

</div>

<div className="border border-white/10 p-6 mt-8">

  <h2 className="text-xl font-medium mb-4">
    Profile Completion
  </h2>

  <div className="w-full h-3 bg-white/10 rounded-full">

    <div
      className="h-3 bg-white rounded-full"
      style={{
        width: "80%"
      }}
    />

  </div>

  <p className="text-gray-500 mt-3">
    80% Complete
  </p>

</div>
    </div>
  );

};

export default Profile;