"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Display the main list of all stories when the site name is clicked */

function handleAllStoriesClick(evt) {
  console.debug("handleAllStoriesClick", evt);
  hideComponents();
  renderAllStories();
}

$body.on("click", "#nav-all", handleAllStoriesClick);

/** Display login/signup forms when "login" is clicked */

function handleLoginClick(evt) {
  console.debug("handleLoginClick", evt);
  hideComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", handleLoginClick);

/** Update the navbar after user login */

function updateNavbarOnLogin() {
  console.debug("updateNavbarOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
