import model, { CustomerInput, CustomerOutput } from '../models/CustomerModel';
import AppError from '../../utils/AppError'
import Order from '../models/OrderModel';
import Employee from '../models/EmployeeModel';
import Payment from '../models/PaymentModel';
import Office from '../models/OfficeModel';
import OrderDetail from '../models/OrderDetailModel';
import Product from '../models/ProductModel';
import ProductLine from '../models/ProductLineModel';

export const getAll = async (): Promise<CustomerOutput[]> => {
    const aux = await model.findAll({ include: { all: true }});
    return await aux;
};

export const getById = async (id: number): Promise<CustomerOutput> => {
    const customer = await model.findOne({
        where: {
            customerNumber: id,
        },
         include: { all: true, nested: true }
    });

    if (!customer) {
        throw new AppError('NotFoundError', 'Registro não encontrado', 404);
    };

    return customer;
};

export const create = async (payload: CustomerInput): Promise<CustomerOutput> => {
    return await model.create(payload);
};

export const updateById = async (id: number, payload: CustomerInput): Promise<CustomerOutput> => {
    const customer = await model.findByPk(id);

    if (!customer) {
        throw new AppError('NotFoundError', 'Registro não encontrado', 404);
    };

    return await customer.update(payload);
};

export const deleteById = async (id: number): Promise<void> => {
    const customer = await model.findByPk(id);

    if (!customer) {
        throw new AppError('NotFoundError', 'Registro não encontrado', 404);
    };

    await customer.destroy();
};