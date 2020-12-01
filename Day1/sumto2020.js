const fs = require('fs');
const readLine = require('readline');

//1. read input into an array

// don't do this - won't work for big files as it reads all into memory
// const input = fs.readFileSync('/Users/i850773/Developer/poc/AdventofCode/Day1/input.txt', 'utf-8').split(/\r?\n/) (err,data) => {
async function processLineByLine (){
    let input = [];
    const readInterface = readLine.createInterface({
        input: fs.createReadStream('/Users/i850773/Developer/poc/AdventofCode/Day1/input.txt'),
        output: process.stdout,
        crlfDelay: Infinity,
        console: false
    });
    
    for await (const line of readInterface){
        input.push(line);
    }
    return input;
}

// 2. sort input

async function sortInput(){
    let arrayInput = await processLineByLine();
    console.log("Read from File",arrayInput);
    console.log("Read from File",arrayInput.length);
    sortedInput = arrayInput.sort((a,b)=>{
        return a-b;
    });
    return sortedInput;
}
let sortedInput = sortInput().then((sortedInput) => {
    console.log("Sorted Input",sortedInput);
    console.log("Sorted Input",sortedInput.length);
});


//3. Binary Search


//4. return product

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// var twoSum = async function(nums, target) {
    
// };