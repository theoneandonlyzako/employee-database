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
  Add a New Employee or Intern
  =================
  `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter employee or intern name'
      },
      {
        type: 'input',
        name: 'id',
        message: 'Enter your employee ID (required)',
        validate: idInput => {
            if (idInput) {
                return true;
            } else {
                console.log('please enter your employee ID!');
                return false;                
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address (required)',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('please enter your email address');
                return false;                
            }
        }
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Enter your office phone number (required)',
        validate: phoneInput => {
            if (phoneInput) {
                return true;
            } else {
                console.log('please enter your email address');
                return false;                
            }
        }
    },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did your position? (Check all that apply)',
        choices: ['Manager', 'Engineer', 'Intern']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)'
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'input',
        name: 'github',
        message: 'What is your Github username? (required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('please enter github!');
                return false;                
            }
        }
    },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another team member?',
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