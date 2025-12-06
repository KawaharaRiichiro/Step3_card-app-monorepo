"use client";
import { useEffect, useState, useRef, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import fetchCustomer from "./fetchCustomer";
import updateCustomer from "./updateCustomer";

export default function UpdatePage(props) {
  const params = use(props.params);
  const router = useRouter();
  const id = params.id;
  const formRef = useRef();
  
  // ★ 修正: 初期値を [] から null に変更
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    const fetchAndSetCustomer = async () => {
      const customerData = await fetchCustomer(id);
      // ★ 修正: APIは配列ではなくオブジェクトで返す想定 (fetchCustomerの実装による)
      // もしAPIが配列 (例: [{...}]) で返す場合は customerData[0] にしてください
      setCustomerInfo(customerData); 
    };
    fetchAndSetCustomer();
  }, [id]); // ★ 修正: 依存配列に id を追加

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    await updateCustomer(formData);
    router.push(`./${formData.get("customer_id")}/confirm`);
  };

  // ★ 修正: データ読み込み中はローディング画面を表示
  if (!customerInfo) {
    return (
      <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    // ページ全体のレイアウトを調整 (作成ページと合わせる)
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* フォームコンポーネントのデザイン (作成ページのデザインを適用) */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="p-6 bg-yellow-50 shadow-inner rounded-lg space-y-4"
        >
          {/* フォームのタイトル */}
          <h2 className="text-2xl font-bold text-yellow-900 mb-6 border-b border-yellow-200 pb-2">
            顧客情報の更新
          </h2>

          {/* 各入力フィールド */}
          <div>
            <label className="label">
              <span className="label-text text-yellow-900 font-semibold text-base">
                Customer ID (編集不可)
              </span>
            </label>
            <input
              type="text"
              name="customer_id"
              // ★ 修正: customerInfo から直接 defaultValue を設定
              defaultValue={customerInfo.customer_id}
              className="input input-bordered w-full text-lg bg-gray-200 text-gray-700" // IDは編集不可
              readOnly 
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-yellow-900 font-semibold text-base">
                名前
              </span>
            </label>
            <div className="flex items-center">
              <input
                type="text"
                name="customer_name"
                defaultValue={customerInfo.customer_name}
                className="input input-bordered flex-1 text-lg bg-white" // ★ 修正: w-full を flex-1 に、bg-white を追加
                required 
              />
              <span className="ml-2 text-xl text-yellow-900">さん</span>
            </div>
          </div>

          <div>
            <label className="label">
              <span className="label-text text-yellow-900 font-semibold text-base">
                年齢
              </span>
            </label>
            <input
              type="number"
              name="age"
              defaultValue={customerInfo.age}
              className="input input-bordered w-full text-lg bg-white" 
              required
              min="0"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-yellow-900 font-semibold text-base">
                性別
              </span>
            </label>
            <input
              type="text"
              name="gender"
              defaultValue={customerInfo.gender}
              className="input input-bordered w-full text-lg bg-white"
              required
            />
          </div>

          {/* ★★★ ボタンの配置を修正 ★★★ */}
          <div className="flex justify-between items-center pt-6">
            <button
              type="button" // フォーム送信を防ぐために type="button" を指定
              className="btn btn-outline text-lg" // DaisyUIのスタイル
              onClick={() => router.push('/customers')} // router.push でページ遷移
            >
              キャンセル
            </button>
            <button type="submit" className="btn btn-primary text-lg">
              更新
            </button>
          </div>
          {/* ★★★ 修正完了 ★★★ */}

        </form>
      </div>
    </div>
  );
}

