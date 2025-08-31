import { Container } from "react-bootstrap";
import NavHeader from "./NavHeader";
import { Outlet } from "react-router";

function DefaultLayout() {

    return(
        <>
        <NavHeader/>
        <Container fluid className="mt-4">
            <Outlet/>
        </Container>
        </>
    )
}

export default DefaultLayout;