import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    {
      id: "linkedin",
      name: "LinkedIn",
      type: "oauth" as const,

      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,

      authorization: {
        url: "https://www.linkedin.com/oauth/v2/authorization",
        params: { scope: "openid profile email" },
      },

      token: {
        url: "https://www.linkedin.com/oauth/v2/accessToken",
        async request(context: any) {
          const params = new URLSearchParams({
            grant_type: "authorization_code",
            code: context.params.code!,
            redirect_uri: context.provider.callbackUrl,
            client_id: process.env.LINKEDIN_CLIENT_ID!,
            client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
          });

          const response = await fetch(
            "https://www.linkedin.com/oauth/v2/accessToken",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: params,
            }
          );

          const tokens = await response.json();
          return { tokens };
        },
      },

      userinfo: "https://api.linkedin.com/v2/userinfo",

      profile(profile: any) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],

  callbacks: {
    async redirect() {
      return "/connect-linkedin";
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };