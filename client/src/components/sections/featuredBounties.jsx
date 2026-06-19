const FeaturedBounties = () => {
  return (
    <section className="border-t border-white/10 py-16 min-h-[33vh]">

      <div className="px-6 md:px-12 h-full flex flex-col">

        {/* TOP */}
        <div className="flex items-start justify-between mb-12">

          <div>
            <p className="uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-6">
              Featured
            </p>

            <h2 className="text-lg md:text-lg font-semibold">
              Latest open bounties
            </h2>
          </div>

          <button className="text-gray-400 hover:text-white transition text-lg mt-2">
            View all ↗
          </button>

        </div>

        {/* EMPTY STATE BOX */}
        <div
          className="
            border border-white/10
            flex items-center
            px-
            flex-1
            min-h-11
            bg-black
          "
        >
          <p className="text-gray-500 text-md">
            No open bounties yet — be the first to post one.
          </p>
        </div>

      </div>
    </section>
  );
};

export default FeaturedBounties;