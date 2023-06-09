let tasks = [];

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputText = document.querySelector("#text");
  const inputId = document.querySelector("#id");

  if (inputId.value) {
    tasks.forEach((task) => {
      if (task.id == inputId.value) {
        task.text = inputText.value;
      }
    });
  } else {
    tasks.push({
      id: Date.now(),
      text: inputText.value,
      complete: false,
    });
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  inputText.value = "";
  inputId.value = "";

  renderTasks();
});

const renderTasks = () => {
  tasks = JSON.parse(localStorage.getItem("tasks") || []);
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  tasks.forEach(
    (task) =>
      (tbody.innerHTML += `
      <tr class="task-container">
      <td>
            <input type="checkbox" data-id="${task.id}" class="btn-complete"  ${
        task.complete ? "checked" : ""
      }>
        </td>
        <td class="${task.complete ? "complete" : ""} + task-title">${
        task.text
      }</td>
        <td class="tasks-panel">
        <img class="btn-panel btn-edit" onclick="editTask(${
          task.id
        })" src="img/edit.png" alt="" />
            <img class="btn-panel" onclick="deleteTask(${
              task.id
            })" src="img/delete.png" alt="" />
        </td>
        </tr>`)
  );
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-complete")) {
    completeTask(e.target.dataset.id);
  }
});

const completeTask = (id) => {
  tasks.forEach((task) => {
    if (task.id == id) {
      task.complete = !task.complete;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
};

const editTask = (id) => {
  const task = tasks.find((task) => task.id == id);
  console.log(task);
  if (task) {
    const inputId = document.querySelector("#id");
    inputId.value = task.id;
    const inputText = document.querySelector("#text");
    inputText.value = task.text;
  }
};

const deleteTask = (id) => {
  const filtered = tasks.filter((task) => task.id != id);
  localStorage.setItem("tasks", JSON.stringify(filtered));
  renderTasks();
};

document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});
