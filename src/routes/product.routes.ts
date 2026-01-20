import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
} from "../controllers/product.controller";

const router = Router();
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.delete("/:id", deleteProductById);

export default router;
