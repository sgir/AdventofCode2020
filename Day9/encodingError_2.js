const fs = require('fs');
const readLine = require('readline');
let arrayInput = new Array();
let preamble = 25;
let ncompare = 14360655;
let continuousBlock = new Array();
//1. read input into an array
async function processLineByLine (){
    let input = [];
    const readInterface = readLine.createInterface({
        input: fs.createReadStream('/path2/poc/AdventofCode/Day9/input.txt'),
        // output: process.stdout,
        crlfDelay: Infinity,
        console: false
    });
    
    for await (const line of readInterface){
        input.push(line);
    }
    return input;
}



async function findEncodingError(){
    arrayInput = await processLineByLine();
    for(let i=preamble;i<arrayInput.length-1;i++){
        if(checksum(i-preamble,i-1,arrayInput[i])){
            continue; //look further
        } else {
            console.log(arrayInput[i]); // return the error.
            return arrayInput[i];;
        }
    }
    return arrayInput[i];
}


function checksum(start,end,compare){
    // console.log("checksum(",start,end,")=>",compare);

    //check for sum between start and end for the compare.

    let preambleBlockArray = arrayInput.slice(start,end+1) //end+1 as slice ignores the last index.
    for(i=0;i<preambleBlockArray.length;i++){
        for(j=0;j<preambleBlockArray.length;j++){
            // console.log("sum",preambleBlockArray[i],preambleBlockArray[j]);
           if((i!=j)&&(parseInt(preambleBlockArray[i]) + parseInt(preambleBlockArray[j]) === parseInt(compare))){ // you can't add the element to itself?
            //    console.log("MATCH : -->",preambleBlockArray[i],preambleBlockArray[j]);
               return parseInt(preambleBlockArray[i]) + parseInt(preambleBlockArray[j]);
           } else {
               continue;
           }
        }
    }    
}



// part 2
// ---

async function nsum(ncompare){
    arrayInput = await processLineByLine();

    // do sum of n (n >=2) continuous numbers in the input array === findEncodingError

    for(i=0;i<arrayInput.length;i++){
        let sum = parseInt(arrayInput[i]);
        for(j=0;j<arrayInput.length;j++){
            // console.log("[",i,j,"]");
            if((i<j)){
                // console.log("summing : -->",sum,arrayInput[j]);
                sum+= parseInt(arrayInput[j]); // do a running sum
                if(sum>ncompare){
                    // not valid - terminate loop & continue searching
                    break;
                } else if(sum === ncompare){
                    console.log("range --",i,j);
                    for(e=i;e<=j;e++){
                        // console.log(arrayInput[e]);
                        continuousBlock.push(parseInt(arrayInput[e]));
                    }
                    console.log(continuousBlock)

                    sortedInput = continuousBlock.sort((a,b)=>{
                        return a-b;
                    });

                    console.log(sortedInput)
                    console.log(sortedInput[0]+sortedInput[sortedInput.length-1])
                    return continuousBlock; // return the continuous block;
                }
            } else {
                continue; //increment the j loop until i<j
            }
        }
    } 
}

findEncodingError();
console.log(nsum(ncompare));
console.log(continuousBlock);

// return sum of min and max value