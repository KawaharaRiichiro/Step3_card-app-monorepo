"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Linkをインポート

import createCustomer from "./createCustomer";

export default function CreatePage() {
  const formRef = useRef();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    await createCustomer(formData);
    router.push(`./create/confirm?customer_id=${formData.get("customer_id")}`);
  };

  return (
    // ページ全体のレイアウトを調整 (一覧ページと合わせる)
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* フォームコンポーネントのデザイン (edit.jsxのデザインを適用) */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="p-6 bg-yellow-50 shadow-inner rounded-lg space-y-4"
        >
          {/* フォームのタイトル */}
          <h2 className="text-2xl font-bold text-yellow-900 mb-6 border-b border-yellow-200 pb-2">
            新規顧客の作成
          </h2>

          {/* 各入力フィールド (edit.jsxのレイアウトを参考に) */}
          <div>
            <label className="label">
              <span className="label-text text-yellow-900 font-semibold text-base">
                Customer ID
              </span>
            </label>
            <input
              type="text"
              name="customer_id"
              placeholder="C001"
              className="input input-bordered w-full text-lg bg-white" // ★ 修正: bg-white を追加
              required // IDは必須
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
                placeholder="桃太郎"
                className="input input-bordered flex-1 text-lg bg-white" // ★ 修正: w-full を flex-1 に、bg-white を追加
                required // 名前も必須
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
              placeholder="30"
              className="input input-bordered w-full text-lg bg-white" // ★ 修正: bg-white を追加
              required // 年齢も必須
              min="0" // マイナス値の入力を禁止
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
              placeholder="女"
              className="input input-bordered w-full text-lg bg-white" // ★ 修正: bg-white を追加
              required // 性別も必須
            />
          </div>

          {/* ボタンの配置 */}
          <div className="flex justify-between items-center pt-6">
            <Link href="/customers">
              <span className="btn btn-ghost text-gray-700">
                キャンセル
              </span>
            </Link>
            <button type="submit" className="btn btn-primary text-lg">
              作成
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

