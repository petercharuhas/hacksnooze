"use strict";

const $appBody = $("body");

const $loadingMsg = $("#stories-loading-msg");
const $storiesList = $("#all-stories-list");

const $login = $("#login-form");
const $signup = $("#signup-form");

const $loginNav = $("#nav-login");
const $userProfileNav = $("#nav-user-profile");
const $logoutNav = $("#nav-logout");

function hideComponents() {
  const componentsToHide = [
    $storiesList,
    $login,
    $signup,
  ];

  componentsToHide.forEach(component => component.hide());
}

async function initiateApp() {
  console.debug("initiateApp");

  await checkRememberedUser();
  await displayInitialStories();

  if (currentUser) updateUIOnUserLogin();
}

console.warn("HEY USER: This application generates various debug messages." +
  " If you don't see the message 'initiateApp' below this, you may have" +
  " hidden these messages. In your console, go to 'Default Levels' and add 'Verbose'");
$(initiateApp);
