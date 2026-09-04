const COURSES_KEY = 'studentStudyPlannerCourses';
const ASSIGNMENTS_KEY = 'studentStudyPlannerAssignments';

let courses = [];
let assignments = [];
let editingCourseId = null;
let editingAssignmentId = null;

const courseForm = document.querySelector('#course-form');
const assignmentForm = document.querySelector('#assignment-form');
const courseList = document.querySelector('#course-list');
const assignmentList = document.querySelector('#assignment-list');

document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
  loadData();
  bindEvents();
  renderCourses();
  renderAssignments();
}

// localStorage keeps the planner available after a refresh or browser restart.
function loadData() {
  courses = readStoredArray(COURSES_KEY);
  assignments = readStoredArray(ASSIGNMENTS_KEY);
}

function readStoredArray(key) {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : [];
  } catch (error) {
    return [];
  }
}

function saveData() {
  localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
  localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments));
}

function bindEvents() {
  document.querySelector('#show-course-form').addEventListener('click', () => openCourseForm());
  document.querySelector('#show-assignment-form').addEventListener('click', () => openAssignmentForm());
  document.querySelector('#cancel-course').addEventListener('click', closeCourseForm);
  document.querySelector('#cancel-course-secondary').addEventListener('click', closeCourseForm);
  document.querySelector('#cancel-assignment').addEventListener('click', closeAssignmentForm);
  document.querySelector('#cancel-assignment-secondary').addEventListener('click', closeAssignmentForm);
  courseForm.addEventListener('submit', handleCourseSubmit);
  assignmentForm.addEventListener('submit', handleAssignmentSubmit);
  courseList.addEventListener('click', handleCourseActions);
  assignmentList.addEventListener('click', handleAssignmentActions);
  assignmentList.addEventListener('change', handleAssignmentChange);
}

function openCourseForm(course = null) {
  editingCourseId = course ? course.id : null;
  document.querySelector('#course-form-title').textContent = course ? 'Edit course' : 'Add a course';
  document.querySelector('#course-name').value = course ? course.name : '';
  document.querySelector('#course-code').value = course ? course.code : '';
  document.querySelector('#instructor-name').value = course ? course.instructor : '';
  document.querySelector('#course-message').textContent = '';
  courseForm.classList.remove('hidden');
  document.querySelector('#course-name').focus();
}

function closeCourseForm() { courseForm.classList.add('hidden'); editingCourseId = null; }

function handleCourseSubmit(event) {
  event.preventDefault();
  const name = document.querySelector('#course-name').value.trim();
  const code = document.querySelector('#course-code').value.trim();
  const instructor = document.querySelector('#instructor-name').value.trim();
  if (!name || !code || !instructor) { document.querySelector('#course-message').textContent = 'Please complete the course name, code, and instructor fields.'; return; }
  if (editingCourseId) {
    const course = courses.find(item => item.id === editingCourseId);
    Object.assign(course, { name, code, instructor });
  } else { courses.push({ id: createId(), name, code, instructor }); }
  saveData(); renderCourses(); renderAssignments(); closeCourseForm();
}

function renderCourses() {
  courseList.innerHTML = courses.map(course => `<article class="course-card"><span class="course-code">${escapeHtml(course.code)}</span><h3>${escapeHtml(course.name)}</h3><p class="course-instructor">${escapeHtml(course.instructor)}</p><div class="card-actions"><button class="button button-quiet button-small" data-action="edit" data-id="${course.id}" type="button">Edit</button><button class="button button-danger button-small" data-action="delete" data-id="${course.id}" type="button">Delete</button></div></article>`).join('');
  document.querySelector('#course-empty').classList.toggle('hidden', courses.length > 0);
  updateCourseOptions();
}

function handleCourseActions(event) {
  const button = event.target.closest('button'); if (!button) return;
  const course = courses.find(item => item.id === button.dataset.id); if (!course) return;
  if (button.dataset.action === 'edit') openCourseForm(course);
  if (button.dataset.action === 'delete') deleteCourse(course);
}

function deleteCourse(course) {
  if (!confirm(`Delete ${course.name}? Its assignments will also be removed.`)) return;
  courses = courses.filter(item => item.id !== course.id);
  assignments = assignments.filter(item => item.courseId !== course.id);
  saveData(); renderCourses(); renderAssignments();
}

