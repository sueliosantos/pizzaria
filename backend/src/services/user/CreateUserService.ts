import prismaCLient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
  nome: string;
  email: string;
  senha: string;
}

class CreateUseService {
  async execute({ nome, email, senha }: UserRequest) {
    if (!email) {
      throw new Error("Email incorreto");
    }

    const emailJaExiste = await prismaCLient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (emailJaExiste) {
      throw new Error("Usuário já cadastrado");
    }

    const senhaHast = await hash(senha, 8);

    const user = await prismaCLient.user.create({
      data: {
        nome: nome,
        email: email,
        senha: senhaHast,
      },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });

    return user;
  }
}

export { CreateUseService };
