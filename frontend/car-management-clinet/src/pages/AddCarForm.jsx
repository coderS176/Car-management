'use client'

import { useState, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { X } from 'lucide-react'

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  carType: z.string().min(1, { message: "Car type is required" }),
  fuelType: z.string().min(1, { message: "Fuel type is required" }),
  company: z.string().min(1, { message: "Company is required" }),
  model: z.string().min(1, { message: "Model is required" }),
  year: z.string().regex(/^\d{4}$/, { message: "Year must be a 4-digit number" }),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Price must be a valid number" }),
  dealerName: z.string().min(1, { message: "Dealer name is required" }),
  mileage: z.string().regex(/^\d+$/, { message: "Mileage must be a valid number" }),
  images: z
    .array(z.instanceof(File))
    .refine((files) => files.length <= 10, "You can only upload up to 10 images.")
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      `Each file size should be less than 5MB.`
    )
    .refine(
      (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
})

export default function AddCarForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImages, setPreviewImages] = useState([])
  const fileInputRef = useRef(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carType: "",
      fuelType: "",
      company: "",
      model: "",
      year: "",
      price: "",
      dealerName: "",
      mileage: "",
      images: [],
    },
  })

  function onSubmit(values) {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      console.log(values)
      toast({
        title: "Car added successfully",
        description: `${values.company} ${values.model} has been added to the inventory.`,
      })
      form.reset()
      setPreviewImages([])
    }, 2000)
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || [])
    form.setValue('images', files)
    setPreviewImages(files.map(file => URL.createObjectURL(file)))
  }

  const removeImage = (index) => {
    const newImages = form.getValues('images').filter((_, i) => i !== index)
    form.setValue('images', newImages)
    setPreviewImages(previewImages.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex justify-center items-center">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Add New Car</CardTitle>
          <CardDescription className="text-center">Enter the details of the new car to add to the rental inventory.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Car Images</FormLabel>
                    <FormControl>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                            >
                              <span>Upload images</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                multiple
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                accept=".jpg, .jpeg, .png, .webp"
                              />
                            </label>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">Only .jpg, .jpeg, .png and .webp files up to 5MB</p>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Add images for the car listing. Maximum of 10 images allowed.
                    </FormDescription>
                    <FormMessage />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {previewImages.map((src, index) => (
                        <div key={index} className="relative">
                          <img src={src} alt={`Preview ${index}`} className="h-20 w-20 object-cover rounded-lg" />
                          <button
                            type="button"
                            className="absolute top-0 right-0 p-1 bg-white rounded-full text-red-600"
                            onClick={() => removeImage(index)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting} type="submit" className="w-full">
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" onClick={() => form.reset()}>
            Reset Form
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
