import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

async function fetchCustomer(id) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers?customer_id=${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch customer");
  }
  return res.json();
}

export default async function ReadPage({ searchParams }) {
  // Next.js 15/16対応: searchParamsはPromiseなのでawaitが必要です
  const { id } = await searchParams;
  
  const customerInfo = await fetchCustomer(id);

  return (
    <>
      <div className="alert alert-success">更新しました</div>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        {/* APIは単一のオブジェクトを返すため、[0]は不要です。直接展開します */}
        <OneCustomerInfoCard {...customerInfo} />
      </div>
      <button className="btn btn-outline btn-accent">
        <a href="/customers">一覧に戻る</a>
      </button>
    </>
  );
}