# SIT313 D1 Subscription — Short Report

**Student:** [Your name]  
**Repository:** [Paste your GitLab Task D1 URL]  
**Video:** [Paste your Panopto video URL]

## 1. Overview
I extended my existing DEV@Deakin P5 Newsletter project for the D1 Subscription task. I kept the home page, article/tutorial sections, post form, and newsletter subscription flow, and added shared login state, logout, a Pricing page, and a demo Paid-plan upgrade flow.

## 2. Main features
- **Registration and login:** Firebase Authentication manages email/password accounts.
- **Session state:** A React context listens for Firebase authentication changes and makes the signed-in user available across the app.
- **Logout:** The navigation bar provides a logout button for signed-in users.
- **Pricing:** The page compares Free and Paid plan features.
- **Upgrade:** Only a signed-in Free user can open the upgrade modal. The form validates demo fields and updates the user's plan to `Paid` in Firestore.
- **Newsletter:** The existing frontend form calls the existing Express `/subscribe` endpoint.

## 3. Screenshots to add
1. Home page showing the existing DEV@Deakin site.
2. Newsletter form with a successful response.
3. Signup or login screen.
4. Pricing page showing both plans.
5. Upgrade modal (use fictional demo values only).
6. Pricing page after upgrade showing the Paid plan.
7. Firestore `users` collection showing your test user's `name`, `email`, and `plan` fields.
8. Firestore `posts` collection, if your project has saved posts. Do not claim posts are saved if they are not.

## 4. Testing
Record your actual result for each test before submitting.

| Test | Expected result | Actual result |
|---|---|---|
| Register with valid details | Account created and Free profile saved | [Fill in] |
| Register with mismatched passwords | Validation message | [Fill in] |
| Login with incorrect password | Error message | [Fill in] |
| Logout | User session ends and Login/Sign up appears | [Fill in] |
| Open Pricing while logged out | Plans are visible; upgrade asks user to log in | [Fill in] |
| Upgrade as Free user | Modal opens and validates fields | [Fill in] |
| Submit valid demo payment fields | Firestore plan changes to Paid | [Fill in] |
| Try upgrading as Paid user | Upgrade disabled/already Paid message | [Fill in] |
| Subscribe with invalid email | Validation prevents submission | [Fill in] |
| Subscribe with backend running | Success or server error message shown | [Fill in] |

## 5. Limitations
The upgrade modal is a demonstration only. It does not charge money and does not store payment-card information. The existing post form currently uses a success alert rather than saving posts to Firestore; verify and merge any post-persistence implementation required by earlier tasks before submitting.

## 6. Conclusion
This extension demonstrates React state and context, Firebase Authentication, Firestore user profile data, conditional UI for Free/Paid plans, and the existing Express newsletter endpoint.
