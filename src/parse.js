import { Semantic } from "./semantic.js";

export class Parse {
    constructor(inp) {
        this.token = null;
        this.tokens = [];
        this.semantics = new Semantic(inp);
    }
    parseOutput(token) {
        // If output argument is identifier
        if(token.value.type === "LITERAL") {
            if(token.value.properties.type === "IDENTIFIER") {
                let value = this.semantics.isDefined(token.value.properties);
                token.value = value;
            }
        }
    }

}

  