import React from 'react'
import { Navbar , Nav , Form, FormControl, Button} from 'react-bootstrap';

export default class AddMovie extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name : ''
        }
    }

render(){
    return(
        <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="/">My Movie</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#top-rated">Top Rated</Nav.Link>
                <Nav.Link href="#watchlist">Watchlist</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-light">Search</Button>
                </Form>
        </Navbar>
    )
}


}