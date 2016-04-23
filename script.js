// Matrix_creation
function createMatrix(row, col, name, id) {
	table = document.createElement("table");
	for (i = 0; i < row; i++) {
		tr = document.createElement("tr");
		table.appendChild(tr);
		for (j = 0; j < col; j++) {
				td = document.createElement("td");
				input = document.createElement("input");
				input.type = "text"; input.placeholder = name + (i+1) + "," + (j+1);
				if (name == "C") input.disabled = true;
				td = table.lastChild.appendChild(td);
				td.appendChild(input);
			}	
	}
	document.getElementById(id).appendChild(table);
	bindInputs();
	return table;
}

function MatrixToArray(Matrix, row_count, col_count) {
	var array = [];
	for (var i = 0; i < row_count; i++) {
		array[i] = [];
		for (var j = 0; j < col_count; j++)
			array[i][j] = Matrix.children[i].children[j].children[0].value;
	}
	return array;
}

function ArrayToMatrix(array, name) {
	var matrix = document.createElement("table");
	for (i = 0; i < array.length; i++) {
		tr = document.createElement("tr");
		matrix.appendChild(tr);
		for (j = 0; j < array[0].length; j++) {
				td = document.createElement("td");
				input = document.createElement("input");
				input.type = "text";  
				input.placeholder = name + (i+1) + "," + (j+1);
				input.value = array[i][j];
				if (name == "C") input.disabled = true;
				td = matrix.lastChild.appendChild(td);
				td.appendChild(input);
			}	
		}	
	return matrix;	
}

function clearArray(array) {
	for (var i = 0; i < array.length; i++)
		for (var j = 0; j < array[0].length; j++)
			array[i][j] = "";
	return array;	
}

function addMatrix(matrix, index) {
	return container.children[index].children[0].replaceChild(matrix, container.children[index].children[0].children[0]);
}

function swap() {
	var array_C = MatrixToArray(matrix_A, matrix_A.children.length, matrix_A.children[0].children.length);
	array_A = MatrixToArray(matrix_B, matrix_B.children.length, matrix_B.children[0].children.length);
	array_B = array_C;
	a = matrix_A.className;
	b = matrix_B.className;
	matrix_A = ArrayToMatrix(array_A, "A"); matrix_A.className = b;
	addMatrix(matrix_A, 0);
	matrix_B = ArrayToMatrix(array_B, "B"); matrix_B.className = a;
	addMatrix(matrix_B, 2);
	matrix_res = createMatrix(matrix_A.children.length, matrix_B.children[0].children.length, "C", "res_matrix"); 
	if (matrix_res.children.length == 1) matrix_res.classList.add("oneRow");
	if (matrix_res.children[0].children.length == 1) matrix_res.classList.add("oneCol");
	if (matrix_res.children.length == 1 && matrix_res.children[0].children.length == 1) matrix_res.classList.add("oneElem");
	document.getElementById("res_matrix").removeChild(document.getElementById("res_matrix").children[0]);
	bindInputs();
}

function multiplyMatrix(array_1, array_2) {
	var res = [];
	for (var i = 0; i < array_1.length; i++) {
		res[i] = [];
		for (var j = 0; j < array_2[0].length; j++) {
			res[i][j] = 0;
			for (var k = 0; k < array_2.length; k++) {
				if  (array_1[i][k] == "") array_1[i][k] = 0;
				if  (array_2[k][j] == "") array_2[k][j] = 0;
				if (isNaN(Number(array_1[i][k])) || isNaN(Number(array_2[k][j]))){
					console.log("Неправильные данные");
					return MatrixToArray(matrix_res, matrix_res.children.length, matrix_res.children[0].children.length);
					}
				res[i][j] += array_1[i][k]*array_2[k][j];
			}
		}
	}
	return res;		
}

//создаем матрицу и массив A,B,С
var matrix_A = createMatrix(2, 2, "A", "first_matrix");
var A_row = matrix_A.children.length; var A_col = matrix_A.children[0].children.length;
var matrix_B = createMatrix(2, 3, "B", "second_matrix");
var B_row = matrix_B.children.length; var B_col = matrix_B.children[0].children.length;
var matrix_res = createMatrix(A_row, B_col, "C", "res_matrix");
var container_1 = document.getElementById("first_matrix");
var container_2 = document.getElementById("second_matrix");
var container = document.body.children[1];

//button change_place
document.getElementById("change_place").onclick = function() {
	swap();
}

