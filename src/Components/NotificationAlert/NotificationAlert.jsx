import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function NotificationAlert(message, theme) {
  Toastify({
    text: message,
    duration: 2000,
    gravity: "top",
    position: "center",

    style: {
      background: theme === "success" ? "green" : "red",
      color: "white",
      zIndex: "9999",
    },
  }).showToast();
}
