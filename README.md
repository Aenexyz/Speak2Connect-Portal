# Speak2Connect Portal

An agency portal for Speak2Connect: freelancer profiles and availability, daily timesheets, and weekly payslips, with an admin view for HR.

Live version: https://claude.ai/artifact/BPGbvoA8oDKDyHGJUeJC2E (admin sign-in: add `#admin` to the end of the link)

## Features

**Sign-in**
- The first screen is the freelancer sign-in: email and password. New freelancers click "Create an account" (name, email, password). An account with no password yet (e.g. created before passwords existed) takes the first password entered as its own.
- HR and company admins sign in with a username and password, either through the admin link (`#admin`) or with the "Switch to admin view" button. Credentials are given to admins separately.
- Test freelancer accounts: `test@test.com`, `test2@test.com`, `test3@test.com`, all with password `test1234`. They have one-click buttons on the sign-in page and a "Test" badge in the admin view.
- Freelancers can change their password from the Profile tab. Admins can see each freelancer's email and password in their profile (Show / Copy), and set a new one if a freelancer forgets.
- Client access is not included yet; for now the portal has only the freelancer and admin views.
- A header button switches between the freelancer and admin views (temporary, for testing).

**Freelancer**
- Sign-up questions in five steps. The portal writes a portfolio summary and headline from the answers, and the freelancer can edit them before saving.
- Past clients: "+ Add another client" adds as many as needed, each with a start month and an end month (or "Still working here"). The profile shows each one with how long the freelancer worked there.
- Optional Upwork profile link; when given, the profile shows an **UPWORK** button that opens it.
- A Vocaroo voice-recording link is required. The freelancer ticks a box to confirm the recording is 1 minute or shorter.
- **Profile photo:** upload, change or remove a photo; it is cropped to a square and resized before saving. Until a photo is added, the Profile tab shows a notice: "Recommended: add a professional-looking photo". Admins see the photo in the agents list and profiles.
- **Profile:** portfolio and availability to work. Instead of a weekly schedule, a freelancer can choose **Not available at the moment**, with an optional return date and note; the admin is notified and sees them in a separate "Not available at the moment" list. The freelancer picks a time zone and sets hours for each day, then submits. Submitting notifies the admin.
- **Submit timesheet:** client name, date, time in, time out and breaks; total hours are worked out automatically. "+ Add client hours" logs several clients on the same day. Times for different clients may overlap, and shifts can run past midnight. Each entry can be edited or removed.
- **Payslips:** shows payslips once the admin releases them.

**Admin**
- **Notifications** for availability submissions.
- **Available agents:** sort by hours available, by name or by most recent; search; open each agent's full profile; mark agents active or inactive.
- **Timesheets:** weekly grid of agents by day. Click an agent to see their entries, then click an entry to view, edit or delete it.
- **Payslips:**
  - Enter the USD to PHP exchange rate.
  - Set an hourly rate (USD) for each agent and client.
  - Auto-generate payslips for each weekly cutoff (Monday to Sunday).
  - Edit lines and adjustments (bonuses or deductions in PHP).
  - View, release or unrelease payslips, or copy them as text.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The complete, self-contained portal (logo embedded) |
| `src/portal.template.html` | The same page with the logo left as `{{EMBLEM}}` / `{{LOGO}}` placeholders, for easier editing |
| `assets/emblem.png`, `assets/logo-banner.jpg` | Round emblem (header, payslips) and full banner logo (sign-in page) |
| `firebase-config.js` | Firebase settings for hosting outside claude.ai (`null` = use claude.ai storage) |
| `firestore.rules` | Security rules to paste into your Firebase project |

To rebuild `index.html` from the template, replace `{{EMBLEM}}`, `{{LOGO}}` and `{{UPWORK}}` with the base64 of `assets/emblem.png`, `assets/logo-banner.jpg` and `assets/upwork.png`.

## Data storage

The portal can save its data in two places:

| Where the portal is opened | Where data is saved |
| --- | --- |
| The live version on claude.ai | Storage built into Claude (no setup) |
| Any other host (GitHub Pages, your own website) | **Your Firebase database**, once `firebase-config.js` is filled in |

Without Firebase settings, a copy hosted outside claude.ai loads but shows "Saving is not set up on this copy". The two places don't share data: records saved on claude.ai do not appear in Firebase, and records saved in Firebase do not appear on claude.ai.

### Set up Firebase (free Spark plan is enough to start)

1. Go to https://console.firebase.google.com, click **Create a project**, and give it a name (e.g. `speaknlink-portal`). Google Analytics is optional.
2. **Create the database:** in the left menu, open **Build > Firestore Database > Create database**. Pick a location near your team (e.g. `asia-southeast1` for Singapore), and start in **production mode**.
3. **Paste the rules:** open the **Rules** tab, replace everything with the contents of [`firestore.rules`](firestore.rules), and click **Publish**. These rules let in only visitors signed in through the portal (it signs everyone in anonymously); they do not separate admins from freelancers.
4. **Turn on sign-in:** open **Build > Authentication > Get started > Sign-in method**, then enable **Anonymous**.
5. **Register the website:** open **Project settings** (gear icon) > **Your apps**, click the **</>** (Web) icon, and register an app (no hosting needed). Copy the `firebaseConfig` values it shows.
6. **Add the settings to the portal:** open [`firebase-config.js`](firebase-config.js) in this repository and replace `null` with your settings, following the example in the file. Commit the change.
7. **Allow your website's address:** in **Authentication > Settings > Authorized domains**, add the domain where you host the portal (e.g. `aenexyz.github.io`).
8. **Publish the site:** host the repository, for example with **GitHub Pages** (repository **Settings > Pages > Deploy from branch > main / root**). Open the site; the warning bar should be gone and data will save to Firebase.

The Firebase settings in `firebase-config.js` are meant to be public; access is controlled by the Firestore rules.

## Security: read before going live

- **Freelancer passwords are stored as plain text** so that admins can view them. Until real accounts are added, anyone who opens the portal and knows how to inspect its data can read every freelancer's password. Tell freelancers not to reuse a password from another account.
- The admin password is checked in the browser against a SHA-256 hash stored in the page. That stops casual access, but anyone who can read the code can try to guess the password offline. Change the default password.
- The Firestore rules only require Firebase's anonymous sign-in, which the portal does automatically. That blocks bots, but **anyone who opens the portal can read and change every record**, including payslips.

Before you put real payroll or client data in the portal, add real accounts: Firebase Authentication with email and password for each freelancer and admin, and Firestore rules that limit each freelancer to their own records and give admins access to everything.
