import React from 'react'
import {  Form,  Button, Row, Col , Modal} from 'react-bootstrap';
import { createActor } from '../utils/api';

export default class AddMovie extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name : '',
            dob : '',
            gender : '',
            bio : ''
        }
    }
    handleSubmit = ()=> {
        let obj = {}
        if(this.state.name && this.state.gender){
            obj['name'] =this.state.name;
            obj['sex'] =this.state.gender;
            Object.assign(obj, this.state.bio && {
                bio : this.state.bio
            },
            this.state.dob && {
                dob : this.state.dob
            })
            createActor((data)=>{
                console.log(data)
                this.props.success();
            },
            (err)=>{
                console.log(err);
            }, obj);
        }
        else
            alert("Please fill required fields")
    }
    render(){
        return(
            <Modal show={this.props.show} size="lg"      
                aria-labelledby="contained-modal-title-vcenter"
                centered 
                onHide={this.props.onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Actor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                Name
                                </Form.Label>
                                <Col sm={10}>
                                <Form.Control type="text" placeholder="Name" required onChange={(e)=>this.setState({ name : e.target.value})}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                Date of Birth
                                </Form.Label>
                                <Col sm={10}>
                                <Form.Control type="date" placeholder="Date of birth" onChange={(e)=>this.setState({ dob : e.target.value})}/>
                                </Col>
                            </Form.Group>
                            <fieldset onChange={(e)=>this.setState({gender:e.target.id})}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={2}>
                                    Sex
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Check name="gender" inline label="Male" type={'radio'} id={`Male`} />
                                        <Form.Check name="gender" inline label="Female" type={'radio'} id={`Female`} />
                                        <Form.Check name="gender" inline label="Others" type={'radio'} id={`Others`} />
                                    </Col>
                                </Form.Group>
                            </fieldset>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Bio
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control as="textarea" rows="3" onChange={(e)=>this.setState({ bio : e.target.value})}/>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>
                            Cancel
                        </Button>
                        <Button type="submit" onClick={this.handleSubmit}variant="primary" >
                            Add
                        </Button>
                    </Modal.Footer>
            </Modal>
)
    }


}