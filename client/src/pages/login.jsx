import { useState } from "react";

import Layout from "../components/layout/layout";

import { loginUser } from "../api/auth";

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showGithubModal,
  setShowGithubModal] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = await loginUser(formData);

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

      if (
  error.response?.data?.githubUser
) {

  setShowGithubModal(true);

} else {

  alert(
    error.response?.data?.message ||
    "Login failed"
  );

}

    }

  };

  return (
    <Layout>

      <section className="h-[calc(100vh-64px)] overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div
          className="
            hidden lg:flex
            relative
            overflow-hidden
            border-r border-white/10
            items-end
            px-10
            py-10
          "
        >

          {/* GRID */}
          <div
            className="
              absolute inset-0
              bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)]
              bg-[size:24px_24px]
            "
          />

          {/* CONTENT */}
          <div className="relative z-10 max-w-[360px] pb-4">

            <p className="uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-5">
              // Login
            </p>

            <h2 className="text-[30px] leading-[1.08] font-semibold">
              Welcome back. The issue queue won't clear itself.
            </h2>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-8 py-10">

          <div className="w-full max-w-[460px]">

            {/* LABEL */}
            <p className="uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-5">
              Sign in
            </p>

            {/* HEADING */}
            <h1 className="text-[30px] font-semibold mb-10">
              Continue to BountyHub
            </h1>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* EMAIL */}
              <div>

                <label className="block uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-3">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="
                    w-full
                    bg-transparent
                    border border-white/10
                    rounded-lg
                    px-4
                    py-3
                    text-sm
                    outline-none
                    focus:border-white/30
                    transition
                  "
                />

              </div>

              {/* PASSWORD */}
              <div>

                <label className="block uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-3">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="
                    w-full
                    bg-transparent
                    border border-white/10
                    rounded-lg
                    px-4
                    py-3
                    text-sm
                    outline-none
                    focus:border-white/30
                    transition
                  "
                />

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="
                  w-full
                  bg-white
                  text-black
                  py-3
                  rounded-lg
                  text-base
                  font-medium
                  hover:bg-gray-200
                  transition
                "
              >
                Sign in
              </button>

            </form>

            {/* FOOT TEXT */}
            <p className="text-gray-500 mt-6 text-center text-sm">
              No account?{" "}
              <span className="text-white cursor-pointer hover:underline">
                Create one
              </span>
            </p>

            {/* DIVIDER */}
<div className="my-7 flex items-center gap-4">

  <div className="h-px flex-1 bg-white/10" />

  <span className="uppercase tracking-[0.35em] text-[10px] text-gray-500">
    Or
  </span>

  <div className="h-px flex-1 bg-white/10" />

</div>

{/* GITHUB LOGIN */}
<button
  type="button"
  onClick={() => {
    window.location.href =
      `${import.meta.env.VITE_API_URL}/api/auth/github`;
  }}
  className="
    w-full
    border border-white/10
    rounded-lg
    px-4
    py-3
    flex items-center
    justify-center
    gap-3
    text-sm
    hover:border-white/30
    hover:bg-white/5
    transition
  "
>

  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.29-.01-1.06-.02-2.08-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.48-1.34-5.48-5.94 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.64-5.49 5.94.43.37.82 1.11.82 2.24 0 1.62-.01 2.92-.01 3.31 0 .32.21.7.83.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>

  Continue with GitHub

</button>

          </div>

        </div>

      </section>

      {
  showGithubModal && (

    <div className="
      fixed inset-0
      bg-black/70
      flex items-center
      justify-center
      z-50
    ">

      <div className="
        bg-zinc-900
        border border-white/10
        rounded-xl
        p-6
        max-w-md
        w-full
      ">

        <h2 className="
          text-2xl
          font-semibold
          mb-3
        ">
          GitHub Account Detected
        </h2>

        <p className="
          text-gray-400
          mb-6
        ">
          This account was created using GitHub.
          Please continue with GitHub authentication.
        </p>

        <div className="
          flex gap-3
        ">

          <button

            onClick={() => {

              window.location.href =
                `${import.meta.env.VITE_API_URL}/api/auth/github`;

            }}

            className="
              bg-white
              text-black
              px-5 py-2
              rounded-lg
            "

          >
            Continue with GitHub
          </button>

          <button

            onClick={() =>
              setShowGithubModal(false)
            }

            className="
              border border-white/10
              px-5 py-2
              rounded-lg
            "

          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  )
}

    </Layout>
  );
};

export default Login;