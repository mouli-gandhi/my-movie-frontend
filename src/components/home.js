import React from 'react'
import { Container, Row, Col , Alert , Spinner , Card } from 'react-bootstrap';
import { getAllMovies } from '../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons'
import Header from './header' 


export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading : true,
            movies : null,
            error : null,
            editShow : false,
            editmovie : null
        }
      }
    componentWillMount(){
        getAllMovies((data)=>{
            this.setState({
                movies : data.message,
                loading : false
            })
        }, (err)=>{
            this.setState({
                error : err,
                loading : false
            })
        })
    }
    render(){
        return(
            <div>
                <Header />
                <Container>                           
                    <Row className="title">
                        <Col>
                            <h2>
                                <p className="titleText">Welcome to My Show Database!</p>
                            </h2>
                        </Col>
                    </Row>
                    {
                        this.state.loading && (
                            <Spinner animation="border" variant="primary" size="lg"/>
                        )
                    }
                    {
                        (this.state.movies && this.state.movies.length > 0) ? (
                        <Row>
                            {
                                this.state.movies.map((movie , idx) => {
                                    return (
                                            <Card key={idx} bg="light" style={{ width: '75rem' , margin : 5 }}>
                                                <Row>
                                                
                                                <Col md={4}>
                                                    <Card.Img variant="top" src="https://storage.googleapis.com/web-media-upload/category_placeholder-movie-production-theaters.png" style={{height:250 , width:300}} />
                                                </Col>
                                                    <Col md={8}>

                                                <Card.Body>
                                                <Card.Title className="mt-3">{`${movie.name} (${ new Date(movie.release_date).getFullYear()})`}</Card.Title>
                                                <Card.Text>
                                                    {movie.plot ? movie.plot : 'Plot not provided'} 
                                                </Card.Text>
                                                {
                                                    (movie.cast && movie.cast.length > 0)
                                                    &&
                                                    (
                                                        <div>
                                                            {
                                                                movie.cast.map((actor , id) => {
                                                                    return (
                                                                        <Card.Link key={id} href="#">{actor.name}</Card.Link>
                                                                    )
                                                                })
                                                            }
                                                            
                                                        </div>
                                                    )
                                                }
                                                </Card.Body>
                                                <div style={{position: 'absolute', right: '35px' ,top: '25px', zIndex:500}}>
                                                    <button style={{border:0 , backgroundColor:'#F8F9FA'}}>
                                                        <FontAwesomeIcon icon={faPen} onClick={()=>this.props.history.push(`/edit-movie/${movie._id}`)}/>  
                                                    </button>
                                                </div>
                                                    </Col>
                                                </Row>
                                            </Card>
                                    )
                                })
                            }
                        </Row>
                        )
                        :
                        ( this.state.movies &&  
                            <Card bg="light" style={{ width: '75rem' }}>
                                <Card.Body>
                                <Card.Title>No movies</Card.Title>
                                <Card.Text>
                                {" Its lonely here add some movies please :( "}
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    }
                    {
                    this.state.error && (    
                    <Alert variant="danger" dismissible>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                                {this.state.error && this.state.error.message}
                            </p>
                    </Alert>)
                    }
                    <div className="floating-menu" onClick={()=>this.props.history.push('/add-movie')}>
                        <div className="floating-menu-item">
                                <button className="floating-menu-icon">
                                    <FontAwesomeIcon icon={faPlus} />  
                                </button>
                            </div>
                    </div>   
                </Container>
               
            </div>
        )
    }


}