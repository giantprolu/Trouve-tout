/**
 * Les photos produit sont servies via le proxy images2.productserve.com
 * (voir data.ts). Sa signature `k` ne dépend que de l'image source et du
 * feedId, pas de la taille demandée (vérifié sur l'export CSV : `k` est
 * identique pour une même photo quels que soient w/h). On peut donc
 * redemander n'importe quelle taille carrée à partir de l'URL stockée,
 * plutôt que de charger systématiquement le même fichier 600x600 —
 * plus léger sur mobile, plus net sur une grande fiche produit.
 */
export function imageTaille(url: string, taille: number): string {
  if (!url.startsWith('https://images2.productserve.com/')) return url;
  return url.replace(/([?&])w=\d+&h=\d+/, `$1w=${taille}&h=${taille}`);
}
