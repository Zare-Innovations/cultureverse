# CultureBowl 2026 brand kit for shopallthingsculturebowl.com

This folder restyles the Squarespace 7.1 merch store to sit in the same family as the CultureBowl 2026 site: navy ground, red accents and bands, the Golos Text display face, cut-corner buttons and white product tiles, and the red "Culture is Calling" band. It uses only what Squarespace allows on every plan (Custom CSS and Code blocks). No template change, no developer mode, and Printful keeps working exactly as it does now.

It was written against the store as it is on 7 October 2026: Squarespace 7.1, three collections in the header (MERCH, APPAREL, HATS), the Merch page with its "Shop the Collection" intro and "Have Questions?" form, the filter bar above each grid, Adobe fonts headline-gothic-atf and Epilogue, red `#FC221C` ground. The class names in `custom.css` are the ones the store uses today.

What it will and will not do: the shop gets the site's colours, type, buttons, product tiles, filter bar, forms, cart and footer. It cannot reuse the main site's own header, stone navigation or animations, because Squarespace cannot run that code. Expect "same family", not a copy. A mock of the result is at https://claude.ai/artifact/DWsmw2YDJrzQxSftKmR4xQ (Merch, Apparel, Hats, a product and the cart).

## What is in the folder

| File | What it is | Where it goes |
| --- | --- | --- |
| `custom.css` | The whole brand as CSS | Website Styles > Custom CSS |
| `hero.html` | A hero banner for the top of the home page | A Code block |
| `calling-band.html` | The red "Culture is Calling" band | A Code block above the footer |
| `header-injection.html` | Loads the two fonts. Required. | Settings > Developer Tools > Code Injection > Header |
| `logos/culturebowl-white.svg` | White CultureBowl mark, for the header, hero and home page | Upload under Custom CSS > Manage Custom Files |
| `logos/culturebowl-iheart.png` | CultureBowl + iHeartMedia lockup, for the footer | Same upload |
| `logos/moving-culture-forward.png` | Moving Culture Forward lockup, used in the hero | Same upload |
| `bg-red-fragments.webp` | The texture behind the red band and footer | Same upload |

## Part 1: the whole store at once (about 20 minutes)

1. **Upload the assets.** Website > Website Styles (the paintbrush) > Custom CSS > Manage Custom Files. Upload the three logos and the texture. Click each one once after upload: Squarespace inserts its URL into the CSS box. Copy those four URLs into a note, then delete the inserted lines so the box is empty again.
2. **Fonts first.** Settings > Developer Tools > Code Injection. Paste the whole of `header-injection.html` into the Header box and save. This loads Golos Text and Cormorant Garamond. Every Commerce plan includes Code Injection. The Fonts panel can stay as it is: the CSS overrides headline-gothic-atf and Epilogue.
3. **Paste `custom.css`** into the Custom CSS box, replacing anything already there. In section 9, find the commented `background-image` line, paste the texture URL between the quotes and remove the `/*` and `*/`. Save. Every page turns navy with white type straight away: the header, all three grids, the filter bar, product pages, the contact form and the cart. If the page does not change at all after saving, see "If nothing changes" at the end.
4. **Header.** Edit any page, click the header, then Site Title & Logo. Switch from the text title to a logo and upload `logos/culturebowl-white.svg`. Set the logo height to about 44 on desktop and 36 on mobile. Keep the cart icon on. Then open the header's Style tab, choose Solid, and set its colour to Black from the palette (step 5). The CSS makes the header navy anyway; this stops a red flash while the page loads. The three collection links (Merch, Apparel, Hats) stay as they are; the CSS styles them.
5. **Colours.** Website Styles > Colors. Set the palette to Black `#111821`, White `#FFFFFF`, Accent `#F6003A`, Dark accent `#0F2655`, Light accent `#FFC23C`. Then edit the themes named Bright, Light and White so each one's background is Black from the palette. The CSS forces navy anyway; this only stops a red or white flash while pages load.

## Part 2: page by page (about 40 minutes)

### Merch page (/merch)

The page already has the right shape: an intro, the grid, a contact section. Nothing to rebuild.

6. The "Shop the Collection" intro keeps its heading and line. If you want it shorter, a Heading 4 above it reading "New in" becomes the small red label the main site uses.
7. The grid, the Filter button and the result count are styled by the CSS. Nothing to do.
8. The "Have Questions?" section: the form fields, labels and Send button are styled. The circle shape next to the form turns red with white text; give it a short line such as "Printed to order by Printful" or delete it.
9. Above the footer, add a section with a Code block, paste `calling-band.html`, and replace the texture placeholder with the texture URL from your note. Open the section's settings and set its top and bottom padding to zero, so the band runs edge to edge with no gap.

