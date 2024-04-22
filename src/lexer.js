import { Token } from "./token.js";
import { Tokenizer } from "./tokenizer.js";

export class Lexer {
    constructor(inp) {
        this.inp = inp;
        this.tokens = [];
        this.tokenizer = new Tokenizer();
    }

    // Lexing
    lex(inp) {
        let tok;
        let source = inp;

        const lines = source.split("\n");
        
        for(let token of lines) {

            if(tok = this.tokenizer.literal(token)) {
                tok = new Token("EXPRESSION", tok);
                this.tokens.push(
                    Token.create(tok)
                );
            }

            else if(tok = this.tokenizer.variable_declaration(token)){
                tok = new Token("STATEMENT", tok);
                this.tokens.push(
                    Token.create(tok)
                );
            } 

            else if(tok = this.tokenizer.output(token)) {
                tok = new Token("EXPRESSION_STATEMENT", tok);
                this.tokens.push(
                    Token.create(tok)
                );
            }

            else if(token === '') {
                Token.omit("OMIT", {
                    type : "WHITESPACE"
                })
            }

            // Unexpected token 
            else {
                throw new Error(`Unexpected token "${token}" at ${inp.indexOf(token)}"`);                
            }
     
        }

        return { tokens: this.tokens };

    }


}
