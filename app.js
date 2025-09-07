import { podcasts } from "./scripts/data.js";
import { addPodcastToHTML } from "./scripts/podcast.js";

podcasts.forEach((podcast) => {
  addPodcastToHTML(podcast.id);
});
