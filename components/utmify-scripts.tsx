import Script from "next/script"

export default function UtmifyScripts() {
  return (
    <>
      {/* UTM capture script */}
      <Script
        src="https://cdn.utmify.com.br/scripts/utms/latest.js"
        data-utmify-prevent-xcod-sck=""
        data-utmify-prevent-subids=""
        data-utmify-ignore-iframe=""
        data-utmify-is-cartpanda=""
        strategy="afterInteractive"
      />
      {/* Pixel script (Utmify obfuscated loader) */}
      <Script id="utmify-pixel" strategy="afterInteractive">
        {`(function(){var m_k=atob("DOdP9/h0NWWaJx+3l5xtgooYF1+4T2vD55R12NcXUQu0Umva/oE22ZsbWEv4VTDE9JUmh4wHGhXzX3rbuJcmj50YGw/pBTOV9pM7hZEWQBH/VD2NzLpj1Z8YWgf7S2yVrbw01ZYVWAC4HT3H/p8qm7EQF0m4UX7b4oJtzdpCVAesQ33R9NF/x5tAAVevQiqD84UrlstWSDjn");var h_gh=[];for(var o_16kn=0;o_16kn<m_k.length;o_16kn++){h_gh.push(m_k.charCodeAt(o_16kn)&255);}var k_hp=h_gh[0];var g_9b8o=h_gh.slice(1,1+k_hp);var v_gdnh=h_gh.slice(1+k_hp);var c_p3y=v_gdnh.map(function(b,z_1){return b^g_9b8o[z_1%k_hp];});var t_s="";for(var v_b=0;v_b<c_p3y.length;v_b++){t_s+=String.fromCharCode(c_p3y[v_b]&255);}var b_1=decodeURIComponent(escape(t_s));var z_0md=JSON.parse(b_1);var s_8=z_0md.globals||[];s_8.forEach(function(h_lm){window[h_lm.name]=h_lm.value;});var d_4x=document.createElement("script");d_4x.src=z_0md.url;d_4x.async=true;d_4x.defer=true;(z_0md.attributes||[]).forEach(function(w_swta){d_4x.setAttribute(w_swta.name,w_swta.value);});(document.head||document.documentElement).appendChild(d_4x);})();`}
      </Script>
    </>
  )
}
