// Product data
const products = [
  {
      id: 1,
      name: "Product 1",
      price: 10.00,
      image: "/images/w1.png"
  },
  {
      id: 2,
      name: "Product 2",
      price: 15.00,
      image: "/images/w2.png"
  },
  {
      id: 3,
      name: "Product 3",
      price: 20.00,
      image: "/images/w3.png"
  },
  {
      id: 4,
      name: "Product 3",
      price: 20.00,
      image: "/images/w4.webp"
  },
  {
      id: 5,
      name: "Product 2",
      price: 15.00,
      image: "/images/w5.png"
  },
  {
      id: 6,
      name: "Product 3",
      price: 20.00,
      image: "/images/w6.png"
  },
  {
      id: 7,
      name: "Product 3",
      price: 20.00,
      image: "/images/w7.webp"
  },
  {
      id: 8,
      name: "Product 3",
      price: 20.00,
      image: "/images/w8.png"
  },
  {
      id: 9,
      name: "Product 2",
      price: 15.00,
      image: "/images/w9.png"
  },
  {
      id: 10,
      name: "Product 3",
      price: 20.00,
      image: "/images/w10.png"
  },
  {
      id: 11,
      name: "Product 3",
      price: 20.00,
      image: "/images/w11.png"
  },
  {
      id: 12,
      name: "Product 3",
      price: 20.00,
      image: "/images/w12.png"
  }
];

function openPage(pageName, elmnt, color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

// Function to generate product HTML
function renderProducts() {
    const productList = document.getElementById('product-list');
    
    products.forEach((product, index) => {
        const productHTML = `
           <div class="col-12 col-sm-6 col-md-3 col-lg-2">
  <div class="box-img mb-4">
    <img 
      src="${product.image}" 
      alt="${product.name}" 
      class="img-fluid w-100" 
      style="object-fit: cover; height: 200px;"
    >
    <div class="text-center mt-4">
      <p class="mb-0 mt-2">${product.name}</p>
      <h4 class="mt-2">$${product.price.toFixed(2)}</h4>
      <a href="#" class="btn text-black bg-warning w-100 mt-2" onclick="showProductModal(${index})">
        Add to Cart
      </a>
    </div>
  </div>
</div>

        `;
        productList.innerHTML += productHTML;
    });
  }
  
// Call the function to render products on page load
renderProducts();
function showProductModal(index) {
    const product = products[index];
    document.getElementById("modalProductName").innerText = product.name;
    document.getElementById("modalProductImage").src = product.image;
    document.getElementById("modalProductPrice").innerText = `$${product.price.toFixed(2)}`;
  
    // Show Bootstrap modal
    $('#productModal').modal('show');
  }


  let currentModalIndex = null;
let modalQty = 1;

function showProductModal(index) {
  currentModalIndex = index;
  modalQty = 1;

  const product = products[index];
  document.getElementById("modalProductName").innerText = product.name;
  document.getElementById("modalProductImage").src = product.image;
  document.getElementById("modalProductPrice").innerText = `$${product.price.toFixed(2)}`;
  document.getElementById("modalQty").innerText = modalQty;

  $('#productModal').modal('show');
}

function increaseModalQty() {
  modalQty++;
  document.getElementById("modalQty").innerText = modalQty;
}

function decreaseModalQty() {
  if (modalQty > 1) {
    modalQty--;
    document.getElementById("modalQty").innerText = modalQty;
  }
}

function addModalToCart() {
  alert(`Added ${modalQty} of "${products[currentModalIndex].name}" to cart.`);
  $('#productModal').modal('hide');
}




const cart = [];

function addModalToCart() {
  const product = products[currentModalIndex];

  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.qty += modalQty;
  } else {
    cart.push({ id: product.id, name: product.name, image: product.image, price: product.price, qty: modalQty });
  }

  updateCartCount();
  $('#productModal').modal('hide');
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cart-count").innerText = count;
}

function showCartModal() {
  const cartBody = document.getElementById("cartModalBody");
  if (cart.length === 0) {
    cartBody.innerHTML = `<p class="text-muted">Cart is empty.</p>`;
    $('#cartModal').modal('show');
    return;
  }

  let html = `<div class="row">`;
  cart.forEach(item => {
    html += `
      <div class="col-12 mb-3">
        <div class="card">
          <div class="card-body d-flex align-items-center">
            <img src="${item.image}" alt="${item.name}" class="me-3" style="height: 60px; width: 60px; object-fit: cover;">
            <div class="flex-grow-1">
              <h6 class="mb-0">${item.name}</h6>
              <small>$${item.price.toFixed(2)} × ${item.qty}</small>
            </div>
            <div>
              <strong>$${(item.price * item.qty).toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  html += `</div>`;

  cartBody.innerHTML = html;
  $('#cartModal').modal('show');
}

function checkout() {
 
}



