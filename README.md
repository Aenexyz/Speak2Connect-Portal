# Speak2Connect Portal

An agency portal for Speak2Connect: freelancer profiles and availability, daily timesheets, and weekly payslips, with an admin view for HR.

Live versions:
- **GitHub Pages (saves to Firebase):** https://aenexyz.github.io/Speak2Connect-Portal/ (admin sign-in: https://aenexyz.github.io/Speak2Connect-Portal/#admin)
- **claude.ai (saves to claude.ai storage):** https://claude.ai/artifact/BPGbvoA8oDKDyHGJUeJC2E

## Features

**Sign-in**
- The first screen is the freelancer sign-in: email and password. New freelancers click "Create an account" (name, email, password). An account with no password yet (e.g. created before passwords existed) takes the first password entered as its own.
- HR and company admins sign in with a username and password through the admin link: the portal address with `#admin` at the end. Credentials are given to admins separately.
- There are two admin types, both using the `#admin` link:
  - **Admin** (HR / company): Available agents and Timesheets.
  - **Payroll admin**: everything the admin has, plus Payslips (exchange rate, hourly rates, generating, editing and releasing payslips).
- Freelancers can change their password from the Profile tab.
- **Forgot your password?** on the sign-in page sends the admin a reset request. In that freelancer's profile the admin sees "Password reset requested", then clicks **Generate temporary password** (or types one) and shares it privately. The freelancer signs in with it and must choose a new password before continuing.
- Admins can always see each freelancer's email and current password in their profile (Show / Copy).
- Client access is not included yet; for now the portal has only the freelancer and admin views.

**Freelancer**
- Sign-up questions in five steps. The portal writes a portfolio summary and headline from the answers, and the freelancer can edit them before saving.
- Past clients: "+ Add another client" adds as many as needed, each with a start month and an end month (or "Still working here"). The profile shows each one with how long the freelancer worked there.
- Key skills, industries, and tools and software are entered as tags. Skills and industries show their suggested options when the box is clicked (Key skills: Cold Calling, Appointment Setting, Warm Calling, Email Marketing, CRM Management, Sales Representative, Customer Support Representative; Industries: Real Estate, B2B, B2C, Sales, Mortgage, Car Rental, Digital Marketing, SaaS, Solar, Construction), and anything else can be typed in.
- Tools and software: typing shows suggestions from a list of common tools, Enter adds the suggestion or the typed text, and each tag can be removed with ×.
- Optional Upwork profile link; when given, the profile shows an **UPWORK** button that opens it.
- A Vocaroo voice-recording link is required. The freelancer ticks a box to confirm the recording is 1 minute or shorter.
- **Profile photo:** upload, change or remove a photo; it is cropped to a square and resized before saving. Until a photo is added, the Profile tab shows a notice: "Recommended: add a professional-looking photo". Admins see the photo in the agents list and profiles.
- **Profile:** portfolio and availability to work. Instead of a weekly schedule, a freelancer can choose **Not available at the moment**, with an optional return date and note; the admin is notified and sees them under a separate **Not available at the moment** sub-tab of Available agents. The freelancer picks a time zone and sets hours for each day, then submits. Submitting notifies the admin.
- **Submit timesheet:** client name, date, time in, time out and breaks; total hours are worked out automatically. "+ Add client hours" logs several clients on the same day. Times for different clients may overlap, and shifts can run past midnight. Each entry can be edited or removed.
- **Payslips:** shows payslips once the admin releases them.

**Admin** (Payslips: payroll admin only)
- **Notifications** for availability submissions.
- **Available agents:** sort by hours available, by name or by most recent; search; open each agent's full profile; mark agents active or inactive.
- **Timesheets:** weekly grid of agents by day. Click an agent to see their entries, then click an entry to view, edit or delete it.
- **Payslips:**
  - Enter the USD to PHP exchange rate.
  - Remove a rate that is no longer needed with the **(−)** button next to the agent's name (asks to confirm first). A rate can only be removed if the agent has never logged hours for that client; otherwise the button is disabled or explains why.
  - Set the rate for each agent and client (default **USD/hr**; the on/off switch next to each rate flips it to **PHP/week**), either **USD / hour** (hours × rate × exchange rate) or a **PHP / week** rate for a 40-hour week (paid per hour as rate ÷ 40 × hours logged, e.g. ₱5,000/week = ₱125/h; the payslip shows its USD equivalent for reference).
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

To stay inside Firebase's free daily limits, each screen loads only what it needs: a freelancer loads their own profile, the week of timesheets they are viewing and their own payslips; an admin loads the freelancer list, the rates, the latest 40 notifications and the selected week's timesheets and payslips. Full-size profile photos are stored separately and loaded only where shown. The first time an admin opens the portal after this change, it updates older records once (adds week fields to timesheets, moves photos, builds the client list).

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
