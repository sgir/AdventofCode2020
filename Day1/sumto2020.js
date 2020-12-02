const fs = require('fs');
const readLine = require('readline');
let arrayInput;
//1. read input into an array

// don't do this - won't work for big files as it reads all into memory
// const input = fs.readFileSync('/Users/i850773/Developer/poc/AdventofCode/Day1/input.txt', 'utf-8').split(/\r?\n/) (err,data) => {
async function processLineByLine (){
    let input = [];
    const readInterface = readLine.createInterface({
        input: fs.createReadStream('/Users/i850773/Developer/poc/AdventofCode/Day1/input_1.txt'),
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
    arrayInput = await processLineByLine();
    console.log("Read from File",arrayInput);
    console.log("Read from File",arrayInput.length);
    sortedInput = arrayInput.sort((a,b)=>{
        return a-b;
    });
    return sortedInput;
}



//3. Binary Search
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

async function findSum(sortedInput,sum){
    arrayInput = await processLineByLine();
    for(let i=0;i<arrayInput.length;i++){
        console.log("Searching a match for", arrayInput[i])
        let val = binarySearch(sortedInput,sum,i);
        console.log(val);
        if(!val){
            continue
        } else {
            return val;
        }
    }
}

// Need to sort for Binary Search
let sortedInput = sortInput().then((sortedInput) => {
    console.log("Sorted Input",sortedInput);
    console.log("Sorted Input",sortedInput.length);
    console.log(findSum(sortedInput,2020)) // function(nums, target)
});


var binarySearch = function(nums, target,i) {
    let len, m, mid;

    // 1. get the number of items
    len = nums.length;
    console.log('1. get the number of items',len)
    if(len==0){
        return
    }

    // 2. find the midpoint index and element
    m = Math.ceil((len+1)/2)
    mid = nums[m-1];
    console.log(`2. find the midpoint index ${m-1} and middle element ${mid}`)

    console.log(`3. Searching for`, target-arrayInput[i])

    // 3. do the check
    if(target-arrayInput[i]<mid){ //LHS tree
        console.log('LHS')
        binarySearch(nums.slice(0,m-1),target,i)

    } else if(target-arrayInput[i]>mid) { //RHS tree
        console.log('RHS')
        binarySearch(nums.slice(m,len),target,i)
    }
    else if(mid==target-arrayInput[i]){
        console.log('equal')
        return mid;
    } else { //no match
        return
    }
};