import React from "react";
import { useParams } from "react-router-dom";
import Navbarcomponent from "../NavbarComponent/Navbar.component";
import SignUpcomponent from "../AuthCompoment/SignUp.component";
import Verifycomponent from "../AuthCompoment/Verify.component";

const Landingcomponent = () => {
  const { type } = useParams();

  let content;
  switch (type) {
    case "verify":
      content = <Verifycomponent />;
      break;
    case "signup":
    default:
      content = <SignUpcomponent />;
      break;
  }

  return (
    <>
    <div className="container mx-auto px-4 lg:px-20">
      <Navbarcomponent />
      <div className="px-4 h-[90vh] flex justify-between items-center">
        <div className="w-1/3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley.
        </div>

        <div>{content}</div>
      </div>
      </div>
    </>
  );
};

export default Landingcomponent;
