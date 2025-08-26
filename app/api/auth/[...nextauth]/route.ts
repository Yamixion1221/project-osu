import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

interface OsuProfile {
  id: number;
  username: string;
  avatar_url: string;
}

function OsuProvider<P extends Record<string, unknown> = OsuProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "osu",
    name: "osu!",
    type: "oauth",
    version: "2.0",
    authorization: {
      url: "https://osu.ppy.sh/oauth/authorize",
      params: { scope: "public identify" },
    },
    token: "https://osu.ppy.sh/oauth/token",
    userinfo: "https://osu.ppy.sh/api/v2/me",
    profile(profile: OsuProfile) {
      return {
        id: profile.id.toString(),
        name: profile.username,
        image: profile.avatar_url,
      };
    },
    options,
  };
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    OsuProvider({
      clientId: process.env.OSU_CLIENT_ID!,
      clientSecret: process.env.OSU_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin", // opsional, kustom halaman login
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
