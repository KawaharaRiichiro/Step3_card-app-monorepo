export default function OneCustomerInfoCard({
  customer_id,
  customer_name,
  age,
  gender,
}) {
  return (
    // スタイルを調整 (背景色、影、フォント色)
    <div className="p-6 bg-yellow-50 shadow-inner">
      {" "}
      {/* 背景をブラウン系(yellow-50)にし、内側に影(shadow-inner)を追加 */}
      {/* 顧客名を大きく、太く */}
      <h3 className="text-2xl font-bold text-yellow-900 mb-3 truncate">
        {" "}
        {/* 文字色をブラウン系に変更 */}
        {customer_name}さん
      </h3>
      <div className="space-y-2">
        {" "}
        {/* 各行の間にスペースを少し追加 */}
        {/* ID、年齢、性別の文字を大きく */}
        <p className="text-yellow-800 text-base">
          {" "}
          {/* 文字色をブラウン系に変更 */}
          ID:{" "}
          <span className="font-semibold text-yellow-950 text-base">
            {" "}
            {/* 文字色を濃いブラウン系に変更 */}
            {customer_id}
          </span>
        </p>
        <p className="text-yellow-800 text-base">
          {" "}
          {/* 文字色をブラウン系に変更 */}
          年齢:{" "}
          <span className="font-semibold text-yellow-950 text-base">
            {" "}
            {/* 文字色を濃いブラウン系に変更 */}
            {age}
          </span>
        </p>
        <p className="text-yellow-800 text-base">
          {" "}
          {/* 文字色をブラウン系に変更 */}
          性別:{" "}
          <span className="font-semibold text-yellow-950 text-base">
            {" "}
            {/* 文字色を濃いブラウン系に変更 */}
            {gender}
          </span>
        </p>
      </div>
    </div>
  );
}

