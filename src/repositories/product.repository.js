const db = require('../database/index.db');

exports.getAll = async () => {
    const query = "SELECT * FROM productos ORDER BY id_producto";
    const result = await db.query(query);
    return result.rows;
};

exports.getById = async (id) => {
    const query = "SELECT * FROM productos WHERE id_producto = $1";
    const values = [id];
    const result = await db.query(query, values);
    return result.rows.length > 0 ? result.rows[0] : null;
};

exports.create = async (producto) => {
    const query = `
        INSERT INTO productos (nombre_producto, precio_producto, descripcion, stock) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
    `;
    
    const values = [
        producto.nombre, 
        producto.precio, 
        producto.descripcion, 
        producto.stock
    ];
    const result = await db.query(query, values);
    return result.rows[0];
};

exports.update = async (id, producto) => {
    const query = `
        UPDATE productos 
        SET nombre_producto = $1, 
            precio_producto = $2, 
            descripcion = $3, 
            stock = $4 
        WHERE id_producto = $5 
        RETURNING *
    `;
    const values = [
        producto.nombre, 
        producto.precio, 
        producto.descripcion, 
        producto.stock, 
        id
    ];
    const result = await db.query(query, values);
    return result.rows.length > 0 ? result.rows[0] : null;
};

exports.delete = async (id) => {
    const query = "DELETE FROM productos WHERE id_producto = $1 RETURNING *";
    const values = [id];
    const result = await db.query(query, values);
    return result.rows.length > 0 ? result.rows[0] : null;
};

exports.deleteAll = async () => {
    const query = "DELETE FROM productos RETURNING *";
    const result = await db.query(query);
    return result.rows;
};

exports.updateStock = async (id, stock) => {
    const query = "UPDATE productos SET stock = $1 WHERE id_producto = $2 RETURNING *";
    const values = [stock, id];
    const result = await db.query(query, values);
    return result.rows.length > 0 ? result.rows[0] : null;
};