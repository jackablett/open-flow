var getStarted = document.querySelector(".get-started");
var getStartedInput = document.querySelector(".get-started input");
var getStartedSubmit = document.querySelector(".get-started button");

var SignOut = document.querySelector(".top-bar button");

var tab = document.querySelectorAll(".tabs a");
var sections = document.querySelectorAll(".sections section");

var updateNameInput = document.querySelector(".update-name input");
var updateNameSubmit = document.querySelector(".update-name button");

var nameElements = document.querySelectorAll(".name");

var newAsignment = document.querySelector(".new-asignment");
var newAsignmentInput = document.querySelectorAll(".new-asignment input");
var newAsignmentSubmit = document.querySelector(".new-asignment button");
var newAsignmentTextarea = document.querySelector(".new-asignment textarea");
var asignmentBtn = document.querySelector(".asignment-btn");

var back = document.querySelector(".back");

var asignmentContainer = document.querySelector(".asignment-container");

var editAsignment = document.querySelector(".edit-asignment");
var editAsignmentUpdate = document.querySelector(".edit-asignment button");
var editAsignmentInput = document.querySelectorAll(".edit-asignment input");
var editAsignmentTextarea = document.querySelector(".edit-asignment textarea");

const notes = JSON.parse(localStorage.getItem("localhost_notes") || "[]");
let isUpdate = false, updateId;

getStartedSubmit.addEventListener("click", function() {
    if (getStartedInput.value != "") {
        localStorage.setItem("localhost_name", getStartedInput.value)
        window.location.reload();
    }
})

if (localStorage.getItem("localhost_name") === null) {
    getStarted.classList.remove("hidden");
}

SignOut.addEventListener("click", function() {
    localStorage.removeItem("localhost_name");
    window.location.reload();
})

if (window.location.search.slice(1) === "") {
    window.location = "?asignments";
}

if (window.location.search.slice(1) === "asignments") {
    tab[0].classList.add("bg-slate-200");
    sections[0].classList.remove("hidden");
}

if (window.location.search.slice(1) === "settings") {
    tab[1].classList.add("bg-slate-200");
    sections[1].classList.remove("hidden");
}

updateNameSubmit.addEventListener("click", function() {
    if (updateNameInput.value != "") {
        localStorage.setItem("localhost_name", updateNameInput.value)
        window.location.reload();
    }
    else {
        alert("Please enter your name, Thanks!")
    }
})

for (let nameDOM of nameElements) {
    nameDOM.innerHTML = localStorage.getItem("localhost_name");
}

back.addEventListener("click", function() {
    newAsignment.classList.add("transform-0");
    back.classList.add("transform-0");
    editAsignment.classList.add("transform-0");
})

asignmentBtn.addEventListener("click", function() {
    newAsignment.classList.remove("transform-0");
    back.classList.remove("transform-0");
})

newAsignmentSubmit.addEventListener("click", function() {
    var subject = newAsignmentInput[0].value;
    var dateDue = newAsignmentInput[1].value;
    var otherContent = newAsignmentTextarea.value;

    if (subject != "" && dateDue != "") {
        console.log(subject, dateDue, otherContent),

        newArray = {
            subject: subject,
            dateDue: dateDue,
            otherContent: otherContent
        }

        notes.push(newArray);
        localStorage.setItem("localhost_notes", JSON.stringify(notes));

        window.location.reload();
    }
    else {
        alert("Please enter full required details, Thanks!")
    }
})

if (localStorage.getItem("localhost_notes") == null || localStorage.getItem("localhost_notes") == "[]") {
    asignmentContainer.classList.add("border");
    asignmentContainer.classList.add("border-2");
}
else {
    asignmentContainer.classList.remove("border");
    asignmentContainer.classList.remove("border-2");
}

function showNotes() {
    if(!notes) return;
    notes.forEach((note, id) => {

    other = ""

    if (note.otherContent === "") {
        other = "No other content provided";
    }
    else {
        other = note.otherContent.replace(/(\r\n|\n|\r)/gm, "");
    }

    var html = `
    <div class="border overflow-hidden rounded-md">
        <div class="flex flex-col p-4 px-5">
            <div class="flex items-center justify-between">
                <h2 class="text-lg">${note.subject}</h2>
                <div class="relative">
                    <button class="p-1 dropdown border rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>                                                  
                    </button>
                    <div class="dropdown-items top-bar flex flex-col w-[100] overflow-hidden shadow-md rounded-md bg-white absolute right-0 top-10">
                        <button class="p-[7] cursor-pointer px-[15] text-left text-slate-600 hover:bg-[#00000006]" onclick="updateNote(${id}, '${note.subject}', '${note.dateDue}', '${other}')" >Edit</button>
                        <div class="w-full bg-slate-200 h-[0.5]"></div>
                        <button class="p-[7] cursor-pointer px-[15] text-left text-slate-600 hover:bg-[#00000006]" onclick="deleteNote(${id})">Delete</button>
                    </div>
                </div>
            </div>
            <p class="text-slate-400 mb-1">${other}</p>
        </div>
        <div class="flex flex-col border-t bg-slate-50 p-3 px-5">
            <p class="text-slate-600 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                ${note.dateDue}
            </p>
        </div>
    </div>
    `
    asignmentContainer.insertAdjacentHTML("beforeend", html);
})  
}

showNotes();

function deleteNote(id) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(id, 1);
    localStorage.setItem("localhost_notes", JSON.stringify(notes));
    window.location.reload();
}

function deleteNoteUpdate(id) {
    notes.splice(id, 1);
    localStorage.setItem("localhost_notes", JSON.stringify(notes));
    window.location.reload();
}

document.querySelector(".delete-all").addEventListener("click", function() {
    let confirmDel = confirm("Are you sure you want to delete ALL DATA FOREVER?");
    if(!confirmDel) return;
    localStorage.clear();
    window.location.reload();
})

function updateNote(id, subject, dateDue, otherContent) {
    editAsignment.classList.remove("transform-0")
    editAsignmentInput[0].value = subject;
    editAsignmentInput[1].value = dateDue;
    editAsignmentTextarea.value = otherContent;
    back.classList.remove("transform-0");

    editAsignmentUpdate.addEventListener("click" , function() {

        newsubject = editAsignmentInput[0].value;
        newdateDue = editAsignmentInput[1].value;
        newotherContent = editAsignmentTextarea.value;

        newArray = {
            subject: newsubject,
            dateDue: newdateDue,
            otherContent: newotherContent,
        }

        deleteNoteUpdate(id)

        notes.push(newArray);
        localStorage.setItem("localhost_notes", JSON.stringify(notes));
    })
}

function currentDate() {
    var currentDate = new Date();
    var date = currentDate.toLocaleDateString('en-US').split('/');

    var newdate = ""

    newdate += date[2] + "-"
    newdate += date[0] + "-"
    newdate += date[1]

    return newdate;
}