const fs = require('fs');
const readLine = require('readline');
let arrayInput;
//1. read input into an array
// don't do this - won't work for big files as it reads all into memory
// const input = fs.readFileSync('/Users/i850773/Developer/poc/AdventofCode/Day1/input.txt', 'utf-8').split(/\r?\n/) (err,data) => {
async function processLineByLine (){
    let input = [];
    const readInterface = readLine.createInterface({
        input: fs.createReadStream('/path2/AdventofCode/Day3/input_2.txt'),
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

async function findTobaggonTrajectory(slopeX,slopeY){ 
    var primeX =0;
    var primeY = 0;
    var openCount =0;
    var treeCount = 0;
    arrayInput = await processLineByLine();
    var twoDArray = arrayInput.map(line=>{
        return [...line];
    })
    console.log(arrayInput.length)
    for(i=1;i<=twoDArray.length;i++){
        primeX = slopeX + primeX;
        primeY = slopeY + primeY;
        console.log(primeX,primeY);
        if(twoDArray[primeY][primeX]==="."){ //open square
            twoDArray[primeY][primeX]='O';
            openCount = openCount+1;
            console.log("space",openCount)
        } else if(twoDArray[primeY][primeX]==='#'){ // tree
            twoDArray[primeY,primeX]==='X';
            treeCount = treeCount+1;
            console.log("tree",treeCount)
        } //find element 
    }
    return treeCount
}

console.log(findTobaggonTrajectory(7,1));


// (3,1) => 178
// (1,1) => 78
// (5,1) => 75
// (7,1) => 86
// (1,2) => 39