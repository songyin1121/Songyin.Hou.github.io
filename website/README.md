# Songyin Hou — Academic Portfolio

This directory is the static website for CSI205TC Coursework 1, Question 2. Serve it over HTTP so the JavaScript modules load. The user-site target is the root of a GitHub Pages personal site. The standalone 404 links to that root and uses inline styles so nested invalid URLs can display it.

The root document contains the biography, research, publication, projects, technical expertise, and coursework. The two CSS files hold tokens and page styles. JavaScript adds browser interactions. The local SVG files are original conceptual art. There are no external runtime dependencies, font downloads or trackers.

For local testing start `../tests/serve.py` with Python 3. By default the preview server binds only to `127.0.0.1:8765` and adds local academic figures to the HTML response. Pass `--public-preview` to see the static release candidate. The deployable configuration keeps academic values and contact channels disabled pending review. Add CV controls only after placing an approved PDF in `assets/documents/` and updating `js/config.js`.

Only this directory is intended for potential release. The coursework tests, screenshots and local preview data are outside it.
