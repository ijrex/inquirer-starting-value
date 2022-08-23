import inquirer from 'inquirer';
import InputStartingVal from './src/index.js';

inquirer.registerPrompt('input-starting-value', InputStartingVal);

export const questions = [
  /* Pass your questions in here */ {
    type: 'input-starting-value',
    name: 'package_name',
    message: "What's your package name",
    initialValue: '@bonnie-eilish/',
  },
];

inquirer
  .prompt(questions)
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
