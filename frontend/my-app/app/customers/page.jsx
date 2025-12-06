"use client";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import fetchCustomers from "./fetchCustomers";

export default function Page() {
  const [customerInfos, setCustomerInfos] = useState([]);

  useEffect(() => {
    const fetchAndSetCustomer = async () => {
      const customerData = await fetchCustomers();
      setCustomerInfos(customerData);
    };
    fetchAndSetCustomer();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      {" "}
      {/* 全体の背景を bg-gray-100 に変更し、カードの白を際立たせる */}
      <div className="max-w-6xl mx-auto">
        {" "}
        {/* コンテンツを中央寄せにし、最大幅を制限 */}
        {/* CREATEボタンセクション */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          {" "}
          {/* 余白、背景、角丸、影を調整 */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">顧客管理</h2>{" "}
          {/* タイトルを大きく (text-2xl -> text-3xl), 色を濃く */}
          <Link href="/customers/create" prefetch={false}>
            <button className="btn btn-primary w-full text-lg font-semibold">
              {" "}
              {/* 文字を太く (font-semibold を追加) */}
              + 新規顧客を作成
            </button>
          </Link>
        </div>

        {customerInfos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {" "}
            {/* カード間の隙間を広げる (gap-6 -> gap-8) */}
            {customerInfos.map((customerInfo, index) => (
              // ★★★ 顧客カード本体のスタイル変更 ★★★
              <div
                key={index}
                className="card bg-white rounded-xl shadow-xl hover:shadow-2xl border border-gray-200 transition-all duration-300 overflow-hidden" // 影を濃く(shadow-xl), 枠線(border)を追加, ホバー効果を強化
              >
                {/* ★ 修正点: OneCustomerInfoCard を呼び出す */}
                <OneCustomerInfoCard {...customerInfo} />

                {/* カード下部のボタン群 */}
                <div className="card-actions flex flex-col p-6 border-t border-gray-100 gap-3">
                  {" "}
                  {/* ボタン間の隙間を広げる (gap-2 -> gap-3) */}
                  <Link href={`/customers/read/${customerInfo.customer_id}`}>
                    <button className="btn btn-outline btn-info w-full text-base font-medium">
                      {" "}
                      {/* フォントサイズと太さを指定 */}
                      詳細を見る
                    </button>{" "}
                    {/* デザイン変更 */}
                  </Link>
                  <Link href={`/customers/update/${customerInfo.customer_id}`}>
                    <button className="btn btn-outline btn-success w-full text-base font-medium">
                      {" "}
                      {/* フォントサイズと太さを指定 */}
                      更新
                    </button>{" "}
                    {/* デザイン変更 */}
                  </Link>
                  <Link href={`/customers/delete/${customerInfo.customer_id}`}>
                    <button className="btn btn-outline btn-error w-full text-base font-medium">
                      {" "}
                      {/* フォントサイズと太さを指定 */}
                      削除
                    </button>{" "}
                    {/* デザイン変更 */}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-white rounded-lg shadow-md mt-6">
            {" "}
            {/* 余白を増やす */}
            <p className="text-gray-700 text-xl">顧客情報がありません。</p>{" "}
            {/* フォントサイズと色を調整 */}
            <p className="text-gray-500 mt-4">
              上記「新規顧客を作成」ボタンから登録してください。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

