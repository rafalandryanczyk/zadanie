import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Layout ({ title, children }) {
	useEffect(() => {
		document.title = title
	}, [title])

	return (
		<main>
			<Container>
				<page>{children}</page>
			</Container>
		</main>
	)
}
