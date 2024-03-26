const Page = () => {
  return (
    <>
      <div className="bg-white border-b border-solid border-light py-3">
        <div className="container">filters</div>
      </div>
      <main className="bg-light w-full py-9">
        <div className="container flex py-3">
          <aside className="bg-white h-max w-1/3 p-3 rounded-md">job-ads</aside>
          <section className="bg-white h-[calc(100vh-6rem)] w-2/3 p-3 mr-3 rounded-md sticky top-[5.25rem] overflow-y-auto">
            single job-ad
          </section>
        </div>
      </main>
    </>
  )
}

export default Page
