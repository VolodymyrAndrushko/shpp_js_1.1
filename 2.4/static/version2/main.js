const route = "/router";
const apiURL = "http://localhost:3005/api/";
const apiVersion = "v2";
const homePage = "homepage.html";
const loginPage = "login.html";
let tasks = [];

function loadLogin() {
    fetch(loginPage)
        .then((x) => x.text())
        .then((y) => (document.querySelector("html").innerHTML = y))
        .then(() => {
            const loginButton = document.querySelector("#login-button");
            const registerButton = document.querySelector("#register-button");
            loginButton?.addEventListener("click", login);
            registerButton?.addEventListener("click", register);
        });
}

function login(event) {
    if (event) event.preventDefault();
    let login = document.getElementById("login-field").value.trim();
    let pass = document.getElementById("password-field").value.trim();
    if (login !== "" && pass) {
        let params = JSON.stringify({ login: login, pass: pass });
        let qs = { action: "login" };
        fetch(apiURL + apiVersion + route + "?" + new URLSearchParams(qs), {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: params,
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.ok) {
                    localStorage.setItem("name", login);
                    getTasks();
                } else if (res.error === "not found") {
                    alert("Такая комбинация логина и пароля не найдена");
                } else {
                    alert(
                        "Произошла ошибка. Посмотрите консоль разработчика чтоб увидеть подробности."
                    );
                }
            });
    }
}

function register(event) {
    event.preventDefault();

    let userLogin = document.getElementById("login-field").value.trim();
    let pass = document.getElementById("password-field").value.trim();

    if (userLogin !== "" && pass) {
        let params = JSON.stringify({ login: userLogin, pass: pass });
        let qs = { action: "register" };
        fetch(apiURL + apiVersion + route + "?" + new URLSearchParams(qs), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: params,
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.ok) {
                    login();
                } else {
                    alert(
                        "Произошла ошибка. Посмотрите консоль разработчика чтоб увидеть подробности."
                    );
                }
            });
    }
}

function getTasks() {
    const qs = { action: "getItems" };
    fetch(apiURL + apiVersion + route + "?" + new URLSearchParams(qs), {
        credentials: "include",
        method: "POST",
    })
        .then((res) => res.json())
        .then((response) => {
            if (response.error === "forbidden") {
                loadLogin();
            } else {
                loadHomepage().then(() => {
                    tasks = response.items.map((item) => {
                        item.editable = false;
                        return item;
                    });
                    tasks.forEach((task) => loadTask(task));
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function addTask(event) {
    event.preventDefault();
    let task = document.getElementById("new-item-input").value.trim();
    if (task === "") return;
    let request = JSON.stringify({ text: task });
    const qs = { action: "createItem" };
    fetch(apiURL + apiVersion + route + "?" + new URLSearchParams(qs), {
        method: "POST",
        body: request,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((response) => {
            if (response._id) {
                getTasks();
            } else {
                alert(
                    "Произошла ошибка. Посмотрите консоль разработчика чтоб увидеть подробности."
                );
            }
        });
}

async function deleteTask(event) {
    event.preventDefault();
    let taskId = event.currentTarget.parentNode.parentNode.id;
    let request = JSON.stringify({ _id: taskId });
    const qs = { action: "deleteItem" };
    fetch(apiURL + apiVersion + route + "?" + new URLSearchParams(qs), {
        method: "POST",
        body: request,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((response) => {
            if (response["ok"] === true) {
                getTasks();
            } else {
                alert(
                    "Произошла ошибка. Посмотрите консоль разработчика чтоб увидеть подробности."
                );
            }
        });
}

function updateTask(task) {
    let request = JSON.stringify({
        text: task.text,
        _id: task._id,
        checked: task.checked,
    });
    const qs = { action: "editItem" };

    fetch(apiURL + apiVersion + route + "?" + new URLSearchParams(qs), {
        method: "POST",
        body: request,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then(() => {
            getTasks();
        });
}

function editTask(event) {
    event.preventDefault();
    let taskId = event.currentTarget.parentNode.parentNode.id;
    let task = tasks.find((element) => element._id === taskId);
    let inputElement = event.currentTarget.parentNode.previousSibling.firstChild;
    inputElement.removeAttribute("readonly");
    inputElement.focus();
    const pressedKey = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            inputElement.setAttribute("readonly", "readonly");
            task.text = inputElement.value;
            updateTask(task);
            inputElement.removeEventListener("keypress", pressedKey);
            inputElement.removeEventListener("focusout", focusout);
        }
    };
    const focusout = () => {
        inputElement.value = task.text;
        inputElement.setAttribute("readonly", "readonly");
        inputElement.removeEventListener("keypress", pressedKey);
        inputElement.removeEventListener("focusout", focusout);
    };

    inputElement.addEventListener("keypress", pressedKey);
    inputElement.addEventListener("focusout", focusout);
}

function updateTaskStatus(event) {
    event.preventDefault();
    let taskId = event.currentTarget.parentNode.id;
    let task = tasks.find((element) => element._id === taskId);
    task.checked = !task.checked;
    updateTask(task);
}

function loadHomepage() {
    return fetch(homePage)
        .then((x) => x.text())
        .then((y) => (document.querySelector("html").innerHTML = y))
        .then(() => {
            const addTaskButton = document.getElementById("new-item-submit");
            const logoutButton = document.querySelector(".logout");

            addTaskButton.addEventListener("click", addTask);
            logoutButton.addEventListener("click", logout);
        });
}

function logout(event) {
    event.preventDefault();

    const qs = { action: "logout" };
    fetch(apiURL + apiVersion + route + "?" + new URLSearchParams(qs), {
        method: "POST",
        credentials: "include",
    })
        .then((res) => res.json())
        .then((response) => {
            if (response.ok) {
                localStorage.clear();
                loadLogin();
            }
        });
}
function loadTask(task) {
    const itemDiv = document.createElement("div");

    itemDiv.classList.add("item");
    itemDiv.setAttribute("id", task._id);

    const checkedButton = document.createElement("button");
    checkedButton.innerHTML = task.checked
        ? '<i class="fa fa-check-square-o"></i>'
        : '<i class="fa fa-square-o"></i>';
    checkedButton.classList.add("check");
    itemDiv.appendChild(checkedButton);

    const submittedDiv = document.createElement("div");
    submittedDiv.setAttribute("id", "submitted-task");
    itemDiv.appendChild(submittedDiv);

    const itemInput = document.createElement("input");
    itemInput.classList.add("text");
    itemInput.type = "text";
    itemInput.value = task.text;
    itemInput.setAttribute("readonly", "readonly");
    submittedDiv.appendChild(itemInput);

    const itemSettingsDiv = document.createElement("div");
    itemSettingsDiv.classList.add("item-settings");

    const editButton = document.createElement("button");
    editButton.innerHTML = `<i class="fa fa-edit"></i>`;
    editButton.classList.add("edit");
    itemSettingsDiv.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa fa-trash-o"></i>';
    deleteButton.classList.add("delete");
    itemSettingsDiv.appendChild(deleteButton);
    itemDiv.appendChild(itemSettingsDiv);

    document.getElementById("items").appendChild(itemDiv);
    deleteButton.addEventListener("click", deleteTask);
    editButton.addEventListener("click", editTask);
    checkedButton.addEventListener("click", updateTaskStatus);
}