function openAssignmentForm(assignment = null) {
  if (!assignment && courses.length === 0) { alert('Please create a course before adding an assignment.'); return; }
  editingAssignmentId = assignment ? assignment.id : null;
  document.querySelector('#assignment-form-title').textContent = assignment ? 'Edit assignment' : 'Add an assignment';
  updateCourseOptions(assignment ? assignment.courseId : '');
  document.querySelector('#assignment-name').value = assignment ? assignment.name : '';
  document.querySelector('#assignment-course').value = assignment ? assignment.courseId : '';
  document.querySelector('#due-date').value = assignment ? assignment.dueDate : '';
  document.querySelector('#priority').value = assignment ? assignment.priority : 'Medium';
  document.querySelector('#status').value = assignment ? assignment.status : 'Not Started';
  document.querySelector('#assignment-message').textContent = '';
  assignmentForm.classList.remove('hidden'); document.querySelector('#assignment-name').focus();
}

function closeAssignmentForm() { assignmentForm.classList.add('hidden'); editingAssignmentId = null; }

function updateCourseOptions(selectedId = '') {
  const courseSelect = document.querySelector('#assignment-course');
  courseSelect.innerHTML = '<option value="">Select a course</option>' + courses.map(course => `<option value="${course.id}">${escapeHtml(course.code)} - ${escapeHtml(course.name)}</option>`).join('');
  if (selectedId) courseSelect.value = selectedId;
}

function handleAssignmentSubmit(event) {
  event.preventDefault();
  const name = document.querySelector('#assignment-name').value.trim();
  const courseId = document.querySelector('#assignment-course').value;
  const dueDate = document.querySelector('#due-date').value;
  const priority = document.querySelector('#priority').value;
  const status = document.querySelector('#status').value;
  if (!name || !courseId || !dueDate) { document.querySelector('#assignment-message').textContent = 'Please complete the assignment name, course, and due date fields.'; return; }
  const assignmentData = { name, courseId, dueDate, priority, status };
  if (editingAssignmentId) Object.assign(assignments.find(item => item.id === editingAssignmentId), assignmentData);
  else assignments.push({ id: createId(), ...assignmentData });
  saveData(); renderAssignments(); closeAssignmentForm();
}

function renderAssignments() {
  assignmentList.innerHTML = assignments.map(assignment => {
    const course = courses.find(item => item.id === assignment.courseId);
    const priorityClass = `priority-${assignment.priority.toLowerCase()}`;
    const statusOptions = ['Not Started', 'In Progress', 'Completed'].map(status => `<option ${status === assignment.status ? 'selected' : ''}>${status}</option>`).join('');
    return `<tr class="${assignment.status === 'Completed' ? 'assignment-completed' : ''}"><td>${escapeHtml(assignment.name)}</td><td>${course ? escapeHtml(course.code) : 'Course removed'}</td><td>${formatDate(assignment.dueDate)}</td><td><select class="priority-badge ${priorityClass}" data-field="priority" data-id="${assignment.id}" aria-label="Change priority for ${escapeHtml(assignment.name)}"><option>Low</option><option>Medium</option><option>High</option></select></td><td><select class="status-select" data-field="status" data-id="${assignment.id}" aria-label="Change status for ${escapeHtml(assignment.name)}">${statusOptions}</select></td><td><div class="action-group"><button class="button button-quiet button-small" data-action="edit" data-id="${assignment.id}" type="button">Edit</button><button class="button button-danger button-small" data-action="delete" data-id="${assignment.id}" type="button">Delete</button></div></td></tr>`;
  }).join('');
  assignments.forEach(assignment => { const select = assignmentList.querySelector(`[data-field="priority"][data-id="${assignment.id}"]`); if (select) select.value = assignment.priority; });
  document.querySelector('#assignment-empty').classList.toggle('hidden', assignments.length > 0);
}

function handleAssignmentActions(event) {
  const button = event.target.closest('button'); if (!button) return;
  const assignment = assignments.find(item => item.id === button.dataset.id); if (!assignment) return;
  if (button.dataset.action === 'edit') openAssignmentForm(assignment);
  if (button.dataset.action === 'delete') deleteAssignment(assignment);
}

function handleAssignmentChange(event) {
  const select = event.target.closest('select'); if (!select) return;
  const assignment = assignments.find(item => item.id === select.dataset.id); if (!assignment) return;
  assignment[select.dataset.field] = select.value; saveData(); renderAssignments();
}

function deleteAssignment(assignment) { if (!confirm(`Delete ${assignment.name}?`)) return; assignments = assignments.filter(item => item.id !== assignment.id); saveData(); renderAssignments(); }
function createId() { return `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function formatDate(date) { return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }); }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character])); }