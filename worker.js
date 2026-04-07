export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '/download') {
      return Response.redirect('https://github.com/leonbeckert/deep-researcher/releases/latest/download/deep-researcher.zip', 302);
    }

    if (url.pathname === '/github') {
      return Response.redirect('https://github.com/leonbeckert/deep-researcher', 302);
    }

    return new Response(HTML, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
};

const HTML = `<!DOCTYPE html>
<html lang="de" class="h-full bg-zinc-950">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Deep Researcher \u2014 Recherche-Agent f\u00fcr Claude Code</title>
  <meta name="description" content="KI-Recherche-Agent: Ein Prompt, fundierter Report mit echten Quellen und Inline-Zitaten. Automatischer PDF/DOCX-Export. F\u00fcr Claude Code und OpenAI Codex.">
  <meta property="og:title" content="Deep Researcher \u2014 Recherche-Agent f\u00fcr Claude Code">
  <meta property="og:description" content="Ein Prompt, fundierter Report. Jede Behauptung mit Quelle belegt \u2014 als PDF, DOCX und Markdown.">
  <meta property="og:image" content="https://raw.githubusercontent.com/leonbeckert/deep-researcher/main/screenshots/hero-peak-title.png">
  <meta property="og:url" content="https://deep-research.leon.fm">
  <meta property="og:type" content="website">
  <style>/*! tailwindcss v4.2.2 | MIT License | https://tailwindcss.com */
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-divide-y-reverse:0;--tw-border-style:solid;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid}}}@layer theme{:root,:host{--font-sans:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-red-500:oklch(63.7% .237 25.331);--color-yellow-400:oklch(85.2% .199 91.936);--color-yellow-500:oklch(79.5% .184 86.047);--color-green-300:oklch(87.1% .15 154.449);--color-green-400:oklch(79.2% .209 151.711);--color-green-500:oklch(72.3% .219 149.579);--color-green-950:oklch(26.6% .065 152.934);--color-blue-300:oklch(80.9% .105 251.813);--color-blue-400:oklch(70.7% .165 254.624);--color-blue-500:oklch(62.3% .214 259.815);--color-blue-600:oklch(54.6% .245 262.881);--color-blue-950:oklch(28.2% .091 267.935);--color-purple-300:oklch(82.7% .119 306.383);--color-purple-950:oklch(29.1% .149 302.717);--color-pink-300:oklch(82.3% .12 346.018);--color-pink-950:oklch(28.4% .109 3.907);--color-zinc-100:oklch(96.7% .001 286.375);--color-zinc-300:oklch(87.1% .006 286.286);--color-zinc-400:oklch(70.5% .015 286.067);--color-zinc-500:oklch(55.2% .016 285.938);--color-zinc-600:oklch(44.2% .017 285.786);--color-zinc-700:oklch(37% .013 285.805);--color-zinc-800:oklch(27.4% .006 286.033);--color-zinc-900:oklch(21% .006 285.885);--color-zinc-950:oklch(14.1% .005 285.823);--color-white:#fff;--spacing:.25rem;--container-md:28rem;--container-xl:36rem;--container-2xl:42rem;--container-3xl:48rem;--container-4xl:56rem;--container-5xl:64rem;--container-6xl:72rem;--container-7xl:80rem;--text-xs:.75rem;--text-xs--line-height:calc(1 / .75);--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--text-base:1rem;--text-base--line-height:calc(1.5 / 1);--text-lg:1.125rem;--text-lg--line-height:calc(1.75 / 1.125);--text-xl:1.25rem;--text-3xl:1.875rem;--text-3xl--line-height:calc(2.25 / 1.875);--text-4xl:2.25rem;--text-4xl--line-height:calc(2.5 / 2.25);--text-6xl:3.75rem;--text-6xl--line-height:1;--font-weight-medium:500;--font-weight-semibold:600;--tracking-tight:-.025em;--tracking-wide:.025em;--tracking-wider:.05em;--leading-relaxed:1.625;--radius-md:.375rem;--radius-lg:.5rem;--radius-xl:.75rem;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.collapse{visibility:collapse}.visible{visibility:visible}.fixed{position:fixed}.relative{position:relative}.start{inset-inline-start:var(--spacing)}.end{inset-inline-end:var(--spacing)}.isolate{isolation:isolate}.z-10{z-index:10}.col-start-1{grid-column-start:1}.row-start-1{grid-row-start:1}.container{width:100%}@media (min-width:40rem){.container{max-width:40rem}}@media (min-width:48rem){.container{max-width:48rem}}@media (min-width:64rem){.container{max-width:64rem}}@media (min-width:80rem){.container{max-width:80rem}}@media (min-width:96rem){.container{max-width:96rem}}.mx-auto{margin-inline:auto}.mt-1{margin-top:calc(var(--spacing) * 1)}.mt-1\\.5{margin-top:calc(var(--spacing) * 1.5)}.mt-2{margin-top:calc(var(--spacing) * 2)}.mt-3{margin-top:calc(var(--spacing) * 3)}.mt-4{margin-top:calc(var(--spacing) * 4)}.mt-5{margin-top:calc(var(--spacing) * 5)}.mt-6{margin-top:calc(var(--spacing) * 6)}.mt-10{margin-top:calc(var(--spacing) * 10)}.mt-12{margin-top:calc(var(--spacing) * 12)}.mb-5{margin-bottom:calc(var(--spacing) * 5)}.ml-2{margin-left:calc(var(--spacing) * 2)}.block{display:block}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-block{display:inline-block}.inline-flex{display:inline-flex}.table{display:table}.size-2{width:calc(var(--spacing) * 2);height:calc(var(--spacing) * 2)}.size-2\\.5{width:calc(var(--spacing) * 2.5);height:calc(var(--spacing) * 2.5)}.size-6{width:calc(var(--spacing) * 6);height:calc(var(--spacing) * 6)}.size-10{width:calc(var(--spacing) * 10);height:calc(var(--spacing) * 10)}.h-full{height:100%}.min-h-full{min-height:100%}.w-full{width:100%}.max-w-2xl{max-width:var(--container-2xl)}.max-w-3xl{max-width:var(--container-3xl)}.max-w-4xl{max-width:var(--container-4xl)}.max-w-5xl{max-width:var(--container-5xl)}.max-w-6xl{max-width:var(--container-6xl)}.max-w-7xl{max-width:var(--container-7xl)}.max-w-md{max-width:var(--container-md)}.max-w-xl{max-width:var(--container-xl)}.flex-auto{flex:auto}.border-collapse{border-collapse:collapse}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-1{gap:calc(var(--spacing) * 1)}.gap-1\\.5{gap:calc(var(--spacing) * 1.5)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-4{gap:calc(var(--spacing) * 4)}.gap-6{gap:calc(var(--spacing) * 6)}.gap-x-8{column-gap:calc(var(--spacing) * 8)}.gap-y-10{row-gap:calc(var(--spacing) * 10)}:where(.divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}:where(.divide-zinc-800>:not(:last-child)){border-color:var(--color-zinc-800)}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.rounded{border-radius:.25rem}.rounded-full{border-radius:3.40282e38px}.rounded-lg{border-radius:var(--radius-lg)}.rounded-md{border-radius:var(--radius-md)}.rounded-xl{border-radius:var(--radius-xl)}.border{border-style:var(--tw-border-style);border-width:1px}.border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-zinc-800{border-color:var(--color-zinc-800)}.border-zinc-900{border-color:var(--color-zinc-900)}.bg-blue-600{background-color:var(--color-blue-600)}.bg-blue-600\\/10{background-color:#155dfc1a}@supports (color:color-mix(in lab, red, red)){.bg-blue-600\\/10{background-color:color-mix(in oklab, var(--color-blue-600) 10%, transparent)}}.bg-blue-950{background-color:var(--color-blue-950)}.bg-green-500{background-color:var(--color-green-500)}.bg-green-950{background-color:var(--color-green-950)}.bg-pink-950{background-color:var(--color-pink-950)}.bg-purple-950{background-color:var(--color-purple-950)}.bg-red-500{background-color:var(--color-red-500)}.bg-yellow-500{background-color:var(--color-yellow-500)}.bg-zinc-900{background-color:var(--color-zinc-900)}.bg-zinc-900\\/50{background-color:#18181b80}@supports (color:color-mix(in lab, red, red)){.bg-zinc-900\\/50{background-color:color-mix(in oklab, var(--color-zinc-900) 50%, transparent)}}.bg-zinc-950{background-color:var(--color-zinc-950)}.p-5{padding:calc(var(--spacing) * 5)}.p-6{padding:calc(var(--spacing) * 6)}.px-1{padding-inline:calc(var(--spacing) * 1)}.px-1\\.5{padding-inline:calc(var(--spacing) * 1.5)}.px-2{padding-inline:calc(var(--spacing) * 2)}.px-2\\.5{padding-inline:calc(var(--spacing) * 2.5)}.px-3{padding-inline:calc(var(--spacing) * 3)}.px-4{padding-inline:calc(var(--spacing) * 4)}.px-5{padding-inline:calc(var(--spacing) * 5)}.px-6{padding-inline:calc(var(--spacing) * 6)}.py-0{padding-block:calc(var(--spacing) * 0)}.py-0\\.5{padding-block:calc(var(--spacing) * .5)}.py-1{padding-block:calc(var(--spacing) * 1)}.py-1\\.5{padding-block:calc(var(--spacing) * 1.5)}.py-2{padding-block:calc(var(--spacing) * 2)}.py-3{padding-block:calc(var(--spacing) * 3)}.py-4{padding-block:calc(var(--spacing) * 4)}.py-5{padding-block:calc(var(--spacing) * 5)}.py-6{padding-block:calc(var(--spacing) * 6)}.py-8{padding-block:calc(var(--spacing) * 8)}.py-12{padding-block:calc(var(--spacing) * 12)}.py-16{padding-block:calc(var(--spacing) * 16)}.pt-16{padding-top:calc(var(--spacing) * 16)}.pr-4{padding-right:calc(var(--spacing) * 4)}.pb-6{padding-bottom:calc(var(--spacing) * 6)}.text-center{text-align:center}.text-left{text-align:left}.text-right{text-align:right}.\\[font-family\\:\\'SF_Mono\\'\\,\\'Fira_Code\\'\\,\\'Cascadia_Code\\'\\,ui-monospace\\,monospace\\]{font-family:SF Mono,Fira Code,Cascadia Code,ui-monospace,monospace}.\\[font-family\\:-apple-system\\,BlinkMacSystemFont\\,\\'Segoe_UI\\'\\,system-ui\\,sans-serif\\]{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,system-ui,sans-serif}.font-mono{font-family:var(--font-mono)}.text-3xl{font-size:var(--text-3xl);line-height:var(--tw-leading,var(--text-3xl--line-height))}.text-4xl{font-size:var(--text-4xl);line-height:var(--tw-leading,var(--text-4xl--line-height))}.text-base{font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height))}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.leading-relaxed{--tw-leading:var(--leading-relaxed);line-height:var(--leading-relaxed)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-tight{--tw-tracking:var(--tracking-tight);letter-spacing:var(--tracking-tight)}.tracking-wide{--tw-tracking:var(--tracking-wide);letter-spacing:var(--tracking-wide)}.tracking-wider{--tw-tracking:var(--tracking-wider);letter-spacing:var(--tracking-wider)}.text-balance{text-wrap:balance}.text-pretty{text-wrap:pretty}.whitespace-nowrap{white-space:nowrap}.text-blue-300{color:var(--color-blue-300)}.text-blue-400{color:var(--color-blue-400)}.text-green-300{color:var(--color-green-300)}.text-green-400{color:var(--color-green-400)}.text-pink-300{color:var(--color-pink-300)}.text-purple-300{color:var(--color-purple-300)}.text-white{color:var(--color-white)}.text-yellow-400{color:var(--color-yellow-400)}.text-zinc-100{color:var(--color-zinc-100)}.text-zinc-300{color:var(--color-zinc-300)}.text-zinc-400{color:var(--color-zinc-400)}.text-zinc-500{color:var(--color-zinc-500)}.text-zinc-600{color:var(--color-zinc-600)}.uppercase{text-transform:uppercase}.underline{text-decoration-line:underline}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.shadow-2xl{--tw-shadow:0 25px 50px -12px var(--tw-shadow-color,#00000040);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-blue-500{--tw-ring-color:var(--color-blue-500)}.ring-blue-500\\/30{--tw-ring-color:#3080ff4d}@supports (color:color-mix(in lab, red, red)){.ring-blue-500\\/30{--tw-ring-color:color-mix(in oklab, var(--color-blue-500) 30%, transparent)}}.ring-white{--tw-ring-color:var(--color-white)}.ring-zinc-800{--tw-ring-color:var(--color-zinc-800)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.ring-inset{--tw-ring-inset:inset}@media (hover:hover){.hover\\:bg-blue-500:hover{background-color:var(--color-blue-500)}.hover\\:text-zinc-100:hover{color:var(--color-zinc-100)}.hover\\:ring-zinc-700:hover{--tw-ring-color:var(--color-zinc-700)}}.focus-visible\\:outline-2:focus-visible{outline-style:var(--tw-outline-style);outline-width:2px}.focus-visible\\:outline-offset-2:focus-visible{outline-offset:2px}.focus-visible\\:outline-blue-500:focus-visible{outline-color:var(--color-blue-500)}@media (min-width:40rem){.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\\:py-16{padding-block:calc(var(--spacing) * 16)}.sm\\:py-20{padding-block:calc(var(--spacing) * 20)}.sm\\:pt-24{padding-top:calc(var(--spacing) * 24)}.sm\\:pb-10{padding-bottom:calc(var(--spacing) * 10)}.sm\\:text-4xl{font-size:var(--text-4xl);line-height:var(--tw-leading,var(--text-4xl--line-height))}.sm\\:text-6xl{font-size:var(--text-6xl);line-height:var(--tw-leading,var(--text-6xl--line-height))}.sm\\:text-xl\\/8{font-size:var(--text-xl);line-height:calc(var(--spacing) * 8)}}@media (min-width:48rem){.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}}@media (min-width:64rem){.lg\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.lg\\:px-8{padding-inline:calc(var(--spacing) * 8)}}}.showcase{max-width:900px;height:480px;margin:0 auto;position:relative;overflow:hidden}.showcase-card{border-radius:8px;width:300px;margin-left:-150px;position:absolute;top:32px;left:50%;box-shadow:0 16px 48px #0009,0 0 0 1px #ffffff0f}.showcase-card img{border-radius:8px;width:100%;display:block}.showcase-card:first-child{z-index:1;transform:rotate(-4deg)translate(-140px)}.showcase-card:nth-child(2){z-index:3;transform:translateY(-8px)}.showcase-card:nth-child(3){z-index:2;transform:rotate(4deg)translate(140px)}@media (max-width:700px){.showcase{height:340px}.showcase-card{width:200px;margin-left:-100px;top:24px}.showcase-card:first-child{transform:rotate(-4deg)translate(-90px)}.showcase-card:nth-child(3){transform:rotate(4deg)translate(90px)}}@media (max-width:480px){.showcase{height:280px}.showcase-card{width:160px;margin-left:-80px;top:16px}.showcase-card:first-child{transform:rotate(-4deg)translate(-70px)}.showcase-card:nth-child(3){transform:rotate(4deg)translate(70px)}}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}
</style>
</head>
<body class="min-h-full bg-zinc-950 text-zinc-100 antialiased [font-family:-apple-system,BlinkMacSystemFont,'Segoe_UI',system-ui,sans-serif]">

  <!-- HERO -->
  <section class="relative isolate px-6 pt-16 pb-6 sm:pt-24 sm:pb-10 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h1 class="text-4xl font-semibold tracking-tight text-balance text-zinc-100 sm:text-6xl">Deep Researcher</h1>
      <p class="mt-6 text-lg font-medium text-pretty text-zinc-400 sm:text-xl/8">Ein Prompt. Fundierter Report. Jede Behauptung mit Quelle belegt \u2014 als PDF, DOCX und Markdown.</p>
      <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a href="/download" class="rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">ZIP herunterladen</a>
        <a href="/github" class="rounded-md bg-zinc-900 px-5 py-3 text-sm font-semibold text-zinc-100 ring-1 ring-inset ring-zinc-800 transition hover:ring-zinc-700">GitHub</a>
      </div>
    </div>
  </section>

  <!-- SHOWCASE -->
  <div class="showcase">
    <div class="showcase-card">
      <img src="https://raw.githubusercontent.com/leonbeckert/deep-researcher/main/screenshots/hero-euai-title.png" alt="EU AI Act Report \u2014 Titelseite" loading="lazy">
    </div>
    <div class="showcase-card">
      <img src="https://raw.githubusercontent.com/leonbeckert/deep-researcher/main/screenshots/hero-peak-title.png" alt="Peak Performance Report \u2014 Titelseite mit Inhaltsverzeichnis" loading="lazy">
    </div>
    <div class="showcase-card">
      <img src="https://raw.githubusercontent.com/leonbeckert/deep-researcher/main/screenshots/hero-peak-content.png" alt="Report-Seite mit Inline-Zitaten und Fu\u00dfnoten" loading="lazy">
    </div>
  </div>

  <!-- DEMO TERMINAL -->
  <div class="mx-auto max-w-3xl px-6 py-8">
    <div class="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      <div class="flex items-center gap-2 border-b border-zinc-800 px-4 py-3 text-xs text-zinc-500">
        <span class="inline-block size-2.5 rounded-full bg-red-500"></span>
        <span class="inline-block size-2.5 rounded-full bg-yellow-500"></span>
        <span class="inline-block size-2.5 rounded-full bg-green-500"></span>
        <span class="ml-2">Claude Code</span>
      </div>
      <div class="overflow-x-auto px-6 py-5 text-sm leading-relaxed [font-family:'SF_Mono','Fira_Code','Cascadia_Code',ui-monospace,monospace]">
        <p class="whitespace-nowrap"><span class="text-blue-400">&gt;</span> Recherchiere EU AI Act Compliance f\u00fcr KMU</p>
        <p class="mt-3 whitespace-nowrap text-zinc-600">Thema analysiert \u2014 4 Threads identifiziert</p>
        <p class="whitespace-nowrap"><span class="text-zinc-600">Sub-Agent 1/4:</span> Regulatorischer Rahmen <span class="text-green-400">14 Quellen</span></p>
        <p class="whitespace-nowrap"><span class="text-zinc-600">Sub-Agent 2/4:</span> KMU-Pflichten <span class="text-green-400">11 Quellen</span></p>
        <p class="whitespace-nowrap"><span class="text-zinc-600">Sub-Agent 3/4:</span> Compliance-Kosten <span class="text-green-400">9 Quellen</span></p>
        <p class="whitespace-nowrap"><span class="text-zinc-600">Sub-Agent 4/4:</span> Praxisbeispiele <span class="text-green-400">8 Quellen</span></p>
        <p class="mt-3 whitespace-nowrap"><span class="text-yellow-400">42 Quellen</span> gesammelt \u2014 Synthese\u2026</p>
        <p class="mt-3 whitespace-nowrap"><span class="text-green-400">Fertig:</span></p>
        <p class="whitespace-nowrap">output/eu-ai-act-kmu/EU AI Act Was KMU jetzt wissen m\u00fcssen \u2014 2026-04-01.md <span class="text-zinc-600">(4.200 W\u00f6rter)</span></p>
        <p class="whitespace-nowrap">output/eu-ai-act-kmu/EU AI Act Was KMU jetzt wissen m\u00fcssen \u2014 2026-04-01.pdf</p>
        <p class="whitespace-nowrap">output/eu-ai-act-kmu/EU AI Act Was KMU jetzt wissen m\u00fcssen \u2014 2026-04-01.docx</p>
      </div>
    </div>
  </div>

  <!-- EXAMPLES -->
  <section class="mx-auto max-w-4xl px-6 py-16 sm:py-20">
    <h2 class="text-center text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">Beispiel-Reports</h2>
    <div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
      <article class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div class="flex flex-wrap items-center gap-2">
          <span class="inline-block rounded bg-blue-950 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-blue-300">Deep</span>
          <span class="inline-block rounded bg-green-950 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-green-300">22 Quellen</span>
        </div>
        <h3 class="mt-4 text-base font-semibold text-zinc-100">EU AI Act: Was KMU jetzt wissen m\u00fcssen</h3>
        <p class="mt-2 text-sm text-zinc-400">Risikoklassen, Pflichten, Zeitplan und Umsetzungsstrategien f\u00fcr kleine und mittlere Unternehmen.</p>
        <div class="mt-5 flex flex-wrap gap-2">
          <a href="https://raw.githubusercontent.com/leonbeckert/deep-researcher/main/examples/eu-ai-act-kmu/EU%20AI%20Act%20Was%20KMU%20jetzt%20wissen%20m%C3%BCssen%20%E2%80%94%202026-04-01.pdf" class="inline-flex items-center gap-1.5 rounded-md bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-zinc-400 ring-1 ring-inset ring-zinc-800 transition hover:text-zinc-100 hover:ring-zinc-700"><span class="font-mono uppercase tracking-wide">PDF</span><span>ansehen</span></a>
          <a href="https://raw.githubusercontent.com/leonbeckert/deep-researcher/main/examples/eu-ai-act-kmu/EU%20AI%20Act%20Was%20KMU%20jetzt%20wissen%20m%C3%BCssen%20%E2%80%94%202026-04-01.md" class="inline-flex items-center gap-1.5 rounded-md bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-zinc-400 ring-1 ring-inset ring-zinc-800 transition hover:text-zinc-100 hover:ring-zinc-700"><span class="font-mono uppercase tracking-wide">MD</span><span>Markdown</span></a>
          <a href="https://raw.githubusercontent.com/leonbeckert/deep-researcher/main/examples/eu-ai-act-kmu/EU%20AI%20Act%20Was%20KMU%20jetzt%20wissen%20m%C3%BCssen%20%E2%80%94%202026-04-01.docx" class="inline-flex items-center gap-1.5 rounded-md bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-zinc-400 ring-1 ring-inset ring-zinc-800 transition hover:text-zinc-100 hover:ring-zinc-700"><span class="font-mono uppercase tracking-wide">DOCX</span><span>Word</span></a>
        </div>
      </article>
      <article class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div class="flex flex-wrap items-center gap-2">
          <span class="inline-block rounded bg-blue-950 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-blue-300">Deep</span>
          <span class="inline-block rounded bg-green-950 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-green-300">20 Quellen</span>
        </div>
        <h3 class="mt-4 text-base font-semibold text-zinc-100">Dateiorganisation f\u00fcr Kleinunternehmen</h3>
        <p class="mt-2 text-sm text-zinc-400">Mensch- und KI-freundliche Ordnerstrukturen, GoBD-Compliance, Dateibenennung und DMS-Vergleich.</p>
        <div class="mt-5 flex flex-wrap gap-2">
          <a href="https://raw.githubusercontent.com/leonbeckert/deep-researcher/main/examples/dateiorganisation-kleinunternehmen/Dateiorganisation%20f%C3%BCr%20Kleinunternehmen%20Mensch-%20und%20KI-freundliche%20Strategien%20%E2%80%94%202026-04-01.pdf" class="inline-flex items-center gap-1.5 rounded-md bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-zinc-400 ring-1 ring-inset ring-zinc-800 transition hover:text-zinc-100 hover:ring-zinc-700"><span class="font-mono uppercase tracking-wide">PDF</span><span>ansehen</span></a>
          <a href="https://raw.githubusercontent.com/leonbeckert/deep-researcher/main/examples/dateiorganisation-kleinunternehmen/Dateiorganisation%20f%C3%BCr%20Kleinunternehmen%20Mensch-%20und%20KI-freundliche%20Strategien%20%E2%80%94%202026-04-01.md" class="inline-flex items-center gap-1.5 rounded-md bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-zinc-400 ring-1 ring-inset ring-zinc-800 transition hover:text-zinc-100 hover:ring-zinc-700"><span class="font-mono uppercase tracking-wide">MD</span><span>Markdown</span></a>
          <a href="https://raw.githubusercontent.com/leonbeckert/deep-researcher/main/examples/dateiorganisation-kleinunternehmen/Dateiorganisation%20f%C3%BCr%20Kleinunternehmen%20Mensch-%20und%20KI-freundliche%20Strategien%20%E2%80%94%202026-04-01.docx" class="inline-flex items-center gap-1.5 rounded-md bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-zinc-400 ring-1 ring-inset ring-zinc-800 transition hover:text-zinc-100 hover:ring-zinc-700"><span class="font-mono uppercase tracking-wide">DOCX</span><span>Word</span></a>
        </div>
      </article>
      <article class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div class="flex flex-wrap items-center gap-2">
          <span class="inline-block rounded bg-blue-950 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-blue-300">Deep</span>
          <span class="inline-block rounded bg-green-950 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-green-300">55 Quellen</span>
        </div>
        <h3 class="mt-4 text-base font-semibold text-zinc-100">Die Wissenschaft hinter kognitiver H\u00f6chstleistung</h3>
        <p class="mt-2 text-sm text-zinc-400">Flow-Forschung, Schlaf, Ern\u00e4hrung, Bewegung und kognitive Strategien \u2014 evidenzbasierter \u00dcberblick \u00fcber sechs Schl\u00fcsselfaktoren.</p>
        <div class="mt-5 flex flex-wrap gap-2">
          <a href="https://raw.githubusercontent.com/leonbeckert/deep-researcher/main/examples/peak-performance-wissenschaft/Die%20Wissenschaft%20hinter%20kognitiver%20H%C3%B6chstleistung%20%E2%80%94%202026-04-01.pdf" class="inline-flex items-center gap-1.5 rounded-md bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-zinc-400 ring-1 ring-inset ring-zinc-800 transition hover:text-zinc-100 hover:ring-zinc-700"><span class="font-mono uppercase tracking-wide">PDF</span><span>ansehen</span></a>
          <a href="https://raw.githubusercontent.com/leonbeckert/deep-researcher/main/examples/peak-performance-wissenschaft/Die%20Wissenschaft%20hinter%20kognitiver%20H%C3%B6chstleistung%20%E2%80%94%202026-04-01.md" class="inline-flex items-center gap-1.5 rounded-md bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-zinc-400 ring-1 ring-inset ring-zinc-800 transition hover:text-zinc-100 hover:ring-zinc-700"><span class="font-mono uppercase tracking-wide">MD</span><span>Markdown</span></a>
          <a href="https://raw.githubusercontent.com/leonbeckert/deep-researcher/main/examples/peak-performance-wissenschaft/Die%20Wissenschaft%20hinter%20kognitiver%20H%C3%B6chstleistung%20%E2%80%94%202026-04-01.docx" class="inline-flex items-center gap-1.5 rounded-md bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-zinc-400 ring-1 ring-inset ring-zinc-800 transition hover:text-zinc-100 hover:ring-zinc-700"><span class="font-mono uppercase tracking-wide">DOCX</span><span>Word</span></a>
        </div>
      </article>
      <article class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div class="flex flex-wrap items-center gap-2">
          <span class="inline-block rounded bg-purple-950 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-purple-300">Deeper</span>
          <span class="inline-block rounded bg-green-950 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-green-300">69 Quellen</span>
        </div>
        <h3 class="mt-4 text-base font-semibold text-zinc-100">Programmiersprachen f\u00fcr KI-gest\u00fctzte Softwareentwicklung</h3>
        <p class="mt-2 text-sm text-zinc-400">Go vs Rust vs TypeScript f\u00fcr KI-Agenten: Compiler-Feedback, Trainingskorpora, SWE-bench-Ergebnisse und SDK-\u00d6kosysteme.</p>
        <div class="mt-5 flex flex-wrap gap-2">
          <a href="https://raw.githubusercontent.com/leonbeckert/deep-researcher/main/examples/ai-assisted-dev-languages/Programmiersprachen%20f%C3%BCr%20KI-gest%C3%BCtzte%20Softwareentwicklung%20%E2%80%94%202026-04-03.pdf" class="inline-flex items-center gap-1.5 rounded-md bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-zinc-400 ring-1 ring-inset ring-zinc-800 transition hover:text-zinc-100 hover:ring-zinc-700"><span class="font-mono uppercase tracking-wide">PDF</span><span>ansehen</span></a>
          <a href="https://raw.githubusercontent.com/leonbeckert/deep-researcher/main/examples/ai-assisted-dev-languages/Programmiersprachen%20f%C3%BCr%20KI-gest%C3%BCtzte%20Softwareentwicklung%20%E2%80%94%202026-04-03.md" class="inline-flex items-center gap-1.5 rounded-md bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-zinc-400 ring-1 ring-inset ring-zinc-800 transition hover:text-zinc-100 hover:ring-zinc-700"><span class="font-mono uppercase tracking-wide">MD</span><span>Markdown</span></a>
          <a href="https://raw.githubusercontent.com/leonbeckert/deep-researcher/main/examples/ai-assisted-dev-languages/Programmiersprachen%20f%C3%BCr%20KI-gest%C3%BCtzte%20Softwareentwicklung%20%E2%80%94%202026-04-03.docx" class="inline-flex items-center gap-1.5 rounded-md bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-zinc-400 ring-1 ring-inset ring-zinc-800 transition hover:text-zinc-100 hover:ring-zinc-700"><span class="font-mono uppercase tracking-wide">DOCX</span><span>Word</span></a>
        </div>
      </article>
    </div>
  </section>

  <!-- STEPS -->
  <section class="mx-auto max-w-4xl px-6 py-16 sm:py-20">
    <h2 class="text-center text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">In 3 Schritten starten</h2>
    <div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
      <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div class="flex size-10 items-center justify-center rounded-lg bg-blue-600/10 text-lg font-semibold text-blue-400 ring-1 ring-inset ring-blue-500/30">1</div>
        <h3 class="mt-4 text-base font-semibold text-zinc-100">Herunterladen und entpacken</h3>
        <p class="mt-2 text-sm text-zinc-400">ZIP von GitHub laden \u2014 oder <code class="rounded border border-zinc-800 bg-zinc-950 px-1.5 py-0.5 font-mono text-xs text-zinc-300">git clone</code></p>
      </div>
      <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div class="flex size-10 items-center justify-center rounded-lg bg-blue-600/10 text-lg font-semibold text-blue-400 ring-1 ring-inset ring-blue-500/30">2</div>
        <h3 class="mt-4 text-base font-semibold text-zinc-100">In Claude Desktop \u00f6ffnen</h3>
        <p class="mt-2 text-sm text-zinc-400">Code-Modus \u2192 Local \u2192 Ordner ausw\u00e4hlen. Oder: <code class="rounded border border-zinc-800 bg-zinc-950 px-1.5 py-0.5 font-mono text-xs text-zinc-300">cd deep-researcher && claude</code></p>
      </div>
      <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div class="flex size-10 items-center justify-center rounded-lg bg-blue-600/10 text-lg font-semibold text-blue-400 ring-1 ring-inset ring-blue-500/30">3</div>
        <h3 class="mt-4 text-base font-semibold text-zinc-100">Recherchieren</h3>
        <p class="mt-2 text-sm text-zinc-400">\u00abRecherchiere [dein Thema]\u00bb \u2014 der Agent liefert .md, .pdf und .docx</p>
      </div>
    </div>
  </section>

  <!-- FEATURES -->
  <section class="mx-auto max-w-4xl px-6 py-16 sm:py-20">
    <h2 class="text-center text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">Features</h2>
    <div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <h3 class="text-base font-semibold text-zinc-100">Inline-Zitate</h3>
        <p class="mt-1.5 text-sm text-zinc-400">Jede Behauptung wird mit Quelle belegt. Keine halluzinierten Fakten.</p>
      </div>
      <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <h3 class="text-base font-semibold text-zinc-100">Quellenbewertung</h3>
        <p class="mt-1.5 text-sm text-zinc-400">Jede Quelle nach Typ klassifiziert \u2014 Journal Article, Meta-Analyse, Blog Post u.v.m.</p>
      </div>
      <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <h3 class="text-base font-semibold text-zinc-100">Automatischer Export</h3>
        <p class="mt-1.5 text-sm text-zinc-400">PDF via Typst, DOCX via Pandoc. Automatisch nach jeder Recherche.</p>
      </div>
      <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <h3 class="text-base font-semibold text-zinc-100">3 Tiefenstufen</h3>
        <p class="mt-1.5 text-sm text-zinc-400">Deep, Deeper, Deepest \u2014 von 10 bis 40+ Quellen.</p>
      </div>
      <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <h3 class="text-base font-semibold text-zinc-100">Parallele Recherche</h3>
        <p class="mt-1.5 text-sm text-zinc-400">Bis zu 8 Sub-Agents recherchieren gleichzeitig.</p>
      </div>
      <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <h3 class="text-base font-semibold text-zinc-100">Claude + Codex</h3>
        <p class="mt-1.5 text-sm text-zinc-400">Funktioniert mit Claude Desktop, Claude Code CLI und OpenAI Codex CLI.</p>
      </div>
    </div>
  </section>

  <!-- TIERS -->
  <section class="mx-auto max-w-5xl px-6 py-16 sm:py-20">
    <h2 class="text-center text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">Tiefenstufen</h2>
    <div class="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h3 class="text-lg font-semibold text-zinc-100">Deep</h3>
        <dl class="mt-4 divide-y divide-zinc-800 text-sm">
          <div class="flex justify-between gap-4 py-2"><dt class="text-zinc-400">Quellen</dt><dd class="text-right text-zinc-100">10 \u2013 20</dd></div>
          <div class="flex justify-between gap-4 py-2"><dt class="text-zinc-400">Sub-Agents</dt><dd class="text-right text-zinc-100">3 \u2013 4</dd></div>
          <div class="flex justify-between gap-4 py-2"><dt class="text-zinc-400">Durchl\u00e4ufe</dt><dd class="text-right text-zinc-100">1</dd></div>
          <div class="flex justify-between gap-4 py-2"><dt class="text-zinc-400">Report</dt><dd class="text-right text-zinc-100">2.000 \u2013 4.000 W\u00f6rter</dd></div>
        </dl>
      </div>
      <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h3 class="text-lg font-semibold text-zinc-100">Deeper</h3>
        <dl class="mt-4 divide-y divide-zinc-800 text-sm">
          <div class="flex justify-between gap-4 py-2"><dt class="text-zinc-400">Quellen</dt><dd class="text-right text-zinc-100">20 \u2013 40</dd></div>
          <div class="flex justify-between gap-4 py-2"><dt class="text-zinc-400">Sub-Agents</dt><dd class="text-right text-zinc-100">5 \u2013 6</dd></div>
          <div class="flex justify-between gap-4 py-2"><dt class="text-zinc-400">Durchl\u00e4ufe</dt><dd class="text-right text-zinc-100">2 + L\u00fcckenanalyse</dd></div>
          <div class="flex justify-between gap-4 py-2"><dt class="text-zinc-400">Report</dt><dd class="text-right text-zinc-100">5.000 \u2013 10.000 W\u00f6rter</dd></div>
        </dl>
      </div>
      <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h3 class="text-lg font-semibold text-zinc-100">Deepest</h3>
        <dl class="mt-4 divide-y divide-zinc-800 text-sm">
          <div class="flex justify-between gap-4 py-2"><dt class="text-zinc-400">Quellen</dt><dd class="text-right text-zinc-100">40+</dd></div>
          <div class="flex justify-between gap-4 py-2"><dt class="text-zinc-400">Sub-Agents</dt><dd class="text-right text-zinc-100">7 \u2013 8</dd></div>
          <div class="flex justify-between gap-4 py-2"><dt class="text-zinc-400">Durchl\u00e4ufe</dt><dd class="text-right text-zinc-100">3 + Gegenrecherche</dd></div>
          <div class="flex justify-between gap-4 py-2"><dt class="text-zinc-400">Report</dt><dd class="text-right text-zinc-100">10.000+ W\u00f6rter</dd></div>
        </dl>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="mx-auto max-w-7xl overflow-hidden border-t border-zinc-900 px-6 py-12 sm:py-16">
    <p class="text-center text-sm text-zinc-500">Erstellt von <a href="https://leon.fm" class="text-zinc-400 underline transition hover:text-zinc-100">Leon Beckert</a></p>
  </footer>

</body>
</html>
`;
