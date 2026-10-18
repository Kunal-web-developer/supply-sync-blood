# Supply Sync Blood

Build a responsive landing page and demo app for "BloodBridge AI – Smart Blood Bank Network", a hackathon project that shares verified blood inventory between hospitals, blood banks and donors in India, and uses AI to predict shortages.

DESIGN STYLE

- Light, calm, trustworthy medical look. Soft sage background (#EEF1EA), white rounded cards (20–24px radius, soft shadow), deep green text (#1E3834), one coral-red accent (#D8453D), amber only for shortage warnings.

- Fonts: Manrope for headings, DM Sans for body.

- Include dark mode. Mobile-first, accessible, visible keyboard focus.

- Avoid generic gradients and cluttered effects. Keep motion minimal: a count-up on the stats and a hover lift on cards.

PAGES AND SECTIONS (landing page, in order)

1. Navbar: logo (blood drop + "BloodBridge AI"), links (How it works, Portals, Forecasting, Trust), button "Find blood".

2. Hero: headline "Right blood. Right place. Before it's too late." Subtext: "One verified view of blood stock across hospitals and blood banks, with AI that sees shortages coming and alerts the people who can help." Buttons: "View live dashboard" and "Become a donor". On the right, a "Request blood" card (see Interactive demo below).

3. Stats strip with animated counters: Units tracked, Hospitals and banks connected, Shortages predicted early, Average time to a match.

4. Problem: three cards: "No shared, verified data", "Slow emergency response", "Waste next to shortage".

5. How it works (3 numbered steps): Verify, Predict, Notify.

6. "One bridge. Three ways to make a difference." Three cards with icon, small label, title, description, and arrow button:

   - I need blood / Receiver portal / "Share your requirement and let AI find the safest, nearest match in minutes." / Request blood

   - I want to help / Volunteer portal (highlighted with a coral border) / "Register once, stay updated, and donate when someone nearby needs you most." / Become a donor

   - I manage inventory / Blood bank & hospital / "Manage live inventory, verify requests, and coordinate supply across your network." / Open workspace

7. AI forecast: line chart of blood stock with a dashed predicted line crossing a "safe level" line and a marker "Shortage predicted in 72 hours". Beside it, two sample notifications:

   - To hospital: "O− platelets are now available at City Blood Bank, 3 km away."

   - To donor: "B+ blood is needed close to you. Reply only if you can."

8. NVIDIA section (dark green band): "Fast enough to feel live". Bars comparing PyTorch inference 120 ms vs TensorRT inference 18 ms ("about 6.7× faster"). Badges: NVIDIA GPU, TensorRT, Edge deployment.

9. Trust: four points: Donors opt in, Location stays private, Verified sources only, No pressure.

10. Final CTA "Join the network" with three buttons: I need blood, I want to donate, I run a blood bank. Footer with DevPost, GitHub, demo video links, and a "Built with Python, PyTorch, TensorRT, FastAPI, PostgreSQL, React" line.

INTERACTIVE DEMO (important)

- "Request blood" form: dropdowns for blood group (O−, O+, A−, A+, B−, B+, AB−, AB+), component (Whole blood, Packed red cells, Platelets, Plasma) and city (Mumbai, Pune, Nagpur, Delhi).

- Show 4 mock blood banks per city with distance, units in stock (green pill) or "Out of stock" (red pill), and "verified X min ago". Negative groups and platelets should have lower stock.

- If nothing is in stock, show a "Notify me" button that confirms an alert will be sent.

EXTRA PAGES (simple, mock data)

- /dashboard: national dashboard with blood group tiles, expiry badges, a regional shortage heatmap or table, pending requests, and fulfillment time trends.

- /donor: donor sign-up form (name, blood group, city, availability, consent checkbox for opt-in alerts).

- /workspace: blood bank view to update inventory (blood group, component, units, expiry date).

Use realistic sample data and label it as demo data. Keep copy plain, in sentence case, with clear button labels.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/56212a4a-25c8-454f-8f8f-43a1423c9f73).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
