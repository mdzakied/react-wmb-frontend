import AuthService from "@services/AuthService";
import SweetAlert from "@shared/components/Modal/SweetAlert";

import { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
  // use service and sweet alert with useMemo -> prevent re-render
  const authService = AuthService();
  const sweetAlert = useMemo(() => SweetAlert(), []);
  // use navigate hook -> redirect
  const navigate = useNavigate();

  // useEffect -> check token always when service or route change
  useEffect(() => {
    // check token
    const checkToken = async () => {
      const isValidate = await authService.validateToken();

      if (!localStorage.getItem("user") || !isValidate) {
        // notification
        sweetAlert.error("Unauthorized, please login first !");

        // redirect
        navigate("/login");
      }
    };

    checkToken();
  }, [authService, sweetAlert, navigate]);

  return <>{children}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
