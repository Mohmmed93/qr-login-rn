const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
  },
  welcomeScreen: {
    headerRight: "Log Out", 
    note: "Note",
    noteFieldPlaceholder: "Enter note here",
    addNote: "Add Note"
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack", 
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  errors: {
    invalidEmail: "Invalid email address.",
    invalidNotes: "Notes can't be empty"
  },
  loginScreen: {
    signIn: "Sign In",
    enterDetails:
      "Scan your credentials to login",
    tapToSignIn: "Tap to Qr sign in!",
  },
}

export default en
export type Translations = typeof en
