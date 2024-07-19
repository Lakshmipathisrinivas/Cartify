import { useEffect, useState } from "react";

const useOnline = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);

  useEffect(() => {
    const handleOnline = () => {
      console.log("user is online");
      setOnlineStatus(true);
    };

    const handleOffline = () => {
      console.log("user is offline");
      setOnlineStatus(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []); 

  return onlineStatus;
};

export default useOnline;
