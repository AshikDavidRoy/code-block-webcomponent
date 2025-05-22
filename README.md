# 💻 Custom Code Block Web Component

A lightweight, reusable `<code-block>` Web Component built with vanilla JS, featuring:

- ✨ Syntax highlighting (via Highlight.js)
- ✅ Copy-to-clipboard support
- 📏 Custom width and height
- 🎯 Language tag display
- 🧮 Line numbers
- 🌙 Dark theme aesthetics
- 🧩 Fully customizable and embeddable

---

## 🚀 Demo

```html
<code-block language="javascript" width="600px">
function greet(name) {
  return `Hello, ${name}`;
}
</code-block>
````

---

## 📦 Installation

1. Clone the repo:

```bash
git clone https://github.com/AshikDavidRoy/code-block-webcomponent.git
```

2. Include the files in the project:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/languages/javascript.min.js"></script>
<script src="code-block.js" defer></script>
```

---

## 🧪 Usage

```html
<code-block language="python" width="500px" height="auto">
def greet(name):
    return f"Hello, {name}!"
</code-block>
```

### ✅ Attributes

| Attribute  | Description                                              | Default     |
| ---------- | -------------------------------------------------------- | ----------- |
| `language` | Highlight.js language type (e.g., `js`, `css`, `python`) | `plaintext` |
| `width`    | Width of the code block                                  | `90%`       |
| `height`   | Optional max-height                                      | `auto`      |

---

## 🔧 Features

* ✔️ Pure Web Component (no frameworks)
* ✔️ Dark syntax highlighting via `atom-one-dark`
* ✔️ Line numbers
* ✔️ Copy button with animation
* ✔️ Responsive and customizable

---

## 📁 Folder Structure

```
code-block-webcomponent/
├── index.html
├── code-block.js
├── README.md
```

# **Detailed Explanation of the Code**

---

## **HTML file**

```html
<!DOCTYPE html>
<html lang="en">
```

* **`<!DOCTYPE html>`** — Declares the document as HTML5.
* **`<html lang="en">`** — Root element of the document with English language declared.

---

```html
<head>
    <meta charset="UTF-8">
    <title>Reusable Code Block</title>
```

* **`<meta charset="UTF-8">`** — Sets character encoding to UTF-8 for universal text support.
* **`<title>`** — Sets the browser tab title.

---

```html
    <!-- Highlight.js core and language support -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/languages/javascript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/languages/python.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/languages/css.min.js"></script>
```

* **Highlight.js scripts** — These load the core syntax highlighting library and individual language definitions for JavaScript, Python, and CSS. These scripts enable syntax highlighting in the code blocks.

---

```html
    <!-- component logic -->
    <script src="code-block.js" defer></script>
</head>
```

* **`<script src="code-block.js" defer></script>`** — Loads the custom web component script.
* The **`defer`** attribute:

  * Instructs the browser to download the script *in parallel* with parsing HTML.
  * Delays script execution *until after* the full HTML document is parsed.
  * This prevents the script from blocking page rendering and ensures that all DOM elements exist before the script runs.

---

```html
<body style="margin: 0; font-family: sans-serif; background: #121212; color: white;">
```

* **`<body>`** with inline styles:

  * Removes default margin.
  * Sets font to a clean sans-serif for readability.
  * Uses a dark background (`#121212`) with white text, consistent with the dark theme.

---

```html
<h1 style="text-align: center; margin-top: 40px;">Reusable Code Blocks</h1>
```

* A centered heading with top margin.

---

```html
<code-block language="css" width="600px" height="auto">
    .code-container {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    }
</code-block>
```

* Custom element `<code-block>` with:

  * **`language="css"`** — syntax highlighting for CSS.
  * **`width="600px"` and `height="auto"`** — dimensions of the code block.
  * The inner content is the code snippet displayed.

---

```html
<code-block language="python" width="500px">
    def greet(name):
    return f"Hello, {name}!
</code-block>

<code-block language="javascript" width="600px" height="auto">
    function sum(a, b) {
    return a + b;
    }
    console.log(sum(3, 4));
</code-block>
```

* More `<code-block>` instances for Python and JavaScript snippets with different widths.

---

```html
</body>
</html>
```

* Closing tags for body and html.

---

# **JavaScript file: `code-block.js`**

---

```js
class CodeBlock extends HTMLElement {
```

* Defines a new **custom HTML element** called `<code-block>` by extending the native `HTMLElement`.

---

```js
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
```

* The **constructor** runs when a new `<code-block>` element is created.
* **`super()`** calls the parent constructor (`HTMLElement`).
* **`this.attachShadow({ mode: "open" })`** attaches a **Shadow DOM** to encapsulate the component's markup and styles, preventing CSS bleed from outside.
* `mode: "open"` means the shadow DOM can be accessed from outside with JavaScript if needed.

---

```js
  connectedCallback() {
```

* The **connectedCallback** lifecycle method is invoked automatically when the element is added to the DOM.
* This is where you initialize the element’s inner content, styles, and behavior.

---

```js
    const language = this.getAttribute("language") || "plaintext";
    const width = this.getAttribute("width") || "90%";
    const height = this.getAttribute("height") || "auto";
```

* Reads attributes from the element:

  * `language` for syntax highlighting, defaults to `"plaintext"` if not set.
  * `width` and `height` control the dimensions of the code block, with fallback defaults.

---

