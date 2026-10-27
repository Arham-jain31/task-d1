# DEV@Deakin — P5 Newsletter + D1 Subscription

This project keeps the previous DEV@Deakin frontend and newsletter subscription work, then adds the D1 pricing and subscription-plan demonstration.

## Included
- Existing Home page, article/tutorial/gallery components, assets and post form
- Existing newsletter form connected to the Express `/subscribe` endpoint
- Existing Firebase email/password sign-up and login
- Shared React authentication state and Logout button
- Pricing page with Free and Paid plans
- Upgrade Plan modal with basic demo validation
- Paid plan saved to the signed-in user's Firestore `users/{uid}` document

## Requirements
- Node.js LTS
- A Firebase project with Email/Password Authentication and Firestore enabled
- A verified SendGrid sender and API key if you want to test newsletter email delivery

## Setup

### 1. Frontend
From this folder:

```bash
npm install
```

Copy `.env.example` to `.env.local` and fill in the Firebase values from your Firebase project settings. Do not commit real keys or secrets.

Start the frontend:

```bash
npm run dev
```

### 2. Backend newsletter
Open a second terminal:

```bash
cd backend
npm install
```

Create `backend/.env` with:

```env
SENDGRID_API_KEY=your_sendgrid_api_key
SENDER_EMAIL=your_verified_sender@example.com
```

Start the backend:

```bash
npm start
```

The backend uses port 3000. Vite proxies `/subscribe` to it.

## Firebase setup
1. Enable Authentication > Sign-in method > Email/Password.
2. Create a Firestore database.
3. Publish the rules in `firebase/firestore.rules`.
4. Put the Firebase web-app configuration in `.env.local`.

On registration, Firebase Authentication creates the account and Firestore stores the user's name, email, plan (`Free`) and creation time. Firebase Authentication manages passwords; this app does not store password or card details in Firestore.

## D1 upgrade demonstration
1. Register and log in.
2. Open Pricing from the navigation bar.
3. Click Upgrade Plan while on the Free plan.
4. Enter demo-only values: name, 16 digits, expiry `MM/YY`, and a 3–4 digit CVV.
5. Submit. The app saves `plan: "Paid"` to the user's Firestore profile and updates the displayed plan.
6. Try clicking Upgrade Plan again. It is disabled for a Paid user.
7. Log out and confirm the navigation returns to Login/Sign up.

**Important:** This is a university demo form only. It does not process real payments. Never enter real payment details; card fields are not stored. A production payment flow must use a PCI-compliant payment provider.

## Build check
```bash
npm run build
```

## Submission reminders
- Create the required GitLab project and set visibility to Internal.
- Do not commit `node_modules`, `.env`, API keys, or other secrets.
- Record the required 3–6 minute walkthrough and upload it to Panopto.
- Add screenshots of the website and Firestore users/posts plus repository and video links to your report.

## Notes
- Existing `backend/server.js` was retained to preserve the P5 newsletter endpoint.
- The post form currently shows a success alert and does not persist posts. If your previous task version had post persistence elsewhere, compare that implementation before submission and merge it rather than assuming this form saves posts.
