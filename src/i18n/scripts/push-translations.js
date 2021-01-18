require("dotenv").config({ path: ".env.local" });
const axios = require("axios").default;
const translations = require("../messages/nl.json");

(async () => {
  try {
    await axios.post(
      "https://localise.biz/api/import/json?index=text&locale=nl&tag-absent=unused&tag-new=needs-translation",
      translations,
      {
        headers: {
          Authorization: `Loco ${process.env.LOCO_API_KEY}`
        }
      }
    );

    console.log("Translations pushed.");
  } catch (error) {
    console.error(
      `Failed pushing translations with status ${error.response.status}.`
    );
    console.error(error.response.statusText);
  }
})();
