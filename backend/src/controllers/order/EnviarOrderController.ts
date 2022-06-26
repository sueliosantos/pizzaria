import { Request, Response } from "express";
import { EnviarOrderService } from "../../services/order/EnviarOrderService";

class EnviarOrderController {
  async handle(req: Request, res: Response) {
    const { ordem_id } = req.body;

    const evniarOrder = new EnviarOrderService();

    const order = await evniarOrder.execute({
      ordem_id,
    });

    return res.json(order);
  }
}

export { EnviarOrderController };
