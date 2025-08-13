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