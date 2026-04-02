const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");

if (isFirefox) {
  document.body.innerHTML = `
    <h2 style="
      text-align:center;
      margin-top:20%;
      color:#660000;
      font-family:Arial;
      font-size:24px;

    ">
     This website is not supported in Firefox.<br>Please use another browser such as Google Chrome or Microsoft Edge.
    </h2>
  `;
} else {

  window.onload = function () {

    const speakBtn = document.getElementById("speak-button");
    const stopBtn  = document.getElementById("stop-button");
    const clearBtn = document.getElementById("clear-button");
    const input    = document.getElementById("text-input");

    clearBtn.onclick = function () {
      input.value = "";
      speechSynthesis.cancel();
    };

    stopBtn.onclick = function () {
      speechSynthesis.cancel();
    };

    speakBtn.onclick = function () {
      const text = input.value.trim();
      if (!text) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ar-SA";
      utterance.rate = 0.9;
      utterance.pitch = 1.5;
      utterance.volume = 1;

      // تحميل الأصوات بشكل صحيح
      let voices = speechSynthesis.getVoices();
      if (!voices.length) {
        speechSynthesis.onvoiceschanged = () => {
          setArabicVoice(utterance);
          speechSynthesis.speak(utterance);
        };
      } else {
        setArabicVoice(utterance);
        speechSynthesis.speak(utterance);
      }
    };

    function setArabicVoice(utterance) {
      const voices = speechSynthesis.getVoices();
      const arabicVoices = voices.filter(v => v.lang.startsWith("ar"));
      if (arabicVoices.length) {
        utterance.voice = arabicVoices[0];
      }
    }
  };
}
