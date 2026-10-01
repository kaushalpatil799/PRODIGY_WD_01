/* =====================================================
   SELECT ELEMENTS
===================================================== */

const navbar =
    document.getElementById("navbar");

const navMenu =
    document.getElementById("navMenu");

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("section");

const categoryButtons =
    document.querySelectorAll(".category-card");

const foodCards =
    document.querySelectorAll(".food-card");

const searchInput =
    document.getElementById("searchInput");

const addButtons =
    document.querySelectorAll(".add-button");

const cartButton =
    document.getElementById("cartButton");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItemsContainer =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");

const successModal =
    document.getElementById("successModal");

const closeModal =
    document.getElementById("closeModal");

const contactForm =
    document.getElementById("contactForm");


/* =====================================================
   SHOPPING CART ARRAY
===================================================== */

let cart = [];


/* =====================================================
   1. NAVBAR SCROLL EFFECT
===================================================== */

window.addEventListener("scroll", function () {

    /*
        window.scrollY gives the current
        vertical scroll position.
    */

    if (window.scrollY > 50) {

        /*
            Add scrolled class
            after user scrolls.
        */

        navbar.classList.add("scrolled");

    } else {

        /*
            Remove class at top.
        */

        navbar.classList.remove("scrolled");

    }

});


/* =====================================================
   2. MOBILE MENU
===================================================== */

menuToggle.addEventListener("click", function () {

    /*
        Add/remove show class.

        show = menu visible
        no show = menu hidden
    */

    navMenu.classList.toggle("show");

});


/* =====================================================
   3. CLOSE MOBILE MENU
===================================================== */

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("show");

    });

});


/* =====================================================
   4. ACTIVE NAVIGATION LINK
===================================================== */

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;

        /*
            Check which section is currently visible.
        */

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    /*
        Change active menu item.
    */

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});


/* =====================================================
   5. CATEGORY FILTER
===================================================== */

categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        /*
            Get selected category.
        */

        const selectedCategory =
            button.getAttribute("data-category");


        /*
            Remove active class
            from every category.
        */

        categoryButtons.forEach(function (item) {

            item.classList.remove(
                "active-category"
            );

        });


        /*
            Add active class
            to clicked category.
        */

        button.classList.add(
            "active-category"
        );


        /*
            Show/hide food cards.
        */

        foodCards.forEach(function (card) {

            const cardCategory =
                card.getAttribute("data-category");


            if (
                selectedCategory === "all" ||
                cardCategory === selectedCategory
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* =====================================================
   6. SEARCH FOOD
===================================================== */

searchInput.addEventListener(
    "input",
    function () {

        /*
            Convert search text
            to lowercase.
        */

        const searchText =
            searchInput.value
                .toLowerCase()
                .trim();


        let foundFood = false;


        foodCards.forEach(function (card) {

            const foodName =
                card
                    .getAttribute("data-name")
                    .toLowerCase();


            if (
                foodName.includes(searchText)
            ) {

                card.style.display = "block";

                foundFood = true;

            } else {

                card.style.display = "none";

            }

        });

    }
);


/* =====================================================
   7. ADD FOOD TO CART
===================================================== */

addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const name =
            button.getAttribute("data-name");

        const price =
            Number(
                button.getAttribute("data-price")
            );


        /*
            Check if item already exists.
        */

        const existingItem =
            cart.find(function (item) {

                return item.name === name;

            });


        if (existingItem) {

            /*
                Increase quantity.
            */

            existingItem.quantity++;

        } else {

            /*
                Add new item.
            */

            cart.push({

                name: name,

                price: price,

                quantity: 1

            });

        }


        /*
            Update cart.
        */

        updateCart();


        /*
            Show cart.
        */

        openCart();

    });

});


/* =====================================================
   8. UPDATE CART
===================================================== */

function updateCart() {

    /*
        Clear existing HTML.
    */

    cartItemsContainer.innerHTML = "";


    /*
        Empty cart.
    */

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `

            <div class="empty-cart">

                <span>🛒</span>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add delicious food to your cart.
                </p>

            </div>

        `;

        cartCount.textContent = "0";

        cartTotal.textContent = "₹0";

        return;

    }


    let totalItems = 0;

    let totalPrice = 0;


    /*
        Create every cart item.
    */

    cart.forEach(function (item, index) {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <strong>
                    ₹${item.price}
                </strong>

            </div>


            <div class="quantity-controls">

                <button
                    onclick="decreaseQuantity(${index})">
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>

        `;


        cartItemsContainer.appendChild(cartItem);

    });


    /*
        Update count.
    */

    cartCount.textContent = totalItems;


    /*
        Update total.
    */

    cartTotal.textContent =
        "₹" + totalPrice;

}


/* =====================================================
   9. INCREASE QUANTITY
===================================================== */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


/* =====================================================
   10. DECREASE QUANTITY
===================================================== */

function decreaseQuantity(index) {

    cart[index].quantity--;


    /*
        If quantity becomes zero,
        remove item.
    */

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


/* =====================================================
   11. OPEN CART
===================================================== */

function openCart() {

    cartSidebar.classList.add("open");

    cartOverlay.classList.add("show");

}


/* =====================================================
   12. CLOSE CART
===================================================== */

function closeCartSidebar() {

    cartSidebar.classList.remove("open");

    cartOverlay.classList.remove("show");

}


/* Cart button */

cartButton.addEventListener(
    "click",
    openCart
);


/* Close button */

closeCart.addEventListener(
    "click",
    closeCartSidebar
);


/* Click overlay */

cartOverlay.addEventListener(
    "click",
    closeCartSidebar
);


/* =====================================================
   13. CHECKOUT
===================================================== */

checkoutButton.addEventListener(
    "click",
    function () {

        /*
            Check cart.
        */

        if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add food first."
            );

            return;

        }


        /*
            Close cart.
        */

        closeCartSidebar();


        /*
            Show success modal.
        */

        successModal.classList.add("show");

    }
);


/* =====================================================
   14. CLOSE SUCCESS MODAL
===================================================== */

closeModal.addEventListener(
    "click",
    function () {

        successModal.classList.remove("show");

        /*
            Clear cart after order.
        */

        cart = [];

        updateCart();

    }
);


/* =====================================================
   15. CONTACT FORM
===================================================== */

contactForm.addEventListener(
    "submit",
    function (event) {

        /*
            Prevent page refresh.
        */

        event.preventDefault();


        /*
            Get customer name.
        */

        const name =
            document
                .getElementById("customerName")
                .value;


        /*
            Display message.
        */

        alert(
            "Thank you " +
            name +
            "! Your message has been sent successfully."
        );


        /*
            Clear form.
        */

        contactForm.reset();

    }
);