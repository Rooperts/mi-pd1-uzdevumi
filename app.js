const STORAGE_KEY = "pd1-uzdevumi";
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const dueDateInput = document.querySelector("#task-due-date");
const taskList = document.querySelector("#task-list");
const counter = document.querySelector("#counter");
const emptyState = document.querySelector("#empty-state");
const statusMessage = document.querySelector("#status");
const filterButtons = document.querySelectorAll("[data-filter]");

let tasks = loadTasks();
let activeFilter = "all";
let activeTaskEdit = null;

function isValidDueDate(value) {
  if (value === undefined || value === null) return true;
  return typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value;
}

function isValidDueDateEdit(task) {
  const validFlag = task.dueDateEdited === undefined ||
    typeof task.dueDateEdited === "boolean";
  return validFlag && isValidDueDate(task.dueDatePrevious) &&
    (!task.dueDateEdited || Boolean(task.dueDate && task.dueDatePrevious));
}

function isValidTasks(value) {
  if (!Array.isArray(value)) return false;
  const ids = new Set();
  return value.every((task) => {
    const valid = task && typeof task.id === "string" &&
      typeof task.text === "string" && typeof task.done === "boolean" &&
      isValidDueDate(task.dueDate) &&
      isValidDueDateEdit(task) &&
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
  const visibleTasks = tasks
    .filter((task) => activeFilter === "active" ? !task.done :
      activeFilter === "completed" ? task.done : true)
    .map((task, index) => ({ task, index }));
  return visibleTasks.sort(compareVisibleTasks).map(({ task }) => task);
}

function compareVisibleTasks(first, second) {
  const completionOrder = Number(first.task.done) - Number(second.task.done);
  if (completionOrder) return completionOrder;
  const firstDate = first.task.dueDate;
  const secondDate = second.task.dueDate;
  if (firstDate && secondDate && firstDate !== secondDate) {
    return firstDate < secondDate ? -1 : 1;
  }
  if (firstDate && !secondDate) return -1;
  if (!firstDate && secondDate) return 1;
  return first.index - second.index;
}

function getTodayDate() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${today.getFullYear()}-${month}-${day}`;
}

function isTaskOverdue(task) {
  return !task.done && Boolean(task.dueDate) && task.dueDate < getTodayDate();
}

function formatDueDate(date) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("lv-LV");
}

function createDueDateElement(task) {
  if (!task.dueDate) return null;
  const label = document.createElement("span");
  label.className = "task-due-date";
  label.textContent = `Termiņš: ${formatDueDate(task.dueDate)}`;
  if (task.dueDateEdited && task.dueDatePrevious) {
    const chip = document.createElement("span");
    chip.className = "due-date-chip";
    chip.textContent = task.dueDate > task.dueDatePrevious
      ? "Pagarināts"
      : "Termiņš labots";
    label.append(" ", chip);
  }
  if (isTaskOverdue(task)) {
    label.classList.add("is-overdue");
    label.append(" · Nokavēts");
  }
  return label;
}

function createTaskElement(task) {
  const item = document.createElement("li");
  item.className = `task-item${task.done ? " is-done" : ""}`;
  if (isTaskOverdue(task)) item.classList.add("is-overdue");
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

  const dueDate = createDueDateElement(task);
  if (dueDate) item.append(checkbox, text, dueDate, deleteButton);
  else item.append(checkbox, text, deleteButton);
  return item;
}

function renderTasks() {
  activeTaskEdit = null;
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
  const dueDate = dueDateInput.value;
  if (!text) {
    taskInput.focus();
    return;
  }
  tasks.push({ id: createTaskId(), text, done: false, dueDate: dueDate || null });
  taskInput.value = "";
  dueDateInput.value = "";
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
  const target = event.target.closest(".task-text, .task-due-date");
  if (!target || activeTaskEdit) return;
  const item = target.closest(".task-item");
  const task = tasks.find((entry) => entry.id === item.dataset.id);
  if (!task) return;
  activeTaskEdit = createTaskEditFields(task);
  activeTaskEdit.item = item;
  item.querySelector(".task-text").remove();
  item.querySelector(".task-due-date")?.remove();
  item.insertBefore(activeTaskEdit.fields, item.querySelector(".delete-btn"));
  activeTaskEdit.textInput.focus();
  activeTaskEdit.textInput.select();
}

function createTaskEditFields(task) {
  const fields = document.createElement("div");
  fields.className = "task-edit-fields";
  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.className = "task-edit-text";
  textInput.maxLength = 200;
  textInput.value = task.text;
  textInput.setAttribute("aria-label", "Uzdevuma teksts");
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.className = "task-edit-date";
  dateInput.value = task.dueDate || "";
  dateInput.setAttribute("aria-label", "Izpildes datums");
  textInput.addEventListener("blur", handleEditBlur);
  dateInput.addEventListener("blur", handleEditBlur);
  fields.append(textInput, dateInput);
  return { fields, textInput, dateInput };
}

function handleEditKeydown(event) {
  if (!activeTaskEdit ||
      (event.target !== activeTaskEdit.textInput &&
        event.target !== activeTaskEdit.dateInput)) return;
  if (event.key === "Enter") {
    event.preventDefault();
    saveTaskEdit();
  } else if (event.key === "Escape") {
    event.preventDefault();
    cancelTaskEdit();
  }
}

function handleEditBlur(event) {
  if (activeTaskEdit?.fields.contains(event.relatedTarget)) return;
  saveTaskEdit();
}

function updateDueDateEdit(task, previousDate, newDate) {
  if (previousDate && newDate && previousDate !== newDate) {
    task.dueDateEdited = true;
    task.dueDatePrevious = previousDate;
  } else if (!previousDate || !newDate) {
    delete task.dueDateEdited;
    delete task.dueDatePrevious;
  }
}

function saveTaskEdit() {
  if (!activeTaskEdit) return;
  const { textInput, dateInput } = activeTaskEdit;
  const task = tasks.find((entry) => entry.id === activeTaskEdit.item.dataset.id);
  const text = textInput.value.trim();
  if (!text) {
    statusMessage.textContent = "Uzdevuma teksts nevar būt tukšs.";
    textInput.focus();
    return;
  }
  if (!task) return cancelTaskEdit();
  const previousDate = task.dueDate || null;
  const newDate = dateInput.value || null;
  updateDueDateEdit(task, previousDate, newDate);
  task.text = text;
  task.dueDate = newDate;
  activeTaskEdit = null;
  saveTasks();
  renderTasks();
}

function cancelTaskEdit() {
  if (!activeTaskEdit) return;
  activeTaskEdit = null;
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
