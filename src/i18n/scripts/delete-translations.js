const fs = require("fs");
const path = require("path");

(async () => {
  try {
    await fs.unlinkSync(path.resolve(__dirname, "../messages/nl.json"));

    console.log("Translations file removed.");
  } catch (error) {
    console.log("Translations file not found.");
    console.error(error);
  }
})();
