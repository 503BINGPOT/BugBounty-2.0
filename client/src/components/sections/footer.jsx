const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-6">

      <div className="px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* LEFT */}
        <p className="text-sm text-gray-500">
          © 2026 BountyHub
        </p>

        {/* RIGHT */}
        <p className="text-[11px] tracking-[0.25em] uppercase text-gray-600 text-center">
          Built with FastAPI · React · Stripe
        </p>

      </div>

    </footer>
  );
};

export default Footer;