import { sign } from 'jsonwebtoken';

type Data = string | object | Buffer;

export const signToken = (data: Data): string => {
  const secret =
    process.env.JWT_SECRET || 'x7-joXEF89Q5hUx9Od5mibNVQb9vUuLr1091TMZSM-w';

  const token = sign(data, secret, {
    expiresIn: '30d'
  });

  return token;
};
