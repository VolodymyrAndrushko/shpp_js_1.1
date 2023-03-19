function AbstractProduct(id, name, description, price, quantity, reviews, images, data, brand) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.reviews = reviews;
    this.images = images;
    this.data = data;
    this.brand = brand;
}
AbstractProduct.prototype.get = function (property) {
    return this[property];
}

AbstractProduct.prototype.set = function (property, value) {
    this[property] = value;
}


AbstractProduct.prototype.getFullInformation = function () {
    let info = '';
    for (let prop in this) {
        if (typeof this[prop] !== "function"){
            info +="\t"+ "Type: " + typeof(prop) + ' Property: ' + prop + ' - ' + this[prop] + '\n';
        }
    }
    return info;
}

AbstractProduct.prototype.getPriceForQuantity = function (quantity) {
    return '$'+this.price * quantity;
}


function Clothes(id, name, description, price, quantity, reviews, images, data, brand, material, color) {
    AbstractProduct.call(this, id, name, description, price, quantity, reviews, images, data, brand);
    this.material = material;
    this.color = color;

}

Clothes.prototype = Object.create(AbstractProduct.prototype);
Clothes.prototype.constructor = Clothes;

Clothes.prototype.getMaterial = function () {
    return this.material;
}

Clothes.prototype.setMaterial = function (material) {
    this.material = material;
}

Clothes.prototype.getColor = function () {
    return this.color;
}

Clothes.prototype.setColor = function (color) {
    this.color = color;
}

function Electronics(id, name, description, price, quantity, reviews, images, data, brand, warranty, power) {
    AbstractProduct.call(this, id, name, description, price, quantity, reviews, images, data, brand);
    this.warranty = warranty;
    this.power = power;

}

Electronics.prototype = Object.create(AbstractProduct.prototype);
Electronics.prototype.constructor = Electronics;

Electronics.prototype.getWarranty = function () {
    return this.material;
}

Electronics.prototype.setWarranty = function (material) {
    this.material = material;
}

Electronics.prototype.getWarranty = function () {
    return this.power;
}

Electronics.prototype.setPower = function (power) {
    this.power = power;
}

const product1 = new Clothes(
    "12",
    "T-shirt", 
    "White T-shirt", 
    10.5, 
    5.5, 
    [], 
    [], 
    new Date(), 
    "Adidas", 
    "M", 
    "White");

const product2 = new Electronics(
    "222",
    "Iphone", 
    "Smart phone", 
    10, 
    25, 
    [], 
    [], 
    new Date(), 
    "Apple", 
    "X", 
    "Black");

console.log(product1.get("name")); 
product1.set("price", 12.5);
console.log(product1.get("price"));
console.log(product1.getPriceForQuantity(3))
console.log(product1.getFullInformation())

console.log(product2.get("warranty")); 
product2.setPower("100W");
console.log(product2.get("power"));
console.log(product2.getFullInformation())