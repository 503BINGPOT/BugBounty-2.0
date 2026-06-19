import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/layout/Layout";

const MyApplications = () => {

  const [applications,
    setApplications] =
      useState([]);

  const [prUrl, setPrUrl] =
  useState("");

  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  useEffect(() => {

    const fetchApplications =
      async () => {

        try {

          const response =
            await axios.get(

              `http://localhost:5000/api/applications/user/${currentUser.id}`

            );

          setApplications(
            response.data
          );

        } catch (error) {

          console.log(error);

        }

      };

    fetchApplications();

  }, []);

  const submitPR =
  async (applicationId) => {

    try {

      await axios.put(

        "http://localhost:5000/api/applications/submit-pr",

        {
          applicationId,
          prUrl,
        }

      );

      alert(
        "PR submitted!"
      );

      window.location.reload();

    } catch (error) {

      console.log(error);

    }

};

  return (

    <Layout>

      <div className="max-w-5xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-semibold mb-8">
          My Applications
        </h1>

        {
          applications.length === 0
          ? (

            <p className="text-gray-500">
              No applications yet.
            </p>

          )
          : (

            applications.map(

              application => (

                <div

                  key={application.id}

                  className="
                    border border-white/10
                    rounded-xl
                    p-6
                    mb-4
                  "

                >

                  <h2 className="text-xl font-medium">
                    {application.title}
                  </h2>

                  <p className="text-green-400 mt-2">
                    ${application.reward}
                  </p>

                  <p className="text-gray-400 mt-3">
                    {application.cover_letter}
                  </p>

                  <p className="mt-4 text-yellow-500">
                    Status:
                    {" "}
                    {application.status}
                  </p>

                  {
  application.status ===
  "Accepted" && (

    <div className="mt-5">

      <input

        type="text"

        placeholder="
https://github.com/user/repo/pull/12
"

        value={prUrl}

        onChange={(e) =>
          setPrUrl(
            e.target.value
          )
        }

        className="
          w-full
          border border-white/10
          rounded-lg
          p-3
          mb-3
          bg-transparent
        "

      />

      <button

        onClick={() =>
          submitPR(
            application.id
          )
        }

        className="
          bg-white
          text-black
          px-4 py-2
          rounded-lg
        "

      >
        Submit Pull Request
      </button>

      <button

  onClick={
    async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:5000/api/applications/check-pr/${application.id}`

          );

        if (
          response.data.merged
        ) {

          alert(
            "PR Merged! Bounty completed."
          );

        } else {

          alert(
            "PR not merged yet."
          );

        }

      } catch (error) {

        console.log(error);

      }

    }
  }

  className="
    ml-3
    bg-green-600
    px-4 py-2
    rounded-lg
  "

>
  Check PR Status
</button>

    </div>

  )
}

                </div>

              )

            )

          )
        }

      </div>

    </Layout>

  );

};

export default MyApplications;