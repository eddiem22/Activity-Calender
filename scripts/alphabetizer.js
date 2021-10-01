//this function will alphabetize people based on filename
function abcPeoplePics(){
    console.log(`now alphabetizing the people images...`);
    var people_settings = localStorage.getItem('peopleFiles');
    console.log(people_settings);
    const peopleImgList = people_settings.split(",");
    console.log(peopleImgList);
    //2. append images based on new sorted list into table row
    var peopleTableRow = document.querySelector("#people-imgs-row");
    peopleImgList.forEach(item =>{
        console.log(`PEOPLE: ${item}`);
        var tableDiv = document.createElement("td");
        var img = document.createElement("img");
        var folderLoc = localStorage.getItem("peopleFolder");
        img.src = `./${folderLoc}/${item}`;
        img.classList.add("img-lib");
        img.setAttribute("onmousedown", "clickDrag()");
        tableDiv.appendChild(img);
        peopleTableRow.appendChild(tableDiv);
    });
    console.log(peopleTableRow);
    console.log("finished!");
}

//this function will alphabetize transportation images based on filename
function abcTransportPics(){
    console.log(`now alphabetizing the transportation images...`);
    var transport_settings = localStorage.getItem('transportFiles');
    console.log(transport_settings);
    const transportImgList = transport_settings.split(",");
    console.log(transportImgList);
    //2. append images based on new sorted list into table row
    var transportTableRow = document.querySelector("#transport-imgs-row");
    transportImgList.forEach(item =>{
        console.log(`TRANSPORT: ${item}`);
        var tableDiv = document.createElement("td");
        var img = document.createElement("img");
        var folderLoc = localStorage.getItem("transportFolder");
        img.src = `./${folderLoc}/${item}`;
        img.classList.add("img-lib");
        img.setAttribute("onmousedown", "clickDrag()");
        tableDiv.appendChild(img);
        transportTableRow.appendChild(tableDiv);
    });
    console.log(transportTableRow);
    console.log("finished!");
}

function abcPopularPics(){
    console.log(`now alphabetizing the popular images...`);
    var popular_settings = localStorage.getItem('popularFiles');
    console.log(popular_settings);
    const popularImgList = popular_settings.split(",");
    console.log(popularImgList);
    //2. append images based on new sorted list into table row
    var popularTableRow = document.querySelector("#popular-imgs-row");
    popularImgList.forEach(item =>{
        console.log(`POPULAR: ${item}`);
        var tableDiv = document.createElement("td");
        var img = document.createElement("img");
        var folderLoc = localStorage.getItem("popularFolder");
        img.src = `./${folderLoc}/${item}`;
        img.classList.add("img-lib");
        img.setAttribute("onmousedown", "clickDrag()");
        tableDiv.appendChild(img);
        popularTableRow.appendChild(tableDiv);
    });
    console.log(popularTableRow);
    console.log("finished!");
}

function abcActivityPics(){
    console.log(`now alphabetizing the activity images...`);
    var activity_settings = localStorage.getItem('activityFiles');
    console.log(activity_settings);
    const activityImgList = activity_settings.split(",");
    console.log(activityImgList);
    //2. append images based on new sorted list into table row
    var activityTableRow = document.querySelector("#activity-imgs-row");
    activityImgList.forEach(item =>{
        console.log(`ACTIVITY: ${item}`);
        var tableDiv = document.createElement("td");
        var img = document.createElement("img");
        var folderLoc = localStorage.getItem("activityFolder");
        img.src = `./${folderLoc}/${item}`;
        img.classList.add("img-lib");
        img.setAttribute("onmousedown", "clickDrag()");
        tableDiv.appendChild(img);
        activityTableRow.appendChild(tableDiv);
    });
    console.log(activityTableRow);
    console.log("finished!");
}

//call all alphabetizer methods at startup
// console.log("1");
// abcPeoplePics();
// setTimeout(()=>{
//     console.log("2");
//     abcTransportPics();
//     setTimeout(()=>{
//         console.log("3");
//         abcActivityPics()
//     }, 2000);
// }, 5000);
abcPeoplePics();
abcTransportPics();
abcPopularPics();
abcActivityPics();

