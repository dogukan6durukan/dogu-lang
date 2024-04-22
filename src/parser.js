import { Lexer } from "./lexer.js";
import { Semantic } from "./semantic.js";
import { Interpreter } from "./interpreter.js";
import { Parse } from "./parse.js";

export class Parser  {
    constructor(inp) {
        this.token = null;
        this.parseToken = new Parse(inp);
        this.tokens = new Lexer().lex(inp).tokens;
        this.semantics = new Semantic(inp);
    }

    parse() {
        let out = ""; 
        while(this.next()) {
            switch (this.token.type) {
                case "OUTPUT":
                    let val = this.parseToken.parseOutput(this.token);
                break;
            }

            out += this.out();
        
        }
        return out;
    }
    next() {
        return (this.token = this.tokens.shift());
    }


    out() {
        switch (this.token.type) {
            case "OUTPUT":
                   if(this.token.value.type === "LITERAL") {
                       Interpreter.log(this.token.value.properties.value)      
                   }
            break;
        }
    }

}
