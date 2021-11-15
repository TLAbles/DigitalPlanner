/* -------------------------------------- CALENDAR ------------------------------------- */

const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


// Show month currently selected // 
  document.querySelector(".date h1").innerHTML = months[date.getMonth()];


  // Show today's date // 
  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};


// go to different months // 

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();



/* -------------------------------------------- TO DO LIST -------------------------------------*/

// Create a "close" button and add it to each list item //
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item //
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a checked symbol when clicking on a list item //
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button //
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

/* -----------------------------------HABIT TRACKER---------------------------------*/ 


const addHabits = document.querySelector(".add-habit");
const habitsList = document.querySelector('.habitsList');
const habits = JSON.parse(localStorage.getItem("habits")) || [];


// Create new habit when clicking "add" button //

function addHabit(e) {
  const text = this.querySelector ("[name=habit]").value;
  const totalReps = this.querySelector("[name=reps]").value;
  const habit = {
    text: text,
    totalReps: totalReps,
    completed: false,
  };

  habits.push(habit);
  listHabits(habits, habitsList);
  localStorage.setItem("habits", JSON.stringify(habits));
  this.reset();
  console.log(habit);
}


// Create list of habits // 

function listHabits(habit = [], habitsList) {
  habitsList.innerHTML = habits
    .map((habit, i) => {
      return `
            <li>
            <input type="checkbox" data-index=${i} id="habit${i}" ${
        habit.completed ? "checked" : ""
      } />
            <label for="habit${i}"><span>${habit.reps}/${habit.totalReps} 
      }</span> ${habit.text}</label>
        <button class="delete" data-index=${i} id="delete${i}">Delete</button>
        </li>
        `;
    })
    .join("");
}

// Mark habits as completed // 

function markCompleted(e) {
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  habits[index].reps += 1;

  if (habits[index].reps === habits[index].totalReps) {
    habits[index].completed = true;
  } else if (habits[index].reps > habits[index].totalReps) {
    habits[index].reps = 0;
    habits[index].completed = false;
  }

  listHabits(habits, habitsList);
  localStorage.setItem("habits", JSON.stringify(habits));
}


// Remove habits from tracker // 

function deleteHabit(e) {
  if (!e.target.matches("button")) return;
  const el = e.target;
  const index = el.dataset.index;

  habits.splice(index, 1);

  listHabits(habits, habitsList);
  localStorage.setItem("habits", JSON.stringify(habits));
}

addHabits.addEventListener("submit", addHabit);
habitsList.addEventListener("click", markCompleted);
habitsList.addEventListener("click", deleteHabit);

listHabits(habits, habitsList);

/*
// ---------------MODAL ---------------------//
 
const modalButton = document.getElementsByClassName("modalButton");
const modalArray = Array.from(modalButton).entries();
const modals = document.getElementsByClassName("modal");

// Then use `for...of`-loop with the index of each item in `triggerArray` for listening to a click event which toggles each modal to open and close
for (let [index, modalButton] of modalArray) {
  const toggleModal => () {
    modals[index].classList.toggle("show-modal");
  };
  trigger.addEventListener("click", toggleModal);
 }
*/
/*
const btns = document.querySelectorAll("[dat-target");


btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.target).classList.add("active");
  }

  );
});

/* --------------- Monday ----------------- */

// Get the modal
var monday_modal = document.getElementById("monModal");

// Get the button that opens the modal
var mon_btn = document.getElementById("mon_write_btn");

// When the user clicks on the button, open the modal 
mon_btn.onclick = function() {
  monday_modal.style.display = "block";
}

//Create item from modal submit //

function monFunction() {
  var MonNotesDiv = document.getElementById("MonNotes").value;
  document.getElementById("Mondaytext").innerHTML = MonNotesDiv;
}

 
/* --------------- Tuesday ----------------- */

// Get the modal
var tuesday_modal = document.getElementById("tueModal");

// Get the button that opens the modal
var tue_btn = document.getElementById("tue_write_btn");

// When the user clicks on the button, open the modal 
tue_btn.onclick = function() {
  tuesday_modal.style.display = "block";
}

//Create item from modal submit //

