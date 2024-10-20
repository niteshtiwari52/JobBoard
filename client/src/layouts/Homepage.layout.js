import React from "react";


const HomepageLayout =
  (Components) =>
  ({ ...props }) => {
    return (
      <>
      
        <Components {...props} />
       
      </>
    );
  };

export default HomepageLayout;
