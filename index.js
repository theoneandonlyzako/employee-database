const inquirer = require('inquirer');
const { writeFile, copyFile } = require('./utils/generate-site.js');
const generatePage = require('./src/page-template.js');

const promptUser = () => {
 return inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Enter company name (required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('please enter yourname!');
                return false;                
            }
        }
    },
]);
};

const promptProject = portfolioData => {
    //if theres no 'projects' array property, careate one
    if(!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
  =================
  Add a New Team Member
  =================
  `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter team member's name"
      },
      {
        type: 'checkbox',
        name: 'position',
        message: "What is the team member's position? (Check all that apply)",
        choices: ['Employee', 'Manager', 'Engineer', 'Intern']
      },
      {
        type: 'input',
        name: 'id',
        message: "Enter team member's ID (required)",
        validate: idInput => {
            if (idInput) {
                return true;
            } else {
                console.log("Team Member's ID is required");
                return false;                
            }
        }
    },
    {
      type: 'input',
      name: 'phone',
      message: "Enter team member's phone number (required)",
      validate: phoneInput => {
          if (phoneInput) {
              return true;
          } else {
              console.log("please enter team member's email address");
              return false;                
          }
      }
  },
    {
        type: 'input',
        name: 'email',
        message: "Enter team member's email address (required)",
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log("Team Member's email is required");
                return false;                
            }
        }
    },
      {
        type: 'input',
        name: 'github',
        message: "Enter team member's Github username? (required)",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("please enter team member's github!");
                return false;                
            }
        }
    },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to add another team member?',
        default: false
      }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      });
  };

  promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });
