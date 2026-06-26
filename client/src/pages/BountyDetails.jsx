import Layout from "../components/layout/layout";
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

    const [isEditing, setIsEditing] = useState(false);

const [formData, setFormData] = useState({
  title: "",
  description: "",
  reward: "",
  difficulty: "",
  acceptance_criteria: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleUpdate = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/bounties/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setBounty(response.data);

    setIsEditing(false);

    alert("Bounty updated successfully!");

  } catch (err) {
    console.log(err);
    alert("Update failed");
  }
};

  useEffect(() => {

  const fetchData =
    async () => {

      try {

        const bountyResponse =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/bounties/${id}`
          );

        setBounty(
          bountyResponse.data
        );

        setFormData({
  title: bountyResponse.data.title,
  description: bountyResponse.data.description,
  reward: bountyResponse.data.reward,
  difficulty: bountyResponse.data.difficulty,
  acceptance_criteria:
    bountyResponse.data.acceptance_criteria,
});

        const token =
          localStorage.getItem("token");

        const applicationsResponse =
          await axios.get(

            `${import.meta.env.VITE_API_URL}/api/applications/${id}`,

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

      const token = localStorage.getItem("token");

const response =
  await axios.post(

    `${import.meta.env.VITE_API_URL}/api/applications`,

    {
      bountyId: bounty.id,
      coverLetter,
    },

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

      setHasApplied(true);

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

        `${import.meta.env.VITE_API_URL}/api/applications/accept/${applicationId}`,

        {},

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );

      setApplications((prev) =>
  prev.map((application) =>
    application.id === applicationId
      ? {
          ...application,
          status: "accepted",
        }
      : application.status === "pending"
      ? {
          ...application,
          status: "rejected",
        }
      : application
  )
);

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

        `${import.meta.env.VITE_API_URL}/api/applications/reject/${applicationId}`,

        {},

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );

      setApplications((prev) =>
  prev.map((application) =>
    application.id === applicationId
      ? {
          ...application,
          status: "rejected",
        }
      : application
  )
);

    } catch (error) {

      console.log(error);

    }

};

const handlePayment =
  async () => {

    try {

      const order =
        await axios.post(

          `${import.meta.env.VITE_API_URL}/api/payment/create-order`,

          {
            amount:
              bounty.reward
          }

        );

      const options = {

       key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount:
          order.data.amount,

        currency:
          order.data.currency,

        name:
          "BountyHub",

        description:
          bounty.title,

        order_id:
          order.data.id,

        handler:
          async function (
            response
          ) {

            await axios.post(

              `${import.meta.env.VITE_API_URL}/api/payment/verify`,

              {

                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,

                bountyId:
                  bounty.id,

              }

            );

            alert("Payment Successful!");

setBounty((prev) => ({
  ...prev,
  funded: true,
  payment_status: "Completed",
}));

          },

      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();

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

        {
  isEditing ? (
    <input
      name="title"
      value={formData.title}
      onChange={handleChange}
      className="text-4xl font-semibold mb-4"
    />
  ) : (
    <h1>{bounty.title}</h1>
  )
}

<div className="flex gap-5 mb-8">

  {
  isEditing ? (
    <input
      type="number"
      name="reward"
      value={formData.reward}
      onChange={handleChange}
      className="text-green-400"
    />
  ) : (
    <>₹{bounty.reward}</>
  )
}

  {
  isEditing ? (
    <select
      name="difficulty"
      value={formData.difficulty}
      onChange={handleChange}
      className="text-yellow-400"
    >
      <option>Easy</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>
  ) : (
    bounty.difficulty
  )
}

  {bounty.funded && (
    <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
      Funded
    </span>
  )}

  {currentUser.id === bounty.owner_id && (
    <>
      {!bounty.funded && (
        <button
          onClick={handlePayment}
          className="bg-blue-600 px-4 py-1 rounded-lg"
        >
          Fund Bounty
        </button>
      )}

      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-yellow-500 text-black px-4 py-1 rounded-lg"
        >
          Edit
        </button>
      )}
    </>
  )}

</div>

<p className="text-gray-400 text-sm mb-6">

  Payment Status:
  {" "}
  {bounty.payment_status || "Pending"}

</p>

        <div className="border border-white/10 rounded-xl p-6 mb-6">

          <h2 className="font-medium mb-3">
            Description
          </h2>

          {
  isEditing ? (
    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      rows={6}
      className="text-gray-400 whitespace-pre-wrap"
    />
  ) : (
    <p>{bounty.description}</p>
  )
}

        </div>

        <div className="border border-white/10 rounded-xl p-6 mb-6">

          <h2 className="font-medium mb-3">
            Acceptance Criteria
          </h2>

          {
isEditing ? (

<textarea

name="acceptance_criteria"

value={formData.acceptance_criteria}

onChange={handleChange}

rows={5}

className="
w-full
bg-transparent
border border-white/10
rounded-xl
p-3
"

 />

)

:

(

<p className="text-gray-400 whitespace-pre-wrap">

{bounty.acceptance_criteria}

</p>

)

}

          

        </div>

{
  isEditing && (
    <div className="flex gap-4 mt-8">

      <button
        onClick={handleUpdate}
        className="bg-green-600 px-5 py-2 rounded-lg"
      >
        Save Changes
      </button>

      <button
        onClick={() => {
          setFormData({
            title: bounty.title,
            description: bounty.description,
            reward: bounty.reward,
            difficulty: bounty.difficulty,
            acceptance_criteria:
              bounty.acceptance_criteria,
          });

          setIsEditing(false);
        }}
        className="bg-gray-700 px-5 py-2 rounded-lg"
      >
        Cancel
      </button>

    </div>
  )
}

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

            <div className="space-y-1">

  <h3 className="text-lg font-semibold">

    {application.username}

  </h3>

  <p className="text-sm text-gray-400">

    {application.email}

  </p>

</div>

            <div className="mt-5">

<p className="text-sm text-gray-500 mb-2">

Cover Letter

</p>

<p
className="
text-gray-300
leading-7
"
>

{application.cover_letter}

</p>

{
application.pr_url && (

<div className="mt-6">

<p className="text-sm text-gray-500">

Pull Request

</p>

<a

href={application.pr_url}

target="_blank"

rel="noreferrer"

className="
inline-block
mt-3
bg-gray-800
hover:bg-gray-700
px-4
py-2
rounded-lg
transition
"

>

View Pull Request

</a>

</div>

)
}

</div>

           <div className="mt-4">

<span

className={`
px-3
py-1
rounded-full
text-xs
font-semibold

${
application.status === "Pending"

? "bg-yellow-500/20 text-yellow-400"

: application.status === "Accepted"

? "bg-blue-500/20 text-blue-400"

: application.status === "PR Submitted"

? "bg-purple-500/20 text-purple-400"

: application.status === "Completed"

? "bg-green-500/20 text-green-400"

: "bg-red-500/20 text-red-400"
}

`}

>

{application.status}

</span>

</div>

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


{
application.status ===
"PR Submitted" && (

<div className="mt-4">

<button

onClick={()=>
checkPRStatus(
application.id
)
}

className="
bg-purple-600
px-4
py-2
rounded-lg
"

>

Check PR Status

</button>

</div>

)
}

{
application.status === "Accepted" && (

<div
className="
mt-4
text-blue-400
font-medium
"
>

Waiting for contributor to submit a Pull Request...

</div>

)
}

{
application.status === "Completed" && (

<div
className="
mt-4
text-green-400
font-medium
"
>

✅ Pull Request Merged

</div>

)
}

{
application.status === "Rejected" && (

<div
className="
mt-4
text-red-400
font-medium
"
>

Application Rejected

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