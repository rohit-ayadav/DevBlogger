# A Beginner's Guide to Adding Authentication to Next.js with NextAuth.js

Welcome to your journey of adding secure authentication to your Next.js application! Whether you're building a personal project or a full-stack app, this guide will walk you through implementing authentication step-by-step using NextAuth.js.

## Why Authentication Matters
Authentication ensures that only authorized users can access certain parts of your application. NextAuth.js simplifies the implementation by supporting multiple authentication providers and strategies.

### What You’ll Build
1. A login page with Google/GitHub options
2. Secure password-based authentication
3. Protected dashboard pages
4. A personalized user profile system

## Getting Started

### 1. Create a New Next.js Project
```
npx create-next-app@latest my-secure-app
cd my-secure-app
```

### 2. Install NextAuth.js
```
npm install next-auth @types/next-auth
```

### 3. Set Up Your Secret Keys
Create a `.env.local` file in your project root:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secure_key_here
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
```

Generate a strong secret using:
```
openssl rand -base64 32
```

## Setting Up Authentication Providers

### Adding Google Login
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project > APIs & Services > Credentials
3. Create OAuth Client ID (Web Application)
4. Add redirect URL: `http://localhost:3000/api/auth/callback/google`

## Configuring NextAuth API
Create `app/api/auth/[...nextauth]/route.ts`:
```
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

## Building the Login Page
Create `app/auth/signin/page.tsx`:
```
import { getProviders, signIn } from "next-auth/react";

export default async function SignIn() {
  const providers = await getProviders();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center">Sign In</h1>
        {providers && Object.values(providers).map((provider) => (
          <button 
            key={provider.name} 
            onClick={() => signIn(provider.id)}
            className="w-full px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Sign in with {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
}
```

## Protecting Private Routes
### Server-Side Protection
Create `app/dashboard/page.tsx`:
```
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return <h1>Welcome, {session.user?.name}!</h1>;
}
```

### Client-Side Protection
Create `components/UserProfile.tsx`:
```
"use client";

import { useSession } from "next-auth/react";

export default function UserProfile() {
  const { data: session } = useSession();

  return session ? (
    <div>
      <img src={session.user?.image} alt="Profile" className="w-16 h-16 rounded-full" />
      <h2>{session.user?.name}</h2>
      <p>{session.user?.email}</p>
    </div>
  ) : (
    <p>Please sign in to view profile</p>
  );
}
```

## Security Best Practices
- **Always Use HTTPS** in production.
- **Hash Passwords** before storing them:
```
import { hash, compare } from "bcryptjs";
const hashedPassword = await hash(password, 10);
const isValid = await compare(inputPassword, storedHash);
```
- **Set Session Expiration**:
```
session: {
  strategy: "jwt",
  maxAge: 8 * 60 * 60, // 8 hours
}
```

## Adding Email/Password Login
Update your auth options:
```
import CredentialsProvider from "next-auth/providers/credentials";

CredentialsProvider({
  name: "Email",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" }
  },
  async authorize(credentials) {
    // Add user validation logic here
  }
}),
```

## Recommended Resources
- [NextAuth.js Docs](https://next-auth.js.org/)
- [OAuth Security Best Practices](https://oauth.net)
- [Next.JS Other Articles](http://devblogger.in/search?q=Next.js)

Happy coding!

