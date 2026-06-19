import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

const BountyDetails = () => {

  const { id } = useParams();

  const currentUser =
  JSON.parse(
    localStorage.getItem("user")
  );

  const [bounty, setBounty] =
    useState(null);

  const [showApplyForm, setShowApplyForm] =
    useState(false);

    const [applications, setApplications] =
  useState([]);

  const [hasApplied, setHasApplied] =
  useState(false);

  const [coverLetter, setCoverLetter] =
    useState("");

  useEffect(() => {

  const fetchData =
    async () => {

      try {

        const bountyResponse =
          await axios.get(
            `http://localhost:5000/api/bounties/${id}`
          );

        setBounty(
          bountyResponse.data
        );

        const token =
          localStorage.getItem("token");

        const applicationsResponse =
          await axios.get(

            `http://localhost:5000/api/applications/${id}`,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }

          );

        setApplications(
          applicationsResponse.data
        );

        const alreadyApplied =
  applicationsResponse.data.some(
    application =>
      application.applicant_id ===
      currentUser.id
  );

setHasApplied(
  alreadyApplied
);

      } catch (error) {

        console.log(error);

      }

    };

  fetchData();

}, [id]);

  if (!bounty) {

    return (
      <Layout>
        <div className="p-10">
          Loading...
        </div>
      </Layout>
    );

  }

  const handleApplication =
  async () => {

    try {

      const response =
        await axios.post(

          "http://localhost:5000/api/applications",

          {
            bountyId:
              bounty.id,

           applicantId:
            currentUser.id,

            coverLetter,
          }

        );

      alert(
        "Application submitted!"
      );

      console.log(
        response.data
      );

      setShowApplyForm(
        false
      );

      setCoverLetter("");

    } catch (error) {

      console.log(error);

      alert(
        "Failed to apply"
      );

    }

  };

  const handleAccept =
  async (applicationId) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(

        `http://localhost:5000/api/applications/accept/${applicationId}`,

        {},

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );

      window.location.reload();

    } catch (error) {

      console.log(error);

    }

};

const handleReject =
  async (applicationId) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(

        `http://localhost:5000/api/applications/reject/${applicationId}`,

        {},

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );

      window.location.reload();

    } catch (error) {

      console.log(error);

    }

};

  return (

    <Layout>

      <div className="max-w-4xl mx-auto px-6 py-10">

        <p className="uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-3">
          Bounty
        </p>

        <h1 className="text-4xl font-semibold mb-4">
          {bounty.title}
        </h1>

        <div className="flex gap-5 mb-8">

          <span className="text-green-400">
            ${bounty.reward}
          </span>

          <span>
            {bounty.difficulty}
          </span>

        </div>

        <div className="border border-white/10 rounded-xl p-6 mb-6">

          <h2 className="font-medium mb-3">
            Description
          </h2>

          <p className="text-gray-400 whitespace-pre-wrap">
            {bounty.description}
          </p>

        </div>

        <div className="border border-white/10 rounded-xl p-6 mb-6">

          <h2 className="font-medium mb-3">
            Acceptance Criteria
          </h2>

          <p className="text-gray-400 whitespace-pre-wrap">
            {bounty.acceptance_criteria}
          </p>

        </div>

       {
  !hasApplied ? (

    <button
      onClick={() =>
        setShowApplyForm(true)
      }
      className="
        bg-white
        text-black
        px-6 py-3
        rounded-xl
        font-medium
      "
    >
      Apply For Bounty
    </button>

  ) : (

    <div
      className="
        text-yellow-500
        font-medium
      "
    >
      You have already applied
    </div>

  )
}

{
  showApplyForm && (

    <div
      className="
        border border-white/10
        rounded-xl
        p-6
        mt-6
      "
    >

      <h2
        className="
          text-lg
          font-medium
          mb-4
        "
      >
        Application
      </h2>

      <textarea

        value={coverLetter}

        onChange={(e) =>
          setCoverLetter(
            e.target.value
          )
        }

        rows="6"

        placeholder="
Tell the project owner
why you're a good fit...
"

        className="
          w-full
          bg-transparent
          border border-white/10
          rounded-xl
          p-4
          resize-none
          outline-none
        "

      />

      <button

        onClick={
          handleApplication
        }

        className="
          mt-4
          bg-white
          text-black
          px-5 py-2
          rounded-lg
        "

      >
        Submit Application
      </button>

    </div>

  )
}
        
       {
  currentUser.id === bounty.owner_id && (

    <div className="mt-10">

      <h2 className="text-2xl font-semibold mb-5">
        Applications
      </h2>

      {applications.length === 0 ? (

        <p className="text-gray-500">
          No applications yet.
        </p>

      ) : (

        applications.map((application) => (

          <div
            key={application.id}
            className="
              border border-white/10
              rounded-xl
              p-5
              mb-4
            "
          >

            <p className="font-medium">
              Applicant #{application.applicant_id}
            </p>

            <p className="text-gray-400 mt-2">
              {application.cover_letter}
            </p>

            <p className="text-yellow-500 mt-3 text-sm">
              {application.status}
            </p>

            {
              application.status ===
              "Pending" && (

                <div className="flex gap-3 mt-4">

                  <button
                    onClick={() =>
                      handleAccept(
                        application.id
                      )
                    }
                    className="
                      bg-green-600
                      px-4 py-2
                      rounded-lg
                    "
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      handleReject(
                        application.id
                      )
                    }
                    className="
                      bg-red-600
                      px-4 py-2
                      rounded-lg
                    "
                  >
                    Reject
                  </button>

                </div>

              )
            }

          </div>

        ))

      )}

    </div>

  )
}

      </div>

    </Layout>

  );

};

export default BountyDetails;