import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { OAuthConfig, OAuthUserConfig } from "next-auth/providers"

interface OsuProfile {
  id: number
  username: string
  avatar_url: string
}

function OsuProvider<P extends Record<string, any> = OsuProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "osu",
    name: "osu!",
    type: "oauth",
    authorization: "https://osu.ppy.sh/oauth/authorize",
    token: "https://osu.ppy.sh/oauth/token",
    userinfo: "https://osu.ppy.sh/api/v2/me",
    profile(profile: OsuProfile) {
      return {
        id: profile.id.toString(),
        name: profile.username,
        image: profile.avatar_url,
      }
    },
    options,
  }
}

const handler = NextAuth({
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
})

export { handler as GET, handler as POST }
