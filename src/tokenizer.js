import { getRules } from "./rules.js";
export class Tokenizer {
    constructor() {
        this.rules = getRules();
        this.token = null;
        this.types = this.getTypes();
    }

        getTypes() {
            return {
                isNumber: this.rules.expressions.literals.number,
                isString : this.rules.expressions.literals.string,
                isIdentifier : this.rules.expressions.literals.identifier,
            };
        }
    
    
        typeCheck(value) {
            const typeCheck = this.getTypes();
    
            return (typeCheck.isString.test(value) ? "STRING" : typeCheck.isNumber.test(value) ? "NUMBER" : typeCheck.isIdentifier.test(value) ? "IDENTIFIER" : null)
        }

        createChildToken(value) {
            const expected_child_tokens = []
            
            // ADD literals to expected_child_tokens
            const literals = this.rules.expressions.literals;
            const literalKeys = Object.keys(literals);
            for(let k of literalKeys) {
                expected_child_tokens.push(
                    {
                        regex : literals[k],
                        // binding
                        tokenizer : (value) => this.literal(value)
                    }
                )
            }

            let result = expected_child_tokens.find(({regex}) => regex.exec(value));
            let token = result.tokenizer(value);
            return token;
        }

        literal(src) {
            const literalExp = this.rules.expressions.literals;
            let literal;
            // (literal = literalExp.identifier.exec(src))
            if((literal = literalExp.string.exec(src)) || (literal = literalExp.number.exec(src)) || (literal = literalExp.identifier.exec(src))) {
                
                let isString = this.rules.expressions.literals.string.test(literal[0]);                
                // Check for empty string values
                if(isString && literal[2] === undefined) {
                    literal[2] = ""
                }

                return {
                    type : "LITERAL",
                    properties : {
                        value : isString ? literal[2] : literal[0],
                        type :  this.typeCheck(src)
                    }
                }
            }
        }

        variable_declaration(src) {
            let variable = this.rules.statements.declaration.exec(src);
            if(variable) {
                let value = this.createChildToken(variable[3]);
                return {
                    type : "VARIABLE_DECLARATION",
                    identifier : variable[1],
                    operator : variable[2],
                    value : value,
                }
            }
        }

        output(src) {
            let output = this.rules.expression_statements.log.exec(src);
            if(output) {
                let value = this.createChildToken(output[2]);
                return {
                    type: "OUTPUT",
                    keyword: output[1],
                    value : value
                }
            }
        }
}
