import { redirect } from 'next/navigation';

export default function Home() {
  // アクセスされたらすぐに /customers に転送する
  redirect('/customers');
}