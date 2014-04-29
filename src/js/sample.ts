var hoge = 'hello';  // ok
var hoge2 = 'hello': string;  // ok
var fuga: number = 10;  // ok
// var piyo: number = 'hoge';  // コンパイルエラー

var hogehoge: string = hoge;  // ok
// var fugafuga: number = hoge;  // コンパイルエラー


// ok
function square(n: number): number {
    return n * n;
}

console.info(square(3)); // ok
// console.info(square('hoge')); // コンパイルエラー

// ok
function square(n) {
    return n * n;
}

// ok
var square = (n: number) => {
    return n * n;
}

// ok
var square = (n) => {
    return n * n;
}
