import { useEffect, useState } from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import axios from "axios";

const CompleteProfile = () => {

  const navigate = useNavigate();

  const [params] =
    useSearchParams();

  const [userData, setUserData] =
    useState(null);

  const [role, setRole] =
    useState("contributor");

  useEffect(() => {

    const token =
      params.get("token");

    if (!token) return;

    const payload =
      JSON.parse(
        atob(
          token.split(".")[1]
        )
      );

    setUserData({
      token,
      username:
        payload.username,

      email:
        payload.email,

      avatar:
        payload.avatar,
    });

  }, []);

  const handleContinue =
    async () => {

      try {

        const response =
          await axios.post(

              `${import.meta.env.VITE_API_URL}/api/auth/github/complete-profile`,

            {
              token:
                userData.token,

              role,
            }

          );

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "user",

          JSON.stringify(
            response.data.user
          )
        );

        navigate("/dashboard");

      } catch (error) {

  console.log(error);

  console.log(error.response?.data);

  alert(
    error.response?.data?.message ||
    error.message ||
    "Something went wrong"
  );

}

    };

  if (!userData) return null;

  return (

    <div
      className="
        min-h-screen
        bg-black
        text-white
        flex items-center
        justify-center
        px-6
      "
    >

      <div
        className="
          w-full
          max-w-[500px]
          border border-white/10
          rounded-3xl
          p-8
        "
      >

        {/* LABEL */}
        <p
          className="
            uppercase
            tracking-[0.35em]
            text-[10px]
            text-gray-500
            mb-5
          "
        >
          Complete profile
        </p>

        {/* HEADING */}
        <h1
          className="
            text-[32px]
            leading-tight
            font-semibold
            mb-8
          "
        >
          Finish setting up your account
        </h1>

        {/* USER */}
        <div
          className="
            flex items-center
            gap-4
            border border-white/10
            rounded-2xl
            p-4
            mb-8
          "
        >

          <img
            src={userData.avatar}
            alt=""
            className="
              w-14 h-14
              rounded-full
            "
          />

          <div>

            <h2 className="text-lg">
              {userData.username}
            </h2>

            <p className="text-sm text-gray-500">
              {userData.email}
            </p>

          </div>

        </div>

        {/* ROLE */}
        <p
          className="
            uppercase
            tracking-[0.35em]
            text-[10px]
            text-gray-500
            mb-4
          "
        >
          Select role
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">

          {/* CONTRIBUTOR */}
          <button
            onClick={() =>
              setRole("contributor")
            }
            className={`
              border
              rounded-2xl
              p-5
              text-left
              transition

              ${
                role === "contributor"
                  ? "border-white bg-white/[0.06]"
                  : "border-white/10"
              }
            `}
          >

            <h3 className="font-medium mb-1">
              Contributor
            </h3>

            <p className="text-sm text-gray-500">
              I solve bounties
            </p>

          </button>

          {/* ADMIN */}
          <button
            onClick={() =>
              setRole("admin")
            }
            className={`
              border
              rounded-2xl
              p-5
              text-left
              transition

              ${
                role === "admin"
                  ? "border-white bg-white/[0.06]"
                  : "border-white/10"
              }
            `}
          >

            <h3 className="font-medium mb-1">
              Project Admin
            </h3>

            <p className="text-sm text-gray-500">
              I post bounties
            </p>

          </button>

        </div>

        {/* BUTTON */}
        <button
          onClick={handleContinue}
          className="
            w-full
            bg-white
            text-black
            py-3
            rounded-2xl
            font-medium
          "
        >
          Continue
        </button>

      </div>

    </div>

  );

};

export default CompleteProfile;