"use server";
import { revalidatePath } from "next/cache";

const createCustomer = async (formData) => {
  const creating_customer_name = formData.get("customer_name");
  const creating_customer_id = formData.get("customer_id");
 
  let creating_age = parseInt(formData.get("age"));
  if (isNaN(creating_age)) {
    creating_age = 0; // 空欄または無効な数値の場合は 0 を設定する
  }
  const creating_gender = formData.get("gender");

 

  const body_msg = JSON.stringify({
    customer_name: creating_customer_name,
    customer_id: creating_customer_id,
    age: creating_age,
    gender: creating_gender,
  });

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body_msg,
  });
  if (!res.ok) {
    // ★★★ デバッグコードを追加 ★★★
    // FastAPIが返したエラーの「中身」をターミナルに出力します
    try {
      const errorResponse = await res.json();
      console.error("FastAPI Error Response:", errorResponse);
    } catch (e) {
      console.error("Failed to parse error response:", await res.text());
    }
    // ★★★★★★★★★★★★★★★
    throw new Error("Failed to create customer");
  }

  revalidatePath(`/customers`);
};

export default createCustomer;
