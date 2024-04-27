//import errorImage404 from "../../../assets/images/404.png";
import { Link } from "react-router-dom";

function Error404() {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          {/* <img src={errorImage404} width={300} alt="error" /> */}
        
          <div className="text-center">
          <Link to="/dashboard" className="btn btn-primary">
            Back to Menu
          </Link>
        </div>
        </div>

      </div>
    </div>
  );
}

export default Error404;
