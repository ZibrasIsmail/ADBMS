// const Institute = require('../models/institute')

// exports.newInstitute = async (req, res) => {
//     const institute = new Institute({
//         InstituteName: req.body.InstituteName,
//         creatorId: req.body.creatorId,
//         InstituteType: req.body.InstituteType,
//         District: req.body.District,
//         Address: req.body.Address,
//         Email: req.body.Email,
//         ContactNumber: req.body.ContactNumber,
//         image: req.file.path,
        
//     });
  
//     try {
//       await institute.save();
//     } catch (error) {
//       return res.status(201).json({
//         message: `Institute Add failed, check to see the ${error}`,
//         status: "error",
//       });
//     }
//   };


// exports.getInstitute = async (req, res, next) => {

//     const institute = await Institute.find();

//     res.status(200).json(institute)
// }

// exports.getSingleInstitute = async (req, res, next) => {

//     const institute = await Institute.findById(req.params.id);

//     if(!institute) {
//         return res.status(404).json({
//             success: false,
//             message: 'Institute not found'
//         })
//     }

//     res.status(200).json({
//         success: true,
//         institute
//     })
// }

// exports.updateInstitute = async (req, res) => {

//     let institute = await Institute.findById(req.params.id);
  
//     if(!institute) {
//         return res.status(404).json({
//             success: false, 
//             message: 'Course not found'
//         })
//     }
  
//     institute = await Institute.findByIdAndUpdate(req.params.id, ({
//         InstituteName: req.body.InstituteName,
//         InstituteType: req.body.InstituteType,
//         District: req.body.District,
//         Address: req.body.Address,
//         Email: req.body.Email,
//         ContactNumber: req.body.ContactNumber,
//         image: req.file.path,
        
//       }), {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false
//     });
  
//     res.status(200).json({
//         success: true,
//         institute
//     })
  
//   }

// exports.deleteInstitute = async (req, res, next) => {

//     const institute = await Institute.findByIdAndDelete(req.params.id);

//     if(!institute) {
//         return res.status(404).json({
//             success: false,
//             message: 'Institute not found'
//         })
//     }

//     await institute.remove();

//     res.status(200).json({
//         success: true,
//         message: 'Institute is deleted'
//     })

// }