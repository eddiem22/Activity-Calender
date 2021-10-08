var mouseInArea = false;

function initializeDeletionBox(){
    var myObj = document.getElementById('trash-box-container');
    mouseInArea = true;

    var element = document.querySelector('.sidemenu') || null;
    if(element === null){
        //call reverse check here
        console.log("DEV, YOU NEED TO DO A REVERSE CHECK BECAUSE CLASS DNE!")
        initializeDeletionBox_L()
    }else{
        console.log(element.computedStyleMap().get('right'));
        var isClosed = false;
        if(element.computedStyleMap().get('right') < "0px"){
            console.log("i'm negative!!!")
            isClosed = true;
        }else if(element.computedStyleMap().get('right') >= "0px"){
            console.log("i'm positive boo")
            isClosed = false;
        }
    
        if(mouseInArea === true && isClosed === true){
            console.log("mouse in deletion area");
            myObj.style.display = "flex";
        }else{
            console.log("mouse in deletion area BUT menu is also opened!!!")
        }
    }
}

function initializeDeletionBox_L(){
    var myObj2 = document.getElementById('trash-box-container');
    mouseInArea2 = true;

    var element2 = document.querySelector('.menuOnLeft');

    console.log(element2.computedStyleMap().get('left'));
    var isClosed2 = false;
    if(element2.computedStyleMap().get('left') < "0px"){
        console.log("i'm negative!!!")
        isClosed2 = true;
    }else if(element2.computedStyleMap().get('left') >= "0px"){
        console.log("i'm positive boo")
        isClosed2 = false;
    }

    if(mouseInArea2 === true && isClosed2 === true){
        console.log("mouse in deletion area");
        myObj2.style.display = "flex";
    }else{
        console.log("mouse in deletion area BUT menu is also opened!!!")
    }
}

function removeDeletionBox(){
    var myObj = document.getElementById('trash-box-container');
    setTimeout(()=>{
        mouseInArea = false;
        myObj.style.display = "none";
        console.log("mouse position in trash area has been reset");
    }, 200);
    setTimeout(()=>{
        myObj.classList.remove("trash-box-container-inside");
    }, 1000);
}