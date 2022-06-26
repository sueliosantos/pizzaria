import { Request, Response } from "express";
import { FinalizarOrderService } from "../../services/order/FinalizarOrderService";

class FinalizarOrderController {
  async handle(req: Request, res: Response) {
    const { ordem_id } = req.body;

    const finalizarOrder = new FinalizarOrderService();

    const order = await finalizarOrder.execute({
      ordem_id,
    });

    return res.json(order);
  }
}

export { FinalizarOrderController };
