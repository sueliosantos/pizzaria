import prismaClient from "../../prisma";

interface OrderRequest {
  ordem_id: string;
}

class FinalizarOrderService {
  async execute({ ordem_id }: OrderRequest) {
    const order = await prismaClient.ordem.update({
      where: {
        id: ordem_id,
      },
      data: {
        status: true,
      },
    });

    return order;
  }
}

export { FinalizarOrderService };