```js
    const style = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
:host {
  display: flex;
  justify-content: center;
  margin: 30px 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.code-container {
  width: ${width};
  height: ${height};
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Header styling for language tag and copy button */
.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #1f1f1f;
  color: #ddd;
  font-size: 14px;
}

.language-tag {
  background-color: #333;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  text-transform: uppercase;
}

.copy-btn {
  background: #2e2e2e;
  color: #ccc;
  border: none;
  padding: 5px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}

.copy-btn:hover {
  background: #444;
}

.code-wrapper {
  display: flex;
  background-color: #282c34;
  overflow: auto;
  max-height: 400px;
}

/* Line numbers styling */
.line-numbers {
  background-color: #1f1f1f;
  color: #777;
  padding: 20px 10px;
  text-align: right;
  user-select: none;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.6;
}

pre {
  margin: 0;
  padding: 20px;
  overflow: auto;
}

code {
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  color: #fff;
  display: block;
  line-height: 1.6;
  white-space: pre;
}
</style>`;
```

* Defines all CSS styles and imports external CSS files for:

  * **Highlight.js dark theme** (`atom-one-dark`).
  * **Font Awesome icons** (used for copy icon).
* Styles scoped inside shadow DOM using `<style>`.
* `:host` selector targets the custom element itself.
* `.code-container` holds the full code block, with configurable width/height and dark background.
* `.code-header` contains the language label and copy button.
* `.line-numbers` shows the line numbers alongside the code.
* `.code-wrapper` wraps the lines and code area with scrolling enabled.
* The styles use dark tones to fit the dark theme.

---

```js
    const html = `
<div class="code-container">
  <div class="code-header">
    <span class="language-tag">${language}</span>
    <button class="copy-btn">
      <i class="far fa-copy"></i>
      <span>Copy</span>
    </button>
  </div>
  <div class="code-wrapper">
    <div class="line-numbers"></div>
    <pre><code class="language-${language}"></code></pre>
  </div>
</div>
<slot style="display: none;"></slot>
`;
```

* Defines the **HTML structure** inside shadow DOM:

  * `.code-container`: main wrapper.
  * `.code-header`: top bar with language tag and copy button.
  * `.code-wrapper`: container for line numbers and code content.
  * `.line-numbers`: empty div where line numbers will be injected.
  * `<pre><code>`: where highlighted code will appear.
* A **hidden `<slot>`** is used to hold the original inner HTML (the user’s code snippet) for later processing.

---

```js
    this.shadowRoot.innerHTML = style + html;
```

* Injects styles and HTML into the component’s shadow DOM.

---

```js
    // Wait until slot content is ready
    requestAnimationFrame(() => {
```

* Uses `requestAnimationFrame` to defer code execution until after the browser paints.
* This ensures the element’s content is fully parsed and accessible.

---

```js
      const rawCode = this.innerHTML.trim().replace(/^\n/, "");
```

* Gets the **raw code snippet** from the component’s inner HTML (the text inside `<code-block>`).
* `trim()` removes whitespace from start and end.
* `.replace(/^\n/, "")` removes a leading newline if present.

---

```js
      const lines = rawCode.split("\n");
      const lineNumberHTML = lines.map((_, i) => i + 1).join("<br>");
```

* Splits the code into lines.
* Generates a string of line numbers separated by `<br>` tags to display vertically.

---

```js
      const highlighted = hljs.highlight(rawCode, { language }).value;
```

* Uses Highlight.js to **highlight the raw code** for the given language.
* `.value` contains the HTML with syntax coloring.

---

```js
      this.shadowRoot.querySelector(".line-numbers").innerHTML = lineNumberHTML;
      this.shadowRoot.querySelector("code").innerHTML = highlighted;
```

* Injects the line numbers and highlighted code into the shadow DOM elements.

---

```js
      const button = this.shadowRoot.querySelector(".copy-btn");
      button.addEventListener("click", () => {
        navigator.clipboard.writeText(rawCode).then(() => {
          button.innerHTML = '<i class="fas fa-check"></i><span>Copied</span>';
          setTimeout(() => {
            button.innerHTML = '<i class="far fa-copy"></i><span>Copy</span>';
          }, 2000);
        });
      });
```

* Adds a click event listener to the copy button.
* Uses the **Clipboard API** (`navigator.clipboard.writeText`) to copy the raw code to the clipboard.
* Shows a checkmark and “Copied” message temporarily, then reverts back to the copy icon/text.

---

```js
    });
  }
}

customElements.define("code-block", CodeBlock);
```

* Closes the `requestAnimationFrame` callback, `connectedCallback`, and class.
* Registers the new `<code-block>` element globally so it can be used anywhere in the HTML.

---

# **Concepts Recap**

### **Shadow DOM**

* Encapsulates styles and markup.
* Prevents interference from outside styles.
* Allows reusable, modular components.

### **Custom Elements**

* Create your own HTML tags with full functionality.
* Life cycle callbacks like `connectedCallback` enable initialization.

### **Highlight.js**

* Provides syntax highlighting.
* You load languages you want and apply highlighting dynamically.

### **Clipboard API**

* Provides programmatic access to the system clipboard.
* Requires user interaction to allow copying.

### **`defer` attribute**

* Loads script asynchronously.
* Executes script after HTML parsing.
* Improves page load performance and avoids blocking.

### **requestAnimationFrame**

* Defers execution to the next browser repaint.
* Helps when you want to wait for the DOM and rendering to settle.

---

# **Summary**

This component is a reusable, encapsulated block for displaying syntax-highlighted code with:

* Dark-themed styling.
* Language tag.
* Line numbers.
* Copy button with feedback.
* Flexible sizing.
* Uses modern web APIs and best practices.

---
