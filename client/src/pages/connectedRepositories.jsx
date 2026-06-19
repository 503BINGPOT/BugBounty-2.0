import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/layout/Layout";

const ConnectedRepositories = () => {

  const [repositories,
    setRepositories] =
      useState([]);

  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  useEffect(() => {

    const fetchRepositories =
      async () => {

        try {

          const response =
            await axios.get(

              `http://localhost:5000/api/github/repos/${currentUser.id}`

            );

          setRepositories(
            response.data
          );

        } catch (error) {

          console.log(error);

        }

      };

    fetchRepositories();

  }, []);

  const connectRepository =
    async (repo) => {

      try {

        await axios.post(

          "http://localhost:5000/api/github/connect-repo",

          {
            userId:
              currentUser.id,

            repoId:
              repo.id,

            repoName:
              repo.name,

            repoOwner:
              repo.owner.login,

            repoUrl:
              repo.html_url,
          }

        );

        alert(
          "Repository connected!"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to connect repository"
        );

      }

    };

  return (

    <Layout>

      <div className="max-w-5xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-semibold mb-8">
          Connected Repositories
        </h1>

        {
          repositories.length === 0
          ? (
            <p>
              No repositories found
            </p>
          )
          : (

            repositories.map(

              repo => (

                <div

                  key={repo.id}

                  className="
                    border border-white/10
                    rounded-xl
                    p-5
                    mb-4
                    flex
                    justify-between
                    items-center
                  "

                >

                  <div>

                    <h2 className="font-medium">
                      {repo.name}
                    </h2>

                    <p className="text-gray-400 text-sm">
                      {repo.full_name}
                    </p>

                  </div>

                  <button

  onClick={() =>

    window.location.href =

      `/issues/${repo.owner.login}/${repo.name}`

  }

  className="
    bg-white
    text-black
    px-4 py-2
    rounded-lg
  "

>
  View Issues
</button>

                </div>

              )

            )

          )
        }

      </div>

    </Layout>

  );

};

export default ConnectedRepositories;