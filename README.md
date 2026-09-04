# Student Study Planner & Grade Dashboard

Version 2.0 is a browser-based planner for managing courses, assignments, priorities, statuses, and grades. It is built with plain HTML, CSS, and vanilla JavaScript, with no server, database, framework, or external library required.

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
- Optional grades from 0 to 100, with blank grades shown as `Not Graded`.
- Average grade calculated using graded assignments only.
- Dashboard cards for total, completed, remaining, overdue, and average grade.
- Overdue highlighting for unfinished assignments with past due dates.
- Filters for course, priority, and status.
- Version 1 data remains compatible; assignments without a grade are treated as ungraded.

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

## Dashboard Calculations

- **Total Assignments** counts every saved assignment.
- **Completed Assignments** counts assignments with the `Completed` status.
- **Remaining Assignments** equals total assignments minus completed assignments.
- **Overdue Assignments** counts assignments whose due date is before today and whose status is not `Completed`.
- **Average Grade** includes only assignments with a grade. It displays `N/A` when no assignments have grades.

Changing an assignment's status, due date, or grade updates the dashboard automatically.

## Testing Version 2.0

To test the required dashboard scenario:

1. Create one course and five assignments.
2. Mark exactly two assignments as `Completed`.
3. Give one unfinished assignment a due date before today.
4. Give grades to only three assignments, such as `90`, `80`, and `100`.
5. Leave the other two grades blank.
6. Confirm the dashboard shows `5` total, `2` completed, `3` remaining, `1` overdue, and an average grade of `90`.
7. Test each assignment filter and refresh the page to confirm data remains.

## Git History

The Version 1 history is preserved. The release tags are:

- `v1.0` - Version 1 release.
- `v2.0` - Version 2.0 release.

## Version 2 Scope

Version 2.0 includes the grade dashboard and basic assignment filters. It intentionally does not include charts, notifications, dark mode, or a calendar view.