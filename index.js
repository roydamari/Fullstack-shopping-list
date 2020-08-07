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

const textInput = document.querySelector("#textInput");
const addButton = document.querySelector("#get");
const container = document.querySelector("#listContainer");
const taskCounter = document.querySelector("#counter");
const searchBar = document.querySelector("#search");
const dataContainer = document.querySelector("#dataContainer");
const tableContainer = document.querySelector("#tableContainer");
// Find our form in the DOM using its class name.

// const product = {
//   "id": 10,
//   "item": "apple",
// };

document.addEventListener("click", (e) => {
  console.log(e.target.id);
  if (e.target.id === "get") {
    let nameId = textInput.value;
    textInput.value = "";
    searchProduct(nameId);
  }
  if (e.target.id === "post") {
    let id = document.querySelector("#postId");
    let name = document.querySelector("#postName");
    let newProductJson = JSON.parse(
      `{"id":${id.value}, "item":"${name.value}"}`
    );
    // id.value = "";
    // name.value = "";
    postProduct(newProductJson);
  }
  if (e.target.id === "put") {
    let id = document.querySelector("#putId");
    let name = document.querySelector("#putName");
    let updateProductJson = JSON.parse(
      `{"id":${id.value}, "item":"${name.value}"}`
    );
    putProduct(id.value, updateProductJson);
     id.value = "";
    name.value = "";
  }
  if (e.target.id === "delete") {
    // let data = textInput.value;
    let id = document.querySelector("#deleteId");
    deleteProduct(id.value);
    id.value = "";
    name.value = "";
  }
  if (e.target.id === "delBtn") {
    //call the remove func
    removeItem(e);
}
});

const getData = () => {
axios
.get(`http://localhost:3000/products`)
.then((response) => {
  console.log(response);
  CreateTableFromJSON(response.data);
})
.catch((error) => {
  console.log(error.message);
});
}

window.addEventListener("load", getData);

const searchProduct = (nameId) => {
  console.log(nameId);
  axios
    .get(`http://localhost:3000/products/${nameId}`)
    .then((response) => {
      console.log(response);
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
  console.log(product);
  if (typeof product === "object") {
    product = product.item;
  }
  let productWrapper = document.createElement("div");
  productWrapper.classList.add("list-group");
  container.appendChild(productWrapper);
  console.log(product);
  productWrapper.innerHTML = `<div class="list-group-item">item: ${product}
  <button type="button" id="delBtn"class="btn btn-default btn-sm"> 
  <span class="glyphicon glyphicon-trash"></span></button></div>`;
};

const removeItem = (e) => {
  //define the father
  let parent = e.target.parentElement;
  //create sure father
  parent.parentElement.removeChild(parent);
}


const postProduct = (product) => {
  axios
    .post(`http://localhost:3000/products/`, product)
    .then((response) => {
      console.log(response.data);
      getData()
    })
    .catch(function (error) {
      console.log(error);
    });
};

const putProduct = (id, product) => {
  console.log(id);
  axios
    .put(`http://localhost:3000/products/${id}`, product)
    .then((response) => {
      console.log(response.data);
      getData();
    })
    .catch(function (error) {
      console.log(error);
    });
};

const deleteProduct = (id) => {
  axios
    .delete(`http://localhost:3000/products/${id}`)
    .then((response) => {
      console.log(response.data);
      getData();
    })
    .catch((error) => {
      console.log(error);
    });
};

function CreateTableFromJSON(products) {
  // EXTRACT VALUE FOR HTML HEADER.
  // ('Book ID', 'Book Name', 'Category' and 'Price')
  var col = [];
  for (var i = 0; i < products.length; i++) {
    for (var key in products[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }

  // CREATE DYNAMIC TABLE.
  var table = document.createElement("table");

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  var tr = table.insertRow(-1); // TABLE ROW.

  for (var i = 0; i < col.length; i++) {
    var th = document.createElement("th"); // TABLE HEADER.
    th.innerHTML = col[i];
    tr.appendChild(th);
  }

  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (var i = 0; i < products.length; i++) {
    tr = table.insertRow(-1);

    for (var j = 0; j < col.length; j++) {
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = products[i][col[j]];
    }
  }

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  tableContainer.innerHTML = "";
  table.classList.add("table");
  tableContainer.appendChild(table);
}
