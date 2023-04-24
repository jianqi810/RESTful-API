const router = require('express').Router();
const Student = require('../models').studentsModel;

router.get('/', async (req, res) => {
  try {
    let studentData = await Student.find({}).exec();
    return res.send({ data: studentData });
  } catch (err) {
    res.status(400).send({ msg: '資料獲取失敗', data: err });
  }
});

router.get('/:_id', async (req, res) => {
  let { _id } = req.params;
  try {
    let studentData = await Student.findOne({ _id }).exec();
    return res.send({ data: studentData });
  } catch (err) {
    res.status(400).send({ msg: '資料獲取失敗', data: err });
  }
});

router.post('/', async (req, res) => {
  let { name, age, merit, other } = req.body;
  try {
    let newStudent = new Student({
      name,
      age,
      scholarship: { merit, other },
    });
    let saveStudent = await newStudent.save();
    return res.send({ msg: '資料儲存成功', data: saveStudent });
  } catch (err) {
    res.status(400).send({ msg: '資料儲存失敗', data: err });
  }
});

router.put('/:_id', async (req, res) => {
  let { _id } = req.params;
  let { name, age, merit, other } = req.body;
  try {
    let updataData = await Student.findOneAndUpdate(
      { _id },
      { name, age, scholarship: { merit, other } },
      { new: true, runValidators: true, overwrite: true }
    );
    return res.send({ msg: '資料更新成功', updataData: updataData });
  } catch (err) {
    return res.status(400).send({ msg: '資料更新失敗', data: err });
  }
});

class NewData {
  constructor() {}
  setProperty(key, value) {
    if (key !== 'merit' && key !== 'other') {
      this[key] = value;
    } else {
      this[`scholarship.${key}`] = value;
    }
  }
}

router.patch('/:_id', async (req, res) => {
  let { _id } = req.params;
  try {
    let newObj = new NewData();
    for (let property in req.body) {
      newObj.setProperty(property, req.body[property]);
    }
    let updataData = await Student.findByIdAndUpdate({ _id }, newObj, {
      new: true,
      runValidators: true,
    });
    return res.send({ msg: '資料更新成功', updataData: updataData });
  } catch (err) {
    return res.status(400).send({ msg: '資料更新失敗', data: err });
  }
});

router.delete('/:_id', async (req, res) => {
  let { _id } = req.params;
  try {
    let deleteData = await Student.deleteOne({ _id });
    return res.send({ msg: '資料刪除成功', deleteData: deleteData });
  } catch (err) {
    return res.status(400).send({ msg: '資料刪除失敗', data: err });
  }
});

module.exports = router;
