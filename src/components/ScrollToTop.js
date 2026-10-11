import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Posicao de scroll por entrada do historico (location.key + caminho).
// A primeira entrada de um carregamento novo tem sempre a chave "default":
// no primeiro render nao se repoe nada e grava-se a posicao actual por cima
// de qualquer valor antigo de outro carregamento.
const STORAGE_KEY = "adelgam_scroll_positions";

const readPositions = () => {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
};

const savePosition = (key, y) => {
  try {
    const positions = readPositions();
    positions[key] = y;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  } catch (e) {
    // sem sessionStorage: fica sem reposicao, nada mais
  }
};

// Sem animacao: o Bootstrap liga scroll-behavior: smooth no :root.
const scrollInstant = (y) => {
  window.scrollTo({ top: y, left: 0, behavior: "instant" });
};

// Repoe a posicao depois do layout. Imagens ainda a carregar podem deixar a
// pagina curta demais: tenta outra vez por pouco tempo ate conseguir.
const restorePosition = (y) => {
  let cancelled = false;
  const delays = [0, 50, 150, 300, 600, 1000];
  const timers = [];
  const attempt = () => {
    if (cancelled) return;
    scrollInstant(y);
    if (Math.abs(window.scrollY - y) < 2) cancelled = true;
  };
  requestAnimationFrame(attempt);
  delays.forEach((d) => timers.push(setTimeout(attempt, d)));
  // se a pessoa fizer scroll entretanto, deixa de insistir
  const stop = () => {
    cancelled = true;
  };
  window.addEventListener("wheel", stop, { once: true, passive: true });
  window.addEventListener("touchstart", stop, { once: true, passive: true });
  return () => {
    cancelled = true;
    timers.forEach(clearTimeout);
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
  };
};

const ScrollToTop = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Entrada do historico a que pertence o scroll actual. Muda antes de a
  // pagina nova fazer scroll, para nao gravar a posicao nova na entrada antiga.
  const entryKey = `${location.key}|${location.pathname}`;
  const currentKey = useRef(entryKey);
  const firstRender = useRef(true);

  useEffect(() => {
    const onScroll = () => {
      savePosition(currentKey.current, window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    currentKey.current = entryKey;
    const isFirstRender = firstRender.current;
    firstRender.current = false;
    if (sessionStorage.getItem("adelgam_navigating_forward")) {
      sessionStorage.removeItem("adelgam_navigating_forward");
      scrollInstant(0);
      return undefined;
    }
    // A pagina do empreendimento repoe ela propria a fracao aberta.
    if (sessionStorage.getItem("adelgam_scroll_restore")) return undefined;

    if (isFirstRender) {
      scrollInstant(0);
      savePosition(entryKey, 0);
      return undefined;
    }

    if (navigationType === "POP") {
      const y = readPositions()[entryKey];
      if (typeof y === "number") return restorePosition(y);
    }
    scrollInstant(0);
    return undefined;
  }, [entryKey, navigationType]);

  return null;
};

export default ScrollToTop;
