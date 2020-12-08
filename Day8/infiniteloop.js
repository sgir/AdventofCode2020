const fs = require('fs');
const readLine = require('readline');
let arrayInput;
let accumulator=0;
let visitMap = new Map();
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
    console.log("Puzzle Input",arrayInput);
    arrayInput.forEach((input,i) =>{
        visitMap.set(i+input,false);
        i++;
    });

    console.log("Visit Map", visitMap)
    
    for(let i=0;i<arrayInput.length;){ // increment by 1 by default
        let ops = arrayInput[i].split(" ") //operation,count
        let operation = ops[0];
        let count = parseInt(ops[1]);

        if(!visitMap.get(i+arrayInput[i])){
            switch(operation){
                case 'nop':
                    console.log('no operation');
                    visitMap.set(i+arrayInput[i],true)
                    i++;
                    break;
                case 'acc':
                    accumulator+= count;
                    console.log('accumulator',accumulator);
                    visitMap.set(i+arrayInput[i],true)
                    i++;
                    break;
                case 'jmp':
                    visitMap.set(i+arrayInput[i],true)
                    i = i + count;
                    console.log('jump to',i);
                    break;
            }
        }
    } 

    
}

execute()