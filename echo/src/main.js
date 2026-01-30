/*
main.js
-------
Purpose:
- Application entry point
- Bootstraps the game
- Imports all systems (state, commands, UI, world, data)
- Wires input → command handling → output

Responsibilities:
- Initialize game state
- Set up event listeners (keyboard input)
- Call command dispatcher

Should NOT:
- Contain map data
- Contain enemy stats
- Contain large logic blocks

Future ideas:
- Game restart
- Save/load
- Difficulty selection
*/


const output = document.querySelector("#output");
const input = document.querySelector("#input");

const world = {
    town: {
        name: "Town",
        description: "A calm and safe place with a few houses.",
        exits: ["forest"]
    },
    forest: {
        name: "Forest",
        description: "Tall trees surround you. SOmething could be watching.",
        exits: ["town, cave"]
    },
    cave: {
        name: "Cave",
        description: "Dark and damp.",
        exits: ["forest"]
    }
};

// game object for user with data points relative to game information and functionality for state changes.
const game = {
    player: {
        name: "Hero:",
        hp: 20,
        maxHP: 20,
        gold: 0
    },
    location: "town",
    enemy: null // nothing exists here right now. could fill with fake data but initializing as null removes the chance of false data/bugs for the user.
}

// 2) A helper function that prints a line to the terminal
function print(text) {
    const p = document.createElement("p"); // makes a <p>
    p.className = "line";                  // gives it styling
    p.textContent = text;                  // sets visible text safely
    output.appendChild(p);                 // adds it to the terminal output

    // auto-scroll so the newest line stays visible
    output.scrollTop = output.scrollHeight;
}

// 3) Boot messages
print("OFFLINE TERMINAL RPG");
print("Type something and press Enter...");
input.focus();

// Fake Brain
function handleCommand(raw) {
    const cmd = raw.trim() // removes spaces from the start/end
    let dateTimeString = new Date().toLocaleString();

    if (!cmd) return;      // if empty do nothing

    if (cmd.toLowerCase() === "help") {
        print("Commands: help, about",);
        return
    }

    if (cmd.toLowerCase() === "about") {
        print("This is an offline RPG")
        return;
    }

    if (cmd.toLowerCase() === "clear") {
        output.innerHTML = ""
        print(`Terminal Cleared: ${dateTimeString}`)
        return
    }

    if (cmd.toLocaleString() === "time") {
        print(dateTimeString);
        return
    }

    if (cmd === "look") {
  const location = world[game.location];

  print(`You are in ${location.name}.`);
  print(location.description);

    if (location.exits.length > 0) {
        print(`Exits: ${location.exits.join(", ")}`);
    }

    return;
    }

    if (cmd.toLocaleString() === "where") {
        print(`You are currently in ${game.location}`)
        return;
    }

    // This logic takes input from the user, then slices it to make it easily used across the logic.
    // Here, we are checking the game object for location and comparing it to the users input.
    // The logic only allows certain conditions, thus giving the user actionable steps to navigate the text based world.
    // Basic Model: If I am in X and want to go to Y, is that allowed?
    if (cmd.startsWith("go ")) {
  const destination = cmd.slice(3).trim();
  const location = world[game.location];

  // Guard: already there
    if (destination === game.location) {
        print(`You are already in ${destination}.`);
        return;
    }

    // Guard: invalid location
    if (!world[destination]) {
        print("That location does not exist.");
        return;
    }

    // Check exits
    if (!location.exits.includes(destination)) {
        print("You can't go there from here.");
        return;
    }

    // Move
    game.location = destination;
    print(`You travel to ${world[destination].name}.`);
    return;
    }
}

// In  the above function handleCommand, I have used the innerHTML rather than the textContent method on the output variable.
// This is because textContent is more secure by preventing HTML injection, treating everything as literal text, and is safer for user input.--
// --> this allows for better security when users interact with the application.
// Since the user doesn't control the response of a command, I can safely use innerHTML for clearing or injecting the controlled UI.

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const command = input.value; // what was typed
        print(`$ ${command}`);       // echo it to the output
        input.value = "";

        handleCommand(command);
    }
});