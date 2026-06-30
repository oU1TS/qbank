# oU1TS QBank - Single Page Application (SPA)

A modern, highly responsive Single Page Application (SPA) for the Daffodil International University past exam question bank catalog. This application is a refined, premium recreation of the original service.

Reference website: [DIUQBank](https://diuqbank.com/)

## Features

- **Consolidated SPA Navigation**: Instantly switch between Home, Questions catalog, Contributors, About, and Contact sections without reloading the page.
- **Smart Catalog Filtering & Search**: Search past papers by course name or filter results dynamically by Department, Course, Semester, and Exam Type.
- **Fully Responsive Navigation**: Slide-out hamburger navigation menu drawer for all mobile screens.
- **Vibrant Dual-Theme Interface**: Seamless Light and Dark mode toggle preserving user settings in local storage.
- **Submissions & Modal Forms**: Upload new past exam papers via interactive validation modal windows and send messages using clean contact sheets with instant toast messages.

## Technology Stack

- **Structure**: Semantic HTML5 markup
- **Styling**: Modern, custom CSS (packaged in `style.css`) with theme tokens, custom animations, transitions, and flexible grids
- **Behavior**: Vanilla JavaScript (packaged in `app.js`) handling hash routing, mock databases, filter algorithms, and event triggers

## Project Structure

- `index.html` - Unified SPA structure and navigation anchors.
- `style.css` - Custom styling declarations, animations, variables, layout parameters, and media query breakpoints.
- `app.js` - Mock database array, search input listeners, dropdown generators, theme toggler, modal controllers, and toast managers.