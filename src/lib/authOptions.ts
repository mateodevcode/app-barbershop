import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectMongoDB } from "@/lib/db";
import Usuario from "@/models/usuario";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Credenciales inválidas");
        }

        await connectMongoDB();
        const user = await Usuario.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Correo no registrado");
        }

        if (user.bloqueado) {
          throw new Error("Cuenta bloqueada");
        }

        const verificarPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!verificarPassword) {
          user.intentosFallidos += 1;

          if (user.intentosFallidos >= 3) {
            user.bloqueado = true;
            await user.save();
            throw new Error("Usuario bloqueado");
          }

          await user.save();
          throw new Error("Contraseña incorrecta");
        }

        user.intentosFallidos = 0;
        await user.save();

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.imageUrl,
          rol: user.rol,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await connectMongoDB();

      let existingUser = await Usuario.findOne({ email: user.email });

      if (!existingUser) {
        existingUser = await Usuario.create({
          name: user.name,
          email: user.email,
          imageUrl: user.image,
          provider: account?.provider,
          rol: "cliente",
        });
      }

      user.id = existingUser._id.toString();
      user.rol = existingUser.rol;

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.rol = user.rol;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.rol = token.rol as string;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
