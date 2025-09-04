"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Button,
} from "@mui/material";

const demoSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  companyName: z.string().min(2, "Company name is required"),
  companyEmail: z.string().email("Invalid company email"),
  sector: z.string().min(1, "Sector is required"),
  phone: z.string().min(7, "Phone number is required"),
  revenue: z.string().min(1, "Projected revenue is required"),
});

type DemoFormValues = z.infer<typeof demoSchema>;

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const sectors = [
  "Retail & Fashion",
  "Food & Beverage",
  "Health & Wellness",
  "Education & Training",
  "Professional Services",
  "Technology",
];

const revenueRanges = [
  "Less than $50,000",
  "$50,000 - $250,000",
  "$250,000 - $1M",
  "$1M - $5M",
  "$5M+",
];

export default function RequestDemoModal({ open, setOpen }: Props) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DemoFormValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
      companyEmail: "",
      sector: "",
      phone: "",
      revenue: "",
    },
  });

  const onSubmit = async (data: DemoFormValues) => {
    setIsSubmitting(true);

    try {
      console.log("Demo request submitted:", data);
      // TODO: integrate with emailjs / backend
      await new Promise((res) => setTimeout(res, 1500));

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setOpen(false);
        form.reset();
      }, 3000);
    } catch (error) {
      console.error("Failed to submit demo request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[80%] lg:w-[650px] p-6 z-50 relative">
            <h2 className="text-xl font-bold mb-2 text-[#09385F]">
              Request a Demo
            </h2>

            <p className="text-sm mb-4 text-gray-500">
              Fill the form below to request a demo.
            </p>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Full Name */}
              <TextField
                label="Full Name"
                variant="outlined"
                size="small"
                fullWidth
                error={!!form.formState.errors.fullName}
                helperText={form.formState.errors.fullName?.message}
                {...form.register("fullName")}
              />

              {/* Personal Email */}
              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                size="small"
                fullWidth
                error={!!form.formState.errors.email}
                helperText={form.formState.errors.email?.message}
                {...form.register("email")}
              />

              {/* Company Name */}
              <TextField
                label="Company Name"
                variant="outlined"
                size="small"
                fullWidth
                error={!!form.formState.errors.companyName}
                helperText={form.formState.errors.companyName?.message}
                {...form.register("companyName")}
              />

              {/* Company Email */}
              <TextField
                label="Company Email"
                type="email"
                variant="outlined"
                size="small"
                fullWidth
                error={!!form.formState.errors.companyEmail}
                helperText={form.formState.errors.companyEmail?.message}
                {...form.register("companyEmail")}
              />

              {/* Sector */}
              <FormControl fullWidth size="small">
                <InputLabel>Sector</InputLabel>
                <Select
                  {...form.register("sector")}
                  defaultValue=""
                  error={!!form.formState.errors.sector}
                >
                  {sectors.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
                {form.formState.errors.sector && (
                  <p className="text-red-600 text-sm mt-1">
                    {form.formState.errors.sector.message}
                  </p>
                )}
              </FormControl>

              {/* Phone Number */}
              <TextField
                label="Phone Number"
                type="tel"
                variant="outlined"
                size="small"
                fullWidth
                error={!!form.formState.errors.phone}
                helperText={form.formState.errors.phone?.message}
                {...form.register("phone")}
              />

              {/* Projected Annual Revenue */}
              <FormControl fullWidth size="small">
                <InputLabel>Projected Annual Revenue</InputLabel>
                <Select
                  {...form.register("revenue")}
                  defaultValue=""
                  error={!!form.formState.errors.revenue}
                >
                  {revenueRanges.map((r) => (
                    <MenuItem key={r} value={r}>
                      {r}
                    </MenuItem>
                  ))}
                </Select>
                {form.formState.errors.revenue && (
                  <p className="text-red-600 text-sm mt-1">
                    {form.formState.errors.revenue.message}
                  </p>
                )}
              </FormControl>

              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                className="w-full hover:bg-[#d6726e] text-white"
              >
                {isSubmitting ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Submit Request"
                )}
              </Button>
            </form>

            {/* Close button */}
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999] ">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl text-center">
            <CheckCircle2 size={48} className="text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-[#09385F]">
              Demo Request Sent!
            </h2>
            <p className="text-gray-600 mb-4">
              Our team will reach out to schedule your demo soon.
            </p>
            <Button variant="contained" onClick={() => setShowSuccess(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
