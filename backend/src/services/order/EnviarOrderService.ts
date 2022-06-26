import prismaClient from "../../prisma";

interface OrderRequest {
  ordem_id: string;
}

class EnviarOrderService {
  async execute({ ordem_id }: OrderRequest) {
    const order = await prismaClient.ordem.update({
      where: {
        id: ordem_id,
      },
      data: {
        rascunho: false,
      },
    });

    return order;
  }
}

export { EnviarOrderService };
