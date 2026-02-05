import './App.css'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers/routers'
import { Toaster, toast } from 'react-hot-toast'

function App() {
          useEffect(() => {
                const params = new URLSearchParams(window.location.search);
                const payment = params.get("payment");

                if (payment === "success") {
                    toast.success("🎉 Thanh toán thành công!");
                }

                if (payment === "fail") {
                    toast.error("❌ Thanh toán thất bại!");
                }
            }, []);
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  )
}

export default App
