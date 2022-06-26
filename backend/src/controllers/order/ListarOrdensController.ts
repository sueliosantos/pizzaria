import { Request, Response } from "express";
import { ListarOrderService } from "../../services/order/ListarOrderService";

class ListarOrdensController {
  async handle(req: Request, res: Response) {
    const lista = new ListarOrderService();

    const ordens = await lista.execute();

    return res.json(ordens);
  }
}

export { ListarOrdensController };
