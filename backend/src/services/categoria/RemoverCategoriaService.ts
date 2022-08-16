import prismaClient from "../../prisma";

interface OrderRequest {
  id: string;
}
class RemoverCategoriaService {
  async execute({ id }: OrderRequest) {
    const categoria = await prismaClient.categoria.delete({
      where: {
        id: id,
      },
    });
  }

  async findById({ id }) {
    const categoria = await prismaClient.categoria.findFirst({
      where: {
        id: id,
      },
    });

    return categoria;
  }

  async update({ id, nome }) {
    const categoria = await prismaClient.categoria.update({
      where: {
        id: id,
      },
      data: {
        nome: nome,
      },
    });
  }
}

export { RemoverCategoriaService };
