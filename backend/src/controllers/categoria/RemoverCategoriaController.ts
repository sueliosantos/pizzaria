import { Request, Response } from "express";
import { RemoverCategoriaService } from "../../services/categoria/RemoverCategoriaService";

class RemoverCategoriaController {
  async handle(req: Request, res: Response) {
    const id = req.query.id as string;

    const remover = new RemoverCategoriaService();

    const categoria = await remover.execute({ id });

    return res.json(categoria);
  }
}

export { RemoverCategoriaController };
