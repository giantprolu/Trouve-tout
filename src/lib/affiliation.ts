/**
 * Génération des liens d'affiliation.
 *
 * RÈGLE ABSOLUE : aucun identifiant d'affilié en dur dans le code.
 * La version précédente du site utilisait `tag=trouvetout-21`, un identifiant
 * inventé — tous les clics ont donc rapporté 0 €. On lit désormais l'ID depuis
 * l'environnement, et le build hurle s'il est absent.
 *
 * Variables à définir dans Vercel → Settings → Environment Variables :
 *   PUBLIC_AWIN_AFFILIATE_ID   → ton identifiant éditeur Awin (chiffres)
 *   PUBLIC_AMAZON_PARTNER_TAG  → optionnel, ton tag Amazon Partenaires
 */

/** ID marchand ManoMano France sur Awin. */
export const AWIN_MERCHANT_MANOMANO_FR = 17547;

const AWIN_ID = import.meta.env.PUBLIC_AWIN_AFFILIATE_ID?.trim() ?? '';
const AMAZON_TAG = import.meta.env.PUBLIC_AMAZON_PARTNER_TAG?.trim() ?? '';

export const affiliationConfiguree = AWIN_ID.length > 0;

if (!affiliationConfiguree) {
  console.warn(
    '\n⚠️  PUBLIC_AWIN_AFFILIATE_ID absent : les liens ManoMano pointeront vers\n' +
      '    le site sans tracking. Aucune commission ne sera attribuée.\n' +
      '    → Vercel > Settings > Environment Variables\n',
  );
}

/**
 * Transforme une URL ManoMano en lien tracké Awin.
 * Si l'ID n'est pas configuré, renvoie l'URL brute (le visiteur arrive bien
 * sur la bonne page, mais la vente n'est pas attribuée).
 */
export function lienManoMano(urlProduit: string): string {
  // Certaines fiches stockent un lien Awin deja pre-tracke (pclick.php), recu
  // tel quel d'un export de candidats produits qui ne fournissait pas d'URL
  // manomano.fr brute. Le re-envelopper dans cread.php ajouterait un second
  // redirect pour rien : on le renvoie tel quel.
  if (urlProduit.startsWith('https://www.awin1.com/')) return urlProduit;
  if (!affiliationConfiguree) return urlProduit;
  const ued = encodeURIComponent(urlProduit);
  return `https://www.awin1.com/cread.php?awinmid=${AWIN_MERCHANT_MANOMANO_FR}&awinaffid=${AWIN_ID}&ued=${ued}`;
}

/** Lien Amazon tracké — utilisé seulement en secours quand ManoMano n'a pas le produit. */
export function lienAmazon(urlProduit: string): string {
  if (!AMAZON_TAG) return urlProduit;
  const sep = urlProduit.includes('?') ? '&' : '?';
  return `${urlProduit}${sep}tag=${encodeURIComponent(AMAZON_TAG)}`;
}

export type Marchand = 'manomano' | 'amazon';

export function lienAffilie(marchand: Marchand, url: string): string {
  return marchand === 'amazon' ? lienAmazon(url) : lienManoMano(url);
}

export const nomMarchand: Record<Marchand, string> = {
  manomano: 'ManoMano',
  amazon: 'Amazon',
};

/**
 * Tranche de budget — encore utilisée pour positionner le curseur sur la
 * jauge visuelle (TrancheBudget), mais plus affichée telle quelle comme
 * texte : voir formaterPrix ci-dessous.
 */
function trancheBudget(prixIndicatif: number): string {
  if (prixIndicatif < 80) return 'moins de 80 €';
  if (prixIndicatif < 150) return '80 – 150 €';
  if (prixIndicatif < 250) return '150 – 250 €';
  if (prixIndicatif < 400) return '250 – 400 €';
  return 'plus de 400 €';
}

/** Les 5 tranches affichées sur la jauge horizontale, dans l'ordre. */
export const BORNES_BUDGET = [80, 150, 250, 400] as const;

/** Position du produit sur la jauge de budget (composant TrancheBudget). */
export function segmentBudget(prixIndicatif: number): { index: number; total: number; label: string } {
  const total = BORNES_BUDGET.length + 1;
  const index = BORNES_BUDGET.findIndex((borne) => prixIndicatif < borne);
  return {
    index: index === -1 ? total - 1 : index,
    total,
    label: trancheBudget(prixIndicatif),
  };
}

/** Formatage brut d'un montant — utilisé pour des bornes déjà réelles (ex. min/max d'une catégorie), pas pour le prix d'un produit isolé. */
export function formaterPrix(prixIndicatif: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prixIndicatif);
}

/** Largeur maximale de la fourchette affichée pour le prix d'un produit. */
const LARGEUR_FOURCHETTE = 50;

/**
 * Fourchette de prix centrée sur le prixIndicatif — décision du 2026-07-29
 * qui remplace l'affichage du prix exact (voir section "Prix" de CLAUDE.md) :
 * le prix vient d'un export CSV marchand figé et peut devenir faux en
 * quelques jours, la fourchette absorbe cette dérive sans jamais dépasser
 * 50 € d'écart.
 */
export function fourchettePrix(prixIndicatif: number): string {
  const demiLargeur = LARGEUR_FOURCHETTE / 2;
  const fmt = (n: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
  const basse = Math.max(0, Math.round(prixIndicatif - demiLargeur));
  const haute = Math.round(prixIndicatif + demiLargeur);
  return `${fmt(basse)} – ${fmt(haute)}`;
}
