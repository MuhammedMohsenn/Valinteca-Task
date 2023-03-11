const products = [
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

//handling cart
const cartBtn = document.querySelector(".cart");
const cartMenu = document.querySelector(".cart-menu");
cartBtn.addEventListener("click", function () {
  cartMenu.classList.toggle("active");
});

let cart = [];
if (localStorage.getItem("cart")) {
  let existingItems = JSON.parse(localStorage.getItem("cart"));
  cart = existingItems;
  document.getElementById("count").textContent = cart.length;
  displayCart();
}

function displayCart() {
  total = 0;
  document.getElementById("count").textContent = cart.length;
  if (cart.length == 0) {
    document.getElementById("cart-item").textContent = "Your cart is empty";
    document.getElementById("total").textContent = "$ " + 0 + ".00";
  } else {
    document.getElementById("cart-item").innerHTML = cart
      .map((item) => {
        let { id, image, name, price } = item;
        total = total + price;
        document.getElementById("total").textContent = "$ " + total + "";

        return `
        <div class="cart-item" data-product-id=${id}>
          <div class="row-img">
            <img src=${image} class="row-image" />
          </div>
          <div class="product-details">
            <p>${name}</p>
            <h2>$${price}</h2>
          </div>
          <div>
            <p class="del-btn" onclick="removeFromCart(${id},this)">Remove</p>
          </div>
        </div>`;
      })
      .join("");
  }
};

// setting the products in the page

document.getElementById("root").innerHTML = newProducts
  .map((item) => {
    let { id, image, name, price } = item;
    let added_to_cart = cart.some((cartItem) => cartItem.id === id);
    return (
      `
     <div class="box">
      <div class="img-box">
        <img src=${image} class="image"/>
      </div>
      <div class="bottom">
        <h4>${name}</h4>
        <h2>$ ${price}</h2>
        <button class='add-to-cart' onclick='addToCart(${id}, this)' data-product-id=${id} ${added_to_cart ? "style='display:none'" : ""}>Add to cart</button>
        <button class='remove-from-cart' onclick='removeFromCart(${id}, this)' data-product-id=${id} ${added_to_cart ? "" : "style='display:none'"}>Remove from cart</button>
        <button onclick='viewProduct(${id})' class='view-product'>View product</button>
      </div>
    </div>`
    );
  })
  .join("");

//Add to cart function
function addToCart(item, button) {
  const existingItem = cart.find(
    (cartItem) => cartItem.id === newProducts[item].id
  );
  if (existingItem) {
    button.textContent = "Remove from cart";
    button.setAttribute("onclick", `removeFromCart(${item}, this)`);
  } else {
    cart.push({ ...newProducts[item] });
    document.getElementById("count").textContent = cart.length;
    localStorage.setItem("cart", JSON.stringify(cart));
    button.textContent = "Remove from cart";
    button.setAttribute("onclick", `removeFromCart(${item}, this)`);
    displayCart();

    const itemCardBtn = document.querySelector(
      `[data-product-id="${item}"]`
    );
    if(itemCardBtn.textContent = "Add to cart"){
    itemCardBtn.textContent = "Remove from cart";
    itemCardBtn.setAttribute("onclick", `removeFromCart(${item}, this)`);
    }else if(itemCardBtn.textContent = "Remove from cart"){
      itemCardBtn.textContent = "Add to cart";
      itemCardBtn.setAttribute("onclick", `addToCart(${item}, this)`);
      }
  }
}

//Remove from cart function
function removeFromCart(item, button) {
  cart = cart.filter((cartItem) => cartItem.id !== newProducts[item].id);
  document.getElementById("count").textContent = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
  button.textContent = "Add to cart";
  button.setAttribute("onclick", `addToCart(${item}, this)`);
  displayCart();
  const itemCardBtn = document.querySelector(
    `[data-product-id="${item}"]`
  );
  if(itemCardBtn.textContent = "Remove from cart"){
  itemCardBtn.textContent = "Add to cart";
  itemCardBtn.setAttribute("onclick", `addToCart(${item}, this)`);
  }
}

// handling quick view modal
function viewProduct(item) {
  let { id, name, price, image } = newProducts[item];
  let added_to_cart = cart.some((cartItem) => cartItem.id === id);
  let modalContent =
    `
      <span class="close">&times;</span>
      <div class="modal-body">
        <img src="${image}" class="modal-image" />
        <div class="modal-details">
          <h2>${name}</h2>
          <p>Price: $${price}</p>
          <button class='vp-add-to-cart' onclick='addToCart(${id}, this)' data-product-id=${id} ${added_to_cart ? "style='display:none'" : ""}>Add to cart</button>
          <button class='vp-remove-from-cart' onclick='removeFromCart(${id}, this)' data-product-id=${id} ${added_to_cart ? "" : "style='display:none'"}>Remove from cart</button>
        </div>
      </div>`;
  let modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = modalContent;

  let modalOverlay = document.createElement("div");
  modalOverlay.classList.add("modal-overlay");
  modalOverlay.appendChild(modal);

  const modalClose = modal.querySelector(".close");
  modalClose.addEventListener("click", function () {
    modalOverlay.remove();
  });
  document.body.appendChild(modalOverlay);
};