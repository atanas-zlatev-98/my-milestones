
# Functional Guide

 - **LINK TO APK** - https://drive.google.com/file/d/16NtubnZ555Xlce_6hibEGugRuQWU6Ctd/view?usp=drive_link

## 1. **Project Overview**

**Application Name:** My Milestones

**Application Category / Topic:** Project Tracker

**Main Purpose (2–4 sentences):** 

- The main purpose of the app is to track the progress of your projects, to check deadlines and what is completed and what is not, it helps the user to keep track of the project progress


## 2. **User Access & Permissions**

**Guest User (Not Authenticated):** 

- Guest users only see the auth screens Login/Register, to use the app they need to register or login

**Authenticated User(Logged in User):** 

- Users that are logged in are redirected to the main page with their projects. From there, if the user has a created project he can click on it and he will be redirecred to the details page of the project. From there he can update the tasks of the projects, delete the project or complete it. Completed projects are moved to the My Profile screen where users can check their upcoming projects or the ones they have completed. If the user wants to create a new project a button in the bottom tabs navigator will redirect them to the create project page.


## 3. **Authentication & Session Handling**

**Authentication Flow:**

**When the app starts:** 
- Firebase checks if a user is already logged in, onAuthStateChanged is called once with the current user or null.

**Checking Auth Status:** 
- Firebase reads tokens from the device storage automatically, if the token is valid returns a user obejct if not sets user to null

**Successful login or registration:** 
- User enters credentials then firebase verifies them, then creates a token and saves it on the device, onAuthStateChanged fires with the logged-in user

**On logout:** 
- On logout firebase clears the tokens and onAuthStateChanged fires with null, and the user is redirected to the login screen

**Session Persistence**

**How is the user session stored:** 
- Tokens are stored automatically on the device, next time the app opens, Firebase restores the session

**How is automatic login handled after app restart:** 
- Firebase SDK starts when the app runs, checks for saved auth tokens on the device, if found it checks if the token is still valid, if its not it refreshes the token in the background automatically.


## 4. **Navigation Structure**

**Root Navigation Logic:** 

- The app checks if there is an authenticated user, shows a spinner while checking, if there is a user it navigates to main screen, if not to the auth flow login/register screens.

 **Main Navigation:**

- For main navigation i use Bottom Tabs, with three tabs Milestones, Create Project and My Profile, on some of the screens like project details the tab is hidden

**Nested Navigation:**

- For nested navigation the app uses Stack inside Tabs navigation, **Milestones Tab -> ActiveMilestones and ProjectDetails** and **Profile Tab -> Profile and ProjectDetails**


## 5. **List → Details Flow**

**List / Overview Screen:**

**What type of data is displayed?:**

- The main screen displays a list of projects created by the currently authenticated user. The data is retrieved from the projects collection in Firestore using the getAllProjects(userId) service function.

**How does the user interact with the list?:**

- The user can tap on a project item and navigate to the project details screen, then delete the project if he wants or update the project and project tasks, if all tasks are completed the user can complete the whole project and remove it from the list.

**Details Screen**

**How is navigation triggered?:**

- The navigation to Project Details is triggered when a user taps on a project from one of these screen: ActiveMilestones and Profile

**What data is received via route parameters?:**

- only the project id () => navigation.navigate('ProjectDetails', { id: project.id }) and in the details page const { id } = route.params;

## 6. **Data Source & Backend**

**Backend Type - Firebase**

- This application uses a real backend powered by Firebase, specifically:
  Firebase Authentication – for user registration and login
  Firebase Database for storing data

## 7. **Data Operations (CRUD)**

**Describe the implemented data operations:**

**Read (GET):**

- Data is fetched in the provider, its fetched from the Cloud Firestore and displayed in the main project-related screens.

- How is data fetched: When the application starts, authentication state is checked using: onAuthStateChanged from Firebase. If the user is authenticated, user's data is retrieved from the users collection and stored in global auth context

**Create (POST):**

**How does the user create new data?:**

