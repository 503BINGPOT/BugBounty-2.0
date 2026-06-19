import {
  Bell,
  LogOut,
} from "lucide-react";

const Wallet = () => {
  return (
    <div className="h-screen overflow-hidden bg-black text-white">

      {/* PAGE */}
      <div className="px-5 py-6 max-w-[1280px] mx-auto">

        {/* LABEL */}
        <p className="uppercase tracking-[0.35em] text-[9px] text-gray-500 mb-3">
          Wallet
        </p>

        {/* HEADING */}
        <h1 className="text-[30px] font-semibold mb-8">
          Earnings & escrow
        </h1>

        {/* BALANCE CARD */}
        <div className="border border-white/10 px-6 py-6 mb-10">

          <p className="uppercase tracking-[0.35em] text-[9px] text-gray-500 mb-4">
            Available balance
          </p>

          <h2 className="text-[52px] leading-none font-semibold mb-3">
            $0
          </h2>

          <p className="text-sm text-gray-500">
            Simulated wallet — payouts via Stripe Connect coming soon
          </p>

        </div>

        {/* TRANSACTIONS */}
        <div>

          <p className="uppercase tracking-[0.35em] text-[9px] text-gray-500 mb-4">
            Transactions
          </p>

          <div className="border border-white/10 min-h-[110px] flex items-center px-6">

            <p className="text-sm text-gray-500">
              No transactions yet.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Wallet;