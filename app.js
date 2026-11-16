const STORAGE_KEY = "pd1-uzdevumi";
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const counter = document.querySelector("#counter");
const emptyState = document.querySelector("#empty-state");
const statusMessage = document.querySelector("#status");
const filterButtons = document.querySelectorAll("[data-filter]");

let tasks = loadTasks();
let activeFilter = "all";

function isValidTasks(value) {
  if (!Array.isArray(value)) return false;
  const ids = new Set();
  return value.every((task) => {
    const valid = task && typeof task.id === "string" &&
      typeof task.text === "string" && typeof task.done === "boolean" &&
      !ids.has(task.id);
    if (valid) ids.add(task.id);
    return valid;
  });
}

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return [];
    const parsed = JSON.parse(saved);
    if (isValidTasks(parsed)) return parsed;
    statusMessage.textContent = "Saglabāto uzdevumu dati nav derīgi.";
  } catch (error) {
    statusMessage.textContent = "Neizdevās nolasīt saglabātos uzdevumus.";
    console.error(error);
  }
  return [];
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    statusMessage.textContent = "";
  } catch (error) {
    statusMessage.textContent = "Neizdevās saglabāt izmaiņas pārlūkprogrammā.";
    console.error(error);
  }
}

function createTaskId() {
  let id = "";
  do {
    id = globalThis.crypto?.randomUUID
      ? globalThis.crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`;
  } while (tasks.some((task) => task.id === id));
  return id;
}

function getVisibleTasks() {
  if (activeFilter === "active") return tasks.filter((task) => !task.done);
  if (activeFilter === "completed") return tasks.filter((task) => task.done);
  return tasks;
}

function createTaskElement(task) {
  const item = document.createElement("li");
  item.className = `task-item${task.done ? " is-done" : ""}`;
  item.dataset.id = task.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.done;
  const action = task.done ? "Atzīmēt kā neizpildītu" : "Atzīmēt kā izpildītu";
  checkbox.setAttribute("aria-label", `${action}: “${task.text}”`);

  const text = document.createElement("span");
  text.className = "task-text";
  text.textContent = task.text;

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.type = "button";
  deleteButton.dataset.action = "delete";
  deleteButton.textContent = "Dzēst";
  deleteButton.setAttribute("aria-label", `Dzēst uzdevumu “${task.text}”`);

  item.append(checkbox, text, deleteButton);
  return item;
}

function renderTasks() {
  const visibleTasks = getVisibleTasks();
  taskList.replaceChildren(...visibleTasks.map(createTaskElement));
  emptyState.hidden = visibleTasks.length > 0;
  emptyState.textContent = tasks.length === 0
    ? "Pagaidām nav neviena uzdevuma. Pievieno pirmo!"
    : "Šajā filtrā uzdevumu nav.";
  counter.textContent = `Atlikuši ${tasks.filter((task) => !task.done).length} uzdevumi`;
}

function addTask(event) {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) {
    taskInput.focus();
    return;
  }
  tasks.push({ id: createTaskId(), text, done: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
  taskInput.focus();
}

function updateTaskCompletion(event) {
  if (event.target.type !== "checkbox") return;
  const item = event.target.closest(".task-item");
  const task = tasks.find((entry) => entry.id === item.dataset.id);
  if (!task) return;
  task.done = event.target.checked;
  saveTasks();
  renderTasks();
}

function deleteTask(event) {
  const button = event.target.closest('[data-action="delete"]');
  if (!button) return;
  const item = button.closest(".task-item");
  tasks = tasks.filter((task) => task.id !== item.dataset.id);
  saveTasks();
  renderTasks();
}

function selectFilter(event) {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  filterButtons.forEach((filterButton) => {
    const selected = filterButton === button;
    filterButton.classList.toggle("is-active", selected);
    filterButton.setAttribute("aria-pressed", String(selected));
  });
  renderTasks();
}

function beginTaskEdit(event) {
  const text = event.target.closest(".task-text");
  if (!text || event.target.closest(".task-edit-input")) return;
  const input = document.createElement("input");
  input.type = "text";
  input.className = "task-edit-input";
  input.maxLength = 200;
  input.value = text.textContent;
  input.setAttribute("aria-label", "Rediģēt uzdevumu");
  text.replaceWith(input);
  input.focus();
  input.select();
}

function handleEditKeydown(event) {
  if (!event.target.matches(".task-edit-input")) return;
  if (event.key === "Enter") {
    event.preventDefault();
    saveTaskEdit(event.target);
  } else if (event.key === "Escape") {
    event.preventDefault();
    cancelTaskEdit();
  }
}

function saveTaskEdit(input) {
  const item = input.closest(".task-item");
  const task = tasks.find((entry) => entry.id === item.dataset.id);
  const text = input.value.trim();
  if (!text) {
    statusMessage.textContent = "Uzdevuma teksts nevar būt tukšs.";
    input.focus();
    return;
  }
  task.text = text;
  saveTasks();
  renderTasks();
}

function cancelTaskEdit() {
  if (statusMessage.textContent === "Uzdevuma teksts nevar būt tukšs.") {
    statusMessage.textContent = "";
  }
  renderTasks();
}

taskForm.addEventListener("submit", addTask);
taskList.addEventListener("change", updateTaskCompletion);
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("dblclick", beginTaskEdit);
taskList.addEventListener("keydown", handleEditKeydown);
document.querySelector(".filters").addEventListener("click", selectFilter);

renderTasks();
