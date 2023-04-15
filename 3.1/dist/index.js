"use strict";
// type DialogButtonType = "Yes" | "No";
// interface FormButton {
//     type: "Add" | "Remove" | "Buy"
// }
// // задача 1: создайте тип AnyButtonType, который описывает все вариации кнопок
// type AnyButtonType = DialogButtonType | FormButton["type"];
// const button: AnyButtonType = "Yes"
// // задача 2: создайте тип ConfirmationHandlingFormButton
// // т.е. подтип формовых кнопок, которые ещё содержат поле onConfirm, в котором
// // может лежать функция, которая вызывается с параметром типа DialogButtonType
// // (и ничего не возвращает)
// // Т.е. предполагается что у кнопки такого типа, если поле onConfirm пустое,
// // то при нажатии на эту кнопку сразу происходит действие
// // а иначе вызывается диалог Подтверждения, и результат нажатия на кнопку Да или Нет
// // в итоге попадет в функцию onConfirm, которая уже дальше решит что делать
// type ConfirmationHandlingFormButton = FormButton & {
//     onConfirm?: (params: DialogButtonType)=> void;
// }
// .... НЕТ, не надо писать все эти диалоги формы кнопки,
// мы описываем чисто типы сейчас.
// // Task 2
// import express from "express";
// import bodyParser from "body-parser";
// const app = express();
// app.use(express.static("public"))
// app.use(bodyParser.json());
// enum Button {
//     PLUS = "PLUS",
//     MINUS ="MINUS"
// }
// let plusCounter:number = 0;
// let minusCounter:number = 0;
// app.post("/api/counter", (req,res)=>{
//     const {button} = req.body;
//     if(button===Button.PLUS){
//         plusCounter++;
//     }
//     else if(button===Button.MINUS){
//         minusCounter++;
//     }
//     res.json({ count: {[Button.PLUS]: plusCounter, [Button.MINUS]: minusCounter}});
// })
// app.listen(3000, ()=>{
//     console.log("Server started at port 3000")
// })
// //task 3 bug fix
// interface isBigObject {
//     // field: {cvalue:number} | {cvalue:string} | {cvalue: isBigObject} fisrt try
//     [field: string]: { cvalue: number | string | undefined | isBigObject } | undefined;
// }
// function summ(a: isBigObject) {
//     const x = Object.keys(a).map((k) => {
//         const elem = a[k];
//         if (elem?.cvalue === undefined) { //"undefined" not undefined
//             return 2022; // 2022 not "2021"
//         }
//         else if (typeof elem.cvalue === 'string') { // string not String
//             return +elem.cvalue;
//         }
//         else if (elem.cvalue instanceof Object) { // elem.cvalue does not have property isBigObject 
//             return summ(elem.cvalue);
//         }
//         return elem.cvalue; // Cyrillic с 
//     });
//     let sum = 0;
//     for (let i = 0; i < x.length; i++) {
//         sum += +x[i]; // x does not have cvalue property and can be "string" so added +
//     }
//     return sum; //return sum not sum
// }
// const a1 = { hello: {cvalue: 1}, world: { cvalue: { yay: { cvalue: "2" } } } } //3
// const a2 = { hello: {cvalue: undefined}, world: { cvalue: { yay: { cvalue: "2" } } } } //2024
// console.log(summ(a1))
// console.log(summ(a2))
// //task 4
// const students = { "roma": 5, "igor": 2, "maria": 3 };
// function mapObject<T extends Record<string, Object>, U>(obj: T, transformer: (value: T[keyof T]) => U): Record<keyof T, U> {
//     const newObject: Record<keyof T, U> = {} as Record<keyof T, U>;
//     for(const key in obj){
//         if(obj.hasOwnProperty(key)){
//             newObject[key] = transformer(obj[key]);
//         }
//     }
//     return newObject;
// }
// console.log(mapObject(students, (mark)=> mark > 2))
// //task 5
// //simple
// function funct1<T>(data: Partial<T>, func: (data: Partial<T>) => T): T {
//     return func(data);
// }
// type IdObj<T> = T & { id: string }
// //advanced 
// function funct2<T extends IdObj<Partial<T>>>(data: T, func: (data: T) => IdObj<T>): IdObj<T> {
//     return func(data);
// }
// // last task
// class Rectangle {
//     w!: number;
//     h!: number;
// }
// class Circle {
//     radius!: number;
// }
// function create<T>(Class: new () => T, count: number) {
//     let a = []
//     for (let i = 0; i < count; i++)
//         a.push(new Class());
//     return a;
// }
// let a: Rectangle[] = create(Rectangle, 10);
// let b: Circle[] = create(Circle, 20)
// console.log(a)
// console.log(b)
//# sourceMappingURL=index.js.map