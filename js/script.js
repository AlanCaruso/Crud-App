const tasks = [];

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
});
