import Service from "../services/groups.service.js";
const Controller = () => {
  const getAll = async (req, res) => {
    const { id } = req.user;
    const service = Service(req.dbClient);

    const groups = await service.getGroupsByUserId(id);

    res.status(200).json(groups);
  };
  const getById = async (req, res) => {
    const service = Service(req.dbClient);
    const group = await service.getById(req.params.id);
    if (group) {
      res.status(200).json(group);
    } else {
      res.status(404).end();
    }
  };

  const getGroupsByUserId = async (req, res) => {
    const service = Service(req.dbClient);
    const groupUserId = await service.getGroupsByUserId(req.params.id);
    if (groupUserId) {
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  };

  const deleteById = async (req, res) => {
    const service = Service(req.dbClient);
    const deleted = await service.deleteById(req.params.id);
    if (deleted) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  };

  const create = async (req, res) => {
    const service = Service(req.dbClient);
    const group = req.body;
    console.log(group);
    const createdGroup = await service.create(group);
    res.status(201).json(createdGroup);
  };

  const fullUpdateById = async (req, res) => {
    const service = Service(req.dbClient);
    const id = req.params.id;
    const group = {
      ...req.body,
      id,
    };
    const updateGroup = await service.fullUpdateById(group);
    if (updateGroup) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  };

  return {
    getAll,
    getById,
    deleteById,
    create,
    fullUpdateById,
    getGroupsByUserId,
  };
};

export default Controller;
