#!/bin/bash
set -e
cd "$(dirname "$0")"
git add -A
git commit -m "Add complete Third Room static site for GitHub Pages.

Pure HTML/CSS/JS philosophy archive with articles, discussions, reading lists, topics, templates, search index, and SEO files."
git push origin main
git log -1 --oneline
