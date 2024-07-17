import Repository from "../repositories/expense.repository.js";

const Service = (dbClient) => {
  const repository = Repository(dbClient);

  const getAll = async () => {
    return await repository.getAll();
  };

  const getById = async (id) => {
    return await repository.getById(id);
  };

  const getByGroup = async (group) => {
    return await repository.getByGroup(group);
  };

  const getByGroupAndUser = async (id) => {
    return await repository.getByGroup(id);
  };

  const deleteById = async (id) => {
    return await repository.deleteById(id);
  };

  const create = async (gasto) => {
    return await repository.create(gasto);
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

export default Service;
