import prismaClient from "../../prisma";

interface DetalheRequest {
  ordem_id: string;
}

class DetalheOrderService {
  async execute({ ordem_id }: DetalheRequest) {
    const orders = await prismaClient.item.findMany({
      where: {
        ordem_id: ordem_id,
      },
      include: {
        produto: true,
        ordem: true,
      },
    });

    return orders;
  }
}

export { DetalheOrderService };
