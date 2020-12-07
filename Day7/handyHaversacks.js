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

    // 1. Construct Map 
    // For each line
    // 1.a. - split the sentence into before and after contains
    // 1.b - before is the root
    // 1.c - after is the children
    
    let nodes = new Map();
    arrayInput.forEach(line=>{
        let root= line.split("contain")[0];
        root = root.slice(0,root.indexOf('bag')).trim(); // remove 'bag' 
        let tempchildren = line.split("contain")[1].split(',') 
        const children = tempchildren.map(child=>{ // [{color1: 1, color2:2}]
            let obj = new Map();
            let sliceIndex = child.indexOf('bag');
            let tempchild = child.slice(0,sliceIndex).trim();
            let ckey = tempchild.slice(2,tempchild.length).trim();
            let cvalue = parseInt(tempchild.slice(tempchild.indexOf(tempchild.match(/\d/g)),2).trim())||0;
            obj.set(ckey, cvalue);
            return obj;
        }) 
     nodes.set(root,children)
    })

    console.log(nodes)

    // 2. do DFS looking for Shiny Gold bag

//     nodes.forEach(node=>{ // for each node
//         console.log(node)
//         node.forEach(child=>{ //children 
//             console.log(child)
//             // explore child 
//         })
//     })

    // for(let [key,value] of nodes.entries()){
    //     console.log(key);
    //     for (let child of value){ //Array of maps
    //         for(let [key,value] of child.entries()){
    //             console.log(key);
    //             // traverse full parent map
    //             // check for bright white
    //             console.log(nodes.get(key));

    //         } // map
    //     }
    // }
    var ogMap = nodes
    DFS([ogMap],ogMap)
    
}

findShinyBags()
let shinyGold =0;
// Traverse  Maps
function DFS(nodes,ogMap){ //Array of Maps
    for(let [key,valueMap] of nodes.entries()){
        console.log(valueMap);
        for(let [key,val] of valueMap.entries()){ 
                console.log(key);
                console.log(val);
                if(val==='shinyGold'){
                    
                }
                if(typeof(val)=='number'){ // leaf
                    if(val===0){ // no bags leaf
                        continue;
                    }
                    DFS(ogMap.get(key),ogMap);
                } else { // [Map]
                    DFS(val,ogMap)
                }
                
            }
        } // map

}
  
