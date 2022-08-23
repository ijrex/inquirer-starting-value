import inquirer, { QuestionCollection } from 'inquirer';
import chalk from 'chalk';

import InputStartingVal from './src/index.js';

inquirer.registerPrompt('input-starting-value', InputStartingVal);

const DEFAULT_SCOPE_PREFIX = '@bonnie-eilish/';

const validScopeRegex = /^@.[a-z\-]*\//;
const validPackageRegex = /^@[a-z\-]*\/[a-z\-]+$/;

export const questions = [
  {
    type: 'input-starting-value',
    name: 'package_name',
    message: "What's your scoped package name",
    initialValue: DEFAULT_SCOPE_PREFIX,
    transformer(val) {
      const scope = val.match(validScopeRegex);
      return scope ? val.replace(scope, chalk.cyan(scope)) : chalk.red(val);
    },
    validate(val) {
      return (
        validPackageRegex.test(val) ||
        'Enter package name in the format @your-package/package-name'
      );
    },
  },
] as QuestionCollection;

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
