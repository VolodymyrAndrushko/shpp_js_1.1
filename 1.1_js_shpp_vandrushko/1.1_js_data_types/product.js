const { v4: uuidv4 } = require('uuid');

function Product(name, description, price, brand, sizes, activeSize, quantity, date, reviews, images) {
    this.ID = uuidv4();
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.sizes = sizes;
    this.activeSize = activeSize;
    this.quantity = quantity;
    this.date = date;
    this.reviews = reviews;
    this.images = images;
}

Product.prototype.getReviewByID = function (elementID) {
    for (const key in this.reviews) {
        if (this.reviews[key].ID === elementID) {
            return this.reviews[key];
        }
    }
}

Product.prototype.getImage = function (parameter) {
    if (parameter !== undefined) {
        for (const key in this.images) {
            if (this.images[key] === parameter) {
                return this.images[key];
            }
        }
    }
    return this.images[0];
}

Product.prototype.addSize = function (size) {
    this.sizes.push(size);
}

Product.prototype.deleteSize = function (key) {
    const array = this.sizes;
    this.sizes = array.filter(function (item) {
        return item !== array[key];
    })
}

Product.prototype.addReview = function (author, date, comment, rating) {
    const newReview = {
        ID: uuidv4(),
        author,
        date,
        comment,
        rating: { 'service': rating.service, 'price': rating.price, 'value': rating.value, 'quality': rating.quality }
    };
    this.reviews.push(newReview);
}

Product.prototype.deleteReview = function (ID) {
    const array = this.reviews;
    for (const key in array) {
        if (array[key].ID === ID) {
            this.reviews = array.filter(function (item) {
                return item !== array[key];
            })
        }
    }
}

Product.prototype.getAverageRating = function () {
    const reviews = this.reviews;
    let average = 0;
    for (i in reviews) {
        let tmp = 0;
        if (reviews[i].rating !== null && reviews[i].rating !== undefined) {
            const keys = Object.keys(reviews[i].rating);
            for (j in reviews[i].rating) {
                tmp += reviews[i].rating[j];
            }
            if (tmp !== 0) {
                average += tmp / keys.length;
            }
        }
        else {
            throw Error("Reviews are empty!")
        }
    }
    i++;
    return average / i;
}

Product.prototype.getId = function () {
    return this.ID;
}

Product.prototype.seTId = function (ID) {
    this.ID = ID;
}

Product.prototype.getName = function () {
    return this.name;
}

Product.prototype.setName = function (name) {
    this.name = name;
}

Product.prototype.getDescription = function () {
    return this.description;
}

Product.prototype.setDescription = function (description) {
    this.description = description;
}

Product.prototype.getPrise = function () {
    return this.price;
}

Product.prototype.setPrice = function (price) {
    this.price = price;
}

Product.prototype.getBrand = function () {
    return this.brand;
}

Product.prototype.setBrand = function (brand) {
    this.brand = brand;
}

Product.prototype.getSizes = function () {
    return this.sizes;
}

Product.prototype.setSizes = function (sizes) {
    this.sizes = sizes;
}

Product.prototype.getActiveSize = function () {
    return this.activeSize;
}

Product.prototype.setActiveSize = function (activeSize) {
    this.activeSize = activeSize;
}

Product.prototype.getQuantity = function () {
    return this.quantity;
}

Product.prototype.setQuantity = function (quantity) {
    this.quantity = quantity;
}

Product.prototype.getDate = function () {
    return this.date;
}

Product.prototype.setDate = function (date) {
    this.date = date;
}

Product.prototype.getReviews = function () {
    return this.reviews;
}

Product.prototype.setReviews = function (reviews) {
    this.reviews = reviews;
}

Product.prototype.getImages = function () {
    return this.images;
}

Product.prototype.setImages = function (images) {
    this.images = images;
}

/**
 * Method searches for name and description fields of given products array and return all finds as new array
 * @param {<*>} products given array of products
 * @param {*} search given search string
 * @returns 
 */
function searchProducts(products, search) {
    const matchingProducts = [];

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase())
        ) {
            matchingProducts.push(product);
        }
    }
    return matchingProducts;
}

/**
 * Method sorts product array with given rule and return as new sorted array.
 * @param {*} products given array
 * @param {*} sortRule given sort rule
 * @returns new sorted products array
 */
function sortProducts(products, sortRule) {
    products.sort(function (a, b) {
        switch (sortRule) {
            case 'price':
                if (a[sortRule] > b[sortRule]) {
                    return -1;
                }
                if (a[sortRule] < b[sortRule]) {
                    return 1;
                }
                return 0;
            case 'name' || 'ID':
                if (a[sortRule] < b[sortRule]) {
                    return -1;
                }
                if (a[sortRule] > b[sortRule]) {
                    return 1;
                }
                return 0;
        }
    });
    return products;
}

