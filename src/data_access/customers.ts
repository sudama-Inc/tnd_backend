import Customer from "../models/customers";

export default class CustomerDataAccess {
  public static async create(customer, transaction) {
    return Customer.create(customer, { transaction });
  }

  public static async findByPk(id: number) {
    return Customer.findByPk(id);
  }

  public static findOne(query) {
    return Customer.findOne(query);
  }

  public static update(data, conditions, transaction) {
    return Customer.update(data, {
      where: conditions,
      transaction,
    });
  }

  public static findOneWhere(conditions, include = []) {
    return Customer.findOne({
      where: conditions,
      include,
    });
  }

  public static findAllWhere(conditions, include = []) {
    return Customer.findAll({
      where: conditions,
      include,
    });
  }

  public static async findPaginated(
    conditions = null,
    include = [],
    limit = 10,
    offset = 0,
    orderCol = "updated_at",
    orderDir = "DESC"
  ) {
    return Customer.findAndCountAll({
      where: conditions,
      include,
      order: [[orderCol, orderDir]],
      limit,
      offset,
    });
  }
}
