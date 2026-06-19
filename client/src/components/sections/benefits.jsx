import {
  Zap,
  BadgeCheck,
  Shield,
  GitBranch,
} from "lucide-react";

const features = [
  {
    icon: <Zap size={18} strokeWidth={1.7} />,
    title: "Ship faster",
    description:
      "Maintainers pay. Issues clear. Everyone wins.",
  },
  {
    icon: <BadgeCheck size={18} strokeWidth={1.7} />,
    title: "Trust score",
    description:
      "Every shipped bounty boosts your reputation.",
  },
  {
    icon: <Shield size={18} strokeWidth={1.7} />,
    title: "Escrow protected",
    description:
      "Funds locked the moment the bounty is accepted.",
  },
  {
    icon: <GitBranch size={18} strokeWidth={1.7} />,
    title: "GitHub native",
    description:
      "Links straight to issues and PRs.",
  },
];

const Benefits = () => {
  return (
    <section className="border-t border-white/10 py-16">

      <div className="px-6 md:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT */}
          <div>

            <p className="uppercase tracking-[0.35em] text-[11px] text-gray-500 mb-6">
              For devs, by devs
            </p>

            <h2 className="text-3xl md:text-4xl font-semibold leading-tight max-w-lg">
              Real money. Real PRs. Real reputation.
            </h2>

          </div>

          {/* RIGHT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10 max-w-[700px]">

            {features.map((feature, index) => (
              <div
                key={index}
                className="
                  p-6
                  border-r border-b border-white/10
                  even:border-r-0
                  min-h-[170px]
                "
              >

                {/* ICON */}
                <div className="text-gray-300 mb-5">
                  {feature.icon}
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-medium mb-3">
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default Benefits;