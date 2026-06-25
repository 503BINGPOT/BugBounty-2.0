import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/layout/layout";

const MyApplications = () => {

  const [applications,
    setApplications] =
      useState([]);

const [prUrls, setPrUrls] =
useState({});

  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  useEffect(() => {

    const fetchApplications =
      async () => {

        try {

         const token = localStorage.getItem("token");

const response =
  await axios.get(
    `${import.meta.env.VITE_API_URL}/api/applications/user/${currentUser.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
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

      const token = localStorage.getItem("token");

await axios.put(

  "${import.meta.env.VITE_API_URL}/api/applications/submit-pr",

  {
    applicationId,
    prUrl: prUrls[applicationId],
  },

  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

);

      alert("PR submitted!");

setApplications((prev) =>
  prev.map((application) =>
    application.id === applicationId
      ? {
          ...application,
          status: "pr submitted",
          pr_url: prUrls[applicationId],
        }
      : application
  )
);

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

                  <p
className={`
mt-4
font-medium

${
application.status.toLowerCase() === "pending"

? "text-yellow-500"

: application.status.toLowerCase() === "accepted"

? "text-blue-500"

: application.status.toLowerCase() === "pr submitted"

? "text-purple-500"

: application.status.toLowerCase() === "completed"

? "text-green-500"

: "text-red-500"

}

`}
>

Status:
{" "}
{application.status}

</p>

                  {
  application.status ===
  "accepted" && (

    <div className="mt-5">

      <input

        type="text"

        placeholder="
https://github.com/user/repo/pull/12
"

value={
prUrls[application.id] || ""
}

onChange={(e)=>

setPrUrls({

...prUrls,

[application.id]:
e.target.value

})

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



    </div>

  )
}

{
application.status.toLowerCase() ===
"pr submitted" && (

<div className="mt-5">


<p className="text-purple-400 mb-3">

Your PR has been submitted.

Waiting for merge.

</p>

{
application.pr_url && (

<a

href={application.pr_url}

target="_blank"

rel="noreferrer"

className="
inline-block
mb-4
text-blue-400
hover:underline
break-all
"

>

View Your Pull Request

</a>

)
}

<p className="text-gray-400 mt-4">

Waiting for the project owner to review
and merge your Pull Request.

</p>

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