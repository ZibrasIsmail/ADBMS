const Student = require('../models/student')

exports.newStudent = async(req, res, next) => {

    const student = await Student.create(req.body)
        
        res.status(201).json({
            success: true,
            student
        })
}

exports.getStudent = async (req, res, next) => {

    const student = await Student.find();

    res.status(200).json(student)
}

exports.getSingleStudent = async (req, res, next) => {

    consstudent = await Student.findById(req.params.id);

    if(!student) {
        return res.status(404).json({
            success: false,
            message: 'Student not found'
        })
    }

    res.status(200).json({
        success: true,
        student
    })
}

exports.updateStudent = async (req, res, next) => {

    let student = await Student.findById(req.params.id);

    if(!student) {
        return res.status(404).json({
            success: false,
            message: 'Student not found'
        })
    }

    student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        student
    })

}

exports.deleteStudent = async (req, res, next) => {

    const student = await Student.findByIdAndDelete(req.params.id);

    if(!student) {
        return res.status(404).json({
            success: false,
            message: 'Student not found'
        })
    }

    await student.remove();

    res.status(200).json({
        success: true,
        message: 'Student is deleted'
    })

}