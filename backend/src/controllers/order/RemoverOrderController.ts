import { Request, Response } from "express";
import { RemoverOrderService } from "../../services/order/RemoverOrderService";

class RemoverOrderController {
  async handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string;

    const removerOrder = new RemoverOrderService();

    const order = await removerOrder.execute({ order_id });

    return res.json(order);
  }
}

export { RemoverOrderController };
