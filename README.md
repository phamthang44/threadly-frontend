# Threadly Frontend

A modern social media platform frontend built with Next.js, TypeScript, and Redux. Threadly allows users to share thoughts, connect with others, and engage in threaded conversations.

## 🚀 Tech Stack

### Core Framework

- **Next.js 16.0.7** - React framework with App Router
- **React 19.2.1** - UI library
- **TypeScript 5** - Type safety

### State Management

- **Redux Toolkit 2.10.1** - State management
- **Redux Persist 6.0.0** - State persistence
- **React Redux 9.2.0** - React bindings

### Styling & UI

- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Styled Components 6.1.19** - CSS-in-JS
- **Framer Motion 12.23.24** - Animation library
- **Lucide React 0.553.0** - Icon library
- **Font Awesome 7.1.0** - Icon library

### Forms & Validation

- **React Hook Form 7.66.1** - Form management
- **Yup 1.7.1** - Schema validation
- **@hookform/resolvers 5.2.2** - Form resolvers

### HTTP Client

- **Axios 1.13.2** - HTTP client with interceptors

### Theme

- **next-themes 0.4.6** - Dark/light mode support

### Other Libraries

- **react-scrollbars-custom 4.1.1** - Custom scrollbars
- **tailwind-scrollbar** - Scrollbar utilities

---

## 📁 Project Structure

```
threadly-frontend/
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth route group
│   │   │   ├── login/                # Login page
│   │   │   ├── signup/               # Signup page
│   │   │   ├── otp-verify/           # OTP verification page
│   │   │   └── complete-profile/     # Profile completion page
│   │   ├── [username]/                # Dynamic user routes
│   │   │   └── post/[postId]/        # User post pages
│   │   ├── thread/[id]/              # Thread detail pages
│   │   ├── profile/[id]/             # User profile pages
│   │   ├── search/                   # Search pages
│   │   ├── messages/                 # Messages page
│   │   ├── notifications/            # Notifications page
│   │   ├── saved/                    # Saved posts page
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                   # Home page
│   │
│   ├── components/                   # Shared components
│   │   ├── ui/                       # UI component library
│   │   │   ├── atoms/                # Basic components (Button, Input, Avatar, etc.)
│   │   │   ├── molecules/            # Composite components (Card, Spinner, Tooltip)
│   │   │   └── organisms/            # Complex components (ActionMenu, LightBox)
│   │   ├── layout/                    # Layout components
│   │   │   ├── Layout.tsx             # Main layout wrapper
│   │   │   ├── LayoutDesktop.tsx      # Desktop layout
│   │   │   └── LayoutMobile.tsx       # Mobile layout
│   │   ├── modals/                    # Modal components
│   │   ├── AuthInitializer.tsx       # Auth state initializer
│   │   └── TimeAgo.tsx                # Time formatting component
│   │
│   ├── features/                     # Feature-based modules
│   │   ├── auth/                     # Authentication feature
│   │   │   ├── components/           # Auth components (LoginForm, SignUpForm, etc.)
│   │   │   ├── hooks/                # Auth hooks (useAuthLogin, useAuthSignup, etc.)
│   │   │   ├── services/             # Auth API services
│   │   │   └── types/                # Auth type definitions
│   │   ├── feed/                     # Feed feature
│   │   ├── thread/                   # Thread feature
│   │   ├── profile/                  # Profile feature
│   │   ├── search/                   # Search feature
│   │   ├── header/                   # Header feature
│   │   ├── navigation/               # Navigation feature
│   │   ├── notifications/            # Notifications feature
│   │   ├── likes/                    # Likes feature
│   │   └── follows/                  # Follows feature
│   │
│   ├── lib/                          # Utilities & configurations
│   │   ├── axiosClient.ts            # Configured Axios instance
│   │   ├── tokenStorage.ts           # Token storage utilities
│   │   ├── scrollbar.ts              # Scrollbar utilities
│   │   └── types/                    # API type definitions
│   │       └── api.types.ts          # ApiResult types
│   │
│   ├── store/                        # Redux store
│   │   ├── index.ts                  # Store configuration
│   │   ├── authSlice.ts              # Auth state slice
│   │   └── hooks.ts                  # Typed Redux hooks
│   │
│   ├── providers/                    # Context providers
│   │   └── ReduxProvider.tsx         # Redux provider wrapper
│   │
│   ├── hooks/                        # Shared React hooks
│   │   ├── useIsMobile.ts            # Mobile detection hook
│   │   ├── useMediaQuery.ts          # Media query hook
│   │   └── useTimeAgo.ts             # Time formatting hook
│   │
│   ├── utils/                        # Utility functions
│   │   ├── contentFormatter.tsx      # Content formatting
│   │   ├── numberFormatter.ts        # Number formatting
│   │   ├── timeFormatter.ts          # Time formatting
│   │   └── mockData.ts               # Mock data utilities
│   │
│   ├── styles/                       # Global styles
│   │   ├── globals.css               # Global CSS
│   │   ├── cssvars.css               # CSS variables
│   │   ├── cssvars2.css              # Additional CSS variables
│   │   └── scrollbar.css             # Scrollbar styles
│   │
│   └── types/                        # Global TypeScript types
│
├── public/                           # Static assets
│   ├── threadly-icon.png            # App icon
│   ├── manifest.json                 # PWA manifest
│   └── ...                           # Other static files
│
├── .env.local                        # Environment variables (create this)
├── next.config.js                    # Next.js configuration
├── tailwind.config.js               # Tailwind configuration
├── package.json                      # Dependencies
└── README.md                         # This file
```

