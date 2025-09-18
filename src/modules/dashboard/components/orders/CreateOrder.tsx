"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import SelectProductsDialog from "./SelectProductsDialog";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PlusCircle, Save } from "lucide-react";

// Zod schema
const orderSchema = z.object({
  customer: z.string().optional(),
  currency: z.string(),
  salesChannel: z.string(),
  orderDate: z.string(),
  products: z.array(z.string()).optional(),
  paymentStatus: z.string(),
  paymentMethod: z.string().optional(),
  terminalPayment: z.string().optional(),
  notes: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

export default function CreateOrderPage() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      currency: "NGN",
      salesChannel: "Physical Sale",
      paymentStatus: "Paid",
    },
  });

  const paymentStatus = watch("paymentStatus");

  const onSubmit = (data: OrderFormData) => {
    console.log("Order Submitted:", data);
  };

  const [selectedProducts, setSelectedProducts] = useState<
    { id: string; name: string; price: string }[]
  >([]);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8 border border-gray-100">
        <div className="mb-8 border-b border-gray-200 pb-4">
          <div className="flex items-start">
            <button
              onClick={() => navigate("/orders")}
              className="p-2 rounded bg-gray-100 hover:bg-gray-200 relative mr-3"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="">
              <h1 className="text-3xl font-bold text-gray-800">
                Create New Order
              </h1>
              <p className="text-gray-500 mt-1">
                Fill out the details below to register a new order.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Customer & Currency */}
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Order Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="customer"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Select Customer</InputLabel>
                    <Select {...field} label="Select Customer">
                      <MenuItem value="">-- No Customer --</MenuItem>
                      <MenuItem value="customer1">John Doe</MenuItem>
                      <MenuItem value="customer2">Jane Smith</MenuItem>
                      <MenuItem value="customer3">Collins Sanni</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />

              <Controller
                name="currency"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Choose Currency</InputLabel>
                    <Select {...field} label="Choose Currency">
                      <MenuItem value="NGN">₦ NGN</MenuItem>
                      <MenuItem value="USD">$ USD</MenuItem>
                      <MenuItem value="EUR">€ EUR</MenuItem>
                      <MenuItem value="GBP">£ GBP</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </div>
          </section>

          {/* Sales Channel & Date */}
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Sales Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="salesChannel"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Sales Channel</InputLabel>
                    <Select {...field} label="Sales Channel">
                      <MenuItem value="Physical Sale">Physical Sale</MenuItem>
                      <MenuItem value="Online Sale">Online Sale</MenuItem>
                      <MenuItem value="POS">POS</MenuItem>
                      <MenuItem value="Marketplace">Marketplace</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />

              <Controller
                name="orderDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="date"
                    label="Order Date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.orderDate}
                    helperText={errors.orderDate?.message}
                  />
                )}
              />
            </div>
          </section>

          {/* Products */}
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Products
            </h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setOpenDialog(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-white border-purple-600 text-purple-600 font-medium "
              >
                Select Products
              </button>
              <button
                onClick={() => navigate("/products/create")}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700"
              >
                <PlusCircle size={20} />
                New Product
              </button>
            </div>
            {/* Selected Products Display */}
            {selectedProducts.length > 0 && (
              <div className="mt-4 space-y-2">
                {selectedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <span className="font-medium text-gray-800">{p.name}</span>
                    <span className="text-sm text-gray-600">{p.price}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Payment */}
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Payment
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <Controller
                name="paymentStatus"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <FormControlLabel
                      value="Paid"
                      control={<Radio />}
                      label="Paid"
                    />
                    <FormControlLabel
                      value="Unpaid"
                      control={<Radio />}
                      label="Unpaid"
                    />
                    <FormControlLabel
                      value="Partially Paid"
                      control={<Radio />}
                      label="Partially Paid"
                    />
                  </RadioGroup>
                )}
              />

              {paymentStatus !== "Unpaid" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Payment Method</InputLabel>
                        <Select {...field} label="Payment Method">
                          <MenuItem value="">-- Select Method --</MenuItem>
                          <MenuItem value="Bank Transfer">
                            Bank Transfer
                          </MenuItem>
                          <MenuItem value="Cash">Cash</MenuItem>
                          <MenuItem value="Credit/Debit Card">
                            Credit/Debit Card
                          </MenuItem>
                          <MenuItem value="Mobile Money">Mobile Money</MenuItem>
                          <MenuItem value="POS">POS</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />

                  <Controller
                    name="terminalPayment"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Terminal Payment</InputLabel>
                        <Select {...field} label="Terminal Payment">
                          <MenuItem value="">-- Select Payment --</MenuItem>
                          <MenuItem value="terminal1">POS Terminal 1</MenuItem>
                          <MenuItem value="terminal2">POS Terminal 2</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </div>
              )}
            </div>
          </section>

          {/* Notes */}
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Additional Notes
            </h2>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Enter any additional notes here..."
                />
              )}
            />
          </section>

          {/* Submit */}
          <div className="pt-6">
            <button
              type="submit"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700"
            >
              <Save size={20} />
              Save Order
            </button>
          </div>
        </form>
      </div>

      {/* Product Selection Dialog */}
      <SelectProductsDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={(selected) => setSelectedProducts(selected)}
      />
    </div>
  );
}
