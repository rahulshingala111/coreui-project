import React from "react";
import { CFooter } from "@coreui/react";

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="/Home" target="_blank" rel="noopener noreferrer">
          Home
        </a>
        <span className="ms-1">&copy; 2022 rahul pvt ltd.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Useful Linkns -- </span>
        <a
          href="https://coreui.io/react/docs/getting-started/introduction/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CoreUI Docs
        </a> &nbsp; &nbsp;
        <a
          href="https://getbootstrap.com/docs/5.0/getting-started/introduction/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bootstrap Docs
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
