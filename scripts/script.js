/**
 * Activity Calendar App
 * 2021-08-31
 * PM: Jack Everard
 * Developers: Vaaranan Yogalingam, Kyle Flores, Azhya Knox
 */

// Initializing variables and constants
var open = false;
var isLeft = document.querySelector(".isLeftToggle").checked;
var itemCount = 0
const sideMenu = document.querySelector(".sidemenu");

// Coordinates of the currently selected element
var x = 0
var y = 0
// Index of element being dragged (i.e. its position relative to all the other images in the side menu library)
var currentElement = 0;
// Element being dragged currently OR last element that was dragged
var toDrag = null
// Array of elements that have already been dragged onto the calendar from the library
var copies = [];
// Cells of the calendar table
const containers = document.querySelectorAll("div.p1 table tr td")
// Images that can be dragged from the library
const draggables = document.querySelectorAll("div.sidemenu table tr td img")
//test
let imagesInLibrary = document.getElementsByClassName("img-lib");
let imageArray = [];

var currentElement = 0; // Index of element being dragged (i.e. its position relative to all the other images in the side menu library)
var toDrag = null // Element being dragged currently OR last element that was dragged
var copies = []; // Array of elements that have already been dragged onto the calendar from the libraray
const containers = document.querySelectorAll("div.p1 table tr td") // Cells of the calendar table
const draggables = document.querySelectorAll("div.sidemenu table tr td img") // Images that can be dragged from the library
//TODO: draggables probably shouldn't be a const anymore, now that we can load images externally. - Kyle

// Initializing the date functionality of the app
// Note how sunday is a special case (in the Date library, Sunday = 0, Monday = 1, etc. but in our calendar, "This week" = 0, Monday = 1, ... Sunday = 7)
function setUpDate(){
	var dateToday = new Date();
	var day = dateToday.getDay();
	const days = document.querySelectorAll("div.p1 table tr th");
	if(day == 0){
		var sunday = 7;
		days[sunday].style.backgroundColor = "#c5e6f5" ;
		for(var i = sunday - 1; i < 21; i += 7){
			containers[i].style.backgroundColor = "#c5e6f5";
		}
	} else {
		days[day].style.backgroundColor = "#c5e6f5";
		for(var i = day - 1; i < 21; i += 7){
			containers[i].style.backgroundColor = "#c5e6f5";
		}
	}
}

// Slide-in library menu functionality initialization
function toggleSidemenu(){
	console.log("sidebar has been clicked");
	console.log(`open set to: ${open} and isLeft set to: ${isLeft}`);
	console.log(sideMenu);	
	
	if(!isLeft){
		if (open){
			console.log("closing sidebar to right");
			sideMenu.style.right = "-21vw"
			open = false;
		} else {
			console.log("opening sidebar to right");
			sideMenu.style.right= "0px"
			open = true;
		}
	}else {
		if(open){
			console.log("closing sidebar to left");
			sideMenu.style.left = "-21vw"
			open = false;
		} else {
			console.log("opening sidebar to left");
			sideMenu.style.left = "0px"
			open = true;
		}
	}
}

/* TODO: Switch touchstart, etc. events to their mouse-based equivalents
 * A list of some DOM JS event handlers can be found here:
 * https://www.w3schools.com/jsref/dom_obj_event.asp
 *
 * For now, the plan is:
 * > touchstart becomes dragstart
 * > touchmove becomes drag
 * > touchend becamse dragend
 *
 * Update September 18, 2021:
 * 
 * See here on how to implement drag and drop with mouse events instead of drag events:
 * https://javascript.info/mouse-drag-and-drop
 * 
 * Update September 19, 2021:
 * 
 * The mouse event handlers need to be separated into their own functions,
 * possibly away from the for loops that added the event handlers in the first place.
 * 
 * - Kyle
 */

function clickDrag(){
	console.log('click and drag event triggered!!');
	Array.prototype.forEach.call(imagesInLibrary, image => {
		image.onmousedown = (event)=>{
			//clone itself and append clone in its original spot
			const clone = image.cloneNode(true);
			let parent = image.parentNode;
			parent.append(clone);

			//add clone to imageLibrary array
			imageArray = Array.from(imagesInLibrary);
			//remove image and add clone
			imageArray = imageArray.filter(element => element !== image);
			imageArray.push(clone);

			image.style.position = 'absolute';
			image.style.zIndex = 1000;
			image.style.width = "4.9vw";
			image.style.width = "7.9vh";
			image.style.objectFit = 'scale-down';

			document.body.append(image);

			function moveAt(pageX, pageY) {
				image.style.left = pageX - image.offsetWidth / 2 + 'px';
				image.style.top = pageY - image.offsetHeight / 2 + 'px';
			}

			// move our absolutely positioned image under the pointer
			moveAt(event.pageX, event.pageY);
		
			function onMouseMove(event) {
				moveAt(event.pageX, event.pageY);
			}

			// (2) move the image on mousemove
			document.addEventListener('mousemove', onMouseMove);
		
			// (3) drop the image, remove unneeded handlers
			image.onmouseup = function() {
				document.removeEventListener('mousemove', onMouseMove);
				image.onmouseup = null;
			};
		
			image.ondragstart = function() {
				return false;
			};
		}
	});
}

