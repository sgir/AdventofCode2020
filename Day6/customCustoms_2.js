const fs = require('fs');
const readLine = require('readline');
let arrayInput;
let largetstSeatNumber;

async function processLineByLine (){
    let input = [];
    const readInterface = readLine.createInterface({
        input: fs.createReadStream('/path2/poc/AdventofCode/Day6/input.txt'),
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
    console.log("Here are your objects",arrayInput);

    const groups = arrayInput
    .join("\n")
    .split("\n\n")
    .map((group) => group.split("\n"));

    console.log("Here are your objects",groups);

    let final = groups.map((group) => {
        const set = new Set([...group.join("")]); //join each group's response and expand in a set - unique chars in a group's response
        return [...set].filter((character) => {
            return group.every((response) => response.includes(character));
    }).length;
  }).reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  });
  console.log(final)
}

console.log(calculateSeatNumber());

