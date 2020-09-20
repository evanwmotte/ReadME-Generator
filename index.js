var fs = require("fs")
var inquirer = require("inquirer")
var util = require("util");

const generateMarkdown = require("./utils/generateMarkdown");

const writeFileAsync = util.promisify(fs.writeFile);


const prompts = () => {
return inquirer.prompt([
    { 
        type: "input",
        name: "title",
        message: "What is the title of your project?"
    },
    {
        type: "input",
        name: "description",
        message: "Enter a detailed description of your project here:"
    },
    {
        type: "input",
        name: "installation",
        message: "Enter your detailed installation instructions here:"
    },
    {
        type: "input",
        name: "usage",
        message: "Enter your usage information here:"
    },
    {
        type: "list",
        name: "license",
        message: "Which license would you like to use?",
        choices: ["MIT", "GNU GPL v2", "GNU GPL v3", "Apache 2.0", "BSD 2.0", "ISC"]
    },
    {
        type: "input",
        name: "contributing",
        message: "Enter your contribution guidelines here:",
    },
    {
        type: "input",
        name: "tests",
        message: "Enter your testing instructions here:"
    },
    {
        type: "checkbox",
        name: "questions",
        message: "Enter the best ways to reach you with additional questions:",
        choices: ["E-mail", "LinkedIn", "Slack"]
    },
    {
        type: "input",
        name: "github",
        message: "Enter your github username:"
    },
    {
        type: "input",
        name: "email",
        message: "Enter your email address:",
        when: (data) => data.questions.indexOf("E-mail") !== -1
    },
    {
        type: "input",
        name: "contactLI",
        message: "Enter your LinkedIN URL:",
        when: (data) => data.questions.indexOf("LinkedIn") !== -1
    },
    {
        type: "input",
        name: "contactSlack",
        message: "Enter your Slack username:",
        when: (data) => data.questions.indexOf("Slack") !== -1
    }
])
};

function licenseChoice(data) {
    switch(data.license)
    {
        case "MIT": return data.license = ["[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)", data.license];
        case "GNU GPL v2": return data.license = ["[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)", data.license]
        case "GNU GPL v3": return data.license = ["[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)", data.license]
        case "Apache 2.0": return data.license = ["[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)", data.license]
        case "BSD 2.0": return data.license = ["[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)", data.license]
        case "ISC": return data.license = ["[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)", data.license]
    }
}

function contactInfo(data) {

if (data.questions.indexOf("E-mail") !== -1) {
    data.email = "> My email address is: " + data.email
} else {
    data.email = ""
}

if (data.questions.indexOf("LinkedIn") !== -1) {
  data.contactLI = `> My LinkedIn: [${data.contactLI}](${data.contactLI})`
} else {
  data.contactLI = ""
}

if (data.questions.indexOf("Slack") !== -1) {
  data.contactSlack = "> My slack username is: " + data.contactSlack
} else {
  data.contactSlack = ""
}
}  

async function init() {
    try {
      const data = await prompts();

      contactInfo(data);
      licenseChoice(data);
  
      const readMe = generateMarkdown(data);
  
      await writeFileAsync("readMe.md", readMe);
  
      console.log("Successfully wrote to readMe.md");
    
    } catch(err) {
      console.log(err);
    }
  }
  
  init();