import { lazy, Suspense } from "react";

import { Routes, Route } from "react-router-dom";
const Feed = lazy(() => import("./pages/Feed/Feed"))
import Layout from "./components/Layout/Layout";
import { useAuthContext } from "../api/auth/authContext";
const Auth = lazy(() => import("./components/Auth/Auth"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const CreateProfile = lazy(() => import("./pages/Create/CreateProfile"))
const SupportPage = lazy(() => import("./pages/SupportPage/SupportPage"))
const SettingsPage = lazy(() => import("./pages/SettingsPage/SettingsPage"))
import { LoaderWindow } from "./components/Loader/Loader";


const App: React.FC = () => {

    const { authUser } = useAuthContext()



    return (
        <main className="main">
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={authUser ? <Suspense fallback={<LoaderWindow />}><Feed /></Suspense> : <Suspense fallback={<LoaderWindow />}><Auth /></Suspense>}/>
                    <Route path="/me" element={<Suspense fallback={<LoaderWindow />}><Profile /></Suspense>}/>
                    <Route path="/support" element={<Suspense fallback={<LoaderWindow />}><SupportPage /></Suspense>}/>
                    <Route path="/settings" element={<Suspense fallback={<LoaderWindow />}><SettingsPage /></Suspense>}/>
                </Route>
                <Route path="/me/create" element={<Suspense fallback={<LoaderWindow />}><CreateProfile step={0} status="create" /></Suspense>}/>
            </Routes>
        </main>
    )
}

export default App;