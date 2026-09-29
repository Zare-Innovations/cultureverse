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

## Stone and object renders

`brand/stones/` and `brand/objects/` hold the supplied 3D renders at source resolution
(2000px). Like the logos, they are reference material and never ship.

`brand/objects/` are the four that `/iconhonors` now uses; `public/assets/obj-*.webp` are the
trimmed 700px working copies made from them.

`brand/stones/` are mostly **not** in use; the shipping `public/assets/stone-*.webp` are untouched
except for blue. The old blue working copy was cropped at the image edge, so the lower half of the
stone was missing wherever it showed; `stone-blue.webp` is now the trimmed master at 1000px and the
three placements that use it carry its new 1000 x 696 dimensions and a rotation adjusted to match.

### Why the stones were not swapped

They are the same artwork as the current shards, rendered at a different orientation. Each
shipping stone matches the new render rotated:

| Stone | Rotation that matches what ships | Error |
|---|---|---|
| red | 85° | 1.4% |
| orange | -35° | 4.9% |
| blue | -5° | 2.1% |
| purple | -35° | 1.0% |
| obsidian | -15° | 4.1% |

So a straight swap would not refresh the art, it would reorient every shard: the current
diagonal slivers become wide horizontal lozenges across the Cultureverse hub and the event
pages, each of which has hand-tuned width, height and CSS rotation.

There is also no sharpness to gain. The renders are 2000px against the shipping ~900px, but
stones display at roughly 300-400px on the hub and 150px on the event pages, so 900px already
covers a 2x display. This is the opposite of `logo-iconhonors.png`, which was genuinely short.

**Two are missing.** Green and ice were shown but never arrived as files, so
`brand/stones/` holds five of the seven.
