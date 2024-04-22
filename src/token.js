export class Token {

    constructor(tokenType, properties) {
        this.tokenType = tokenType;
        this.properties = properties;
    }

    static tokens = this.getTokens();


    static getTokens() {
        // ADD, SUB TYPES TO BASE TOKENS
        return {
            expression_statement : {
                type : "EXPRESSION_STATEMENT",
                tokens : ["OUTPUT"]
            },
            expressions : {
                type : "EXPRESSION",
                tokens : ["LITERAL"]
            },
            statements : {
                type : "STATEMENT",
                tokens : ["VARIABLE_DECLARATION"]
            },
            omit : {
                type : "OMIT",
                tokens : ["WHITESPACE"]
            }
       
        }
    }


    static createToken(token, tokenType) {
        const keys = Object.keys(tokenType.tokens);
        for(let key of keys) {
            if(tokenType.tokens[key] === token.properties.type) {
                return {
                    type : tokenType.type,
                    ...token.properties
                }
            }
        }

    }

    static omit(token, properties) {
        const omit = this.tokens.omit;
        const keys = Object.keys(omit.tokens);

        for(let key of keys) {
            if(properties.type === omit.tokens[key]) {
                return {
                    omit : token,
                    ...properties
                }
            }
        }

    }


    static create(token) {
        const expression_statement = this.tokens.expression_statement;
        const expression = this.tokens.expressions;
        const statement = this.tokens.statements;


        switch (token.tokenType) {
            // If type is EXPRESSION_STATEMENT
            case expression_statement.type : {
                // send property information
                return this.createToken(token, expression_statement);
            }          

            case expression.type : {
                return this.createToken(token, expression);
            }
            
            // If type is STATEMENT
            case statement.type: {
                return this.createToken(token, statement)
            }
        }
    }
}
