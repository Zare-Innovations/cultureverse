# CultureBowl 2026 launch site: build handoff

Design canvas for allthingsculturebowl.com, redesigned for the CultureBowl 2026 launch (October 21 to 25, 2026, first home Atlanta). This file is written for whoever builds the site from these artboards, including Claude Code.

## 1. What is in this folder

Every `*.dc.html` file is one artboard. Files are numbered in reading order and the number is the page order of the site. `-D` is the 1440 px desktop layout, `-M` is the 390 px mobile layout. `Main.dc.html` is the desktop Home page (it keeps that name because the canvas requires it).

| # | Route on the site | Desktop file | Mobile file |
|---|---|---|---|
| 00 | global nav (component, three states) | `00-Nav-States-D.dc.html` | menu open: `01-Home-Menu-M.dc.html` |
| 01 | `/` Home | `Main.dc.html` | `01-Home-M.dc.html` |
| 02 | `/` Home, state after the headliner is announced | `02-Home-Announced-D.dc.html` | reuse mobile Home with the headliner block |
| 03 | `/about` | `03-About-D.dc.html` | `03-About-M.dc.html` |
| 04 | `/cultureverse` (About the CultureVerse™) | `04-Cultureverse-D.dc.html` | `04-Cultureverse-M.dc.html` |
| 05 | `/culturelive` | `05-CultureLive-D.dc.html` | `05-CultureLive-M.dc.html` |
| 06 | `/cultureexpo` | `06-CultureExpo-D.dc.html` | `06-CultureExpo-M.dc.html` |
| 07 | `/exchnge` (The Culture EXCHNGE™, FORWRD Summit) | `07-EXCHNGE-D.dc.html` | `07-EXCHNGE-M.dc.html` |
| 08 | `/biggive` | `08-BigGive-D.dc.html` | `08-BigGive-M.dc.html` |
| 09 | `/iconhonors` (The Culture's Coldest™ ICON HONORS) | `09-IconHonors-D.dc.html` | `09-IconHonors-M.dc.html` |
| 10 | `/cultureunion`, `/culturecoming`, `/culturegames` (one template, three worlds) | `10-ComingWorlds-D.dc.html` | `10-ComingWorlds-M.dc.html` |
| 11 | `/tap-in` signup (also embedded at the bottom of Home and the Cultureverse page) | `11-StayTappedIn-D.dc.html` | `11-StayTappedIn-M.dc.html` |
| 12 | global footer | `12-Footer-D.dc.html` | `12-Footer-M.dc.html` |
| 13 | style guide and tokens (reference only, not a page) | `13-StyleGuide-D.dc.html` | |

Shop and Cart stay on Squarespace commerce; the nav's Shop link points at `https://www.allthingsculturebowl.com/shop`.

Suggested page assembly, top to bottom: nav (00), page body, signup band (11) on Home and Cultureverse only, footer (12).

## 2. How to read an artboard file

Each file is a self-contained HTML page:

- `<x-dc>` holds the markup. Inline `style=""` is the intended CSS for that element (values are final, in px).
- `<helmet>` holds the Google Fonts link and page-level CSS. Copy it into the page `<head>`.
- The `<script type="text/x-dc" data-dc-script>` block is a small component: `renderVals()` returns the data the markup reads through `{{holes}}`, `<sc-for list="{{items}}" as="p">` is a loop and `<sc-if value="{{flag}}">` is a conditional. Rebuild these as your templating of choice (React, Astro, plain HTML). All copy and data lives either in the markup or in `renderVals()`.
- `data-props` on the script declares editor tweaks (for example the headliner name and accent color). Treat them as constants.
- Ignore `<script src="./support.js">` and every `hint-*` attribute; they belong to the design tool.
- Countdown targets: opening night is `Date.UTC(2026, 9, 21, 4, 0, 0)` (Wed Oct 21, 2026, 12:00 am Eastern). The announced hero counts to `Date.UTC(2026, 9, 24, 22, 0, 0)`.

## 3. Tokens, fonts, shared CSS

The shared stylesheet is `/_blob/9ed66465fe1eff63ab13591f3a46dbfc` (`cb2.css`). It defines the tokens and the classes every board uses (`.d`, `.d8`, `.hud`, `.btn` and variants, `.st` status tags, `.field`, `.lbl`, `.door`, `.bgimg`, the load animations `a-assemble`, `a-lock`, `a-wipe`, `a-field`, `a-in`). Ship it as the global stylesheet.

- Colors: red `#F6003A`, navy `#111821` (the dark everywhere, no true black), navy-2 `#0F2655`, grey `#3E404B`, teal `#0F8A80`. ICON HONORS register `#081425`, `#014170`, `#076091`, `#527F9B`, accent `#17A2BE`. CultureLive `#FF6F00`, `#FC05A5`, `#3971FF`. Big Give lime `#D7F26A` on green `#03301B`.
- Display type: Golos Text 900, tracked -0.045em (Google Fonts, already linked). Body: `'Helvetica Neue', Helvetica, Arial, sans-serif` as a system stack until a web license is confirmed (the workstation .ttc cannot be embedded). Honors serif: Cormorant Garamond stands in for Bangla MN, which has no web license.
- Corners: no radius. 45 degree cuts (16 px on buttons, 28 to 36 px on panels) via `clip-path`.
- Motion: one page-load sequence (field rises, band wipes, stones assemble, logo locks, support fades, 0 to 1900 ms). Hover is color swap only, 160 ms. Respect `prefers-reduced-motion` (no sequence, no parallax).

## 4. Assets

Every image is referenced as `/_blob/<id>`. Download each once, save it under `assets/` with the name below, and rewrite the references. All files came from the Squarespace export (`content/assets/`), the PMM brand guide backgrounds, or Miles's isolated crystal renders, except where noted.

Logos (PNG unless noted)

| id | file |
|---|---|
| 76d22058a88e6e5f41cbe52c5bb5e543 | logo-culturebowl-white.svg |
| 7845a16e55d87fb9d130c22fc9af1023 | logo-culturebowl-navy.svg |
| 2783edd5e7e896375d89d7379724062b | logo-culturebowl.png |
| 9a42192f3ec51cd970c01e7f3a1ac1a4 | logo-cultureverse.png |
| 0b7f6e74a55488f1e22dc2b7ff6b4319 | logo-culturelive.png |
| 916f483d28726a07c8bffe2e092662d7 | logo-cultureexpo.png |
| 772be908cd0291404b22cc4c99b1f90a | logo-culturegames.png |
| 819160bbb659c79086900b6edee938f2 | logo-cultureunion.png |
| 503fe8660e60215d67af125cdb0d7ad8 | logo-culturecoming.png |
| d2288ee26c740b9e8039b24a831efc29 | logo-iconhonors.png |
| f95708e031fa751ec3a759fb44235813 | logo-iconhonors-mcf.png |
| 9bf957ca104ea07b6edd57781d84cda9 | logo-exchnge.png |
| f48ea4fd88a7c8a279baaf69fbea91b1 | logo-biggive.png |
| 65f5861911d5502f0525e671a51075a6 | logo-moving-culture-forward.png |
| 3e3ad3c8d221113883636b20fd6ce39d | logo-powered-by-iheart.png |
| 4cb3fc532f9af73b04fb3cd702b9f23a | button-back-to-cultureverse.png |

Stones and objects (WebP, transparent)

| id | file | used for |
|---|---|---|
| 1cb1931fdcafd28a90b62a73b8a6cefc | stone-obsidian.webp | CultureLive |
| 46eda99cbd8a9ff94fd909f5a8f73642 | stone-ice.webp | ICON HONORS |
| 32eccddc0fb8f1144c1ca5adb7183926 | stone-blue.webp | CultureExpo |
| ae09e74250564c3529a57fbd5e4c43bd | stone-green.webp | Big Give (source file is named The_Cultures_Coldest.png; confirm with Miles) |
| 9fc730e5ffca9af7036afd5bb6411850 | stone-red.webp | CultuReunion |
| c46f6f0d2ed6d1f2da05ed15e417380c | stone-orange.webp | CultureComing |
| 7d15a2dcb1184f382b2e91437af6ceb0 | stone-purple.webp | CultureGames |
| d3ef7486d8fcad64541f2540034c0dfc | obj-satellite.webp | EXCHNGE (no stone exists yet) |
| 5afd1f7265aba69cf902026d55751c48 | obj-globe.webp | Cultureverse page |

Backgrounds (WebP)

| id | file |
|---|---|
| cb1c4094fa2c9781d9e3357b1ba652fc | bg-navy-graffiti.webp |
| 54809217df8420883022bf5ffbbd591e | bg-navy-fragments.webp |
| 4e83a0894aac4c6c6f2b568c21e8cbf5 | bg-red-fragments.webp |
| b302f07dc62d97bf82eb8800bbfac093 | bg-red-navy.webp |
| 7b3df0ca0871dbd2709f62e1d7e09f38 | bg-red-satin.webp |
| 58e709bb3b49ca4ac02166c269d3691c | bg-crowd-red.webp |
| 16e2c0616cc1b78fde9a0c13a804154e | bg-home.webp |
| e99907e8a4343105f8316d7360c9bbc7 | bg-honors.webp |
| fe8452ce8ca951423b052bb2810c21cc | bg-exchnge.webp |
| 77af528010a281d7cd2094bd5849e732 | bg-biggive.webp |
| d18fe2f586c49a409756ae13da0ff958 | bg-cultureverse.webp |
| 18406d52edb2e22d1a7eb390ee951610 | bg-about.webp |
| d4c681489b4ee5e5fbcb62b26d9f0158 | bg-expo.webp |
| 7da6f1eebb2a47e7698435086155689f | bg-cultureunion.webp |
| 328ee65f73731c49fb295b23fe2ccfdb | bg-culturecoming.webp |
| c42a1ffa2d0f4db04cb4b804ed8b473b | bg-culturegames.webp |
| 62e72ad217ff3df98a296f6b867a0f45 | bg-culturelive.webp |

Photos and renders (WebP)

| id | file |
|---|---|
| 72e800429b887ecadc629940c727b3d6 | render-honors-gala.webp |
| b272a0b2afb2b029913540725c39d122 | render-starjourney-stage.jpg |
| 0b1e47df5301f3800790834769f6c738 | render-expo-entrance.webp |
| d83c7e64b10bdc4906ed5da6d3118c6e | render-expo.webp |
| fef3828d53dba88d013505df918232ef | keyart-biggive-billboard.webp |
| bb2ac30052912d81c5ac376812e1fb33 | render-culturegames.webp |
| 2e30166e1d2873c265d1c801b9125be9 | photo-live-1.webp |
| 547b5fe37637028460dd781430538432 | photo-live-2.webp |
| b70b5dcbc0cd3cfb931b99a6b736d65a | photo-expo-1.webp |
| 3aa3ee7754001996236a6fd8124c5796 | photo-expo-2.webp |
| a556b28af04e0863f85aad815c16cccc | photo-about-1.webp |
| ef5b9e204f9de4bf8e9d4ca05a696949 | photo-about-2.webp |
| a66af0fb620a493a4599dddcc1dffe39 | photo-exchnge.webp |
| 0c0248356e642f5efd4bb8e00c2ae858 | cardi-b-cutout.png (placeholder, low resolution, replace with the press photo) |

Partner logos (PNG): Amazon 362948a9e829d3d457209fa2c65687c2, Visa cc96bc6cc2245af7e81b8e5b8ffe71a1, Bentley Atlanta 40a432e71d323f9db017f0c2d35e2db9, Allstate 84769312bbfefc435ae2d736ad5d6c10, McDonald's 8c808d80b64f94485abb70e265892778, Fifth Third 05246fb8c56c5b77590a56227b7cb48b, Comerica 02c5e0b9c675723b391f928e281cc2de, Black Enterprise 489f2d7df4825e3977f88129507f80ca, iHeartMedia 29567957058cf3185f11a28afbd6b1ff, BIN fa4a7a934b34083652e429509b6d52d2, Office of the Mayor 2a233915d4ace72005684a025076ea6b, Atlanta Housing b4720ced5a0e1e7c1414c778a285a4c2, Goodr 765fb9a5256fae17d8deeb0f813b677d.

## 5. Copy rules

All headings and body copy are the live site's approved text (export dated September 18, 2026), including its punctuation and trademark marks. Two site typos were corrected on purpose: "TALENT ANNOUCEMENT" is spelled "Talent announcement", and the zero-width characters inside "CULTURE'S COLDEST" were stripped. Dates, venues, and status lines (Flourish, RETREAT by The Gathering Spot, Central Park Atlanta, StarJourney Stage, ticketed / by invitation / request to attend) come from the client brief and meeting notes, not the site; confirm before launch.

## 6. Placeholders to fill before launch

Search the files for square brackets.

- `[CULTUREBOWL EVENT URL]` in every ticket link: `https://www.ticketmaster.com/...`. All ticket buttons open Ticketmaster in a new tab.
- `[ARTIST NAMES PENDING CONFIRMATION]`: the headliner and supporting acts (Cardi B, Lil Wayne, 2 Chainz) are confidential placeholders. Do not publish them without written confirmation.
- `[TAYLOR TOWNSEND]`, `[TERMS]`, `[PRIVACY POLICY]`, `[LEGAL ENTITY]`, `[SQUARESPACE FORM DESTINATION]`, `[CONFIRM WITH MILES: FORWRD ...]`.
- Social links in the footer (Instagram, Twitter, Facebook) have no URLs yet.

## 7. Forms

Three forms: Stay tapped in (first name, last name, email, all required, button "Tap In"), EXCHNGE request to attend (name, email, company or project), Big Give signup (first name, last name, email, coming as). Each has an inline success state in its artboard. Point them at the same destination the current Squarespace forms use (see question list).

## 8. Accessibility and behavior notes

Every control is a real `<button>`, `<a href>` or `<input>` with a `<label>`. Icon-only buttons carry `aria-label`. Text contrast: white on `#F6003A` is 4.0:1, so white on red is used at display sizes only and body text on red is navy. Touch targets are 44 px minimum. The mobile ticket bar is fixed to the bottom of the viewport. The hero countdown ticks every second.
