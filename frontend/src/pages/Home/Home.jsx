import React ,{useState} from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { toast } from 'react-toastify';

const home = () => {

  const [category, setCategory] = useState("All");

  React.useEffect(() => {
    if (localStorage.getItem('loginSuccess') === 'true') {
      toast.success('Welcome! Enjoy the taste of our food!');
      toast.info("You have successfully logged in!");
      localStorage.removeItem('loginSuccess');
    }
  }, []);

  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} />
      <AppDownload/>
    </div>
  )
}

export default home