import type React from "react";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
type ProviderProps = {
	children: React.ReactNode;
	session: Session | null;
};
const Provider = ({ children, session }: ProviderProps) => {
	return (
		    		<SessionProvider session={session}>
			{children}
		</SessionProvider>
	);
};

export default Provider;
