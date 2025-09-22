declare module 'better-auth/react' {
  export function useAuth(): unknown
  export const AuthProvider: unknown
  export const authClient: unknown
  export type SignInOptions = unknown
  export type SignUpOptions = unknown
  export interface SignInResult { user?: unknown; error?: unknown }
  export interface SignUpResult { user?: unknown; error?: unknown }
  export const __esModule: boolean
  export default function createAuthClient(opts?: unknown): {
    useSession: () => { data?: { user?: { name?: string } } | null }
    signUp: {
      email: (
        payload: { email?: string; name?: string; password?: string },
        callbacks?: { onSuccess?: () => void; onError?: (p?: { error?: unknown }) => void }
      ) => Promise<unknown>
    }
    signIn: {
      email: (
        payload: { email?: string; password?: string },
        callbacks?: { onSuccess?: () => void; onError?: (p?: { error?: unknown }) => void }
      ) => Promise<unknown>
    }
    signOut: () => void
  }
}
