import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const st: { backgroundLocation?: Location } | undefined = location.state as { backgroundLocation?: Location } | undefined;
    // ✅ if opening modal, don't scroll
    if (st?.backgroundLocation) return;

    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}