# Beginner's Guide to Next.js Authentication with NextAuth.js and MongoDB (2025 Edition)

<!-- ADSENSE -->

## Introduction: What is Authentication and Why Do You Need It?

Ever visited a website that remembers who you are and shows your personal information? That's authentication in action! Authentication is like the digital version of checking someone's ID - it verifies that users are who they claim to be.

Adding authentication to your Next.js website is important because it:

- Keeps user information safe from unauthorized access
- Allows you to create personalized experiences for each user
- Protects private sections of your website
- Builds trust with your visitors who know their data is secure
- Helps comply with data protection regulations

NextAuth.js makes adding authentication to your Next.js app super easy, even if you're a beginner. It works with popular login methods like Google and GitHub, and you can also use traditional email/password login. Best of all, we'll connect it to MongoDB, a beginner-friendly database that's perfect for web applications!

## Authentication Terminology for Beginners

Before diving into code, let's understand some key terms:

**Authentication vs. Authorization**:
- **Authentication**: Verifying who a user is (login)
- **Authorization**: Determining what a user can access (permissions)

**OAuth**: A standard protocol that allows users to log in to your app using accounts from services like Google or GitHub without sharing their passwords with you.

**JWT (JSON Web Tokens)**: Small, secure tokens that contain user information. Think of them like digital wristbands at an event that show you've already checked in.

**Session**: A way to remember a user between page visits. Like a conversation that continues even if you pause and come back later.

**Cookies**: Small pieces of data stored in a user's browser that help maintain their login state.

**Hashing**: A one-way process to securely store passwords by converting them to scrambled text that can't be reversed.

<!-- ADSENSE -->

## What You'll Build in This Tutorial

By the end of this beginner-friendly guide, you'll create a Next.js application with:

1. A login page with social login buttons (Google and GitHub)
2. Secure email/password login that properly protects passwords
3. Protected pages that only logged-in users can access
4. User profiles showing information from their social accounts
5. Data storage in MongoDB, a popular and free database
6. Session management that keeps users logged in

![Authentication Flow Example]

## What You'll Need Before Starting

