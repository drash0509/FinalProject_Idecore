router.post("/order", auth, async (req, res) => {
  try {
    const user = req.user._id;
    const data = req.body;
    data.user = user;

    const createData = await orderModel.create(data);
    const createUser = await createData.save();
    if (createUser) {
      res.status(201).send(createUser);
    } else {
      res.status(400).send();
    }
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get("/order", auth, async (req, res) => {
  try {
    const getData = await orderModel.find();
    if (getData) {
      res.status(201).send(getData);
    } else {
      res.status(400).send();
    }
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get("/order/:id", auth, async (req, res) => {
  try {
    const getData = await orderModel.findById(req.params.id);
    if (getData) {
      res.status(201).send(getData);
    } else {
      res.status(400).send();
    }
  } catch (e) {
    res.status(404).send(e);
  }
});

router.patch("/order/:id", auth, async (req, res) => {
  try {
    const updateData = await orderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updateData) {
      res.status(201).send(updateData);
    } else {
      res.status(400).send();
    }
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete("/order/:id", auth, async (req, res) => {
  try {
    const deleteData = await orderModel.findByIdAndDelete(req.params.id);
    if (deleteData) {
      res.status(201).send(deleteData);
    } else {
      res.status(400).send();
    }
  } catch (e) {
    res.status(404).send(e);
  }
});
