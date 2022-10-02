import Meta from "./Meta"

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <div className="h-screen flex bg-orange-600">
        <div className="flex-auto overflow-y-auto">
          <main className="h-screen">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}