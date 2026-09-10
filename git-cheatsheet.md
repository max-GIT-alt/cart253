# Git Quick Reference — Hello World Challenge

A quick cheatsheet for the steps in the challenge.

## 1. Clone your repository

```bash
git clone https://github.com/max-GIT-alt/cart253.git
cd cart253
```

## 2. Make changes

Edit `README.md` in your text editor (e.g. VS Code, Sublime Text).

## 3. Check what changed

```bash
git status
git diff
```

## 4. Stage and commit your changes

```bash
git add README.md
git commit -m "Update README with formatting and an image"
```

Write a **good commit message**: short, clear, and describes *what* changed (not "stuff" or "update").

## 5. Push to GitHub

```bash
git push
```

## 6. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** > **Pages**
3. Under "Source", choose the `main` branch and `/ (root)` folder
4. Save, then wait a minute or two
5. Your site will be live at:
   `https://max-GIT-alt.github.io/cart253`

## Common Markdown Syntax

| Syntax | Result |
|---|---|
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `` `code` `` | `code` |
| `# Heading 1` | Large heading |
| `## Heading 2` | Medium heading |
| `- item` | Bullet list |
| `[text](url)` | Link |
| `![alt](url)` | Image |

See the full [Markdown Guide](https://www.markdownguide.org/) for more.
