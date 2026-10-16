# A-One Taxi Services — UI Redesign (preview)

Three-page source-based revamp of https://aonetaxiservices.ca/.

## Scope
- Home, About Us, Contact Us (same three pages as original)
- Original booking fields preserved: name, phone, email, passenger count, start and end destination, pickup date/time
- Original FAQ, rates, phone, email, address and service areas preserved
- The original business name is shown as plain text, **not a new logo**. Original logo image retrieval was blocked. Replace the plain text with client-supplied logo file when received.
- UI direction: dark neutral, warm taxi yellow, white surfaces. The exact logo colour palette could not be verified via source fetch.

## Booking delivery: action required before publication
The original WordPress booking plugin's server configuration and webhook were not available. This preview *does not submit reservations directly to the business*.
The form validates all original fields, prepares an email draft to A1taxiymm@gmail.com and requires the visitor to click Send in their own email app. The interface explicitly says the ride is not confirmed until dispatch responds. Before going live for actual customers, provide the original booking backend endpoint or approved email-sending provider + verified credentials, then complete end-to-end dispatch delivery testing. Don't silently assume any form submission is received.

## Photography
The visual sources are remote Unsplash illustrations, **not photos of A-One's fleet**. Replace with approved vehicle photography if available.
- Homepage taxi image: https://unsplash.com/photos/panning-photography-of-tax-between-buildings-I5yMF33r3s8 (remote assets hosted at images.unsplash.com)
- Driver image: https://images.unsplash.com/photo-1449965408869-eaa3f722e40d
- Night taxi image: https://images.unsplash.com/photo-1665399320937-3b86ffd17ab1
Image loading requires the user's Internet connection and working third-party image hosting. Not bundled locally because this environment cannot download their binaries.

## Brand and factual fidelity
- Source homepage advertises "over 10 years" and company overview says "over 21 years". Homepage copy uses "10+" from source, avoids unverified stronger claim.
- Source lists Timberlia; preserved spelling exactly, verify with client whether this means Timberlea.
- Flat rates are as displayed on homepage in CAD and require dispatch confirmation; no fabricated dynamic quote/calculator.
- The address used is 138-400 Silin Forest Rd, T9H3S5 from the company's contact page. Directory lists an alternate abbreviated postal format; client should confirm.
- Marketing site is intentionally noindex until client signs off.
- Previews do not replace the existing live domain.

## Local run
From this directory: `python3 -m http.server 8000` and open http://localhost:8000.

## Deploy
Push to a new GitHub repository (do not overwrite the client's existing source) and import it into Vercel. Verify mobile views at 320, 375, 390, 768, 1024 and 1440px and fully test mail handler and imagery.
