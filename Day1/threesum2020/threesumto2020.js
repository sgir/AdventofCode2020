const fs = require('fs');
const readLine = require('readline');
let arrayInput;
//1. read input into an array

// don't do this - won't work for big files as it reads all into memory
// const input = fs.readFileSync('/Users/i850773/Developer/poc/AdventofCode/Day1/input.txt', 'utf-8').split(/\r?\n/) (err,data) => {
async function processLineByLine (){
    let input = [];
    const readInterface = readLine.createInterface({
        input: fs.createReadStream('/Users/i850773/Developer/poc/AdventofCode/Day1/threesum2020/input_1.txt'),
        output: process.stdout,
        crlfDelay: Infinity,
        console: false
    });
    
    for await (const line of readInterface){
        input.push(line);
    }
    return input;
}


//2. Brute Force Search
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

async function findSum(){
    arrayInput = await processLineByLine();
    for(let i=0;i<arrayInput.length;i++){
        console.log("Searching for a match for", arrayInput[i])
        for(let j=0;j<arrayInput.length;j++){
            for(let k=0;k<arrayInput.length;k++){
                if(Number(arrayInput[i])+Number(arrayInput[j])+Number(arrayInput[k])==2020){
                    console.log("MATCH",arrayInput[i],arrayInput[j],arrayInput[k]);
                    return arrayInput[i]+arrayInput[j]+arrayInput[k];
                } else {
                    continue
                }
            }
        }
    }
}

console.log(findSum());