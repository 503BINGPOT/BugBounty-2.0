import Layout from "../components/layout/Layout";
import { useState } from "react";
import { registerUser } from "../api/auth";

const Register = () => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "contributor",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const data = await registerUser(formData);

    // SAVE TOKEN
    localStorage.setItem(
      "token",
      data.token
    );

    // SAVE USER
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    // REDIRECT
    window.location.href = "/dashboard";

  } catch (error) {

    console.log(error);

  }
};

  return (
    <Layout>

      <section className="h-[calc(100vh-73px)] overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="px-10 lg:px-20 py-10 flex items-center">

          <div className="w-full max-w-130">

            {/* LABEL */}
            <p className="uppercase tracking-[0.35em] text-[11px] text-gray-500 mb-6">
              Create account
            </p>

            {/* HEADING */}
            <h1 className="text-[34px] leading-[1.05] font-semibold mb-7 max-w-120">
              Start earning. Or start shipping.
            </h1>

            {/* ROLE SELECT */}
            <div className="grid grid-cols-2 gap-4">

  {/* CONTRIBUTOR */}
  <button
    type="button"
    onClick={() =>
      setFormData({
        ...formData,
        role: "contributor",
      })
    }
    className={`
      rounded-2xl
      border
      p-5
      text-left
      transition

      ${
        formData.role === "contributor"
          ? "border-white bg-white/[0.06]"
          : "border-white/10 hover:border-white/30"
      }
    `}
  >

    <h3 className="text-[17px] font-medium mb-1">
      Contributor
    </h3>

    <p className="text-gray-500 text-sm">
      I solve bounties
    </p>

  </button>


  {/* PROJECT ADMIN */}
  <button
    type="button"
    onClick={() =>
      setFormData({
        ...formData,
        role: "admin",
      })
    }
    className={`
      rounded-2xl
      border
      p-5
      text-left
      transition

      ${
        formData.role === "admin"
          ? "border-white bg-white/[0.06]"
          : "border-white/10 hover:border-white/30"
      }
    `}
  >

    <h3 className="text-[17px] font-medium mb-1">
      Project Admin
    </h3>

    <p className="text-gray-500 text-sm">
      I post bounties
    </p>

  </button>

</div>
            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6 mt-4"
            >           

              {/* USERNAME */}
              <div>

                <label className="block uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-3">
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="
                  bg-transparent
                  w-full
                  rounded-xl
                  border border-white/10
                  py-3
                  px-5
                  outline-none
                  text-sm
                  transition
                  focus:border-white/30
          "
                />

              </div>

              {/* EMAIL */}
              <div>

                <label className="block uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-3">
                  Email
                </label>

                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="
                  bg-transparent
                  w-full
                  rounded-xl
                  border border-white/10
                  py-3
                  px-5
                  outline-none
                  text-sm
                  transition
                  focus:border-white/30
          "
                />

              </div>

              {/* PASSWORD */}
              <div>

                <label className="block uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-3">
                  Password
                </label>

                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="
                  bg-transparent
                  w-full
                  rounded-xl
                  border border-white/10
                  py-3
                  px-5
                  outline-none
                  text-sm
                  transition
                  focus:border-white/30
          "
                />

              </div>

              {/* BUTTON */}
              <button
                className="
                  w-full
                  bg-white
                  text-black
                  py-3
                  rounded-xl
                  text-lg
                  font-medium
                  hover:bg-gray-200
                  transition
                "
              >
                Create account
              </button>

            </form>

            {/* FOOT TEXT */}
            <p className="text-gray-500 mt-5 text-center text-sm">
              Already registered?{" "}
              <span className="text-white cursor-pointer hover:underline">
                Sign in
              </span>
            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}
<div
  className="
    hidden lg:flex
    relative
    overflow-hidden
    border-l border-white/10
    items-end
    px-12
    py-10
  "
>

  {/* GRID */}
  <div
    className="
      absolute inset-0
      bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)]
      bg-size-[24px_24px]
    "
  />

  {/* CONTENT */}
  <div className="relative z-10 max-w-105 pb-8">

    <p className="uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-5">
      // Signup
    </p>

    <h2 className="text-[32px] leading-[1.08] font-semibold">
      Join the marketplace where every PR pays.
    </h2>

  </div>

</div>

      </section>

    </Layout>
  );
};

export default Register;