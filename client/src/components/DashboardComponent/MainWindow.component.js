import React, { useState } from "react";
import JobFormcomponent from "./JobForm.component";

const MainWindowcomponent = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      
      {!showForm && (
        <button
          className="w-[310px] h-[57px] bg-[#0B66EF] text-white font-semibold rounded-lg mb-6"
          onClick={toggleForm}
        >
          Create Interview
        </button>
      )}

     
      {showForm && <JobFormcomponent onCancel={toggleForm} />}
    </>
  );
};

export default MainWindowcomponent;
