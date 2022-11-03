// INDEX PAGE
let popup = document.querySelector('.popup')
let formbook = document.querySelector('.booking-form')
let databook = document.querySelector('.data-booking')

//show & close pricelist
function openPopUp() {
  popup.classList.add("showPopUp")
}

function closePopUp() {
  popup.classList.remove("showPopUp")
}

//show & close form booking
function bookingForm() {
 popup.classList.remove("showPopUp")
 formbook.classList.add("showForm")
}

function closeForm() {
  formbook.classList.remove("showForm")
}

// save form data to local storage
const namaInput = document.getElementById("nama")
const telpInput = document.getElementById("telp")
const alamatInput = document.getElementById("alamat")
const carsInput = document.getElementById("cars")
const harisewaInput = document.getElementById("harisewa")
const tanggalsewaInput = document.getElementById("tanggalsewa")

function bookCars(event) {
 let nama = namaInput.value.trim()
 let telp = telpInput.value.trim()
 let alamat = alamatInput.value.trim()
 let cars = carsInput.value.trim()
 let harisewa = harisewaInput.value.trim()
 let tanggalsewa = tanggalsewaInput.value.trim()
     
  let getbooked = JSON.parse(localStorage.getItem("booksArr"))

  const booksArr = {
    name : nama,
    phone : telp,
    address : alamat,
    car : cars,
    days : harisewa,
    dates : tanggalsewa
  };

  if(getbooked){
    nama = booksArr.name
    telp = booksArr.phone
    alamat = booksArr.address
    cars= booksArr.car
    harisewa = booksArr.days
    tanggalsewa = booksArr.dates
  };

  localStorage.setItem("booksArr", JSON.stringify(booksArr))
  let checkSave = booksArr != null ? alert("Data Pemesanan Tersimpan") : alert("Mohon Lengkapi Form Pemesanan") ;
}

// TODOS PAGE
var title, date, description;
$(document).ready(function($) {
	var len = getLastKey();
	getTotalTasks();
	getAllTasks(len+100);

	$("#addNewTask").click(function(){
		title = $("#title").val();
		date = $("#date").val();
		description	= $("#description").val();

		if (title == '') {
			$("#title").next('.invalid-feedback').show();	
		}

		if (date == '') {
			$("#date").next('.invalid-feedback').show();	
		}

		if (description == '') {
			$("#description").next('.invalid-feedback').show();	
		}

		if (title && date && description) {
			var objTask = {};
			var id;
			var initial_id = counterRows();
			if (initial_id == 0) {
				id = 1;	
			}else{
				var elem_id = $(".tasks").first();
				elem_id = elem_id.attr('class');
				elem_id = elem_id.replace('row_','');
				elem_id = parseInt(elem_id) + 1;
				id = elem_id;
			}
			//id = localStorage.length + 1;
			objTask['id'] = id; 
			objTask['title'] = title;
			objTask['date'] = date;
			objTask['description'] = description;
			objTask['done'] = false;
			localStorage.setItem(id, JSON.stringify(objTask));
			
			$("input,textarea").val('');
			$("#addingTask").modal('hide');
			getTotalTasks ();
			getAllTasks(id);
		}
	});	

	$("#title").keyup(function(){
		$(this).next('.invalid-feedback').hide();
	});

	$("#date").keyup(function(){
		$(this).next('.invalid-feedback').hide();
	});

	$("#description").keyup(function(){
		$(this).next('.invalid-feedback').hide();
	});		
});

function getTotalTasks (){
	if (localStorage.length>0) {
		$("#task-table").show();
		//getAllTasks();
	}else{
		$("#task-table").hide();
	}	
}


function getAllTasks(last=1){
	$("#taskList").html('');
	for (var i = last + 1; i > 0; i--) {
		var task = JSON.parse(localStorage.getItem(i));
		if (task) {
			var done = task.done ? 'Done' : 'Pending';
			
			row = `
				<tr class="row_${ task.id } tasks">
					<td id="titltask_${ task.id }">${ task.title}</td>
					<td id="datetask_${ task.id }">${ task.date}</td>
					<td id="desctask_${ task.id }">${ task.description}</td>
					<td class="isDone" id="donetask_${ task.id }">${ done }</td>
					<td>
						<button class="btn btn-secondary mb-2 remover" onClick=setRemoval(${task.id});>Remove</button>
						<button class="btn btn-primary mb-2 doner" onClick=setDone(${task.id});>Set as done</button>
					</td>
				</tr>
			`;
			$("#taskList").append(row);
			if (done === 'Done') {
				$("#donetask_"+ task.id).addClass('text-success');
			}else{
				$("#donetask_"+ task.id).addClass('text-danger');
			}
		}else{
			continue;
		}
		
	};
	
}

function setRemoval(id){
	localStorage.removeItem(id);
	$(".row_" + id).remove();
	getTotalTasks ();
}

function setDone(id){
	var title,date,description,objTask, listTasks;
	listTasks = [];
	$(".tasks").each(function(index, el) {
		
	});

	title = $("#titltask_" + id).text();
	date = $("#datetask_" + id).text();
	description = $("#desctask_" + id).text();
	objTask = {};
	objTask['id'] = id; 
	objTask['title'] = title;
	objTask['date'] = date;
	objTask['description'] = description;
	objTask['done'] = true;
	
	localStorage.setItem(id, JSON.stringify(objTask));
	var len = getLastKey();
	getAllTasks(len + 100);
}

function counterRows (){
	var counter = 0;
	$(".tasks").each(function(index, el) {
		counter++;
	});
	return counter;
}

function getLastKey(){
	totalKey = new Array(localStorage.length).fill().map(i => localStorage.key(i));
	totalKey = parseInt(totalKey);
	return totalKey;	
}