const router = require('express').Router();
const {
  getCandidature,
  createCandidature,
  getAllCandidatures,
  editCandidature,
  searchCandidatures,
} = require('./controllers');

router.get('/requested-candidate', getCandidature);
router.post('/candidatures', createCandidature);
router.get('/candidatures', getAllCandidatures);
router.patch('/candidatures', editCandidature);
router.get('/candidatures', searchCandidatures);

exports.router = router;
