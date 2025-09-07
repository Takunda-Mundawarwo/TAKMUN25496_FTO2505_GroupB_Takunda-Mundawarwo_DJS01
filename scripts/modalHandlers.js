import { podcasts, seasons } from "./data.js";
import { createGenreListElements } from "./podcast.js";

export function setupModalHandler() {
  const closeButton = document.getElementById("close-btn");
  const modal = document.getElementById("modal");
  const podcastSection = document.getElementById("podcast-list");

  podcastSection.addEventListener("click", (event) => {
    console.log("is this Happening");
    if (event.target.parentElement.id == "podcast") {
      populateModal(event.target.parentElement.dataset.id);
      console.log("modal should be populated");
      modal.classList.remove("hidden");
      console.log("modal opeb");
    }
  });

  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}

function populateModal(id) {
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-image");
  const modalDescription = document.getElementById("modal-description");
  const modalGenres = document.getElementById("modal-genres");
  const modalUpdatedDate = document.getElementById("modal-updated");
  const modalSeasonsList = document.getElementById("modal-seasons");

  const podcast = podcasts.find((pod) => pod.id == id);
  const updatedDate = new Date(podcast.updated);

  modalTitle.innerText = podcast.title;
  modalImage.src = podcast.image;
  modalDescription.innerText = podcast.description;
  modalGenres.innerHTML = createGenreListElements(podcast);
  modalUpdatedDate.innerText = updatedDate.toDateString();
  modalSeasonsList.innerHTML = createSeasonsListElements(id);
}

function createSeasonsListElements(id) {
  let seasonListElements = "";
  const podcastSeasonOverview = seasons.find((seasonObj) => seasonObj.id == id);
  const podcastSeasonDetails = podcastSeasonOverview.seasonDetails;

  podcastSeasonDetails.forEach((season) => {
    seasonListElements += `
            <div class="modal__season">
                <h2> ${season.title}</h2>
                <p>${season.episodes}</p>
            </div>`;
  });
  return seasonListElements;
}
