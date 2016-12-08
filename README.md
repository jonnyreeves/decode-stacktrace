# decode-stacktrace
Decode a minified stacktrace using a sourcemap

### Installation
```
npm install -g decode-stacktrace
```

### Usage
Invoke `decode-stacktrace` with your sourcemap, the cli will then prompt you to enter your obfuscated stacktrace which will then be decoded for you.

```
decode-stacktrace ~/path/to/code.js.map
```

### Limitations
Currently only support Chrome stacktraces... any not very well at that :P

