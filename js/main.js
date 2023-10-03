let dataProduct = [];
let listItem = [];

// MODAL
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

let productsEndpoint = "https://fakestoreapi.com/products";
let list = document.querySelector(".list");
let cart = document.querySelector(".cart-items");

let modalBody = document.getElementsByClassName("modal-body")[0];


// ADD card funcsiya

function addToCart(id) {
  const item = dataProduct.find((i) => i.id === id);
  if (item && !listItem.includes(item)) { 
    listItem.push(item);
    displayCartItem(item);
    saveCartItems();
  }
  console.log(listItem);
}

function displayCartItem(item) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.width = "18rem";
  card.innerHTML = `
    <img class="card-img-top" src="${item.image}">
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5>
      <p>${item.category}</p>
      <div class="d-flex align-items-center d-block">
        <button  class="qoshish">+</button>
        <p>0</p>
        <button  class="">-</button>
      </div>

      <b>Narx</b><p>${item.rating.count} So'm</p>
      <p class="umumiy-narx">0</p>
      <p class="soni"></p>
      <button class="remove-card" onclick="removeCartItem(this)">O'chirish</button>
    </div>
  `;
  modalBody.appendChild(card);
}

function removeCartItem(button) {
  const cardBody = button.parentNode;
  const card = cardBody.parentNode;
  card.remove();
  const index = listItem.findIndex((item) => item.title === card.querySelector(".card-title").textContent);
  if (index !== -1) {
    listItem.splice(index, 1);
    saveCartItems(); 
  }
}

function clearModalBody() {
  while (modalBody.firstChild) {
    modalBody.removeChild(modalBody.firstChild);
  }
  listItem = [];
}

function saveCartItems() {
  localStorage.setItem("cartItems", JSON.stringify(listItem));
}

function loadCartItems() {
  const storedItems = localStorage.getItem("cartItems");
  if (storedItems) {
    listItem = JSON.parse(storedItems);
    listItem.forEach((item) => {
      displayCartItem(item);
    });
  }
}

fetch(productsEndpoint)
  .then((res) => res.json())
  .then((data) => {
    dataProduct = data;
    clearModalBody();
    list.innerHTML = data
      .map(
        (item) => `
          <ul class="list">
            <li class="list__item">
              <a class="list__item-link" href="#">
                <img class="list_img" src="${item.image}" alt="pepsi">
                <p class="text">${item.title}</p>
                <p class="text__twoo">${item.category}</p>
                <br>
                <mark class="mark__text">${item.rating.count}  so'm</mark>
                <br>
                <del class="el__text">${item.price} so'm</del>
                <br>
                <b class="b__text">${item.id}</b>
                <a>
                <button class="Add_card" style="background-color: blue;" onclick="addToCart(${item.id})">Savatga qo'shish</button>
                </a>
            </li>
          </ul>
        `
      )
      .join("");
    loadCartItems(); 
  })
  .catch((err) => {
    console.log(err);
  });
// local stor
// MODAL
btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};







function addToCart(id) {
  const item = dataProduct.find((i) => i.id === id);
  if (item && !listItem.includes(item)) { 
    listItem.push(item);
    displayCartItem(item);
    saveCartItems();
    const addButton = document.querySelector(`[onclick="addToCart(${id})"]`);
    addButton.textContent = "O'chirish";
    addButton.onclick = function() {
      removeCartItem(this);
    };
  } else {
    removeCartItemButton(id);
  }
  console.log(listItem);
}

function removeCartItemButton(id) {
  const addButton = document.querySelector(`[onclick="addToCart(${id})"]`);
  addButton.textContent = "Savatga qo'shish";
  addButton.onclick = function() {
    addToCart(id);
  };
}

function chiqarish() {
  for (var i = 0; i < 10; i++) {
    console.log("Karta chiqarildi");
  }
}

function tugma_bosildi() {
  console.log("Tugma bosildi");
  chiqarish();
}

var button = document.createElement("button");
button.innerHTML = "Nomli Button";
button.addEventListener("click", tugma_bosildi);

document.body.appendChild(button);




