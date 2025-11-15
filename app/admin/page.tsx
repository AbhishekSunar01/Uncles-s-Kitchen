"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useState } from "react";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";

// Define the schema for food items
const foodItemSchema = z.object({
  foodName: z.string().min(2, {
    message: "Food name must be at least 2 characters.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number.",
  }),
});

export default function AddFoodItemForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Initialize the form
  const form = useForm<z.infer<typeof foodItemSchema>>({
    resolver: zodResolver(foodItemSchema),
    defaultValues: {
      foodName: "",
      price: "",
    },
  });

  // Convert image to base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file.");
        return;
      }

      // Validate file size (max 1MB for base64 storage)
      if (file.size > 1 * 1024 * 1024) {
        toast.error("Please select an image smaller than 1MB.");
        return;
      }

      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  // Submit handler to add food item to Firebase
  async function onSubmit(values: z.infer<typeof foodItemSchema>) {
    if (!selectedImage) {
      toast.error("Please select an image for the food item.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert image to base64
      const base64Image = await convertToBase64(selectedImage);

      // Create food item object
      const foodItem = {
        foodName: values.foodName,
        price: parseFloat(values.price),
        image: base64Image, // Store as base64
        imageType: selectedImage.type,
        createdAt: new Date().toISOString(),
      };

      // Add document to Firestore
      const docRef = await addDoc(collection(db, "foodItems"), foodItem);

      console.log("Document written with ID: ", docRef.id);

      // Show success toast
      toast.success("Food item added successfully.");

      // Reset form and image
      form.reset();
      removeImage();
    } catch (error) {
      console.error("Error adding document: ", error);

      // Show error toast
      toast.error("Failed to add food item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Food Item</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="foodName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Food Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Butter Chicken" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the name of the food item.
                </FormDescription>
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
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="e.g., 12.99"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the price in USD (or your currency).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <div className="space-y-2">
            <FormLabel>Food Image *</FormLabel>

            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <span className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to 1MB
                  </p>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            ) : (
              <div className="relative">
                <div className="relative w-full h-64 rounded-lg overflow-hidden border">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  <X className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>
            )}
            <FormDescription>
              Upload an image of the food item (max 1MB). Stored directly in
              Firestore.
            </FormDescription>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Adding..." : "Add Food Item"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