function tueFunction() {
  var TueNotesDiv = document.getElementById("TueNotes").value;
  document.getElementById("Tuesdaytext").innerHTML = TueNotesDiv;
}


/* --------------- Wednesday ----------------- */

// Get the modal
var wednesday_modal = document.getElementById("wedModal");

// Get the button that opens the modal
var wed_btn = document.getElementById("wed_write_btn");

// When the user clicks on the button, open the modal 
wed_btn.onclick = function() {
  wednesday_modal.style.display = "block";
}

//Create item from modal submit //

function wedFunction() {
  var WedNotesDiv = document.getElementById("WedNotes").value;
  document.getElementById("Wednesdaytext").innerHTML = WedNotesDiv;
}

 
/* --------------- Thursday ----------------- */

// Get the modal
var thursday_modal = document.getElementById("thModal");

// Get the button that opens the modal
var th_btn = document.getElementById("th_write_btn");

// When the user clicks on the button, open the modal 
th_btn.onclick = function() {
  thursday_modal.style.display = "block";
}

//Create item from modal submit //

function thFunction() {
  var ThNotesDiv = document.getElementById("ThNotes").value;
  document.getElementById("Thursdaytext").innerHTML = ThNotesDiv;
}


/* --------------- Friday ----------------- */

// Get the modal
var friday_modal = document.getElementById("friModal");

// Get the button that opens the modal
var fri_btn = document.getElementById("fri_write_btn");

// When the user clicks on the button, open the modal 
fri_btn.onclick = function() {
  friday_modal.style.display = "block";
}

//Create item from modal submit //

function friFunction() {
  var FriNotesDiv = document.getElementById("FriNotes").value;
  document.getElementById("Fridaytext").innerHTML = FriNotesDiv;
}

 
/* --------------- Saturday ----------------- */

// Get the modal
var saturday_modal = document.getElementById("satModal");

// Get the button that opens the modal
var sat_btn = document.getElementById("sat_write_btn");

// When the user clicks on the button, open the modal 
sat_btn.onclick = function() {
  saturday_modal.style.display = "block";
}

//Create item from modal submit //

function satFunction() {
  var SatNotesDiv = document.getElementById("SatNotes").value;
  document.getElementById("Saturdaytext").innerHTML = SatNotesDiv;
}


/* --------------- Sunday ----------------- */

// Get the modal
var sunday_modal = document.getElementById("sunModal");

// Get the button that opens the modal
var sun_btn = document.getElementById("sun_write_btn");

// When the user clicks on the button, open the modal 
sun_btn.onclick = function() {
  sunday_modal.style.display = "block";
}

//Create item from modal submit //

function sunFunction() {
  var SunNotesDiv = document.getElementById("SunNotes").value;
  document.getElementById("Sundaytext").innerHTML = SunNotesDiv;
}

 
/* --------------- Notes ----------------- */


// Get the modal
var note_modal = document.getElementById("noteModal");

// Get the button that opens the modal
var note_btn = document.getElementById("note_write_btn");

// When the user clicks on the button, open the modal 
note_btn.onclick = function() {
  note_modal.style.display = "block";
}

//Create item from modal submit //

function noteFunction() {
  var NoteNotesDiv = document.getElementById("NoteNotes").value;
  document.getElementById("Notetext").innerHTML = NoteNotesDiv;
}


// When the user clicks anywhere outside of the modal, close it

window.onclick = function(event) {
  if (event.target == monday_modal) {
    monday_modal.style.display = "none";
  }
  else if (event.target == tuesday_modal) {
    tuesday_modal.style.display = "none";
  }
 
  else if (event.target == wednesday_modal) {
    wednesday_modal.style.display = "none";
  }
  else if (event.target == thursday_modal) {
    thursday_modal.style.display = "none";
  }

  else if (event.target == friday_modal) {
    friday_modal.style.display = "none";
  }
 
  else if (event.target == saturday_modal) {
    saturday_modal.style.display = "none";
  }
  else if (event.target == sunday_modal) {
    sunday_modal.style.display = "none";
  }
  else if (event.target == note_modal) {
    note_modal.style.display = "none";
  }
}