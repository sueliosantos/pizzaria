import { Request, Response } from "express";
import { DetalheOrderService } from "../../services/order/DetalheOrderService";

class DetalheOrdensController {
  async handle(req: Request, res: Response) {
    const ordem_id = req.query.ordem_id as string;
    const detalhe = new DetalheOrderService();

    const ordens = await detalhe.execute({
      ordem_id,
    });

    return res.json(ordens);
  }
}

export { DetalheOrdensController };