//TODO: Move mouse down logic from initializeLibraryListeners() here - Kyle
function imgMouseDown() {
	console.log("Hello from the imgMouseDown() function");
	//console.log("dragObject: "+dragObject);
	console.log("event.clientX and event.clientY: (" + event.clientX + ", " + event.clientY + ")");

	//Get HTML elements at a given coordinate set: https://stackoverflow.com/questions/1259585/get-element-at-specified-position-javascript
	let elementsAtClickEvent = document.elementsFromPoint(event.clientX, event.clientY);
	/*
	console.log("Here's a list of the elements found at that position: ")
	for (var i = 0; i < elements.length; i++) {
		console.log("elements[" + i + "]: ");
		console.log(elements[i]);
	}
	*/

	toDrag = elementsAtClickEvent[0].cloneNode(true); //Clone the <img> found at the coordinates of the event
	console.log("toDrag:");
	console.log(toDrag);
	toDrag.classList.add("copy"); //Add the HTML class "copy" to the clone

	//Taken from old move logic; remove this line later.
	//Just checking to see if it copies the right image.
	document.body.append(toDrag);

	//currentElement = i;
	//toDrag = draggables[currentElement].cloneNode(true)
	//toDrag.classList.add("copy");
}

//TODO: Same as imgMouseDown.
function imgMouseMove() {
	console.log("Hello from the imgMouseMove() function");
}

//TODO: Same as imgMosueDown.
function imgMouseUp() {
	console.log("Hello from the imgMouseUp() function");
}

// Reloads latest version
function reloadPreviousCalendar(){
	// Get latest version of the body of the calendar app
	var latestBody = localStorage.getItem("latest version")
	// After "</script>" is when the newly added images appear, which is what we want to load when opening the app (these images are stored in index 1 of the array)
	x = latestBody.split("</script>")
	// Convert the string containing the images we want to load into actuall html (now stored in the body of some sample HTML)
	convertedToHTML = new DOMParser().parseFromString(x[1], 'text/html');
	// Store the actual image elements in an array of image elements what we will now load
	imagesToLoad = convertedToHTML.body.children
	// Append each image to the body (note that after appending one element from the array, you also remove that element from the array, which is why this for loop is strange)
	for(var i = 0; imagesToLoad.length != 0; i += 0){
		copies.push(imagesToLoad[i]);
		updateCopies();
		document.body.append(imagesToLoad[i])
	}
}

// Fully implementing this/next week feature
function moveIntoNextWeek(){
	var dateToday = new Date();
	if(dateToday.getDay() == 1 && localStorage.getItem("reset1?") == "false"){
		// It is monday and the week hasn't been reset yet so we need to move next week's schedule to this week
		var newThisWeek = localStorage.setItem("latest version 2")
		localStorage.setItem("latest version", newThisWeek)
		localStorage.setItem("reset1?", "true")
	} else if (dateToday.getDay() != 1){
		// It is not monday, so we can say that the week hasn't been reset yet
		localStorage.setItem("reset1?", "false")
	}
	// Note: there is no option for if the day is monday and the week has been reset yet because we wouldn't 
	// need to do anything then
}

// Invoke all methods needed to boot up app
setUpDate();
reloadPreviousCalendar();
moveIntoNextWeek();
//check for new clones every 3 secs
setInterval(()=>{
	clickDrag();
	console.log('image check complete')
}, 3000);





/**
 * SAVING AND RELOADING DATA
 * 
 * to get latest version, recall localStorage.setItem("latest version", document.body.innerHTML);
 * therefore do the following
 * 1. var latestBody = localStorage.getItem("latest version")
 * 2. x = latestBody.split("</script>\n")
 * 3. Parse this string as so:
 * 		imagesToAdd = new DOMParser().parseFromString(x[1], 'text/html');
 * 4. Now the images are stored as elements in 'document.body.children'
 * 5.copies.push(imagesToAdd.body.children[x]) AND updateCopies() where x goes from 0 to length of array
 * 6. document.body.append(imagesToAdd.body.children[x]);
 */		

// * Now you have a string containing all the latest images
// * y = x[1].split(">")
// * for(var i = 0; i < x.length() - 1; i += 1){
// 	   y[i] += '>'
//    }
// * images = [];
// * for(var i = 0; i < x.length() - 1; i += 1){
// 		 imageToAdd = new DOMParser().parseFromString(y[i], 'text/xml');
// 	   images.push()
//    }

// a = imagesToAdd.body.children
// for(var i = 0; i < 6; i += 1){
// 	copies.push(a[i]);
// 	updateCopies();
// }