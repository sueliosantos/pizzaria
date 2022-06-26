import prismaClient from "../../prisma";

interface ProdutoRequest {
  categoria_id: string;
}

class ListarPorCategoriaService {
  async execute({ categoria_id }: ProdutoRequest) {
    const findCategoria = await prismaClient.produto.findMany({
      where: {
        categoria_id: categoria_id,
      },
    });

    return findCategoria;
  }
}

export { ListarPorCategoriaService };
