import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Fuel, User, Plus } from 'lucide-react'


const cars = [
  {
    id: 1,
    name: "Tesla",
    model: "Model 3",
    dealer: "ElectroDrive Rentals",
    fuelType: "Electric",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 2,
    name: "Toyota",
    model: "Camry",
    dealer: "Reliable Rides",
    fuelType: "Hybrid",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 3,
    name: "BMW",
    model: "X5",
    dealer: "Luxury Leases",
    fuelType: "Petrol",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 4,
    name: "Nissan",
    model: "Leaf",
    dealer: "Green Wheels",
    fuelType: "Electric",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 5,
    name: "Ford",
    model: "Mustang",
    dealer: "Classic Car Rentals",
    fuelType: "Petrol",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 6,
    name: "Honda",
    model: "Civic",
    dealer: "EconoRent",
    fuelType: "Hybrid",
    image: "/placeholder.svg?height=200&width=300"
  }
]

export default function CarRentalList() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="flex flex-col mb-4 md:mb-2 md:flex-row justify-between ">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Available Cars for Rent</h1>
        <Button> Add Car <Plus /> </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <Card key={car.id} className="overflow-hidden transition-shadow hover:shadow-lg">
            <img src={car.image} alt={`${car.name} ${car.model}`} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{car.name} {car.model}</span>
                <Badge variant="secondary" className="text-sm">
                  {car.fuelType}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <User className="w-4 h-4 mr-2" />
                <span>{car.dealer}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Fuel className="w-4 h-4 mr-2" />
                <span>{car.fuelType}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
