import Swal from "sweetalert2/dist/sweetalert2.js";

function SweetAlert() {
  const success = (message) => {
    Swal.fire({
      icon: "success",
      title: "success",
      text: `${message}`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const error = (message) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${message}`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const info = (message) => {
    Swal.fire({
      icon: "info",
      title: "Info",
      text: `${message}`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return {
    success,
    error,
    info,
  };
}

export default SweetAlert;
