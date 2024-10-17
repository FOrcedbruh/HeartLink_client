import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { useAuthContext } from "../api/auth/authContext";
import Auth from "./components/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import CreateProfile from "./pages/Create/CreateProfile";
import Feed from "./pages/Feed/Feed";
import SupportPage from "./pages/SupportPage/SupportPage";


const App: React.FC = () => {

    const { authUser } = useAuthContext()



    return (
        <main className="main">
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={authUser ? <Feed /> : <Auth />}/>
                    <Route path="/me" element={<Profile />}/>
                    <Route path="/support" element={<SupportPage />}/>
                </Route>
                <Route path="/me/create" element={<CreateProfile step={0} status="create"/>}/>
            </Routes>
        </main>
    )
}

export default App;