- Basic knowledge of JavaScript and React (you don't need to be an expert!)
- Node.js installed on your computer (download from [nodejs.org](https://nodejs.org/))
- A code editor like Visual Studio Code (it's free!)
- A free MongoDB Atlas account (we'll show you how to set this up)
- A free GitHub or Google account for setting up social login

Don't worry if you're new to some of these technologies - we'll explain each step clearly!

<!-- ADSENSE -->

## Step 1: Understanding How NextAuth.js Works

Before writing any code, let's understand how NextAuth.js handles authentication:

1. **User Starts Login**: User clicks "Sign in with Google" or enters email/password
2. **Authentication Request**: NextAuth redirects to the provider (Google, GitHub) or checks credentials
3. **Provider Response**: After authentication, the provider sends information back to NextAuth
4. **Session Creation**: NextAuth creates a secure session and JWT (JSON Web Token)
5. **User is Logged In**: NextAuth sets cookies to maintain the session

The beauty of NextAuth is that it handles all these steps for you - you just need to set up the configuration!

### Authentication Flow Types

NextAuth supports two main ways to handle sessions:

**JWT Strategy** (default): 
- Stores user information in an encrypted token in the browser
- Works without a database (great for simple projects)
- Fast and stateless (no server lookups needed)

**Database Strategy**:
- Stores sessions in your MongoDB database
- Gives you more control over user sessions
- Better for more complex applications

We'll use the JWT strategy for simplicity but explain how to switch if needed.

<!-- ADSENSE -->

## Step 2: Creating Your Next.js Project

Let's start by creating a new Next.js application. Open your terminal (Command Prompt or Terminal app) and run:

```bash
npx create-next-app@latest my-auth-app
cd my-auth-app
```

This command creates a new Next.js project with the latest features. When prompted, select the default options.

> **Tip**: If you're completely new to Next.js, take a few minutes to explore the generated files. The main folders are:
> - `/app`: Contains your pages and components
> - `/public`: For static files like images
> - Next.js 13+ uses the App Router, which might look different from older tutorials!

## Step 3: Installing NextAuth.js

Now let's add the authentication library. In your terminal, run:

```bash
npm install next-auth@latest @types/next-auth
```

This installs NextAuth.js and its TypeScript types. NextAuth will handle all the complex authentication logic for us!

<!-- ADSENSE -->

## Step 4: Understanding Environment Variables and Security

When building apps with authentication, keeping secrets secure is critical. Let's understand why:

**What are environment variables?**
Environment variables are like secret notes your application can read but aren't visible in your code. They're perfect for storing sensitive information like API keys.

**Why use them?**
- They keep sensitive data out of your code repository
- They let you use different values in development and production
- They're a standard practice for security

Let's set up your environment variables:

1. Create a file named `.env.local` in your project's main folder
2. Add the following template:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secure_key_here
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
GITHUB_CLIENT_ID=your_github_id
GITHUB_CLIENT_SECRET=your_github_secret
```

The `NEXTAUTH_SECRET` is particularly important - it's used to encrypt your tokens. Generate a secure random string by:

**On Mac/Linux**: Open Terminal and type:
```bash
openssl rand -base64 32
```

**On Windows**: Open PowerShell and type:
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

> **Security Tip**: Never commit your `.env.local` file to Git! Add it to your `.gitignore` file to prevent accidentally sharing your secrets.

<!-- ADSENSE -->

## Step 5: Understanding OAuth and Setting Up Providers

### What is OAuth and Why Use It?

OAuth allows users to log in using their existing accounts from services like Google or GitHub. Benefits include:

- Users don't need to create yet another password
- You don't have to handle password security
- Higher trust as users authenticate with brands they recognize
- Access to profile information from these providers

Now let's set up two popular OAuth providers:

### Setting Up Google Authentication

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project by clicking the project dropdown at the top and selecting "New Project"
3. Give your project a name like "My Auth App" and click "Create"
4. Once created, select it and go to "APIs & Services" > "Credentials"
5. Click "Configure Consent Screen" (select "External" if prompted)
6. Fill in required information (app name, support email)
7. Add your email as a test user and complete the form
8. Return to Credentials, click "Create Credentials" > "OAuth client ID"
9. Select "Web Application" as the application type
10. Add `http://localhost:3000` under "Authorized JavaScript origins"
11. Add `http://localhost:3000/api/auth/callback/google` under "Authorized redirect URIs"
12. Copy the provided Client ID and Client Secret to your `.env.local` file

> **Tip**: The redirect URI is where Google will send users after they log in. This must match exactly what NextAuth expects.

### Setting Up GitHub Authentication

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - Application name: "My Next.js Auth App"
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and generate a Client Secret
5. Add these to your `.env.local` file

<!-- ADSENSE -->

## Step 6: Understanding NoSQL Databases and MongoDB

### What is MongoDB and Why Use It?

MongoDB is a "NoSQL" database that stores data in flexible, JSON-like documents. It's different from traditional SQL databases in several ways:

- **Flexible Schema**: You can add fields to documents without redefining the entire database structure
- **JSON-like Documents**: Data is stored in a format that's natural for JavaScript developers
- **Easy Scaling**: Great for applications that might grow quickly
- **Perfect for User Data**: Excellent for storing user profiles with varying information

For our authentication system, MongoDB will store:
- User account information
- Provider connections (links to Google/GitHub accounts)
- Sessions (if you choose database sessions instead of JWT)

### Setting Up MongoDB Atlas

MongoDB Atlas provides a free cloud database perfect for learning and small projects:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account
2. After signing up, create a new cluster (select the FREE tier)
3. Choose a cloud provider and region closest to you
4. Click "Create Cluster" (this takes a few minutes)
5. Once ready, click "Connect"
6. Create a database user with a secure password
7. Under "Where would you like to connect from?" add `0.0.0.0/0` to allow access from anywhere
8. Choose "Connect your application" and copy the connection string
9. Replace `<password>` with your database user's password
10. Add the connection string to your `.env.local` file as `MONGODB_URI`

### Understanding Mongoose

Mongoose is a library that makes working with MongoDB easier in Node.js:
- It provides a schema-based solution to model your data
- It offers built-in type casting and validation
- It handles the connection to MongoDB for you

Install MongoDB packages:

```bash
npm install mongodb mongoose @auth/mongodb-adapter
```

<!-- ADSENSE -->

## Step 7: Understanding Models in Mongoose

Before writing code, let's understand what database models are:

**Models** are like blueprints for your data. They define:
- What fields your data has (name, email, password)
- What types these fields should be (string, number, date)
- Which fields are required and which are optional
- Any validation rules (minimum length, format)

For our authentication system, we need models for:
- **User**: Stores basic user information (name, email, image)
- **Account**: Links users to their social providers
- **Session**: Stores active login sessions
- **Verification Token**: For email verification

Here's a simplified look at our User model:

```javascript
// This defines what user data looks like in our database
const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true  // No duplicate emails allowed
  },
  password: String,
  image: String
});
```

We'll implement these models in the following sections.

<!-- ADSENSE -->

## Step 8: Setting Up Database Connection

Now let's create the files to connect to MongoDB:

1. Create a `lib` folder in your project root
2. Create `lib/mongodb.js` file:

```javascript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// This prevents multiple connections during development
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then(mongoose => {
      return mongoose;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
```

This code establishes a connection to MongoDB and caches it to prevent creating multiple connections.

3. Create a separate client for the NextAuth adapter in `lib/mongodb-client.js`:

```javascript
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

// In development, use a global variable to preserve the connection across hot reloads
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
```

> **Tip for Beginners**: The difference between these two files might be confusing. The first uses Mongoose (a higher-level library) for our custom code, while the second uses the raw MongoDB driver for NextAuth's adapter.

<!-- ADSENSE -->

## Step 9: Creating User Models

Now let's create our database models. Create a `models` folder and add these files:

1. `models/User.js`:

```javascript
import mongoose from 'mongoose';

// Only create the model if it doesn't exist already
const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  emailVerified: Date,
  image: String,
  password: String,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
```

2. `models/Account.js`:

```javascript
import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  type: String,
  provider: String,
  providerAccountId: String,
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
});

// Make sure we don't connect the same account twice
AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

export default mongoose.models.Account || mongoose.model('Account', AccountSchema);
```

3. Create similar models for `Session.js` and `VerificationToken.js`

> **Understanding Mongoose Models**: These models define the structure of our data. The `mongoose.models.X || mongoose.model('X', Schema)` pattern prevents errors when the app hot reloads during development.

<!-- ADSENSE -->

## Step 10: Understanding JWT vs. Database Sessions

Before configuring NextAuth, let's understand the two session strategies:

### JWT Sessions (Default)
- **How it works**: User info is stored in an encrypted token in the browser
- **Pros**: Faster (no database lookups), works without a database, simpler
- **Cons**: Can't revoke sessions immediately, limited storage

### Database Sessions
- **How it works**: Only a session ID is stored in the browser; all data is in the database
- **Pros**: Can revoke sessions instantly, can store more user data
- **Cons**: Requires database lookups on each request, slightly more complex

For beginners, JWT sessions are usually simpler, but knowing the difference helps you make an informed choice.

## Step 11: Configuring NextAuth API Route

Now let's set up the core of our authentication system. Create a file at `app/api/auth/[...nextauth]/route.js`:

```javascript
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { compare } from "bcryptjs";
import clientPromise from "@/lib/mongodb-client";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

// This is where we configure our authentication system
export const authOptions = {
  // Use MongoDB adapter to store user data
  adapter: MongoDBAdapter(clientPromise),
  
  // Configure authentication providers
  providers: [
    // Google login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
    // GitHub login
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    
    // Email/password login
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        // Connect to database
        await dbConnect();
        
        // Find user by email
        const user = await User.findOne({ email: credentials.email });
        
        if (!user || !user.password) {
          return null;
        }
        
        // Check if password matches
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );
        
        if (!isPasswordValid) {
          return null;
        }
        
        // Return user object if authentication succeeds
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      }
    }),
  ],
  
  // Session configuration
  session: {
    strategy: "jwt", // Use JWT for sessions
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  // Callbacks to customize behavior
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub;
        // You can add custom fields here
      }
      return session;
    },
  },
  
  // Pages for custom authentication flow
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};

// This creates the API route handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

> **Understanding This Code**: This is the heart of your authentication system. It:
> - Sets up providers (Google, GitHub, email/password)
> - Configures session handling
> - Defines callback functions for customizing behavior
> - Specifies custom pages for the authentication flow

<!-- ADSENSE -->

## Step 12: Setting Up the Session Provider

For authentication to work across your app, you need to wrap it with a session provider. Create `app/providers.jsx`:

```jsx
"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

Then update your `app/layout.jsx`:

```jsx
import { Providers } from "./providers";
import "./globals.css";

export const metadata = {
  title: "My Auth App",
  description: "A Next.js app with authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

This ensures the authentication state is available throughout your application.

> **Tip**: The "use client" directive is important here because SessionProvider uses browser APIs that aren't available during server rendering.

<!-- ADSENSE -->

## Step 13: Creating a Sign-In Page

Let's create a simple but attractive sign-in page. Create a file at `app/auth/signin/page.jsx`:

```jsx
"use client";

import { useState, useEffect } from "react";
import { signIn, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [providers, setProviders] = useState(null);
  const router = useRouter();

  // Load available authentication providers
  useEffect(() => {
    const loadProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    loadProviders();
  }, []);

  // Handle email/password login
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    }
  };

  // If providers haven't loaded yet
  if (!providers) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
          <p className="mt-2 text-gray-600">Access your account</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Email/Password Form */}
        <form className="mt-8 space-y-6" onSubmit={handleEmailSignIn}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Sign in with Email
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {providers && 
              Object.values(providers)
                .filter((provider) => provider.id !== "credentials")
                .map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => signIn(provider.id, { callbackUrl: "/dashboard" })}
                  className="py-2 px-4 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
                >
                  Sign in with {provider.name}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

This page provides both email/password login and social login buttons.

> **UI Tip**: This is a basic design using Tailwind CSS (included with Next.js by default). Feel free to customize the appearance to match your app's style!

<!-- ADSENSE -->

## Step 14: Understanding Route Protection

One of the main reasons for adding authentication is to protect certain routes from unauthorized access. Let's understand how this works in Next.js with the App Router:

**Server-Side Protection**: 
This checks if a user is logged in before rendering a page. If not, they are redirected to the login page.

**Client-Side Protection**:
This hides or shows components based on the user's login status.

Let's implement both approaches:

### Server-Side Protection

Create a dashboard page at `app/dashboard/page.jsx`:

```jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // Get the session on the server
  const session = await getServerSession(authOptions);

  // If no session exists, redirect to login
  if (!session) {
    redirect("/auth/signin");
  }

  // If we get here, the user is logged in
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p>Hello, {session.user?.name || session.user?.email}!</p>
        <p>This page is protected and only visible if you're logged in.</p>
      </div>
    </div>
  );
}
```

### Client-Side Protection with useSession

Create a `components` folder in your project root, then add `components/UserProfile.jsx`:

```jsx
"use client";

import { useSession, signOut } from "next-auth/react";

export default function UserProfile() {
  // Get session on the client side
  const { data: session, status } = useSession();
  
  // Show loading state
  if (status === "loading") {
    return <div>Loading user profile...</div>;
  }

  // Show login prompt if not logged in
  if (!session) {
    return <p>Please sign in to view your profile</p>;
  }

  // Show user info if logged in
  return (
    <div>
      <div className="flex items-center space-x-4">
        {session.user?.image && (
          <img 
            src={session.user.image} 
            alt="Profile picture"
            className="w-16 h-16 rounded-full"
          />
        )}
        
        <div>
          {session.user?.name && (
            <h2 className="text-xl font-semibold">{session.user.name}</h2>
          )}
          {session.user?.email && (
            <p>{session.user.email}</p>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
```

Add this component to your dashboard:

```jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UserProfile from "@/components/UserProfile";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <UserProfile />
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Secure Content</h2>
          <p>This content is only visible to authenticated users.</p>
        </div>
      </div>
    </div>
  );
}
```

> **Understanding the Difference**: Server components check authentication during page generation, while client components can respond to login state changes in real-time.

<!-- ADSENSE -->

## Step 15: Adding Password Registration and Hashing

For email/password login to work, we need to add user registration and secure password storage. First, let's understand password hashing:

### What is Password Hashing?

Hashing converts passwords into scrambled strings that can't be reversed:
- Original password: "mySecurePassword123"
- Hashed password: "$2a$10$XJFyHN5xnfDUVVB4T7OXA.nVgFDNUy8.YBQoQoHn8NruXGxnAYnW6"

If your database is ever compromised, attackers only see the hashed versions, not actual passwords.

Install bcryptjs for password hashing:

```bash
npm install bcryptjs
```

Now create a registration page at `app/auth/register/page.jsx`:

```jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Send registration data to our API
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Redirect to sign-in page after successful registration
      router.push("/auth/signin?registered=true");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-gray-600">Join our community</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
```

Now let's create the API endpoint to handle registration. Create a file at `app/api/register/route.js`:

```javascript
import { hash } from "bcryptjs";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    
    // Validate the inputs
    if (!email || !email.includes('@') || !password || password.length < 8) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }
    
    // Hash the password (never store plain text passwords!)
    const hashedPassword = await hash(password, 12);
    
    // Create the new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    
    // Remove password from the response
    const newUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
    
    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
```

> **Security Tips**:
> - Always hash passwords before storing them
> - Validate user inputs to prevent malicious data
> - Never return sensitive information like password hashes
> - Handle errors gracefully without exposing system details

<!-- ADSENSE -->

## Step 16: Understanding Middleware for Multiple Protected Routes

If you have many pages that should be protected, creating server-side checks in each file becomes repetitive. Next.js provides a solution called "middleware" that can protect multiple routes at once.

### What is Middleware?

Middleware runs before a request is completed, allowing you to:
- Check if a user is logged in
- Redirect unauthenticated users
- Modify request or response headers
- Apply protection rules across multiple pages

Here's how to set up route protection middleware:

Create a file named `middleware.js` in your project root:

```javascript
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Define which paths should be protected
  const protectedPaths = ["/dashboard", "/profile", "/settings"];
  const isPathProtected = protectedPaths.some((path) => 
    pathname.startsWith(path)
  );
  
  // Allow public paths
  if (!isPathProtected) {
    return NextResponse.next();
  }
  
  // Check for authentication token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  // Redirect to login if no token found
  if (!token) {
    const url = new URL(`/auth/signin`, request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }
  
  // Allow access if authenticated
  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};
```

> **Understanding Middleware**: Think of middleware as a security guard checking badges before allowing entry to different areas of a building. The guard stands at the entrance and checks everyone before they're allowed to proceed.

<!-- ADSENSE -->

## Step 17: Creating a User-Friendly Home Page

Let's create a welcoming home page that adapts based on whether the user is signed in.

Create or update `app/page.jsx`:

```jsx
import { getServerSession } from "next-auth/auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Home() {
  // Check if user is logged in
  const session = await getServerSession(authOptions);
  
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to My Authentication Demo
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              A simple example of Next.js authentication with NextAuth.js and MongoDB
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {session ? (
                // Show these buttons if logged in
                <>
                  <Link
                    href="/dashboard"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white"
                  >
                    Go to Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    View Profile <span aria-hidden="true">→</span>
                  </Link>
                </>
              ) : (
                // Show these buttons if logged out
                <>
                  <Link
                    href="/auth/signin"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Create Account <span aria-hidden="true">→</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

<!-- ADSENSE -->

## Step 18: Creating a Navbar Component

A navigation bar helps users move around your app and shows their login status. Create `components/Navbar.jsx`:

```jsx
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">AuthApp</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-900">
                Home
              </Link>
              {session && (
                <Link href="/dashboard" className="px-3 py-2 text-sm font-medium text-gray-900">
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {status === "loading" ? (
              <div className="text-sm text-gray-500">Loading...</div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                {session.user?.image && (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={session.user.image}
                    alt={session.user.name || "User"}
                  />
                )}
                <span className="text-sm text-gray-900">{session.user?.name || session.user?.email}</span>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link href="/auth/signin" className="text-sm text-gray-900 hover:text-gray-600">
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  className="ml-2 px-3 py-2 rounded-md text-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-900">
              Home
            </Link>
            {session && (
              <Link href="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-900">
                Dashboard
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {session ? (
              <div className="flex items-center px-4">
                {session.user?.image && (
                  <img
                    className="h-10 w-10 rounded-full"
                    src={session.user.image}
                    alt=""
                  />
                )}
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {session.user?.name || session.user?.email}
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="mt-1 text-sm text-red-600 hover:text-red-800"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 px-4">
                <Link href="/auth/signin" className="text-base font-medium text-gray-900">
                  Sign in
                </Link>
                <Link href="/auth/register" className="text-base font-medium text-gray-900">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
```

Add this navbar to your layout:

```jsx
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "My Auth App",
  description: "A Next.js app with authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
```

> **Design Tip**: This navbar is responsive, working well on both mobile and desktop screens. It automatically shows/hides buttons based on login status.

<!-- ADSENSE -->

## Step 19: Common Authentication Problems and Solutions

Even when following a guide step-by-step, you might encounter some challenges. Here are solutions to the most common issues:

### "My Social Login Doesn't Work"

**Problem**: Clicking Google or GitHub login buttons doesn't do anything or shows errors.

**Solutions**:
- Double-check your environment variables (GOOGLE_CLIENT_ID, etc.) for typos
- Verify that the callback URLs in your provider settings match exactly what NextAuth expects
- Make sure you've set the NEXTAUTH_URL correctly
- Check browser console (F12) for error messages

> **Tip**: For Google, make sure you've completed the OAuth consent screen setup and added your email as a test user if you're in testing mode.

### "Users Stay Logged In Forever" or "Users Get Logged Out Too Quickly"

**Problem**: Session duration is too long or too short.

**Solution**: Adjust the maxAge property in your NextAuth config:

```javascript
session: {
  strategy: "jwt",
  maxAge: 24 * 60 * 60, // 1 day in seconds (adjust as needed)
},
```

### "I Can't Get User Data in My Components"

**Problem**: You're trying to access session data but it's undefined.

**Solutions**:
- For client components: Make sure you're using the `useSession` hook and checking the loading state
- For server components: Ensure you're using `getServerSession` with the correct authOptions
- Verify that the Providers wrapper is correctly set up in your layout

### "MongoDB Connection Errors"

**Problem**: You see errors about MongoDB connection failures.

**Solutions**:
- Check your MONGODB_URI for typos
- Make sure you've whitelisted your IP address in MongoDB Atlas
- Verify that your database user has the correct permissions
- For local development, ensure MongoDB is running if you're using a local instance

> **Debugging Tip**: Add console.log statements in your API routes to see what's happening. You can view these logs in your terminal where Next.js is running.

<!-- ADSENSE -->

## Step 20: Security Best Practices Explained

As you build authentication systems, security becomes crucial. Here are some best practices explained in simple terms:

### 1. Password Security
- **Always hash passwords** - never store them as plain text
- Use a strong hashing algorithm like bcrypt (which we've implemented)
- Set a reasonable "salt rounds" value (10-12 is good for most applications)

### 2. Environment Variables
- Keep all secrets in `.env.local` files
- Never commit these files to Git repositories
- Use different secrets in development and production

### 3. HTTPS
- Always use HTTPS in production
- NextAuth won't work properly without it in production environments
- Services like Vercel provide HTTPS automatically

### 4. Rate Limiting
- Limit how many login attempts are allowed
- This prevents brute force attacks where attackers try many passwords

A simple rate limiting implementation looks like this:

```javascript
// This would go in your NextAuth API route
import rateLimit from 'express-rate-limit';

// Create a limiter: max 5 requests per minute
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply to your API routes
```

### 5. Security Headers

Next.js allows you to add security headers to your app. Create or update `next.config.js`:

```javascript
const nextConfig = {
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

> **Security Tip**: Regularly update your dependencies to get security patches. The `npm audit` command can help identify vulnerabilities.

<!-- ADSENSE -->

## Step 21: Deploying Your Secure Application

### Understanding Deployment Requirements

Before deploying your authentication system to the internet, there are special considerations:

1. **Environment Variables**: Production needs its own set of secure variables
2. **MongoDB Access**: Your database needs to be accessible from your hosting provider
3. **OAuth Callback URLs**: Must be updated to use your production domain
4. **HTTPS**: Required for secure authentication

### Getting Ready for Deployment

1. Create a free account on [Vercel](https://vercel.com/) (it's built by the same team that makes Next.js!)
2. Push your code to a GitHub repository
3. Make sure your MongoDB Atlas cluster allows connections from anywhere (or specifically from Vercel's IP range)
4. Prepare your environment variables:
   - `NEXTAUTH_URL`: Set to your production URL (e.g., https://my-auth-app.vercel.app)
   - `NEXTAUTH_SECRET`: Generate a new secure random string for production
   - OAuth credentials: You may need separate ones for production

### Simple Deployment Steps

1. Connect your GitHub repository to Vercel
2. Add all your environment variables in the Vercel dashboard
3. Click "Deploy"
4. Once deployed, update your OAuth callback URLs in Google and GitHub to include your new domain:
   - `https://your-domain.vercel.app/api/auth/callback/google`
   - `https://your-domain.vercel.app/api/auth/callback/github`
5. Test the authentication flow on your live site

> **Pro Tip**: Use Vercel's "Preview Deployments" feature to test changes before they go live on your main domain.

<!-- ADSENSE -->

## Step 22: Next Steps and Advanced Features

Once you have your basic authentication system working, you might want to explore more advanced features:

### Email Verification

Send verification emails to confirm user addresses:

1. Add a `emailVerified` field to your User model
2. Install a package for sending emails: `npm install nodemailer`
3. Create an API route to send verification emails
4. Add a callback to check verification status:

```javascript
// In your NextAuth configuration
callbacks: {
  async signIn({ user, account }) {
    // Allow OAuth sign-ins
    if (account?.provider !== "credentials") {
      return true;
    }
    
    // Check if email is verified for credentials
    await dbConnect();
    const userDoc = await User.findOne(
      { email: user.email },
      { emailVerified: 1 }
    );
    
    return userDoc?.emailVerified ? true : "/auth/verify-email";
  },
},
```

### Password Reset

Implement a "forgot password" flow:

1. Create a form where users can request password resets
2. Generate a unique, time-limited token
3. Send an email with a reset link
4. Create a page where users can enter a new password using this token

### Two-Factor Authentication (2FA)

Add an extra layer of security:

1. Install 2FA libraries: `npm install otplib qrcode`
2. Generate and store a secret for each user
3. Show a QR code for users to scan with authenticator apps
4. Add a step in the login process to verify the 2FA code

### Role-Based Access Control

Restrict different parts of your app to different user types:

1. Add a `role` field to your User model (e.g., "user", "admin")
2. Add the role to the session in the JWT callback
3. Check the role before allowing access to protected routes

```javascript
// Add to your NextAuth configuration
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.role = user.role;
    }
    return token;
  },
  async session({ session, token }) {
    if (token && session.user) {
      session.user.role = token.role;
    }
    return session;
  },
},
```

Then check the role in your components or middleware:

```javascript
if (session?.user?.role !== "admin") {
  return <p>Access denied. Admins only.</p>;
}
```

<!-- ADSENSE -->

## Conclusion

Congratulations! You've learned how to implement a secure, production-ready authentication system in Next.js using NextAuth.js and MongoDB. Let's recap what you've accomplished:

1. **Created a Next.js application** with authentication built in
2. **Set up OAuth providers** (Google and GitHub) for social login
3. **Implemented email/password authentication** with secure password hashing
4. **Connected to MongoDB** for data storage
5. **Protected routes** against unauthorized access
6. **Built user interface components** for login, registration, and profile display

This foundation gives you a secure starting point for any web application that requires user accounts and authentication.

### What to Learn Next

To continue building your skills, consider exploring:
- Advanced NextAuth.js features like callbacks and events
- More complex database schemas and relationships
- User profile customization and avatar uploads
- Role-based permissions and access control
- Enhanced security with Two-Factor Authentication

### Helpful Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [OWASP Authentication Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

Happy coding, and enjoy building secure applications with Next.js!

<!-- ADSENSE -->
# Beginner's Guide to Next.js Authentication with NextAuth.js and MongoDB (2025 Edition)

<!-- ADSENSE -->

## Introduction: What is Authentication and Why Do You Need It?

Ever visited a website that remembers who you are and shows your personal information? That's authentication in action! Authentication is like the digital version of checking someone's ID - it verifies that users are who they claim to be.

Adding authentication to your Next.js website is important because it:

- Keeps user information safe from unauthorized access
- Allows you to create personalized experiences for each user
- Protects private sections of your website
- Builds trust with your visitors who know their data is secure
- Helps comply with data protection regulations

NextAuth.js makes adding authentication to your Next.js app super easy, even if you're a beginner. It works with popular login methods like Google and GitHub, and you can also use traditional email/password login. Best of all, we'll connect it to MongoDB, a beginner-friendly database that's perfect for web applications!

## What You'll Build in This Tutorial

By the end of this beginner-friendly guide, you'll create a Next.js application with:

1. A login page with social login buttons (Google and GitHub)
2. Secure email/password login that properly protects passwords
3. Protected pages that only logged-in users can access
4. User profiles showing information from their social accounts
5. Data storage in MongoDB, a popular and free database
6. Session management that keeps users logged in

![Authentication Flow Example]

<!-- ADSENSE -->

## What You'll Need Before Starting

- Basic knowledge of JavaScript and React (you don't need to be an expert!)
- Node.js installed on your computer (download from [nodejs.org](https://nodejs.org/))
- A code editor like Visual Studio Code (it's free!)
- A free MongoDB Atlas account (we'll show you how to set this up)
- A free GitHub or Google account for setting up social login

Don't worry if you're new to some of these technologies - we'll explain each step clearly!

## Step 1: Creating Your Next.js Project

Let's start with a fresh Next.js application:

```bash
npx create-next-app@latest my-secure-app
cd my-secure-app
```

This command creates a new Next.js project with the latest features, including the App Router for enhanced routing capabilities.

<!-- ADSENSE -->

## Step 2: Installing NextAuth.js

Add NextAuth.js to your project dependencies:

```bash
npm install next-auth@latest @types/next-auth
```

The latest version includes improved TypeScript support and enhanced security features for your authentication system.

## Step 3: Setting Up Environment Variables

When building apps with login features, you need to keep certain information secret, like API keys and passwords. Let's set those up:

1. Create a file named `.env.local` in your project's main folder
2. Add the following lines to it:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secure_key_here
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
GITHUB_CLIENT_ID=your_github_id
GITHUB_CLIENT_SECRET=your_github_secret
```

For the `NEXTAUTH_SECRET`, you need a random, secure string. You can generate one by:

**On Mac/Linux**: Open Terminal and type:
```bash
openssl rand -base64 32
```

**On Windows**: Open PowerShell and type:
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

Copy the result and paste it as your `NEXTAUTH_SECRET`.

> **Important for beginners**: Never share your `.env.local` file or upload it to GitHub! This file contains secret information that should stay private. Next.js automatically prevents this file from being sent to the browser, keeping your secrets safe.

<!-- ADSENSE -->

## Step 4: Configuring OAuth Providers

### Setting Up Google Authentication (with Screenshots)

Let's set up Google login for your app:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project by clicking the project dropdown at the top of the page and selecting "New Project"
   ![Google Cloud New Project](https://i.imgur.com/example1.png)
3. Give your project a name like "My Auth App" and click "Create"
4. Once your project is created, select it and go to the sidebar menu
5. Click on "APIs & Services" > "Credentials"
6. On the Credentials page, click the "Create Credentials" button and select "OAuth client ID"
   ![Create OAuth Client ID](https://i.imgur.com/example2.png)
7. You might need to configure the consent screen first - click "Configure Consent Screen"
   - Choose "External" (available to any Google user)
   - Fill in the required app information (name, user support email, developer contact)
   - You can leave most fields as default for testing
   - Add your email as a test user
   - Click "Save and Continue" through each section
8. Back on the credentials page, click "Create Credentials" > "OAuth Client ID" again
9. Select "Web Application" as the application type
10. Give it a name like "Next.js Web Client"
11. Under "Authorized JavaScript origins" add `http://localhost:3000`
12. Under "Authorized redirect URIs" add `http://localhost:3000/api/auth/callback/google`
    ![Authorized Redirect URIs](https://i.imgur.com/example3.png)
13. Click "Create"
14. A popup will show your Client ID and Client Secret - copy these
15. Paste them into your `.env.local` file as `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

That's it! Your Google authentication is now set up for local development.

### Setting Up GitHub Authentication (Easy Step-by-Step)

Now let's add GitHub login to your app:

1. Sign in to your GitHub account
2. Go to [GitHub Developer Settings](https://github.com/settings/developers) (Click your profile picture > Settings > Developer settings > OAuth Apps)
3. Click the "New OAuth App" button
4. Fill in the form:
   - Application name: "My Next.js Auth App" (or any name you like)
   - Homepage URL: `http://localhost:3000`
   - Application description: "A Next.js app with authentication" (optional)
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
5. Click "Register application"
6. On the next screen, you'll see your Client ID
7. Click "Generate a new client secret"
8. Copy both the Client ID and the new Client Secret
9. Add them to your `.env.local` file as `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`

Now your app can use both Google and GitHub for login!

<!-- ADSENSE -->

## Step 5: Creating the NextAuth API Route

Create `app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-client";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

// Create a simplified MongoDB client for the adapter
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        // Connect to database
        await dbConnect();
        
        // Find user by email
        const user = await User.findOne({ email: credentials.email });
        
        if (!user || !user.password) {
          return null;
        }
        
        // Compare provided password with stored hash
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );
        
        if (!isPasswordValid) {
          return null;
        }
        
        // Return user object if credentials are valid
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      }
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub;
        // Add additional user data to the session if needed
        // For example, if you want to add a role field:
        // session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

This configuration includes:
- Multiple authentication providers
- Session management with JWT
- Custom callback functions for session handling
- Custom pages for the authentication flow

<!-- ADSENSE -->

## Step 6: Setting Up MongoDB with Mongoose

For persistent user data and credentials management, let's connect NextAuth.js to MongoDB using Mongoose:

1. Install MongoDB and Mongoose packages:
```bash
npm install mongodb mongoose @auth/mongodb-adapter
```

2. Set up your MongoDB connection string in `.env.local`:
```
MONGODB_URI=mongodb+srv://yourusername:yourpassword@yourcluster.mongodb.net/nextauth?retryWrites=true&w=majority
```

> **Note for beginners**: Replace the connection string with your actual MongoDB connection string. You can get this from MongoDB Atlas (free tier available) or your local MongoDB installation.

3. Create a database connection file in `lib/mongodb.js`:
```javascript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
```

4. Create user models in `models/User.js`:
```javascript
import mongoose from 'mongoose';

// Check if the User model already exists to prevent overwriting
const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  emailVerified: Date,
  image: String,
  password: String,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
```

5. Create your Account model in `models/Account.js`:
```javascript
import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  type: String,
  provider: String,
  providerAccountId: String,
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
});

// Compound index to ensure unique provider + providerAccountId
AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

export default mongoose.models.Account || mongoose.model('Account', AccountSchema);
```

6. Create your Session model in `models/Session.js`:
```javascript
import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  expires: Date,
  sessionToken: {
    type: String,
    unique: true,
  },
});

export default mongoose.models.Session || mongoose.model('Session', SessionSchema);
```

7. Create a VerificationToken model in `models/VerificationToken.js`:
```javascript
import mongoose from 'mongoose';

const VerificationTokenSchema = new mongoose.Schema({
  identifier: String,
  token: {
    type: String,
    unique: true,
  },
  expires: Date,
});

// Compound index for identifier + token
VerificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true });

export default mongoose.models.VerificationToken || mongoose.model('VerificationToken', VerificationTokenSchema);
```

These models form the foundation of your authentication system, storing users, their linked accounts, active sessions, and verification tokens for email verification.

<!-- ADSENSE -->

## Step 7: Building the SignIn Page

Create `app/auth/signin/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { signIn, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<any>(null);
  const router = useRouter();

  useState(() => {
    const loadProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    loadProviders();
  }, []);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
          <p className="mt-2 text-gray-600">Access your secure dashboard</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleEmailSignIn}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? "Signing in..." : "Sign in with Email"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {providers && 
              Object.values(providers)
                .filter((provider: any) => provider.id !== "credentials")
                .map((provider: any) => (
                <button
                  key={provider.id}
                  onClick={() => signIn(provider.id, { callbackUrl: "/dashboard" })}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  {provider.id === "google" && (
                    <>
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        />
                      </svg>
                      Google
                    </>
                  )}
                  {provider.id === "github" && (
                    <>
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                        />
                      </svg>
                      GitHub
                    </>
                  )}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

This enhanced sign-in page includes:
- Email/password authentication
- Social login options
- Form validation
- Error handling
- Loading states
- Responsive design with Tailwind CSS

<!-- ADSENSE -->

## Step 8: Creating a Provider Wrapper

To ensure NextAuth client components work properly, create a provider wrapper in `app/providers.tsx`:

```tsx
"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

Then update your `app/layout.tsx`:

```tsx
import { Providers } from "./providers";
import "./globals.css";

export const metadata = {
  title: "Secure Next.js App",
  description: "A secure Next.js application with NextAuth.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

## Step 9: Protecting Routes

### Server-Side Protection

Create `app/dashboard/page.tsx`:

```tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UserProfile from "@/components/UserProfile";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <UserProfile />
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Secure Content</h2>
          <p>This content is only visible to authenticated users.</p>
        </div>
      </div>
    </div>
  );
}
```

<!-- ADSENSE -->

### Client-Side Protection with useSession Hook

Create `components/UserProfile.tsx`:

```tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function UserProfile() {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <div className="animate-pulse">Loading user profile...</div>;
  }

  if (!session) {
    return <p>Please sign in to view your profile</p>;
  }

  return (
    <div className="flex items-center space-x-4">
      {session.user?.image ? (
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image 
            src={session.user.image} 
            alt="Profile picture"
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-2xl text-gray-600">
            {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || '?'}
          </span>
        </div>
      )}
      
      <div>
        {session.user?.name && (
          <h2 className="text-xl font-semibold">{session.user.name}</h2>
        )}
        {session.user?.email && (
          <p className="text-gray-600">{session.user.email}</p>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-2 text-sm text-red-600 hover:text-red-800"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
```

<!-- ADSENSE -->

## Step 10: Creating a Middleware for Multiple Protected Routes

For protecting multiple routes at once, create `middleware.ts` in your project root:

```typescript
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect these paths
  const protectedPaths = ["/dashboard", "/profile", "/settings"];
  const isPathProtected = protectedPaths.some((path) => 
    pathname.startsWith(path)
  );
  
  if (isPathProtected) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    
    // Redirect to login if user is not authenticated
    if (!token) {
      const url = new URL(`/auth/signin`, request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};
```

<!-- ADSENSE -->

## Advanced Security Practices

### Implementing Password Hashing

Install bcryptjs:

```bash
npm install bcryptjs @types/bcryptjs
```

Create a utility function in `utils/auth.ts`:

```typescript
import { hash, compare } from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12);
}

export async function verifyPassword(
  plainPassword: string, 
  hashedPassword: string
): Promise<boolean> {
  return await compare(plainPassword, hashedPassword);
}
```

### Implementing Rate Limiting

Install rate limiting packages:

```bash
npm install @upstash/redis @upstash/ratelimit
```

Create a rate limiter in your auth API:

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter that allows 5 requests per minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
});

// In your auth route handler
export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return new Response("Too many requests", { status: 429 });
  }
  
  // Continue with normal auth handling
}
```

<!-- ADSENSE -->

## Testing Your Authentication System

### Testing with Jest and React Testing Library

Install testing dependencies:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

Create a test for your SignIn component:

```typescript
// __tests__/SignIn.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '@/app/auth/signin/page';
import { signIn } from 'next-auth/react';

// Mock NextAuth
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  getProviders: jest.fn().mockResolvedValue({
    google: { id: 'google', name: 'Google' },
  }),
}));

// Mock Next Router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe('SignIn Page', () => {
  it('renders sign in form', async () => {
    render(<SignIn />);
    
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in with email/i })).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ error: null });
    
    render(<SignIn />);
    
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' },
    });
    
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /sign in with email/i }));
    
    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
```

<!-- ADSENSE -->

## Deploying Your Secure Application

### Deployment Checklist

Before deploying to production:

1. Update your environment variables on the production server
2. Set `NEXTAUTH_URL` to your production URL
3. Generate a new strong `NEXTAUTH_SECRET` for production
4. Configure proper CORS settings
5. Set up a database for persistance
6. Ensure all callback URLs in your OAuth providers are updated to your production domain
7. Implement HTTPS

### Vercel Deployment

To deploy to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in the Vercel dashboard
4. Deploy your application

## Common Problems and How to Fix Them

Even when following a guide step-by-step, you might run into some issues. Here are simple solutions to the most common problems:

### "My Login Isn't Working"

If you click login buttons and nothing happens or you get errors:

1. **Check Your Environment Variables**: Make sure your `.env.local` file has all the correct values and there are no typos
2. **Verify Redirect URLs**: Double-check that the callback URLs in Google and GitHub settings exactly match your app's URLs
3. **Look at Browser Console**: Press F12 in your browser and check the Console tab for error messages
4. **Check NextAuth Secret**: Make sure your NEXTAUTH_SECRET is set and doesn't contain any special characters

### "I Keep Getting Logged Out"

If your login doesn't stay active between page refreshes:

1. **Session Provider**: Make sure you've added the SessionProvider to your `layout.

<!-- ADSENSE -->

## Next Steps and Additional Features

### Implementing Email Verification

Add email verification using a verification token:

```typescript
// In your NextAuth configuration
callbacks: {
  async signIn({ user, account }) {
    // Allow OAuth sign-ins
    if (account?.provider !== "credentials") {
      return true;
    }
    
    // Connect to the database
    await dbConnect();
    
    // Check if email is verified for credentials
    const userDoc = await User.findOne(
      { email: user.email },
      { emailVerified: 1 }
    );
    
    return userDoc?.emailVerified ? true : "/auth/verify-email";
  },
},
```

### Adding Two-Factor Authentication

For enhanced security, implement 2FA using:

```bash
npm install otplib qrcode
```

## Conclusion

Congratulations! You've successfully implemented a robust authentication system in your Next.js application using NextAuth.js. This foundation gives you:

- Secure multi-provider authentication
- Protected routes on both client and server
- A customizable user experience
- Industry-standard security practices

Remember that security is an ongoing process. Keep your dependencies updated, follow security best practices, and consider implementing additional security measures as your application grows.

## Additional Resources

- [NextAuth.js Official Documentation](https://next-auth.js.org/)
- [Next.js Authentication Patterns](https://nextjs.org/docs/authentication)
- [OAuth 2.0 Security Best Practices](https://oauth.net/2/security-best-practices/)
- [Web Authentication API (WebAuthn)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

<!-- ADSENSE -->