// AuthContext.tsx
import React, { createContext, useState } from "react";

export interface User {
  id: number;
  username: string;
  name: string;
}

interface AuthContextData {
  user: User | null;
  setUser: Function;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  setUser: () => {}
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
