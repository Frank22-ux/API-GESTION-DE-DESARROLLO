const repo = require('../repositories/product.repository');

exports.getAll = () => repo.getAll();
exports.getById = (id) => repo.getById(id);

exports.create = (producto) => {
    if (!producto.nombre) throw new Error('El nombre del producto es requerido');
    if (!producto.precio || producto.precio <= 0) throw new Error('El precio del producto es requerido y debe ser mayor a 0');
    if (!producto.descripcion) throw new Error('La descripción del producto es requerida');
    if (producto.stock === undefined || producto.stock < 0) throw new Error('El stock del producto es requerido');

    return repo.create(producto);
};

exports.update = (id, producto) => {
    if (!producto.nombre) throw new Error('El nombre del producto es requerido');
    if (producto.stock < 0) throw new Error('El stock no puede ser negativo');
    
    return repo.update(id, producto);
};

exports.delete = (id) => repo.delete(id);

exports.updateStock = (id, stock) => {
    if (stock < 0) throw new Error('El stock no puede ser negativo');
    if (stock === undefined) throw new Error('El stock es requerido');
    if (!repo.getById(id)) throw new Error('El producto no existe');
    return repo.updateStock(id, stock);
};