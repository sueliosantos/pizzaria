import { Request, Response } from "express";
import { AddItemService } from "../../services/order/AddItemService";

class AddItemController {
  async handle(req: Request, res: Response) {
    const { ordem_id, produto_id, qtd } = req.body;

    const addItem = new AddItemService();

    const order = await addItem.execute({
      ordem_id,
      produto_id,
      qtd,
    });

    return res.json(order);
  }
}

export { AddItemController };
