import { useState } from "react";
import axios from "axios";

const PostBounty = () => {

  const [formData, setFormData] = useState({
  title: "",
  description: "",
  reward: "",
  difficulty: "Easy",
  skills: "",
  deadline: "",
  
  githubUrl: "",
  githubIssueId: "",

  status: "Open",

  acceptanceCriteria: "",
});


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

const payload = {

  ...formData,

};

const token = localStorage.getItem("token");

  e.preventDefault();

  try {

    const response =
  await axios.post(

    "http://localhost:5000/api/bounties",

    payload,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

  );

    console.log(response.data);

    alert(
      "Bounty created successfully!"
    );

  } catch (error) {

    console.log(error);

    console.log(
      error.response?.data
    );

    alert(
      error.response?.data?.message ||
      "Failed to create bounty"
    );

  }

};

  return (

    <div className="min-h-screen text-white">

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* LABEL */}
        <p className="uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-4">
          Create Bounty
        </p>

        {/* HEADING */}
        <h1 className="text-4xl font-semibold mb-10">
          Post a new bounty
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* TITLE */}
          <div>

            <label className="block uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-3">
              Title<span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Fix payment gateway bug"
              className="
                w-full
                bg-transparent
                border border-white/10
                rounded-xl
                px-4 py-3
                outline-none
                focus:border-white/30
              "
            />

          </div>

          {/* DESCRIPTION */}
          <div>

            <label className="block uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-3">
              Description<span className="text-red-500">*</span>
            </label>

            <textarea
              rows="8"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe the issue in detail..."
              className="
                w-full
                bg-transparent
                border border-white/10
                rounded-xl
                px-4 py-3
                outline-none
                resize-none
                focus:border-white/30
              "
            />

          </div>

          {/* ACCEPTANCE CRITERIA */}
<div>

  <label className="block uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-3">
    Acceptance Criteria<span className="text-red-500">*</span>
  </label>

  <textarea
    rows="6"
    name="acceptanceCriteria"
    required
    value={formData.acceptanceCriteria}
    onChange={handleChange}
    placeholder={
    `✓ Feature works on desktop
    ✓ Feature works on mobile
    ✓ No console errors
    ✓ PR is merged`}
    className="
      w-full
      bg-transparent
      border border-white/10
      rounded-xl
      px-4 py-3
      outline-none
      resize-none
      focus:border-white/30
    "
  />

</div>

          {/* REWARD + DIFFICULTY */}
          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-3">
                Reward ($)<span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                name="reward"
                required
                value={formData.reward}
                onChange={handleChange}
                placeholder="100"
                className="
                  w-full
                  bg-transparent
                  border border-white/10
                  rounded-xl
                  px-4 py-3
                  outline-none
                  focus:border-white/30
                "
              />

            </div>

            <div>

              <label className="block uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-3">
                Difficulty
              </label>

              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="
                  w-full
                  bg-black
                  border border-white/10
                  rounded-xl
                  px-4 py-3
                  outline-none
                "
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>

            </div>

          </div>

          {/* SKILLS */}
          <div>

            <label className="block uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-3">
              Skills
            </label>

            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, PostgreSQL"
              className="
                w-full
                bg-transparent
                border border-white/10
                rounded-xl
                px-4 py-3
                outline-none
                focus:border-white/30
              "
            />

          </div>

          <div className="grid md:grid-cols-2 gap-6">

  {/* GITHUB URL */}
  <div>

    <label className="block uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-3">
      GitHub Repository URL
    </label>

    <input
      type="text"
      name="githubUrl"
      value={formData.githubUrl}
      onChange={handleChange}
      placeholder="https://github.com/user/repo"
      className="
        w-full
        bg-transparent
        border border-white/10
        rounded-xl
        px-4 py-3
        outline-none
        focus:border-white/30
      "
    />

  </div>

  {/* ISSUE ID */}
  <div>

    <label className="block uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-3">
      GitHub Issue ID
    </label>

    <input
      type="number"
      name="githubIssueId"
      value={formData.githubIssueId}
      onChange={handleChange}
      placeholder="123"
      className="
        w-full
        bg-transparent
        border border-white/10
        rounded-xl
        px-4 py-3
        outline-none
        focus:border-white/30
      "
    />

  </div>

</div>



          {/* DEADLINE */}
          <div>

            <label className="block uppercase tracking-[0.35em] text-[10px] text-gray-500 mb-3">
              Deadline
            </label>

            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="
                w-full
                bg-transparent
                border border-white/10
                rounded-xl
                px-4 py-3
                outline-none
                focus:border-white/30
              "
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="
              bg-white
              text-black
              px-8 py-3
              rounded-xl
              font-medium
              hover:bg-gray-200
              transition
            "
          >
            Create Bounty
          </button>

        </form>

      </div>

    </div>

  );

};

export default PostBounty;