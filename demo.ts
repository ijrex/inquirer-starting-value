import inquirer from 'inquirer';
import InputStartingVal from './index.js';

inquirer.registerPrompt('input-starting-value', InputStartingVal);

inquirer
  .prompt([
    /* Pass your questions in here */ {
      type: 'input-starting-value',
      name: 'package_name',
      message: "What's your package name",
      initialValue: '@bonnie-eilish/',
    },
  ])
  .then((answers) => {
    console.log(answers);
  })
  .catch((err) => {
    if (err.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log(err);
    }
  });
