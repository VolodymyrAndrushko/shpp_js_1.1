// 1. 

function getFirstWord(a: string) {
    return a.split(/ +/)[0].length;
}

// 2. 
type Person = {
    name: string;
    surname: string;
}
function getUserNamings(a: Person) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}

// 3. 

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
type Product = {
    products: { name: string; }[]
}
function getAllProductNames(a: Product) {
    return a?.products?.map(prod => prod?.name) || [];
}

// // 4.1

// // easy way is using 'as' keyword
// // hard way is ?...
// type Human = {
//     name: () => string;
//     cuteness?: number;
//     coolness?: number;
// }
// function hey(a: Human) {
//     return "hey! i'm " + a.name();
// }

// console.log(hey({ name: () => "roma", cuteness: 100 } as Human))
// console.log(hey({ name: () => "vasya", coolness: 100 } as Human))

// // 4.2
// abstract class Pet {
//     constructor(protected petName: string) { }
//     abstract name(): string;
// }

// class Dog extends Pet {
//     constructor(
//         petName: string,
//         private value: number) {
//         super(petName);
//     }
//     name(): string {
//         return this.petName;
//     }
// }

// class Cat extends Pet {
//     constructor(
//         petName: string,
//         private canMeow: boolean) {
//         super(petName);
//     }
//     name(): string {
//         return this.petName;
//     }
// }
// function hey(abstractPet: Pet) {
//     return "hey! i'm " + abstractPet.name();
// }
// let a = new Cat("myavchik", true)
// let b = new Dog("gavchik", 333) 
// console.log(hey(a))
// console.log(hey(b))

// 4.3
type Student = {
    name: () => string;
    type: string;
    cuteness: number;
    coolness: number;
}
function hey(a: Student) {
    return "hey! i'm " + a.name()
        + (a.type === "cat" ? ("cuteness: " + a.cuteness) : ("coolness: " + a.coolness))
}
console.log(hey({ name: () => "roma", type: "cat", cuteness: 100 } as Student))
console.log(hey({ name: () => "vasya", type: "dog", coolness: 100 } as Student))

// 5.

// google for Record type
function stringEntries(a: Record<string, number>){
    return Array.isArray(a) ? a : Object.keys(a)
}

// 6.

// you don't know Promises and async/await yet. Or do you? 
// ....can be hard, don't worry and SKIP if you do not know how to do it

async function world(a: number): Promise<string> {
    return "*".repeat(a)
}
const hello = async (): Promise<string> => {
    return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))