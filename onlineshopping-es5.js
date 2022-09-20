"use strict"

function Cart() {
    this.cartItems = [];
}

Cart.prototype.addItem = function (item) {
    // this.found(item) -> returns the position if it finds the item
    // -> returns -1 otherwise
    const index = this.foundItem(item);

    if (index !== -1) {
        this.cartItems[index].quantity += item.quantity;
        console.table(this.cartItems);
    } else {
        this.cartItems.push(item);
        console.table(this.cartItems);
    }
}

Cart.prototype.removeItem = function (id) {
    this.cartItems = this.cartItems.filter(function (value) {
        return value.id !== id
    });
    console.table(this.cartItems);
}

Cart.prototype.total = function () {
    return this.cartItems.reduce((sum, item) => sum + item.getTotal(), 0);
}

Cart.prototype.foundItem = function (item) {
    const index = this.cartItems.findIndex(element => {
        if (element.id === item.id) {
            return true;
        }
        return false;
    });

    return index;
}

function CartItem(id, price, quantity, title) {
    this.id = id;
    this.price = price;
    this.quantity = quantity;
    this.title = title;
}

CartItem.prototype.getTotal = function () {
    return this.price * this.quantity;
}

function Customer(id, email, password, billingAddress, deliveryAddress) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.billingAddress = billingAddress;
    if (deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    } else {
        // if a delivery address was not received, I assume that it is the same as the billing address and I make a copy to the Address object
        this.deliveryAddress = Object.assign(Object.create(Object.getPrototypeOf(this.billingAddress)), this.billingAddress);
    }
    this.cart = new Cart();
    this.orderList = [];
}

Customer.prototype.addItemToCart = function (item) {
    this.cart.addItem(item);
}

Customer.prototype.removeItemFromCart = function (item) {
    this.cart.removeItem(item);
}

Customer.prototype.changeEmail = function (newEmail) {
    if (newEmail !== this.email) {
        this.email = newEmail;
    } else {
        console.warn('Cannot use the same email');
    }
}

Customer.prototype.changePassword = function (newPassword) {
    if (newPassword !== this.password) {
        this.password = newPassword;
    } else {
        console.warn('Cannot use the same password');
    }
}

Customer.prototype.changeBillingAddress = function (newAddress) {
    if (this.billingAddress.id !== newAddress.id) {
        this.billingAddress = Object.assign(Object.create(Object.getPrototypeOf(newAddress)), newAddress);
    } else {
        console.warn("Cannot use the same address");
    }
}

Customer.prototype.changeDeliveryAddress = function (newAddress) {
    if (this.deliveryAddress.id !== newAddress.id) {
        this.deliveryAddress = Object.assign(Object.create(Object.getPrototypeOf(newAddress)), newAddress);
    } else {
        console.warn("Cannot use the same address");
    }
}

Customer.prototype.purchaseItems = function () {
    if (this.cart.cartItems.length !== 0) {
        const totalCost = this.cart.total() + this.deliveryAddress.computeDeliveryFee();
        const myNewOrder = new Order(Date.now(), new Date, totalCost);
        this.orderList.push(myNewOrder);
        this.cart.cartItems = [];
        console.log(myNewOrder.processBillingInfo(this.billingAddress));
    } else {
        console.warn("The cart is empty");
    }
}

function Order(id, date, totalCost) {
    this.id = id;
    this.date = date;
    this.totalCost = totalCost;
    this.status = "new";
}

Order.prototype.changeStatus = function (newStatus) {
    if (newStatus === "canceled" || newStatus === "finalised")
        this.status = newStatus;
    else
        console.warn("Invalid status");
}

Order.prototype.processBillingInfo = function (billingAddress) {
    const billingInfo = {
        billingAddress,
        total: this.totalCost,
        issueDate: this.date
    }
    return billingInfo;
}

function Address(id, street, city, country) {
        this.id = id;
        this.street = street;
        this.city = city;
        this.country = country;
}

Address.prototype.computeDeliveryFee = function () {
        return this.street.length + this.city.length + this.country.length;
}

function printDivider() {
    console.log('--------------------');
}


const billingAddress1 = new Address("address1", "Victoriei", "Baia Mare", "RO");
const deliveryAddress1 = new Address("address2", "Aleea Noua", "Baia Mare", "RO");

const customer = new Customer("cust1", "email@email.com", "password", billingAddress1);
console.log(`New customer without deliveryAddress ${JSON.stringify(customer)}`)
printDivider();

console.log(`Try to change deliveryAddress with the current one`);
customer.changeBillingAddress(billingAddress1);
printDivider();

const cartItem = new CartItem("item1", 10, 2, "Shoes");
const cartItem2 = new CartItem("item2", 5, 1, "T-shirt");
const cartItem3 = new CartItem("item1", 10, 4, "Shoes");

console.log(`Add ${JSON.stringify(cartItem)} to cart`);
customer.addItemToCart(cartItem);
printDivider();

console.log(`Add ${JSON.stringify(cartItem2)} to cart`);
customer.addItemToCart(cartItem2);
printDivider();

console.log(`If the item exists increase the quantity ${JSON.stringify(cartItem3)}`);
customer.addItemToCart(cartItem3);
printDivider();

console.log(`Remove ${JSON.stringify(cartItem3.id)} from cart`);
customer.removeItemFromCart(cartItem3.id);
printDivider();

console.log(`Purchase items, total = 20+(5*1)`);
customer.purchaseItems();
console.log(customer.orderList);
printDivider();

console.log("Try to create an order with an empty cart");
customer.purchaseItems();