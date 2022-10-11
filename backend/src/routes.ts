import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoriaController } from "./controllers/categoria/CreateCategoriaController";
import { ListCategoriaController } from "./controllers/categoria/ListCategoriaController";
import { RemoverCategoriaController } from "./controllers/categoria/RemoverCategoriaController";

import { CreateProdutoController } from "./controllers/produto/CreateProdutoController";
import { ListarProdutosController } from "./controllers/produto/ListarProdutosController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoverOrderController } from "./controllers/order/RemoverOrderController";
import { RemoverItemController } from "./controllers/order/RemoverItemController";
import { AddItemController } from "./controllers/order/AddItemController";
import { EnviarOrderController } from "./controllers/order/EnviarOrderController";
import { ListarOrdensController } from "./controllers/order/ListarOrdensController";
import { DetalheOrdensController } from "./controllers/order/DetalheOrdensController";
import { FinalizarOrderController } from "./controllers/order/FinalizarOrderController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from "./config/multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

router.post("/users", new CreateUserController().handle);

router.post("/session", new AuthUserController().handle);

router.get("/me", isAuthenticated, new DetailUserController().handle);

//--categoria

router.post(
  "/categoria",

  new CreateCategoriaController().handle
);

router.post(
  "/categoria",

  new CreateCategoriaController().handle
);

router.get("/categoria", isAuthenticated, new ListCategoriaController().handle);

router.delete("/categoria/:id", new RemoverCategoriaController().handle);

router.post(
  "/produto",
  isAuthenticated,
  upload.single("file"),
  new CreateProdutoController().handle
);

router.get(
  "/categoria/produto",
  isAuthenticated,
  new ListarProdutosController().handle
);
router.put(
  "/categoriaeditar/:id",
  new RemoverCategoriaController().updateCategoria
);
router.get("/categoria/:id", new RemoverCategoriaController().findId);

router.post("/order", isAuthenticated, new CreateOrderController().handle);
router.delete("/order", isAuthenticated, new RemoverOrderController().handle);
router.post("/order/add", isAuthenticated, new AddItemController().handle);
router.delete(
  "/order/remove",
  isAuthenticated,
  new RemoverItemController().handle
);

router.put("/order/send", isAuthenticated, new EnviarOrderController().handle);
router.get("/ordens", isAuthenticated, new ListarOrdensController().handle);
router.get(
  "/ordens/detalhe",
  isAuthenticated,
  new DetalheOrdensController().handle
);
router.put(
  "/order/finalizar",
  isAuthenticated,
  new FinalizarOrderController().handle
);

export { router };
