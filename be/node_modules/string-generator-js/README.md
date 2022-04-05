Library to help you create random strings.

**Latest update**

- Make strings  more randomize by adding numbers to it
- option to configure type of string as numbers, alphabets or both


## **Installation and Usage**

**Server-side usage**

Install the library with 

```npm install --save string-generator-js```
    
```javascript
let generator = require('string-generator-js');
const options = {length:5}
const code = generator.generate(options)
```

this will create the random string with the length of 5 :-
```javascript
console.log(code)

/*
       pnfbF
*/
```



### **Options** 
 Options accept following values

| Parameter               | Type | Default | Accept |
| ------------------ | ------- | ------- | ------- |
| length | Number | 10 | Any number |
| type | String | both | numbers, alphabets, both |




## **ABOUT :-**

this package is in its initial age so you may face some bugs and difficulties by using this but i am intresterd to know about your thoughts regarding this package so i can develop it more further and i hope that some of you may  interested helping me with this package and give me new ideas that help me building this more further. 

you can mail me your reviews and idea to my gmail account _**aliasgherbadshah128@gmail.com**_
