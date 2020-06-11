const contact = require('../models/contact')

exports.addContact = (req,res)=> {
    contact.create(req.body,(err, con)=>{
                if (err)res.json({ message: 'err' });
                res.json({ message: 'Success' });
    });
}
exports.getContacts = (req,res)=> {
    contact.find({},(err,contacts)=>{
        if(err)return res.status(400).json({ 'msg': 'Somthing went wrong' });
        return res.status(201).json(contacts);
    });
}

exports.deleteContact = (req,res)=>{
    contact.findByIdAndRemove(req.params.id,(err,contact)=>{
        if (err)res.json({ message: 'err' });
        res.json({ message: 'Success' });
    })
}

exports.editContact = (req,res)=>{
    contact.findByIdAndUpdate(req.body._id,req.body,(err,con)=>{
        if (err)res.json({ message: 'err' });
        res.json({ message: 'Success' });
    })
}