//button clear_matrix 
document.getElementById("clear_matrix").onclick = function() {
	array_A = clearArray(MatrixToArray(matrix_A, matrix_A.children.length, matrix_A.children[0].children.length));
	array_B = clearArray(MatrixToArray(matrix_B, matrix_B.children.length, matrix_B.children[0].children.length));
	array_res = clearArray(MatrixToArray(matrix_res, matrix_res.children.length, matrix_res.children[0].children.length));
	a = matrix_A.className;
	matrix_A = createMatrix(array_A.length, array_A[0].length, "A", "first_matrix"); matrix_A.className = a;
	container_1.removeChild(container_1.children[0]);
	b = matrix_B.className;
	matrix_B = createMatrix(array_B.length, array_B[0].length, "B", "second_matrix");
	 matrix_B.className = b;
	document.getElementById("second_matrix").removeChild(document.getElementById("second_matrix").children[0]);
	c = matrix_res.className;
	matrix_res = createMatrix(array_res.length, array_res[0].length, "C", "res_matrix"); matrix_res.className = c;
	document.getElementById("res_matrix").removeChild(document.getElementById("res_matrix").children[0]);
}

//Умножить матрицы
document.getElementsByClassName("arrow")[0].onclick = function() {
	array_A = MatrixToArray(matrix_A, matrix_A.children.length, matrix_A.children[0].children.length);
	array_B = MatrixToArray(matrix_B, matrix_B.children.length, matrix_B.children[0].children.length);
	if (array_B.length == array_A[0].length)
		array_C = multiplyMatrix(array_A, array_B);
	else {
		document.getElementById("warning").style.display = "block";
		document.body.children[0].className = "side-panel side_warn";
		return 0;
	}
	c = matrix_res.className;
	matrix_res = ArrayToMatrix(array_C, "C"); matrix_res.className = c;
	res = document.getElementById("res_matrix");
	res.replaceChild(matrix_res, res.children[0]);
}

function bindInputs(){
	input = document.getElementsByTagName("input");
	for (var i = 0; i < input.length; i++) {
		input[i].oninput = function() {
			document.getElementById("warning").style.display = "none";
			console.log("ad");
			document.body.children[0].className = "side-panel side_blue";
		}
	}
}

function addRow(matrix, name) {
	if (matrix.children.length == 1) {
		matrix.classList.remove("oneRow");
		matrix.classList.remove("oneElem");
	}
	tr = document.createElement('tr'); 		
	for (var i = 0; i < matrix.children[0].children.length; i++) {
		td = document.createElement('td');
		input = document.createElement("input");
		input.type = "text"; input.placeholder = name + (matrix.children.length + 1) + "," + (i+1);
		if (name == "C") input.disabled = true;
		td.appendChild(input);
		tr.appendChild(td);
	}	
	matrix.appendChild(tr);
}

document.querySelector('.row_add').onclick = function() {
	if (document.getElementsByName("matrix")[0].checked) {
		addRow(matrix_A, "A");
		addRow(matrix_res, "C");
	}
	else addRow(matrix_B, "B");
	bindInputs();
}

function minusRow(matrix) {
	if (matrix.children.length >= 2) {
			matrix.removeChild(matrix.lastChild);
			if (matrix.children.length == 1)
				matrix.classList.add("oneRow");
			if (matrix.children.length == 1 && matrix.children[0].children.length == 1)
				matrix.classList.add("oneElem");
		}
}
document.querySelector('.row_minus').onclick = function() {
	if (document.getElementsByName("matrix")[0].checked) {
		minusRow(matrix_A);
		minusRow(matrix_res);
		}
	else 
		minusRow(matrix_B);
	bindInputs();
}

function addCol(matrix, name) {
	if (matrix.children[0].children.length == 1) {
		matrix.classList.remove("oneCol");	
		matrix.classList.remove("oneElem");
	}
	for (var i = 0; i < matrix.children.length; i++) {
		td = document.createElement('td');
		input = document.createElement("input");
		input.type = "text"; input.placeholder = name + (i+1) + "," + (matrix.lastChild.children.length + 1);
		if (name == "C") input.disabled = true;
		td.appendChild(input);
		matrix.children[i].appendChild(td);
	}	
}

document.querySelector('.col_add').onclick = function() {
	if (document.getElementsByName("matrix")[0].checked) 
		addCol(matrix_A, "A");
	else {
		addCol(matrix_B, "B");
		addCol(matrix_res, "C");
	}
	bindInputs();
}

function colMinus(matrix) {
	if (matrix.children[0].children.length >= 2) {
			for (i = 0; i < matrix.children.length; i++) {
				matrix.children[i].removeChild(matrix.children[i].lastChild)
			}
			if (matrix.children[0].children.length == 1)
				matrix.classList.add("oneCol");
			if (matrix.children[0].children.length == 1 && matrix.children.length == 1) {
				matrix.classList.add("oneElem");
			}
		}
}
document.querySelector('.col_minus').onclick = function() {
	if (document.getElementsByName("matrix")[0].checked) {
		colMinus(matrix_A);
	}
	else {
		colMinus(matrix_B);
		colMinus(matrix_res);
	}
	bindInputs();
}