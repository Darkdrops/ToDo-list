let todoInput; // mijsce gdzie urzytkownik wpisuje treść
let errorInfo; // info o braku zadań / konieczność podania zadania
let addBtn; // Przycisk ADD dodaje nowe elementy
let ulList; //lista zadań

let popup;
let popupInfo; // tekst w popupie jak się doda pusty tekst
let todoToEdit; // edytowany todo
let popupInput; //input w popup
let popupAddBtn; // przycisk "zatwierdź" w popup
let popupCloseBtn; // przycisk "anuluj" w popup

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
	createToolsArea();
};

const prepareDOMElements = () => {
	// Pobieramy wszystkie elementy
	todoInput = document.querySelector(".todo-input");
	errorInfo = document.querySelector(".error-info");
	addBtn = document.querySelector(".btn-add");
	ulList = document.querySelector(".todolist ul");

	popup = document.querySelector(".popup");
	popupInfo = document.querySelector(".popup-info");
	popupInput = document.querySelector(".popup-input");
	popupAddBtn = document.querySelector(".accept");
	popupCloseBtn = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
	// Nadajemy nasłuchiwanie
	addBtn.addEventListener("click", addNewTodo);
	ulList.addEventListener("click", checkClick);
	popupCloseBtn.addEventListener("click", closePopup);
	popupAddBtn.addEventListener("click", changetodoText);
	todoInput.addEventListener("keyup", enterCheck);
};
/*

1. Tworzy nowy element li
2. dodawać nowy element ul listy
3. funkcja odpalania na click w przycisk add
4. przechwytuje treść z inputa i umieszcza go w nowo utworzonym li
5. funkcja nie doda do listy pustego todosa

*/

const addNewTodo = () => {
	if (todoInput.value !== "") {
		const newTodo = document.createElement("li");
		newTodo.textContent = todoInput.value;

		createToolsArea(newTodo);

		ulList.append(newTodo);
		todoInput.value = "";
		errorInfo.textContent = "";
	} else {
		errorInfo.textContent = "Podaj jakieś zadanie";
	}
};

const createToolsArea = newTodo => {
	const toolsPanel = document.createElement("div");
	toolsPanel.classList.add("tools");
	newTodo.append(toolsPanel);

	const completeBTN = document.createElement("button");
	completeBTN.classList.add("complete");
	completeBTN.innerHTML = '<i class="fas fa-check"></i>';
	const editBTN = document.createElement("button");
	editBTN.classList.add("edit");
	editBTN.innerHTML = " EDIT";
	const delatBTN = document.createElement("button");
	delatBTN.classList.add("delete");
	delatBTN.innerHTML = '<i class="fas fa-times"></i>';

	toolsPanel.append(completeBTN, editBTN, delatBTN);
};

const checkClick = e => {
	if (e.target.matches(".complete")) {
		e.target.closest("li").classList.toggle("completed");
		e.target.classList.toggle("completed");
	} else if (e.target.matches(".edit")) {
		editTodo(e);
	} else if (e.target.matches(".delete")) {
		deleteTodo(e);
	}
};

const editTodo = e => {
	todoToEdit = e.target.closest("li");
	popupInput.value = todoToEdit.firstChild.textContent;
	popup.style.display = "flex";
};

const closePopup = () => {
	popup.style.display = "none";
	popupInfo.textContent = "";
};

const changetodoText = () => {
	if (popupInput.value !== "") {
		todoToEdit.firstChild.textContent = popupInput.value;
		popup.style.display = "none";
		popupInfo.textContent = "";
	} else {
		popupInfo.textContent = "Musisz podać jakąś treść!";
	}
};

const deleteTodo = e => {
	e.target.closest("li").remove();
	const allTodos = ulList.querySelectorAll("li");
	if (allTodos.length === 0) {
		errorInfo.textContent = "Brak zadań na liście!";
	}
};

const enterCheck = e => {
	if (e.key === "Enter") {
		addNewTodo();
	}
};

document.addEventListener("DOMContentLoaded", main);
