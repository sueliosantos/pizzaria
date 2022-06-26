import { Request, Response } from "express";
import { CreateProdutoService } from "../../services/produto/CreateProdutoService";

class CreateProdutoController {
  async handle(req: Request, res: Response) {
    const { nome, descricao, preco, categoria_id } = req.body;

    const createProdutoService = new CreateProdutoService();

    if (!req.file) {
      throw new Error("Erro de upload de imagem");
    } else {
      const { filename: banner } = req.file;

      const produto = await createProdutoService.execute({
        nome,
        preco,
        descricao,
        banner,
        categoria_id,
      });
      return res.json(produto);
    }
  }
}

export { CreateProdutoController };
