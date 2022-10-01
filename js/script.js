let bName = document.querySelector(".name");
let bUrl = document.querySelector(".url");
let add = document.querySelector(".add");
let nameValidation = document.querySelector(".name-validation");
let urlValidation = document.querySelector(".url-validation");
let bookTable = document.querySelector(".booktable");
let allBookMarks = [];
// checking if the local storage is not empty form the previous rec.
if (localStorage.getItem("allBookMarks") != null) {
  displayBookMarks(JSON.parse(localStorage.getItem("allBookMarks")));
  allBookMarks = JSON.parse(localStorage.getItem("allBookMarks"));
}
function addBookMark() {
  // validate the input fields are not empty and check which one is empty
  if (bName.value == "" || bUrl.value == "") {
    if (bName.value == "" && bUrl.value == "") {
      urlValidation.classList.add("show");
      nameValidation.classList.add("show");
    } else if (bUrl.value == "") {
      urlValidation.classList.add("show");
      nameValidation.classList.remove("show");
    } else if (bName.value == "") {
      nameValidation.classList.add("show");
      urlValidation.classList.remove("show");
    }
  } else {
    let bookMark = {
      name: bName.value,
      url: bUrl.value,
    };
    //check a valid bookmark name
    const isHere = allBookMarks.some((element) => {
      if (element.name == bookMark.name) {
        return true;
      } else {
        return false;
      }
    });

    if (isHere) {
      nameValidation.innerText = "This name is taken";
      nameValidation.classList.add("show");
    } else {
      allBookMarks.push(bookMark);
      localStorage.setItem("allBookMarks", JSON.stringify(allBookMarks));
      displayBookMarks(JSON.parse(localStorage.getItem("allBookMarks")));
      nameValidation.classList.remove("show");
      urlValidation.classList.remove("show");
      clear();
    }
  }
}
add.onclick = addBookMark;
function displayBookMarks(arr) {
  //display the array and concat it
  let html = "";
  for (let i = 0; i < arr.length; i++) {
    html += `<div class="bookmarks d-flex justify-content-between">
    <h2>${arr[i].name}</h2>
    <div class="cta">
      <a href="http://${arr[i].url}" target="_blank" class="btn btn-danger">Visit</a>
      <button class="btn btn-primary" onclick="removeBookMark(${i})">Delete</button>
    </div>
  </div>`;
  }
  bookTable.innerHTML = html;
}
function clear() {
  bName.value = "";
  bUrl.value = "";
}
function removeBookMark(idx) {
  allBookMarks.splice(idx, 1);
  localStorage.setItem("allBookMarks", JSON.stringify(allBookMarks));
  displayBookMarks(allBookMarks);
}
