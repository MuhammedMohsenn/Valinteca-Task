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

// cart btn and drop down menu
let cartBtn = document.querySelector(".cart-btn");
let cartMenu = document.querySelector(".cart-menu");
cartBtn.addEventListener("click", function () {
  cartMenu.classList.toggle("active");
});

//making new array
const newProducts = [
  ...new Set(
    products.map((item) => {
      return item;
    })
  ),
];

const CART = {
  KEY: "MyCart",
  contents: [],
  init() {
    //check localStorage and initialize the contents of CART.contents
    let _contents = localStorage.getItem(CART.KEY);
    if (_contents) {
      CART.contents = JSON.parse(_contents);
    } else {
      CART.contents = [];
      CART.sync();
    }
  },
  async sync() {
    let _cart = JSON.stringify(CART.contents);
    await localStorage.setItem(CART.KEY, _cart);
  },
};

// setting the products in the page
let i = 0;
document.getElementById("root").innerHTML = newProducts.forEach(() => {
  let box = document.createElement("div");
  box.classList.add("box");

  let image = document.createElement("div");
  image.classList.add("image");
  image.src = image;

  let imgBox = document.createElement("div");
  imgBox.classList.add("img-box");
  imgBox.appendChild(image);

  let name = document.createElement("h4");
  name.classList.add("name");
  name.innerHTML = name;

  let price = document.createElement("p");
  price.classList.add("price");
  price.innerHTML = price;

  let addToCartBtn = document.createElement("button");
  addToCartBtn.classList.add("add-to-cart");
  addToCartBtn.setAttribute("onclick", addToCart(i++));

  let viewProduct = document.createElement("button");
  viewProduct.classList.add("view-product");
  viewProduct.setAttribute("onclick", viewProduct(id));

  let bottom = document.createElement("div");
  bottom.classList.add("bottom");
  bottom.appendChild(name);
  bottom.appendChild(price);
  bottom.appendChild(addToCartBtn);
  bottom.appendChild(viewProduct);
});

//handling cart
let cart = [];
if (localStorage.getItem(CART.KEY)) {
  cart = JSON.parse(localStorage.getItem(CART.KEY));
  document.getElementById("count").innerHTML = cart.length;
}

document.addEventListener("DOMContentLoaded ", function () {
  let button = document.getElementById("add-to-cart");

  if (button && localStorage.getItem(CART.KEY)) {
    cart = JSON.parse(localStorage.getItem(CART.KEY));
    document.getElementById("count").innerHTML = cart.length;

    button.innerHTML = "Remove from cart";
    button.setAttribute("onclick", `removeFromCart(${item}, this)`);
  }
});

function addToCart(item, button) {
  // Check if the item is already in the cart
  const existingItem = cart.find(
    (cartItem) => cartItem.id === newProducts[item].id
  );
  if (existingItem) {
    // If the item is already in the cart, update the button text and function
    button.innerHTML = "Remove from cart";
    button.setAttribute("onclick", `removeFromCart(${item}, this)`);
  } else {
    // Otherwise, add the product to the cart array
    cart.push({ ...newProducts[item] });
    // Update the cart count
    document.getElementById("count").innerHTML = cart.length;
    // Update the cart in local storage
    localStorage.setItem(CART.KEY, JSON.stringify(cart));
    // Change the button text to "Remove from cart"
    button.innerHTML = "Remove from cart";
    // Change the button function to "removeFromCart"
    button.setAttribute("onclick", `removeFromCart(${item}, this)`);
  }
}

