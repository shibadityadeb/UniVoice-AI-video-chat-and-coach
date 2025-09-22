import * as BetterAuth from 'better-auth/react'

// The library may export the factory as a named export, a default, or as the module itself.
// Try a few shapes and ensure we end up with a callable function.
const ba = BetterAuth as unknown

let createAuthClientCandidate: unknown

if (typeof ba === 'function') {
	// module itself is the factory
	createAuthClientCandidate = ba
} else {
	const asObj = ba as { createAuthClient?: unknown; default?: unknown }
	createAuthClientCandidate = asObj.createAuthClient ?? asObj.default ?? ba
}

if (typeof createAuthClientCandidate !== 'function') {
	throw new Error(
		'better-auth/react: could not find a createAuthClient function export. Tried: createAuthClient (named), default, or module itself.'
	)
}

// Define the runtime shape we use from the auth client so TS can type-check calls.
type AuthClient = {
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

const createAuthClient = createAuthClientCandidate as (...args: unknown[]) => AuthClient

export const authClient: AuthClient = createAuthClient({})