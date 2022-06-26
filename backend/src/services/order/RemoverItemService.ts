import prismaClient from "../../prisma";

interface OrderRequest {
  item_id: string;
}
class RemoverItemService {
  async execute({ item_id }: OrderRequest) {
    const item = await prismaClient.item.delete({
      where: {
        id: item_id,
      },
    });

    return item;
  }
}

export { RemoverItemService };
