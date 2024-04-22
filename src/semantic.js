import { Lexer } from "./lexer.js";

export class Semantic {
    constructor(inp) {
        this.token = null;
        this.tokens = new Lexer().lex(inp).tokens;
        this.identifiers = this.identifierList();
    }

    printTokens() {
        console.log(this.tokens);
    }

    identifierList() {
        const identities = [];
        for(let token of this.tokens){
            if(token.hasOwnProperty("identifier")) {
                identities.push({
                    identifier : token.identifier,
                    value : token.value
                });
            }
        }
        return identities;
    }


    isDefined(token) {
        let identifiers = this.identifiers;

        let isMatched = identifiers.find((identifier) => identifier.identifier === token.value);
        
        if(isMatched) {
            if(isMatched.value.type === "LITERAL") {
                if(isMatched.value.properties.type === "IDENTIFIER") {
                    return this.isDefined(isMatched.value.properties);
                }    
            }
            
            return isMatched.value;
        } else {
            console.error("Undefined identifier!")
        }

    }

}
