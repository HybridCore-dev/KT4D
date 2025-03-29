// let _questions: Array<IQuestion> = [];
// let qId = 1;
// for (let i = 0; i < RawData.length; i += 5) {
//   const qText = RawData[i];
//   let answers: Array<IAnswer> = [];
//   for (let j = 1; j <= 4; j++) {
//     const answer: IAnswer = {
//       letter: String.fromCharCode(96 + j).toUpperCase() as TAnswerLetter,
//       text: RawData[i + j],
//     };
//     answers.push(answer);
//   }
//   _questions.push({
//     id: qId++,
//     text: qText,
//     answers,
//   });
// }
// console.log(_questions);
