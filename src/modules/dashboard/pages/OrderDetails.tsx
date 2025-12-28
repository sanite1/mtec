import React, { useState } from "react";
import { ArrowLeft, Edit, Share, Trash2, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCancelOrder,
  useOrderById,
  useRequestPayment,
  useUpdateOrderStatus,
  useUpdatePaymentStatus,
} from "../lib/api/orders";

import OrderInfo from "../components/orderDetails/OrderInfo";
import OrderAddress from "../components/orderDetails/OrderAddress";
import OrderItems from "../components/orderDetails/OrderItems";
import OrderBadges from "../components/orderDetails/OrderBadges";
import PaymentSummary from "../components/orderDetails/PaymentSummary";
import PaymentStatusCard from "../components/orderDetails/PaymentStatusCard";
import ShippingCard from "../components/orderDetails/ShippingCard";
import CancelOrderModal from "../components/orders/CancelOrderModal";
import EditOrderStatusModal from "../components/orders/EditOrderStatusModal";
import EditPaymentStatusModal from "../components/orders/EditPaymentStatusModal";
import RequestPaymentModal from "../components/orders/RequestPaymentModal";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openCancel, setOpenCancel] = useState(false);

  const { data: order, isLoading, refetch } = useOrderById(id as string);

  const [showCancelModal, setShowCancelModal] = useState(false);

  const [showStatusModal, setShowStatusModal] = useState(false);

  const [showPaymentStatusModal, setShowPaymentStatusModal] = useState(false);
  const [showRequestPaymentModal, setShowRequestPaymentModal] = useState(false);

  const { mutateAsync: cancelOrder, isPending } = useCancelOrder();
  const { mutateAsync: updateStatus, isPending: updateStatusPending } =
    useUpdateOrderStatus();
  const {
    mutateAsync: updatePaymentStatus,
    isPending: loadingUpdatePaymentStatus,
  } = useUpdatePaymentStatus();
  const { mutateAsync: requestPayment, isPending: loadingRequestPayment } =
    useRequestPayment();

  const handleCancel = async () => {
    try {
      await cancelOrder(order?._id as string, {
        onSuccess: () => setShowCancelModal(false),
      });
      refetch();
      //   onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusUpdate = async (
    newStatus: "pending" | "completed" | "cancelled",
  ) => {
    try {
      await updateStatus(
        { id: order?._id as string, status: newStatus },
        {
          onSuccess: () => setShowStatusModal(false),
        },
      );

      refetch();
      setShowStatusModal(false);
      //   onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePaymentStatusUpdate = async (data: {
    paymentStatus: "unpaid" | "paid" | "refunded";
  }) => {
    try {
      await updatePaymentStatus(
        { id: order?._id as string, paymentStatus: data.paymentStatus },
        {
          onSuccess: () => setShowPaymentStatusModal(false),
        },
      );
    } catch (error) {
      console.error(error);
    }

    refetch();
    setShowPaymentStatusModal(false);
    // onClose();
  };

  const handleRequestPayment = async () => {
    try {
      await requestPayment(
        { id: order?._id as string },
        {
          onSuccess: () => setShowRequestPaymentModal(false),
        },
      );
    } catch (error) {
      console.error(error);
    }

    refetch();
    setShowRequestPaymentModal(false);
    // onClose();
  };

  if (isLoading) return <div className="p-8">Loading...</div>;
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="block md:flex items-center justify-between mb-6 space-y-6 md:space-y-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/orders")}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300 relative mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>

          <h1 className="text-2xl font-bold">#{order?.orderNumber}</h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            //   onClick={() => setShowCancelModal(true)}
            className="flex items-center px-4 py-2 border border-purple-600 text-purple-600 text-sm rounded hover:bg-purple-50"
          >
            <Share className="w-4 h-4 mr-2" /> Share Order
          </button>
          <button
            onClick={() => setShowCancelModal(true)}
            className="flex items-center px-4 py-2 border border-red-600 text-red-600 text-sm rounded hover:bg-red-50"
          >
            <X className="w-4 h-4 mr-2" /> Cancel Order
          </button>
          {/* <button
            className="px-4 py-2 rounded-md bg-white border shadow-sm text-sm hover:bg-red-50"
          >
            Cancel Order
          </button> */}
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: main cards (spans 8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Big header card: order number, badges, channel/customer */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                {/* <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold">
                    Order #{order?.orderNumber}
                  </h2>
                  <OrderBadges order={order} />
                </div> */}

                <p className="text-md text-gray-500 mt-2">
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(order?.createdAt || "").toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"></div>
            <OrderInfo
              order={order}
              setShowPaymentStatusModal={setShowPaymentStatusModal}
              setShowRequestPaymentModal={setShowRequestPaymentModal}
            />
          </div>

          {/* Products card */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Products ({order?.items?.length ?? 0})
              </h3>
            </div>

            <OrderItems items={order?.items} />
          </div>
        </div>

        {/* Right: stacked cards (spans 4) */}
        <div className="lg:col-span-4 space-y-4">
          <PaymentSummary order={order} />

          {/* <PaymentStatusCard order={order} /> */}

          <ShippingCard order={order} refetch={refetch} />
        </div>
      </div>
      {showCancelModal && (
        <CancelOrderModal
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleCancel}
          loading={isPending}
          currentStatus={order?.status || ""}
        />
      )}
      {showStatusModal && (
        <EditOrderStatusModal
          onClose={() => setShowStatusModal(false)}
          onConfirm={handleStatusUpdate}
          loading={updateStatusPending}
          previousStatus={order?.status as any}
        />
      )}

      {showPaymentStatusModal && (
        <EditPaymentStatusModal
          onClose={() => setShowPaymentStatusModal(false)}
          onConfirm={handlePaymentStatusUpdate}
          currentStatus={order?.paymentStatus as any}
          orderId={order?.orderNumber}
          loading={loadingUpdatePaymentStatus}
        />
      )}

      {showRequestPaymentModal && (
        <RequestPaymentModal
          onClose={() => setShowRequestPaymentModal(false)}
          onConfirm={handleRequestPayment}
          currentStatus={order?.paymentStatus as any}
          orderId={order?.orderNumber}
          loading={loadingRequestPayment}
        />
      )}
    </div>
  );
}
