import prismaClient from "../../prisma";

interface ItemRequest {
  ordem_id: string;
  produto_id: string;
  qtd: number;
}
class AddItemService {
  async execute({ ordem_id, produto_id, qtd }: ItemRequest) {
    const ordem = await prismaClient.item.create({
      data: {
        ordem_id: ordem_id,
        produto_id: produto_id,
        qtd: qtd,
      },
    });

    return ordem;
  }
}

export { AddItemService };
