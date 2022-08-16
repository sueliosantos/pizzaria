import { Request, Response } from "express";
import { RemoverCategoriaService } from "../../services/categoria/RemoverCategoriaService";

class RemoverCategoriaController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const remover = new RemoverCategoriaService();

    const categoria = await remover.execute({ id });

    return res.json(categoria);
  }

  async updateCategoria(req: Request, res: Response) {
    const { id } = req.params;
    const { nome } = req.body;

    console.log(id);
    console.log(nome);

    const acao = new RemoverCategoriaService();
    const categoria = await acao.update({ id, nome });

    return res.json(categoria);
  }

  async findId(req: Request, res: Response) {
    const { id } = req.params;

    const listar = new RemoverCategoriaService();

    const categoria = await listar.findById({
      id,
    });

    return res.json(categoria);
  }
}

export { RemoverCategoriaController };
