export function getFirebaseAuthErrorMessage(error) {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already in use.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    default:
      return "Something went wrong. Please try again.";
  }
}
