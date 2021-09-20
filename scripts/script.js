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

// Initializes event listeners for each of the library images (so they can be dragged)
function initializeLibraryListeners(){
	// 1. When an image from the library is clicked
	/*  Note to self:
	 *  According to this: https://www.w3schools.com/js/js_htmldom_eventlistener.asp
	 *  addEventListener() should have these as arguments, at the very least:
	 *  > an event listener type (obviously)
	 *  > a function
	 */
	for(let i = 0; i < draggables.length; i++){
		/*draggables[i].addEventListener("touchstart", () => {*/
		draggables[i].setAttribute("draggable", "true"); //Probably not necessary, considering we're not using drag events any more. Wouldn't hurt to leave it in though. - Kyle
		//draggables[i].preventDefault(); //Disables the default interactions of the element, if any
		//draggables[i].addEventListener("dragstart", () => {
		draggables[i].addEventListener("mousedown", imgMouseDown); //TODO: Change function argument to an actual function. - Kyle
			/*  The lines following this block comment probably need to be
			 *  tied to a "mousedown"/"onmousedown" function of some sort.
			 *  - Kyle
			 */
			//currentElement = i;
			//toDrag = draggables[currentElement].cloneNode(true)
			//toDrag.classList.add("copy");
		

	}

	/*	TODO:
	 *	"item" goes to the coordinates (0, 0) when releasing the mouse.
	 *	This inadvertently triggers the image deletion code (see the for statement below).
	 *	It otherwise has accurate coordinates during the drag event.
	 */
	// 2. When an image from the library is held onto, and being dragged
	for (item of draggables){
		/*item.addEventListener("touchmove", () => {*/
		/*item.addEventListener("drag", () => {*/

		//TODO: Change function argument to an actual function. - Kyle
		item.addEventListener("mousemove", imgMouseMove);
			//x = event.touches[0].clientX;
			//y = event.touches[0].clientY;
			/*  TODO:
			 *  All of this stuff after addEventListener probably needs to be
			 *  its own function.
			 *  - Kyle
			 */
			/*
			x = event.clientX; 
			y = event.clientY;
			console.log("image currently dragged to (x, y): (" + x + ", " + y + ")");
			document.body.append(toDrag);
			toDrag.style.position = "absolute";
			toDrag.style.width = "250px";
			toDrag.style.left = x+'px';
			toDrag.style.top = y+'px';
			*/
	}

	// 3. When an image from the library has been released
	for (item of draggables){
		/*item.addEventListener("touchend", () => {*/
		/*item.addEventListener("dragend", () => {*/
		/*  Note to self:
		 *  Getting an event-triggering element: https://stackoverflow.com/questions/6071095/get-the-element-triggering-an-onclick-event-in-jquery
		 *  The "this" keyword: https://www.w3schools.com/js/js_this.asp
		 */
		item.addEventListener("mouseup",imgMouseUp); //TODO: Change function argument to an actual function. - Kyle
			//toDrag.style.display = "none" //--> idk if this is necessary

			// Check if element was dragged to top of screen, with intent of being deleted
			// Otherwise, append the image to wherever the user released
			//TODO: Move all the dragging logic to its own function later. - Kyle
			/*
			console.log("image ended drag at (x, y): (" + x + ", " + y + ")");
			console.log("toDrag.style.left: " + toDrag.style.left);
			console.log("toDrag.style.top: " + toDrag.style.top);
			console.log("document.elementFromPoint(x,y) is: " + document.elementFromPoint(x, y));
			if ((y <= 0) || document.elementFromPoint(x, y).classList.contains("deletion-box")) {
				console.log("item dragend if block");
				toDrag.remove();
				localStorage.setItem("latest version", document.body.innerHTML);
			} else {
				console.log("item dragend else block");
				itemCount += 1;
				toDrag.style.display = "block"
				// Add the dragged in image to array of images on the calendar (i.e. the 'copies' array)
				copies.push(toDrag);
				// Update the copies array
				updateCopies();
				// Store the latest version of the calendar in local memory
				localStorage.setItem("latest version", document.body.innerHTML);
			}
			*/
	}
}

/*  TODO: Move the dragging logic to their own functions later,
 *  in the same manner as initializeLibraryListeners() above.
 *  - Kyle
 */
// Adds event listeners to the images on the calendar, in the same way we added event listeners to each image in the library
function updateCopies(){
	// Get the latest image added to the calendar (so we can initialize event listeners for it)
	var latestImage = copies[copies.length - 1]

	// 1. When an image on the calendar is clicked
	/*copies[copies.length - 1].addEventListener("touchstart", () => {*/
	copies[copies.length - 1].setAttribute("draggable", "true");
	copies[copies.length - 1].addEventListener("dragstart", () => {
		// Keep this event listener for now (not sure if there would be an error without it)
	})

	// 2. When an image on the calendar is held onto, and being dragged
	/*copies[copies.length - 1].addEventListener("touchmove", () => {*/
	copies[copies.length - 1].addEventListener("drag", () => {
		//x = event.touches[0].clientX;
		//y = event.touches[0].clientY;
		x = event.clientX;
		y = event.clientY;
		document.body.append(latestImage);
		latestImage.style.position = "absolute";
		latestImage.style.width = "250px";
		latestImage.style.left = x+'px';
		latestImage.style.top = y+'px';
	})

	// 3. When an image on the calendar has been released
	/*copies[copies.length - 1].addEventListener("touchend", () => {*/
	copies[copies.length - 1].addEventListener("dragend", () => {
		latestImage.style.display = "none"
		if ((y <= 0) || document.elementFromPoint(x, y).classList.contains("deletion-box")){
			latestImage.remove();
			index = copies.indexOf(latestImage)
			copies.splice(index, 1);
			localStorage.setItem("latest version", document.body.innerHTML);
		} else {
			latestImage.style.display = "block"
			localStorage.setItem("latest version", document.body.innerHTML);
		}
	})
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
initializeLibraryListeners();
reloadPreviousCalendar();
moveIntoNextWeek();




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