import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "pageview",
        page: {
          path: location.pathname,
          url: window.location.href,
          title: document.title,
        },
      });
    }
  }, [location]);
};

export default usePageTracking;
