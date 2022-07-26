import inquirer from 'inquirer'

inquirer
  .prompt([
    /* Pass your questions in here */ {
      type: 'input-starting-value',
      name: 'package_name',
      message: "What's your package name",
    },
  ])
  .then((answers) => {
    console.log(answers)
  })
  .catch((err) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("Prompt couldn't be rendered in the current environment")
    } else {
      console.log(err)
    }
  })
