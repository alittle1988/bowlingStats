import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import useFetch from '../Hooks/useFetch';

function NewUserForm(props) {
    const {onNewUserClick} = props;
    const {post, results, loading} = useFetch('http://localhost:3000');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [goalAvg, setGoalAvg] = useState('');
    const [val, setVal] = useState(false);
    const [errorVal, setErrorVal] = useState('')

    function handleSubmitClick(e) {
        e.preventDefault()
        if(firstName === '') {
            setVal(true)
            return
        }
        const newUser = {
            fistName: firstName,
            lastName: lastName,
            userName: userName,
            goalAvg: goalAvg || 0,
            dateJoined: new Date().toDateString(),
            games: []
        }

        post(`/users`, newUser);
        
    }

    useEffect(() => {
        if(results) {
            if(results.error) {
                setErrorVal(results.error)
                setUserName('')
            } else {
                onNewUserClick()
            }
        }
    }, [results, onNewUserClick])
    
  return (
    <Form className='mt-5' onSubmit={handleSubmitClick}>
        <Form.Group>
            <Form.Label htmlFor='firstName' className='text-light'>First Name:</Form.Label>
            <Form.Control type='text' id='firstName' placeholder='Enter First Name' className='w-25' value={firstName} onChange={e => setFirstName(e.target.value)}></Form.Control>
            {val && firstName === '' ? <Form.Text className='text-danger'>Please Enter First Name!</Form.Text> : <div></div>}
        </Form.Group>
        <Form.Group>
            <Form.Label htmlFor='lastName' className='text-light'>Last Name: </Form.Label>
            <Form.Control type='text' id='lastName' placeholder='Enter Last Name' className='w-25' value={lastName} onChange={e => setLastName(e.target.value)}></Form.Control>
            {val && lastName === '' ? <Form.Text className='text-danger'>Please Enter Last Name!</Form.Text> : <div></div>}
        </Form.Group>
        <Form.Group>
            <Form.Label htmlFor='userName' className='text-light'>UserName:</Form.Label>
            <Form.Control type='text' id='userName' placeholder='Enter Username' className='w-25' value={userName} onChange={e => setUserName(e.target.value)}></Form.Control>
            {val && userName === '' ? <Form.Text className='text-danger'>Please Enter a UserName!</Form.Text> : <div></div>}
            {errorVal === "User already exists" ? <Form.Text className='text-danger'>{errorVal}</Form.Text> : <div></div>}
        </Form.Group>
        <Form.Group>
            <Form.Label htmlFor='goalAvg' className='text-light'>Goal Average:</Form.Label>
            <Form.Control type='number' min={0} max={300}  id='goalAvg' placeholder='Enter Goal Average' className='w-25' value={goalAvg} onChange={e => setGoalAvg(e.target.value)}></Form.Control>
        </Form.Group>
        <Row className='mt-4'>
            <Col lg={1}>
                <Button type='submit'>Submit</Button>
            </Col>
            <Col>
        <Button onClick={onNewUserClick}>Back to Login</Button>
            </Col>
        </Row>
    </Form>
  )
}

export default NewUserForm

NewUserForm.propTypes = {
    onNewUserClick: PropTypes.func
}

