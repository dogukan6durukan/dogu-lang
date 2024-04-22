export function getRules() {
    const child_tokens = [`("|')([^\\n]+)("|')|("|')(\\s|)("|')`, `[0-9]+(?!\\w)`, `(?!\\d)(\\w+)`]
    return {
        expression_statements: {
            log : RegExp(`(output) (${child_tokens.join('|')})`),

            string_interpolation : /@"([^\n]+)"/,
        },
        expressions : {
            literals : {
                string : /^("|')([^\n]+)("|')|("|')(\s|)("|')/,     
                number : /^[0-9]+(?!\w)/,
                identifier : /^[^\d\W]\w*(?!.+)/    
            }

        },
        statements: {
            declaration: RegExp(`(?!\\d)([\\w]+)\\s?(=)\\s?(${child_tokens.join('|')})`)
        }
    };
}