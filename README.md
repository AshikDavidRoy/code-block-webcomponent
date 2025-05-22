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

2. Include the files in your project:

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

---
