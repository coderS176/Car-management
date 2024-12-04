/* eslint-disable react/prop-types */
import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'

import * as z from 'zod'

import { Button } from "@/components/ui/button"

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { Input } from "@/components/ui/input"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { toast } from "@/hooks/use-toast"

import { X } from 'lucide-react'



const formSchema = z.object({

  carType: z.string({required_error: "Car type is required"}),

  fuelType: z.string({required_error: "Fuel type is required"}),

  company: z.string({required_error: "Company is required"}),

  model: z.string({required_error: "Model is required"}),

  year: z.string().regex(/^\d{4}$/, { message: "Year must be a 4-digit number" }),

  price: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Price must be a valid number" }),

  dealerName: z.string({required_error: "Dealer name is required"}),

  mileage: z.string().regex(/^\d+$/, { message: "Mileage must be a valid number" }),

})




export default function EditCarForm({ car }) {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [images, setImages] = useState(car.images)



  const form = useForm({

    resolver: zodResolver(formSchema),

    defaultValues: {

      carType: car.carType,

      fuelType: car.fuelType,

      company: car.company,

      model: car.model,

      year: car.year,

      price: car.price,

      dealerName: car.dealerName,

      mileage: car.mileage,

    },

  })



  function onSubmit(values) {

    setIsSubmitting(true)

    // Simulate API call

    setTimeout(() => {

      setIsSubmitting(false)

      console.log(values)

      console.log('Remaining images:', images)

      toast({

        title: "Car updated successfully",

        description: `${values.company} ${values.model} has been updated in the inventory.`,

      })

    }, 2000)

  }



  const removeImage = (id) => {

    setImages(images.filter(img => img.id !== id))

  }



  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex justify-center items-center">

      <Card className="w-full max-w-3xl">

        <CardHeader>

          <CardTitle className="text-2xl font-bold text-center">Edit Car</CardTitle>

          <CardDescription className="text-center">Update the details of the car in the rental inventory.</CardDescription>

        </CardHeader>

        <CardContent>

          <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit, (errors) => {

              console.error(errors)

              toast({

                title: "Error",

                description: "Please check the form for errors.",

                variant: "destructive",

              })

            })} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <FormField

                  control={form.control}

                  name="carType"

                  render={({ field }) => (

                    <FormItem>

                      <FormLabel>Car Type</FormLabel>

                      <Select onValueChange={field.onChange} defaultValue={field.value}>

                        <FormControl>

                          <SelectTrigger>

                            <SelectValue placeholder="Select car type" />

                          </SelectTrigger>

                        </FormControl>

                        <SelectContent>

                          <SelectItem value="sedan">Sedan</SelectItem>

                          <SelectItem value="suv">SUV</SelectItem>

                          <SelectItem value="hatchback">Hatchback</SelectItem>

                          <SelectItem value="coupe">Coupe</SelectItem>

                          <SelectItem value="truck">Truck</SelectItem>

                        </SelectContent>

                      </Select>

                      <FormMessage />

                    </FormItem>

                  )}

                />

                <FormField

                  control={form.control}

                  name="fuelType"

                  render={({ field }) => (

                    <FormItem>

                      <FormLabel>Fuel Type</FormLabel>

                      <Select onValueChange={field.onChange} defaultValue={field.value}>

                        <FormControl>

                          <SelectTrigger>

                            <SelectValue placeholder="Select fuel type" />

                          </SelectTrigger>

                        </FormControl>

                        <SelectContent>

                          <SelectItem value="petrol">Petrol</SelectItem>

                          <SelectItem value="diesel">Diesel</SelectItem>

                          <SelectItem value="electric">Electric</SelectItem>

                          <SelectItem value="hybrid">Hybrid</SelectItem>

                        </SelectContent>

                      </Select>

                      <FormMessage />

                    </FormItem>

                  )}

                />

                <FormField

                  control={form.control}

                  name="company"

                  render={({ field }) => (

                    <FormItem>

                      <FormLabel>Company</FormLabel>

                      <FormControl>

                        <Input placeholder="Enter company name" {...field} />

                      </FormControl>

                      <FormMessage />

                    </FormItem>

                  )}

                />

                <FormField

                  control={form.control}

                  name="model"

                  render={({ field }) => (

                    <FormItem>

                      <FormLabel>Model</FormLabel>

                      <FormControl>

                        <Input placeholder="Enter model name" {...field} />

                      </FormControl>

                      <FormMessage />

                    </FormItem>

                  )}

                />

                <FormField

                  control={form.control}

                  name="year"

                  render={({ field }) => (

                    <FormItem>

                      <FormLabel>Year</FormLabel>

                      <FormControl>

                        <Input placeholder="Enter year (e.g., 2023)" {...field} />

                      </FormControl>

                      <FormMessage />

                    </FormItem>

                  )}

                />

                <FormField

                  control={form.control}

                  name="price"

                  render={({ field }) => (

                    <FormItem>

                      <FormLabel>Price</FormLabel>

                      <FormControl>

                        <Input placeholder="Enter price per day" {...field} />

                      </FormControl>

                      <FormMessage />

                    </FormItem>

                  )}

                />

                <FormField

                  control={form.control}

                  name="dealerName"

                  render={({ field }) => (

                    <FormItem>

                      <FormLabel>Dealer Name</FormLabel>

                      <FormControl>

                        <Input placeholder="Enter dealer name" {...field} />

                      </FormControl>

                      <FormMessage />

                    </FormItem>

                  )}

                />

                <FormField

                  control={form.control}

                  name="mileage"

                  render={({ field }) => (

                    <FormItem>

                      <FormLabel>Mileage</FormLabel>

                      <FormControl>

                        <Input placeholder="Enter mileage" {...field} />

                      </FormControl>

                      <FormMessage />

                    </FormItem>

                  )}

                />

              </div>

              <div>

                <h3 className="text-lg font-semibold mb-2">Car Images</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                  {images.map((image) => (

                    <div key={image.id} className="relative">

                      <img src={image.url} alt="Car" className="w-full h-32 object-cover rounded-md" />

                      <button

                        type="button"

                        onClick={() => removeImage(image.id)}

                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"

                        aria-label="Remove image"

                      >

                        <X size={16} />

                      </button>

                    </div>

                  ))}

                </div>

              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>

                {isSubmitting ? "Updating Car..." : "Update Car"}

              </Button>

            </form>

          </Form>

        </CardContent>

      </Card>

    </div>

  )

}