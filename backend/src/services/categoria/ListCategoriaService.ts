import prismaClient from "../../prisma";

class ListCategoriaService {
  async execute() {
    const categoria = await prismaClient.categoria.findMany({
      select: {
        id: true,
        nome: true,
      },
    });

    return categoria;
  }
}

export { ListCategoriaService };
