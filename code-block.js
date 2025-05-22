class CodeBlock extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static loadHighlightJS() {
        if (!window.hljsLoading) {
            window.hljsLoading = new Promise((resolve) => {
                const addScript = (src) =>
                    new Promise((res) => {
                        const script = document.createElement("script");
                        script.src = src;
                        script.onload = res;
                        document.head.appendChild(script);
                    });

                // We won’t add CSS to document.head for highlight.js, only font-awesome.
                const addCSS = (href, target) => {
                    const link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href = href;
                    target.appendChild(link);
                };

                addCSS("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css", document.head);

                Promise.all([
                    addScript("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"),
                ]).then(() => {
                    resolve();
                });
            });
        }

        return window.hljsLoading;
    }

    connectedCallback() {
        const language = this.getAttribute("language") || "auto";
        const width = this.getAttribute("width") || "90%";
        const height = this.getAttribute("height") || "auto";

        // The style includes highlight.js CSS injected inside shadow root
        // We'll add the highlight.js stylesheet via a <link> in shadowRoot too
        const style = `
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
  width: 100%;
}

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
  flex: 1;
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

        const html = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css">
<div class="code-container">
  <div class="code-header">
    <span class="language-tag">${language === "auto" ? "Auto" : language}</span>
    <button class="copy-btn">
      <i class="far fa-copy"></i>
      <span>Copy</span>
    </button>
  </div>
  <div class="code-wrapper">
    <div class="line-numbers"></div>
    <pre><code class="language-${language !== "auto" ? language : ""}"></code></pre>
  </div>
</div>
<slot style="display: none;"></slot>
`;

        this.shadowRoot.innerHTML = style + html;

        CodeBlock.loadHighlightJS().then(() => {
            const rawCode = this.innerHTML.trim().replace(/^\n/, "");
            const lines = rawCode.split("\n");
            const lineNumberHTML = lines.map((_, i) => i + 1).join("<br>");

            const codeEl = this.shadowRoot.querySelector("code");
            this.shadowRoot.querySelector(".line-numbers").innerHTML = lineNumberHTML;

            if (language === "auto") {
                const result = hljs.highlightAuto(rawCode);
                codeEl.innerHTML = result.value;
            } else {
                codeEl.textContent = rawCode;
                hljs.highlightElement(codeEl);
            }

            const button = this.shadowRoot.querySelector(".copy-btn");
            button.addEventListener("click", () => {
                navigator.clipboard.writeText(rawCode).then(() => {
                    button.innerHTML = '<i class="fas fa-check"></i><span>Copied</span>';
                    setTimeout(() => {
                        button.innerHTML = '<i class="far fa-copy"></i><span>Copy</span>';
                    }, 2000);
                });
            });
        });
    }
}

customElements.define("code-block", CodeBlock);
