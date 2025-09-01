import { Container } from "react-bootstrap";
import NavHeader from "./NavHeader";
import { Outlet } from "react-router";

function DefaultLayout(props) {

    return(
        <>
        <NavHeader handleLogout={props.handleLogout}/>
        <Container fluid className="mt-4">
            <Outlet/>
        </Container>
        </>
    )
}

export default DefaultLayout;