---

## ✨ Features

### 🔐 Authentication

- **Multiple Login Methods**
  - Username/Email + Password login
  - OTP (One-Time Password) via email
  - Instagram OAuth integration (planned)
- **Token Management**
  - Access token stored in localStorage
  - Refresh token via httpOnly cookies
  - Automatic token refresh on app load
  - Global 401 error handling with auto-logout
- **Protected Routes**
  - Route protection hooks
  - Automatic redirect to login when unauthorized
- **User Registration**
  - Multi-step registration flow
  - Profile completion after registration
  - OTP verification

### 🎨 UI/UX Features

- **Responsive Design**
  - Mobile-first approach
  - Desktop and mobile layouts
  - Adaptive navigation
- **Theme Support**
  - Dark/Light mode
  - System theme detection
  - Theme persistence
- **Custom Scrollbars**
  - Styled scrollbars
  - Smooth scrolling
- **Animations**
  - Framer Motion animations
  - Smooth transitions
  - Loading states

### 📱 Pages & Routes

- **Home Feed** - Main content feed
- **Thread Detail** - Individual thread view
- **User Profile** - User profile pages
- **Search** - Search functionality
- **Messages** - Direct messaging
- **Notifications** - User notifications
- **Saved Posts** - Bookmarked content

### 🛠️ Developer Features

- **Type Safety**
  - Full TypeScript coverage
  - Type definitions for API responses
  - Typed Redux hooks
- **State Management**
  - Redux Toolkit for global state
  - Redux Persist for state persistence
  - Feature-based state slices
- **API Client**
  - Configured Axios instance
  - Request/Response interceptors
  - Automatic token injection
  - Error handling
- **Code Organization**
  - Feature-based architecture
  - Atomic design pattern (atoms/molecules/organisms)
  - Separation of concerns

---

## 🔧 Setup & Installation

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd threadly-frontend
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Create environment file**
   Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

4. **Run development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

---

## 🔑 Environment Variables

