const fs = require('fs');
const readLine = require('readline');
let arrayInput;
let validPassports = 0;

const ACCEPT_PROPERTIES = ['byr','iyr','eyr','hgt','hcl','ecl','pid']
let ACCEPT_PROPERTIES_RULE = {
    byr: {
        check: function(input){
        return (input.length==4) && (input>=1920 && input<=2002)
        }
    },
    iyr: {
        check: function(input){
        return (input.length==4) && (input>=2010 && input<=2020)
        }
    },
    eyr: {
        check: function(input){
         return (input.length==4) && (input>=2020 && input<=2030)
        }
    },
    hgt: {
        check: function(inputString){
            if(inputString.indexOf("cm")>-1){
                return (parseInt(inputString.split("cm")[0])>=150) && (parseInt(inputString.split("cm")[0])<=193)
            } else if(inputString.indexOf("in")>-1){
                return (parseInt(inputString.split("in")[0])>=59) && (parseInt(inputString.split("in")[0])<=76)
            }
            return false;
        }
    },
    hcl: {
        check: function(inputString){
            regex = /#[0-9a-f]{6}/g
            return inputString.match(regex)
        }
    } ,
    ecl: {
        check: function(input){
            let testArray = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
            return testArray.includes(input)
        }
    },
    pid:  {
        check: function(input){
         return (input.length==9)
        }
    },
}

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
        // const isValueValid = (key)=>

        let allValid =0;
        if(ACCEPT_PROPERTIES.every(isKeyinAcceptList)){
            for(const property in passport){
                if(ACCEPT_PROPERTIES_RULE[property].check(passport[property])){
                  allValid = allValid+1;
                }
                if(allValid===7){
                validPassports = validPassports+1;
                console.log(validPassports)
                }
            }
      
    }
});
}
console.log(findValidPassports());
