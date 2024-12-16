// DOM Elements
const outputDiv = document.getElementById("output");
const inputField = document.getElementById("input");

// List of commands and their descriptions
const commands = {
    help: "Available commands: help, clear, about, time, date, math <operation>, weather, dice, currency <amount> <from> <to>, joke, quote, calendar, todo <add|list|remove>, ascii <text>",
    about: "Welcome to the Ultimate Terminal. Made for fun and learning!",
    clear: "Clears the screen.",
    time: "Shows the current time.",
    date: "Displays today's date.",
    math: "Performs math operations. Usage: math <num1> <operator> <num2>",
    weather: "Displays random weather.",
    dice: "Simulates a dice roll.",
    currency: "Converts currency. Example: currency 10 USD EUR",
    joke: "Tells a random joke.",
    quote: "Shares a motivational quote.",
    calendar: "Displays a simple calendar for the current month.",
    todo: "Manages your to-do list. Usage: todo add <task>, todo list, todo remove <index>",
    ascii: "Converts text into ASCII art. Usage: ascii <text>"
};

// To-Do List
let todoList = [];

// Handle input
inputField.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const input = inputField.value.trim();
        handleCommand(input);
        inputField.value = ""; // Clear input
    }
});

// Process commands
function handleCommand(input) {
    appendOutput(`> ${input}`, "output-info");

    const [command, ...args] = input.split(" ");
    switch (command) {
        case "help":
            appendOutput(commands.help, "output-info");
            break;
        case "clear":
            clearOutput();
            break;
        case "about":
            appendOutput(commands.about, "output-info");
            break;
        case "time":
            appendOutput(`Current Time: ${new Date().toLocaleTimeString()}`, "output-success");
            break;
        case "date":
            appendOutput(`Today's Date: ${new Date().toLocaleDateString()}`, "output-success");
            break;
        case "math":
            handleMathCommand(args);
            break;
        case "weather":
            displayWeather();
            break;
        case "dice":
            rollDice();
            break;
        case "currency":
            convertCurrency(args);
            break;
        case "joke":
            tellJoke();
            break;
        case "quote":
            showQuote();
            break;
        case "calendar":
            displayCalendar();
            break;
        case "todo":
            handleTodoCommand(args);
            break;
        case "ascii":
            displayAsciiArt(args.join(" "));
            break;
        default:
            appendOutput("Unknown command. Type 'help' for a list of commands.", "output-error");
    }
}

// Math Command
function handleMathCommand(args) {
    if (args.length === 3) {
        const [num1, operator, num2] = args;
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        if (!isNaN(a) && !isNaN(b)) {
            switch (operator) {
                case "+": appendOutput(`${a} + ${b} = ${a + b}`, "output-success"); break;
                case "-": appendOutput(`${a} - ${b} = ${a - b}`, "output-success"); break;
                case "*": appendOutput(`${a} * ${b} = ${a * b}`, "output-success"); break;
                case "/": b !== 0
                    ? appendOutput(`${a} / ${b} = ${a / b}`, "output-success")
                    : appendOutput("Error: Division by zero.", "output-error");
                    break;
                default: appendOutput("Invalid operator. Use +, -, *, or /.", "output-error");
            }
        } else {
            appendOutput("Invalid numbers. Usage: math <num1> <operator> <num2>", "output-error");
        }
    } else {
        appendOutput("Invalid format. Usage: math <num1> <operator> <num2>", "output-error");
    }
}

// Weather Command
function displayWeather() {
    const forecasts = [
        "Sunny, 25°C",
        "Cloudy, 18°C",
        "Rainy, 12°C",
        "Snowy, -2°C",
        "Windy, 20°C"
    ];
    appendOutput(`Weather: ${forecasts[Math.floor(Math.random() * forecasts.length)]}`, "output-info");
}

// Dice Roll
function rollDice() {
    const dice = Math.floor(Math.random() * 6) + 1;
    appendOutput(`You rolled a: ${dice}`, "output-success");
}

// Currency Conversion (simulation)
function convertCurrency(args) {
    if (args.length === 3) {
        const [amount, from, to] = args;
        const converted = (parseFloat(amount) * 1.2).toFixed(2); // Fake conversion rate
        appendOutput(`${amount} ${from} is approximately ${converted} ${to}`, "output-success");
    } else {
        appendOutput("Usage: currency <amount> <from> <to>", "output-error");
    }
}

// Tell a Joke
function tellJoke() {
    const jokes = [
        "Why don't programmers like nature? It has too many bugs.",
        "Why do Java developers wear glasses? Because they don't see sharp!",
        "How many programmers does it take to change a light bulb? None, it's a hardware issue!"
    ];
    appendOutput(jokes[Math.floor(Math.random() * jokes.length)], "output-info");
}

// Show a Quote
function showQuote() {
    const quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
        "Code is like humor. When you have to explain it, it’s bad. - Cory House"
    ];
    appendOutput(quotes[Math.floor(Math.random() * quotes.length)], "output-info");
}

// Display Calendar
function displayCalendar() {
    const now = new Date();
    const month = now.toLocaleString("default", { month: "long" });
    appendOutput(`📅 ${month} ${now.getFullYear()}`, "output-success");
}

// ASCII Art
function displayAsciiArt(text) {
    const asciiArt = `
     _________  
    |         | 
    |  ${text.toUpperCase()}  | 
    |_________| 
    `;
    appendOutput(asciiArt, "output-info");
}

// Append Output
function appendOutput(text, className = "") {
    const newLine = document.createElement("div");
    newLine.textContent = text;
    if (className) newLine.classList.add(className);
    outputDiv.appendChild(newLine);
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

// Clear Output
function clearOutput() {
    outputDiv.innerHTML = "";
}
