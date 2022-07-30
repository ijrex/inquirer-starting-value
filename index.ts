/**
 * `input starting value` type prompt
 */

import { InputQuestionOptions, Answers } from 'inquirer';
import Input from 'inquirer/lib/prompts/input.js';
import { Interface } from 'readline';

interface InputQuestionOptionsStartingVal<T extends Answers = Answers>
  extends InputQuestionOptions<T> {
  initialValue?: string;
}

export default class InputStartingVal extends Input {
  startingVal: string;
  state: any;

  constructor(
    question: InputQuestionOptionsStartingVal<Answers>,
    rl: Interface,
    answers: Answers
  ) {
    super(question, rl, answers);
    this.startingVal = question.initialValue || '';

    this.initStartingVal();
  }

  initStartingVal() {
    (this.rl.line as string) = this.startingVal;
    (this.rl.cursor as number) = this.startingVal.length;
  }
}
