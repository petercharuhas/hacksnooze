"use strict";

// Global variable to hold the User instance of the currently-logged-in user
let activeUser;

/******************************************************************************
 * User login, signup, and logout
 */

/** Handle login form submission. If login is successful, set up the user instance */

async function handleLoginSubmission(evt) {
  console.debug("handleLoginSubmission", evt);
  evt.preventDefault();

  // Retrieve the username and password
  const enteredUsername = $("#login-username").val();
  const enteredPassword = $("#login-password").val();

  // User.login retrieves user info from API and returns User instance
  // which we'll make the globally-available, logged-in user.
  activeUser = await User.login(enteredUsername, enteredPassword);

  $loginForm.trigger("reset");

  storeUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
}

$loginForm.on("submit", handleLoginSubmission);

/** Handle signup form submission. */

async function handleSignupSubmission(evt) {
  console.debug("handleSignupSubmission", evt);
  evt.preventDefault();

  const enteredName = $("#signup-name").val();
  const enteredUsername = $("#signup-username").val();
  const enteredPassword = $("#signup-password").val();

  // User.signup retrieves user info from API and returns User instance
  // which we'll make the globally-available, logged-in user.
  activeUser = await User.signup(enteredUsername, enteredPassword, enteredName);

  storeUserCredentialsInLocalStorage();
  updateUIOnUserLogin();

  $signupForm.trigger("reset");
}

$signupForm.on("submit", handleSignupSubmission);

/** Handle click of logout button
 *
 * Remove user credentials from localStorage and refresh the page
 */

function handleLogoutClick(evt) {
  console.debug("handleLogoutClick", evt);
  localStorage.clear();
  location.reload();
}

$navLogOut.on("click", handleLogoutClick);

/******************************************************************************
 * Storing/recalling previously-logged-in-user with localStorage
 */

/** If there are user credentials in local storage, use those to log in
 * that user. This is meant to be called on page load, just once.
 */

async function checkForRememberedUser() {
  console.debug("checkForRememberedUser");
  const storedToken = localStorage.getItem("token");
  const storedUsername = localStorage.getItem("username");
  if (!storedToken || !storedUsername) return false;

  // Try to log in with these credentials (will be null if login fails)
  activeUser = await User.loginViaStoredCredentials(storedToken, storedUsername);
}

/** Sync current user information to localStorage.
 *
 * Store the username/token in localStorage so when the page is refreshed
 * (or the user revisits the site later), they will still be logged in.
 */

function storeUserCredentialsInLocalStorage() {
  console.debug("storeUserCredentialsInLocalStorage");
  if (activeUser) {
    localStorage.setItem("token", activeUser.loginToken);
    localStorage.setItem("username", activeUser.username);
  }
}

/******************************************************************************
 * General UI updates for users
 */

/** When a user signs up or logs in, set up the UI for them:
 *
 * - show the stories list
 * - update nav bar options for logged-in user
 * - generate the user profile part of the page
 */

function updateUIOnUserLogin() {
  console.debug("updateUIOnUserLogin");

  $allStoriesList.show();

  updateNavbarOnLogin();
}
