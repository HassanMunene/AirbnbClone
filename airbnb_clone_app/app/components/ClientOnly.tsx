'use client';
import { useState, useEffect } from 'react';

interface ClientOnly {
	children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnly> = ({children}) => {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		return null;
	}

	return (
		<>
			{children}
		</>
	)
}

export default ClientOnly;