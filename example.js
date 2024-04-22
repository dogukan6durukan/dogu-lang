import { Parser } from "./src/parser.js";

const doku = 
`
name = "Dogukan Durukan"
otherName = name
anotherName2 = otherName

output anotherName2
`

const parser = new Parser(doku);
parser.parse();