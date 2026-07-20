"use server";

import { z } from "zod";

// Base schema for validation
const assessmentSchema = z.object({
  serviceType: z.enum(["residential", "facility"]),
  name: z.string().min(2, "Nama terlalu pendek"),
  whatsapp: z.string().min(9, "Nomor tidak valid"),
  email: z.string().email("Email tidak valid"),
  city: z.string().min(2, "Kota harus diisi"),
  // Note: in a real app this schema would be much more detailed and exhaustive
  budget: z.string().optional(),
  description: z.string().optional(),
});

export async function submitAssessment(formData: FormData) {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    const rawData = Object.fromEntries(formData.entries());
    const data = assessmentSchema.parse(rawData);
    
    // In a real implementation, you would save this to Supabase via repository pattern
    // e.g. await AssessmentRepository.save(data);
    
    // Generate simulated reference
    const timestamp = new Date().getTime().toString().slice(-4);
    const reference = `TGK-2026-${timestamp}`;
    
    return { success: true, reference };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, message: "Terjadi kesalahan internal. Silakan coba lagi." };
  }
}
