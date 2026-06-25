import Layout from "../components/layout/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Search,
  ChevronDown,
} from "lucide-react";



const Bounties = () => {

  const [bounties, setBounties] =
  useState([]);

  const navigate = useNavigate();

  useEffect(() => {

  const fetchBounties =
    async () => {

      try {

        const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/bounties`
);

setBounties(response.data);

      } catch (error) {

        console.log(error);

      }

    };

  fetchBounties();

}, []);

  return (

    <Layout>

      <section
        className="
          min-h-[calc(100vh-64px)]
          px-4 md:px-6
          py-5
        "
      >

        {/* TOP */}
        <div
          className="
            flex items-start justify-between
            mb-6
          "
        >

          <div>

            <p
              className="
                uppercase
                tracking-[0.35em]
                text-[8px]
                text-gray-500
                mb-2
              "
            >
              Marketplace
            </p>

            <h1
              className="
                text-[30px]
                md:text-[36px]
                font-semibold
                leading-none
              "
            >
              Bounties
            </h1>

          </div>

          <div
            className="
              text-gray-500
              text-xs
              mt-1
            "
          >
            {bounties.length} listed
          </div>

        </div>

        {/* CONTENT */}
        <div
          className="
            grid
            grid-cols-1 lg:grid-cols-[180px_1fr]
            gap-5
          "
        >

          {/* SIDEBAR */}
          <div>

            {/* SEARCH */}
            <div className="mb-6">

              <p
                className="
                  uppercase
                  tracking-[0.35em]
                  text-[8px]
                  text-gray-500
                  mb-3
                "
              >
                Search
              </p>

              <div
                className="
                  flex
                  border border-white/10
                  rounded-lg
                  overflow-hidden
                  h-9
                "
              >

                <input
                  type="text"
                  placeholder="keyword..."
                  className="
                    flex-1
                    bg-transparent
                    px-3
                    text-xs
                    outline-none
                  "
                />

                <button
                  className="
                    w-10
                    border-l border-white/10
                    flex items-center justify-center
                    hover:bg-white/5
                    transition
                  "
                >
                  <Search size={14} />
                </button>

              </div>

            </div>

            {/* STATUS */}
            <div className="mb-6">

              <p
                className="
                  uppercase
                  tracking-[0.35em]
                  text-[8px]
                  text-gray-500
                  mb-3
                "
              >
                Status
              </p>

              <div className="space-y-1">

                {[
                  "Open",
                  "In Progress",
                  "Paid",
                  "All",
                ].map((status, index) => (

                  <button
                    key={index}
                    className={`
                      w-full
                      text-left
                      px-3 py-2
                      rounded-lg
                      text-xs
                      transition
                      ${
                        index === 0
                          ? "border border-white bg-white text-black"
                          : "text-gray-400 hover:bg-white/5"
                      }
                    `}
                  >
                    {status}
                  </button>

                ))}

              </div>

            </div>

            {/* DIFFICULTY */}
            <div>

              <p
                className="
                  uppercase
                  tracking-[0.35em]
                  text-[8px]
                  text-gray-500
                  mb-3
                "
              >
                Difficulty
              </p>

              <div className="space-y-1">

                {[
                  "Any",
                  "Easy",
                  "Medium",
                  "Hard",
                ].map((difficulty, index) => (

                  <button
                    key={index}
                    className={`
                      w-full
                      text-left
                      px-3 py-2
                      rounded-lg
                      text-xs
                      transition
                      ${
                        index === 0
                          ? "border border-white bg-white text-black"
                          : "text-gray-400 hover:bg-white/5"
                      }
                    `}
                  >
                    {difficulty}
                  </button>

                ))}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div>

            {/* TOP BAR */}
            <div
              className="
                flex items-center justify-between
                mb-4
              "
            >

              <p
                className="
                  text-gray-500
                  text-xs
                "
              >
                Showing {bounties.length}
              </p>

              {/* SORT */}
              <button
                className="
                  h-9
                  px-3
                  border border-white/10
                  rounded-lg
                  flex items-center gap-2
                  text-xs
                  hover:border-white/20
                  transition
                "
              >

                Newest

                <ChevronDown size={14} />

              </button>

            </div>

            {/* EMPTY */}
           <div className="space-y-4">

  {bounties.map((bounty) => (

   <div
  key={bounty.id}
  onClick={() =>
    navigate(`/bounties/${bounty.id}`)
  }
  className="
    border border-white/10
    rounded-xl
    p-5
    hover:border-white/20
    transition
    cursor-pointer
  "
>

      <div className="flex justify-between mb-3">

        <h2 className="text-lg font-medium">
          {bounty.title}
        </h2>

        <span className="text-green-400">
          ${bounty.reward}
        </span>

      </div>

      <p className="text-gray-400 text-sm mb-4">
        {bounty.description}
      </p>

      <div className="flex flex-wrap gap-4 text-xs text-gray-500">

        <span>
          {bounty.difficulty}
        </span>

        {bounty.skills && (
          <span>
            {bounty.skills}
          </span>
        )}

      </div>

    </div>

  ))}

</div>
          </div>

        </div>

      </section>

    </Layout>

  );

};

export default Bounties;