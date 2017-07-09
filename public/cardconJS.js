var userSchedule = document.getElementById('userSchedule');
var userScheduleBackground = document.getElementById('userScheduleBackground');
var insertPlace = userSchedule.tBodies[0];
var items = {};
var chosenTalks;
var schedule = document.getElementById('schedule');
var errorBox = document.getElementById('errorBox');
var searchResults = document.getElementById('searchResult');
var moreButtons = document.getElementsByClassName("moreButton");
var closeButton = document.getElementById("closeButton");
var openButton = document.getElementById("openButton");
var printButton = document.getElementById("printButton");
countChosenTalks();
// minifyTable();

/* for (var i = 0; i < moreButtons.length; i++) {
	moreButtons[i].addEventListener('click', expandTableCell);
} */

closeButton.addEventListener('click', closeUserSchedule);
openButton.addEventListener('click', openUserSchedule);
printButton.addEventListener('click', window.print);

schedule.addEventListener('click', userScheduleControl);

userSchedule.addEventListener('click', function(e) {
	if(e.target.tagName == 'TD') {
		removeMe(e.target.parentElement);
		countChosenTalks();
	}	
});

document.forms[0][1].addEventListener('click', onClickSearch);
document.forms[0].addEventListener('input', onClickSearch);

function userScheduleControl(e) {
	if(e.target.tagName == 'TD') {
		if(items[e.target.parentElement.firstElementChild.innerHTML] == undefined) { //if this id is undefined
			items[e.target.parentElement.firstElementChild.innerHTML] = e.target.parentElement.children[1].innerHTML;
			var clone = e.target.parentElement.cloneNode(true);
			clone.classList.remove('checked');
			clone.cloneOf = e.target.parentElement;
			insertPlace.append(clone);
			e.target.parentElement.aClone = clone;
			e.target.parentElement.classList.add('checked');
		}
		else if(items[e.target.parentElement.firstElementChild.innerHTML] == e.target.parentElement.children[1].innerHTML) { //if this id specifies for this element
			if(e.target.parentElement.aClone)
				removeMe(e.target.parentElement.aClone);
		}
		else //if this id specifies another item
			message('You already have an event in this time.<br>Click the event in your Schedule to delete it.');
	}

	/* for (var i = 0; i < moreButtons.length; i++) {
		moreButtons[i].addEventListener('click', expandTableCell);
	} */
	countChosenTalks();
}

function message(msg) {
	errorBox.innerHTML = msg;
	errorBox.hidden = false;
	setTimeout(function() { errorBox.hidden = true; }, 3000);
}

function removeMe(elem) {
	items[elem.firstElementChild.innerHTML] = undefined;
	if(Object.keys(items).length == 0) userSchedule.hidden = true;
	elem.cloneOf.classList.remove('checked');
	elem.remove();
}

function search(req) {
	req = req.toLowerCase();
	var res = [];
	[].forEach.call(schedule.tBodies[0].children, function(line) {
		if(line.tagName == 'TR')
			if(line.innerHTML.toLowerCase().indexOf(req) != -1) {
				res.push(line);
				line.hidden = false;
			}
			else
				line.hidden = true;
	})
	return res;
}

function onClickSearch() {
	search(document.forms[0][0].value);
	return false;
}

function closeUserSchedule() {
	closeButton.parentElement.hidden = true;
	document.body.style.overflowY = "auto";
}

function openUserSchedule() {
	closeButton.parentElement.hidden = false;
	document.body.style.overflowY = "hidden";
}

function countChosenTalks() {
	chosenTalks = userSchedule.firstElementChild.children.length - 1;
	openButton.innerHTML = chosenTalks;
	checkCounter();
}

function checkCounter() {
	if (!chosenTalks) {
		userSchedule.hidden = true;
		printButton.style.display = "none";
		return;
	}

	userSchedule.hidden = false;
	printButton.style.display = "block";
}

/* function minifyTable() {
	var tableCells = document.body.getElementsByTagName("TD");
	for (var i = 0; i < tableCells.length; i++) {
		if (tableCells[i].innerHTML.length > 110) {
			tableCells[i].innerHTML = tableCells[i].innerHTML.substr(0, 107) + "<span class=\"moreButton\">... more</span><span class=\"minifier\" style=\"display: none\">" + tableCells[i].innerHTML.slice(107, tableCells[i].innerHTML.length) + "</span>";
		}
	}
}

function expandTableCell(event) {
	var element = event.target.parentElement.getElementsByClassName("minifier")[0];
	event.target.style.display = "none";
	element.style.display = "initial"; 
} */