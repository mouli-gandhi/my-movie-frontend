import React from 'react'
import { Container , Form , Button, Row, Col } from 'react-bootstrap';
import { getAllActors , getMovieById , updateMovie } from '../utils/api';
import Header from './header' 
import AddActor from './addActor';

export default class AddMovie extends React.Component{
    constructor(props){
        super(props);
        let movieID = props.match.params.movieId ? props.match.params.movieId : null
        this.state={
            movieID , 
            name : '',
            dob : '',
            plot: '',
            actors : null,
            addActor : false,
            cast :  []
        }
        
    }
    getMovie = (movieID) => {
        getMovieById((data)=>{
            let cast = []
            data.message.cast.forEach(actor => {
                cast.push(actor._id);
            });
            this.setState({
                name : data.message.name,
                dob : data.message.release_date,
                plot : data.message.plot,
                cast,
            })
        },(err)=>{
            console.log(err)
        },movieID);
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
        this.getMovie(this.state.movieID);
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
            obj['id'] = this.state.movieID;
            obj['name'] = this.state.name;
            obj['release_date'] =this.state.dob;
            obj['cast'] =this.state.cast;
            Object.assign(obj, this.state.plot && {
                plot : this.state.plot
            })
            updateMovie((data)=>{
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
                                <p className="titleText">Edit Movie</p>
                            </h2>
                        </Col>
                    </Row>
                    <Form>
                        <Form.Label>Movie Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Movie Name" required onChange={(e)=>this.setState({ name : e.target.value})} defaultValue={this.state.name}/>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Plot</Form.Label>
                            <Form.Control as="textarea" onChange={(e)=>this.setState({ plot : e.target.value})} value={this.state.plot}/>
                        </Form.Group>
                        <Form.Label>Relaease Date</Form.Label>
                        <Form.Control type="date" placeholder="Release Date" required onChange={(e)=>this.setState({ dob : e.target.value})} defaultValue={this.state.dob ? new Date(this.state.dob).toISOString().substr(0,10) : ''}/>
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
                        <Button variant="primary" size="lg"  onClick={this.handleSubmit}> Submit</Button>
                    </Form>
                    <AddActor show={this.state.addActor} onHide={()=>{this.setState({addActor:false})}} success={()=>{this.getActors();this.setState({addActor:false})}}/>
            </Container>
            </div>
        )
    }


}