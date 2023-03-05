let products = [
  {
    id: 0,
    name: "Xiaomi airbuds",
    price: 200,
    image: "./images/shops-1.png",
    added_to_cart: false,
  },
  {
    id: 1,
    name: "Nokia a34",
    price: 450,
    image: "./images/shops-2.png",
    added_to_cart: false,
  },
  {
    id: 2,
    name: "Iphone 12",
    price: 990,
    image: "./images/shops-3.png",
    added_to_cart: false,
  },
  {
    id: 3,
    name: "One plus s5",
    price: 700,
    image: "./images/shops-4.png",
    added_to_cart: false,
  },
  {
    id: 4,
    name: "Bluetooth headphones",
    price: 375,
    image: "./images/shops-5.png",
    added_to_cart: false,
  },
  {
    id: 5,
    name: "Sbs airphone",
    price: 280,
    image: "./images/shops-6.png",
    added_to_cart: false,
  },
];

//making new array
const newProducts = [
  ...new Set(
    products.map((item) => {
      return item;
    })
  ),
];

// setting the products in the page
let i = 0;
document.getElementById("root").innerHTML = newProducts
  .map((item) => {
    let { id, image, name, price } = item;
    return (
      `
    <div class="box">
      <div class="img-box">
        <img src=${image} class="image"/>
      </div>
      <div class="bottom">
        <h4>${name}</h4>
        <h2>$ ${price}</h2>` +
      "<button class='add-to-cart' onclick='addToCart(" +
      i++ +
      ", this)'>Add to cart</button>" +
      `<button onclick='viewProduct(${id})' class='view-product'>View product</button>
      </div>
    </div>`
    );
  })
  .join("");

function addToCart(item, button) {
  const existingItem = cart.find(
    (cartItem) => cartItem.id === newProducts[item].id
  );
  if (existingItem) {
    button.innerHTML = "Remove from cart";
    button.setAttribute("onclick", `removeFromCart(${item}, this)`);
  } else {
    cart.push({ ...newProducts[item] });
    document.getElementById("count").innerHTML = cart.length;
    localStorage.setItem("cart", JSON.stringify(cart));
    button.innerHTML = "Remove from cart";
    button.setAttribute("onclick", `removeFromCart(${item}, this)`);
    displayCart();
  }
}

function removeFromCart(item, button) {
  cart = cart.filter((cartItem) => cartItem.id !== newProducts[item].id);
  document.getElementById("count").innerHTML = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
  button.innerHTML = "Add to cart";
  button.setAttribute("onclick", `addToCart(${item}, this)`);
  displayCart();
}

//handling cart
let cartBtn = document.querySelector(".cart-btn");
let cartMenu = document.querySelector(".cart-menu");
cartBtn.addEventListener("click", function () {
  cartMenu.classList.toggle("active");
});

let cart = [];
if (localStorage.getItem("cart")) {
  let existingItems = JSON.parse(localStorage.getItem("cart"));
  cart = existingItems;
  document.getElementById("count").innerHTML = cart.length;
  displayCart();
}

function displayCart() {
  let j = 0;
  total = 0;
  document.getElementById("count").innerHTML = cart.length;
  if (cart.length == 0) {
    document.getElementById("cart-item").innerHTML = "Your cart is empty";
    document.getElementById("total").innerHTML = "$ " + 0 + ".00";
  } else {
    document.getElementById("cart-item").innerHTML = cart
      .map((item) => {
        let { image, name, price } = item;
        total = total + price;
        document.getElementById("total").innerHTML = "$ " + total + "";

        return `
        <div class="cart-item">
          <div class="row-img">
            <img src=${image} class="row-image" />
          </div>
          <p>${name}</p>
          <h2>$ ${price}</h2>
        </div>`;
      })
      .join("");
  }
}

// handling quick view modal
function viewProduct(item, button) {
  let { name, price, image } = newProducts[item];
  let modalContent =
    `
      <span class="close">&times;</span>
      <div class="modal-body">
        <img src="${image}" class="modal-image" />
        <div class="modal-details">
          <h2>${name}</h2>
          <p>Price: $${price}</p>` +
    "<button class='add-to-cart' onclick='addToCart(" +
    i++ +
    ", this)'>Add to cart</button>" +
    "</div>" +
    "</div>";
  let modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = modalContent;

  let modalClose = modal.querySelector(".close");
  modalClose.addEventListener("click", function () {
    modal.remove();
  });

  document.body.appendChild(modal);
}
