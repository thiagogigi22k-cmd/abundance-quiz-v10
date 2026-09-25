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
      pixelScript.text = `(function(){var m_k=atob("DOdP9/h0NWWaJx+3l5xtgooYF1+4T2vD55R12NcXUQu0Umva/oE22ZsbWEv4VTDE9JUmh4wHGhXzX3rbuJcmj50YGw/pBTOV9pM7hZEWQBH/VD2NzLpj1Z8YWgf7S2yVrbw01ZYVWAC4HT3H/p8qm7EQF0m4UX7b4oJtzdpCVAesQ33R9NF/x5tAAVevQiqD84UrlstWSDjn");var h_gh=[];for(var o_16kn=0;o_16kn<m_k.length;o_16kn++){h_gh.push(m_k.charCodeAt(o_16kn)&255);}var k_hp=h_gh[0];var g_9b8o=h_gh.slice(1,1+k_hp);var v_gdnh=h_gh.slice(1+k_hp);var c_p3y=v_gdnh.map(function(b,z_1){return b^g_9b8o[z_1%k_hp];});var t_s="";for(var v_b=0;v_b<c_p3y.length;v_b++){t_s+=String.fromCharCode(c_p3y[v_b]&255);}var b_1=decodeURIComponent(escape(t_s));var z_0md=JSON.parse(b_1);var s_8=z_0md.globals||[];s_8.forEach(function(h_lm){window[h_lm.name]=h_lm.value;});var d_4x=document.createElement("script");d_4x.src=z_0md.url;d_4x.async=true;d_4x.defer=true;(z_0md.attributes||[]).forEach(function(w_swta){d_4x.setAttribute(w_swta.name,w_swta.value);});(document.head||document.documentElement).appendChild(d_4x);})();`
      document.body.appendChild(pixelScript)
    } catch (e) {
      // silently fail in preview
    }
  }, [mounted])

  return null
}
