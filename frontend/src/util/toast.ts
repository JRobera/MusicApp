import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const generateError = (error: string) =>
  toast.error(error, {
    position: "bottom-right",
  });
const generatesuccess = (success: string) =>
  toast.success(success, {
    position: "bottom-right",
  });
const generatenotification = (notif: string) =>
  toast.info(notif, {
    position: "bottom-right",
  });

export { generateError, generatesuccess, generatenotification };
