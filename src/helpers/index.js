let sanitizeHTML = require("sanitize-html");

export default {
  camelCase(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  },
  sanitizeHtml(dirtyValue) {
    if (dirtyValue) {
      return sanitizeHTML(dirtyValue, {
        allowedTags: sanitizeHTML.defaults.allowedTags.concat(["img", "span"]),
        allowedAttributes: {
          "*": [
            "href",
            "align",
            "alt",
            "center",
            "bgcolor",
            "name",
            "target",
            "src",
            "style",
            "class",
          ],
        },
      });
    }
  },
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};
