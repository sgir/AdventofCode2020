const fs = require('fs');
const { sep } = require('path');
const readLine = require('readline');
let arrayInput;
let largetstSeatNumber;

async function processLineByLine (){
    let input = [];
    const readInterface = readLine.createInterface({
        input: fs.createReadStream('/Users/i850773/Developer/poc/AdventofCode/Day6/testInput.txt'),
        crlfDelay: Infinity,
        console: false
    });
    
    for await (const line of readInterface){       
        input.push(line);
    }
    return input;
}


// function intersectB(firstSet, ...sets) {
//     // function to intercept two sets
//     var intersect = (a,b) => {
//         return new Set([...a].filter(item => b.has(item)))
//     };

//     // iterate all sets comparing the first set to each.
//     sets.forEach(sItem => firstSet = intersect(firstSet, sItem));

//     // return the result.
//     return firstSet;
// }

function intersect(a, b) {
    return new Set(a.filter(i => b.has(i)));
}

async function calculateSeatNumber(){
    arrayInput = await processLineByLine();
    // console.log("Here are your objects",arrayInput);

    // Read groups responses
    var groupResponse =[];
    let i=0;
    let eachResponse = []; 
    let eachResponseCount =0;

    while(i <=arrayInput.length-1){
        if(arrayInput[i].length>0){// if not an empty line.
            eachResponse.push(arrayInput[i])
            eachResponseCount++
            console.log(eachResponseCount)
            if(i==arrayInput.length-1){//last stack
                // console.log(eachResponse.join(" "))
                let obj = {
                    groupResponse: eachResponse.join(" "),
                    groupCount: eachResponseCount
                }
                groupResponse.push(obj);

                console.log(groupResponse)
            }
            i++;//seek next line
        } else { // we have hit end of input
            // console.log(eachResponse.join(" "))
            let obj = {
                groupResponse: eachResponse.join(" "),
                groupCount: eachResponseCount
            }
            groupResponse.push(obj);
            console.log(groupResponse)
            eachResponse = []; // 
            eachResponseCount =0
            i++;
        }
        
    }

    console.log("Here is your groupResponse Array",groupResponse)
    let cumulative =0;
    let final =0;
    groupResponse.map(responses=>{
       if(responses.groupCount===1){ // one person in a group
        cumulative = cumulative + responses.groupResponse.length;
       } else { // more ppl in  the group
        //  final = responses.groupResponse.filter(elements=>{
        //     return elements!==' '
        // })
        let individualResponses = [...responses.groupResponse.split(" ")];
        let separates = individualResponses.map(response=>{
            return [...response]
        })
        // console.log(individualResponses)//groupResponseArray
        console.log(separates)//groupResponseArray

        //compare each array in separates with the other
        var sets = []
        separates.map(arrays=>{
            arrays.forEach(array=>{
                sets.push(new Set(array));
            })
        });
        var inter = intersect(...sets);
            console.log([...inter]);
            if([...inter].length>0)
                cumulative = cumulative+ [...inter].length
        }
       })
    console.log("Total",cumulative)
}

console.log(calculateSeatNumber());
