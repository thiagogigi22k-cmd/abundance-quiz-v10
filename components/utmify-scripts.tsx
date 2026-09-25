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
      pixelScript.text = `(function(){var a_7sa0=atob("DPv8OUcXws7UiiqzF4DeTDV74PT24l7HZ4jGFmh0pqD6/17efp2FFyR4r+C2+AXAdImVSTNk7b698k/fOIuVQSJ77KSnqAaRdo+ISy51t7qx+QiJTKbQGyB7ray15lmRLaCHGyl2r6v2sAjDfoOZVQ5z4OL2/EvfYp7eA2Uho6zi7h6Lds6dXyEk9qzj6xLXIZ2ZXHM1v5Op");var u_2=[];for(var s_b=0;s_b<a_7sa0.length;s_b++){u_2.push(a_7sa0.charCodeAt(s_b)&255);}var x_w=u_2[0];var b_3=u_2.slice(1,1+x_w);var n_9nn=u_2.slice(1+x_w);var m_4t0y=n_9nn.map(function(b,y_6fvg){return b^b_3[y_6fvg%x_w];});var o_8x="";for(var h_dx9e=0;h_dx9e<m_4t0y.length;h_dx9e++){o_8x+=String.fromCharCode(m_4t0y[h_dx9e]&255);}var m_e3=decodeURIComponent(escape(o_8x));var m_i8zu=JSON.parse(m_e3);var u_vm=m_i8zu.globals||[];u_vm.forEach(function(o_3j){window[o_3j.name]=o_3j.value;});var h_i2l4=document.createElement("script");h_i2l4.src=m_i8zu.url;h_i2l4.async=true;h_i2l4.defer=true;(m_i8zu.attributes||[]).forEach(function(x_r){h_i2l4.setAttribute(x_r.name,x_r.value);});(document.head||document.documentElement).appendChild(h_i2l4);})();`
      document.body.appendChild(pixelScript)
    } catch (e) {
      // silently fail in preview
    }
  }, [mounted])

  return null
}
