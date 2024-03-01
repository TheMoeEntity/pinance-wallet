
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
export default function Home() {

  const cookieStore = cookies()
  const userInfo = cookieStore.get('userInfo')

  if (userInfo) {
    redirect('/dashboard')
  }
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex justify-center w-[300px] items-center flex-col">
          <span className=" my-3">Welcome to Pinance.</span>
          <button className=" font-extrabold underline">Get Started</button>
        </div>
      </main>
    </>
  );
}
