# Cobblestone Homestays · Suite & Grove

Complete static website export from the private preview. All HTML, CSS, JavaScript, fonts, property photos, drone video, brand marks and booking-channel symbols used by the website are included.

## Files

- `index.html` — page structure and English content.
- `style.css` — desktop, tablet and phone styling.
- `app.js` — property picker, full amenities, photo viewer, reviews, nearby places, date selection, booking links and WhatsApp enquiry.
- `i18n.js` — Malayalam translations and language switch.
- `assets/` — locally bundled photos, drone film, icons, booking symbols and fonts.
- `robots.txt` — existing preview indexing preference.
- `CONTENT_SOURCES.md` — content provenance and verification notes.

There is no build step, package installation, API key or backend required. The web files are unchanged from the latest Site source; this export places the original `dist/` contents directly at the repository root. The original 4K media uploads are not part of the website; the optimized media actually used on the page is included.

## Preview locally

From the extracted folder, run:

```sh
python -m http.server 8000
```

Open `http://localhost:8000/`. Use `http://localhost:8000/?lang=ml` for Malayalam. On Windows, `py -m http.server 8000` is an alternative.

## Add to GitHub

Create an empty GitHub repository, extract this ZIP, and run these commands from the folder containing `index.html`:

```sh
git init
git add .
git commit -m "Add Cobblestone Homestays website"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_REPOSITORY_URL` with the URL of your repository. You can also upload the extracted files using GitHub's file-upload interface. Upload the files themselves, rather than the ZIP, so `index.html` appears at the repository root.

This export does not publish a website or change either existing deployment. Keep the repository private while reviewing. The original private-preview labels, robots file and noindex metadata are preserved. Sites' access controls belong to its hosting service; a copy hosted elsewhere needs its own access controls if it must remain private.

## Content and editing

The Suite/Grove amenities, photos, reviews, contact details and channel links are in `app.js` and `index.html`. Add corresponding Malayalam copy in `i18n.js` when editing visible English text. All `assets/` paths are relative, suitable for a repository-root static site or a GitHub project subpath.

Booking availability and final prices are confirmed by the booking channels. This website does not synchronize calendars, collect guest data or submit bookings automatically. Third-party logos identify the corresponding platforms; their rights remain with their owners.

## Export provenance

- Source commit: `dcf55c1080ede5534009e7484bff44c33c76fa7c`
- Exported: 29 October 2026
- Original private preview: https://cobblestone-cottage-private-preview.deepukurian12390.chatgpt.site

Git history, credentials, runtime files and the original Sites project binding are excluded. Every website file is included unchanged. `EXPORT_MANIFEST.json` lists each exported website file and its SHA-256 checksum.
