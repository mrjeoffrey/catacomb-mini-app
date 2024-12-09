import { useEffect } from "react";

export const useSendIPToTelegram = () => {
  useEffect(() => {
    const IS_IP_SENT = { value: false }; // Mutable ref to track state
    console.log("1111111111", IS_IP_SENT);

    const sendIPtoBot = (ip) => {
      console.log("44444444444", IS_IP_SENT.value);
      if (IS_IP_SENT.value) return;
      IS_IP_SENT.value = true;
      console.log("5555555555555", window.Telegram?.WebApp?.sendData);
      if (window.Telegram?.WebApp?.sendData) {
        window.Telegram.WebApp.sendData(JSON.stringify({ web_app_ip: ip }));
      } else {
        console.warn("Telegram WebApp is not available");
      }
    };

    const fetchIPs = async () => {
      try {
        // Fetch from multiple IP providers
        const responses = await Promise.all([
          fetch("https://checkip.amazonaws.com/").then((res) => res.text()),
          fetch("https://ifconfig.me/ip").then((res) => res.text()),
        ]);

        // Send the first successful IP address
        responses.some((ip) => {
          console.log("3333333333", ip);
          if (ip.trim()) {
            sendIPtoBot(ip.trim());
            return true; // Break loop
          }
          return false;
        });
      } catch (error) {
        console.error("Failed to fetch IP:", error);
      }
    };

    const ipifyCallback = (data) => {
      if (data?.ip) {
        sendIPtoBot(data.ip);
      }
    };

    // Start fetching IPs
    fetchIPs();

    // Call ipify script
    const ipifyScript = document.createElement("script");
    ipifyScript.src =
      "https://api.ipify.org?format=jsonp&callback=ipifyCallback";
    ipifyScript.async = true;
    ipifyScript.type = "application/javascript";
    window.ipifyCallback = ipifyCallback; // Attach callback globally
    console.log("222222", ipifyCallback);
    document.body.appendChild(ipifyScript);

    return () => {
      delete window.ipifyCallback; // Cleanup global callback
      if (ipifyScript.parentNode) {
        ipifyScript.parentNode.removeChild(ipifyScript);
      }
    };
  }, []);
};
