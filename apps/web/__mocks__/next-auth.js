// Mock for next-auth package
export const getServerSession = jest.fn();
export const getSession = jest.fn();
export const useSession = jest.fn(() => ({
  data: null,
  status: "unauthenticated",
}));
export const signIn = jest.fn();
export const signOut = jest.fn();
export const SessionProvider = ({ children }) => children;
export default {
  getServerSession,
  getSession,
  useSession,
  signIn,
  signOut,
  SessionProvider,
};

