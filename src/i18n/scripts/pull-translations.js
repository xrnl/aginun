require("dotenv").config({ path: ".env.local" });
const axios = require("axios").default;
const fs = require("fs");
const path = require("path");

(async () => {
  try {
    const { data } = await axios.get(
      "https://localise.biz/api/export/locale/nl.json?index=text",
      {
        headers: {
          Authorization: `Loco ${process.env.LOCO_API_KEY}`
        }
      }
    );

    try {
      const translations = JSON.stringify(
        data,
        (key, value) => value || null,
        2
      );

      await fs.writeFileSync(
        path.resolve(__dirname, "../messages/nl.json"),
        translations
      );

      console.log("Translations file created.");
    } catch (error) {
      console.error("Failed creating translation file");
      console.error(error);
    }
  } catch (error) {
    console.error(
      `Failed pulling translations with status ${error.response.status}.`
    );
    console.error(error.response.statusText);
  }
})();
