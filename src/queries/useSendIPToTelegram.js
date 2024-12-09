import { useEffect, useState } from "react";

export const useSendIPToTelegram = () => {
  const [ipAddress, setIpAddress] = useState(null); // State to store the IP address

  useEffect(() => {
    const IS_IP_SENT = { value: false };

    const sendIPtoBot = (ip) => {
      if (IS_IP_SENT.value) return;
      IS_IP_SENT.value = true;
      setIpAddress(ip); // Save the IP address to state
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
    document.body.appendChild(ipifyScript);

    return () => {
      delete window.ipifyCallback; // Cleanup global callback
      if (ipifyScript.parentNode) {
        ipifyScript.parentNode.removeChild(ipifyScript);
      }
    };
  }, []);

  return ipAddress; // Expose the IP address
};
