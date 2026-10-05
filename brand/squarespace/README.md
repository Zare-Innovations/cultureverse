# CultureBowl 2026 brand kit for shopallthingsculturebowl.com

This folder restyles the Squarespace 7.1 merch store to sit in the same family as the CultureBowl 2026 site: navy ground, red accents and bands, the Golos Text display face, cut-corner buttons and tiles, and the red "Culture is Calling" band. It uses only what Squarespace allows on every plan (Custom CSS and Code blocks). No template change, no developer mode, and Printful keeps working exactly as it does now.

It was written against the store as audited on 5 October 2026 (Squarespace 7.1, two collections, 16 products, Adobe fonts headline-gothic-atf and Epilogue, red `#FC221C` ground). The class names in `custom.css` are the ones the store uses today.

What it will and will not do: the shop gets the site's colours, type, buttons, product tiles, cart and footer. It cannot reuse the main site's own header, stone navigation or animations, because Squarespace cannot run that code. Expect "same family", not a copy.

## What is in the folder

| File | What it is | Where it goes |
| --- | --- | --- |
| `custom.css` | The whole brand as CSS | Website Styles > Custom CSS |
| `hero.html` | A hero banner for the top of the home page | A Code block |
| `calling-band.html` | The red "Culture is Calling" band | A Code block above the footer |
| `header-injection.html` | Font loading, only if the fonts do not appear | Code Injection > Header (Business plan or higher) |
| `logos/culturebowl-white.svg` | White CultureBowl mark, for the header and hero | Upload under Custom CSS > Manage Custom Files |
| `logos/culturebowl-iheart.png` | CultureBowl + iHeartMedia lockup, for the footer | Same upload |
| `logos/moving-culture-forward.png` | Moving Culture Forward lockup, used in the hero | Same upload |
| `bg-red-fragments.webp` | The texture behind the red band and footer | Same upload |

## Install, in order

1. **Upload the assets.** Website > Website Styles (the paintbrush) > Custom CSS > Manage Custom Files. Upload the three logos and the texture. Click each one once after upload: Squarespace inserts its URL into the CSS box. Copy those four URLs somewhere, then delete the inserted lines.
2. **Paste `custom.css`** into the Custom CSS box. In section 9, fill in the texture URL on the commented `background-image` line and remove the `/* */` around it. Save. The store should turn navy with white type straight away.
3. **Fonts.** The CSS loads Golos Text and Cormorant Garamond itself. If they do not appear within a minute, paste `header-injection.html` into Settings > Developer Tools > Code Injection > Header. Either way, the Fonts panel can stay as it is: the CSS overrides headline-gothic-atf and Epilogue.
4. **Header.** Website > Header > Site Title & Logo. Switch from the text title to a logo and upload `logos/culturebowl-white.svg`. Set the logo height to about 44px on desktop and 36px on mobile. This also fixes the phone header, where the text title currently wraps onto four lines and makes the header about 340px tall. Keep the cart icon on. Leave the Donate button off.
5. **Section colours.** Website Styles > Colors. Set the palette to Black `#111821`, White `#FFFFFF`, Accent `#F6003A`, Dark accent `#0F2655`, Light accent `#FFC23C`. Then edit the "Bright" theme (the product pages and the Apparel grid use it) so its background is Black from the palette. The CSS forces navy anyway, so this step just stops a red flash while pages load.
6. **Home page.** Open the home page. Add a section at the top with a Code block, paste `hero.html`, swap the two placeholder image URLs for the uploaded white mark and the Moving Culture Forward lockup, and give the section no top or bottom padding. Keep the scrolling "SHOP ALL THINGS CULTURE BOWL" strip below it: the CSS turns it into a red band with white type. Optional: below the strip, add a Summary block or a featured Products section showing four items, with a Heading 4 reading "New in" and a Heading 2 reading "The drop". Remove the old logo-and-circle section, since the hero replaces it.
7. **The band.** On the home page and on the Apparel page, above the footer, add a section with a Code block, paste `calling-band.html`, and fill in the texture URL.
8. **Footer.** The footer is empty today. Add one section with an Image block holding `logos/culturebowl-iheart.png` at about 40px tall, a row of text links (All Things CultureBowl, Tap in, Shipping and returns, Contact), and a copyright line. The CSS turns the whole footer red with the texture behind it.
9. **Check a product page and the cart.** Everything is styled. The product descriptions currently render in bold because of the old theme; the CSS sets them back to regular weight. If a description still looks off, open it, select the text and clear formatting.

## Product data worth tidying while you are in there

These came out of the audit and are quick fixes in the Squarespace product editor:

- Two products share the name "3D Puff Embroidered-White Cuffed Beanie". Give the second one its own name.
- The colour in each name is the thread colour, not the garment colour. Consider "Champion Crewneck, red logo" style names. Shorter names also look much better in the grid and on phones.
- Names mix "Embroidery" and "Embroidered". Pick one.
- The White Crop Hoodie's address is just `/crop-hoodie`. Set its URL slug to match the others.
- The beanie colour dropdown has no "Select Color" prompt. Add one in the variant settings so the first colour is not chosen by accident.
- The new long-sleeve shirt's image had not loaded at the time of the audit. Check it.

## If something does not take

- Squarespace changes class names now and then. If a part ignores the CSS, right-click it in a browser, choose Inspect, and send the class names back to us. It is a one-line fix.
- A rule that will not apply: add `!important` to it. Squarespace's own styles are heavy.

## Keeping it in step with the main site

The colours and fonts at the top of `custom.css` are the same tokens the main site uses. If the brand changes there, change the `:root` values here and the shop follows.
