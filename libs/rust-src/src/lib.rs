use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Holla, {}!", name));
}

#[wasm_bindgen]
pub fn goodbye(name: &str) {
    alert(&format!("Bye bye, {}....", name));
}


#[wasm_bindgen]
pub fn add_two(a: i32) -> i32 {
    return a + 2;
}


#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    return a + b;
}


#[wasm_bindgen]
pub fn multiply(a: i32, b: i32) -> i32 {
    return a * b;
}

#[wasm_bindgen]
pub fn floor_num(input: f32) -> i32 {
  input.floor() as i32
}
