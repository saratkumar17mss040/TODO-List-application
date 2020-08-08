const todo = document.getElementById('todo');
const filter = document.getElementById('filter');

// enter key event listener attached to todo
todo.addEventListener('keyup', todoKeyUp);

function todoKeyUp(event) {
	if (event.keyCode === 13) {
		const currentItemValue = todo.value;
		if (currentItemValue === '') alert('Please enter some todo!');
		else {
			event.preventDefault();
			// insert current item to the item list area
			createAndInsertItem(currentItemValue);
		}
	}
}

function createAndInsertItem(currentItemValue) {
	const row = document.createElement('div');
	row.classList.add('row', 'mt-5', 'w-100');

	const itemMainContainer = document.createElement('div');
	itemMainContainer.classList.add('w-100');

	const itemSubContainer = document.createElement('div');
	itemSubContainer.classList.add('my-auto', 'itemSubContainer');

	const list = document.createElement('li');
	list.classList.add('list-group-item');

	const spanTodoItem = document.createElement('span');
	spanTodoItem.classList.add('todoItemValue');
	spanTodoItem.innerText = currentItemValue;
	list.appendChild(spanTodoItem);

	const createButton = (buttonClass, iconClass, mr3 = true) => {
		const button = document.createElement('button');
		button.setAttribute('type', 'button');
		const btnClasses = [
			'btn',
			buttonClass,
			'btn-sm',
			'float-right',
			'edit-btn',
		];
		if (mr3) btnClasses.push('mr-3');
		button.classList.add(...btnClasses);
		const icon = document.createElement('i');
		icon.classList.add('fas', ...iconClass.split(' '));
		button.append(icon);
		return button;
	};

	const deleteBtn = createButton('btn-danger', 'fa-trash', false);
	const editBtn = createButton('btn-primary', 'fa-edit');
	const clockBtn = createButton('btn-secondary', 'fa-clock');
	const tickBtn = createButton('btn-success', 'fa-check-circle');

	const container = document.querySelector('.notes');

	// add row to the notes class
	container.appendChild(row);

	// structuring the dom elements
	row.appendChild(itemMainContainer);
	itemMainContainer.appendChild(itemSubContainer);
	itemSubContainer.appendChild(list);
	list.append(deleteBtn, editBtn, clockBtn, tickBtn);
	deleteBtn.addEventListener('click', () => row.remove(), true);
	editBtn.addEventListener('click', editCurrentItem);
	tickBtn.addEventListener('click', strikeThrough);
	// clockBtn.addEventListener('click', setClock);
}

function editCurrentItem(event) {
	const currentList = event.target.parentElement;
	const spanToDo = currentList.firstElementChild;
	spanToDo.contentEditable = true;
}

function strikeThrough(event) {
	const currentStrikeItem = event.target.parentElement;
	const spanToDoItemToStrike = currentStrikeItem.firstElementChild;
	console.log(spanToDoItemToStrike);
	let newSpanToDoItemStriked =
		'<del>' + spanToDoItemToStrike.innerHTML + '</del>';
	spanToDoItemToStrike.innerHTML = newSpanToDoItemStriked;
}

// filter event listener for filtering todo's
filter.addEventListener('keydown', filterToDoItems);

function filterToDoItems(event) {
	const currentFilterText = event.target.value.toLowerCase();
	console.log(currentFilterText);
	const currentToDoItems = document.getElementsByClassName('todoItemValue');
	console.log(currentToDoItems);
	[...currentToDoItems].forEach((items) => {
		const toDo = items.textContent;
		if (toDo.toLowerCase().indexOf(currentFilterText) != -1) {
			items.parentElement.parentElement.parentElement.parentElement.style.display =
				'block';
		} else {
			items.parentElement.parentElement.parentElement.parentElement.style.display =
				'none';
		}
	});
}

// select dropdown download options
let downloadOptions = document.getElementById('downloadOptions');
downloadOptions.addEventListener('change', checkForSelectedDownLoadType);

function checkForSelectedDownLoadType(event) {
	const currentDownloadOption = event.target.value;
	const downloadIcon = document.getElementById('download');
	console.log(currentDownloadOption);
	if (
		currentDownloadOption === 'JSON' ||
		currentDownloadOption === 'PDF' ||
		currentDownloadOption === 'WORD'
	)
		downloadIcon.classList.add('text-primary');
	else downloadIcon.classList.remove('text-primary');
}
