<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Universe config and demo data live in `src/lib/universes.ts`; category pages are one dynamic route `univers.$slug.tsx` driven by that config, so adding a universe is a data change.
- Per-universe accent color comes from `data-u` attribute mapping `--uni` in styles.css; components use `*-uni` utilities.
- All listings are fictional demo data and must stay labelled as such until real sources are connected.
