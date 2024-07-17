const GET_ALL = `SELECT * FROM gastos`;
const GET_BY_ID = `${GET_ALL} WHERE id= $1`;
const GET_BY_GROUP = `${GET_ALL} WHERE grupo= $1`;
const GET_BY_GROUP_AND_USER = `SELECT 
g.id AS gasto_id,
g.descripciongastos AS gasto_descripcion,
g.valorgastos AS gasto_valor,
g.grupo AS gasto_grupo,
json_agg(
    json_build_object(
        'id', u.id,
        'name', u.name,
        'email', u.email,
        'password', u.password,
        'createdat' u.createdat,
    )
) AS users
FROM 
gastos g
LEFT JOIN 
gastosusuarios gu ON g.id = gu.gasto_id
LEFT JOIN 
users u ON u.id = gu.users_id
GROUP BY 
g.id, g.descripciongastos, g.valorgastos, g.grupo WHERE id=$1;;`;
const DELETE_BY_ID = `DELETE FROM gastos WHERE id=$1`;
const CREATE = `INSERT INTO gastos (descripciongastos, valorgastos, grupo) VALUES ($1,$2,$3) RETURNING descripciongastos, valorgastos, grupo`;

const Repository = (dbClient) => {
  const getAll = async () => {
    const result = await dbClient.query(GET_ALL);
    return result.rows;
  };

  const getById = async (id) => {
    const result = await dbClient.query(GET_BY_ID, [id]);
    return result.rows[0];
  };

  const getByGroupAndUser = async (id) => {
    const result = await dbClient.query(GET_BY_GROUP_AND_USER, [id]);
    return result.rows;
  };

  const getByGroup = async (group) => {
    const result = await dbClient.query(GET_BY_GROUP, [group]);
    console.log(result);
    return result.rows;
  };

  const deleteById = async (id) => {
    const result = await dbClient.query(DELETE_BY_ID, [id]);
    console.info(result);
    return result.rowCount > 0;
  };

  const create = async ({ descripciongastos, valorgastos, grupo }) => {
    const result = await dbClient.query(CREATE, [
      descripciongastos,
      valorgastos,
      grupo,
    ]);
    console.info(result);
    return result.rows[0];
  };

  return {
    getAll,
    getById,
    getByGroup,
    deleteById,
    create,
    getByGroupAndUser,
  };
};

export default Repository;
