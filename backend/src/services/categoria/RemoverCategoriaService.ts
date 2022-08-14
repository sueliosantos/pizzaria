import prismaClient from "../../prisma";

interface OrderRequest {
  id: string;
}
class RemoverCategoriaService {
  async execute({ id }: OrderRequest) {
    console.log(id);
    const categoria = await prismaClient.categoria.delete({
      where: {
        id: id,
      },
    });

    if (categoria === null) {
      throw new Error("Erro ao deletar a categoria");
    }

    return categoria;
  }
}

export { RemoverCategoriaService };
