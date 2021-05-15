import React from 'react'
import Layout from '../Layout'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Inertia } from '@inertiajs/inertia'
import { useForm } from '@inertiajs/inertia-react'
import { Chart } from 'react-google-charts'

export default function Index ({ social }) {
	const { data, setData } = useForm({
		facebook: social.facebook,
		google: social.google,
		twitter: social.twitter,
		linkedin: social.linkedin,
		instagram: social.instagram
	})

	const ChartCustom = (props) => {
		const data = [
			['Social', 'Value'],
			['Facebook', parseInt(props.facebook)],
			['Google', parseInt(props.google)],
			['Twitter', parseInt(props.twitter)],
			['Instagram', parseInt(props.instagram)],
			['Linkedin', parseInt(props.linkedin)]
		]

		return (
			<Chart
				width={'inherit'}
				height={'400px'}
				chartType={'PieChart'}
				loader={<div>Loading Data...</div>}
				data={data}
				options={{ title: 'Wykres' }}
				rootProps={{ 'data-testid': '1' }}
			/>
		)
	}

	function handleSubmit (e) {
		e.preventDefault()
		Inertia.post('/charts/save', data)
	}

	return (
		<Layout title="Index">
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formFacebook">
					<Form.Label>Facebook</Form.Label>
					<Form.Control type="number" value={data.facebook} onChange={e => setData('facebook', e.target.value)}/>
				</Form.Group>
				<Form.Group controlId="formGoogle">
					<Form.Label>Google</Form.Label>
					<Form.Control type="number" value={data.google} onChange={e => setData('google', e.target.value)} />
				</Form.Group>
				<Form.Group controlId="formInstagram">
					<Form.Label>Instagram</Form.Label>
					<Form.Control type="number" value={data.instagram} onChange={e => setData('instagram', e.target.value)} />
				</Form.Group>
				<Form.Group controlId="formTwitter">
					<Form.Label>Twitter</Form.Label>
					<Form.Control type="number" value={data.twitter} onChange={e => setData('twitter', e.target.value)} />
				</Form.Group>
				<Form.Group controlId="formLinkedin">
					<Form.Label>Linkedin</Form.Label>
					<Form.Control type="number" value={data.linkedin} onChange={e => setData('linkedin', e.target.value)} />
				</Form.Group>
				<Button variant="primary" type="submit">
					Zapisz
				</Button>
			</Form>
			<ChartCustom facebook={data.facebook} google={data.google} instagram={data.instagram} twitter={data.twitter} linkedin={data.linkedin} />
		</Layout>
	)
}
