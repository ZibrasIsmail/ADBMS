const Event = require('../models/event')

exports.newEvent = async (req, res) => {
    const event = new Event({
        title: req.body.title,
        creatorId: req.body.creatorId,
        location: req.body.location,
        time: req.body.time,
        date: req.body.date,
        registrationurl: req.body.registrationurl,
        description: req.body.description,
        fee: req.body.fee,
        image: req.file.path,
    });
  
    try {
      await event.save();
    } catch (error) {
      return res.status(201).json({
        message: `Event Add failed, check to see the ${error}`,
        status: "error",
      });
    }
  };

exports.getEvent = async (req, res, next) => {

    const event = await Event.find();

    res.status(200).json(event)
}

exports.getSingleEvent = async (req, res, next) => {

    const event = await Event.findById(req.params.id);

    if(!event) {
        return res.status(404).json({
            success: false,
            message: 'Event not found'
        })
    }

    res.status(200).json({
        success: true,
        event
    })
}

exports.updateEvent = async (req, res) => {

    let event = await Event.findById(req.params.id);
  
    if(!event) {
        return res.status(404).json({
            success: false, 
            message: 'Event not found'
        })
    }
  
    event = await Event.findByIdAndUpdate(req.params.id, ({
        title: req.body.title,
        location: req.body.location,
        time: req.body.time,
        date: req.body.date,
        registrationurl: req.body.registrationurl,
        description: req.body.description,
        fee: req.body.fee,
        image: req.file.path
        
      }), {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
  
    res.status(200).json({
        success: true,
        event
    })
  
  }

exports.deleteEvent = async (req, res, next) => {

    const event = await Event.findByIdAndDelete(req.params.id);

    if(!event) {
        return res.status(404).json({
            success: false,
            message: 'Event not found'
        })
    }

    await event.remove();

    res.status(200).json({
        success: true,
        message: 'Event is deleted'
    })

}
