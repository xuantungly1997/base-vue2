export const restrict = {
  bind(el, binding, vnode) {
    el.addEventListener("keydown", (e) => {
      // delete, backspace, tab, escape, enter,
      let special = [46, 8, 9, 27, 13];
      if (binding.modifiers["decimal"]) {
        // decimal(numpad), period
        special.push(110, 190);
      }
      // special from above
      if (
        special.indexOf(e.keyCode) !== -1 ||
        // Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        // Ctrl+C
        (e.keyCode === 67 && e.ctrlKey === true) ||
        // Ctrl+X
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Ctrl+V
        (e.keyCode === 86 && e.ctrlKey === true) ||
        // home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
        return; // allow
      }
      if (
        binding.modifiers["alpha"] &&
        // a-z/A-Z
        e.keyCode >= 65 &&
        e.keyCode <= 90
      ) {
        return; // allow
      }
      if (
        binding.modifiers["number"] &&
        ((!e.shiftKey && e.keyCode >= 48 && e.keyCode <= 57) ||
          (e.keyCode >= 96 && e.keyCode <= 105))
      ) {
        return; // allow
      }
      e.preventDefault(); // prevent
    });

    // eslint-disable-next-line no-unused-vars
    el.addEventListener("input", function (e) {
      if (!binding.modifiers["number"] || binding.modifiers["decimal"]) {
        return;
      }
      let value = this.value;
      let cursor = this.selectionStart;
      value = value.replace(/[^0-9]/g, "");
      let formatted = "";
      for (let i = 0, n = value.length; i < n; i++) {
        if (i && i % 4 === 0) {
          if (formatted.length <= cursor) cursor++;
        }
        formatted += value[i];
      }
      if (formatted === this.value) return false;
      this.value = formatted;
      this.selectionEnd = cursor;
      let event = new Event("input", { bubbles: true });
      vnode.elm.dispatchEvent(event); // added this
    });
  },
};

export const phoneNumber = {
  bind(el, binding, vnode) {
    // eslint-disable-next-line no-unused-vars
    function onInput(e) {
      let value = this.value;
      let cursor = this.selectionStart;
      let matches = value.substring(0, cursor).match(/[^0-9]/g);
      if (matches) cursor -= matches.length;
      value = value.replace(/[^0-9]/g, "").substring(0, 11);
      let formatted = "";
      let pos = 3;
      for (let i = 0, n = value.length; i < n; i++) {
        if (i && i % pos === 0) {
          if (formatted.length <= cursor) cursor++;
          formatted += "-";
          pos = pos + 4;
        }
        formatted += value[i];
      }

      if (formatted === this.value) return false;

      this.value = formatted;
      this.selectionEnd = cursor;
      let event = new Event("input", { bubbles: true });
      vnode.elm.dispatchEvent(event); // added this
    }

    function onKeyDown(e) {
      let cursor = this.selectionStart;
      if (this.selectionEnd !== cursor) return;
      if (e.which === 46) {
        if (this.value[cursor] === " ") this.selectionStart++;
      } else if (e.which === 8) {
        if (cursor && this.value[cursor - 1] === " ") this.selectionEnd--;
      }
    }

    el.addEventListener("keydown", onKeyDown);
    el.addEventListener("input", onInput);
  },
};

export const lazyload = {
  // eslint-disable-next-line no-unused-vars
  inserted: (el, binding, vnode) => {
    function loadImage() {
      let originOpacity;
      let imageElement = Array.from(el.children).find(
        (el) => el.nodeName === "IMG"
      );
      if (!imageElement) {
        imageElement = el;
      }
      if (imageElement) {
        imageElement.addEventListener("load", () => {
          setTimeout(() => {
            el.classList.add("loaded");
            el.style.opacity = originOpacity;
          }, 16);
        });
        imageElement.addEventListener("error", () => console.log("error"));
        imageElement.src = binding.value;
        originOpacity = imageElement.style.opacity;
        imageElement.style.opacity = 0;
      }
    }

    function handleIntersect(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage();
          observer.unobserve(el);
        }
      });
    }

    function createObserver() {
      const options = {
        root: null,
        threshold: "0",
      };
      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(el);
    }

    if (window["IntersectionObserver"]) {
      createObserver();
    } else {
      loadImage();
    }
  },
};
