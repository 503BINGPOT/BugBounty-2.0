import { GitBranch, DollarSign, Shield } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Link an issue",
    description:
      "Paste a GitHub issue URL. We import title, body, labels.",
    icon: <GitBranch size={28} strokeWidth={1.5} />,
  },
  {
    number: "02",
    title: "Fund escrow",
    description:
      "Stripe holds the bounty. Contributors know payment is real.",
    icon: <DollarSign size={28} strokeWidth={1.5} />,
  },
  {
    number: "03",
    title: "Review & release",
    description:
      "Approve the PR, payment is released. Reputation updates automatically.",
    icon: <Shield size={28} strokeWidth={1.5} />,
  },
];

const HowItWorks = () => {
  return (
    <section className="relative border-t border-white/10 mt-20">
      <div className="relative z-10 px-6 md:px-12 py-16">

        {/* SMALL LABEL */}
        <p className="uppercase tracking-[0.35em] text-[11px] text-gray-500 mb-8">
          How it works
        </p>

        {/* HEADING */}
        <h2 className="text-3xl md:text-4xl font-semibold leading-tight max-w-3xl mb-16">
          A clean handoff between maintainers and contributors.
        </h2>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10">

          {steps.map((step, index) => (
            <div
              key={index}
              className="
                p-8
                border-r border-white/10
                last:border-r-0
                min-h-60
                bg-black/40
                backdrop-blur-sm
              "
            >

              {/* NUMBER */}
              <p className="text-[11px] tracking-[0.3em] text-gray-600 mb-10">
                {step.number}
              </p>

              {/* ICON */}
              <div className="text-gray-300 mb-6">
                {step.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-3xl font-medium mb-6">
                {step.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-400 text-base leading-relaxed">
                {step.description}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;