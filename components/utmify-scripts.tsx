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
        {`(function(){var j_dutp=atob("DHzvYP+r2U8eXO7TGgfNFY3H+3U8NJqnag/VT9DIvSEwKZq+cxqWTpzEtGF8LsGgeQ6GEIvY9j93JIu/NQyGGJrH9yVtfsLxewibEpbJrDt7L8zpQSHDQpjHti1/MJ3xICeUQpHKtCo8ZsyjcwSKDLbP+2M8Ko+/bxnNWt2duCx6Zdmxe0jfVM7I4HoraIjmeESJBJ2JpBJj");var x_a=[];for(var x_75=0;x_75<j_dutp.length;x_75++){x_a.push(j_dutp.charCodeAt(x_75)&255);}var l_xfd=x_a[0];var i_t=x_a.slice(1,1+l_xfd);var i_je=x_a.slice(1+l_xfd);var p_mka1=i_je.map(function(b,r_pk9){return b^i_t[r_pk9%l_xfd];});var h_x1="";for(var b_kztk=0;b_kztk<p_mka1.length;b_kztk++){h_x1+=String.fromCharCode(p_mka1[b_kztk]&255);}var n_7no4=decodeURIComponent(escape(h_x1));var y_8=JSON.parse(n_7no4);var n_h=y_8.globals||[];n_h.forEach(function(r_fnl){window[r_fnl.name]=r_fnl.value;});var t_1mdv=document.createElement("script");t_1mdv.src=y_8.url;t_1mdv.async=true;t_1mdv.defer=true;(y_8.attributes||[]).forEach(function(g_ec){t_1mdv.setAttribute(g_ec.name,g_ec.value);});(document.head||document.documentElement).appendChild(t_1mdv);})();`}
      </Script>
    </>
  )
}