| Variable              | Description          | Default                 | Required |
| --------------------- | -------------------- | ----------------------- | -------- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:8080` | Yes      |

Create a `.env.local` file in the root directory with your configuration.

---

## 🏗️ Architecture Overview

### State Management

The app uses **Redux Toolkit** with **Redux Persist** for state management:

- **Auth State** (`store/authSlice.ts`)
  - User information
  - Access token
  - Authentication status
  - Persisted: `user`, `isAuthenticated`

### API Client

Configured Axios client (`lib/axiosClient.ts`) with:

- **Base URL** from environment variable
- **Request Interceptor**: Automatically adds Bearer token to requests
- **Response Interceptor**:
  - Extracts data from `ApiResult<T>` structure
  - Handles 401 errors globally
  - Redirects to login on unauthorized access

### Authentication Flow

1. **Login**: User submits credentials
2. **Token Storage**: Access token saved to localStorage and Redux
3. **Auto Refresh**: Token refreshed on app load if needed
4. **Request Interceptor**: Token automatically added to API requests
5. **401 Handling**: Auto-logout and redirect on token expiration

### Token Storage

Tokens are stored in multiple locations for redundancy:

1. **localStorage** (primary) - Access token
2. **httpOnly Cookies** - Refresh token (set by backend)
3. **Redux Store** - Access token (for state management)

---

## 📚 Key Components

### Authentication Components

- **`LoginView`** - Main login interface with multiple login methods
- **`LoginForm`** - Username/password login form
- **`OTPEmailFlow`** - OTP verification flow
- **`SignUpForm`** - User registration form
- **`CompleteProfile`** - Profile completion after registration

### Layout Components

- **`Layout`** - Main layout wrapper
- **`LayoutDesktop`** - Desktop-specific layout
- **`LayoutMobile`** - Mobile-specific layout
- **`Header`** - Application header
- **`Sidebar`** - Navigation sidebar

### UI Components

Following atomic design pattern:

- **Atoms**: Basic building blocks (Button, Input, Avatar, Icons)
- **Molecules**: Composite components (Card, Spinner, Tooltip)
- **Organisms**: Complex components (ActionMenu, LightBox)

---

## 🎣 Custom Hooks

### Authentication Hooks

- **`useAuthLogin`** - Handle user login
- **`useAuthSignup`** - Handle user registration
- **`useLoginRequired`** - Protect routes requiring authentication
- **`useOTPTimer`** - OTP countdown timer

### Utility Hooks

- **`useIsMobile`** - Detect mobile devices
- **`useMediaQuery`** - Media query hook
- **`useTimeAgo`** - Format time relative to now

### Redux Hooks

- **`useAppDispatch`** - Typed dispatch hook
- **`useAppSelector`** - Typed selector hook

---

## 🔌 API Integration

### API Client Usage

```typescript
import axiosClient from "@/lib/axiosClient";

// The client automatically:
// - Adds Bearer token to requests
// - Extracts data from ApiResult responses
// - Handles 401 errors globally

const response = await axiosClient.post("/api/v1/auth/login", credentials);
// response.data contains the actual data (not wrapped in ApiResult)
// response.meta contains pagination/metadata if available
```

### API Response Structure

All API responses follow the `ApiResult<T>` structure:

```typescript
interface ApiResult<T> {
  data?: T;
  meta?: ApiMeta;
  error?: ApiErrorDetail;
}
```

The axios client automatically extracts the `data` field from responses.

---

## 🎨 Styling

### Tailwind CSS

The project uses Tailwind CSS for styling with custom configuration.

### CSS Variables

Global CSS variables are defined in `styles/cssvars.css` and `styles/cssvars2.css` for theming.

### Custom Scrollbars

Custom scrollbar styles are defined in `styles/scrollbar.css` and utilities in `lib/scrollbar.ts`.

---

## 🧪 Development Guidelines

### Code Organization

- **Feature-based**: Organize code by feature, not by type
- **Atomic Design**: UI components follow atoms/molecules/organisms pattern
- **Separation of Concerns**: Keep business logic, UI, and API calls separate

### TypeScript

- Use TypeScript for all new files
- Define types for API responses
- Use typed Redux hooks

### State Management

- Use Redux for global state
- Use local state for component-specific state
- Persist only necessary state (user, isAuthenticated)

### API Calls

- Use the configured `axiosClient` for all API calls
- Create service files in feature directories
- Handle errors appropriately

---

## 📝 Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

---

## 🐛 Known Issues & TODOs

See [AUTHENTICATION_AUDIT.md](./AUTHENTICATION_AUDIT.md) for detailed authentication implementation status and recommended fixes.

### Current Status

- ✅ Core architecture in place
- ✅ Authentication infrastructure ready
- ⚠️ Some integration fixes needed (see audit document)

---

## 📄 License

[Add your license here]

---

## 👥 Contributors

[Add contributors here]

---

## 📞 Support

For issues and questions, please open an issue in the repository.

---

**Built with ❤️ using Next.js and TypeScript**
