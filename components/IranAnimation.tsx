"use client"

import { useEffect, useRef, useState } from "react"

const IranAnimation = () => {
  const [svgPath, setSvgPath] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const runAnimationRef = useRef<boolean>(false)
  const messageBoxRef = useRef<HTMLDivElement>(null)
  const gRef = useRef<SVGGElement>(null)

  useEffect(() => {
    // handle active a circle in iran map animation
    const animate = () => {
      console.log(123)
      const circles: NodeListOf<SVGCircleElement> = gRef.current?.querySelectorAll("circle")!

      gRef.current?.querySelector(".active-circle")?.classList.remove("active-circle")

      const rnd = Math.floor(Math.random() * circles.length) + 1
      const nextCircleElem = circles[rnd]
      nextCircleElem?.classList.add("active-circle")

      messageBoxRef.current?.classList.remove("hidden-message-box")
      messageBoxRef.current?.classList.add("show-message-box")
      setSvgPath({
        x: nextCircleElem?.cx.animVal.value || 0,
        y: nextCircleElem?.cy.animVal.value || 0,
      })
      setTimeout(() => {
        messageBoxRef.current?.classList.remove("show-message-box")
        messageBoxRef.current?.classList.add("hidden-message-box")
      }, 4000)
    }

    // inital animation interVal
    const interVal = setInterval(animate, 5000)

    // handle remove animation in mobile size and play again in larger sizes
    const windowSizeHandler = () => {
      const width = window.innerWidth

      if (width < 768 && runAnimationRef.current) {
        setSvgPath({ x: 0, y: 0 })
        clearInterval(interVal)
        runAnimationRef.current = false
      } else if (width >= 768 && !runAnimationRef.current) {
        animate()
        runAnimationRef.current = true
      }
    }
    // check window size for handeling playing animation in first app runnig
    windowSizeHandler()

    window.addEventListener("resize", windowSizeHandler)
    return () => clearInterval(interVal)
  }, [])

  return (
    <>
      <style jsx>
        {`
          circle {
            transition-property: fill;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 500ms;
          }
        `}
      </style>
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 800 710"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g ref={gRef} id="Group 5">
          <circle id="dott-215" cx="10" cy="10" r="10" fill="#E7EAED" />
          <circle id="dott-285" cx="10" cy="70" r="10" fill="#E7EAED" />
          <circle id="dott-216" cx="40" cy="10" r="10" fill="#E7EAED" />
          <circle id="dott-286" cx="40" cy="70" r="10" fill="#E7EAED" />
          <circle id="dott-356" cx="40" cy="130" r="10" fill="#E7EAED" />
          <circle id="dott-287" cx="70" cy="70" r="10" fill="#E7EAED" />
          <circle id="dott-357" cx="70" cy="130" r="10" fill="#E7EAED" />
          <circle id="dott-427" cx="70" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-567" cx="70" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-288" cx="100" cy="70" r="10" fill="#E7EAED" />
          <circle id="dott-358" cx="100" cy="130" r="10" fill="#E7EAED" />
          <circle id="dott-428" cx="100" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-498" cx="100" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-568" cx="100" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-289" cx="130" cy="70" r="10" fill="#E7EAED" />
          <circle id="dott-359" cx="130" cy="130" r="10" fill="#E7EAED" />
          <circle id="dott-429" cx="130" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-499" cx="130" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-569" cx="130" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-639" cx="130" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-220" cx="160" cy="10" r="10" fill="#E7EAED" />
          <circle id="dott-290" cx="160" cy="70" r="10" fill="#E7EAED" />
          <circle id="dott-360" cx="160" cy="130" r="10" fill="#E7EAED" />
          <circle id="dott-430" cx="160" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-500" cx="160" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-570" cx="160" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-640" cx="160" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-710" cx="160" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-291" cx="190" cy="70" r="10" fill="#E7EAED" />
          <circle id="dott-361" cx="190" cy="130" r="10" fill="#E7EAED" />
          <circle id="dott-431" cx="190" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-501" cx="190" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-571" cx="190" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-641" cx="190" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-711" cx="190" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-362" cx="220" cy="130" r="10" fill="#E7EAED" />
          <circle id="dott-432" cx="220" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-502" cx="220" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-572" cx="220" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-642" cx="220" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-712" cx="220" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-782" cx="220" cy="490" r="10" fill="#E7EAED" />
          <circle id="dott-363" cx="250" cy="130" r="10" fill="#E7EAED" />
          <circle id="dott-433" cx="250" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-503" cx="250" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-573" cx="250" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-643" cx="250" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-713" cx="250" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-783" cx="250" cy="490" r="10" fill="#E7EAED" />
          <circle id="dott-364" cx="280" cy="130" r="10" fill="#E7EAED" />
          <circle id="dott-434" cx="280" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-504" cx="280" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-574" cx="280" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-644" cx="280" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-714" cx="280" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-784" cx="280" cy="490" r="10" fill="#E7EAED" />
          <circle id="dott-854" cx="280" cy="550" r="10" fill="#E7EAED" />
          <circle id="dott-435" cx="310" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-505" cx="310" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-575" cx="310" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-645" cx="310" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-715" cx="310" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-785" cx="310" cy="490" r="10" fill="#E7EAED" />
          <circle id="dott-855" cx="310" cy="550" r="10" fill="#E7EAED" />
          <circle id="dott-436" cx="340" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-506" cx="340" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-576" cx="340" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-646" cx="340" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-716" cx="340" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-786" cx="340" cy="490" r="10" fill="#E7EAED" />
          <circle id="dott-856" cx="340" cy="550" r="10" fill="#E7EAED" />
          <circle id="dott-437" cx="370" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-507" cx="370" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-577" cx="370" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-647" cx="370" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-717" cx="370" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-787" cx="370" cy="490" r="10" fill="#E7EAED" />
          <circle id="dott-857" cx="370" cy="550" r="10" fill="#E7EAED" />
          <circle id="dott-927" cx="370" cy="610" r="10" fill="#E7EAED" />
          <circle id="dott-438" cx="400" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-508" cx="400" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-578" cx="400" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-648" cx="400" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-718" cx="400" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-788" cx="400" cy="490" r="10" fill="#E7EAED" />
          <circle id="dott-858" cx="400" cy="550" r="10" fill="#E7EAED" />
          <circle id="dott-928" cx="400" cy="610" r="10" fill="#E7EAED" />
          <circle id="dott-369" cx="430" cy="130" r="10" fill="#E7EAED" />
          <circle id="dott-439" cx="430" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-509" cx="430" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-579" cx="430" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-649" cx="430" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-719" cx="430" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-789" cx="430" cy="490" r="10" fill="#E7EAED" />
          <circle id="dott-859" cx="430" cy="550" r="10" fill="#E7EAED" />
          <circle id="dott-929" cx="430" cy="610" r="10" fill="#E7EAED" />
          <circle id="dott-370" cx="460" cy="130" r="10" fill="#E7EAED" />
          <circle id="dott-440" cx="460" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-510" cx="460" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-580" cx="460" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-650" cx="460" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-720" cx="460" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-790" cx="460" cy="490" r="10" fill="#E7EAED" />
          <circle id="dott-860" cx="460" cy="550" r="10" fill="#E7EAED" />
          <circle id="dott-930" cx="460" cy="610" r="10" fill="#E7EAED" />
          <circle id="dott-371" cx="490" cy="130" r="10" fill="#E7EAED" />
          <circle id="dott-441" cx="490" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-511" cx="490" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-581" cx="490" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-651" cx="490" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-721" cx="490" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-791" cx="490" cy="490" r="10" fill="#E7EAED" />
          <circle id="dott-861" cx="490" cy="550" r="10" fill="#E7EAED" />
          <circle id="dott-931" cx="490" cy="610" r="10" fill="#E7EAED" />
          <circle id="dott-372" cx="520" cy="130" r="10" fill="#E7EAED" />
          <circle id="dott-442" cx="520" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-512" cx="520" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-582" cx="520" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-652" cx="520" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-722" cx="520" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-792" cx="520" cy="490" r="10" fill="#E7EAED" />
          <circle id="dott-862" cx="520" cy="550" r="10" fill="#E7EAED" />
          <circle id="dott-932" cx="520" cy="610" r="10" fill="#E7EAED" />
          <circle id="dott-303" cx="550" cy="70" r="10" fill="#E7EAED" />
          <circle id="dott-373" cx="550" cy="130" r="10" fill="#E7EAED" />
          <circle id="dott-443" cx="550" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-513" cx="550" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-583" cx="550" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-653" cx="550" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-723" cx="550" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-793" cx="550" cy="490" r="10" fill="#E7EAED" />
          <circle id="dott-863" cx="550" cy="550" r="10" fill="#E7EAED" />
          <circle id="dott-933" cx="550" cy="610" r="10" fill="#E7EAED" />
          <circle id="dott-374" cx="580" cy="130" r="10" fill="#E7EAED" />
          <circle id="dott-444" cx="580" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-514" cx="580" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-584" cx="580" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-654" cx="580" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-724" cx="580" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-794" cx="580" cy="490" r="10" fill="#E7EAED" />
          <circle id="dott-864" cx="580" cy="550" r="10" fill="#E7EAED" />
          <circle id="dott-934" cx="580" cy="610" r="10" fill="#E7EAED" />
          <circle id="dott-1004" cx="580" cy="670" r="10" fill="#E7EAED" />
          <circle id="dott-375" cx="610" cy="130" r="10" fill="#E7EAED" />
          <circle id="dott-445" cx="610" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-515" cx="610" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-585" cx="610" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-655" cx="610" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-725" cx="610" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-795" cx="610" cy="490" r="10" fill="#E7EAED" />
          <circle id="dott-865" cx="610" cy="550" r="10" fill="#E7EAED" />
          <circle id="dott-935" cx="610" cy="610" r="10" fill="#E7EAED" />
          <circle id="dott-1005" cx="610" cy="670" r="10" fill="#E7EAED" />
          <circle id="dott-376" cx="640" cy="130" r="10" fill="#E7EAED" />
          <circle id="dott-446" cx="640" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-516" cx="640" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-586" cx="640" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-656" cx="640" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-726" cx="640" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-796" cx="640" cy="490" r="10" fill="#E7EAED" />
          <circle id="dott-866" cx="640" cy="550" r="10" fill="#E7EAED" />
          <circle id="dott-936" cx="640" cy="610" r="10" fill="#E7EAED" />
          <circle id="dott-1006" cx="640" cy="670" r="10" fill="#E7EAED" />
          <circle id="dott-377" cx="670" cy="130" r="10" fill="#E7EAED" />
          <circle id="dott-447" cx="670" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-517" cx="670" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-587" cx="670" cy="310" r="10" fill="#E7EAED" />
          <circle id="dott-657" cx="670" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-727" cx="670" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-797" cx="670" cy="490" r="10" fill="#E7EAED" />
          <circle id="dott-867" cx="670" cy="550" r="10" fill="#E7EAED" />
          <circle id="dott-937" cx="670" cy="610" r="10" fill="#E7EAED" />
          <circle id="dott-1007" cx="670" cy="670" r="10" fill="#E7EAED" />
          <circle id="dott-448" cx="700" cy="190" r="10" fill="#E7EAED" />
          <circle id="dott-518" cx="700" cy="250" r="10" fill="#E7EAED" />
          <circle id="dott-658" cx="700" cy="370" r="10" fill="#E7EAED" />
          <circle id="dott-728" cx="700" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-798" cx="700" cy="490" r="10" fill="#E7EAED" />
          <circle id="dott-868" cx="700" cy="550" r="10" fill="#E7EAED" />
          <circle id="dott-938" cx="700" cy="610" r="10" fill="#E7EAED" />
          <circle id="dott-1008" cx="700" cy="670" r="10" fill="#E7EAED" />
          <circle id="dott-729" cx="730" cy="430" r="10" fill="#E7EAED" />
          <circle id="dott-869" cx="730" cy="550" r="10" fill="#E7EAED" />
          <circle id="dott-939" cx="730" cy="610" r="10" fill="#E7EAED" />
          <circle id="dott-1009" cx="730" cy="670" r="10" fill="#E7EAED" />
          <circle id="dott-940" cx="760" cy="610" r="10" fill="#E7EAED" />
          <circle id="dott-1010" cx="760" cy="670" r="10" fill="#E7EAED" />
          <circle id="dott-941" cx="790" cy="610" r="10" fill="#E7EAED" />
          <circle id="dott-250" cx="10" cy="40" r="10" fill="#E7EAED" />
          <circle id="dott-251" cx="40" cy="40" r="10" fill="#E7EAED" />
          <circle id="dott-321" cx="40" cy="100" r="10" fill="#E7EAED" />
          <circle id="dott-252" cx="70" cy="40" r="10" fill="#E7EAED" />
          <circle id="dott-322" cx="70" cy="100" r="10" fill="#E7EAED" />
          <circle id="dott-392" cx="70" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-1046" cx="40" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-532" cx="70" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-253" cx="100" cy="40" r="10" fill="#E7EAED" />
          <circle id="dott-323" cx="100" cy="100" r="10" fill="#E7EAED" />
          <circle id="dott-393" cx="100" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-463" cx="100" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-533" cx="100" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-603" cx="100" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-254" cx="130" cy="40" r="10" fill="#E7EAED" />
          <circle id="dott-1045" cx="130" cy="10" r="10" fill="#E7EAED" />
          <circle id="dott-324" cx="130" cy="100" r="10" fill="#E7EAED" />
          <circle id="dott-394" cx="130" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-464" cx="130" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-534" cx="130" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-604" cx="130" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-255" cx="160" cy="40" r="10" fill="#E7EAED" />
          <circle id="dott-325" cx="160" cy="100" r="10" fill="#E7EAED" />
          <circle id="dott-395" cx="160" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-465" cx="160" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-535" cx="160" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-605" cx="160" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-675" cx="160" cy="400" r="10" fill="#E7EAED" />
          <circle id="dott-326" cx="190" cy="100" r="10" fill="#E7EAED" />
          <circle id="dott-396" cx="190" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-466" cx="190" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-536" cx="190" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-606" cx="190" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-676" cx="190" cy="400" r="10" fill="#E7EAED" />
          <circle id="dott-746" cx="190" cy="460" r="10" fill="#E7EAED" />
          <circle id="dott-327" cx="220" cy="100" r="10" fill="#E7EAED" />
          <circle id="dott-397" cx="220" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-467" cx="220" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-537" cx="220" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-607" cx="220" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-677" cx="220" cy="400" r="10" fill="#E7EAED" />
          <circle id="dott-747" cx="220" cy="460" r="10" fill="#E7EAED" />
          <circle id="dott-398" cx="250" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-468" cx="250" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-538" cx="250" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-608" cx="250" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-678" cx="250" cy="400" r="10" fill="#E7EAED" />
          <circle id="dott-748" cx="250" cy="460" r="10" fill="#E7EAED" />
          <circle id="dott-399" cx="280" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-469" cx="280" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-539" cx="280" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-609" cx="280" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-679" cx="280" cy="400" r="10" fill="#E7EAED" />
          <circle id="dott-749" cx="280" cy="460" r="10" fill="#E7EAED" />
          <circle id="dott-819" cx="280" cy="520" r="10" fill="#E7EAED" />
          <circle id="dott-400" cx="310" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-470" cx="310" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-540" cx="310" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-610" cx="310" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-680" cx="310" cy="400" r="10" fill="#E7EAED" />
          <circle id="dott-750" cx="310" cy="460" r="10" fill="#E7EAED" />
          <circle id="dott-820" cx="310" cy="520" r="10" fill="#E7EAED" />
          <circle id="dott-890" cx="310" cy="580" r="10" fill="#E7EAED" />
          <circle id="dott-401" cx="340" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-471" cx="340" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-541" cx="340" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-611" cx="340" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-681" cx="340" cy="400" r="10" fill="#E7EAED" />
          <circle id="dott-751" cx="340" cy="460" r="10" fill="#E7EAED" />
          <circle id="dott-821" cx="340" cy="520" r="10" fill="#E7EAED" />
          <circle id="dott-891" cx="340" cy="580" r="10" fill="#E7EAED" />
          <circle id="dott-402" cx="370" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-472" cx="370" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-542" cx="370" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-612" cx="370" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-682" cx="370" cy="400" r="10" fill="#E7EAED" />
          <circle id="dott-752" cx="370" cy="460" r="10" fill="#E7EAED" />
          <circle id="dott-822" cx="370" cy="520" r="10" fill="#E7EAED" />
          <circle id="dott-892" cx="370" cy="580" r="10" fill="#E7EAED" />
          <circle id="dott-403" cx="400" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-473" cx="400" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-543" cx="400" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-613" cx="400" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-683" cx="400" cy="400" r="10" fill="#E7EAED" />
          <circle id="dott-753" cx="400" cy="460" r="10" fill="#E7EAED" />
          <circle id="dott-823" cx="400" cy="520" r="10" fill="#E7EAED" />
          <circle id="dott-893" cx="400" cy="580" r="10" fill="#E7EAED" />
          <circle id="dott-404" cx="430" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-474" cx="430" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-544" cx="430" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-614" cx="430" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-684" cx="430" cy="400" r="10" fill="#E7EAED" />
          <circle id="dott-754" cx="430" cy="460" r="10" fill="#E7EAED" />
          <circle id="dott-824" cx="430" cy="520" r="10" fill="#E7EAED" />
          <circle id="dott-894" cx="430" cy="580" r="10" fill="#E7EAED" />
          <circle id="dott-964" cx="430" cy="640" r="10" fill="#E7EAED" />
          <circle id="dott-335" cx="460" cy="100" r="10" fill="#E7EAED" />
          <circle id="dott-1049" cx="460" cy="70" r="10" fill="#E7EAED" />
          <circle id="dott-405" cx="460" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-475" cx="460" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-545" cx="460" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-615" cx="460" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-685" cx="460" cy="400" r="10" fill="#E7EAED" />
          <circle id="dott-755" cx="460" cy="460" r="10" fill="#E7EAED" />
          <circle id="dott-825" cx="460" cy="520" r="10" fill="#E7EAED" />
          <circle id="dott-895" cx="460" cy="580" r="10" fill="#E7EAED" />
          <circle id="dott-965" cx="460" cy="640" r="10" fill="#E7EAED" />
          <circle id="dott-336" cx="490" cy="100" r="10" fill="#E7EAED" />
          <circle id="dott-1050" cx="490" cy="70" r="10" fill="#E7EAED" />
          <circle id="dott-406" cx="490" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-476" cx="490" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-546" cx="490" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-616" cx="490" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-686" cx="490" cy="400" r="10" fill="#E7EAED" />
          <circle id="dott-756" cx="490" cy="460" r="10" fill="#E7EAED" />
          <circle id="dott-826" cx="490" cy="520" r="10" fill="#E7EAED" />
          <circle id="dott-896" cx="490" cy="580" r="10" fill="#E7EAED" />
          <circle id="dott-966" cx="490" cy="640" r="10" fill="#E7EAED" />
          <circle id="dott-337" cx="520" cy="100" r="10" fill="#E7EAED" />
          <circle id="dott-1047" cx="520" cy="70" r="10" fill="#E7EAED" />
          <circle id="dott-407" cx="520" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-477" cx="520" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-547" cx="520" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-617" cx="520" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-687" cx="520" cy="400" r="10" fill="#E7EAED" />
          <circle id="dott-757" cx="520" cy="460" r="10" fill="#E7EAED" />
          <circle id="dott-827" cx="520" cy="520" r="10" fill="#E7EAED" />
          <circle id="dott-897" cx="520" cy="580" r="10" fill="#E7EAED" />
          <circle id="dott-338" cx="550" cy="100" r="10" fill="#E7EAED" />
          <circle id="dott-408" cx="550" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-478" cx="550" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-548" cx="550" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-618" cx="550" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-688" cx="550" cy="400" r="10" fill="#E7EAED" />
          <circle id="dott-758" cx="550" cy="460" r="10" fill="#E7EAED" />
          <circle id="dott-828" cx="550" cy="520" r="10" fill="#E7EAED" />
          <circle id="dott-898" cx="550" cy="580" r="10" fill="#E7EAED" />
          <circle id="dott-968" cx="550" cy="640" r="10" fill="#E7EAED" />
          <circle id="dott-339" cx="580" cy="100" r="10" fill="#E7EAED" />
          <circle id="dott-1048" cx="580" cy="70" r="10" fill="#E7EAED" />
          <circle id="dott-409" cx="580" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-479" cx="580" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-549" cx="580" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-619" cx="580" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-689" cx="580" cy="400" r="10" fill="#E7EAED" />
          <circle id="dott-759" cx="580" cy="460" r="10" fill="#E7EAED" />
          <circle id="dott-829" cx="580" cy="520" r="10" fill="#E7EAED" />
          <circle id="dott-899" cx="580" cy="580" r="10" fill="#E7EAED" />
          <circle id="dott-969" cx="580" cy="640" r="10" fill="#E7EAED" />
          <circle id="dott-340" cx="610" cy="100" r="10" fill="#E7EAED" />
          <circle id="dott-410" cx="610" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-480" cx="610" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-550" cx="610" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-620" cx="610" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-690" cx="610" cy="400" r="10" fill="#E7EAED" />
          <circle id="dott-760" cx="610" cy="460" r="10" fill="#E7EAED" />
          <circle id="dott-830" cx="610" cy="520" r="10" fill="#E7EAED" />
          <circle id="dott-900" cx="610" cy="580" r="10" fill="#E7EAED" />
          <circle id="dott-970" cx="610" cy="640" r="10" fill="#E7EAED" />
          <circle id="dott-1040" cx="610" cy="700" r="10" fill="#E7EAED" />
          <circle id="dott-341" cx="640" cy="100" r="10" fill="#E7EAED" />
          <circle id="dott-411" cx="640" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-481" cx="640" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-551" cx="640" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-621" cx="640" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-691" cx="640" cy="400" r="10" fill="#E7EAED" />
          <circle id="dott-761" cx="640" cy="460" r="10" fill="#E7EAED" />
          <circle id="dott-831" cx="640" cy="520" r="10" fill="#E7EAED" />
          <circle id="dott-901" cx="640" cy="580" r="10" fill="#E7EAED" />
          <circle id="dott-971" cx="640" cy="640" r="10" fill="#E7EAED" />
          <circle id="dott-1041" cx="640" cy="700" r="10" fill="#E7EAED" />
          <circle id="dott-412" cx="670" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-482" cx="670" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-552" cx="670" cy="280" r="10" fill="#E7EAED" />
          <circle id="dott-622" cx="670" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-692" cx="670" cy="400" r="10" fill="#E7EAED" />
          <circle id="dott-762" cx="670" cy="460" r="10" fill="#E7EAED" />
          <circle id="dott-832" cx="670" cy="520" r="10" fill="#E7EAED" />
          <circle id="dott-902" cx="670" cy="580" r="10" fill="#E7EAED" />
          <circle id="dott-972" cx="670" cy="640" r="10" fill="#E7EAED" />
          <circle id="dott-1042" cx="670" cy="700" r="10" fill="#E7EAED" />
          <circle id="dott-413" cx="700" cy="160" r="10" fill="#E7EAED" />
          <circle id="dott-483" cx="700" cy="220" r="10" fill="#E7EAED" />
          <circle id="dott-623" cx="700" cy="340" r="10" fill="#E7EAED" />
          <circle id="dott-693" cx="700" cy="400" r="10" fill="#E7EAED" />
          <circle id="dott-763" cx="700" cy="460" r="10" fill="#E7EAED" />
          <circle id="dott-833" cx="700" cy="520" r="10" fill="#E7EAED" />
          <circle id="dott-903" cx="700" cy="580" r="10" fill="#E7EAED" />
          <circle id="dott-973" cx="700" cy="640" r="10" fill="#E7EAED" />
          <circle id="dott-1043" cx="700" cy="700" r="10" fill="#E7EAED" />
          <circle id="dott-764" cx="730" cy="460" r="10" fill="#E7EAED" />
          <circle id="dott-834" cx="730" cy="520" r="10" fill="#E7EAED" />
          <circle id="dott-904" cx="730" cy="580" r="10" fill="#E7EAED" />
          <circle id="dott-974" cx="730" cy="640" r="10" fill="#E7EAED" />
          <circle id="dott-1044" cx="730" cy="700" r="10" fill="#E7EAED" />
          <circle id="dott-905" cx="760" cy="580" r="10" fill="#E7EAED" />
          <circle id="dott-975" cx="760" cy="640" r="10" fill="#E7EAED" />
          <circle id="dott-906" cx="790" cy="580" r="10" fill="#E7EAED" />
          <circle id="dott-976" cx="790" cy="640" r="10" fill="#E7EAED" />
        </g>
        {svgPath.x !== 0 && svgPath.y !== 0 ? (
          <foreignObject
            className={"w-96 h-24 -translate-x-48 translate-y-7 overflow-visible z-50"}
            x={svgPath.x}
            y={svgPath.y}
          >
            <div
              ref={messageBoxRef}
              className={
                "show-message-box bg-white border-2 border-solid border-dark/25 w-full h-full flex justify-center items-center text-center rounded-full px-6 relative origin-top"
              }
            >
              <div
                className={
                  "bg-white border-t-2 border-l border-solid border-dark/25 w-4 h-4 rotate-45 absolute -top-[calc(0.5rem+2px)] z-0"
                }
              ></div>
              <span className={"text-xl leading-relaxed z-10"}>
                یک رزومه برای شرکت دیجیکالا در تهران ارسال شد
              </span>
            </div>
          </foreignObject>
        ) : null}
      </svg>
    </>
  )
}

export default IranAnimation
