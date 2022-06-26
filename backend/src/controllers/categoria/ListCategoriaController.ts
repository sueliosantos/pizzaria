import { Request, Response } from "express";
import { ListCategoriaService } from "../../services/categoria/ListCategoriaService";

class ListCategoriaController {
  async handle(req: Request, res: Response) {
    const lista = new ListCategoriaService();

    const categorias = await lista.execute();

    return res.json(categorias);
  }
}

export { ListCategoriaController };
