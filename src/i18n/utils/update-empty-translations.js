// eslint-disable-next-line @typescript-eslint/no-var-requires
const replace = require("replace-in-file");

try {
  const { hasChanged } = replace.sync({
    files: "src/i18n/messages/nl.json",
    from: /""/g,
    to: "null"
  });

  console.log(hasChanged ? "Translations updated" : "No translations updated");
} catch (error) {
  console.error("Error occurred while updating empty translations:", error);
}
