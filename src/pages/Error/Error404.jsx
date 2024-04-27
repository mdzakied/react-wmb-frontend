import { Link } from "react-router-dom";

import errorImage404 from "@assets/images/404.png";

function Error404() {
  return (
    <>
      {/* Error Section */}
      <section
        id="error404"
        className="flex flex-col justify-center items-center h-screen"
      >
        {/* Image */}
        <div className="flex justify-center ">
          <img src={errorImage404} alt="errorImg" className="w-3/4 md:w-1/3" />
        </div>
        {/* Back to Home Button */}
        <div className="flex justify-center">
          {/* Link to Home Page */}
          <Link to="/dashboard" className="btn btn-sm bg-orange">
            Back To Home
          </Link>
        </div>
      </section>
    </>
  );
}

export default Error404;
