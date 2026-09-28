# Brand logo masters

The supplied logo pack, at source resolution (3,400 to 10,400px wide). Reference material:
nothing here ships. The build only exports `public/`, so these files never reach the site.

Filenames are normalised from the archive, which encoded the trademark marks and left trailing
dots. `brand/logos/culturebowl.png` is `General Logo [CultureBowl™]..png`, and so on.

## What ships instead

`public/assets/logo-*.png` are the working copies the pages actually reference, at 1000 to 1400px.
They are **not** regenerated from these masters, and should not be without reading the rest of
this file first.

Regenerating every working copy from these masters at their current dimensions was measured and
reverted. It moved 16 of the artboard comparisons in `scripts/compare.js` the wrong way and none
the right way, worst cases `cv-band-m` 0.51% to 1.03% and `tapin-m` 0.42% to 0.93%. The reason is
that the artboards in `design/` were built from the working copies, so any resampling difference
is drift from the approved reference, and re-rendering at the same dimensions adds no resolution.

A master is only worth reaching for when the working copy needs to get **bigger**.

## Three places the masters and the working copies disagree

| Working copy | Master | Difference |
|---|---|---|
| `logo-iconhonors.png` | `iconhonors.png` | Same lockup, different proportions: 6.94 vs 5.63 aspect, 18.9% apart even after trimming transparent padding. The master sets the two lines further apart. |
| `logo-iconhonors-mcf.png` | none | Aspect 8.93 matches neither `coldest.png` (15.78) nor `coldest-stacked.png` (4.39). No master in the pack corresponds to it. |
| `logo-biggive.png`, `logo-exchnge.png` | `biggive.png`, `exchnge.png` | The masters are the monochrome "General Logo" versions. The site uses coloured artwork: BIG GIVE in lime, EXCHNGE with its blue wordmark. Swapping them drops the colour. |

## The one resolution gap on the site

`logo-iconhonors.png` is 1000px wide and renders 900 CSS px on `/iconhonors`, so it needs 1800px
to be sharp on a 2x display. It is the only logo on the site that is genuinely under-resolved;
every other one renders at 520 CSS px or less.

Fixing it means taking the master's proportions, which changes the spacing of the mark on the page
and pulls `iconhonors-d` (currently 0.00%) away from its artboard. That is a design decision, not
a mechanical swap, which is why it has not been done.

## Marks with no home yet

`star.png`, `forwrd.png`, `coldest.png`, `coldest-stacked.png` and `coldest-creators.png` have
working copies in `public/assets/` but no page references them. `forwrd.png` is worth noting
against the open question in `PLACEHOLDERS.md` about whether FORWRD and The Culture EXCHNGE are
one event or two.
