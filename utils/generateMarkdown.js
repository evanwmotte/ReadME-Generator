// function to generate markdown for README
function generateMarkdown(data) {
  return `
  
  ${data.license[0]}

  # ${data.title}

  ## Description:
  
  > ${data.description}

  ## Table of Contents
  ### [Installation Instructions:](#installation-instructions:)
  ### [Usage Information:](#usage-information:)
  ### [Contribution Guidelines:](#contribution-guidelines:)
  ### [Testing Instructions:](#testing-instructions:)
  ### [License:](#license:)
  ### [Questions:](#questions:)


  ## Installation Instructions:
  
  > ${data.installation}

  ## Usage Information:
  
  > ${data.usage}

  ## Contribution Guidelines:
  
  > ${data.contributing}

  ## Testing Instructions:
  
  > ${data.tests}

  ## License: ${data.license[0]}

  > ${data.license[1]} is the license being used for this project. Please click the badge above for more information.

  ## Questions:

  ### Ways you can contact me if you have additional questions:
  
  > [My GitHub](https://github.com/${data.github})
  
  ${data.contactLI}
  
  ${data.email}

  ${data.contactSlack}

`;
}

module.exports = generateMarkdown;
