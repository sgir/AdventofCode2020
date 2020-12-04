const fs = require('fs');
const readLine = require('readline');
let arrayInput;
let validPassports = 0;

const ACCEPT_PROPERTIES = ['byr','iyr','eyr','hgt','hcl','ecl','pid']
const cid = 'cid';

async function processLineByLine (){
    let input = [];
    const readInterface = readLine.createInterface({
        input: fs.createReadStream('/path2/poc/AdventofCode/Day4/input_1.txt'),
        crlfDelay: Infinity,
        console: false
    });
    
    for await (const line of readInterface){       
        input.push(line);
    }
    return input;
}



async function findValidPassports(){
    arrayInput = await processLineByLine();

    // Read Passport
    var passports =[];
    let i=0;
    let passport = []; // 
    while(i <=arrayInput.length-1){
        if(arrayInput[i].length>0){// if not an empty line.
            passport.push(arrayInput[i])
            console.log(passport)
            if(i==arrayInput.length-1){//last stack
                console.log(passport.join(" "))
                passports.push(passport.join(" "));
                console.log(passports)
            }
            i++;//seek next line
        } else { // we have hit end of input for a passpo
            console.log(passport.join(" "))
            passports.push(passport.join(" "));
            console.log(passports)
            passport = []; // 
            i++;
        }
        
    }
    console.log("here are your passports", passports);
    // var cleanedArray = passports.map(function splitInput(input){
    //     return input.split(" ").map(keyValuePair=>{
    //         var cleanObj = {};    
    //         let properties = keyValuePair.split(":")
    //         cleanObj[properties[0]] = properties[1];
    //         return cleanObj;
    //     })
    // })
    // console.log("Here are your objects",);

``

    var cleanedArray = passports.map(function splitInput(input){
        var cleanObj = {};    
        return input.split(" ").map(keyValuePair=>{
            let properties = keyValuePair.split(":")
            cleanObj[properties[0]] = properties[1];
            return cleanObj;
        })
    })



    console.log("Here are your objects",cleanedArray);

   var nonDuplicate= cleanedArray.map(objArray=>{
       return [...new Set(objArray)]
   }).flat();

    console.log("Here are your objects",nonDuplicate);
    nonDuplicate.forEach(passport=>{
        if(passport.cid){
            delete passport.cid
        }
        //look up each key in the accept list
        const isKeyinAcceptList = (key)=> Object.keys(passport).includes(key)

        if(ACCEPT_PROPERTIES.every(isKeyinAcceptList)){
            validPassports = validPassports+1;
            console.log(validPassports)
        }
    }
)};

console.log(findValidPassports());
