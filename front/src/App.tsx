import './assets/styles/App.css'
import './assets/styles/variable.css';
import { Routes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/AuthProvider';
import { ModalProvider } from './contexts/ModalProvider';
import { VarProvider } from './contexts/VarProvider';
import { ScrollToTopOnRouteChange } from './utils/utils.fonction';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from "./pages/HomePage";
import DashboardAdmin from './pages/DashBoardAdmin';
import Recipes from './pages/Recipes';
import ModalLoginBox from './components/Modals/ModalLoginBox/ModalLoginBox';
import ModalRegisterBox from './components/Modals/ModalRegisterBox/ModalRegisterBox';
import ModalProfilBox from './components/Modals/ModalProfilBox/ModalProfilBox';
import ModalMessageBox from './components/Modals/ModalMessageBox/ModalMessageBox';
import RecipeDetails from './pages/RecipeDetails';
import MyRecipes from './pages/MyRecipes';
import RecipeCreateForm from './pages/CreateRecipe';
import RecipeUpdateForm from './pages/UpdateRecipe';
import NotFound from './pages/404';
import MentionsLegales from './pages/Mentions';

export default function App() {  

  ScrollToTopOnRouteChange();
  
  return (
    <VarProvider>
      <ModalProvider>
        <AuthProvider>

          <div className='header_main'>
            <Header/>
            <main className="main">
              <Routes>
                <Route path="/" element={ <HomePage/> }/>
                <Route path="/recipes" element={ <Recipes/> }/>
                <Route path="/admin" element={ <DashboardAdmin/> }/>
                <Route path="/recipes/:id" element={ <RecipeDetails/> }/>
                <Route path="/mentions" element={ < MentionsLegales /> } />
                <Route path="/myRecipes" element={ <MyRecipes/> }/>
                <Route path="/createRecipe" element={ < RecipeCreateForm /> } />
                <Route path="/updateRecipe/:id" element={ < RecipeUpdateForm /> } />
                <Route path="/dashboard" element={ <DashboardAdmin/> }/>
                <Route path="/*" element={ < NotFound /> } />
              </Routes>
              
              {/* Modales */}
              <ModalLoginBox />
              <ModalRegisterBox />
              <ModalProfilBox />
              <ModalMessageBox />
    
            <ToastContainer position="top-left" />
            </main>
          </div>

          <Footer />
        </AuthProvider>
      </ModalProvider>
    </VarProvider>
  );
}
