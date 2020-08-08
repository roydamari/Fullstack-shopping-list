

const textInput = document.querySelector("#textInput");
const addButton = document.querySelector("#get");
const container = document.querySelector("#listContainer");
const taskCounter = document.querySelector("#counter");
const searchBar = document.querySelector("#search");
const dataContainer = document.querySelector("#dataContainer");
const tableContainer = document.querySelector("#tableContainer");

let totalCost = 0;

//Add event listener for all click events
document.addEventListener("click", (e) => {
  if (e.target.id === "get" && textInput.value) {
    let nameId = textInput.value;
    textInput.value = "";
    searchProduct(nameId);
  }
  if (e.target.id === "post") {
    let id = document.querySelector("#postId");
    let name = document.querySelector("#postName");
    let price = document.querySelector("#postPrice");
    let newProductJson = JSON.parse(
      `{"id":${id.value}, "item":"${name.value}", "price":"${price.value}"}`
    );
    id.value = "";
    name.value = "";
    price.value = "";
    postProduct(newProductJson);
  }
  if (e.target.id === "put") {
    let id = document.querySelector("#putId");
    let name = document.querySelector("#putName");
    let price = document.querySelector("#putPrice");
    //convert input to JSON
    let updateProductJson = JSON.parse(
      `{"id":${id.value}, "item":"${name.value}", "price":"${price.value}"}`
    );
    putProduct(id.value, updateProductJson);
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

//Get products in data base
const getData = () => {
axios
.get(`http://localhost:3000/products`)
.then((response) => {
  CreateTableFromJSON(response.data);
})
.catch((error) => {
  console.log(error.message);
});
}

//load the data base when the program loads
window.addEventListener("load", getData);

//search product in data base
const searchProduct = (nameId) => {
  console.log(nameId);
  axios
    .get(`http://localhost:3000/products/${nameId}`)
    .then((response) => {
      showProduct(response.data);
    })
    .catch((error) => {
      console.log(error.message);
      document.getElementById("error").innerHTML = `product not found`;
      document.getElementById("error").style.border = `solid red`;
      setTimeout(() => {
        document.getElementById("error").style.border = `solid rgb(33, 235, 15)`;
        document.getElementById("error").innerHTML = "Ok";
      }, 5000);
    });
};

//create the product
const showProduct = (product) => {
  let productName = product.item;
  let productPrice = product.price;
  let productWrapper = document.createElement("div");
  productWrapper.classList.add("list-group");
  container.appendChild(productWrapper);
  totalCost += Number(productPrice);
  productWrapper.innerHTML = `<div id="productWrapper" class="list-group-item"><p>item: ${productName}</p>
  <p>price: <span class="productPrice">${productPrice}</span>$</p>
  <button type="button" id="delBtn"class="btn btn-default btn-sm"> 
  <span class="glyphicon glyphicon-trash"></span></button></div>`;
  let total = document.getElementById("total");
  total.innerHTML = `<p id="counter"><span id="counterNum">${totalCost}</span>$</p>`   
};

const removeItem = (e) => {
  //define the father
  let parent = e.target.parentElement;
  //create sure father 
  let price = parent.children[1].children[0]
  totalCost -= Number(price.innerText);
  counterNum.innerHTML = totalCost  
  parent.parentElement.removeChild(parent);
}

//add product to data base
const postProduct = (product) => {
  axios
    .post(`http://localhost:3000/products/`, product)
    .then((response) => {
      console.log(response.data);
      getData()
    })
    .catch(function (error) {
      console.log(error);
      document.getElementById("error").innerHTML = `<p>This ID elready Used</p>`;
      document.getElementById("error").style.border = `solid red`;
      setTimeout(() => {
        document.getElementById("error").style.border = `solid rgb(33, 235, 15)`;
        document.getElementById("error").innerHTML = "Ok";
      }, 5000);
    });
};

//update product in data base
const putProduct = (id, product) => {
  document.querySelector("#putName").value = "";
    document.querySelector("#putId").value = "";
    document.querySelector("#putPrice").value = "";
  axios
    .put(`http://localhost:3000/products/${id}`, product)
    .then((response) => {
      console.log(response.data);
      getData();
    })
    .catch(function (error) {
      console.log(error);
      document.getElementById("error").innerHTML = `<p>ID Not Found</p>`;
      document.getElementById("error").style.border = `solid red`;
      setTimeout(() => {
        document.getElementById("error").style.border = `solid rgb(33, 235, 15)`;
        document.getElementById("error").innerHTML = "Ok";
      }, 5000);
    });
    
};

//delete product from data base
const deleteProduct = (id) => {
  axios
    .delete(`http://localhost:3000/products/${id}`)
    .then((response) => {
      console.log(response.data);
      getData();
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("error").innerHTML = `<p>ID Not Found</p>`;
      document.getElementById("error").style.border = `solid red`;
      setTimeout(() => {
        document.getElementById("error").style.border = `solid rgb(33, 235, 15)`;
        document.getElementById("error").innerHTML = "Ok";
      }, 5000);
    });
};


function CreateTableFromJSON(products) {
  // Extract the values for the table header
  var col = [];
  for (var i = 0; i < products.length; i++) {
    for (var key in products[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }

  // Create the table
  var table = document.createElement("table");


  var tr = table.insertRow(-1);

  for (var i = 0; i < col.length; i++) {
    var th = document.createElement("th"); 
    th.innerHTML = col[i];
    tr.appendChild(th);
  }

  // Add data to the rowa
  for (var i = 0; i < products.length; i++) {
    tr = table.insertRow(-1);

    for (var j = 0; j < col.length; j++) {
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = products[i][col[j]];
    }
  }

  // Add the table to the container
  tableContainer.innerHTML = "";
  table.classList.add("table");
  tableContainer.appendChild(table);
}
