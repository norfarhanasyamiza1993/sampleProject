
var str = "Hello planet earth , you are a great planet";
var name = "Anas";
var strArray = str.split("," && " ");
console.log(strArray);

var index;
for (let index = 0; index < strArray.length; index++) {
    if (strArray[index] === ("earth" && ",")) {
        break;
    // }else if(strArray[index] >= "you") {
    //     break;
    }      
    result = "The number is " + index ;
    console.log(result);
}

// //CharAt Method : Print String CHar
// console.log(str.charAt(0));
// //Unicode Value
// console.log(str.charCodeAt(0));
// //concat
// console.log(str.concat(name));
// //endWith : Check string True or False
// console.log(str.endsWith("planet"));
// //print char from charcode
// console.log(String.fromCharCode(65,70));
// //include : check specified string or char
// console.log(str.includes("Hello"));
// //index of 
// console.log(str.indexOf("planet"));
// //last index of
// console.log(str.lastIndexOf("planet"));





