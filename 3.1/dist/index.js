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
//# sourceMappingURL=index.js.map