- Users create new data through the CreateProject screen. User fills in project information (title, tasks, etc.) -> On submit the create project function is called -> A new document is added to the projects collection and the project id is added to the users projects array. The same logic if for the Register screen only the collection and data is different.

**Update / Delete (Mutation):**

**Which operation is implemented (Update and/or Delete)?** - Both Update and Delete operations are implemented.

- Project details screen - Updating a task, when a user completes a task in a project, a function fires where the task is found in the firebase storage and updated using updateDoc.

- Project details screen - Completing a project, when a user completes a project, the project completed field goes from false to true.

- Project details screen - Deleting a project, when a user deletes a project, the project is removed from the project collection and then removed from the user projects array.

**How is the UI updated after the change?:**

- The UI is updated using React Context state management through the ProjectsProvider. The application follows a state-driven UI approach, meaning that whenever the projects state changes, all components consuming the ProjectsContext automatically re-render with the updated data.

## 8. **Forms & Validation**

**Forms Used:**

- Create Project Form - The primary form implemented in the application is the Create Project form, located in the CreateProject screen.This form allows authenticated users to create a new project and define its structure before saving it to the backend.

Form Inputs:
- Icon Image (image picker)
- Background Image (image picker)
- Project Name (text input)
- Project Field (text input)
- Project Tasks (dynamic task list input)
- Project Deadline (date picker)
- Users can dynamically add multiple tasks before submitting the form.

- **Other screens containing form inputs are: Register Screen and Login Screen.**

## 9. **List all forms in the application:**

**Validation Rules:**

- **Describe at least three validated fields: - Field name and rules: - Field name and rules: - Field name with multiple validation rules:**

**Create Project:**

- Icon Image (image picker) - Image is required
- Background Image (image picker) - Image is required
- Project Name (text input) - Required, min length 3 and max length 20
- Project Field (text input) - Required, min length 3 and max length 20
- Project Tasks (dynamic task list input) - Required, must contain atleast 3 tasks
- Project Deadline (date picker) - Required, must be a future date


**Register**

- Profile Image(image picker) - Image is required
- Name - Required, min length 3 and max length 15
- Email - Required, must be email and max length 50
- Password - Required, must contain letters and numbers, min length 6
- Confirm Password - Required, must match password


**Login**

- Email: Required
- Password: Required

**If any of the validation fails the user cannot continue.**

## 10. **Native Device Features**

**Used Native Feature(s)**

- **Select and describe at least one: - Camera / Image Picker - Location / Maps - Biometrics - Sensors:** - The project uses Image Picker

**Usage Description:**

**Where is it used?**

- Register Screen
- Create Project Screen

**What functionality does it provide?**

- Used to provide images for user and projects, User for profile picture and projects for icon and background images.


## 11. **Typical User Flow**

- **Describe a normal user journey through the app: 1. 2. 3. 4.**

1. **Launch App**
2. **Authenticate**
3. **View Projects**
4. **Create or Manage Projects**
5. **Update Tasks**
6. **Complete/Delete Projects**
7. **Logout**

## 12. **Error & Edge Case Handling**

- **Describe how the app handles: - Authentication errors - Network or data errors - Empty or missing data states**

**Authentication Errors**

- Firebase errors are cought by try/catch blocks
- Error messages from Firebase (e.g., invalid email or password, Project not found, Email already in use) are captured and displayed to the user.
- The UI prevents navigation to protected screens if authentication fails.
- On logout or failed auth, the RootNavigator automatically redirects to the Login screen.

**Network or Data Errors**

- All Firestore calls are wrapped in try/catch.
- Errors are stored in the ProjectsContext state
- Loading indicators (ActivityIndicator) prevent duplicate actions during network delays.

**Empty or Missing Data States**

- The ActiveMilestones screen displays an empty state (e.g., “No active Projects”) instead of breaking the UI.
- Missing tasks - Validation prevents creating a project without at least 3 tasks.
- Missing Images - Users cannot submit a project unless icon and background images are selected. Errors are displayed.
- Non-existent Project - When fetching or updating a project by ID, the app first checks if the project exists