const path = require('path');
const router = require('express').Router();

// GET Routes for html
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'../../public/index.html'));
});

router.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname,'../../public/zookeepers.html'));
})

router.get('*', (req, res) => { // any route that hasnt been defined will go to homepage
  res.sendFile(path.join(__dirname,'../../public/index.html'));
});

module.exports = router;