// const axios = require('axios');

//define the task counter
let taskCounterNumber;

/*The function checks if there is there is tasks in the local storage and loads them*/
window.onload = () => {
  if (localStorage.getItem("saveTask") !== null) {
    document.querySelector(".listContainer").innerHTML = localStorage.getItem(
      "saveTask"
    );
  }
  if (localStorage.getItem("saveCounter") !== null) {
    taskCounterNumber = Number(localStorage.getItem("saveCounter"));
    taskCounter.innerText = taskCounterNumber;
  } else {
    taskCounterNumber = 0;
  }
};

const taskInput = document.querySelector("#textInput");
const addButton = document.querySelector("#get");
const container = document.querySelector(".listContainer");
const taskCounter = document.querySelector("#counter");
const searchBar = document.querySelector("#search");
const deleteAll = document.querySelector("#deleteAll");

document.addEventListener("click", (e) => {
  console.log(e.target.id);
  if (e.target.id === "get") {
    let nameId = textInput.value;
    searchProduct(nameId);
  }
  if (e.target.id === "post") {
    // let data = textInput.value;
    postProduct();
  }
  if (e.target.id === "put") {
    // let data = textInput.value;
    let nameId = textInput.value;
    putProduct(nameId);
  }
  if (e.target.id === "delete") {
    // let data = textInput.value;
    let nameId = textInput.value;
    deleteProduct(nameId);
  }
});

const searchProduct = (nameId) => {
    console.log(nameId)
  axios
    .get(`http://localhost:3000/products/${nameId}`)
    .then((response) => {
        console.log(response)
      showProduct(response.data);
    })
    .catch((error) => {
      console.log(error.message);
      document.getElementById("error").innerHTML = "<p>Product not found</p>";
      setTimeout(() => {
        document.getElementById("error").innerHTML = "";
      }, 3000);
    });
};

const showProduct = (product) => {
    let productWrapper = document.createElement("div");
    productWrapper.classList.add("list-group");
    container.appendChild(productWrapper);
    console.log(product)
    productWrapper.innerHTML = `<div class="list-group-item">item: ${product.item}</div>`;
  };  

const product = {
  "id": 10,
  "item": "apple",
};
const postProduct = () => {
  axios
    .post(`http://localhost:3000/products/`, product)
    .then((response) => {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const putProduct = (nameId) => {
    axios
      .put(`http://localhost:3000/products/${nameId}`, product)
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteProduct = (nameId) => {
    axios
      .delete(`http://localhost:3000/products/${nameId}`, product)
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  

