import React, { useState } from "react"; 
import { FaCaretDown } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { createJobAction } from "../../redux/reducers/job/job.action";
import { useDispatch } from "react-redux";

const JobFormcomponent = ({ onCancel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    experienceLevel: "",
    endDate: "",
  });

  const [candidateEmails, setCandidateEmails] = useState([]);
  const [currentEmail, setCurrentEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddEmail = (e) => {
    if (e.key === "Enter" && currentEmail.trim()) {
      e.preventDefault();
      if (!candidateEmails.includes(currentEmail.trim())) {
        setCandidateEmails([...candidateEmails, currentEmail.trim()]);
        setCurrentEmail("");
      }
    }
  };

  const handleRemoveEmail = (email) => {
    setCandidateEmails(candidateEmails.filter((e) => e !== email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.jobTitle || !formData.jobDescription || !formData.experienceLevel || !formData.endDate) {
      alert("All fields are required!");
      setIsLoading(false);
      return;
    }

    const jobData = {
      jobTitle: formData.jobTitle,
      jobDescription: formData.jobDescription,
      experienceLevel: formData.experienceLevel,
      candidateEmails: candidateEmails,
      endDate: formData.endDate,
    };

    try {
      await dispatch(createJobAction(jobData));
      setFormData({
        jobTitle: "",
        jobDescription: "",
        experienceLevel: "",
        endDate: "",
      });
      setCandidateEmails([]);
      setCurrentEmail("");
      onCancel();
    } catch (error) {
      console.error("Job creation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl p-4">
      <div className="mb-4 flex items-center space-x-4">
        <label htmlFor="jobTitle" className="w-1/4 text-2xl font-medium text-black text-right">
          Job Title
        </label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="Enter Job Title"
          className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4 flex items-start space-x-4">
        <label htmlFor="jobDescription" className="w-1/4 text-2xl font-medium text-black text-right">
          Job Description
        </label>
        <textarea
          id="jobDescription"
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
          placeholder="Enter Job Description"
          className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          style={{ width: "653px", height: "270px" }}
        />
      </div>

      <div className="mb-4 flex items-center space-x-4">
        <label htmlFor="experienceLevel" className="w-1/4 text-2xl font-medium text-black text-right">
          Experience Level
        </label>
        <div className="relative flex-1">
          <select
            id="experienceLevel"
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="appearance-none p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-full"
          >
            <option value="">Select Experience Level</option>
            <option value="0">0 Year</option>
            <option value="1">1 Year</option>
            <option value="2">2 Years</option>
            <option value="3">3 Years</option>
            <option value="4">4 Years</option>
            <option value="5">5 Years</option>
          </select>
          <FaCaretDown className="absolute right-3 top-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <div className="mb-4 flex items-start space-x-4">
        <label className="w-1/4 text-2xl font-medium text-black text-right">Add Candidate</label>
        <div className="flex-1">
          <div className="border border-gray-300 rounded-md p-2 flex items-center flex-wrap">
            {candidateEmails.map((email, index) => (
              <div key={index} className="flex items-center border border-gray-400 bg-white 0 px-2 py-1 rounded-full m-1">
                <span className="text-sm">{email}</span>
                <AiOutlineClose
                  className="ml-2 text-gray-600 cursor-pointer"
                  onClick={() => handleRemoveEmail(email)}
                />
              </div>
            ))}
            <input
              type="email"
              name="candidateEmail"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              onKeyDown={handleAddEmail}
              placeholder="Add candidate email"
              className="flex-1 p-2 border-none focus:ring-0 outline-none sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center space-x-4">
        <label htmlFor="endDate" className="w-1/4 text-2xl font-medium text-black text-right">
          End Date
        </label>
        <div className="relative flex-1">
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="appearance-none p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-full"
            style={{ appearance: "none" }}
          />
          <CiCalendar className="absolute right-3 top-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className={`w-[164px] h-[59px] ${isLoading ? "bg-gray-400" : "bg-blue-600"} text-white p-2 rounded-md hover:bg-blue-700`}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
};

export default JobFormcomponent;
