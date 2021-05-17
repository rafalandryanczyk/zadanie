import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Inertia } from '@inertiajs/inertia'
import { useForm, usePage } from '@inertiajs/inertia-react'
import { Chart } from 'react-google-charts'

export default function Index () {
	const { errors, inputs, socials } = usePage().props
	const socialsForm = Object.assign({}, ...Object.entries({ ...socials }).map(([k, item]) => ({ [item.name]: item.value })))
	const { data, setData } = useForm(socialsForm)

	const ModalCustom = (props) => {
		const { validation, inputs } = props
		const [show, setShow] = useState(false)
		const [clickedClose, setClickedClose] = useState(false)

		const handleClose = () => {
			setClickedClose(true)
			setShow(false)
		}
		const handleShow = () => setShow(true)
		const { data, setData } = useForm({
			name: inputs.name,
			value: inputs.value
		})

		function createSource (e) {
			e.preventDefault()
			Inertia.post('/charts/createSource', data)
		}

		useEffect(() => {
			if ((validation.name !== undefined || validation.value !== undefined) && !clickedClose) {
				setShow(true)
			}
		})

		const buttonCss = {
			margin: '10px 0px'
		}

		return (
			<div>
				<Button style={buttonCss} variant="primary" onClick={handleShow}>
					Dodaj źródło danych
				</Button>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Dodaj źródło danych</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={createSource}>
							<Form.Group controlId="formSource">
								<Form.Label>Źródło danych</Form.Label>
								<Form.Control type="text" value={data.name} onChange={e => setData('name', e.target.value)}/>
								{validation.name}
							</Form.Group>
							<Form.Group controlId="formValue">
								<Form.Label>Wartość</Form.Label>
								<Form.Control type="number" value={data.value} onChange={e => setData('value', e.target.value)} />
								{validation.value}
							</Form.Group>
						</Form>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Zamknij
						</Button>
						<Button variant="primary" onClick={createSource}>
							Zapisz
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}

	function deleteSource (e, id) {
		e.preventDefault()
		Inertia.delete('/charts/deleteSource/' + id)
	}

	const deleteButtonStyle = {
		'margin-left': '10px'
	}

	const socialInputs = socials.map(item => (
		<div key={item.id}>
			<Form.Group controlId={item.name}>
				<Form.Label>{item.name}</Form.Label>
				<button style={deleteButtonStyle} className="btn" onClick={e => deleteSource(e, item.id)} href="#">Usuń</button>
				<input type="number" className="form-control" value={(data[item.name]) ? data[item.name] : item.value } onChange={e => setData(item.name, e.target.value)} />
			</Form.Group>
		</div>
	))

	const dataChart = []
	dataChart.push(['Social', 'Value'])
	socials.forEach(item => {
		dataChart.push([item.name, parseInt(item.value)])
	})

	console.log(dataChart)

	function handleSubmit (e) {
		e.preventDefault()
		Inertia.post('/charts/save', data)
	}

	return (
		<Layout title="Index">
			<ModalCustom validation={errors} inputs={inputs} />
			<Form onSubmit={handleSubmit}>
				{socialInputs}
				<Button variant="primary" type="submit">
					Zapisz
				</Button>
			</Form>
			<Chart
				width={'inherit'}
				height={'400px'}
				chartType={'PieChart'}
				loader={<div>Loading Data...</div>}
				data={dataChart}
				options={{ title: 'Wykres' }}
				rootProps={{ 'data-testid': '1' }}
			/>
		</Layout>
	)
}
