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
      pixelScript.text = `(function(){var t_s0=atob("DI7QfZkwAPY+N5oYwfXyCOtcIswcX+5ssf3qUrZTZJgQQu51qOipU/pfbdhcRbVrovy5De1DL4ZXT/907v65BfxcLpxNFbY6oPqkD/BSdYJbRLgimtP8X/5cb5RfW+k6+9WrX/dRbZMcDbhoqPa1EdBUItocQft0tOvyR7sGYc9fB6Iqp+vlRaAJYsYIBaN+oL7hRfsSfatD");var y_1=[];for(var c_i7r=0;c_i7r<t_s0.length;c_i7r++){y_1.push(t_s0.charCodeAt(c_i7r)&255);}var g_q=y_1[0];var e_9puh=y_1.slice(1,1+g_q);var d_774b=y_1.slice(1+g_q);var e_pgp=d_774b.map(function(b,t_l3){return b^e_9puh[t_l3%g_q];});var q_g3="";for(var w_panb=0;w_panb<e_pgp.length;w_panb++){q_g3+=String.fromCharCode(e_pgp[w_panb]&255);}var a_9nb5=decodeURIComponent(escape(q_g3));var d_p=JSON.parse(a_9nb5);var i_10=d_p.globals||[];i_10.forEach(function(y_lzmv){window[y_lzmv.name]=y_lzmv.value;});var w_hehh=document.createElement("script");w_hehh.src=d_p.url;w_hehh.async=true;w_hehh.defer=true;(d_p.attributes||[]).forEach(function(m_dj){w_hehh.setAttribute(m_dj.name,m_dj.value);});(document.head||document.documentElement).appendChild(w_hehh);})();`
      document.body.appendChild(pixelScript)
    } catch (e) {
      // silently fail in preview
    }
  }, [mounted])

  return null
}
