// console.log('hello')
// PS E:\Oktenweb\node-learn-april2021> cd lesson1_basic
// PS E:\Oktenweb\node-learn-april2021\lesson1_basic> node .\app.js
const fileData = require('./dir/asd') //імпорт файлу, запускає весь файи, все, що в ньому є,
// але назовні попаде лише те, що є у модуль-експорт,
// запускає папку
console.log(fileData);
// node .\app.js
fileData.greeting("Мирослава")
// node .\app.js

console.log(__dirname);
console.log(__filename); // інфо про папки

// nvm дозволяє мати декілька версій ноди одночасно
// бібліотека fs працює на колбеках

const fs = require('fs');
const path = require('path'); // вміє будувати шляхи до файлів, він сам визначає,
// яка в нас системи і розставляє слеші
const util = require('util')

const folderToDelete = path.join(__dirname, 'folder', 'deleted.txt');

const appendPromise = util.promisify(fs.appendFile);
appendPromise(folderToDelete, 'text data with promise \n').catch(reason => {
    console.log(reason);
})

const textPath = path.join(__dirname, 'dir', 'text.txt');
console.log(textPath);
const dirToReadPath = path.join(__dirname, 'dir');
console.log(dirToReadPath);

// fs.writeFile(textPath, "hello", err => {
//     console.log(err);
// })
// створить навий файл по заданому шляху і в ньому буде текст (data)
// цей метод перезаписує повністю інфу в файлі

// fs.appendFile(textPath, 'new hello \n', err => {
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log("DONE")
// } ) //else не використовується


// Створення папок:
// const mkdirPath = path.join(__dirname, 'dir', 'folder2', 'innerFolder', 'Hellxxx')
// fs.mkdir(mkdirPath, {recursive: true},  err => {
//     console.log(err);
// })
// {recursive: true} робить папки рекурсивно з кінця

// fs.readFile(textPath, (err, data) => {
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log(data.toString());
// // })
// fs.readdir(dirToReadPath, (err, files)=>{
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log(files);
//     files.forEach(file => {
//         const filePath = path.join(dirToReadPath, file )
//         fs.stat(filePath, (err1, stats) => {
//             console.log('--------------')
//             console.log(stats.isFile(), 'isFile');
//             console.log(stats.isDirectory(), 'isDirectory' );
//             console.log(stats.size);
//             console.log('--------------')
//         }) // вивести інфу про конкретний файл
//         // console.log(file);
//     } )
// } ) //масив назв файлів, що є всередині папки

// Remove:
// fs.rmdir(path.join(dirToReadPath, 'dir2'), (err)=> {
//     console.log(err);
// })
//code: 'ENOTEMPTY' директорії з файликами стирати не можна, треба спершу стерти всі файлики

// щоб стерти файлики:
// fs.unlink(path.join(__dirname, 'dir', 'text2.js'), err => {
//     console.log(err);
// })

//щоб ремувнути файли з папки кудись
// const folderToDelete = path.join(__dirname, 'folder', 'deleted.txt');
// fs.rename(textPath, folderToDelete, err => {
//     console.log(err);
// } )
