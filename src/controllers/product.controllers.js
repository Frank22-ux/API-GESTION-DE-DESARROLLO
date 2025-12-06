const Service = require('../services/product.services');

exports.getProducts = async (req, res) => {
    try {
        const data = await Service.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener productos', error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const prod = await Service.getById(req.params.id);
        if (prod) {
            res.json(prod);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error al buscar el producto', error: err.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const newProduct = await Service.create(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Service.update(req.params.id, req.body);
        
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado para actualizar' });
        }

        res.status(200).json(updatedProduct); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Service.delete(req.params.id);
        
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado para eliminar' });
        }

        res.status(200).json(deletedProduct); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};