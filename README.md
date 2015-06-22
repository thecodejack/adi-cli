adi-cli
=======

This is my personal CLI which i have been using for months. I have removed most of things and shared my CLI as a template to build your own. Now you can do whatever you want with the code. This is build in Node using Meow, Chalk, Inquirerjs, unirest.

## Install

Makesure node or iojs, npm are installed in your PC.
Move to the repository folder through terminal
Run following command
```
$ npm install . -g
```

Please note that first line of file adi.js 
```
#!/usr/bin/env iojs
```
should be corrected to following if you are using node rather iojs
```
#!/usr/bin/env node
```

## Usage
Following command display the current forecast of Hyderabad, India.(Will soon moveit to setup)
```
$ adi climate
```

If you run `adi` with any words, it will display information about same
```
$ adi Java script
```

You can add as many commands as you want.

## Support (OS Terminals)

You should expect mostly good support for the CLI below.

- **Mac OS**:
  - Terminal.app
  - iTerm
- **Windows**:
  - cmd.exe
  - Powershell
  - Cygwin
- **Ubuntu**:
  - Terminal

## TODO
There are more commands like `live f1`, `live football`, `live cricket`, `mytwitter`, `hn`(Hacker News). Will push them by replacing personal API keys. 