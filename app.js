import { podcasts } from "./scripts/data.js";
import { addPodcastToHTML } from "./scripts/podcast.js";
import { setupModalHandler } from "./scripts/modalHandlers.js";

function setupApp() {
  podcasts.forEach((podcast) => {
    addPodcastToHTML(podcast.id);
  });

  setupModalHandler();
}

setupApp();
