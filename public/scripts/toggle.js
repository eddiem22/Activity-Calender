//global variables
var open = false;
let leftSideMenu = document.querySelector(".sidemenu");
let sideBarImg = document.querySelector(".sidebar");
var isLeft = false;
const sideToggleBtn = document.querySelector(".isLeftToggle");

// this function is to transition settings sidebar from right to left side of screen
function switchToLeft(){
    console.log(leftSideMenu);
    console.log("toggle has been clicked!");
    //reset isLeft based on 
    isLeft = sideToggleBtn.checked;
    console.log(isLeft);
    //when toggle is clicked
    if(!isLeft){
        //left settings should be on
        //swap classes to -left
        leftSideMenu.classList.remove("sidemenu");
        leftSideMenu.classList.add("menuOnLeft");
        //swap bar classes too
        sideBarImg.classList.remove("sidebar");
        sideBarImg.classList.add("barOnLeft");
        //set the toggle btn based on new class
        leftSideMenu = document.querySelector(".menuOnLeft");
        sideBarImg = document.querySelector(".barOnLeft");
        //set the toggle to ON (blue)
        setTimeout(()=>{
            sideToggleBtn.checked = true;
            console.log(sideToggleBtn);
            console.log(sideToggleBtn.checked);
            //set isLeft boolean to TRUE
            isLeft = true;
            console.log("done");
        }, 1500);
        console.log("finished!!!");
    }else{
        //left settings should be off
        leftSideMenu.style = "";
        //swap classes to default
        leftSideMenu.classList.remove("menuOnLeft");
        leftSideMenu.classList.add("sidemenu");
        //swap bar classes too
        sideBarImg.classList.remove("barOnLeft");
        sideBarImg.classList.add("sidebar");
        //set the toggle btn based on new class
        leftSideMenu = document.querySelector(".sidemenu");
        sideBarImg = document.querySelector(".sidebar");
        //set toggle to OFF (grey)
        setTimeout(()=>{
            sideToggleBtn.checked = false;
            console.log(sideToggleBtn);
            console.log(sideToggleBtn.checked);
            //set isLeft boolean to FALSE
            isLeft = false;
            console.log("done 2")
        }, 1500);
        console.log("finished 2!!!");
    }
}

//open the settings page from the sidebar button
function goToSettings(){
    console.log("settings cog has been clicked.");
    window.location.href = "settings.html";
}