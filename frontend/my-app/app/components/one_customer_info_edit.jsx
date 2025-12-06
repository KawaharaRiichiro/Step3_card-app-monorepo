export default function OneCustomerInfoEdit({
  customer_id,
  customer_name,
  age,
  gender,
}) {
  return (
    // スタイルを調整 (UIのトーンをブラウン系に合わせる)
    // このコンポーネントは <form> タグの内側で使われることを想定しています
    <div className="p-6 bg-yellow-50 shadow-inner rounded-lg">
      <div className="card-body space-y-4">
        {" "}
        {/* 各要素の間隔を調整 */}
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
              defaultValue={customer_name}
              className="input input-bordered w-full text-lg" // フォントサイズを大きく
            />
            <span className="ml-2 text-xl text-yellow-900">さん</span>
          </div>
        </div>

        <div>
          <label className="label">
            <span className="label-text text-yellow-900 font-semibold text-base">
              Customer ID
            </span>
          </label>
          {/* IDは編集不可 (readonly) にし、見た目を調整 */}
          <input
            type="text"
            name="customer_id"
            defaultValue={customer_id}
            className="input input-bordered w-full text-lg bg-gray-100 text-gray-700"
            readOnly
          />
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
            defaultValue={age}
            className="input input-bordered w-full text-lg" // フォントサイズを大きく
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
            defaultValue={gender}
            className="input input-bordered w-full text-lg" // フォントサイズを大きく
          />
        </div>
      </div>
      {/* 「更新」ボタンは、このコンポーネントを呼び出す親 (page.jsx) の
        <form> タグの一部として配置するのが適切です。
        そのため、このコンポーネントからはボタンを削除しました。
      */}
    </div>
  );
}

