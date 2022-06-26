import prismaClient from "../../prisma";

class ListarOrderService {
  async execute() {
    const orders = await prismaClient.ordem.findMany({
      where: {
        rascunho: false,
        status: false,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return orders;
  }
}

export { ListarOrderService };
