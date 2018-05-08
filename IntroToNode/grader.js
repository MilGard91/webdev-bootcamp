const average = (arr) => {
    let sum =0;
    arr.forEach(el => {
        sum+=el;
    });
    return (Math.round(sum/arr.length));
}

const scores = [90, 98, 89, 100, 86, 94];
const scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];

console.log(average(scores));
console.log(average(scores2));