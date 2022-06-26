import { Request, Response } from "express";
import { CreateUseService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

    const createUseService = new CreateUseService();

    const user = await createUseService.execute({ nome, email, senha });

    return res.json(user);
  }
}

export { CreateUserController };
