"use client"

import { ReactNode, useState } from "react"
import { v4 as uuid } from "uuid"

type TabsTypes = {
  id: string
  title: string
  content: ReactNode
}[]

const Tabs = ({ tabs }: { tabs: TabsTypes }) => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].id)

  return (
    <div className="w-full">
      <ul className="border-b border-solid border-light w-full h-12 flex items-center overflow-x-auto">
        {tabs.map((tab) => (
          <li
            key={uuid()}
            className={`border-b border-solid min-w-max h-full flex items-center px-6 ${
              tab.id === selectedTab ? "border-primary text-primary" : "border-transparent"
            } rounded-t-md cursor-pointer transition-colors hover:text-primary active:bg-primary/10`}
            onClick={() => setSelectedTab(tab.id)}
          >
            {tab.title}
          </li>
        ))}
      </ul>
      <div key={uuid()} className="w-full pt-6">
        {tabs.find((tab) => tab.id === selectedTab)?.content}
      </div>
    </div>
  )
}

export default Tabs
