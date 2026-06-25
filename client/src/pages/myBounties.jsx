import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/layout/Layout";

const MyBounties = () => {

  const [bounties,
    setBounties] =
      useState([]);

  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  useEffect(() => {

    const fetchBounties =
      async () => {

        try {

          const response =
            await axios.get(

              `${import.meta.env.VITE_API_URL}/api/bounties/owner/${currentUser.id}`

            );

          setBounties(
            response.data
          );

        } catch (error) {

          console.log(error);

        }

      };

    fetchBounties();

  }, []);

  return (

    <Layout>

      <div className="max-w-5xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-semibold mb-8">
          My Bounties
        </h1>

        {
          bounties.length === 0
          ? (

            <p className="text-gray-500">
              No bounties created.
            </p>

          )
          : (

            bounties.map(

              bounty => (

                <div

                  key={bounty.id}

                  className="
                    border border-white/10
                    rounded-xl
                    p-6
                    mb-4
                  "

                >

                  <h2 className="text-xl font-medium">
                    {bounty.title}
                  </h2>

                  <p className="text-green-400 mt-2">
                    ${bounty.reward}
                  </p>

                  <p className="text-yellow-500 mt-2">
                    {bounty.status}
                  </p>

                </div>

              )

            )

          )
        }

      </div>

    </Layout>

  );

};

export default MyBounties;