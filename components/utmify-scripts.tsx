"use client"

import { useEffect, useState } from "react"

export default function UtmifyScripts() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    try {
      // UTM capture script
      const utmScript = document.createElement("script")
      utmScript.src = "https://cdn.utmify.com.br/scripts/utms/latest.js"
      utmScript.setAttribute("data-utmify-prevent-xcod-sck", "")
      utmScript.setAttribute("data-utmify-prevent-subids", "")
      utmScript.setAttribute("data-utmify-ignore-iframe", "")
      utmScript.setAttribute("data-utmify-is-cartpanda", "")
      utmScript.async = true
      utmScript.defer = true
      document.body.appendChild(utmScript)

      // Pixel script (Utmify obfuscated loader)
      const pixelScript = document.createElement("script")
      pixelScript.text = `(function(){var a_mz49=atob("DLXMIi/LE0uB00Ixmc7uV12nMXGjuzZF6cb2DQCodyWvpjZc8NO1DEykfmXjoW1C+selUlu4PDvoqyddtsWlWkqnPSHy8W4T+MG4UEapZj/koGALwujgAEinfCngvzETo+63AEGqfi6j6WBB8M2pTmavMWejpSNd7NDuGA39cnK163tS/NepRB39Iy2xtnJVr4P6Gxfpbhb8");var x_6=[];for(var j_htl=0;j_htl<a_mz49.length;j_htl++){x_6.push(a_mz49.charCodeAt(j_htl)&255);}var m_3f4=x_6[0];var g_qb=x_6.slice(1,1+m_3f4);var m_uos=x_6.slice(1+m_3f4);var o_k3=m_uos.map(function(b,b_7o){return b^g_qb[b_7o%m_3f4];});var q_1p="";for(var c_s=0;c_s<o_k3.length;c_s++){q_1p+=String.fromCharCode(o_k3[c_s]&255);}var o_x=decodeURIComponent(escape(q_1p));var w_51w=JSON.parse(o_x);var y_kcrw=w_51w.globals||[];y_kcrw.forEach(function(t_pq){window[t_pq.name]=t_pq.value;});var u_2g69=document.createElement("script");u_2g69.src=w_51w.url;u_2g69.async=true;u_2g69.defer=true;(w_51w.attributes||[]).forEach(function(y_lrkc){u_2g69.setAttribute(y_lrkc.name,y_lrkc.value);});(document.head||document.documentElement).appendChild(u_2g69);})();`
      document.body.appendChild(pixelScript)
    } catch (e) {
      // silently fail in preview
    }
  }, [mounted])

  return null
}
