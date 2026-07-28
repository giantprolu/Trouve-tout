/**
 * Google AdSense — revenu publicitaire d'appoint, en plus de l'affiliation.
 *
 * Variable à définir dans Vercel → Settings → Environment Variables une fois
 * le compte AdSense approuvé :
 *   PUBLIC_GOOGLE_ADSENSE_CLIENT_ID → ton ID éditeur ("ca-pub-XXXXXXXXXXXXXXXX")
 *
 * Sans cette variable, `EncartPub` affiche un emplacement réservé au lieu de
 * charger le script AdSense — jamais un ID inventé dans le code.
 */
const ADSENSE_CLIENT_ID = import.meta.env.PUBLIC_GOOGLE_ADSENSE_CLIENT_ID?.trim() ?? '';

export const publiciteConfiguree = ADSENSE_CLIENT_ID.length > 0;

export const GOOGLE_ADSENSE_CLIENT_ID = ADSENSE_CLIENT_ID;
