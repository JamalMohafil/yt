import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }: any) {
      const exsistingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });
      console.log(exsistingUser, "exsist");
      if (!exsistingUser) {
        await writeClient.create({
          _type: "author",
          id: profile.id,
          email: user?.email,
          name: user?.name,
          username: profile?.login,
          image: user?.image,
          bio: profile?.bio || "",
        });
      }
      return true;
    },
    async jwt({ token, account, profile }: any) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });
        token.id = user?._id;
      }
      return token;
    },
    async session({ session, token }: any) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
