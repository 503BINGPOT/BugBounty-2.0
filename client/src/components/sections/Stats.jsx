const stats = [
  {
    title: "Open Bounties",
    value: "128",
  },
  {
    title: "Total Pool",
    value: "$48K",
  },
  {
    title: "Avg Payout",
    value: "$320",
  },
];

const Stats = () => {
  return (
    <section className="px-6 md:px-12 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/2">

        {stats.map((item, index) => (
          <div
            key={index}
            className="p-6 border-r border-white/10 last:border-r-0"
          >
            <p className="uppercase tracking-[0.25em] text-[10px] text-gray-500 mb-4">
              {item.title}
            </p>

            <h2 className="text-3xl font-semibold">
              {item.value}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;