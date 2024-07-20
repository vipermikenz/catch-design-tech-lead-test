exports.createLead = async (req, res) => {
  try {
    console.log("**************************");
    console.log("Posted data:", req.body);
    console.log("**************************");

    res.status(201).json({ message: "Data received successfully", data: req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};