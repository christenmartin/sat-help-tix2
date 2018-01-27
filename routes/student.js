const router = require('express').Router()
const Student = require('../db/models').Student
const Test = require('../db/models').Test

router.get('/', function(req, res ,next) {
  Student.findAll()
  .then(students => res.status(200).json(students))
})

router.post('/', function(req, res, next) {
  Student.create(req.body)
  .then(student => res.status(201).json(student))
  .catch(next)
})

router.get('/:studentId', function (req, res, next) {
  Student.findById(req.params.studentId)
  .then(student => student.getTestScore())
  .then(test => res.status(201).json(test))
  .catch(next)
})

router.put('/:id', function (req, res, next) {
  Student.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(test => res.status(201).json(test))
  .catch(next)
})

router.delete('/:id', function (req, res, next) {
  Student.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => res.sendStatus(201))
  .catch(next)
})

module.exports = router;