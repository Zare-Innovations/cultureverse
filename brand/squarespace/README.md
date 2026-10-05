# CultureBowl 2026 brand kit for the Squarespace shop

This folder restyles a Squarespace 7.1 store to match the CultureBowl 2026 site: navy ground, red accents, the Golos Text display face, cut-corner buttons, and the red "Culture is Calling" band. It uses only what Squarespace allows on every plan (Custom CSS and Code blocks), so no developer mode and no template change are needed.

What it will and will not do: the shop will share the site's colours, type, buttons, product tiles and footer. It will not reuse the main site's header, stone navigation or animations, because Squarespace cannot run that code. Expect "same family", not a copy.

## What is in the folder

| File | What it is | Where it goes |
| --- | --- | --- |
| `custom.css` | The whole brand as CSS, written against Squarespace's own class names | Website Styles > Custom CSS |
| `hero.html` | A hero banner for the top of the Shop page | A Code block |
| `calling-band.html` | The red "Culture is Calling" band | A Code block above the footer |
| `header-injection.html` | Font loading, only if the fonts do not appear | Code Injection > Header (Business plan or higher) |
| `logos/` | White CultureBowl mark, CultureBowl + iHeart lockup, Moving Culture Forward lockup | Upload under Custom CSS > Manage Custom Files |
| `bg-red-fragments.webp` | The texture behind the red band and footer | Same upload |

## Install, in order

1. **Site-wide settings first** (Website > Website Styles, the paintbrush).
   - Colors: set the palette to Black `#111821`, White `#FFFFFF`, Accent `#F6003A`. Choose a dark theme for all sections.
   - Fonts: Headings "Golos Text" (it is in Squarespace's Google Fonts list), weight 900, uppercase on. Paragraphs "Helvetica Neue" or "Helvetica". Buttons "Golos Text" 800, uppercase.
   - Buttons: shape Square, size Large. The CSS cuts the corners.
   - Spacing: section padding Medium. The CSS does not change layout, only looks.
2. **Upload the assets.** Website Styles > Custom CSS > Manage Custom Files. Upload the three logos and the texture. Click each one once after upload: Squarespace inserts its URL into the CSS box. Copy those URLs somewhere, then delete the inserted lines.
3. **Paste `custom.css`** into the Custom CSS box. Fill in the texture URL in section 8 (the commented `background-image` line). Save.
4. **Header.** Website > Header > Site Title & Logo: upload `logos/culturebowl-white.svg` as the logo, height about 44px. Turn on the cart icon. Optional: Announcement Bar on, text "Official CultureBowl 2026 merch", which the CSS turns into the red strip.
5. **Shop page hero.** Open the Shop page, add a section at the top, add a Code block, paste `hero.html`, swap the two placeholder image URLs for the uploaded logo URLs. Give the section no padding.
6. **The band.** Above the footer on the Shop page (and the home page if there is one), add a section with a Code block, paste `calling-band.html`, fill in the texture URL.
7. **Footer.** Keep Squarespace's footer. The CSS turns it red with the texture. Put the CultureBowl + iHeart lockup in it as an image block, and the usual links as text.
8. **Check a product page and the cart.** Everything is styled, but Printful product descriptions sometimes carry their own inline formatting. If one looks off, open it, select the text, and clear formatting.

## If something does not take

- Squarespace changes class names now and then. If a part ignores the CSS, right-click it in a browser, choose Inspect, and send the class names back to us. It is a one-line fix.
- Fonts not showing: paste `header-injection.html` into Code Injection > Header, or pick Golos Text directly in the Fonts panel as in step 1.
- A rule that will not apply: add `!important` to it. Squarespace's own styles are heavy.

## Keeping it in step with the main site

The colours and fonts at the top of `custom.css` are the same tokens the main site uses. If the brand changes there, change the `:root` values here and the shop follows.
