import mongoose from 'mongoose'
import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import User from '@/models/user'
import connectDB from '@/db/conectdb'
import Payment from '@/models/Payment'


export const authoptions =  NextAuth({
  providers: [
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
    GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  }),
  ],
  callbacks: {
  async signIn({ user, account, profile, email, credentials }) {

    if(account.provider === 'github') {
      await connectDB()

      const currentUser = await User.findOne({email: user.email});

      if(!currentUser){
        const newUser = await User.create({  
          email: user.email,
          Username: user.email.split("@")[0],
        })
      }
      return true
    }
  },
  async session({ session, user, token }) {
    const dbUser = await User.findOne({ email: session.user.email })
    console.log(dbUser)
    session.user.name = dbUser.Username
    return session
  },
}
})

export { authoptions as GET, authoptions as POST }