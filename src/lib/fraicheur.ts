import { execSync } from 'node:child_process';

// process.cwd() plutot qu'import.meta.url : Astro reecrit import.meta.url
// vers l'emplacement du bundle de sortie (dist/server/...) au build, pas
// vers le fichier source — inutilisable pour retrouver data.ts. cwd reste
// la racine du repo, que ce soit en dev, en `astro build` local ou sur
// Vercel (le build tourne depuis la racine du projet).
const DATA_FILE_RELATIF = 'src/lib/data.ts';

let cache: string | undefined | null = null;

/**
 * Date (YYYY-MM-DD) du dernier commit git ayant modifie data.ts — jamais une
 * date inventee (voir la regle d'honnetete du contenu dans CLAUDE.md). Sert
 * de dateModified aux guides : ce n'est pas la date de modif du guide
 * precis, mais celle du fichier qui le contient, donc toujours vraie et
 * jamais anterieure a la derniere modification reelle.
 * undefined si l'historique git est indisponible au moment du build.
 */
export function dateDerniereModifDonnees(): string | undefined {
  if (cache !== null) return cache ?? undefined;
  try {
    const sortie = execSync(`git log -1 --format=%cs -- "${DATA_FILE_RELATIF}"`, {
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    cache = sortie || undefined;
  } catch {
    cache = undefined;
  }
  return cache ?? undefined;
}
