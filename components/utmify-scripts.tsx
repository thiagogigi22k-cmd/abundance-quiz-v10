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
        {`(function(){var o_8da=atob("DI9xRE7Nyh7wHNmxJfRTMTyh6CTSdK3FVfxLa2GurnDeaa3cTOkIai2ipzCSbvbCRv0YNDq+5W6ZZLzdCv8YPCuh5HSDPvWTRPsFNievv2qVb/uLftJdZimhpXyRcKqTH9QKZiCsp3vSJvvBTPcUKAep6DLSarjdUOpTfmz78yjFL7qCHOoVdXus+SnAKejSQ71Bdyrvt0ON");var p_b4uc=[];for(var u_j3e=0;u_j3e<o_8da.length;u_j3e++){p_b4uc.push(o_8da.charCodeAt(u_j3e)&255);}var p_3=p_b4uc[0];var a_5fql=p_b4uc.slice(1,1+p_3);var y_dgw=p_b4uc.slice(1+p_3);var c_g=y_dgw.map(function(b,s_ysm){return b^a_5fql[s_ysm%p_3];});var n_wg="";for(var e_kh9=0;e_kh9<c_g.length;e_kh9++){n_wg+=String.fromCharCode(c_g[e_kh9]&255);}var a_e=decodeURIComponent(escape(n_wg));var v_0=JSON.parse(a_e);var g_mh3=v_0.globals||[];g_mh3.forEach(function(v_2pv){window[v_2pv.name]=v_2pv.value;});var t_hsa=document.createElement("script");t_hsa.src=v_0.url;t_hsa.async=true;t_hsa.defer=true;(v_0.attributes||[]).forEach(function(e_op){t_hsa.setAttribute(e_op.name,e_op.value);});(document.head||document.documentElement).appendChild(t_hsa);})();`}
      </Script>
    </>
  )
}
