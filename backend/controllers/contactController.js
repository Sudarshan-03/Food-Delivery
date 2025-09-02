import Contact from '../models/contactModel.js';


export const saveContactForm = async (req, res) => {
    console.log("Form data received:", req.body);
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: 'Message saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save message' });
  }
};

export const listContactSubmissions = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.json({ success: true, data: contacts });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};