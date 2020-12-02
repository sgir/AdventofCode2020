const fs = require('fs');
const readLine = require('readline');
let arrayInput;
let counter = 0;
//1. read input into an array
// don't do this - won't work for big files as it reads all into memory
// const input = fs.readFileSync('/Users/i850773/Developer/poc/AdventofCode/Day1/input.txt', 'utf-8').split(/\r?\n/) (err,data) => {
async function processLineByLine (){
    let input = [];
    const readInterface = readLine.createInterface({
        input: fs.createReadStream('path2/AdventofCode/Day2/input.txt'),
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

async function findValidPassword(){

    arrayInput = await processLineByLine();
    let cleanedArray = arrayInput.map(function splitInput(input){
        // return input.split(" ").map(function matchRegex(element){
        //    return element.match(/\w/g)
        // })
        let splitArray = input.split(" ");
        let minmaxArray = splitArray[0].split("-")

         let letterArray= splitArray[1].split(":")[0]
         

         let passwordArray = splitArray[2].split("")

         return [minmaxArray,letterArray,passwordArray]
    })
    console.log(cleanedArray);

    cleanedArray.forEach((row) => {
    
        let minmax = row[0];
        let min = minmax[0]; 
        let max = minmax[1];
        let letter = row[1];
        let passwordArray = row[2];
        if(isValid(min, max,letter, passwordArray)){
            counter++;
            console.log("Valid Password",counter)
        } 
    }); 
}

console.log(findValidPassword());


function isValid(min, max,letter, passwordArray){
    let pos1 = passwordArray[min-1].includes(letter);
    let pos2 = passwordArray[max-1].includes(letter);
    
    if(pos1&&pos2){
        return false
    } else if(pos1||pos2){
        return true
    } else {
        return false
    }
}
    

