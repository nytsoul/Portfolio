// Simple auth hook - authentication is handled by backend if needed
// For now, using demo data without authentication

export function useAuth() {
  // Placeholder for future authentication implementation
  return {
    isLoading: false,
    isAuthenticated: false,
    user: null,
    signIn: async () => {},
    signOut: async () => {},
  };
}
