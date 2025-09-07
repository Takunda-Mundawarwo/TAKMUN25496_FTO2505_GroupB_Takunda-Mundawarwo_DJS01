import { podcasts, genres } from "./data.js";

/**
 * @typedef {object} Genre
 * @prop {string} id - A unique value used to identify the genre
 * @prop {string} title -The genres title
 * @prop {string} description - A description of the genre
 * @prop {Array<string>} shows - An array of the id's of shows in the genre
 */

export function addPodcastToHTML(id) {
  const podcast = podcasts.find((pod) => pod.id == id);

  const podcastList = document.getElementById("podcast-list");

  const preview = document.createElement("div");
  preview.className = "podcast";

  preview.innerHTML = `
    <img
     src=${podcast.image}
     alt="${podcast.title} Cover Image"
     class="podcast__image"
    />
    <h2>${podcast.title}</h2>
    <h4>${podcast.seasons} Seasons | ${getTimeSinceUpdated(podcast)}</h4>
    <ul class="podcast__genres">
      ${createGenreListElements(podcast)}
    </ul>`;

  podcastList.appendChild(preview);
}

/**
 * @typedef {object} Podcast - An object representing a Podcast
 * @prop {string} id - A unique value used to identify a podcast.
 * @prop {string} title - The title of the podcast
 * @prop {string} description - A short descriptiono of the podcast
 * @prop {number} seasons - The number of seasons of the podcast
 * @prop {string} image - A link to the podcasts cover image
 * @prop {Array<number>} genres - An array of the id's of genres applicable to the podcast {@link Genre}
 * @prop {Date} updated - The exact date when the podaast was last updated
 */

/**
 *@param {Podcast} podcast
 * @returns {string} Time since the podcast was last updated
 */
function getTimeSinceUpdated(podcast) {
  const currentDate = new Date();
  const lastUpdatedDate = new Date(podcast.updated);
  const timeDifference = currentDate.getTime() - lastUpdatedDate.getTime();

  if (timeDifference < 0) {
    return "This Podcast was updated by time travellers.";
  }

  const seconds = Math.floor(timeDifference / 1000);
  if (seconds === 0) {
    return "Updated just now.";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes === 0) {
    return `Updated ${seconds} seconds ago.`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours === 0) {
    return `Updated ${minutes} minutes ago.`;
  }

  const days = Math.floor(hours / 24);
  if (days === 0) {
    return `Updated ${hours} hours ago.`;
  }

  const weeks = Math.floor(days / 7);
  if (weeks === 0) {
    return `Updated ${days} ago.`;
  }

  const months = Math.floor(weeks / 4);
  if (months === 0) {
    return `Updated ${weeks} weeks ago.`;
  }

  const years = Math.floor(months / 12);
  if (years === 0) {
    return `Updated ${months} months ago.`;
  } else {
    return `Updated ${years} years ago.`;
  }
}

/**
 *
 * @param {Podcast} podcast
 * @returns {string} The HTML list Elements for the genres of the provided podcast
 */
function createGenreListElements(podcast) {
  const currentGenres = podcast.genres;
  let genreListElements = "";

  currentGenres.forEach((id) => {
    const genreToAdd = genres.find((genre) => genre.id == id);
    genreListElements += `<li>${genreToAdd.title}</li>`;
  });

  return genreListElements;
}
