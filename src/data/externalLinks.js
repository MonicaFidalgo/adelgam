// Paginas proprias dos empreendimentos a venda (fora deste site).
// Links externos normais (<a href>), sempre com ?origem=adelgam.pt.
export const PORTAS_DO_TEJO_URL =
  "https://portasdotejo.adelgam.pt/?origem=adelgam.pt";
export const PENTHOUSE_URL = "https://penthouse.adelgam.pt/?origem=adelgam.pt";

// Na versao inglesa do site, os links levam a versao inglesa de cada pagina:
// o Portas do Tejo le ?lang=en; a penthouse tem endereco proprio em /en.
export function linkNaLingua(url, lingua) {
  if (!lingua || !String(lingua).startsWith("en")) return url;
  if (url === PORTAS_DO_TEJO_URL) return url + "&lang=en";
  if (url === PENTHOUSE_URL) return "https://penthouse.adelgam.pt/en?origem=adelgam.pt";
  return url;
}
