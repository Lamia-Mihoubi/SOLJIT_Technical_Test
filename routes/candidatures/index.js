const router = require('express').Router();
const {
  getCandidature,
  createCandidature,
  getAllCandidatures,
  editCandidature,
} = require('./controllers');

router.get('/requested-candidate', getCandidature);
router.post('/candidatures', createCandidature);
router.get('/candidatures', getAllCandidatures);
router.patch('/candidatures', editCandidature);

exports.router = router;