function removeFromCart(item, button) {
  // Remove the product from the cart array
  cart = cart.filter((cartItem) => cartItem.id !== newProducts[item].id);
  // Update the cart count
  document.getElementById("count").innerHTML = cart.length;
  // Update the cart in local storage
  localStorage.setItem(CART.KEY, JSON.stringify(cart));
  // Change the button text to "Add to cart"
  button.innerHTML = "Add to cart";
  // Change the button function to "addToCart"
  button.setAttribute("onclick", `addToCart(${item}, this)`);
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
function viewProduct(item) {
  let { name, price, image } = newProducts[item];
  let modalContent = `
      <span class="close">&times;</span>
      <div class="modal-body">
        <img src="${image}" class="modal-image" />
        <div class="modal-details">
          <h2>${name}</h2>
          <p>Price: $${price}</p>
        </div>
      </div>
  `;
  let modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = modalContent;

  let modalClose = modal.querySelector(".close");
  modalClose.addEventListener("click", function () {
    modal.remove();
  });

  document.body.appendChild(modal);
}

// let PRODUCTS = [
//   {
//     id: 0,
//     title: "Xiaomi airbuds",
//     itemPrice: 200.23,
//     qty: 5,
//     image: "./images/shops-1.png",
//     added_to_cart: false,
//   },
//   {
//     id: 1,
//     title: "Nokia a34",
//     itemPrice: 450.45,
//     qty: 2,
//     image: "./images/shops-2.png",
//     added_to_cart: false,
//   },
//   {
//     id: 2,
//     title: "Iphone 12",
//     itemPrice: 990.99,
//     qty: 1,
//     image: "./images/shops-3.png",
//     added_to_cart: false,
//   },
//   {
//     id: 3,
//     title: "One plus s5",
//     itemPrice: 700.78,
//     qty: 8,
//     image: "./images/shops-4.png",
//     added_to_cart: false,
//   },
//   {
//     id: 4,
//     title: "Bluetooth headphones",
//     itemPrice: 375.24,
//     qty: 6,
//     image: "./images/shops-5.png",
//     added_to_cart: false,
//   },
//   {
//     id: 5,
//     title: "Sbs airphone",
//     itemPrice: 280.45,
//     qty: 4,
//     image: "./images/shops-6.png",
//     added_to_cart: false,
//   },
// ];

// const CART = {
//   KEY: "MyCart",
//   contents: [],
//   init() {
//     //check localStorage and initialize the contents of CART.contents
//     let _contents = localStorage.getItem(CART.KEY);
//     if (_contents) {
//       CART.contents = JSON.parse(_contents);
//     } else {
//       CART.contents = [];
//       CART.sync();
//     }
//   },
//   async sync() {
//     let _cart = JSON.stringify(CART.contents);
//     await localStorage.setItem(CART.KEY, _cart);
//   },
//   find(id) {
//     //find an item in the cart by it's id
//     let match = CART.contents.filter((item) => {
//       if (item.id == id) return true;
//     });
//     if (match && match[0]) return match[0];
//   },
//   add(id) {
//     //add a new item to the cart
//     //check that it is not in the cart already
//     if (CART.find(id)) {
//       CART.increase(id, 1);
//     } else {
//       let arr = PRODUCTS.filter((product) => {
//         if (product.id == id) {
//           return true;
//         }
//       });
//       if (arr && arr[0]) {
//         let obj = {
//           id: arr[0].id,
//           title: arr[0].title,

//           itemPrice: arr[0].itemPrice,
//         };
//         CART.contents.push(obj);
//         //update localStorage
//         CART.sync();
//       } else {
//         //product id does not exist in products data
//         console.error("Invalid Product");
//       }
//     }
//   },
// increase(id, qty = 1) {
//   //increase the quantity of an item in the cart
//   CART.contents = CART.contents.map((item) => {
//     if (item.id === id) item.qty = item.qty + qty;
//     return item;
//   });
//   //update localStorage
//   CART.sync();
// },
// reduce(id, qty = 1) {
//   //reduce the quantity of an item in the cart
//   CART.contents = CART.contents.map((item) => {
//     if (item.id === id) item.qty = item.qty - qty;
//     return item;
//   });
//   CART.contents.forEach(async (item) => {
//     if (item.id === id && item.qty === 0) await CART.remove(id);
//   });
//   //update localStorage
//   CART.sync();
// },
// remove(id) {
//   //remove an item entirely from CART.contents based on its id
//   CART.contents = CART.contents.filter((item) => {
//     if (item.id !== id) return true;
//   });
//   //update localStorage
//   CART.sync();
// },
// empty() {
//   //empty whole cart
//   CART.contents = [];
//   //update localStorage
//   CART.sync();
// },
// sort(field = "title") {
//   //sort by field - title, price
//   //return a sorted shallow copy of the CART.contents array
//   let sorted = CART.contents.sort((a, b) => {
//     if (a[field] > b[field]) {
//       return 1;
//     } else if (a[field] < a[field]) {
//       return -1;
//     } else {
//       return 0;
//     }
//   });
//   return sorted;
//   //NO impact on localStorage
// },
// logContents(prefix) {
//   console.log(prefix, CART.contents);
// },
// };
