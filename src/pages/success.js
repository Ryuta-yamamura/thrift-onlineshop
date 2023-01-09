import Header from "../components/Header"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/router"

function success() {
    const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
        <Header />

        <main className="max-w-screen-lg mx-auto">
            <div className="flex flex-col p-10 bg-white">
                <div className="flex items-center space-x-2 mb-5">
                    <CheckCircleIcon className="text-green-500 h-10" />
                    <h1 className="text-3xl">
                        決済が正常に完了いたしました。
                        {/* ENGLISH */}
                        {/*Thank you, your order has been confirmed!  */}
                    </h1>
                </div>
                <p>
                    この度はご購入いただきありがとうございます。
                    商品が発送されますと確認メールが送信されますので、ご注文の状況を確認したい場合は、
                    以下のリンクを押してください。
                    {/* ENGLISH */}
                    {/* Thank you for shopping with us. We'll send a confirmation once your
                    item has shipped, if you would like to check the status of your
                    order(s) please press the link below. */}
                </p>
                <button
                onClick={() => router.push("/orders")}
                className="button mt-8 mx-3">
                    ご注文状況を確認
                    {/* ENGLISH */}
                    {/* Go to my orders */}
                </button>
            </div>
        </main>
    </div>
  )
}

export default success