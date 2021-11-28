const Advertisement = require('../models/advertisement')

exports.newAdvertisement = async (req, res) => {
    const advertisement = new Advertisement({
        ad_name: req.body.ad_name,
        creatorId: req.body.creatorId,
        image: req.file.path,
    });
  
    try {
      await advertisement.save();
    } catch (error) {
      return res.status(201).json({
        message: `Advertisment Add failed, check to see the ${error}`,
        status: "error",
      });
    }
  };

exports.getAdvertisement = async (req, res) => {

    const advertisement = await Advertisement.find();

    res.status(200).json(advertisement)
}

exports.getSingleAdvertisement = async (req, res) => {

    const advertisement = await Advertisement.findById(req.params.id);

    if(!advertisement) {
        return res.status(404).json({
            success: false,
            message: 'Advertisement not found'
        })
    }

    res.status(200).json({
        success: true,
        advertisement
    })
}

exports.updateAdvertisement = async (req, res) => {

    let advertisement = await Advertisement.findById(req.params.id);
  
    if(!advertisement) {
        return res.status(404).json({
            success: false, 
            message: 'Advertisment not found'
        })
    }
  
    advertisement = await Advertisement.findByIdAndUpdate(req.params.id, ({
        ad_name: req.body.ad_name,
        image: req.file.path
        
      }), {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
  
    res.status(200).json({
        success: true,
        advertisement
    })
  
  }


exports.deleteAdvertisement = async (req, res) => {

    const advertisement = await Advertisement.findByIdAndDelete(req.params.id);

    if(!advertisement) {
        return res.status(404).json({
            success: false,
            message: 'Advertisement not found'
        })
    }

    await advertisement.remove();

    res.status(200).json({
        success: true,
        message: 'Advertisement is deleted'
    })

}
