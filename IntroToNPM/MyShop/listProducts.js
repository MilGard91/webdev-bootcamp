const faker = require("faker");

console.log("=======================");
console.log("WELCOME TO MY SHOP!");
console.log("=======================");

for (let i=0; i<10; i++){
    let product=faker.commerce.productName();
    let price = faker.commerce.price();
    console.log(product + " - $" + price);
}