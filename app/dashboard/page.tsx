import { fetchCoins, fetchUserCoins } from '@/Helpers/crypto'
import DashboardPage from '../_components/DashboardPage'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Dashboard = async () => {
    const cookieStore = cookies()
    const userInfo = cookieStore.get('userInfo')
    const coins = await fetchCoins()

    if (!userInfo) {
        redirect('/')
    }

    const info = JSON.parse(userInfo.value)
    const id = info.data._id
    const currCoins = await fetchUserCoins(id)

    return (
        <DashboardPage coins={coins} currCoins={currCoins} userdata={userInfo} />
    )
}

export default Dashboard