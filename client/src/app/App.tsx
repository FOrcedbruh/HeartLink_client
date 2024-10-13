import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { useAuthContext } from "../api/auth/authContext";
import Auth from "./components/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import CreateProfile from "./pages/Create/CreateProfile";
import Feed from "./pages/Feed/Feed";
import { PHandlers } from "../api/profiles/handlers";
import { useEffect, useState } from "react";


const App: React.FC = () => {

    const { authUser } = useAuthContext()



    return (
        <main className="main">
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={authUser ? <Feed /> : <Auth />}/>
                    <Route path="/me" element={<Profile />}/>
                </Route>
                <Route path="/me/create" element={<CreateProfile step={0} status="create"/>}/>
            </Routes>
        </main>
    )
}

export default App;