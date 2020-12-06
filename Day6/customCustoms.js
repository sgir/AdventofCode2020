const fs = require('fs');
const readLine = require('readline');
let arrayInput;
let largetstSeatNumber;

async function processLineByLine (){
    let input = [];
    const readInterface = readLine.createInterface({
        input: fs.createReadStream('/Users/i850773/Developer/poc/AdventofCode/Day6/input.txt'),
        crlfDelay: Infinity,
        console: false
    });
    
    for await (const line of readInterface){       
        input.push(line);
    }
    return input;
}

async function calculateSeatNumber(){
    arrayInput = await processLineByLine();
    // console.log("Here are your objects",arrayInput);

    // Read groups responses
    var groupResponse =[];
    let i=0;
    let eachResponse = []; 
    while(i <=arrayInput.length-1){
        if(arrayInput[i].length>0){// if not an empty line.
            eachResponse.push(arrayInput[i])
            // console.log(eachResponse)
            if(i==arrayInput.length-1){//last stack
                // console.log(eachResponse.join(" "))
                groupResponse.push(eachResponse.join(" "));
                // console.log(groupResponse)
            }
            i++;//seek next line
        } else { // we have hit end of input
            // console.log(eachResponse.join(" "))
            groupResponse.push(eachResponse.join(" "));
            // console.log(groupResponse)
            eachResponse = []; // 
            i++;
        }
        
    }

    console.log("Here is your groupResponse Array",groupResponse)
    let cumulative =0;
    groupResponse.map(responses=>{
       let uniqueResponses= new Set([...responses]) // split string into char array and get uniques
       if(uniqueResponses.has(' ')){
           delete uniqueResponses.delete(' ')
       }
       console.log(uniqueResponses)
       console.log(uniqueResponses.size)
       cumulative  = cumulative +uniqueResponses.size
       console.log(cumulative)
    })
}

console.log(calculateSeatNumber());
