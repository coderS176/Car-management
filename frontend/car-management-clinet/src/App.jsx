import { Route, Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import SignIn from "./pages/Signin";
import CarRentalList from "./pages/CarRentalList";
import AddCarForm from "./pages/AddCarForm";
import EditCarForm from "./pages/EditCarForm";

const CAR_DATA = {
  id: '1',
  carType: 'sedan',
  fuelType: 'petrol',
  company: 'Toyota',
  model: 'Camry',
  year: '2022',
  price: '50.00',
  dealerName: 'ABC Motors',
  mileage: '15000',
  images: [
    { id: '1', url: '/placeholder.svg?height=200&width=300' },
    { id: '2', url: '/placeholder.svg?height=200&width=300' },
    { id: '3', url: '/placeholder.svg?height=200&width=300' },
  ]
};

export function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/list" element={<CarRentalList />} />
      <Route path="/add" element={<AddCarForm />} />
      <Route path="/edit" element={<EditCarForm car={CAR_DATA} />} />
    </Routes>
  )
}

export default App;