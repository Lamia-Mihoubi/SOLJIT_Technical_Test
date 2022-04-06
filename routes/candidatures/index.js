const router = require('express').Router();
const {
  getCandidature,
  createCandidature,
  getAllCandidatures,
} = require('./controllers');

router.get('/requested-candidate', getCandidature);
router.post('/candidatures', createCandidature);
router.get('/candidatures', getAllCandidatures);

exports.router = router;
