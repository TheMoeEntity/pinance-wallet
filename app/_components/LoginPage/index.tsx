'use client'
import Link from 'next/link'
import { useSnackbar } from 'notistack';
import React, { FormEvent, useState } from 'react'
import { bake_cookie } from 'sfcookies'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { push } = useRouter()
    const [signinStatus, setsigninStatus] = useState('Login')

    const handleSubmit = (e: FormEvent) => {
        setsigninStatus('Logging in...')
        e.preventDefault()

        const email = (
            e.target[
            0 as unknown as keyof typeof e.target
            ] as unknown as HTMLInputElement
        ).value
        const password = (
            e.target[
            1 as unknown as keyof typeof e.target
            ] as unknown as HTMLInputElement
        ).value

        fetch("/api/auth/login", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then(async (res) => {
                const isJson = res.headers
                    .get("content-type")
                    ?.includes("application/json");
                const data = isJson ? await res.json() : null;

                if (!res.ok) {
                    const error = (data && data.error) || res.statusText;
                    console.log(error)
                    // enqueueSnackbar("An error occured", { variant: "error" });
                    return Promise.reject(error);
                } else if (res.ok) {
                    setsigninStatus('Login')
                    enqueueSnackbar("User logged in successfully", {
                        variant: "success",
                    });
                    bake_cookie('userInfo', data);
                    console.log(data)
                    setTimeout(() => {
                        push("/dashboard");
                    }, 3000);
                }
            })
            .catch((err) => {
                setsigninStatus('Login')
                enqueueSnackbar("An error occured: " + err, { variant: "error" });
            });

    }

    return (
        <section className="bg-gray-50 h-lvh dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <span className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <Link href={'/'}>
                        Pinance Exchange
                    </Link>
                </span>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login to your Pinance account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={e => handleSubmit(e)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{signinStatus}</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account? <Link href={'/register'}>Create one here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage