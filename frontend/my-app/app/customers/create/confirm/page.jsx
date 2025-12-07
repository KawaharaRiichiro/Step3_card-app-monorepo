"use client";

import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./fetchCustomer";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

// ① useSearchParams を使う処理を別のコンポーネントに分離します
function ConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customer_id = searchParams.get("customer_id");
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (customer_id) {
      const fetchAndSetCustomer = async () => {
        try {
          const customerData = await fetchCustomer(customer_id);
          setCustomer(customerData);
        } catch (error) {
          console.error("Failed to fetch customer:", error);
        }
      };
      fetchAndSetCustomer();
    }
  }, [customer_id]);

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      <div className="alert alert-success p-4 text-center">
        正常に作成しました
      </div>
      {/* customerデータがある場合のみカードを表示 */}
      {customer && <OneCustomerInfoCard {...customer} />}
      <button onClick={() => router.push("./../../customers")}>
        <div className="btn btn-primary m-4 text-2xl">戻る</div>
      </button>
    </div>
  );
}

// ② メインコンポーネントで Suspense バウンダリを設定します
export default function ConfirmPage() {
  return (
    <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
      <ConfirmContent />
    </Suspense>
  );
}