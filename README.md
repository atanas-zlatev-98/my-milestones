
# Functional Guide

## 1. **Project Overview**

- **Application Name:** My Milestones

- **Application Category / Topic:** **Project Tracker**

- **Main Purpose (2–4 sentences):** The main purpose of the app is to track the progress of your projects, to check deadlines and what is completed and what is not, it helps the user to keep track of the project progress

---

## 2. **User Access & Permissions**

**Guest User (Not Authenticated):** Guest users only see the auth screene Login/Register, to use the app they need to register or login

**Authenticated User(Logged in User):** Users that are logged in are redirected to the main page with their projects. From there, if he has a created project he can click on it and he will be redirecred to the details page of the project. From there he can update the tasks of the projects, delete the project or complete it. Completed projects are moved to the My Profile screen where users can check their upcoming projects or the ones they have completed. If the user wants to create a new project a button in the bottom tabs navigator will redirect them to the create project page.

---

## 3. **Authentication & Session Handling**

**Authentication Flow:**

- When the app starts: Firebase checks if a user is already logged in, onAuthStateChanged is called once with the current user or null.

- Checking Auth Status: Firebase reads tokens from the device storage automatically, if the token is valid returns a user obejct if not sets user to null

- Successful login or registration: User enters credentials then firebase verifies them, then creates a token and saves it on the device, onAuthStateChanged fires with the logged-in user

- On logout: On logout firebase clears the tokens and onAuthStateChanged fires with null, and the user is redirected to the login screen

**Session Persistence**

- How is the user session stored: Tokens are stored automatically on the device, next time the app opens, Firebase restores the session

- How is automatic login handled after app restart: Firebase SDK starts when the app runs, checks for saved auth tokens on the device, if found it checks if the token is still valid, if its not it refreshes the token in the background automatically.

---

## 4. **Navigation Structure**

**Root Navigation Logic:** The app checks if there is an authenticated user, shows a spinner while checking, if there is a user it navigates to main screen, if not to the auth flow login/register screens.

 **Main Navigation:**

- For main navigation i use Bottom Tabs, with three tabs Milestones, Create Project and My Profile, on some of the screens like project details the tab is hidden

**Nested Navigation:**

- For nested navigation is use Stack inside Tabs navigation, **Milestones Tab -> ActiveMilestones and ProjectDetails** and **Profile Tab -> Profile and ProjectDetails**


5. List → Details Flow

List / Overview Screen

· What type of data is displayed?

· How does the user interact with the list?

Details Screen

· How is navigation triggered?

· What data is received via route parameters?

6. Data Source & Backend

Backend Type

· Simulated backend (MockAPI / DummyJSON)

· Real backend (Firebase or equivalent)

7. Data Operations (CRUD)

Describe the implemented data operations:

Read (GET)

· Where is data fetched and displayed?

Create (POST)

· How does the user create new data?

Update / Delete (Mutation)

· Which operation is implemented (Update and/or Delete)?

· How is the UI updated after the change?

8. Forms & Validation

Forms Used

9. List all forms in the application:

Validation Rules

Describe at least three validated fields: - Field name and rules: - Field name and rules: - Field name with multiple validation rules:

10. Native Device Features

Used Native Feature(s)

Select and describe at least one: - Camera / Image Picker - Location / Maps - Biometrics - Sensors

Usage Description

· Where is it used?

· What functionality does it provide?


11. Typical User Flow

Describe a normal user journey through the app: 1. 2. 3. 4.

12. Error & Edge Case Handling

Describe how the app handles: - Authentication errors - Network or data errors - Empty or missing data states