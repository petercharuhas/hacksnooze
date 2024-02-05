"use strict";

// This is the global list of the stories, an instance of StoryList
let globalStoryList;

/** Fetch and display stories when the site first loads. */

async function loadAndDisplayStories() {
  globalStoryList = await StoryList.fetchStories();
  $storiesLoadingMsg.remove();

  renderStoriesOnPage();
}

/**
 * A rendering method to generate HTML for an individual Story instance.
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Fetches the list of stories from the server, generates their HTML, and displays them on the page. */

function renderStoriesOnPage() {
  console.debug("renderStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of globalStoryList.stories) {
    const $storyMarkup = generateStoryMarkup(story);
    $allStoriesList.append($storyMarkup);
  }

  $allStoriesList.show();
}
