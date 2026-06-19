const Hero = () => {
  return (
    <section className="relative overflow-hidden px-6 md:px-12 py-24 bg-black">

      {/* GRID BACKGROUND */}
<div
  className="
    absolute inset-0
    bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),
    linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)]
    bg-size-[40px_40px]
    z-0
  "
/>

      {/* CONTENT */}
  <div className="relative z-10">

      {/* GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-75 bg-blue-500/10 blur-[120px]" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl">

        {/* TOP LABELS */}
        <div className="flex flex-wrap gap-4 text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-8">
          <span className="text-green-400">• Open Marketplace</span>
          <span>Stripe Escrow</span>
          <span>GitHub Native</span>
        </div>

        {/* HEADING */}
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight max-w-4xl">
          Bounties for the issues nobody has time to fix.
        </h1>

        {/* SUBTEXT */}
        <p className="mt-6 text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
          A developer-first marketplace where maintainers post paid bounties
          on GitHub issues and contributors get rewarded to ship production-ready fixes.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-4 mt-10">

          <button className="bg-white text-black px-5 py-3 rounded-xl text-sm font-medium hover:bg-gray-200 transition">
            Browse bounties ↗
          </button>

          <button className="border border-white/10 px-5 py-3 rounded-xl text-sm hover:border-white/30 transition">
            Post a bounty
          </button>

        </div>

      </div>
      </div>
    </section>
  );
};

export default Hero;