const { notDeepEqual } = require('assert');
const fs = require('fs');
const readLine = require('readline');
let arrayInput = [];

let accumulator=0;
async function processLineByLine (){
    let input = [];
    const readInterface = readLine.createInterface({
        input: fs.createReadStream('/path2/poc/AdventofCode/Day8/input.txt'),
        crlfDelay: Infinity,
        console: false
    });
    
    for await (const line of readInterface){       
        input.push(line);
    }
    return input;
}

async function execute(){
    arrayInput = await processLineByLine();
    // console.log("Puzzle Input",arrayInput);

    // THIS DOESN"T WORK!!!! - https://stackoverflow.com/questions/6612385/why-does-changing-an-array-in-javascript-affect-copies-of-the-array
    // let trialarrayInput = arrayInput; 

    let trialarrayInput = await processLineByLine() //read from the stream again - facepalm


    for(let i=0;i<arrayInput.length;i++){ //for each element in original arrayInput
        if(arrayInput[i].includes('nop')){ // if nop, swap with jmp and try console.
            trialarrayInput[i]=trialarrayInput[i].replace('nop','jmp')
            if(detectLoop(trialarrayInput)!==undefined){ 
                trialarrayInput= await processLineByLine() // reset 
                accumulator =0;
                continue; // it is a loop - try next combination
            } else {
                console.log(accumulator)
            }
        }         
        if(arrayInput[i].includes('jmp')){ // if nop, swap with jmp and try console.
            trialarrayInput[i]=trialarrayInput[i].replace('jmp','nop')
            if(detectLoop(trialarrayInput)!==undefined){ 
                trialarrayInput= await processLineByLine() // reset 
                accumulator =0;
                continue; // it is a loop - try next combination
            } else {
                console.log(accumulator)
            }
        }


    }
}


// you need to run this for every nop ->jmp or jmp-->nop
function detectLoop(ainput) {
    let visitMap = new Map();

    // construct visit map to count loops
    ainput.forEach((input,i) =>{
        visitMap.set(i+input,false);
        i++;
    });
    // console.log("Visit Map", visitMap)

    for(let i=0;i<ainput.length;){ // increment by 1 by default
        let ops = ainput[i].split(" ") //operation,count
        let operation = ops[0];
        let count = parseInt(ops[1]);

        if(!visitMap.get(i+ainput[i])){
            switch(operation){
                case 'nop':
                    // console.log(ops,"no operation")
                    visitMap.set(i+ainput[i],true)
                    i++;
                    break;
                case 'acc':
                    accumulator+= count;
                    // console.log(ops,'accumulator',accumulator);
                    visitMap.set(i+ainput[i],true)
                    i++;
                    break;
                case 'jmp':
                    visitMap.set(i+ainput[i],true)
                    i = i + count;
                    // console.log(ops, 'jump to',i);
                    break;
            }
        } else {
            // console.log("Won't Terminate",accumulator);
            return accumulator // return a numerical value if this is an infinite loop
        }
    } 
}

execute()