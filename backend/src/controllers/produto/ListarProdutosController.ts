import { Request, Response } from "express";
import { ListarPorCategoriaService } from "../../services/produto/ListarPorCategoriaService";

class ListarProdutosController {
  async handle(req: Request, res: Response) {
    const categoria_id = req.query.categoria_id as string;

    const lista = new ListarPorCategoriaService();

    const produtos = await lista.execute({ categoria_id });

    return res.json(produtos);
  }
}

export { ListarProdutosController };
