'use client'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { bake_cookie, read_cookie } from 'sfcookies'

const DashboardPage = ({ userdata, coins, currCoins }: any) => {
  const [user, setUser] = useState('')
  const [userCoins, setUserCoins] = useState([])
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false)
  const [coinState, setCoinState] = useState('')
  useEffect(() => {
    const info = JSON.parse(userdata.value)
    setUser(info.data.fullName ?? info.data.name)
    setUserCoins(currCoins ?? [])
  }, [userdata])
  const addKey = (coin: any) => {
    setOpen(false)
    setCoinState('Adding Coins to portfolio....')
    const info = JSON.parse(userdata.value)
    const _id = info.data._id
    const stringified = JSON.stringify({ coin: coin })
    const kwons = read_cookie('userInfo')
    fetch("/api/update", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stringified, _id }),
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
          setCoinState('')
          enqueueSnackbar("Coin added to portfolio", {
            variant: "success",
          });
          const currCookie = JSON.parse(JSON.stringify(kwons as string))
          console.log("data", currCookie)

        }
      })
      .catch((err) => {
        setCoinState('')
        enqueueSnackbar("An error occured adding coin: " + err, { variant: "error" });
      });

  }
  return (
    <div>
      <h1 className=' text-center my-3'>Welcome {user === '' ? '' : `, ${user}`}</h1>

      <div className=' mt-6 ml-[5px] px-5'>
        <h2 className='my-3'>{coinState}</h2>
        <h2>Top 10 ranked crypto currencies</h2>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-[50px]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  Cryptocurrency
                </th>
                <th scope="col" className="px-6 py-3">
                  24 hour price
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  % change
                </th>
              </tr>
            </thead>
            <tbody>
              {
                coins.length > 0 && coins.slice(0, 10).map((x: any, i: number) => (
                  <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                      {x.name} &rarr; {x.symbol}
                    </th>
                    <td className="px-6 py-4">
                      ${x.price}
                    </td>
                    <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                      <span style={{ color: x.change.includes('-') ? 'red' : 'green' }}>

                        {x.change}
                      </span>
                    </td>

                  </tr>
                ))
              }

            </tbody>
          </table>


        </div>
        <div className='w-[100%] flex flex-row items-center justify-between mb-[30px]'>

          <h2>My Portfolio</h2>
          <div>
            <input type="search" className=' bg-transparent border-1 border pl-5 py-1 rounded-lg text-white' name="" id="" placeholder='search....' />
          </div>
          <h2 className='text-lg'>
            <button onClick={() => setOpen(true)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Add new Coins
            </button>

            <div style={{ display: !open ? 'none' : 'flex' }} className="overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-[95%] md:inset-0 h-[calc(100%-1rem)] max-h-full">
              <div className="relative p-4 w-full max-w-2xl max-h-full">

                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Add coins
                    </h3>
                    <button type="button" onClick={() => setOpen(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>

                  <div className="p-4 md:p-5 space-y-4">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Cryptocurrency
                          </th>
                          <th scope="col" className="px-6 py-3">
                            24 hour price
                          </th>
                          <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            % change
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          coins.length > 0 && coins.slice(0, 10).map((x: any, i: number) => (
                            <tr onClick={() => addKey(x)} key={i} className="border-b border-gray-200 dark:border-gray-700 cursor-pointer">
                              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                {x.name} &rarr; {x.symbol}
                              </th>
                              <td className="px-6 py-4">
                                ${x.price}
                              </td>
                              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                <span style={{ color: x.change.includes('-') ? 'red' : 'green' }}>

                                  {x.change}
                                </span>
                              </td>

                            </tr>
                          ))
                        }

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </h2>
        </div>

        {
          userCoins.length === 0 ? (
            <div className='flex flex-row justify-center items-center'>
              <h3>You have no coins in your wallet</h3>
            </div>
          ) : (
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"'>
              <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    Cryptocurrency
                  </th>
                  <th scope="col" className="px-6 py-3">
                    24 hour price
                  </th>
                  <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    % change
                  </th>
                </tr>
                {
                  userCoins.length > 0 && userCoins.map((x: any, i: number) => (
                    <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        {x} &rarr;
                      </th>
                      <td className="px-6 py-4">
                        $3483493
                      </td>
                      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                        <span style={{ color: 'green' }}>

                          {/* {x.change} */}
                        </span>
                      </td>

                    </tr>
                  ))
                }
              </thead>
            </table>
          )
        }

      </div>
    </div>
  )
}

export default DashboardPage