import * as wasm from "rust-src";

// wasm.greet("WebAssembly with npm");

const sum_w_add_two = wasm.add_two(5);
console.log('sum with add_two');
console.log(sum_w_add_two);

const sum_w_add = wasm.add(5, 90);
console.log('sum_w_add');
console.log(sum_w_add);

const favNumSpan = document.getElementById('fav-number');
favNumSpan.innerText = String(sum_w_add);

// wasm.goodbye("WebAssembly with npm");

const changeFavNumButton = document.getElementById('change-fav-number');
changeFavNumButton.addEventListener('click', () => {
    favNumSpan.innerText = String(wasm.add_two(21));
})


const multiplyFavNumButton = document.getElementById('multiply-fav-number');
multiplyFavNumButton.addEventListener('click', () => {
    favNumSpan.innerText = String(wasm.multiply(2, 89));
})


const greet = document.getElementById('greet');
greet.addEventListener('click', () => {
    wasm.greet('Cherub');
})

const floorButton = document.getElementById('floor-number');
floorButton.addEventListener('click', () => {
  favNumSpan.innerText = String(wasm.floor_num(456.32));
})



const goodMultiplyButton = document.getElementById('good-multiply-number');
goodMultiplyButton.addEventListener('click', () => {
  favNumSpan.innerText = String(wasm.multiple_then_double(76, 13));
})

// const response = await fetch('http://localhost:8081/hello')
// console.log(response);
// const responseJson = await response.json();
// console.log(responseJson);
//
// document.getElementById('name').innerText = responseJson.name;
// document.getElementById('species').innerText = responseJson.species;
//
// const postResponse = await fetch('http://localhost:8081/hello', {
//   method: 'POST',
//   body: JSON.stringify({
//     name: 'Sticky',
//     species: 'Stick insect'
//   }),
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
//
// const postResponseStatus = postResponse.status;
// console.log(postResponseStatus);

const canvas = document.getElementById("first-canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "black";
ctx.fillRect(0, 0, 170, 120);

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 150, 100);



