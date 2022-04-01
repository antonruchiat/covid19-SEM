function sesGlobal(e) {
  let defaultBtn1 = document.querySelector(".ses-global-month-btn");
  let defaultBtn2 = document.querySelector(".ses-global-year-btn");
  let targetID = document.querySelector("#targetGlobal");
  let headingTable = document.querySelector("#globalHeading");
  let checkElClass = e.classList;

  if(checkElClass.contains("ses-global-month-btn")){
    if(checkElClass.contains("ses-global-active")) {
      targetID.classList.remove("animate");
      window.requestAnimationFrame(function() {
        targetID.classList.add("animate");
      });
      headingTable.innerText = "Cases Date";

    } else {
      targetID.classList.remove("animate");
      window.requestAnimationFrame(function() {
        targetID.classList.add("animate");
      });
      headingTable.innerText = "Cases Date";
      e.classList.add("ses-global-active");

      defaultBtn2.classList.remove("ses-global-active");
    }
  } else if(checkElClass.contains("ses-global-year-btn")) {
    if(checkElClass.contains("ses-global-active")){
        targetID.classList.remove("animate");
        window.requestAnimationFrame(function() {
          targetID.classList.add("animate");
        });
        headingTable.innerText = "Cases Year";
    } else {
      targetID.classList.remove("animate");
      window.requestAnimationFrame(function() {
        targetID.classList.add("animate");
      });
      headingTable.innerText = "Cases Year";
      e.classList.add("ses-global-active");
      defaultBtn1.classList.remove("ses-global-active");
    }   

  } else {
    alert("maybe there is an error")
  }
}

function sesProvince(e){
  let defaultBtn1 = document.querySelector(".ses-province-month-btn");
  let defaultBtn2 = document.querySelector(".ses-province-year-btn");
  let targetID = document.querySelector("#targetProvince");
  let headingTable = document.querySelector("#provinceHeading");
  let checkElClass = e.classList;

  if(checkElClass.contains("ses-province-month-btn")){
    if(checkElClass.contains("ses-global-active")) {
      targetID.classList.remove("animate");
      window.requestAnimationFrame(function() {
        targetID.classList.add("animate");
      });
      headingTable.innerText = "Cases Date";

    } else {
      targetID.classList.remove("animate");
      window.requestAnimationFrame(function() {
        targetID.classList.add("animate");
      });
      headingTable.innerText = "Cases Date";
      e.classList.add("ses-global-active");

      defaultBtn2.classList.remove("ses-global-active");
    }
  } else if(checkElClass.contains("ses-province-year-btn")) {
    if(checkElClass.contains("ses-global-active")){
        targetID.classList.remove("animate");
        window.requestAnimationFrame(function() {
          targetID.classList.add("animate");
        });
        headingTable.innerText = "Cases Year";
    } else {
      targetID.classList.remove("animate");
      window.requestAnimationFrame(function() {
        targetID.classList.add("animate");
      });
      headingTable.innerText = "Cases Year";
      e.classList.add("ses-global-active");
      defaultBtn1.classList.remove("ses-global-active");
    }   

  } else {
    alert("maybe there is an error");
  }
}