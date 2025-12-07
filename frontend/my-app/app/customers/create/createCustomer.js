"use server";
import { revalidatePath } from "next/cache";

const createCustomer = async (formData) => {
  const creating_customer_name = formData.get("customer_name");
  const creating_customer_id = formData.get("customer_id");
  
  // ★ログ出力: 処理開始と入力値
  console.log(`[CreateCustomer] Start. ID: ${creating_customer_id}, Name: ${creating_customer_name}`);

  let creating_age = parseInt(formData.get("age"));
  if (isNaN(creating_age)) {
    creating_age = 0; 
  }
  const creating_gender = formData.get("gender");

  const body_msg = JSON.stringify({
    customer_name: creating_customer_name,
    customer_id: creating_customer_id,
    age: creating_age,
    gender: creating_gender,
  });

  // ★ログ出力: 環境変数とURLの確認
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  console.log(`[CreateCustomer] Environment Variable Check: ${endpoint}`);
  
  // URLの組み立て
  const url = `${endpoint}/customers`;
  console.log(`[CreateCustomer] Fetching URL: ${url}`);

  try {
    // キャッシュを無効化して確実にリクエストを送る
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body_msg,
      cache: "no-store", 
    });

    // ★ログ出力: レスポンスステータス
    console.log(`[CreateCustomer] Response Status: ${res.status}`);

    if (!res.ok) {
      // エラーの場合、詳細をテキストで取得してログに出す
      const errorText = await res.text();
      console.error(`[CreateCustomer] API Error Details: ${errorText}`);
      throw new Error(`Failed to create customer: ${res.status} ${errorText}`);
    }

    console.log("[CreateCustomer] Success!");
    revalidatePath(`/customers`);

  } catch (error) {
    // ★ログ出力: 通信エラーやその他の例外
    console.error(`[CreateCustomer] Exception occurred:`);
    console.error(error);
    throw error; // エラーを再スローして呼び出し元（画面側）に伝える
  }
};

export default createCustomer;