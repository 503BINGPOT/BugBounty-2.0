const Dashboard = () => {

  return (

    <div className="min-h-screen bg-black text-white px-5 py-6">

      {/* LABEL */}
      <p className="uppercase tracking-[0.35em] text-[9px] text-gray-500 mb-3">
        Dashboard
      </p>

      {/* HEADING */}
      <h1 className="text-[30px] font-semibold mb-6">
        Hi, Dhruv Mantri
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-4 border border-white/10 mb-8">

        <div className="border-r border-white/10 px-5 py-4">

          <p className="uppercase tracking-[0.35em] text-[9px] text-gray-500 mb-3">
            Reputation
          </p>

          <h2 className="text-2xl font-semibold">
            0
          </h2>

        </div>

        <div className="border-r border-white/10 px-5 py-4">

          <p className="uppercase tracking-[0.35em] text-[9px] text-gray-500 mb-3">
            Completed
          </p>

          <h2 className="text-2xl font-semibold">
            0
          </h2>

        </div>

        <div className="border-r border-white/10 px-5 py-4">

          <p className="uppercase tracking-[0.35em] text-[9px] text-gray-500 mb-3">
            Wallet
          </p>

          <h2 className="text-2xl font-semibold">
            $0
          </h2>

        </div>

        <div className="px-5 py-4">

          <p className="uppercase tracking-[0.35em] text-[9px] text-gray-500 mb-3">
            Badges
          </p>

          <h2 className="text-2xl font-semibold">
            0
          </h2>

        </div>

      </div>

    </div>

  );

};

export default Dashboard;