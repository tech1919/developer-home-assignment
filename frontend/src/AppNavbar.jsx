import { Navbar, Nav } from 'react-bootstrap';

export default function AppNavbar() {

    return (
        <Navbar bg="dark" variant="dark" className="mb-4">
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/tasks">Tasks</Nav.Link>
                <Nav.Link href="/groups">Groups</Nav.Link>
            </Nav>
        </Navbar>)

}