// const Exam = require('../models/exam')

// exports.newExam = async(req, res) => {

//     const exam = await Exam.create(req.body)
        
//         res.status(201).json({
//             success: true,
//             exam
//         })
// }

// exports.getExam = async (req, res) => {

//     const exam = await Exam.find();

//     res.status(200).json(exam)
// }

// exports.getSingleExam = async (req, res) => {

//     const exam = await Exam.findById(req.params.id);

//     if(!exam) {
//         return res.status(404).json({
//             success: false,
//             message: 'Exam not found'
//         })
//     }

//     res.status(200).json({
//         success: true,
//         exam
//     })
// }

// exports.updateExam = async (req, res) => {

//     let exam = await Exam.findById(req.params.id);

//     if(!exam) {
//         return res.status(404).json({
//             success: false,
//             message: 'Exam not found'
//         })
//     }

//     exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false
//     });

//     res.status(200).json({
//         success: true,
//         exam
//     })

// }

// exports.deleteExam = async (req, res) => {

//     const exam = await Exam.findByIdAndDelete(req.params.id);

//     if(!exam) {
//         return res.status(404).json({
//             success: false,
//             message: 'Exam not found'
//         })
//     }

//     await exam.remove();

//     res.status(200).json({
//         success: true,
//         message: 'Exam is deleted'
//     })

// }