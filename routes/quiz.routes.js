const router = require('express').Router();
const Coffee = require('../models/Coffee.model');

router.get('/quiz', (req, res) => {
  res.render('quiz/quiz-form');
});

/*router.post('/quiz', (req, res) => {
  switch (quizResult) {
    case x:
      // code block
      break;
    case y:
      // code block
      break;
    default:
    // code block
  }
});
*/

module.exports = router;
