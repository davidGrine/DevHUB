import Header from '@/components/header/Header'
import Sidebar from '@/components/sidebar/Sidebar'
import { type PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren<unknown>) {

	return (
		<div>
			<Header />
			<Sidebar />
			{children}
		</div>
	)
}
