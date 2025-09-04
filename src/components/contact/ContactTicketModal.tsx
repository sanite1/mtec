"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, CircularProgress } from "@mui/material";
import { CheckCircle2 } from "lucide-react";

const ticketSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  description: z.string().min(5, "Description is required"),
});

type TicketFormValues = z.infer<typeof ticketSchema>;

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ContactTicketModal({ open, setOpen }: Props) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      description: "",
    },
  });

  const onSubmit = async (data: TicketFormValues) => {
    setIsSubmitting(true);

    try {
      // TODO: connect API/email service
      console.log("Ticket submitted:", data);

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setOpen(false);
        reset();
      }, 3000);
    } catch (error) {
      console.error("Ticket submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[80%] lg:w-[600px] p-6 relative">
            <h2 className="text-xl font-bold mb-2 text-[#09385F]">
              Contact via Ticket
            </h2>

            <p className="text-sm mb-4 text-gray-500">
              Fill the form below to create a ticket.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <TextField
                  fullWidth
                  size="small"
                  label="Full Name"
                  {...register("fullName")}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  size="small"
                  type="email"
                  label="Email Address"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  size="small"
                  label="Subject"
                  {...register("subject")}
                  error={!!errors.subject}
                  helperText={errors.subject?.message}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Description"
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </div>

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                className=" !text-white hover:!bg-[#d6726e] w-full"
              >
                {isSubmitting ? (
                  <CircularProgress size={22} />
                ) : (
                  "Submit Ticket"
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl text-center">
            <CheckCircle2 size={48} className="text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-[#09385F]">
              Ticket Submitted!
            </h2>
            <p className="text-gray-600 mb-4">
              Our support team will reach out to you soon.
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
