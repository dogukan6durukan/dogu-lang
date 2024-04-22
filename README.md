# dogu-lang

Just a simple language parsed top to bottom line by line created in Javascript. Lexer for creating AST and parsed according to rules. This is a very first version of my language. Have a plan to add string interpolation(Which I had tried and gave up for now :d), binary operations and assignment expression.

Features:
- Variable declaration
- Variable reference
- Output

Example:
``` 
name = "Dogukan Durukan"
otherName = name
anotherName2 = otherName

output anotherName2
```
The output will be Dogukan Durukan.
