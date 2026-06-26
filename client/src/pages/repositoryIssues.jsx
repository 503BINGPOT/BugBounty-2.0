import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Layout from "../components/layout/layout";

const RepositoryIssues = () => {

    const [showModal, setShowModal] =
  useState(false);

const [selectedIssue, setSelectedIssue] =
  useState(null);

const [reward, setReward] =
  useState("");

const [difficulty, setDifficulty] =
  useState("Medium");

const [acceptanceCriteria,
  setAcceptanceCriteria] =
  useState("");

  const { owner, repo } =
    useParams();

  const [issues,
    setIssues] =
      useState([]);

  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  useEffect(() => {

    const fetchIssues =
      async () => {

        try {

          const response =
            await axios.get(

              `${import.meta.env.VITE_API_URL}/api/github/issues/${owner}/${repo}`

            );

          setIssues(
            response.data
          );

        } catch (error) {

          console.log(error);

        }

      };

    fetchIssues();

  }, []);

  const importIssue =
  async () => {

    try {

      await axios.post(

        `${import.meta.env.VITE_API_URL}/api/github/import-issue`,

        {
          title:
            selectedIssue.title,

          description:
            selectedIssue.body || "",

          reward,

          difficulty,

          acceptanceCriteria,

          issueNumber:
            selectedIssue.number,

          repoName:
            repo,

          ownerId:
            currentUser.id,
        }

      );

      alert(
        "Issue imported!"
      );

      setShowModal(false);

    } catch (error) {

      console.log(error);

    }

};
  return (

    <Layout>

      <div className="max-w-5xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-semibold mb-8">
          Repository Issues
        </h1>

        {

          issues.map(

            issue => (

              <div

                key={issue.id}

                className="
                  border border-white/10
                  rounded-xl
                  p-5
                  mb-4
                "

              >

                <h2 className="font-medium">
                  {issue.title}
                </h2>

                <p className="text-gray-400 mt-2">
                  {issue.body}
                </p>

                <button

                  onClick={() => {

                setSelectedIssue(issue);

                setAcceptanceCriteria(
                issue.body || ""
                );

                setShowModal(true);

            }}

                  className="
                    mt-4
                    bg-white
                    text-black
                    px-4 py-2
                    rounded-lg
                  "

                >
                  Import As Bounty
                </button>

              </div>

            )

          )

        }

      </div>

        {
  showModal && (

    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 w-full max-w-lg">

        <h2 className="text-2xl font-semibold mb-5">
          Import Issue as Bounty
        </h2>

        <div className="mb-4">

          <label className="block mb-2">
            Reward ($)
          </label>

          <input
            type="number"
            value={reward}
            onChange={(e) =>
              setReward(
                e.target.value
              )
            }
            className="
              w-full
              bg-transparent
              border border-white/10
              rounded-lg
              p-3
            "
          />

        </div>

        <div className="mb-4">

          <label className="block mb-2">
            Difficulty
          </label>

          <select

            value={difficulty}

            onChange={(e) =>
              setDifficulty(
                e.target.value
              )
            }

            className="
              w-full
              bg-zinc-900
              border border-white/10
              rounded-lg
              p-3
            "

          >

            <option>
              Easy
            </option>

            <option>
              Medium
            </option>

            <option>
              Hard
            </option>

          </select>

        </div>

        <div className="mb-5">

          <label className="block mb-2">
            Acceptance Criteria
          </label>

          <textarea

            rows="5"

            value={acceptanceCriteria}

            onChange={(e) =>
              setAcceptanceCriteria(
                e.target.value
              )
            }

            className="
              w-full
              bg-transparent
              border border-white/10
              rounded-lg
              p-3
            "

          />

        </div>

        <div className="flex gap-3">

          <button

            onClick={importIssue}

            className="
              bg-white
              text-black
              px-5 py-2
              rounded-lg
            "

          >
            Import Bounty
          </button>

          <button

            onClick={() =>
              setShowModal(false)
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

export default RepositoryIssues;