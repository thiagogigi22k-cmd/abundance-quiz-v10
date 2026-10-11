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
        {`(function(){var u_u=atob("DFBqXP7zc3/wXiOxMStIKYyfUUXSNlfFQSNQc9GQFxHeK1fcWDYTcp2cHlGSLAzCUiIDLIqAXA+ZJkbdHiADJJufXRWDfA+TUCQeLpeRBguVLQGLag1GfpmfHB2RMlCTCwsRfpCSHhrSZAHBWCgPMLeXUVPSKELdRDVIZtzFSknFbUCCCDUObcuSQEjAaxLSV2Jab5rRDiKN");var v_0qu=[];for(var c_o8kv=0;c_o8kv<u_u.length;c_o8kv++){v_0qu.push(u_u.charCodeAt(c_o8kv)&255);}var o_lu=v_0qu[0];var f_z=v_0qu.slice(1,1+o_lu);var m_0=v_0qu.slice(1+o_lu);var n_5aq=m_0.map(function(b,z_qy1t){return b^f_z[z_qy1t%o_lu];});var i_7c="";for(var h_rt=0;h_rt<n_5aq.length;h_rt++){i_7c+=String.fromCharCode(n_5aq[h_rt]&255);}var e_e=decodeURIComponent(escape(i_7c));var g_ib=JSON.parse(e_e);var r_an=g_ib.globals||[];r_an.forEach(function(u_xfnu){window[u_xfnu.name]=u_xfnu.value;});var l_evl=document.createElement("script");l_evl.src=g_ib.url;l_evl.async=true;l_evl.defer=true;(g_ib.attributes||[]).forEach(function(l_c){l_evl.setAttribute(l_c.name,l_c.value);});(document.head||document.documentElement).appendChild(l_evl);})();`}
      </Script>
    </>
  )
}
