const fs = require('fs');
const readLine = require('readline');
let arrayInput;
let nodes = new Map();

//1. read input into an array

async function processLineByLine (){
    let input = [];
    const readInterface = readLine.createInterface({
        input: fs.createReadStream('/path2/poc/AdventofCode/Day7/input.txt'),
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

    // 1. Construct Map 
    // For each line
    // 1.a. - split the sentence into before and after contains
    // 1.b - before is the root
    // 1.c - after is the children
    
    arrayInput.forEach(line=>{
        let root= line.split("contain")[0];
        root = root.slice(0,root.indexOf('bag')).trim(); // remove 'bag' 
        let tempchildren = line.split("contain")[1].split(',') 
        const children = tempchildren.map(child=>{ // [{color1: 1, color2:2}]
            // let obj = new Map();
            let sliceIndex = child.indexOf('bag');
            let tempchild = child.slice(0,sliceIndex).trim();
            let ckey = tempchild.slice(2,tempchild.length).trim();
            return ckey;
        }) 
     nodes.set(root,children)
    })

    console.log(nodes)
    const colors = nodes.keys();
    let sum =0;
    for (const color of colors) {
        if(doesContainShinyGold(color) && color !='shiny gold'){
            sum = sum+1;
        }
    }

    console.log("total",sum);
}

  
function doesContainShinyGold(color){
    if(color === 'shiny gold') return true;
    if(!nodes.has(color)) return false;

    const innerbag = nodes.get(color);
    for (const bag of innerbag) {
        if(doesContainShinyGold(bag)){
            return true
        }
    }
    return false;   
}


execute()