const product = new Product(
    "Phone", "Mobile phone", 999, "Apple",
    ["X", "XS", "XS MAX"],
    "Active size", 15, new Date("2023-03-13 15:25:00"),
    [
        { ID: uuidv4(), author: "Vova", date: new Date("2023-03-11 19:25:00"), comment: "Nice", rating: { 'service': 4, 'price': 4, 'value': 4, 'quality': 5 } },
        { ID: uuidv4(), author: "Andriy", date: new Date("2023-03-13 15:45:00"), comment: "Good", rating: { 'service': 5, 'price': 5, 'value': 4, 'quality': 5 } },
        { ID: uuidv4(), author: "Roma", date: new Date("2023-03-14 12:35:00"), comment: "I expect more:(", rating: { 'service': 2, 'price': 3, 'value': 2, 'quality': 1 } },
        { ID: uuidv4(), author: "Roma", date: new Date("2023-03-14 12:35:00"), comment: "I expect more:(", rating: { 'service': 0, 'price': 0, 'value': 0, 'quality': 0 } },
    ],
    [
        "image1.png",
        "image1.png",
        "image3.png",
    ]
);

const product1 = new Product(
    "TV", "Television", 1999, "LG",
    ["Ultra", "Ultra-s"],
    "255", 25, new Date("2023-03-13 15:25:00"),
    [
        { ID: uuidv4(), author: "Andriy", date: new Date("2023-03-11 19:25:00"), comment: "Nice", rating: { 'service': 4, 'price': 4, 'value': 4, 'quality': 5 } },
    ],
    [
        "image1.png",
    ]
);

const product2 = new Product(
    "ATv Set", "ATelevision", 255, "Samsung",
    ["Ultra", "Ultra-s"],
    "255", 25, new Date("2023-03-13 15:25:00"),
    [
        { ID: uuidv4(), author: "Andriy", date: new Date("2023-03-11 19:25:00"), comment: "Nice", rating: { 'service': 4, 'price': 4, 'value': 4, 'quality': 5 } },
    ],
    [
        "image1.png",
    ]
);

const product3 = new Product(
    "ABCTv Set", "Television", 25, "Samsung",
    ["Ultra", "Ultra-s"],
    "255", 25, new Date("2023-03-13 15:25:00"),
    [
        { ID: uuidv4(), author: "Andriy", date: new Date("2023-03-11 19:25:00"), comment: "Nice", rating: { 'service': 4, 'price': 4, 'value': 4, 'quality': 5 } },
    ],
    [
        "image1.png",
    ]
);

product.addReview('Alex', new Date(), 'Amazing product', { 'service': 5, 'price': 4, 'value': 4, 'quality': 5 });

console.log(product.getId());
console.log(product.getName());
console.log(product.getDescription());
console.log(product.getPrise());
console.log(product.getBrand());
console.log(product.getSizes());
product.addSize("XS MAX PRO");
console.log(product.getSizes());
product.deleteSize(2);
console.log(product.getSizes());
console.log(product.getActiveSize());
console.log(product.getQuantity());
console.log(product.getDate());
console.log(product.getReviews());

console.log(product.getAverageRating());

console.log(product.getImages());

console.log(product.getImage());
console.log(product.getImage("image3.png"));
console.log(product.getImage("image4.png"));

product.seTId("AAA");
product.setName("DSAAAA");
product.setDescription("");
product.setPrice("22222");
product.setBrand("");
product.setSizes("");
product.setActiveSize("");
product.setQuantity("");
product.setDate("");
product.setReviews([
    { ID: uuidv4(), author: "Vova", date: new Date("2023-03-11 19:25:00"), comment: "Nice", rating: { 'service': 4, 'price': 4, 'value': 4, 'quality': 5 } },
    { ID: "222", author: "Max", date: new Date("2023-03-11 19:25:00"), comment: "Good", rating: { 'service': 3, 'price': 3, 'value': 3, 'quality': 4 } },
]);
product.setReviews([
    { ID: uuidv4(), author: "Vova", date: new Date("2023-03-11 19:25:00"), comment: "Nice", rating: { 'service': 0, 'price': 0, 'value': 0, 'quality': 0 } },
]);
// product.setReviews([
//     { },
// ]);
console.log(product.getAverageRating());
console.log(product.getReviews());
product.deleteReview("222");
console.log(product.getReviews());
product.setImages("");

console.log(product);

product.addReview("Max", "2023-03-15 15:15:00", "Very nice", { 'service': 5, 'price': 5, 'value': 5, 'quality': 5 });

console.log(product.getReviewByID("222"));

console.log(searchProducts([product, product1, product2], "tv"))

console.log("SORT BY Price: ");
console.log(sortProducts([product, product1, product2], 'price'));
console.log("SORT BY Name: ");
console.log(sortProducts([product, product1, product2], 'name'));
console.log("SORT BY ID: ");
console.log(sortProducts([product, product1, product2], 'ID'));