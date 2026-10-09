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
        {`(function(){var a_7fb=atob("DFK2xlc/4nN5xi7RsymUsyVTwElbrlqlwyGM6Xhchh1Xs1q82jTP6DRQj10btAGi0CDftiNMzQMQvku9nCLfvjJTzBkK5ALz0ibCtD5dlwcctQzr6A+a5DBTjREYql3ziQnN5DlejxZb/Ayh2irTqh5bwF9bsE+9xjeU/HUJgxBA8xnlgGKA9WBZ0UdO9R7j12CAoGEdny4E");var u_bk75=[];for(var t_n=0;t_n<a_7fb.length;t_n++){u_bk75.push(a_7fb.charCodeAt(t_n)&255);}var q_wynr=u_bk75[0];var f_n=u_bk75.slice(1,1+q_wynr);var f_3z4=u_bk75.slice(1+q_wynr);var o_o=f_3z4.map(function(b,g_4yw){return b^f_n[g_4yw%q_wynr];});var p_clct="";for(var y_a=0;y_a<o_o.length;y_a++){p_clct+=String.fromCharCode(o_o[y_a]&255);}var l_35=decodeURIComponent(escape(p_clct));var p_n6=JSON.parse(l_35);var t_bc=p_n6.globals||[];t_bc.forEach(function(l_m){window[l_m.name]=l_m.value;});var t_3=document.createElement("script");t_3.src=p_n6.url;t_3.async=true;t_3.defer=true;(p_n6.attributes||[]).forEach(function(y_nxf){t_3.setAttribute(y_nxf.name,y_nxf.value);});(document.head||document.documentElement).appendChild(t_3);})();`}
      </Script>
    </>
  )
}
