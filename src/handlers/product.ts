import { Request, Response } from 'express'
import Product from '../models/Product.model'

export const getProducts = async (req: Request, res: Response) => {
const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 5
        const offset = (page - 1) * limit

        const { count, rows } = await Product.findAndCountAll({
            order: [['id', 'DESC']],
            limit,
            offset
        })

        res.json({
            data: rows,
            pagination: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit)
            }
        })
}

export const getProductById = async (req: Request, res: Response) => {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            return res.status(404).json({
                error: 'Producto No Encontrado'
            })
        }
        res.json({data: product})
}

export const createProduct = async (req : Request, res : Response) => {
        const product = await Product.create(req.body)
        res.status(201).json({data: product})
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }
    
    // Actualizar
    await product.update(req.body)
    await product.save()
    res.json({data: product})
}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }
    
    // Actualizar
    product.availability = !product.dataValues.availability
    await product.save()
    res.json({data: product})
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }
    
    await product.destroy()
    res.json({data: 'Producto Eliminado'})
}