import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { useAuthContext } from "../api/auth/authContext";
import Auth from "./components/Auth/Auth";



const App: React.FC = () => {

    const { authUser } = useAuthContext()

    return (
        <main className="main">
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={authUser ? <>Auth</> : <Auth />}/>
                </Route>
            </Routes>
        </main>
    )
}

export default App;