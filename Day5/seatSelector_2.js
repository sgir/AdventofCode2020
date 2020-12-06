const fs = require('fs');
const readLine = require('readline');
let arrayInput;
let largetstSeatNumber;

async function processLineByLine (){
    let input = [];
    const readInterface = readLine.createInterface({
        input: fs.createReadStream('path2/AdventofCode/Day5/input.txt'),
        crlfDelay: Infinity,
        console: false
    });
    
    for await (const line of readInterface){       
        input.push(line);
    }
    return input;
}

function calculateRow(seatRow){

}
async function calculateSeatNumber(){
    arrayInput = await processLineByLine();
    // console.log("Here are your objects",arrayInput);

    var arrayOfVals  = arrayInput.map(seatNotation=>{
        let seatRow = seatNotation.substr(0,7)
        // console.log("R: ",seatRow)
        seatRow = [...seatRow]; // split into  individual characters & revers
        var seatRowStart= 0;
        var seatRowEnd=  127;
        
        for(i=0;i<seatRow.length;i++){
            if(seatRow[i]==='F'){
                //front seats
                seatRowEnd = seatRowEnd - Math.pow(2,6-i)  
                // console.log("Row End: ",seatRowEnd) 
            } else if(seatRow[i]==='B'){

                //back seats
                seatRowStart =  seatRowStart + Math.pow(2,6-i)
                // console.log("Row Start: ",seatRowStart)  
              
            }
        }

        let seatColumn = seatNotation.substr(7,3);
        // console.log("C: ",seatColumn)
        seatColumn = [...seatColumn]; // split into  individual characters & revers
        var seatColStart= 0;
        var seatColEnd=  7;
        
        for(i=0;i<seatColumn.length;i++){
            if(seatColumn[i]==='L'){
                //front seats
                seatColEnd = seatColEnd - Math.pow(2,2-i)  
                // console.log("Col End: ",seatColEnd) 
            } else if(seatColumn[i]==='R'){
                //back seats
                seatColStart =  seatColStart + Math.pow(2,2-i)
                // console.log("Col Start: ",seatColStart)  
            }
        }

       return seatRowStart*8+seatColStart;

    })

let sortedList = arrayOfVals.sort((a,b)=> a-b)
console.log(sortedList);
for(i=0;i<sortedList.length;i++){
    if(sortedList[i+1]-sortedList[i]==2){
        console.log(sortedList[i])
    }
}




return arrayOfVals;

}

console.log(calculateSeatNumber());
