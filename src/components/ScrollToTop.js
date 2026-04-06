import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (sessionStorage.getItem('adelgam_navigating_forward')) {
      sessionStorage.removeItem('adelgam_navigating_forward');
      window.scrollTo(0, 0);
      return;
    }
    if (sessionStorage.getItem('adelgam_scroll_restore')) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
