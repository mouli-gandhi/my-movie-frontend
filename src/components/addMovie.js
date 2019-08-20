import React from 'react'
import { Container , Form,  Button, Row, Col } from 'react-bootstrap';
import { getAllActors , createMovie } from '../utils/api';
import Header from './header' 
import AddActor from './addActor';

export default class AddMovie extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name : '',
            dob : '',
            plot:'',
            actors : null,
            addActor : false,
            cast : []
        }
    }
    getActors = ()=>{
        getAllActors((data) => {
            this.setState({
                actors : data.message
            })
        }, (err)=>{
            console.log(err)
        });
    }
    componentWillMount(){
        this.getActors();
    }

    handleActorName = (e) => {
        if(e.target.value){
            getAllActors((data) => {
                this.setState({
                    actors : data.message
                })
            }, (err)=>{
                console.log(err)
            },e.target.value);
        }
        else{
            getAllActors((data) => {
                this.setState({
                    actors : data.message
                })
            }, (err)=>{
                console.log(err)
            });
        }
    }

    handleActorSelect = (e)=> {
        let id = e.target.id;
        let index = this.state.cast.indexOf(id);
        if (index === -1) {
            let tempArray = [...this.state.cast];
            tempArray.push(id);
            this.setState({
                cast: tempArray
            })
        } else {
            let tempArray = [...this.state.cast];
            tempArray.splice(index, 1);
            this.setState({
                cast: tempArray
            })
        }
    }

    handleSubmit = ()=> {
        let obj = {}
        if(this.state.name && this.state.dob && this.state.cast.length > 0){
            obj['name'] =this.state.name;
            obj['release_date'] =this.state.dob;
            obj['cast'] =this.state.cast;
            Object.assign(obj, this.state.plot && {
                plot : this.state.plot
            })
            createMovie((data)=>{
              
                this.props.history.push('/');
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
            <div>
            <Header />
            <Container>
                <Row className="title">
                        <Col>
                            <h2>
                                <p className="titleText">Add Movie</p>
                            </h2>
                        </Col>
                    </Row>
                    <Form>
                        <Form.Label>Movie Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Movie Name" required onChange={(e)=>this.setState({ name : e.target.value})}/>
                        <Form.Label>Relaease Date</Form.Label>
                        <Form.Control type="date" placeholder="Release Date" required onChange={(e)=>this.setState({ dob : e.target.value})}/>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Plot</Form.Label>
                            <Form.Control as="textarea" rows="3" onChange={(e)=>this.setState({ plot : e.target.value})}/>
                        </Form.Group>  
                        <Form.Label>Cast</Form.Label> 
                        <Form.Control type="text" placeholder="Search for actor" onChange={this.handleActorName}/>  
                        {
                            this.state.actors && (
                                <Form.Group style={{marginTop:15}}>
                                    { 
                                      this.state.actors.map((actor) => {
                                        return(
                                            <Form.Check 
                                                type={'checkbox'}
                                                checked={this.state.cast.indexOf(actor._id) !== -1 }
                                                key={actor._id}
                                                onChange={this.handleActorSelect}
                                                id={`${actor._id}`}
                                                label={`${actor.name}`}
                                            />
                                        )
                                    }) 
                        
                                    }
                                </Form.Group>
                            )
                        }  
                        <Form.Group>
                            <Button variant="info"  onClick={()=>this.setState({addActor : true})}>Add new Actor</Button>  
                        </Form.Group>
                        <Button variant="primary" size="lg" type="submit" onClick={this.handleSubmit}> Submit</Button>
                    </Form>
                    <AddActor show={this.state.addActor} onHide={()=>{this.setState({addActor:false})}} success={()=>{this.getActors();this.setState({addActor:false})}}/>
            </Container>
            </div>
        )
    }


}