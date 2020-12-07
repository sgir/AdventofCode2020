const fs = require('fs');
const readLine = require('readline');
let arrayInput;
//1. read input into an array

async function processLineByLine (){
    let input = [];
    const readInterface = readLine.createInterface({
        input: fs.createReadStream('/Users/i850773/Developer/poc/AdventofCode/Day7/testInput.txt'),
        crlfDelay: Infinity,
        console: false
    });
    
    for await (const line of readInterface){
        input.push(line);
    }
    return input;
}

async function findShinyBags(){
    arrayInput = await processLineByLine();


    // 1. construct tree

    // For each line
    // 1.a. - split the sentence into before and after contains
    // 1.b - before is the root
    // 1.c - after is the children
    // Hash it

    let nodes = new Map();
    arrayInput.forEach(line=>{
        let root= line.split("contain")[0];
        root = root.slice(0,root.indexOf('bag')).trim();
        let tempchildren = line.split("contain")[1].split(',')
        const children = tempchildren.map(child=>{
            let obj = {};
            let sliceIndex = child.indexOf('bag');
            let tempchild = child.slice(0,sliceIndex).trim();
            let ckey = tempchild.slice(2,tempchild.length).trim();
            let cvalue = parseInt(tempchild.slice(tempchild.indexOf(tempchild.match(/\d/g)),2).trim())||0;
            obj[ckey] = cvalue;
            return obj;
        })
     nodes.set(root,children)
    })


    console.log(nodes)

    // 2. do DFS looking for Shiny Gold bag
}

findShinyBags()