### Apparel page (/apparel)

10. The scrolling "SHOP ALL THINGS CULTURE BOWL" strip at the top becomes a red band with white type. Keep it.
11. The grid and filter bar are styled. Nothing to do.
12. The black "VISUAL SMILES" strip at the bottom also turns red, because the CSS treats every scrolling strip the same. Keep it if it is a credit you want, or delete the section.
13. Add the `calling-band.html` Code block above the footer, as on the Merch page.

### Hats page (/hats)

14. The "HATS" heading section at the top is styled. Nothing to do. Add the `calling-band.html` Code block above the footer if you want the band on every page.

### Home page (/)

15. The page has a black CultureBowl logo image and a red "SHOP" circle. The CSS flips the black logo to white so it does not vanish on navy, and turns the circle red with white text. That already works. For the full look, replace this section with the hero:
16. Add a new section at the very top with a Code block, paste `hero.html`, and replace the two placeholder image URLs with the white mark and the Moving Culture Forward lockup from your note. Open the section's settings and set its top and bottom padding to zero, and set the Code block to full width if the editor offers it. Then delete the old logo-and-circle section.
17. Keep the scrolling "SHOP ALL THINGS CULTURE BOWL" strip below it: it becomes the red band.
18. Optional: below the strip, add a Products section showing four items, with a Heading 4 reading "New in" and a Heading 2 reading "The drop".
19. Add the `calling-band.html` Code block above the footer.

### Footer (every page)

20. The footer is empty today. Edit the footer and add one section with an Image block holding `logos/culturebowl-iheart.png` at about 40px tall, a row of text links (All Things CultureBowl pointing to the main site, Tap in, Shipping and returns, Contact), and a copyright line. The CSS turns the whole footer red with the texture behind it.

### Product photos and the hover

21. Nothing to switch on: Squarespace's crossfade to each product's second photo keeps working, and the CSS only makes it quicker. Because the second photo is the one that shows on hover, order each product's photos on purpose: a flat shot first, the worn or alternate shot second. The three Merch items are already in a good order (front, then back or side). Two hats need attention: the White Bucket Hat has no second photo, and the Black Snapback's second photo is the same mockup as the first.

### Check it over

22. Open a product page from each collection, add something to the cart, and open the cart. Everything is styled. If a product description shows in bold, open it, select the text and clear formatting.
23. Check the site on a phone.

## Product data worth tidying while you are in there

- The Merch and Hats pages are both titled "Store 2" in the browser tab and in Google. Open each page's settings and set the title to Merch and Hats.
- Two products share the name "3D Puff Embroidered-White Cuffed Beanie". Give the second one its own name.
- The colour in each name is the thread colour, not the garment colour. Consider "Champion Crewneck, red logo" style names. Shorter names also look much better in the grid and on phones.
- Names mix "Embroidery" and "Embroidered". Pick one.
- The White Crop Hoodie's address is just `/crop-hoodie`. Set its URL slug to match the others.
- The beanie colour dropdown has no "Select Color" prompt. Add one in the variant settings so the first colour is not chosen by accident.

## If nothing changes

Squarespace compiles the Custom CSS box with an old version of LESS, and if it cannot compile the file it silently drops the whole thing: the store looks exactly as before, the header stays red, and the hero and band (which carry their own styles) are the only parts that look right. The file in this kit is written for that compiler and has been checked against it. If it ever happens:

- Open the Custom CSS panel. Squarespace underlines the line it cannot read in red. Send us a screenshot of it.
- Make sure the whole file was pasted, from the first comment to the last line, and that nothing was left in the box from before.
- Do not edit the parts wrapped in `~"..."`. Those are what keep the compiler happy.

## If something does not take

- Wait a minute and hard refresh. Squarespace caches styles.
- Squarespace changes class names now and then. If a part ignores the CSS, right-click it in a browser, choose Inspect, and send the class names back to us. It is a one-line fix.
- A rule that will not apply: add `!important` to it. Squarespace's own styles are heavy.
- To undo everything: empty the Custom CSS box and save. The store goes back to how it was. Checkout, orders and Printful are never touched by any of this.

## Keeping it in step with the main site

The colours and fonts at the top of `custom.css` are the same tokens the main site uses. If the brand changes there, change the `:root` values here and the shop follows.
