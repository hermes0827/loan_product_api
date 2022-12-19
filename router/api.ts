import express from 'express'
import allProducts from '../services/allProducts'

const router = express.Router()

router.post('/bplus_loans', async (req, res) => {

  const result = await allProducts(req).catch((e) => console.log(e))

  res.json(result)
})

export default router