// All quiz questions, organized by topic.
// Each topic has 5 questions. The user picks a topic,
// and we show all 5 questions from that topic in random order.

const TOPICS = {
  "Variables & Data Types": [
    {
      question: "Which keyword declares a variable that can be reassigned but not redeclared in the same scope?",
      options: ["var", "let", "const", "static"],
      correctIndex: 1
    },
    {
      question: "What is the data type of: let x;",
      options: ["null", "undefined", "NaN", "0"],
      correctIndex: 1
    },
    {
      question: "Which of these is NOT a primitive data type in JavaScript?",
      options: ["string", "number", "array", "boolean"],
      correctIndex: 2
    },
    {
      question: "What does 'typeof null' return?",
      options: ["'null'", "'undefined'", "'object'", "'number'"],
      correctIndex: 2
    },
    {
      question: "Which keyword should you use for a variable that should never be reassigned?",
      options: ["let", "var", "const", "final"],
      correctIndex: 2
    }
  ],

  "Operators & Type Coercion": [
    {
      question: "What does '5' + 3 evaluate to?",
      options: ["8", "'53'", "NaN", "Error"],
      correctIndex: 1
    },
    {
      question: "What does '5' - 3 evaluate to?",
      options: ["2", "'53'", "NaN", "'2'"],
      correctIndex: 0
    },
    {
      question: "What is the difference between == and ===?",
      options: ["No difference", "=== checks type and value, == only checks value", "== checks type and value, === only checks value", "=== is for strings only"],
      correctIndex: 1
    },
    {
      question: "What does !!\"hello\" evaluate to?",
      options: ["true", "false", "\"hello\"", "undefined"],
      correctIndex: 0
    },
    {
      question: "What does 0 == false evaluate to?",
      options: ["true", "false", "undefined", "Error"],
      correctIndex: 0
    }
  ],

  "Functions & Scope": [
    {
      question: "What is a closure?",
      options: [
        "A function with no parameters",
        "A function that remembers variables from where it was created",
        "A way to close a browser tab",
        "A loop that never ends"
      ],
      correctIndex: 1
    },
    {
      question: "What does 'hoisting' mean for function declarations?",
      options: [
        "Functions are deleted after use",
        "Functions can be called before they appear in the code",
        "Functions run faster",
        "Functions cannot have parameters"
      ],
      correctIndex: 1
    },
    {
      question: "What keyword defines an arrow function?",
      options: ["function", "=>", "func", "lambda"],
      correctIndex: 1
    },
    {
      question: "A variable declared with 'let' inside a function is:",
      options: ["Global", "Accessible outside the function", "Local to that function", "Always undefined"],
      correctIndex: 2
    },
    {
      question: "What does a function return if there's no explicit 'return' statement?",
      options: ["0", "null", "undefined", "Error"],
      correctIndex: 2
    }
  ],

  "Arrays": [
    {
      question: "Which method adds an item to the end of an array?",
      options: [".shift()", ".unshift()", ".pop()", ".push()"],
      correctIndex: 3
    },
    {
      question: "Which method removes the last item from an array?",
      options: [".pop()", ".push()", ".shift()", ".slice()"],
      correctIndex: 0
    },
    {
      question: "What does arr.map() return?",
      options: [
        "The original array, unchanged",
        "A new array with transformed values",
        "A single value",
        "true or false"
      ],
      correctIndex: 1
    },
    {
      question: "What does arr.filter() do?",
      options: [
        "Sorts the array",
        "Returns a new array with items that pass a test",
        "Removes all items",
        "Reverses the array"
      ],
      correctIndex: 1
    },
    {
      question: "How do you check the number of items in an array called 'list'?",
      options: ["list.size", "list.count()", "list.length", "list.len"],
      correctIndex: 2
    }
  ],

  "Objects": [
    {
      question: "How do you access the 'name' property of an object called 'user'?",
      options: ["user->name", "user.name", "user::name", "user[name]"],
      correctIndex: 1
    },
    {
      question: "What does Object.keys(obj) return?",
      options: [
        "An array of the object's values",
        "An array of the object's property names",
        "The number of properties",
        "A new empty object"
      ],
      correctIndex: 1
    },
    {
      question: "What does the spread operator do in { ...obj1, extra: true }?",
      options: [
        "Deletes obj1's properties",
        "Copies obj1's properties into a new object",
        "Converts obj1 to a string",
        "Throws an error"
      ],
      correctIndex: 1
    },
    {
      question: "Which syntax correctly destructures a 'name' property from an object?",
      options: ["const [name] = obj;", "const name = obj[0];", "const { name } = obj;", "const name = obj.get('name');"],
      correctIndex: 2
    },
    {
      question: "What does optional chaining (?.) help prevent?",
      options: [
        "Syntax errors",
        "Errors when accessing properties on null/undefined",
        "Infinite loops",
        "Type coercion"
      ],
      correctIndex: 1
    }
  ],

  "Loops & Conditionals": [
    {
      question: "Which loop is best when you know exactly how many times to repeat something?",
      options: ["while", "for", "do...while", "forEach only"],
      correctIndex: 1
    },
    {
      question: "What does 'break' do inside a loop?",
      options: ["Skips one iteration", "Ends the loop immediately", "Pauses the loop", "Restarts the loop"],
      correctIndex: 1
    },
    {
      question: "What does 'continue' do inside a loop?",
      options: ["Ends the loop", "Skips the current iteration and moves to the next", "Restarts the program", "Throws an error"],
      correctIndex: 1
    },
    {
      question: "Which is valid syntax for an if-else statement?",
      options: [
        "if x { } else { }",
        "if (x) { } else { }",
        "if x then { } else { }",
        "when (x) { } otherwise { }"
      ],
      correctIndex: 1
    },
    {
      question: "What does a switch statement help avoid?",
      options: ["Loops", "Long chains of if-else if statements", "Functions", "Variables"],
      correctIndex: 1
    }
  ],

  "DOM Basics": [
    {
      question: "What does DOM stand for?",
      options: ["Document Object Model", "Data Output Method", "Direct Object Mapping", "Display Order Model"],
      correctIndex: 0
    },
    {
      question: "Which method selects a single element by its id?",
      options: ["document.querySelectorAll()", "document.getElementById()", "document.getElementsByClass()", "document.find()"],
      correctIndex: 1
    },
    {
      question: "How do you change the text inside an element called 'el'?",
      options: ["el.innerText = 'new text'", "el.value() = 'new text'", "el.write('new text')", "el.content('new text')"],
      correctIndex: 0
    },
    {
      question: "Which method creates a new HTML element in JavaScript?",
      options: ["document.newElement()", "document.createElement()", "document.addElement()", "document.makeElement()"],
      correctIndex: 1
    },
    {
      question: "How do you add a CSS class to an element called 'el'?",
      options: ["el.class.add('name')", "el.addClass('name')", "el.classList.add('name')", "el.style.class('name')"],
      correctIndex: 2
    }
  ],

  "Events": [
    {
      question: "Which method attaches a click event to a button called 'btn'?",
      options: ["btn.onClick()", "btn.addEventListener('click', fn)", "btn.click = fn", "btn.event('click', fn)"],
      correctIndex: 1
    },
    {
      question: "What is 'event.target' inside an event handler?",
      options: [
        "The function that ran",
        "The element that triggered the event",
        "The page URL",
        "A random number"
      ],
      correctIndex: 1
    },
    {
      question: "Which event fires when a user types in an input field?",
      options: ["click", "submit", "input", "load"],
      correctIndex: 2
    },
    {
      question: "What does event.preventDefault() do?",
      options: [
        "Stops the event from happening at all",
        "Stops the browser's default behavior for that event (e.g. form submission)",
        "Deletes the event",
        "Pauses the page"
      ],
      correctIndex: 1
    },
    {
      question: "Which event fires when a form is submitted?",
      options: ["submit", "send", "post", "form"],
      correctIndex: 0
    }
  ],

  "ES6+ Syntax": [
    {
      question: "What does destructuring let you do?",
      options: [
        "Delete variables",
        "Extract values from arrays/objects into separate variables",
        "Combine two functions",
        "Convert strings to numbers"
      ],
      correctIndex: 1
    },
    {
      question: "What does the spread operator (...) do with an array?",
      options: [
        "Deletes all items",
        "Expands array items into individual elements",
        "Sorts the array",
        "Converts it to a string"
      ],
      correctIndex: 1
    },
    {
      question: "What is a template literal?",
      options: [
        "A string using backticks that allows embedded expressions",
        "A type of loop",
        "A way to declare functions",
        "A CSS feature"
      ],
      correctIndex: 0
    },
    {
      question: "Which syntax is an arrow function?",
      options: ["function() {}", "() => {}", "func() {}", "=> function() {}"],
      correctIndex: 1
    },
    {
      question: "What does 'export default' do in an ES module?",
      options: [
        "Exports a function only",
        "Marks the main thing a file exports, importable without curly braces",
        "Deletes the module",
        "Only works in Node.js"
      ],
      correctIndex: 1
    }
  ],

  "Strings": [
    {
      question: "Which method joins array items into a single string?",
      options: [".split()", ".join()", ".concat()", ".merge()"],
      correctIndex: 1
    },
    {
      question: "What does 'hello'.toUpperCase() return?",
      options: ["'hello'", "'HELLO'", "'Hello'", "Error"],
      correctIndex: 1
    },
    {
      question: "Which method splits a string into an array?",
      options: [".join()", ".split()", ".slice()", ".trim()"],
      correctIndex: 1
    },
    {
      question: "What does 'JavaScript'.length return?",
      options: ["9", "10", "11", "12"],
      correctIndex: 2
    },
    {
      question: "What does the template literal `Hello ${name}` do?",
      options: [
        "Prints the literal text '${name}'",
        "Inserts the value of the variable 'name' into the string",
        "Throws an error",
        "Only works with numbers"
      ],
      correctIndex: 1
    }
  ]
};
