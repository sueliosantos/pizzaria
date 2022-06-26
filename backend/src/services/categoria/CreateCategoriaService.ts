import prismaClient from "../../prisma";

interface CategoriaRequest {
  nome: string;
}
class CreateCategoriaService {
  async execute({ nome }: CategoriaRequest) {
    if (nome === "") {
      throw new Error("Nome invalido");
    }

    const categoria = await prismaClient.categoria.create({
      data: {
        nome: nome,
      },
      select: {
        id: true,
        nome: true,
      },
    });

    return categoria;
  }
}

export { CreateCategoriaService };
