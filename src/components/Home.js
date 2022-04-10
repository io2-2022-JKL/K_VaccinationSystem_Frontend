import {Link} from "react-router-dom";

function Home() {
    return (
        <>
            <main>
                <h2>Strona startowa</h2>
            </main>
            <nav>
                <Link to="/admin">Strona admina</Link>
                <br/>
                <Link to="/patient">Strona pacjenta</Link>
                <br/>
                <Link to="/doctor">Strona lekarza</Link>
            </nav>
        </>
    )
}

export default Home;