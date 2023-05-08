let tasks = [];

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputText = document.querySelector("#text");

  tasks.push({
    id: Date.now(),
    text: inputText.value,
    complete: false,
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  inputText.value = "";
  console.log(tasks);
  renderTasks();
});

const renderTasks = () => {
  tasks = JSON.parse(localStorage.getItem("tasks") || []);
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  tasks.forEach(
    (task) =>
      (tbody.innerHTML += `
      <tr>
        <td>${task.text}</td>
        <td>
            <button>Complete</button>
            <button>Edit</button>
            <button>Delete</button>
        </td>
        </tr>`)
  );
};

renderTasks();
