# Speak n' Link Portal

An agency portal for Speak n' Link: freelancer profiles and availability, daily timesheets, and weekly payslips, with an admin view for HR.

Live version: https://claude.ai/artifact/BPGbvoA8oDKDyHGJUeJC2E (admin sign-in: add `#admin` to the end of the link)

## Features

**Sign-in**
- The first screen is the freelancer sign-in.
- HR and company admins sign in with a username and password, either through the admin link (`#admin`) or with the "Switch to admin view" button. Credentials are given to admins separately.
- Test freelancer accounts: `test` / `test@test.com`, `test2` / `test2@test.com`, `test3` / `test3@test.com`. They have one-click buttons on the sign-in page and a "Test" badge in the admin view.
- Client access is not included yet; for now the portal has only the freelancer and admin views.
- A header button switches between the freelancer and admin views (temporary, for testing).

**Freelancer**
- Sign-up questions in five steps. The portal writes a portfolio summary and headline from the answers, and the freelancer can edit them before saving.
- A Vocaroo voice-recording link is required. The freelancer ticks a box to confirm the recording is 1 minute or shorter.
- **Profile:** portfolio and availability to work. The freelancer picks a time zone and sets hours for each day, then submits. Submitting notifies the admin.
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
| `assets/emblem.png`, `assets/logo-full.png` | Transparent logo files |

To rebuild `index.html` from the template, replace `{{EMBLEM}}` and `{{LOGO}}` with the base64 of `assets/emblem.png` and `assets/logo-full.png`.

## Data storage: important

Right now the portal stores its data with the storage built into Claude artifacts (`claude.use("db")`). Saving works only on the live version on claude.ai. If you open `index.html` from this repository or host it elsewhere, the page loads but shows "Saving is not available in this view". To run it on your own hosting, swap the small storage layer (the `col()` / `db.doc()` calls) for a backend such as Firebase/Firestore, which uses a very similar API, or Supabase.

Also note:
- Freelancer sign-in is by email only, with no passwords yet.
- The admin password is checked in the browser against a SHA-256 hash stored in the page. That stops casual access, but anyone who can read the code can try to guess the password offline, and the stored data is not locked to admins. Change the default password, and move admin sign-in to a real server or auth service before production use.
- Anyone who can open the portal can read all of its records.

Add real authentication and per-role access rules before you use it with live client or payroll data.
