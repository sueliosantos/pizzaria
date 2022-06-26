import { Request, Response } from "express";
import { RemoverItemService } from "../../services/order/RemoverItemService";

class RemoverItemController {
  async handle(req: Request, res: Response) {
    const item_id = req.query.item_id as string;

    const remover = new RemoverItemService();

    const order = await remover.execute({ item_id });

    return res.json(order);
  }
}

export { RemoverItemController };
