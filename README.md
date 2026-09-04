# Student Study Planner & Grade Dashboard

Version 1 is a simple browser-based planner for managing courses and assignments. It is built with plain HTML, CSS, and vanilla JavaScript, with no server or database required.

## Features

- Add, edit, and delete courses.
- Store a course name, course code, and instructor.
- Add, edit, and delete assignments.
- Assign each assignment to a course.
- Set due dates, priorities, and statuses.
- Change priority and status directly in the assignments table.
- Use confirmation prompts before deleting records.
- Validate required course and assignment fields.
- Save courses and assignments in browser `localStorage`.
- Responsive layout for desktop and smaller screens.

## Files

- `index.html` - Page structure and form controls.
- `style.css` - Dashboard layout, responsive styles, and visual states.
- `script.js` - Course and assignment logic, rendering, validation, and localStorage.

## Running the App

No installation or build step is needed.

1. Open `index.html` in a web browser.
2. Select **Add Course** and enter the course details.
3. Select **Add Assignment** after creating at least one course.
4. Use the edit and delete controls to manage saved information.

The app also works when opened directly from the file system. A local development server may be used if preferred.

## Data Storage

The app stores data locally in the current browser using `localStorage`:

- `studentStudyPlannerCourses`
- `studentStudyPlannerAssignments`

Data remains available after refreshing or closing the browser, as long as the browser's site data is not cleared. Data is stored only on the device and browser where it was entered.

## Version 1 Scope

Version 1 intentionally does not include grade calculations, averages, statistics, charts, search, advanced filters, notifications, dark mode, or a calendar view. These can be considered for a future version.