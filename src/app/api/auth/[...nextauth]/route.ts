import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "1064671521277-pgtnm4p8g2scvico8etkpsu6pjqf9jsf.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account && account.provider === "google") {
        const id_token = account.id_token;
        try {
          const response = await fetch(
            "https://backfatvo.salyam.uz/api_v1/auth/google/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id_token }),
            }
          );

          const data = await response.json();

          if (response.ok) {
            token.access = data.access;
            token.refresh = data.refresh;
          }
        } catch (error) {
          console.log(error);
        }
        return { ...token, id: user.id };
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          access: token.access,
          refresh: token.refresh,
        },
      };
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
