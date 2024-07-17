import Service from "../services/expense.service.js";

const Controller = () => {
  const getAll = async (req, res) => {
    const service = Service(req.dbClient);

    const gastosUser = await service.getAll();
    console.info(gastosUser);
    res.status(200).json(gastosUser);
  };

  const getById = async (req, res) => {
    const service = Service(req.dbClient);
    const gastoId = await service.getById(req.params.id);
    if (gastoId) {
      res.status(200).json(gastoId);
    } else {
      res.status(404).end();
    }
  };

  const getByGroup = async (req, res) => {
    const service = Service(req.dbClient);
    const groupGasto = await service.getByGroup(req.params.id);
    if (groupGasto) {
      res.status(200).json(groupGasto);
    } else {
      res.status(404).end();
    }
  };
  const getByGroupAndUser = async (req, res) => {
    const service = Service(req.dbClient);
    const GroupAndUser = await service.getByGroupAndUser(req.params.id);
    if (GroupAndUser) {
      res.status(200).json(GroupAndUser);
    } else {
      res.status(404).end();
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
    const gasto = req.body;
    const crearGasto = await service.create(gasto);

    return res.status(201).json(crearGasto);
  };

  return {
    getAll,
    getById,
    deleteById,
    create,
    getByGroup,
    getByGroupAndUser,
  };
};

export default Controller;
